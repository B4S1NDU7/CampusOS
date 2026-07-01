import mongoose from 'mongoose';
import { Course } from '../models/Course';

const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export const resolveCourseReference = async (candidate?: string) => {
  if (!candidate) {
    return null;
  }

  const normalized = candidate.trim();
  if (!normalized) {
    return null;
  }

  const query = mongoose.isValidObjectId(normalized)
    ? { _id: normalized }
    : { code: { $regex: `^${escapeRegExp(normalized)}$`, $options: 'i' } };

  return Course.findOne(query);
};
