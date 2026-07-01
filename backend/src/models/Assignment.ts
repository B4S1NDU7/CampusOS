import mongoose, { Schema, Document } from 'mongoose';

export interface IAssignment extends Document {
  title: string;
  description: string;
  course: mongoose.Types.ObjectId; // References Course
  dueDate: Date;
  maxScore: number;
  createdBy: mongoose.Types.ObjectId; // References User
  createdAt: Date;
  updatedAt: Date;
}

const assignmentSchema = new Schema<IAssignment>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
  dueDate: { type: Date, required: true },
  maxScore: { type: Number, required: true, default: 100 },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

export const Assignment = mongoose.model<IAssignment>('Assignment', assignmentSchema);
