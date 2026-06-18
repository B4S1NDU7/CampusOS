"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auditlog_controller_1 = require("../controllers/auditlog.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
router.route('/').post(auth_middleware_1.protect, auditlog_controller_1.create).get(auth_middleware_1.protect, auditlog_controller_1.getAll);
exports.default = router;
//# sourceMappingURL=auditlog.routes.js.map