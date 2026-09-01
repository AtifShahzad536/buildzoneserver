import { Router } from 'express';
import { getSettings, updateSettings } from '../controllers/settingController.js';
import { protect, authorize } from '../middlewares/authMiddleware.js';

const router = Router();
router.get('/', getSettings);
router.put('/', protect, authorize('admin'), updateSettings);
export default router;
