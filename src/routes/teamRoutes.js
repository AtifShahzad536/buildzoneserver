import { Router } from 'express';
import * as ctrl from '../controllers/teamController.js';
import { protect, authorize } from '../middlewares/authMiddleware.js';

const router = Router();
router.get('/', ctrl.getAll);
router.get('/:slug', ctrl.getBySlugOrId);
router.post('/', protect, authorize('admin'), ctrl.create);
router.put('/:id', protect, authorize('admin'), ctrl.update);
router.delete('/:id', protect, authorize('admin'), ctrl.remove);
export default router;
