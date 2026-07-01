import { Router } from 'express';
import { calculateGpa, create, getAll, getById, remove, update, generateTranscript } from '../controllers/grade.controller';
import { protect, authorize } from '../middlewares/auth.middleware';
import { Role } from '../models/User';

const router = Router();
router.route('/').post(protect, authorize(Role.LECTURER, Role.ADMIN), create).get(protect, getAll);
router.route('/gpa/:studentId').get(protect, calculateGpa);
router.route('/transcript/:studentId').get(protect, generateTranscript);
router.route('/:id').get(protect, getById).put(protect, authorize(Role.LECTURER, Role.ADMIN), update).delete(protect, authorize(Role.ADMIN), remove);
export default router;
