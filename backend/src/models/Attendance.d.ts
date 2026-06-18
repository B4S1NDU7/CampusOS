import mongoose from 'mongoose';
export declare const Attendance: mongoose.Model<{
    date: NativeDate;
    course: mongoose.Types.ObjectId;
    records: mongoose.Types.DocumentArray<{
        student?: mongoose.Types.ObjectId | null;
        status?: "Present" | "Absent" | "Late" | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.ObjectId, unknown, {
        student?: mongoose.Types.ObjectId | null;
        status?: "Present" | "Absent" | "Late" | null;
    }, {}, {}> & {
        student?: mongoose.Types.ObjectId | null;
        status?: "Present" | "Absent" | "Late" | null;
    }>;
} & mongoose.DefaultTimestampProps, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    date: NativeDate;
    course: mongoose.Types.ObjectId;
    records: mongoose.Types.DocumentArray<{
        student?: mongoose.Types.ObjectId | null;
        status?: "Present" | "Absent" | "Late" | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.ObjectId, unknown, {
        student?: mongoose.Types.ObjectId | null;
        status?: "Present" | "Absent" | "Late" | null;
    }, {}, {}> & {
        student?: mongoose.Types.ObjectId | null;
        status?: "Present" | "Absent" | "Late" | null;
    }>;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    date: NativeDate;
    course: mongoose.Types.ObjectId;
    records: mongoose.Types.DocumentArray<{
        student?: mongoose.Types.ObjectId | null;
        status?: "Present" | "Absent" | "Late" | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.ObjectId, unknown, {
        student?: mongoose.Types.ObjectId | null;
        status?: "Present" | "Absent" | "Late" | null;
    }, {}, {}> & {
        student?: mongoose.Types.ObjectId | null;
        status?: "Present" | "Absent" | "Late" | null;
    }>;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    date: NativeDate;
    course: mongoose.Types.ObjectId;
    records: mongoose.Types.DocumentArray<{
        student?: mongoose.Types.ObjectId | null;
        status?: "Present" | "Absent" | "Late" | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.ObjectId, unknown, {
        student?: mongoose.Types.ObjectId | null;
        status?: "Present" | "Absent" | "Late" | null;
    }, {}, {}> & {
        student?: mongoose.Types.ObjectId | null;
        status?: "Present" | "Absent" | "Late" | null;
    }>;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, {
    date: NativeDate;
    course: mongoose.Types.ObjectId;
    records: mongoose.Types.DocumentArray<{
        student?: mongoose.Types.ObjectId | null;
        status?: "Present" | "Absent" | "Late" | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.ObjectId, unknown, {
        student?: mongoose.Types.ObjectId | null;
        status?: "Present" | "Absent" | "Late" | null;
    }, {}, {}> & {
        student?: mongoose.Types.ObjectId | null;
        status?: "Present" | "Absent" | "Late" | null;
    }>;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, Omit<mongoose.DefaultSchemaOptions, "timestamps"> & {
    timestamps: true;
}> & Omit<{
    date: NativeDate;
    course: mongoose.Types.ObjectId;
    records: mongoose.Types.DocumentArray<{
        student?: mongoose.Types.ObjectId | null;
        status?: "Present" | "Absent" | "Late" | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.ObjectId, unknown, {
        student?: mongoose.Types.ObjectId | null;
        status?: "Present" | "Absent" | "Late" | null;
    }, {}, {}> & {
        student?: mongoose.Types.ObjectId | null;
        status?: "Present" | "Absent" | "Late" | null;
    }>;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, unknown, {
    date: NativeDate;
    course: mongoose.Types.ObjectId;
    records: mongoose.Types.DocumentArray<{
        student?: mongoose.Types.ObjectId | null;
        status?: "Present" | "Absent" | "Late" | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.ObjectId, unknown, {
        student?: mongoose.Types.ObjectId | null;
        status?: "Present" | "Absent" | "Late" | null;
    }, {}, {}> & {
        student?: mongoose.Types.ObjectId | null;
        status?: "Present" | "Absent" | "Late" | null;
    }>;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    date: NativeDate;
    course: mongoose.Types.ObjectId;
    records: mongoose.Types.DocumentArray<{
        student?: mongoose.Types.ObjectId | null;
        status?: "Present" | "Absent" | "Late" | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.ObjectId, unknown, {
        student?: mongoose.Types.ObjectId | null;
        status?: "Present" | "Absent" | "Late" | null;
    }, {}, {}> & {
        student?: mongoose.Types.ObjectId | null;
        status?: "Present" | "Absent" | "Late" | null;
    }>;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
//# sourceMappingURL=Attendance.d.ts.map