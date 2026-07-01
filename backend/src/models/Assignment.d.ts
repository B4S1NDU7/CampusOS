import mongoose, { Document } from 'mongoose';
export interface IAssignment extends Document {
    title: string;
    description: string;
    course: mongoose.Types.ObjectId;
    dueDate: Date;
    maxScore: number;
    createdBy: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}
export declare const Assignment: mongoose.Model<IAssignment, {}, {}, {}, mongoose.Document<unknown, {}, IAssignment, {}, mongoose.DefaultSchemaOptions> & IAssignment & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IAssignment>;
//# sourceMappingURL=Assignment.d.ts.map