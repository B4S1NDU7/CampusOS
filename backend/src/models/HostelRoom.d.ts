import mongoose from 'mongoose';
export declare const HostelRoom: mongoose.Model<{
    capacity: number;
    status: "available" | "full" | "maintenance";
    roomNumber: string;
    block: string;
    floor: number;
    occupants: mongoose.Types.ObjectId[];
    monthlyFee: number;
    requests: mongoose.Types.DocumentArray<{
        status: "pending" | "approved" | "rejected";
        requestedAt: NativeDate;
        student?: mongoose.Types.ObjectId | null | undefined;
        note?: string | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.ObjectId, unknown, {
        status: "pending" | "approved" | "rejected";
        requestedAt: NativeDate;
        student?: mongoose.Types.ObjectId | null | undefined;
        note?: string | null | undefined;
    }, {}, {}> & {
        status: "pending" | "approved" | "rejected";
        requestedAt: NativeDate;
        student?: mongoose.Types.ObjectId | null | undefined;
        note?: string | null | undefined;
    }>;
} & mongoose.DefaultTimestampProps, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    capacity: number;
    status: "available" | "full" | "maintenance";
    roomNumber: string;
    block: string;
    floor: number;
    occupants: mongoose.Types.ObjectId[];
    monthlyFee: number;
    requests: mongoose.Types.DocumentArray<{
        status: "pending" | "approved" | "rejected";
        requestedAt: NativeDate;
        student?: mongoose.Types.ObjectId | null | undefined;
        note?: string | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.ObjectId, unknown, {
        status: "pending" | "approved" | "rejected";
        requestedAt: NativeDate;
        student?: mongoose.Types.ObjectId | null | undefined;
        note?: string | null | undefined;
    }, {}, {}> & {
        status: "pending" | "approved" | "rejected";
        requestedAt: NativeDate;
        student?: mongoose.Types.ObjectId | null | undefined;
        note?: string | null | undefined;
    }>;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    capacity: number;
    status: "available" | "full" | "maintenance";
    roomNumber: string;
    block: string;
    floor: number;
    occupants: mongoose.Types.ObjectId[];
    monthlyFee: number;
    requests: mongoose.Types.DocumentArray<{
        status: "pending" | "approved" | "rejected";
        requestedAt: NativeDate;
        student?: mongoose.Types.ObjectId | null | undefined;
        note?: string | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.ObjectId, unknown, {
        status: "pending" | "approved" | "rejected";
        requestedAt: NativeDate;
        student?: mongoose.Types.ObjectId | null | undefined;
        note?: string | null | undefined;
    }, {}, {}> & {
        status: "pending" | "approved" | "rejected";
        requestedAt: NativeDate;
        student?: mongoose.Types.ObjectId | null | undefined;
        note?: string | null | undefined;
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
    capacity: number;
    status: "available" | "full" | "maintenance";
    roomNumber: string;
    block: string;
    floor: number;
    occupants: mongoose.Types.ObjectId[];
    monthlyFee: number;
    requests: mongoose.Types.DocumentArray<{
        status: "pending" | "approved" | "rejected";
        requestedAt: NativeDate;
        student?: mongoose.Types.ObjectId | null | undefined;
        note?: string | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.ObjectId, unknown, {
        status: "pending" | "approved" | "rejected";
        requestedAt: NativeDate;
        student?: mongoose.Types.ObjectId | null | undefined;
        note?: string | null | undefined;
    }, {}, {}> & {
        status: "pending" | "approved" | "rejected";
        requestedAt: NativeDate;
        student?: mongoose.Types.ObjectId | null | undefined;
        note?: string | null | undefined;
    }>;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, {
    capacity: number;
    status: "available" | "full" | "maintenance";
    roomNumber: string;
    block: string;
    floor: number;
    occupants: mongoose.Types.ObjectId[];
    monthlyFee: number;
    requests: mongoose.Types.DocumentArray<{
        status: "pending" | "approved" | "rejected";
        requestedAt: NativeDate;
        student?: mongoose.Types.ObjectId | null | undefined;
        note?: string | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.ObjectId, unknown, {
        status: "pending" | "approved" | "rejected";
        requestedAt: NativeDate;
        student?: mongoose.Types.ObjectId | null | undefined;
        note?: string | null | undefined;
    }, {}, {}> & {
        status: "pending" | "approved" | "rejected";
        requestedAt: NativeDate;
        student?: mongoose.Types.ObjectId | null | undefined;
        note?: string | null | undefined;
    }>;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, Omit<mongoose.DefaultSchemaOptions, "timestamps"> & {
    timestamps: true;
}> & Omit<{
    capacity: number;
    status: "available" | "full" | "maintenance";
    roomNumber: string;
    block: string;
    floor: number;
    occupants: mongoose.Types.ObjectId[];
    monthlyFee: number;
    requests: mongoose.Types.DocumentArray<{
        status: "pending" | "approved" | "rejected";
        requestedAt: NativeDate;
        student?: mongoose.Types.ObjectId | null | undefined;
        note?: string | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.ObjectId, unknown, {
        status: "pending" | "approved" | "rejected";
        requestedAt: NativeDate;
        student?: mongoose.Types.ObjectId | null | undefined;
        note?: string | null | undefined;
    }, {}, {}> & {
        status: "pending" | "approved" | "rejected";
        requestedAt: NativeDate;
        student?: mongoose.Types.ObjectId | null | undefined;
        note?: string | null | undefined;
    }>;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, unknown, {
    capacity: number;
    status: "available" | "full" | "maintenance";
    roomNumber: string;
    block: string;
    floor: number;
    occupants: mongoose.Types.ObjectId[];
    monthlyFee: number;
    requests: mongoose.Types.DocumentArray<{
        status: "pending" | "approved" | "rejected";
        requestedAt: NativeDate;
        student?: mongoose.Types.ObjectId | null | undefined;
        note?: string | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.ObjectId, unknown, {
        status: "pending" | "approved" | "rejected";
        requestedAt: NativeDate;
        student?: mongoose.Types.ObjectId | null | undefined;
        note?: string | null | undefined;
    }, {}, {}> & {
        status: "pending" | "approved" | "rejected";
        requestedAt: NativeDate;
        student?: mongoose.Types.ObjectId | null | undefined;
        note?: string | null | undefined;
    }>;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    capacity: number;
    status: "available" | "full" | "maintenance";
    roomNumber: string;
    block: string;
    floor: number;
    occupants: mongoose.Types.ObjectId[];
    monthlyFee: number;
    requests: mongoose.Types.DocumentArray<{
        status: "pending" | "approved" | "rejected";
        requestedAt: NativeDate;
        student?: mongoose.Types.ObjectId | null | undefined;
        note?: string | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.ObjectId, unknown, {
        status: "pending" | "approved" | "rejected";
        requestedAt: NativeDate;
        student?: mongoose.Types.ObjectId | null | undefined;
        note?: string | null | undefined;
    }, {}, {}> & {
        status: "pending" | "approved" | "rejected";
        requestedAt: NativeDate;
        student?: mongoose.Types.ObjectId | null | undefined;
        note?: string | null | undefined;
    }>;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
//# sourceMappingURL=HostelRoom.d.ts.map