import { Router } from 'express';
import { createStudent, getStudents, getStudentById, updateStudent, deleteStudent } from '../controllers/student.controller';
import { protect, authorize } from '../middlewares/auth.middleware';
import { Role } from '../models/User';

const router = Router();

router.route('/')
  .get(protect, authorize(Role.ADMIN, Role.LECTURER), getStudents)
  .post(protect, authorize(Role.ADMIN), createStudent);

router.route('/:id')
  .get(protect, getStudentById) // Users can see student profiles if logged in
  .put(protect, authorize(Role.ADMIN), updateStudent)
  .delete(protect, authorize(Role.ADMIN), deleteStudent);

export default router;
