import mongoose, { Schema } from 'mongoose';

const schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  feature: {
    type: String,
    required: true,
    enum: ['study-assistant', 'question-generator', 'assignment-feedback', 'gpa-prediction', 'dropout-risk', 'course-recommendations']
  },
  prompt: { type: String, required: true },
  response: { type: String },
  provider: { type: String, enum: ['gemini', 'openai', 'fallback'], default: 'fallback' },
  metadata: { type: Schema.Types.Mixed }
}, { timestamps: true });

export const AIRequest = mongoose.model('AIRequest', schema);
