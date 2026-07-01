import { Router } from 'express';
import { createExam, getExams, recordGrade, getStudentGrades, updateExam, deleteExam } from '../controllers/exam.controller';
import { protect, authorize } from '../middlewares/auth.middleware';
import { Role } from '../models/User';

const router = Router();

router.route('/')
  .get(protect, getExams)
  .post(protect, authorize(Role.LECTURER, Role.ADMIN), createExam);

router.route('/:id')
  .put(protect, authorize(Role.LECTURER, Role.ADMIN), updateExam)
  .delete(protect, authorize(Role.LECTURER, Role.ADMIN), deleteExam);

router.route('/grades')
  .post(protect, authorize(Role.LECTURER, Role.ADMIN), recordGrade);

router.route('/my-grades')
  .get(protect, authorize(Role.STUDENT), getStudentGrades);

export default router;
