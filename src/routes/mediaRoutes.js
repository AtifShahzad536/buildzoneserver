import { Router } from 'express';
import * as ctrl from '../controllers/mediaController.js';
import { protect, authorize } from '../middlewares/authMiddleware.js';
import { upload } from '../middlewares/uploadMiddleware.js';

const router = Router();
router.get('/', protect, ctrl.getAllMedia);
router.post('/upload', protect, upload.single('file'), ctrl.uploadMedia);
router.delete('/:id', protect, authorize('admin'), ctrl.deleteMedia);
export default router;
