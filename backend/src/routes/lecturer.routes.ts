import { Router } from 'express';
import { createLecturer, getLecturers, getLecturerById, updateLecturer, deleteLecturer } from '../controllers/lecturer.controller';
import { protect, authorize } from '../middlewares/auth.middleware';
import { Role } from '../models/User';

const router = Router();

router.route('/')
  .get(protect, getLecturers)
  .post(protect, authorize(Role.ADMIN), createLecturer);

router.route('/:id')
  .get(protect, getLecturerById)
  .put(protect, authorize(Role.ADMIN), updateLecturer)
  .delete(protect, authorize(Role.ADMIN), deleteLecturer);

export default router;
