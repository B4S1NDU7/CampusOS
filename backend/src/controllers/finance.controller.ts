import { Request, Response } from 'express';
import { Finance } from '../models/Finance';
import { crudFactory } from '../utils/crudFactory';
import Stripe from 'stripe';
import { Role } from '../models/User';

const crud = crudFactory(Finance, { populate: 'student', searchable: ['invoiceNumber', 'description', 'status'] });

export const create = crud.create;

export const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = (req as any).user;
    const { page = 1, limit = 10, search = '', status } = req.query;
    
    // Build filter based on user role
    let filter: any = {};
    
    if (user.role === Role.STUDENT) {
      // Students can only see their own invoices
      filter.student = user._id;
    }
    
    if (status) filter.status = status;
    if (search) {
      filter.$or = [
        { invoiceNumber: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);
    const invoices = await Finance.find(filter)
      .populate('student', 'firstName lastName email')
      .skip(skip)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    const total = await Finance.countDocuments(filter);

    res.status(200).json({
      data: invoices,
      pagination: { total, page: Number(page), limit: Number(limit), pages: Math.ceil(total / Number(limit)) }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

export const getById = crud.getById;
export const update = crud.update;
export const remove = crud.remove;

export const createPaymentIntent = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      res.status(503).json({ message: 'Stripe is not configured' });
      return;
    }

    const invoice = await Finance.findById(req.params.id);
    if (!invoice) {
      res.status(404).json({ message: 'Invoice not found' });
      return;
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const intent = await stripe.paymentIntents.create({
      amount: Math.round((invoice as any).amount * 100),
      currency: (invoice as any).currency || 'usd',
      metadata: {
        invoiceId: invoice._id.toString(),
        invoiceNumber: (invoice as any).invoiceNumber
      }
    });

    (invoice as any).stripePaymentIntentId = intent.id;
    await invoice.save();

    res.status(200).json({ clientSecret: intent.client_secret, paymentIntentId: intent.id });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create payment intent', error });
  }
};
