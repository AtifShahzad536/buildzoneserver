import { Router } from 'express';
import * as ctrl from '../controllers/leadController.js';
import { protect, authorize } from '../middlewares/authMiddleware.js';
import { leadLimiter } from '../middlewares/rateLimitMiddleware.js';
import { validate } from '../middlewares/validateMiddleware.js';
import { leadSchema } from '../validators/schemas.js';

const router = Router();

// Send direct email to client from CRM
router.post('/send-email', ctrl.sendClientEmail);

router.get('/', protect, authorize('admin'), ctrl.getAll);
router.get('/:id', protect, authorize('admin'), ctrl.getById);
router.post('/', leadLimiter, validate(leadSchema), ctrl.create);
router.patch('/:id', protect, authorize('admin'), ctrl.update);
router.put('/:id', protect, authorize('admin'), ctrl.update);
router.delete('/:id', protect, authorize('admin'), ctrl.remove);

export default router;
