import { Request, Response } from 'express';
import { Event } from '../models/Event';
import { crudFactory } from '../utils/crudFactory';
import { emitGlobal } from '../services/socket.service';
import { Role } from '../models/User';

const crudOps = crudFactory(Event, {
  populate: ['organizer', 'registeredUsers'],
  searchable: ['title', 'description', 'location', 'status']
});

export const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const doc = await Event.create({ ...req.body, organizer: req.body.organizer || (req as any).user?._id });
    emitGlobal('event:created', doc);
    res.status(201).json(doc);
  } catch (error) { res.status(500).json({ error }); }
};

export const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const { page = 1, limit = 10, search = '' } = req.query;
    const user = (req as any).user;
    
    let filter: any = {};
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);
    const events = await Event.find(filter)
      .populate('organizer', 'firstName lastName email')
      .populate('registeredUsers', 'firstName lastName')
      .skip(skip)
      .limit(Number(limit))
      .sort({ eventDate: -1 });

    const total = await Event.countDocuments(filter);

    res.status(200).json({
      data: events,
      pagination: { total, page: Number(page), limit: Number(limit), pages: Math.ceil(total / Number(limit)) }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

export const getById = crudOps.getById;
export const update = crudOps.update;
export const remove = crudOps.remove;

export const registerForEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.body.user || (req as any).user?._id;
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { registeredUsers: userId } },
      { new: true }
    );

    if (!event) {
      res.status(404).json({ message: 'Event not found' });
      return;
    }

    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: 'Failed to register for event', error });
  }
};
