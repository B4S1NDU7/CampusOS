import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User, Role } from '../models/User';

const generateTokens = (userId: string, role: string) => {
  const payload = { id: userId, role };
  const accessToken = jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: '15m' });
  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET as string, { expiresIn: '7d' });
  return { accessToken, refreshToken };
};

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { firstName, lastName, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: role || Role.STUDENT
    });

    res.status(201).json({
      message: 'User registered successfully. Please verify email.',
      user: { id: user._id, email: user.email, role: user.role }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !user.password) {
      res.status(400).json({ message: 'Invalid credentials' });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
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
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

export const logoutUser = async (req: Request, res: Response): Promise<void> => {
  try {
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    });
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

export const refreshToken = async (req: Request, res: Response): Promise<void> => {
  try {
    const token = req.cookies?.refreshToken;
    if (!token) {
      res.status(401).json({ message: 'No refresh token provided' });
      return;
    }

    jwt.verify(token, process.env.JWT_REFRESH_SECRET as string, async (err: any, decoded: any) => {
      if (err) {
        res.status(403).json({ message: 'Invalid refresh token' });
        return;
      }

      const user = await User.findById(decoded.id);
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }

      const { accessToken } = generateTokens(user._id.toString(), user.role);

      res.status(200).json({ accessToken });
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

export const forgotPassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    // TODO: Generate reset token and send email (stub for now)
    res.status(200).json({ message: 'Password reset link sent to email (stub)' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};