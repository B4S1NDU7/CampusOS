import { Router } from 'express';
import { allocateRoom, create, getAll, getById, remove, requestRoom, update } from '../controllers/hostelroom.controller';
import { protect, authorize } from '../middlewares/auth.middleware';
import { Role } from '../models/User';

const router = Router();
router.route('/').post(protect, authorize(Role.ADMIN), create).get(protect, getAll);
router.route('/:id').get(protect, getById).put(protect, authorize(Role.ADMIN), update).delete(protect, authorize(Role.ADMIN), remove);
router.route('/:id/request').post(protect, requestRoom);
router.route('/:id/allocate').post(protect, authorize(Role.ADMIN), allocateRoom);
export default router;
