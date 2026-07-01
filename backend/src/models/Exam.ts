import mongoose, { Schema, Document } from 'mongoose';

export interface IExam extends Document {
  title: string;
  course: mongoose.Types.ObjectId; // References Course
  date: Date;
  durationMinutes: number;
  maxScore: number;
  createdAt: Date;
  updatedAt: Date;
}

const examSchema = new Schema<IExam>({
  title: { type: String, required: true },
  course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
  date: { type: Date, required: true },
  durationMinutes: { type: Number, required: true, default: 120 },
  maxScore: { type: Number, required: true, default: 100 }
}, { timestamps: true });

export const Exam = mongoose.model<IExam>('Exam', examSchema);
