import mongoose, { Document } from 'mongoose';
export interface IExam extends Document {
    title: string;
    course: mongoose.Types.ObjectId;
    date: Date;
    durationMinutes: number;
    maxScore: number;
    createdAt: Date;
    updatedAt: Date;
}
export declare const Exam: mongoose.Model<IExam, {}, {}, {}, mongoose.Document<unknown, {}, IExam, {}, mongoose.DefaultSchemaOptions> & IExam & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IExam>;
//# sourceMappingURL=Exam.d.ts.map