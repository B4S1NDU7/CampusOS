import mongoose, { Document } from 'mongoose';
export interface IDepartment extends Document {
    name: string;
    code: string;
    headOfDepartment?: mongoose.Types.ObjectId;
    description?: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare const Department: mongoose.Model<IDepartment, {}, {}, {}, mongoose.Document<unknown, {}, IDepartment, {}, mongoose.DefaultSchemaOptions> & IDepartment & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IDepartment>;
//# sourceMappingURL=Department.d.ts.map