"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignLecturer = exports.deleteCourse = exports.updateCourse = exports.getCourseById = exports.getCourses = exports.createCourse = void 0;
const Course_1 = require("../models/Course");
// Create Course
const createCourse = async (req, res) => {
    try {
        const { name, code, credits, department, capacity, prerequisites } = req.body;
        const existing = await Course_1.Course.findOne({ code });
        if (existing) {
            res.status(400).json({ message: 'Course code already exists' });
            return;
        }
        const course = await Course_1.Course.create({ name, code, credits, department, capacity, prerequisites });
        res.status(201).json(course);
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};
exports.createCourse = createCourse;
// Get All Courses
const getCourses = async (req, res) => {
    try {
        const courses = await Course_1.Course.find()
            .populate('department', 'name code')
            .populate('lecturers', 'firstName lastName email');
        res.status(200).json(courses);
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};
exports.getCourses = getCourses;
// Get Course by ID
const getCourseById = async (req, res) => {
    try {
        const course = await Course_1.Course.findById(req.params.id)
            .populate('department', 'name code')
            .populate('lecturers', 'firstName lastName email')
            .populate('prerequisites', 'name code');
        if (!course) {
            res.status(404).json({ message: 'Course not found' });
            return;
        }
        res.status(200).json(course);
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};
exports.getCourseById = getCourseById;
// Update Course
const updateCourse = async (req, res) => {
    try {
        const course = await Course_1.Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!course) {
            res.status(404).json({ message: 'Course not found' });
            return;
        }
        res.status(200).json(course);
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};
exports.updateCourse = updateCourse;
// Delete Course
const deleteCourse = async (req, res) => {
    try {
        const course = await Course_1.Course.findByIdAndDelete(req.params.id);
        if (!course) {
            res.status(404).json({ message: 'Course not found' });
            return;
        }
        res.status(200).json({ message: 'Course deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};
exports.deleteCourse = deleteCourse;
// Assign Lecturer to Course
const assignLecturer = async (req, res) => {
    try {
        const { lecturerId } = req.body;
        const course = await Course_1.Course.findById(req.params.id);
        if (!course) {
            res.status(404).json({ message: 'Course not found' });
            return;
        }
        if (!course.lecturers.includes(lecturerId)) {
            course.lecturers.push(lecturerId);
            await course.save();
        }
        res.status(200).json(course);
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};
exports.assignLecturer = assignLecturer;
//# sourceMappingURL=course.controller.js.map