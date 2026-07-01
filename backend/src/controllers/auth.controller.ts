import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { User, Role } from '../models/User';
import { emailService } from '../services/email.service';

const generateTokens = (userId: string, role: string) => {
  const payload = { id: userId, role };
  const accessSecret = process.env.JWT_SECRET;
  // Fallback to access secret if refresh secret not provided (useful for local dev)
  const refreshSecret = process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET;

  if (!accessSecret || !refreshSecret) {
    throw new Error('Missing JWT_SECRET and/or JWT_REFRESH_SECRET environment variables');
  }

  const accessToken = jwt.sign(payload, accessSecret as string, { expiresIn: '15m' });
  const refreshToken = jwt.sign(payload, refreshSecret as string, { expiresIn: '7d' });
  return { accessToken, refreshToken };
};

const generateToken = (): string => {
  return crypto.randomBytes(32).toString('hex');
};

const generateStudentId = async (): Promise<string> => {
  const prefix = 'STU';
  const randomPart = crypto.randomBytes(3).toString('hex').toUpperCase();
  const candidate = `${prefix}${randomPart}`;

  const existing = await User.findOne({ studentId: candidate });
  if (existing) {
    return generateStudentId();
  }

  return candidate;
};

const ensureStudentId = async (user: any): Promise<string | undefined> => {
  if (user.role !== Role.STUDENT) {
    return undefined;
  }

  if (user.studentId) {
    return user.studentId;
  }

  const studentId = await generateStudentId();
  user.studentId = studentId;
  await user.save();
  return studentId;
};

const hashToken = (token: string): string => {
  return crypto.createHash('sha256').update(token).digest('hex');
};

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { firstName, lastName, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(409).json({ message: 'User already exists' });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const studentId = role === Role.STUDENT ? await generateStudentId() : undefined;

    // Generate email verification token
    const verificationToken = generateToken();
    const hashedVerificationToken = hashToken(verificationToken);
    const verificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: role || Role.STUDENT,
      studentId,
      emailVerificationToken: hashedVerificationToken,
      emailVerificationExpires: verificationExpires
    });

    // Send verification email
    try {
      await emailService.sendEmailVerification(email, verificationToken, firstName);
    } catch (emailError) {
      console.error('Failed to send verification email:', emailError);
      // Don't fail registration if email fails
    }

    res.status(201).json({
      message: 'Registration successful. Please verify your email.',
      user: { id: user._id, email: user.email, role: user.role, studentId: user.studentId }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

export const verifyEmail = async (req: Request, res: Response): Promise<void> => {
  try {
    const { token } = req.body;

    if (!token) {
      res.status(400).json({ message: 'Verification token is required' });
      return;
    }

    const hashedToken = hashToken(token);
    const user = await User.findOne({
      emailVerificationToken: hashedToken,
      emailVerificationExpires: { $gt: new Date() }
    });

    if (!user) {
      res.status(400).json({ message: 'Invalid or expired verification token' });
      return;
    }

    user.isVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpires = undefined;
    await user.save();

    // Send welcome email
    try {
      await emailService.sendWelcomeEmail(user.email, user.firstName);
    } catch (emailError) {
      console.error('Failed to send welcome email:', emailError);
    }

    res.status(200).json({ message: 'Email verified successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !user.password) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    // Check if email is verified (optional - can be made stricter)
    if (!user.isVerified && process.env.REQUIRE_EMAIL_VERIFICATION === 'true') {
      res.status(403).json({ message: 'Please verify your email before logging in' });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    const studentId = await ensureStudentId(user);
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
      user: { 
        id: user._id, 
        email: user.email, 
        role: user.role, 
        studentId,
        firstName: user.firstName,
        lastName: user.lastName,
        isVerified: user.isVerified
      }
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

      await ensureStudentId(user);
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
      // Don't reveal if user exists (security best practice)
      res.status(200).json({ message: 'If email exists, reset link has been sent' });
      return;
    }

    // Generate password reset token
    const resetToken = generateToken();
    const hashedResetToken = hashToken(resetToken);
    const resetExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    user.passwordResetToken = hashedResetToken;
    user.passwordResetExpires = resetExpires;
    await user.save();

    // Send reset email
    try {
      await emailService.sendPasswordResetEmail(email, resetToken, user.firstName);
    } catch (emailError) {
      console.error('Failed to send reset email:', emailError);
      res.status(500).json({ message: 'Failed to send reset email' });
      return;
    }

    res.status(200).json({ message: 'Password reset link sent to email' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

export const resetPassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      res.status(400).json({ message: 'Token and new password are required' });
      return;
    }

    const hashedToken = hashToken(token);
    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: new Date() }
    });

    if (!user) {
      res.status(400).json({ message: 'Invalid or expired reset token' });
      return;
    }

    // Validate password strength
    if (newPassword.length < 6) {
      res.status(400).json({ message: 'Password must be at least 6 characters' });
      return;
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

export const changePassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user._id;
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      res.status(400).json({ message: 'Current and new passwords are required' });
      return;
    }

    const user = await User.findById(userId);
    if (!user || !user.password) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    // Verify current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      res.status(401).json({ message: 'Current password is incorrect' });
      return;
    }

    // Validate new password
    if (newPassword.length < 6) {
      res.status(400).json({ message: 'New password must be at least 6 characters' });
      return;
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: 'Password changed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};