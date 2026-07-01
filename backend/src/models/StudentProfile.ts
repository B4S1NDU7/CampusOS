import mongoose, { Schema, Document } from 'mongoose';

export interface IStudentProfile extends Document {
  user: mongoose.Types.ObjectId; // References User
  studentId: string;
  department?: mongoose.Types.ObjectId; // References Department
  enrollmentYear: number;
  gpa: number;
  createdAt: Date;
  updatedAt: Date;
}

const studentProfileSchema = new Schema<IStudentProfile>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  studentId: { type: String, required: true, unique: true },
  department: { type: Schema.Types.ObjectId, ref: 'Department' },
  enrollmentYear: { type: Number, required: true },
  gpa: { type: Number, default: 0.0 }
}, { timestamps: true });

export const StudentProfile = mongoose.model<IStudentProfile>('StudentProfile', studentProfileSchema);
