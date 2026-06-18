"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const notification_controller_1 = require("../controllers/notification.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
router.route('/').post(auth_middleware_1.protect, notification_controller_1.create).get(auth_middleware_1.protect, notification_controller_1.getAll);
exports.default = router;
//# sourceMappingURL=notification.routes.js.map