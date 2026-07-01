"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const librarybook_controller_1 = require("../controllers/librarybook.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const User_1 = require("../models/User");
const router = (0, express_1.Router)();
router.route('/').post(auth_middleware_1.protect, (0, auth_middleware_1.authorize)(User_1.Role.ADMIN), librarybook_controller_1.create).get(auth_middleware_1.protect, librarybook_controller_1.getAll);
router.route('/:id').get(auth_middleware_1.protect, librarybook_controller_1.getById).put(auth_middleware_1.protect, (0, auth_middleware_1.authorize)(User_1.Role.ADMIN), librarybook_controller_1.update).delete(auth_middleware_1.protect, (0, auth_middleware_1.authorize)(User_1.Role.ADMIN), librarybook_controller_1.remove);
router.route('/:id/borrow').post(auth_middleware_1.protect, librarybook_controller_1.borrowBook);
router.route('/:id/return').post(auth_middleware_1.protect, librarybook_controller_1.returnBook);
exports.default = router;
//# sourceMappingURL=librarybook.routes.js.map