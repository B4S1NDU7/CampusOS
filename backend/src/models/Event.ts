import mongoose, { Schema } from 'mongoose';

const schema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  startsAt: { type: Date, required: true },
  endsAt: { type: Date },
  location: { type: String },
  capacity: { type: Number, default: 0 },
  organizer: { type: Schema.Types.ObjectId, ref: 'User' },
  registeredUsers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  status: { type: String, enum: ['draft', 'published', 'cancelled', 'completed'], default: 'draft' }
}, { timestamps: true });

export const Event = mongoose.model('Event', schema);
