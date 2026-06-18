import mongoose, { Document, Schema } from 'mongoose';

export enum Role {
  STUDENT = 'Student',
  LECTURER = 'Lecturer',
  ADMIN = 'Admin',
  PARENT = 'Parent'
}

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  role: Role;
  isVerified: boolean;
  googleId?: string;
  profileImage?: string;
}

const userSchema = new Schema<IUser>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String }, // Optional for Google OAuth users
    role: { type: String, enum: Object.values(Role), default: Role.STUDENT },
    isVerified: { type: Boolean, default: false },
    googleId: { type: String },
    profileImage: { type: String }
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>('User', userSchema);