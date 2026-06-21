import { Request, Response } from 'express';
import { Assignment } from '../models/Assignment';
import { Submission } from '../models/Submission';

export const createAssignment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description, course, dueDate, maxScore } = req.body;
    const createdBy = (req as any).user._id;

    const assignment = await Assignment.create({ title, description, course, dueDate, maxScore, createdBy });
    res.status(201).json(assignment);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

export const getAssignments = async (req: Request, res: Response): Promise<void> => {
  try {
    const courseId = req.query.courseId as string;
    const filter = courseId ? { course: courseId } : {};
    
    const assignments = await Assignment.find(filter)
      .populate('course', 'name code')
      .populate('createdBy', 'firstName lastName');
    res.status(200).json(assignments);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

export const submitAssignment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { fileUrl } = req.body;
    const student = (req as any).user._id;
    const assignmentId = req.params.id as string;

    const existing = await Submission.findOne({ assignment: assignmentId, student });
    if (existing) {
      res.status(400).json({ message: 'You have already submitted this assignment' });
      return;
    }

    const submission = await Submission.create({ assignment: assignmentId, student, fileUrl });
    res.status(201).json(submission);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

export const gradeSubmission = async (req: Request, res: Response): Promise<void> => {
  try {
    const { score, feedback } = req.body;
    const submission = await Submission.findByIdAndUpdate(
      req.params.submissionId,
      { score, feedback },
      { new: true }
    );

    if (!submission) {
      res.status(404).json({ message: 'Submission not found' });
      return;
    }

    res.status(200).json(submission);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

export const deleteAssignment = async (req: Request, res: Response): Promise<void> => {
  try {
    const assignmentId = req.params.id as string;
    
    // Delete all submissions for this assignment
    await Submission.deleteMany({ assignment: assignmentId });
    
    // Delete the assignment
    const assignment = await Assignment.findByIdAndDelete(assignmentId);
    
    if (!assignment) {
      res.status(404).json({ message: 'Assignment not found' });
      return;
    }

    res.status(200).json({ message: 'Assignment deleted successfully', assignment });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

export const updateAssignment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description, dueDate, maxScore } = req.body;
    const assignment = await Assignment.findByIdAndUpdate(
      req.params.id,
      { title, description, dueDate, maxScore },
      { new: true }
    );

    if (!assignment) {
      res.status(404).json({ message: 'Assignment not found' });
      return;
    }

    res.status(200).json(assignment);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

export const getSubmissionsForAssignment = async (req: Request, res: Response): Promise<void> => {
  try {
    const submissions = await Submission.find({ assignment: req.params.id as string })
      .populate('student', 'firstName lastName email');
    res.status(200).json(submissions);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};
