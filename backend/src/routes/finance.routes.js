"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const finance_controller_1 = require("../controllers/finance.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const User_1 = require("../models/User");
const router = (0, express_1.Router)();
router.route('/').post(auth_middleware_1.protect, (0, auth_middleware_1.authorize)(User_1.Role.ADMIN), finance_controller_1.create).get(auth_middleware_1.protect, finance_controller_1.getAll);
router.route('/:id').get(auth_middleware_1.protect, finance_controller_1.getById).put(auth_middleware_1.protect, (0, auth_middleware_1.authorize)(User_1.Role.ADMIN), finance_controller_1.update).delete(auth_middleware_1.protect, (0, auth_middleware_1.authorize)(User_1.Role.ADMIN), finance_controller_1.remove);
router.route('/:id/payment-intent').post(auth_middleware_1.protect, finance_controller_1.createPaymentIntent);
exports.default = router;
//# sourceMappingURL=finance.routes.js.map