import { Router } from 'express';
import authRoutes from './authRoutes.js';
import serviceRoutes from './serviceRoutes.js';
import industryRoutes from './industryRoutes.js';
import projectRoutes from './projectRoutes.js';
import caseStudyRoutes from './caseStudyRoutes.js';
import blogRoutes from './blogRoutes.js';
import careerRoutes from './careerRoutes.js';
import leadRoutes from './leadRoutes.js';
import teamRoutes from './teamRoutes.js';
import faqRoutes from './faqRoutes.js';
import testimonialRoutes from './testimonialRoutes.js';
import techRoutes from './techRoutes.js';
import mediaRoutes from './mediaRoutes.js';
import settingRoutes from './settingRoutes.js';
import dashboardRoutes from './dashboardRoutes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/services', serviceRoutes);
router.use('/industries', industryRoutes);
router.use('/projects', projectRoutes);
router.use('/case-studies', caseStudyRoutes);
router.use('/blogs', blogRoutes);
router.use('/careers', careerRoutes);
router.use('/leads', leadRoutes);
router.use('/team', teamRoutes);
router.use('/faqs', faqRoutes);
router.use('/testimonials', testimonialRoutes);
router.use('/technologies', techRoutes);
router.use('/media', mediaRoutes);
router.use('/settings', settingRoutes);
router.use('/dashboard', dashboardRoutes);

router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'online',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    service: 'BuildZone Enterprise REST API',
  });
});

export default router;
