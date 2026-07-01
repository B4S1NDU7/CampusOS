import mongoose from 'mongoose';
export declare const Notification: mongoose.Model<{
    message: string;
    type: "error" | "success" | "info" | "warning";
    title: string;
    audienceRoles: string[];
    channel: "email" | "in-app" | "both";
    recipient?: mongoose.Types.ObjectId | null | undefined;
    readAt?: NativeDate | null | undefined;
} & mongoose.DefaultTimestampProps, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    message: string;
    type: "error" | "success" | "info" | "warning";
    title: string;
    audienceRoles: string[];
    channel: "email" | "in-app" | "both";
    recipient?: mongoose.Types.ObjectId | null | undefined;
    readAt?: NativeDate | null | undefined;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    message: string;
    type: "error" | "success" | "info" | "warning";
    title: string;
    audienceRoles: string[];
    channel: "email" | "in-app" | "both";
    recipient?: mongoose.Types.ObjectId | null | undefined;
    readAt?: NativeDate | null | undefined;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    message: string;
    type: "error" | "success" | "info" | "warning";
    title: string;
    audienceRoles: string[];
    channel: "email" | "in-app" | "both";
    recipient?: mongoose.Types.ObjectId | null | undefined;
    readAt?: NativeDate | null | undefined;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, {
    message: string;
    type: "error" | "success" | "info" | "warning";
    title: string;
    audienceRoles: string[];
    channel: "email" | "in-app" | "both";
    recipient?: mongoose.Types.ObjectId | null | undefined;
    readAt?: NativeDate | null | undefined;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, Omit<mongoose.DefaultSchemaOptions, "timestamps"> & {
    timestamps: true;
}> & Omit<{
    message: string;
    type: "error" | "success" | "info" | "warning";
    title: string;
    audienceRoles: string[];
    channel: "email" | "in-app" | "both";
    recipient?: mongoose.Types.ObjectId | null | undefined;
    readAt?: NativeDate | null | undefined;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, unknown, {
    message: string;
    type: "error" | "success" | "info" | "warning";
    title: string;
    audienceRoles: string[];
    channel: "email" | "in-app" | "both";
    recipient?: mongoose.Types.ObjectId | null | undefined;
    readAt?: NativeDate | null | undefined;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    message: string;
    type: "error" | "success" | "info" | "warning";
    title: string;
    audienceRoles: string[];
    channel: "email" | "in-app" | "both";
    recipient?: mongoose.Types.ObjectId | null | undefined;
    readAt?: NativeDate | null | undefined;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
//# sourceMappingURL=Notification.d.ts.map