import { Router } from 'express';
import * as ctrl from '../controllers/mediaController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { upload } from '../middlewares/uploadMiddleware.js';

const router = Router();

// Public media access and video streaming
router.get('/stream/:id', ctrl.streamMedia);
router.get('/', ctrl.getAllMedia);

// Upload endpoint
router.post('/upload', upload.single('file'), ctrl.uploadMedia);
router.post('/', upload.single('file'), ctrl.uploadMedia);

// Admin deletion
router.delete('/:id', protect, ctrl.deleteMedia);

export default router;
