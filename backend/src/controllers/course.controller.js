"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCourses = exports.createCourse = void 0;
const express_1 = require("express");
const Course_1 = require("../models/Course");
const createCourse = async (req, res) => { try {
    const course = await Course_1.Course.create(req.body);
    res.status(201).json(course);
}
catch (error) {
    res.status(500).json({ message: 'Server Error' });
} };
exports.createCourse = createCourse;
const getCourses = async (req, res) => { try {
    const courses = await Course_1.Course.find().populate('lecturer', 'firstName lastName email');
    res.status(200).json(courses);
}
catch (error) {
    res.status(500).json({ message: 'Server Error' });
} };
exports.getCourses = getCourses;
//# sourceMappingURL=course.controller.js.map