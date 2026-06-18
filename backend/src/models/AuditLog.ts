import mongoose, { Schema } from 'mongoose';

const schema = new Schema({
  name: { type: String, required: true },
  details: { type: Schema.Types.Mixed }
}, { timestamps: true });

export const AuditLog = mongoose.model('AuditLog', schema);
