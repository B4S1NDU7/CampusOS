import mongoose, { Document } from 'mongoose';
export interface ICourse extends Document {
    name: string;
    code: string;
    credits: number;
    department: mongoose.Types.ObjectId;
    lecturers: mongoose.Types.ObjectId[];
    prerequisites: mongoose.Types.ObjectId[];
    capacity: number;
    createdAt: Date;
    updatedAt: Date;
}
export declare const Course: mongoose.Model<ICourse, {}, {}, {}, mongoose.Document<unknown, {}, ICourse, {}, mongoose.DefaultSchemaOptions> & ICourse & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, ICourse>;
//# sourceMappingURL=Course.d.ts.map