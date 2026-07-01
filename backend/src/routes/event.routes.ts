import { Router } from 'express';
import { create, getAll, getById, registerForEvent, remove, update } from '../controllers/event.controller';
import { protect, authorize } from '../middlewares/auth.middleware';
import { Role } from '../models/User';

const router = Router();
router.route('/').post(protect, authorize(Role.ADMIN), create).get(protect, getAll);
router.route('/:id').get(protect, getById).put(protect, authorize(Role.ADMIN), update).delete(protect, authorize(Role.ADMIN), remove);
router.route('/:id/register').post(protect, registerForEvent);
export default router;
