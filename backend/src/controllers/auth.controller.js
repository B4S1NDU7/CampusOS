"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.forgotPassword = exports.refreshToken = exports.logoutUser = exports.loginUser = exports.registerUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../models/User");
const generateTokens = (userId, role) => {
    const payload = { id: userId, role };
    const accessToken = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, { expiresIn: '15m' });
    const refreshToken = jsonwebtoken_1.default.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
    return { accessToken, refreshToken };
};
const registerUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password, role } = req.body;
        const existingUser = await User_1.User.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: 'User already exists' });
            return;
        }
        const salt = await bcrypt_1.default.genSalt(10);
        const hashedPassword = await bcrypt_1.default.hash(password, salt);
        const user = await User_1.User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            role: role || User_1.Role.STUDENT
        });
        res.status(201).json({
            message: 'User registered successfully. Please verify email.',
            user: { id: user._id, email: user.email, role: user.role }
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};
exports.registerUser = registerUser;
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User_1.User.findOne({ email });
        if (!user || !user.password) {
            res.status(400).json({ message: 'Invalid credentials' });
            return;
        }
        const isMatch = await bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({ message: 'Invalid credentials' });
            return;
        }
        const { accessToken, refreshToken } = generateTokens(user._id.toString(), user.role);
        // Set refresh token in HTTP-only cookie
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });
        res.status(200).json({
            accessToken,
            user: { id: user._id, email: user.email, role: user.role, firstName: user.firstName }
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};
exports.loginUser = loginUser;
const logoutUser = async (req, res) => {
    try {
        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        });
        res.status(200).json({ message: 'Logged out successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};
exports.logoutUser = logoutUser;
const refreshToken = async (req, res) => {
    try {
        const token = req.cookies?.refreshToken;
        if (!token) {
            res.status(401).json({ message: 'No refresh token provided' });
            return;
        }
        jsonwebtoken_1.default.verify(token, process.env.JWT_REFRESH_SECRET, async (err, decoded) => {
            if (err) {
                res.status(403).json({ message: 'Invalid refresh token' });
                return;
            }
            const user = await User_1.User.findById(decoded.id);
            if (!user) {
                res.status(404).json({ message: 'User not found' });
                return;
            }
            const { accessToken } = generateTokens(user._id.toString(), user.role);
            res.status(200).json({ accessToken });
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};
exports.refreshToken = refreshToken;
const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User_1.User.findOne({ email });
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        // TODO: Generate reset token and send email (stub for now)
        res.status(200).json({ message: 'Password reset link sent to email (stub)' });
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};
exports.forgotPassword = forgotPassword;
//# sourceMappingURL=auth.controller.js.map