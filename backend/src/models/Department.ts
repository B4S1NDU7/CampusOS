import mongoose, { Schema, Document } from 'mongoose';

export interface IDepartment extends Document {
  name: string;
  code: string;
  headOfDepartment?: mongoose.Types.ObjectId; // References User
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

const departmentSchema = new Schema<IDepartment>({
  name: { type: String, required: true, unique: true },
  code: { type: String, required: true, unique: true },
  headOfDepartment: { type: Schema.Types.ObjectId, ref: 'User' },
  description: { type: String }
}, { timestamps: true });

export const Department = mongoose.model<IDepartment>('Department', departmentSchema);
