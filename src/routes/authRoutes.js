import { Router } from 'express';
import { login, getMe } from '../controllers/authController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { authLimiter } from '../middlewares/rateLimitMiddleware.js';
import { validate } from '../middlewares/validateMiddleware.js';
import { loginSchema } from '../validators/schemas.js';

const router = Router();
router.post('/login', authLimiter, validate(loginSchema), login);
router.get('/me', protect, getMe);
export default router;
