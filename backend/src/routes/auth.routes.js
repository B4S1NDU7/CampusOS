"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const validations_1 = require("../utils/validations");
const router = (0, express_1.Router)();
router.post('/register', (0, validations_1.validate)(validations_1.registerSchema), auth_controller_1.registerUser);
router.post('/login', (0, validations_1.validate)(validations_1.loginSchema), auth_controller_1.loginUser);
router.post('/logout', auth_controller_1.logoutUser);
router.post('/refresh-token', auth_controller_1.refreshToken);
router.post('/forgot-password', auth_controller_1.forgotPassword);
exports.default = router;
//# sourceMappingURL=auth.routes.js.map