import { Router } from 'express';
import { getUsers, getUserById, updateUserProfile, createUser, updateUser, deleteUser } from '../controllers/user.controller';
import { protect, authorize } from '../middlewares/auth.middleware';
import { Role } from '../models/User';

const router = Router();

// Profile routes (Any authenticated user)
router.route('/profile')
  .put(protect, updateUserProfile);

// Admin-only routes
router.route('/')
  .get(protect, authorize(Role.ADMIN), getUsers)
  .post(protect, authorize(Role.ADMIN), createUser);

router.route('/:id')
  .get(protect, authorize(Role.ADMIN), getUserById)
  .put(protect, authorize(Role.ADMIN), updateUser)
  .delete(protect, authorize(Role.ADMIN), deleteUser);

export default router;
