import { Router } from 'express';
import {
  deleteEnrollment,
  dropEnrollment,
  enrollStudent,
  getEnrollmentById,
  getEnrollments,
  updateEnrollment
} from '../controllers/enrollment.controller';
import { protect, authorize } from '../middlewares/auth.middleware';
import { Role } from '../models/User';

const router = Router();

router.route('/')
  .get(protect, getEnrollments)
  .post(protect, authorize(Role.STUDENT, Role.ADMIN), enrollStudent);

router.route('/:id')
  .get(protect, getEnrollmentById)
  .put(protect, authorize(Role.ADMIN), updateEnrollment)
  .delete(protect, authorize(Role.ADMIN), deleteEnrollment);

router.route('/:id/drop')
  .post(protect, authorize(Role.STUDENT, Role.ADMIN), dropEnrollment);

export default router;
