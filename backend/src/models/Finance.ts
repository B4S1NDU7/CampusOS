import mongoose, { Schema } from 'mongoose';

const schema = new Schema({
  student: { type: Schema.Types.ObjectId, ref: 'User' },
  invoiceNumber: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  currency: { type: String, default: 'usd' },
  dueDate: { type: Date },
  status: { type: String, enum: ['draft', 'issued', 'paid', 'overdue', 'void'], default: 'issued' },
  stripePaymentIntentId: { type: String },
  scholarship: {
    name: { type: String },
    amount: { type: Number, default: 0 }
  },
  paidAt: { type: Date }
}, { timestamps: true });

export const Finance = mongoose.model('Finance', schema);
