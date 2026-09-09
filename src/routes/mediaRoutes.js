import { Router } from 'express';
import * as ctrl from '../controllers/mediaController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { upload } from '../middlewares/uploadMiddleware.js';

const router = Router();
router.get('/', ctrl.getAllMedia);
router.post('/upload', upload.single('file'), ctrl.uploadMedia);
router.post('/', upload.single('file'), ctrl.uploadMedia);
router.delete('/:id', protect, ctrl.deleteMedia);
export default router;
