"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStudentGrades = exports.recordGrade = exports.getExams = exports.createExam = void 0;
const Exam_1 = require("../models/Exam");
const Grade_1 = require("../models/Grade");
const createExam = async (req, res) => {
    try {
        const { title, course, date, durationMinutes, maxScore } = req.body;
        const exam = await Exam_1.Exam.create({ title, course, date, durationMinutes, maxScore });
        res.status(201).json(exam);
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};
exports.createExam = createExam;
const getExams = async (req, res) => {
    try {
        const courseId = req.query.courseId;
        const filter = courseId ? { course: courseId } : {};
        const exams = await Exam_1.Exam.find(filter).populate('course', 'name code');
        res.status(200).json(exams);
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};
exports.getExams = getExams;
const recordGrade = async (req, res) => {
    try {
        const { student, course, assessmentId, assessmentType, score } = req.body;
        const grade = await Grade_1.Grade.findOneAndUpdate({ student, assessmentId, assessmentType }, { course, score }, { new: true, upsert: true });
        res.status(200).json(grade);
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};
exports.recordGrade = recordGrade;
const getStudentGrades = async (req, res) => {
    try {
        const student = req.user._id;
        const grades = await Grade_1.Grade.find({ student })
            .populate('course', 'name code');
        res.status(200).json(grades);
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};
exports.getStudentGrades = getStudentGrades;
//# sourceMappingURL=exam.controller.js.map