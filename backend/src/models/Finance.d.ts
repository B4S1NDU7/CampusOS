import mongoose from 'mongoose';
export declare const Finance: mongoose.Model<{
    description: string;
    status: "void" | "draft" | "issued" | "paid" | "overdue";
    invoiceNumber: string;
    amount: number;
    currency: string;
    dueDate?: NativeDate | null | undefined;
    student?: mongoose.Types.ObjectId | null | undefined;
    stripePaymentIntentId?: string | null | undefined;
    scholarship?: {
        amount: number;
        name?: string | null | undefined;
    } | null | undefined;
    paidAt?: NativeDate | null | undefined;
} & mongoose.DefaultTimestampProps, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    description: string;
    status: "void" | "draft" | "issued" | "paid" | "overdue";
    invoiceNumber: string;
    amount: number;
    currency: string;
    dueDate?: NativeDate | null | undefined;
    student?: mongoose.Types.ObjectId | null | undefined;
    stripePaymentIntentId?: string | null | undefined;
    scholarship?: {
        amount: number;
        name?: string | null | undefined;
    } | null | undefined;
    paidAt?: NativeDate | null | undefined;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    description: string;
    status: "void" | "draft" | "issued" | "paid" | "overdue";
    invoiceNumber: string;
    amount: number;
    currency: string;
    dueDate?: NativeDate | null | undefined;
    student?: mongoose.Types.ObjectId | null | undefined;
    stripePaymentIntentId?: string | null | undefined;
    scholarship?: {
        amount: number;
        name?: string | null | undefined;
    } | null | undefined;
    paidAt?: NativeDate | null | undefined;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    description: string;
    status: "void" | "draft" | "issued" | "paid" | "overdue";
    invoiceNumber: string;
    amount: number;
    currency: string;
    dueDate?: NativeDate | null | undefined;
    student?: mongoose.Types.ObjectId | null | undefined;
    stripePaymentIntentId?: string | null | undefined;
    scholarship?: {
        amount: number;
        name?: string | null | undefined;
    } | null | undefined;
    paidAt?: NativeDate | null | undefined;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, {
    description: string;
    status: "void" | "draft" | "issued" | "paid" | "overdue";
    invoiceNumber: string;
    amount: number;
    currency: string;
    dueDate?: NativeDate | null | undefined;
    student?: mongoose.Types.ObjectId | null | undefined;
    stripePaymentIntentId?: string | null | undefined;
    scholarship?: {
        amount: number;
        name?: string | null | undefined;
    } | null | undefined;
    paidAt?: NativeDate | null | undefined;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, Omit<mongoose.DefaultSchemaOptions, "timestamps"> & {
    timestamps: true;
}> & Omit<{
    description: string;
    status: "void" | "draft" | "issued" | "paid" | "overdue";
    invoiceNumber: string;
    amount: number;
    currency: string;
    dueDate?: NativeDate | null | undefined;
    student?: mongoose.Types.ObjectId | null | undefined;
    stripePaymentIntentId?: string | null | undefined;
    scholarship?: {
        amount: number;
        name?: string | null | undefined;
    } | null | undefined;
    paidAt?: NativeDate | null | undefined;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, unknown, {
    description: string;
    status: "void" | "draft" | "issued" | "paid" | "overdue";
    invoiceNumber: string;
    amount: number;
    currency: string;
    dueDate?: NativeDate | null | undefined;
    student?: mongoose.Types.ObjectId | null | undefined;
    stripePaymentIntentId?: string | null | undefined;
    scholarship?: {
        amount: number;
        name?: string | null | undefined;
    } | null | undefined;
    paidAt?: NativeDate | null | undefined;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    description: string;
    status: "void" | "draft" | "issued" | "paid" | "overdue";
    invoiceNumber: string;
    amount: number;
    currency: string;
    dueDate?: NativeDate | null | undefined;
    student?: mongoose.Types.ObjectId | null | undefined;
    stripePaymentIntentId?: string | null | undefined;
    scholarship?: {
        amount: number;
        name?: string | null | undefined;
    } | null | undefined;
    paidAt?: NativeDate | null | undefined;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
//# sourceMappingURL=Finance.d.ts.map