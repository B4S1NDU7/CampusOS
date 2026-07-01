import mongoose, { Document } from 'mongoose';
export interface IGrade extends Document {
    student: mongoose.Types.ObjectId;
    course: mongoose.Types.ObjectId;
    assessmentId: mongoose.Types.ObjectId;
    assessmentType: 'Exam' | 'Assignment';
    score: number;
    createdAt: Date;
    updatedAt: Date;
}
export declare const Grade: mongoose.Model<IGrade, {}, {}, {}, mongoose.Document<unknown, {}, IGrade, {}, mongoose.DefaultSchemaOptions> & IGrade & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IGrade>;
//# sourceMappingURL=Grade.d.ts.map