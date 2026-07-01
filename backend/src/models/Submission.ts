import mongoose, { Schema, Document } from 'mongoose';

export interface ISubmission extends Document {
  assignment: mongoose.Types.ObjectId; // References Assignment
  student: mongoose.Types.ObjectId; // References User
  fileUrl: string;
  score?: number;
  feedback?: string;
  submittedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const submissionSchema = new Schema<ISubmission>({
  assignment: { type: Schema.Types.ObjectId, ref: 'Assignment', required: true },
  student: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  fileUrl: { type: String, required: true },
  score: { type: Number },
  feedback: { type: String },
  submittedAt: { type: Date, default: Date.now }
}, { timestamps: true });

// A student can only submit once per assignment
submissionSchema.index({ assignment: 1, student: 1 }, { unique: true });

export const Submission = mongoose.model<ISubmission>('Submission', submissionSchema);
