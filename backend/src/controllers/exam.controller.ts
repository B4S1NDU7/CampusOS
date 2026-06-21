import { Request, Response } from 'express';
import { Exam } from '../models/Exam';
import { Grade } from '../models/Grade';

export const createExam = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, course, date, durationMinutes, maxScore } = req.body;
    const exam = await Exam.create({ title, course, date, durationMinutes, maxScore });
    res.status(201).json(exam);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

export const getExams = async (req: Request, res: Response): Promise<void> => {
  try {
    const courseId = req.query.courseId as string;
    const filter = courseId ? { course: courseId } : {};
    
    const exams = await Exam.find(filter).populate('course', 'name code');
    res.status(200).json(exams);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

export const recordGrade = async (req: Request, res: Response): Promise<void> => {
  try {
    const { student, course, assessmentId, assessmentType, score } = req.body;
    
    const grade = await Grade.findOneAndUpdate(
      { student, assessmentId, assessmentType },
      { course, score },
      { new: true, upsert: true }
    );

    res.status(200).json(grade);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

export const getStudentGrades = async (req: Request, res: Response): Promise<void> => {
  try {
    const student = (req as any).user._id;
    const grades = await Grade.find({ student })
      .populate('course', 'name code');
    res.status(200).json(grades);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

export const updateExam = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, date, durationMinutes, maxScore } = req.body;
    const exam = await Exam.findByIdAndUpdate(
      req.params.id,
      { title, date, durationMinutes, maxScore },
      { new: true }
    ).populate('course', 'name code');

    if (!exam) {
      res.status(404).json({ message: 'Exam not found' });
      return;
    }

    res.status(200).json(exam);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

export const deleteExam = async (req: Request, res: Response): Promise<void> => {
  try {
    const examId = req.params.id as string;
    
    // Delete all grades related to this exam
    await Grade.deleteMany({ assessmentId: examId, assessmentType: 'EXAM' });
    
    // Delete the exam
    const exam = await Exam.findByIdAndDelete(examId);

    if (!exam) {
      res.status(404).json({ message: 'Exam not found' });
      return;
    }

    res.status(200).json({ message: 'Exam deleted successfully', exam });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};
