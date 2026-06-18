"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const course_controller_1 = require("../controllers/course.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const User_1 = require("../models/User");
const router = (0, express_1.Router)();
router.route('/').post(auth_middleware_1.protect, (0, auth_middleware_1.authorize)(User_1.Role.ADMIN), course_controller_1.createCourse).get(auth_middleware_1.protect, course_controller_1.getCourses);
exports.default = router;
//# sourceMappingURL=course.routes.js.map