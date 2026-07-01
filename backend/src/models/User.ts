import mongoose, { Document, Schema } from 'mongoose';

export enum Role {
  SUPER_ADMIN = 'Super Admin',
  UNIVERSITY_ADMIN = 'University Admin',
  DEPARTMENT_ADMIN = 'Department Admin',
  STUDENT = 'Student',
  LECTURER = 'Lecturer',
  PARENT = 'Parent',
  ADMIN = 'Admin'
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
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  emailVerificationToken?: string;
  emailVerificationExpires?: Date;
  phone?: string;
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
    profileImage: { type: String },
    passwordResetToken: { type: String },
    passwordResetExpires: { type: Date },
    emailVerificationToken: { type: String },
    emailVerificationExpires: { type: Date },
    phone: { type: String }
  },
  { timestamps: true }
);

// Add indexes for token fields
userSchema.index({ passwordResetToken: 1 });
userSchema.index({ emailVerificationToken: 1 });

export const User = mongoose.model<IUser>('User', userSchema);
