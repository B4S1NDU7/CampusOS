import mongoose, { Schema, Document } from 'mongoose';

export interface IGrade extends Document {
  student: mongoose.Types.ObjectId; // References User
  course: mongoose.Types.ObjectId; // References Course
  assessmentId: mongoose.Types.ObjectId; // References Exam or Assignment
  assessmentType: 'Exam' | 'Assignment';
  score: number;
  createdAt: Date;
  updatedAt: Date;
}

const gradeSchema = new Schema<IGrade>({
  student: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
  assessmentId: { type: Schema.Types.ObjectId, required: true },
  assessmentType: { type: String, enum: ['Exam', 'Assignment'], required: true },
  score: { type: Number, required: true }
}, { timestamps: true });

// Prevent duplicate grades for the same assessment for a student
gradeSchema.index({ student: 1, assessmentId: 1, assessmentType: 1 }, { unique: true });

export const Grade = mongoose.model<IGrade>('Grade', gradeSchema);
