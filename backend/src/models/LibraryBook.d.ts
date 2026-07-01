import mongoose from 'mongoose';
export declare const LibraryBook: mongoose.Model<{
    title: string;
    author: string;
    copiesTotal: number;
    copiesAvailable: number;
    borrowedBy: mongoose.Types.DocumentArray<{
        borrowedAt: NativeDate;
        fine: number;
        user?: mongoose.Types.ObjectId | null | undefined;
        dueAt?: NativeDate | null | undefined;
        returnedAt?: NativeDate | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.ObjectId, unknown, {
        borrowedAt: NativeDate;
        fine: number;
        user?: mongoose.Types.ObjectId | null | undefined;
        dueAt?: NativeDate | null | undefined;
        returnedAt?: NativeDate | null | undefined;
    }, {}, {}> & {
        borrowedAt: NativeDate;
        fine: number;
        user?: mongoose.Types.ObjectId | null | undefined;
        dueAt?: NativeDate | null | undefined;
        returnedAt?: NativeDate | null | undefined;
    }>;
    isbn?: string | null | undefined;
    category?: string | null | undefined;
} & mongoose.DefaultTimestampProps, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    title: string;
    author: string;
    copiesTotal: number;
    copiesAvailable: number;
    borrowedBy: mongoose.Types.DocumentArray<{
        borrowedAt: NativeDate;
        fine: number;
        user?: mongoose.Types.ObjectId | null | undefined;
        dueAt?: NativeDate | null | undefined;
        returnedAt?: NativeDate | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.ObjectId, unknown, {
        borrowedAt: NativeDate;
        fine: number;
        user?: mongoose.Types.ObjectId | null | undefined;
        dueAt?: NativeDate | null | undefined;
        returnedAt?: NativeDate | null | undefined;
    }, {}, {}> & {
        borrowedAt: NativeDate;
        fine: number;
        user?: mongoose.Types.ObjectId | null | undefined;
        dueAt?: NativeDate | null | undefined;
        returnedAt?: NativeDate | null | undefined;
    }>;
    isbn?: string | null | undefined;
    category?: string | null | undefined;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    title: string;
    author: string;
    copiesTotal: number;
    copiesAvailable: number;
    borrowedBy: mongoose.Types.DocumentArray<{
        borrowedAt: NativeDate;
        fine: number;
        user?: mongoose.Types.ObjectId | null | undefined;
        dueAt?: NativeDate | null | undefined;
        returnedAt?: NativeDate | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.ObjectId, unknown, {
        borrowedAt: NativeDate;
        fine: number;
        user?: mongoose.Types.ObjectId | null | undefined;
        dueAt?: NativeDate | null | undefined;
        returnedAt?: NativeDate | null | undefined;
    }, {}, {}> & {
        borrowedAt: NativeDate;
        fine: number;
        user?: mongoose.Types.ObjectId | null | undefined;
        dueAt?: NativeDate | null | undefined;
        returnedAt?: NativeDate | null | undefined;
    }>;
    isbn?: string | null | undefined;
    category?: string | null | undefined;
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
    author: string;
    copiesTotal: number;
    copiesAvailable: number;
    borrowedBy: mongoose.Types.DocumentArray<{
        borrowedAt: NativeDate;
        fine: number;
        user?: mongoose.Types.ObjectId | null | undefined;
        dueAt?: NativeDate | null | undefined;
        returnedAt?: NativeDate | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.ObjectId, unknown, {
        borrowedAt: NativeDate;
        fine: number;
        user?: mongoose.Types.ObjectId | null | undefined;
        dueAt?: NativeDate | null | undefined;
        returnedAt?: NativeDate | null | undefined;
    }, {}, {}> & {
        borrowedAt: NativeDate;
        fine: number;
        user?: mongoose.Types.ObjectId | null | undefined;
        dueAt?: NativeDate | null | undefined;
        returnedAt?: NativeDate | null | undefined;
    }>;
    isbn?: string | null | undefined;
    category?: string | null | undefined;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, {
    title: string;
    author: string;
    copiesTotal: number;
    copiesAvailable: number;
    borrowedBy: mongoose.Types.DocumentArray<{
        borrowedAt: NativeDate;
        fine: number;
        user?: mongoose.Types.ObjectId | null | undefined;
        dueAt?: NativeDate | null | undefined;
        returnedAt?: NativeDate | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.ObjectId, unknown, {
        borrowedAt: NativeDate;
        fine: number;
        user?: mongoose.Types.ObjectId | null | undefined;
        dueAt?: NativeDate | null | undefined;
        returnedAt?: NativeDate | null | undefined;
    }, {}, {}> & {
        borrowedAt: NativeDate;
        fine: number;
        user?: mongoose.Types.ObjectId | null | undefined;
        dueAt?: NativeDate | null | undefined;
        returnedAt?: NativeDate | null | undefined;
    }>;
    isbn?: string | null | undefined;
    category?: string | null | undefined;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, Omit<mongoose.DefaultSchemaOptions, "timestamps"> & {
    timestamps: true;
}> & Omit<{
    title: string;
    author: string;
    copiesTotal: number;
    copiesAvailable: number;
    borrowedBy: mongoose.Types.DocumentArray<{
        borrowedAt: NativeDate;
        fine: number;
        user?: mongoose.Types.ObjectId | null | undefined;
        dueAt?: NativeDate | null | undefined;
        returnedAt?: NativeDate | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.ObjectId, unknown, {
        borrowedAt: NativeDate;
        fine: number;
        user?: mongoose.Types.ObjectId | null | undefined;
        dueAt?: NativeDate | null | undefined;
        returnedAt?: NativeDate | null | undefined;
    }, {}, {}> & {
        borrowedAt: NativeDate;
        fine: number;
        user?: mongoose.Types.ObjectId | null | undefined;
        dueAt?: NativeDate | null | undefined;
        returnedAt?: NativeDate | null | undefined;
    }>;
    isbn?: string | null | undefined;
    category?: string | null | undefined;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, unknown, {
    title: string;
    author: string;
    copiesTotal: number;
    copiesAvailable: number;
    borrowedBy: mongoose.Types.DocumentArray<{
        borrowedAt: NativeDate;
        fine: number;
        user?: mongoose.Types.ObjectId | null | undefined;
        dueAt?: NativeDate | null | undefined;
        returnedAt?: NativeDate | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.ObjectId, unknown, {
        borrowedAt: NativeDate;
        fine: number;
        user?: mongoose.Types.ObjectId | null | undefined;
        dueAt?: NativeDate | null | undefined;
        returnedAt?: NativeDate | null | undefined;
    }, {}, {}> & {
        borrowedAt: NativeDate;
        fine: number;
        user?: mongoose.Types.ObjectId | null | undefined;
        dueAt?: NativeDate | null | undefined;
        returnedAt?: NativeDate | null | undefined;
    }>;
    isbn?: string | null | undefined;
    category?: string | null | undefined;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    title: string;
    author: string;
    copiesTotal: number;
    copiesAvailable: number;
    borrowedBy: mongoose.Types.DocumentArray<{
        borrowedAt: NativeDate;
        fine: number;
        user?: mongoose.Types.ObjectId | null | undefined;
        dueAt?: NativeDate | null | undefined;
        returnedAt?: NativeDate | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.ObjectId, unknown, {
        borrowedAt: NativeDate;
        fine: number;
        user?: mongoose.Types.ObjectId | null | undefined;
        dueAt?: NativeDate | null | undefined;
        returnedAt?: NativeDate | null | undefined;
    }, {}, {}> & {
        borrowedAt: NativeDate;
        fine: number;
        user?: mongoose.Types.ObjectId | null | undefined;
        dueAt?: NativeDate | null | undefined;
        returnedAt?: NativeDate | null | undefined;
    }>;
    isbn?: string | null | undefined;
    category?: string | null | undefined;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
//# sourceMappingURL=LibraryBook.d.ts.map