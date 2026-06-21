"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPaymentIntent = exports.remove = exports.update = exports.getById = exports.getAll = exports.create = void 0;
const Finance_1 = require("../models/Finance");
const crudFactory_1 = require("../utils/crudFactory");
const stripe_1 = __importDefault(require("stripe"));
const crud = (0, crudFactory_1.crudFactory)(Finance_1.Finance, { populate: 'student', searchable: ['invoiceNumber', 'description', 'status'] });
exports.create = crud.create;
exports.getAll = crud.getAll;
exports.getById = crud.getById;
exports.update = crud.update;
exports.remove = crud.remove;
const createPaymentIntent = async (req, res) => {
    try {
        if (!process.env.STRIPE_SECRET_KEY) {
            res.status(503).json({ message: 'Stripe is not configured' });
            return;
        }
        const invoice = await Finance_1.Finance.findById(req.params.id);
        if (!invoice) {
            res.status(404).json({ message: 'Invoice not found' });
            return;
        }
        const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY);
        const intent = await stripe.paymentIntents.create({
            amount: Math.round(invoice.amount * 100),
            currency: invoice.currency || 'usd',
            metadata: {
                invoiceId: invoice._id.toString(),
                invoiceNumber: invoice.invoiceNumber
            }
        });
        invoice.stripePaymentIntentId = intent.id;
        await invoice.save();
        res.status(200).json({ clientSecret: intent.client_secret, paymentIntentId: intent.id });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to create payment intent', error });
    }
};
exports.createPaymentIntent = createPaymentIntent;
//# sourceMappingURL=finance.controller.js.map