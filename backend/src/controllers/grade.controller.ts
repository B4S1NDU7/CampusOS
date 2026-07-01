import { Request, Response } from 'express';
import { Grade } from '../models/Grade';
import { StudentProfile } from '../models/StudentProfile';
import { crudFactory } from '../utils/crudFactory';

const crud = crudFactory(Grade, { populate: ['student', 'course'], searchable: ['assessmentType'] });

export const create = crud.create;
export const getAll = crud.getAll;
export const getById = crud.getById;
export const update = crud.update;
export const remove = crud.remove;

export const generateTranscript = async (req: Request, res: Response): Promise<void> => {
  try {
    const studentId = req.params.studentId;
    const profile = await StudentProfile.findOne({ user: studentId }).populate('department');
    const grades = await Grade.find({ student: studentId }).populate('course');

    if (!profile) {
      res.status(404).json({ message: 'Student profile not found' });
      return;
    }

    const transcript = {
      student: profile,
      grades: grades.map(g => {
        const score = g.score || 0;
        let letterGrade = 'F';
        if (score >= 90) letterGrade = 'A';
        else if (score >= 80) letterGrade = 'B';
        else if (score >= 70) letterGrade = 'C';
        else if (score >= 60) letterGrade = 'D';

        return {
          course: (g.course as any)?.title || 'Unknown Course',
          code: (g.course as any)?.code || 'N/A',
          score: score,
          grade: letterGrade,
          credits: (g.course as any)?.credits || 3,
          term: (g as any).term || 'Current Term'
        };
      }),
      gpa: profile.gpa,
      generatedAt: new Date()
    };

    res.status(200).json(transcript);
  } catch (error) {
    res.status(500).json({ message: 'Failed to generate transcript', error });
  }
};

export const calculateGpa = async (req: Request, res: Response): Promise<void> => {
  try {
    const grades = await Grade.find({ student: req.params.studentId });
    if (grades.length === 0) {
      res.status(200).json({ gpa: 0, credits: 0 });
      return;
    }

    const average = grades.reduce((sum, grade: any) => sum + grade.score, 0) / grades.length;
    const gpa = Number(Math.min(4, Math.max(0, (average / 100) * 4)).toFixed(2));
    
    await StudentProfile.findOneAndUpdate(
      { user: req.params.studentId },
      { gpa }
    );

    res.status(200).json({ gpa, assessmentCount: grades.length });
  } catch (error) {
    res.status(500).json({ message: 'Failed to calculate GPA', error });
  }
};
