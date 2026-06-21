"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateGpa = exports.remove = exports.update = exports.getById = exports.getAll = exports.create = void 0;
const Grade_1 = require("../models/Grade");
const crudFactory_1 = require("../utils/crudFactory");
const crud = (0, crudFactory_1.crudFactory)(Grade_1.Grade, { populate: ['student', 'course'], searchable: ['assessmentType'] });
exports.create = crud.create;
exports.getAll = crud.getAll;
exports.getById = crud.getById;
exports.update = crud.update;
exports.remove = crud.remove;
const calculateGpa = async (req, res) => {
    try {
        const grades = await Grade_1.Grade.find({ student: req.params.studentId });
        if (grades.length === 0) {
            res.status(200).json({ gpa: 0, credits: 0 });
            return;
        }
        const average = grades.reduce((sum, grade) => sum + grade.score, 0) / grades.length;
        const gpa = Math.min(4, Math.max(0, (average / 100) * 4));
        res.status(200).json({ gpa: Number(gpa.toFixed(2)), assessmentCount: grades.length });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to calculate GPA', error });
    }
};
exports.calculateGpa = calculateGpa;
//# sourceMappingURL=grade.controller.js.map