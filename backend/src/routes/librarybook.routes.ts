import { Router } from 'express';
import { borrowBook, create, getAll, getById, remove, returnBook, update } from '../controllers/librarybook.controller';
import { protect, authorize } from '../middlewares/auth.middleware';
import { Role } from '../models/User';

const router = Router();
router.route('/').post(protect, authorize(Role.ADMIN), create).get(protect, getAll);
router.route('/:id').get(protect, getById).put(protect, authorize(Role.ADMIN), update).delete(protect, authorize(Role.ADMIN), remove);
router.route('/:id/borrow').post(protect, borrowBook);
router.route('/:id/return').post(protect, returnBook);
export default router;
