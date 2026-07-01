import mongoose, { Schema, Document } from 'mongoose';

export interface ILecturerProfile extends Document {
  user: mongoose.Types.ObjectId; // References User
  employeeId: string;
  department?: mongoose.Types.ObjectId; // References Department
  title: string;
  createdAt: Date;
  updatedAt: Date;
}

const lecturerProfileSchema = new Schema<ILecturerProfile>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  employeeId: { type: String, required: true, unique: true },
  department: { type: Schema.Types.ObjectId, ref: 'Department' },
  title: { type: String, required: true, enum: ['Mr.', 'Ms.', 'Mrs.', 'Dr.', 'Prof.'] }
}, { timestamps: true });

export const LecturerProfile = mongoose.model<ILecturerProfile>('LecturerProfile', lecturerProfileSchema);
