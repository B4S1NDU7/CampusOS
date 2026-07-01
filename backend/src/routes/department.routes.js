"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const department_controller_1 = require("../controllers/department.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const User_1 = require("../models/User");
const router = (0, express_1.Router)();
router.route('/')
    .get(auth_middleware_1.protect, department_controller_1.getDepartments) // Anyone logged in can see departments
    .post(auth_middleware_1.protect, (0, auth_middleware_1.authorize)(User_1.Role.ADMIN), department_controller_1.createDepartment);
router.route('/:id')
    .get(auth_middleware_1.protect, department_controller_1.getDepartmentById)
    .put(auth_middleware_1.protect, (0, auth_middleware_1.authorize)(User_1.Role.ADMIN), department_controller_1.updateDepartment)
    .delete(auth_middleware_1.protect, (0, auth_middleware_1.authorize)(User_1.Role.ADMIN), department_controller_1.deleteDepartment);
exports.default = router;
//# sourceMappingURL=department.routes.js.map