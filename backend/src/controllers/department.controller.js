"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDepartment = exports.updateDepartment = exports.getDepartmentById = exports.getDepartments = exports.createDepartment = void 0;
const Department_1 = require("../models/Department");
// Create Department
const createDepartment = async (req, res) => {
    try {
        const { name, code, headOfDepartment, description } = req.body;
        const existing = await Department_1.Department.findOne({ code });
        if (existing) {
            res.status(400).json({ message: 'Department code already exists' });
            return;
        }
        const dept = await Department_1.Department.create({ name, code, headOfDepartment, description });
        res.status(201).json(dept);
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};
exports.createDepartment = createDepartment;
// Get All Departments
const getDepartments = async (req, res) => {
    try {
        const departments = await Department_1.Department.find().populate('headOfDepartment', 'firstName lastName email');
        res.status(200).json(departments);
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};
exports.getDepartments = getDepartments;
// Get Department by ID
const getDepartmentById = async (req, res) => {
    try {
        const dept = await Department_1.Department.findById(req.params.id).populate('headOfDepartment', 'firstName lastName email');
        if (!dept) {
            res.status(404).json({ message: 'Department not found' });
            return;
        }
        res.status(200).json(dept);
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};
exports.getDepartmentById = getDepartmentById;
// Update Department
const updateDepartment = async (req, res) => {
    try {
        const dept = await Department_1.Department.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!dept) {
            res.status(404).json({ message: 'Department not found' });
            return;
        }
        res.status(200).json(dept);
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};
exports.updateDepartment = updateDepartment;
// Delete Department
const deleteDepartment = async (req, res) => {
    try {
        const dept = await Department_1.Department.findByIdAndDelete(req.params.id);
        if (!dept) {
            res.status(404).json({ message: 'Department not found' });
            return;
        }
        res.status(200).json({ message: 'Department deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};
exports.deleteDepartment = deleteDepartment;
//# sourceMappingURL=department.controller.js.map