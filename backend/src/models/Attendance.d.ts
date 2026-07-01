import mongoose, { Document } from 'mongoose';
export interface IAttendanceRecord {
    student: mongoose.Types.ObjectId;
    status: 'Present' | 'Absent' | 'Late';
}
export interface IAttendance extends Document {
    course: mongoose.Types.ObjectId;
    date: Date;
    records: IAttendanceRecord[];
    createdAt: Date;
    updatedAt: Date;
}
export declare const Attendance: mongoose.Model<IAttendance, {}, {}, {}, mongoose.Document<unknown, {}, IAttendance, {}, mongoose.DefaultSchemaOptions> & IAttendance & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IAttendance>;
//# sourceMappingURL=Attendance.d.ts.map