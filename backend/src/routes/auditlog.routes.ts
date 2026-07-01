import { Router } from 'express';
import { create, getAll, getById, remove } from '../controllers/auditlog.controller';
import { protect, authorize } from '../middlewares/auth.middleware';
import { Role } from '../models/User';

const router = Router();
router.route('/').post(protect, authorize(Role.ADMIN), create).get(protect, authorize(Role.ADMIN), getAll);
router.route('/:id').get(protect, authorize(Role.ADMIN), getById).delete(protect, authorize(Role.ADMIN), remove);
export default router;
