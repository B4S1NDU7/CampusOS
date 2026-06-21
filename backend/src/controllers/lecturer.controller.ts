import { Request, Response } from 'express';
import { LecturerProfile } from '../models/LecturerProfile';
import { User, Role } from '../models/User';
import bcrypt from 'bcrypt';

// Create Lecturer
export const createLecturer = async (req: Request, res: Response): Promise<void> => {
  try {
    const { firstName, lastName, email, password, employeeId, department, title } = req.body;
    
    let user = await User.findOne({ email });
    if (!user) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password || 'defaultPassword123', salt);
      user = await User.create({ firstName, lastName, email, password: hashedPassword, role: Role.LECTURER });
    }

    const existingProfile = await LecturerProfile.findOne({ employeeId });
    if (existingProfile) {
      res.status(400).json({ message: 'Employee ID already exists' });
      return;
    }

    const profile = await LecturerProfile.create({
      user: user._id,
      employeeId,
      department,
      title
    });

    res.status(201).json({ user, profile });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// Get All Lecturers
export const getLecturers = async (req: Request, res: Response): Promise<void> => {
  try {
    const lecturers = await LecturerProfile.find()
      .populate('user', 'firstName lastName email profileImage')
      .populate('department', 'name code');
    res.status(200).json(lecturers);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// Get Lecturer by ID
export const getLecturerById = async (req: Request, res: Response): Promise<void> => {
  try {
    const lecturer = await LecturerProfile.findById(req.params.id)
      .populate('user', 'firstName lastName email profileImage')
      .populate('department', 'name code');
    if (!lecturer) {
      res.status(404).json({ message: 'Lecturer not found' });
      return;
    }
    res.status(200).json(lecturer);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// Update Lecturer
export const updateLecturer = async (req: Request, res: Response): Promise<void> => {
  try {
    const lecturer = await LecturerProfile.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!lecturer) {
      res.status(404).json({ message: 'Lecturer not found' });
      return;
    }
    res.status(200).json(lecturer);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// Delete Lecturer
export const deleteLecturer = async (req: Request, res: Response): Promise<void> => {
  try {
    const lecturer = await LecturerProfile.findByIdAndDelete(req.params.id);
    if (!lecturer) {
      res.status(404).json({ message: 'Lecturer not found' });
      return;
    }
    await User.findByIdAndDelete(lecturer.user);
    res.status(200).json({ message: 'Lecturer and associated user account deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};
