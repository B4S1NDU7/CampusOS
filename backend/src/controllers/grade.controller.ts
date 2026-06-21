import { Request, Response } from 'express';
import { Grade } from '../models/Grade';
import { crudFactory } from '../utils/crudFactory';

const crud = crudFactory(Grade, { populate: ['student', 'course'], searchable: ['assessmentType'] });

export const create = crud.create;
export const getAll = crud.getAll;
export const getById = crud.getById;
export const update = crud.update;
export const remove = crud.remove;

export const calculateGpa = async (req: Request, res: Response): Promise<void> => {
  try {
    const grades = await Grade.find({ student: req.params.studentId });
    if (grades.length === 0) {
      res.status(200).json({ gpa: 0, credits: 0 });
      return;
    }

    const average = grades.reduce((sum, grade: any) => sum + grade.score, 0) / grades.length;
    const gpa = Math.min(4, Math.max(0, (average / 100) * 4));
    res.status(200).json({ gpa: Number(gpa.toFixed(2)), assessmentCount: grades.length });
  } catch (error) {
    res.status(500).json({ message: 'Failed to calculate GPA', error });
  }
};
