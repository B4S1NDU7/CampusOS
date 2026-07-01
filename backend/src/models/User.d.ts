import mongoose, { Document } from 'mongoose';
export declare enum Role {
    SUPER_ADMIN = "Super Admin",
    UNIVERSITY_ADMIN = "University Admin",
    DEPARTMENT_ADMIN = "Department Admin",
    STUDENT = "Student",
    LECTURER = "Lecturer",
    PARENT = "Parent",
    ADMIN = "Admin"
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