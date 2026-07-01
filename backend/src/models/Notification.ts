import mongoose, { Schema } from 'mongoose';

const schema = new Schema({
  recipient: { type: Schema.Types.ObjectId, ref: 'User' },
  audienceRoles: [{ type: String }],
  title: { type: String, required: true },
  message: { type: String, required: true },
  type: { type: String, enum: ['info', 'success', 'warning', 'error'], default: 'info' },
  readAt: { type: Date },
  channel: { type: String, enum: ['in-app', 'email', 'both'], default: 'in-app' }
}, { timestamps: true });

export const Notification = mongoose.model('Notification', schema);
