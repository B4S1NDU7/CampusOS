import { Router } from 'express';
import multer from 'multer';
import { uploadFile } from '../controllers/upload.controller';
import { protect } from '../middlewares/auth.middleware';

const router = Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }
});

router.post('/', protect, upload.single('file'), uploadFile);

export default router;
