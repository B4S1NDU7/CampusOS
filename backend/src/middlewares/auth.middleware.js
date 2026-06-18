"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = exports.protect = void 0;
const express_1 = require("express");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const protect = (req, res, next) => { const token = req.header('Authorization')?.split(' ')[1]; if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
    return;
} try {
    const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
}
catch (error) {
    res.status(401).json({ message: 'Not authorized, token failed' });
} };
exports.protect = protect;
const authorize = (...roles) => { return (req, res, next) => { if (!roles.includes(req.user.role)) {
    res.status(403).json({ message: 'User role not authorized' });
    return;
} next(); }; };
exports.authorize = authorize;
//# sourceMappingURL=auth.middleware.js.map