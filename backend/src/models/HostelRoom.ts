import mongoose, { Schema } from 'mongoose';

const schema = new Schema({
  roomNumber: { type: String, required: true, unique: true },
  block: { type: String, required: true },
  floor: { type: Number, default: 1 },
  capacity: { type: Number, required: true },
  occupants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  monthlyFee: { type: Number, default: 0 },
  status: { type: String, enum: ['available', 'full', 'maintenance'], default: 'available' },
  requests: [{
    student: { type: Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    note: { type: String },
    requestedAt: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

export const HostelRoom = mongoose.model('HostelRoom', schema);
