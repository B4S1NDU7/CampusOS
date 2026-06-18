import mongoose, { Document } from 'mongoose';
export declare enum Role {
    STUDENT = "Student",
    LECTURER = "Lecturer",
    ADMIN = "Admin",
    PARENT = "Parent"
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
export declare const User: mongoose.Model<IUser, {}, {}, {}, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IUser>;
//# sourceMappingURL=User.d.ts.map