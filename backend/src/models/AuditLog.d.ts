import mongoose from 'mongoose';
export declare const AuditLog: mongoose.Model<{
    action: "read" | "delete" | "create" | "update" | "login" | "logout" | "ai" | "payment";
    entity: string;
    before?: any;
    after?: any;
    actor?: mongoose.Types.ObjectId | null | undefined;
    entityId?: mongoose.Types.ObjectId | null | undefined;
    ip?: string | null | undefined;
    userAgent?: string | null | undefined;
} & mongoose.DefaultTimestampProps, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    action: "read" | "delete" | "create" | "update" | "login" | "logout" | "ai" | "payment";
    entity: string;
    before?: any;
    after?: any;
    actor?: mongoose.Types.ObjectId | null | undefined;
    entityId?: mongoose.Types.ObjectId | null | undefined;
    ip?: string | null | undefined;
    userAgent?: string | null | undefined;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    action: "read" | "delete" | "create" | "update" | "login" | "logout" | "ai" | "payment";
    entity: string;
    before?: any;
    after?: any;
    actor?: mongoose.Types.ObjectId | null | undefined;
    entityId?: mongoose.Types.ObjectId | null | undefined;
    ip?: string | null | undefined;
    userAgent?: string | null | undefined;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    action: "read" | "delete" | "create" | "update" | "login" | "logout" | "ai" | "payment";
    entity: string;
    before?: any;
    after?: any;
    actor?: mongoose.Types.ObjectId | null | undefined;
    entityId?: mongoose.Types.ObjectId | null | undefined;
    ip?: string | null | undefined;
    userAgent?: string | null | undefined;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, {
    action: "read" | "delete" | "create" | "update" | "login" | "logout" | "ai" | "payment";
    entity: string;
    before?: any;
    after?: any;
    actor?: mongoose.Types.ObjectId | null | undefined;
    entityId?: mongoose.Types.ObjectId | null | undefined;
    ip?: string | null | undefined;
    userAgent?: string | null | undefined;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, Omit<mongoose.DefaultSchemaOptions, "timestamps"> & {
    timestamps: true;
}> & Omit<{
    action: "read" | "delete" | "create" | "update" | "login" | "logout" | "ai" | "payment";
    entity: string;
    before?: any;
    after?: any;
    actor?: mongoose.Types.ObjectId | null | undefined;
    entityId?: mongoose.Types.ObjectId | null | undefined;
    ip?: string | null | undefined;
    userAgent?: string | null | undefined;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, unknown, {
    action: "read" | "delete" | "create" | "update" | "login" | "logout" | "ai" | "payment";
    entity: string;
    before?: any;
    after?: any;
    actor?: mongoose.Types.ObjectId | null | undefined;
    entityId?: mongoose.Types.ObjectId | null | undefined;
    ip?: string | null | undefined;
    userAgent?: string | null | undefined;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    action: "read" | "delete" | "create" | "update" | "login" | "logout" | "ai" | "payment";
    entity: string;
    before?: any;
    after?: any;
    actor?: mongoose.Types.ObjectId | null | undefined;
    entityId?: mongoose.Types.ObjectId | null | undefined;
    ip?: string | null | undefined;
    userAgent?: string | null | undefined;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
//# sourceMappingURL=AuditLog.d.ts.map