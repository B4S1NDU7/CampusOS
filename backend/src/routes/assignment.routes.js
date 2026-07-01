"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const assignment_controller_1 = require("../controllers/assignment.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const User_1 = require("../models/User");
const router = (0, express_1.Router)();
router.route('/')
    .get(auth_middleware_1.protect, assignment_controller_1.getAssignments)
    .post(auth_middleware_1.protect, (0, auth_middleware_1.authorize)(User_1.Role.LECTURER, User_1.Role.ADMIN), assignment_controller_1.createAssignment);
router.route('/:id/submit')
    .post(auth_middleware_1.protect, (0, auth_middleware_1.authorize)(User_1.Role.STUDENT), assignment_controller_1.submitAssignment);
router.route('/:id/submissions')
    .get(auth_middleware_1.protect, (0, auth_middleware_1.authorize)(User_1.Role.LECTURER, User_1.Role.ADMIN), assignment_controller_1.getSubmissionsForAssignment);
router.route('/submissions/:submissionId/grade')
    .put(auth_middleware_1.protect, (0, auth_middleware_1.authorize)(User_1.Role.LECTURER, User_1.Role.ADMIN), assignment_controller_1.gradeSubmission);
exports.default = router;
//# sourceMappingURL=assignment.routes.js.map