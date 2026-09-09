import { Router } from 'express';
import { getSettings, updateSettings } from '../controllers/settingController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = Router();

// Public: All visitors and frontend clients read global settings
router.get('/', getSettings);

// Admin: Authenticated administrator updates global settings
router.put('/', protect, updateSettings);
router.post('/', protect, updateSettings);

export default router;
