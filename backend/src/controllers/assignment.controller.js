"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSubmissionsForAssignment = exports.gradeSubmission = exports.submitAssignment = exports.getAssignments = exports.createAssignment = void 0;
const Assignment_1 = require("../models/Assignment");
const Submission_1 = require("../models/Submission");
const createAssignment = async (req, res) => {
    try {
        const { title, description, course, dueDate, maxScore } = req.body;
        const createdBy = req.user._id;
        const assignment = await Assignment_1.Assignment.create({ title, description, course, dueDate, maxScore, createdBy });
        res.status(201).json(assignment);
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};
exports.createAssignment = createAssignment;
const getAssignments = async (req, res) => {
    try {
        const courseId = req.query.courseId;
        const filter = courseId ? { course: courseId } : {};
        const assignments = await Assignment_1.Assignment.find(filter)
            .populate('course', 'name code')
            .populate('createdBy', 'firstName lastName');
        res.status(200).json(assignments);
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};
exports.getAssignments = getAssignments;
const submitAssignment = async (req, res) => {
    try {
        const { fileUrl } = req.body;
        const student = req.user._id;
        const assignmentId = req.params.id;
        const existing = await Submission_1.Submission.findOne({ assignment: assignmentId, student });
        if (existing) {
            res.status(400).json({ message: 'You have already submitted this assignment' });
            return;
        }
        const submission = await Submission_1.Submission.create({ assignment: assignmentId, student, fileUrl });
        res.status(201).json(submission);
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};
exports.submitAssignment = submitAssignment;
const gradeSubmission = async (req, res) => {
    try {
        const { score, feedback } = req.body;
        const submission = await Submission_1.Submission.findByIdAndUpdate(req.params.submissionId, { score, feedback }, { new: true });
        if (!submission) {
            res.status(404).json({ message: 'Submission not found' });
            return;
        }
        res.status(200).json(submission);
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};
exports.gradeSubmission = gradeSubmission;
const getSubmissionsForAssignment = async (req, res) => {
    try {
        const submissions = await Submission_1.Submission.find({ assignment: req.params.id })
            .populate('student', 'firstName lastName email');
        res.status(200).json(submissions);
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};
exports.getSubmissionsForAssignment = getSubmissionsForAssignment;
//# sourceMappingURL=assignment.controller.js.map