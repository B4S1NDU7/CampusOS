import mongoose, { Schema } from 'mongoose';

const schema = new Schema({
  title: { type: String, required: true },
  isbn: { type: String, unique: true, sparse: true },
  author: { type: String, required: true },
  category: { type: String },
  copiesTotal: { type: Number, default: 1 },
  copiesAvailable: { type: Number, default: 1 },
  borrowedBy: [{
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    borrowedAt: { type: Date, default: Date.now },
    dueAt: { type: Date },
    returnedAt: { type: Date },
    fine: { type: Number, default: 0 }
  }]
}, { timestamps: true });

export const LibraryBook = mongoose.model('LibraryBook', schema);
