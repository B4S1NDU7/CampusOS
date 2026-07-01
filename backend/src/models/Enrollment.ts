import mongoose, { Schema } from 'mongoose';

const schema = new Schema({
  student: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
  status: { type: String, enum: ['enrolled', 'dropped', 'completed'], default: 'enrolled' },
  enrolledAt: { type: Date, default: Date.now },
  droppedAt: { type: Date },
  finalGrade: { type: String }
}, { timestamps: true });

schema.index({ student: 1, course: 1 }, { unique: true });

export const Enrollment = mongoose.model('Enrollment', schema);
