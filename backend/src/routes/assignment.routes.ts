import { Router } from 'express';
import { createAssignment, getAssignments, submitAssignment, gradeSubmission, getSubmissionsForAssignment, deleteAssignment, updateAssignment } from '../controllers/assignment.controller';
import { protect, authorize } from '../middlewares/auth.middleware';
import { Role } from '../models/User';

const router = Router();

router.route('/')
  .get(protect, getAssignments)
  .post(protect, authorize(Role.LECTURER, Role.ADMIN), createAssignment);

router.route('/:id')
  .put(protect, authorize(Role.LECTURER, Role.ADMIN), updateAssignment)
  .delete(protect, authorize(Role.LECTURER, Role.ADMIN), deleteAssignment);

router.route('/:id/submit')
  .post(protect, authorize(Role.STUDENT), submitAssignment);

router.route('/:id/submissions')
  .get(protect, authorize(Role.LECTURER, Role.ADMIN), getSubmissionsForAssignment);

router.route('/submissions/:submissionId/grade')
  .put(protect, authorize(Role.LECTURER, Role.ADMIN), gradeSubmission);

export default router;
