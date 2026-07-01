"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const hostelroom_controller_1 = require("../controllers/hostelroom.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const User_1 = require("../models/User");
const router = (0, express_1.Router)();
router.route('/').post(auth_middleware_1.protect, (0, auth_middleware_1.authorize)(User_1.Role.ADMIN), hostelroom_controller_1.create).get(auth_middleware_1.protect, hostelroom_controller_1.getAll);
router.route('/:id').get(auth_middleware_1.protect, hostelroom_controller_1.getById).put(auth_middleware_1.protect, (0, auth_middleware_1.authorize)(User_1.Role.ADMIN), hostelroom_controller_1.update).delete(auth_middleware_1.protect, (0, auth_middleware_1.authorize)(User_1.Role.ADMIN), hostelroom_controller_1.remove);
router.route('/:id/request').post(auth_middleware_1.protect, hostelroom_controller_1.requestRoom);
router.route('/:id/allocate').post(auth_middleware_1.protect, (0, auth_middleware_1.authorize)(User_1.Role.ADMIN), hostelroom_controller_1.allocateRoom);
exports.default = router;
//# sourceMappingURL=hostelroom.routes.js.map