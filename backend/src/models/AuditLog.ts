import mongoose, { Schema } from 'mongoose';

const schema = new Schema({
  actor: { type: Schema.Types.ObjectId, ref: 'User' },
  action: { type: String, required: true, enum: ['create', 'read', 'update', 'delete', 'login', 'logout', 'ai', 'payment'] },
  entity: { type: String, required: true },
  entityId: { type: Schema.Types.ObjectId },
  before: { type: Schema.Types.Mixed },
  after: { type: Schema.Types.Mixed },
  ip: { type: String },
  userAgent: { type: String }
}, { timestamps: true });

export const AuditLog = mongoose.model('AuditLog', schema);
