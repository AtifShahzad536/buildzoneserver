import Lead from '../models/Lead.js';
import Project from '../models/Project.js';
import Service from '../models/Service.js';
import Blog from '../models/Blog.js';
import Career from '../models/Career.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { sendSuccess } from '../utils/apiResponse.js';

export const getStats = asyncHandler(async (req, res) => {
  const [totalLeads, totalProjects, totalServices, totalBlogs, totalJobs, recentLeads] = await Promise.all([
    Lead.countDocuments(),
    Project.countDocuments(),
    Service.countDocuments(),
    Blog.countDocuments(),
    Career.countDocuments(),
    Lead.find().sort({ createdAt: -1 }).limit(5)
  ]);

  return sendSuccess(res, {
    stats: {
      totalLeads,
      totalProjects,
      totalServices,
      totalBlogs,
      totalJobs,
      activeSprintDelivery: '99.98% SLA',
      monthlyGrowthRate: '+28.4%'
    },
    recentLeads
  }, 'Dashboard telemetry retrieved');
});
