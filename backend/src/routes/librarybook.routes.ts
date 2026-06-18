import { Router } from 'express';
import { create, getAll } from '../controllers/librarybook.controller';
import { protect } from '../middlewares/auth.middleware';

const router = Router();
router.route('/').post(protect, create).get(protect, getAll);
export default router;
