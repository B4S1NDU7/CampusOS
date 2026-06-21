import { Request, Response } from 'express';
import { Department } from '../models/Department';

// Create Department
export const createDepartment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, code, headOfDepartment, description } = req.body;
    
    const existing = await Department.findOne({ code });
    if (existing) {
      res.status(400).json({ message: 'Department code already exists' });
      return;
    }

    const dept = await Department.create({ name, code, headOfDepartment, description });
    res.status(201).json(dept);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// Get All Departments
export const getDepartments = async (req: Request, res: Response): Promise<void> => {
  try {
    const departments = await Department.find().populate('headOfDepartment', 'firstName lastName email');
    res.status(200).json(departments);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// Get Department by ID
export const getDepartmentById = async (req: Request, res: Response): Promise<void> => {
  try {
    const dept = await Department.findById(req.params.id).populate('headOfDepartment', 'firstName lastName email');
    if (!dept) {
      res.status(404).json({ message: 'Department not found' });
      return;
    }
    res.status(200).json(dept);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// Update Department
export const updateDepartment = async (req: Request, res: Response): Promise<void> => {
  try {
    const dept = await Department.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!dept) {
      res.status(404).json({ message: 'Department not found' });
      return;
    }
    res.status(200).json(dept);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// Delete Department
export const deleteDepartment = async (req: Request, res: Response): Promise<void> => {
  try {
    const dept = await Department.findByIdAndDelete(req.params.id);
    if (!dept) {
      res.status(404).json({ message: 'Department not found' });
      return;
    }
    res.status(200).json({ message: 'Department deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};
