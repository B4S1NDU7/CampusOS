import { Router } from 'express';
import { 
  registerUser, 
  loginUser, 
  logoutUser, 
  refreshToken, 
  forgotPassword,
  resetPassword,
  verifyEmail,
  changePassword
} from '../controllers/auth.controller';
import { protect } from '../middlewares/auth.middleware';

const router = Router();

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/verify-email', verifyEmail);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

// Protected routes
router.post('/logout', protect, logoutUser);
router.post('/refresh-token', refreshToken);
router.post('/change-password', protect, changePassword);

export default router;
