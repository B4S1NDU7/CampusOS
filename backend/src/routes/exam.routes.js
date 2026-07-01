"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const exam_controller_1 = require("../controllers/exam.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const User_1 = require("../models/User");
const router = (0, express_1.Router)();
router.route('/')
    .get(auth_middleware_1.protect, exam_controller_1.getExams)
    .post(auth_middleware_1.protect, (0, auth_middleware_1.authorize)(User_1.Role.LECTURER, User_1.Role.ADMIN), exam_controller_1.createExam);
router.route('/grades')
    .post(auth_middleware_1.protect, (0, auth_middleware_1.authorize)(User_1.Role.LECTURER, User_1.Role.ADMIN), exam_controller_1.recordGrade);
router.route('/my-grades')
    .get(auth_middleware_1.protect, (0, auth_middleware_1.authorize)(User_1.Role.STUDENT), exam_controller_1.getStudentGrades);
exports.default = router;
//# sourceMappingURL=exam.routes.js.map