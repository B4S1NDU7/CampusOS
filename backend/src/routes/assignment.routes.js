"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const assignment_controller_1 = require("../controllers/assignment.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
router.route('/').post(auth_middleware_1.protect, assignment_controller_1.create).get(auth_middleware_1.protect, assignment_controller_1.getAll);
exports.default = router;
//# sourceMappingURL=assignment.routes.js.map