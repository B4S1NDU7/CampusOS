import { Router } from 'express';
import { recordAttendance, getAttendance, getStudentAttendance, updateAttendance, deleteAttendance } from '../controllers/attendance.controller';
import { protect, authorize } from '../middlewares/auth.middleware';
import { Role } from '../models/User';

const router = Router();

router.route('/')
  .get(protect, authorize(Role.LECTURER, Role.ADMIN), getAttendance)
  .post(protect, authorize(Role.LECTURER, Role.ADMIN), recordAttendance);

router.route('/:attendanceId')
  .put(protect, authorize(Role.LECTURER, Role.ADMIN), updateAttendance)
  .delete(protect, authorize(Role.LECTURER, Role.ADMIN), deleteAttendance);

router.route('/my-attendance')
  .get(protect, authorize(Role.STUDENT), getStudentAttendance);

export default router;
