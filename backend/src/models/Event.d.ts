import mongoose from 'mongoose';
export declare const Event: mongoose.Model<{
    title: string;
    capacity: number;
    status: "draft" | "published" | "cancelled" | "completed";
    startsAt: NativeDate;
    registeredUsers: mongoose.Types.ObjectId[];
    description?: string | null | undefined;
    endsAt?: NativeDate | null | undefined;
    location?: string | null | undefined;
    organizer?: mongoose.Types.ObjectId | null | undefined;
} & mongoose.DefaultTimestampProps, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    title: string;
    capacity: number;
    status: "draft" | "published" | "cancelled" | "completed";
    startsAt: NativeDate;
    registeredUsers: mongoose.Types.ObjectId[];
    description?: string | null | undefined;
    endsAt?: NativeDate | null | undefined;
    location?: string | null | undefined;
    organizer?: mongoose.Types.ObjectId | null | undefined;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    title: string;
    capacity: number;
    status: "draft" | "published" | "cancelled" | "completed";
    startsAt: NativeDate;
    registeredUsers: mongoose.Types.ObjectId[];
    description?: string | null | undefined;
    endsAt?: NativeDate | null | undefined;
    location?: string | null | undefined;
    organizer?: mongoose.Types.ObjectId | null | undefined;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    title: string;
    capacity: number;
    status: "draft" | "published" | "cancelled" | "completed";
    startsAt: NativeDate;
    registeredUsers: mongoose.Types.ObjectId[];
    description?: string | null | undefined;
    endsAt?: NativeDate | null | undefined;
    location?: string | null | undefined;
    organizer?: mongoose.Types.ObjectId | null | undefined;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, {
    title: string;
    capacity: number;
    status: "draft" | "published" | "cancelled" | "completed";
    startsAt: NativeDate;
    registeredUsers: mongoose.Types.ObjectId[];
    description?: string | null | undefined;
    endsAt?: NativeDate | null | undefined;
    location?: string | null | undefined;
    organizer?: mongoose.Types.ObjectId | null | undefined;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, Omit<mongoose.DefaultSchemaOptions, "timestamps"> & {
    timestamps: true;
}> & Omit<{
    title: string;
    capacity: number;
    status: "draft" | "published" | "cancelled" | "completed";
    startsAt: NativeDate;
    registeredUsers: mongoose.Types.ObjectId[];
    description?: string | null | undefined;
    endsAt?: NativeDate | null | undefined;
    location?: string | null | undefined;
    organizer?: mongoose.Types.ObjectId | null | undefined;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, unknown, {
    title: string;
    capacity: number;
    status: "draft" | "published" | "cancelled" | "completed";
    startsAt: NativeDate;
    registeredUsers: mongoose.Types.ObjectId[];
    description?: string | null | undefined;
    endsAt?: NativeDate | null | undefined;
    location?: string | null | undefined;
    organizer?: mongoose.Types.ObjectId | null | undefined;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    title: string;
    capacity: number;
    status: "draft" | "published" | "cancelled" | "completed";
    startsAt: NativeDate;
    registeredUsers: mongoose.Types.ObjectId[];
    description?: string | null | undefined;
    endsAt?: NativeDate | null | undefined;
    location?: string | null | undefined;
    organizer?: mongoose.Types.ObjectId | null | undefined;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
//# sourceMappingURL=Event.d.ts.map