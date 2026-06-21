import { Request, Response } from 'express';
import { StudentProfile } from '../models/StudentProfile';
import { User, Role } from '../models/User';
import bcrypt from 'bcrypt';

// Create Student (Admin/Registrar)
export const createStudent = async (req: Request, res: Response): Promise<void> => {
  try {
    const { firstName, lastName, email, password, studentId, department, enrollmentYear } = req.body;
    
    // Check if user already exists
    let user = await User.findOne({ email });
    if (!user) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password || 'defaultPassword123', salt);
      user = await User.create({ firstName, lastName, email, password: hashedPassword, role: Role.STUDENT });
    }

    const existingProfile = await StudentProfile.findOne({ studentId });
    if (existingProfile) {
      res.status(400).json({ message: 'Student ID already exists' });
      return;
    }

    const profile = await StudentProfile.create({
      user: user._id,
      studentId,
      department,
      enrollmentYear,
      gpa: 0.0
    });

    res.status(201).json({ user, profile });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// Get All Students
export const getStudents = async (req: Request, res: Response): Promise<void> => {
  try {
    const students = await StudentProfile.find()
      .populate('user', 'firstName lastName email isVerified')
      .populate('department', 'name code');
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// Get Student by ID
export const getStudentById = async (req: Request, res: Response): Promise<void> => {
  try {
    const student = await StudentProfile.findById(req.params.id)
      .populate('user', 'firstName lastName email profileImage')
      .populate('department', 'name code');
    if (!student) {
      res.status(404).json({ message: 'Student not found' });
      return;
    }
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// Update Student Profile
export const updateStudent = async (req: Request, res: Response): Promise<void> => {
  try {
    const student = await StudentProfile.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!student) {
      res.status(404).json({ message: 'Student not found' });
      return;
    }
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// Delete Student
export const deleteStudent = async (req: Request, res: Response): Promise<void> => {
  try {
    const student = await StudentProfile.findByIdAndDelete(req.params.id);
    if (!student) {
      res.status(404).json({ message: 'Student not found' });
      return;
    }
    // Also delete the associated User to clean up
    await User.findByIdAndDelete(student.user);
    res.status(200).json({ message: 'Student and associated user account deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};
