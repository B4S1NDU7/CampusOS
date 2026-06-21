"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../models/User");
const protect = async (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const user = await User_1.User.findById(decoded.id).select('-password');
        if (!user) {
            res.status(401).json({ message: 'Not authorized, user not found' });
            return;
        }
        req.user = user;
        next();
    }
    catch (error) {
        res.status(401).json({ message: 'Not authorized, token failed' });
    }
};
exports.protect = protect;
const authorize = (...roles) => {
    return (req, res, next) => {
        const authReq = req;
        const userRole = authReq.user?.role;
        const adminAliases = [User_1.Role.SUPER_ADMIN, User_1.Role.UNIVERSITY_ADMIN, User_1.Role.ADMIN];
        const allowedRoles = roles.includes(User_1.Role.ADMIN) ? [...roles, ...adminAliases] : roles;
        if (!authReq.user || !userRole || !allowedRoles.includes(userRole)) {
            res.status(403).json({ message: 'User role not authorized' });
            return;
        }
        next();
    };
};
exports.authorize = authorize;
//# sourceMappingURL=auth.middleware.js.map