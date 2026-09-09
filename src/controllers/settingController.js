import Setting from '../models/Setting.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { sendSuccess } from '../utils/apiResponse.js';

const defaultSettingsData = {
  companyName: 'BuildZone',
  tagline: 'WE BUILD DIGITAL PRODUCTS THAT MOVE BUSINESSES FORWARD',
  description: 'BuildZone is a software house delivering custom web, mobile, and AI-powered solutions.',
  logoUrl: '',
  ogImageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
  contactEmail: 'contact@buildzone.tech',
  salesEmail: 'sales@buildzonetechnology.com',
  phone: '+1 (555) 382-9201',
  whatsappNumber: '+1 (555) 382-9201',
  whatsappMessage: 'Hello BuildZone Team, I would like to discuss a new software engineering project.',
  address: 'Tech Innovation Hub, Silicon Avenue',
  heroMediaType: 'video',
  heroBgColor: '#F2F2F2',
  heroVideoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  heroBadgeText: 'SOFTWARE SOLUTIONS THAT DRIVE REAL IMPACT',
  heroTitlePrefix: 'We Build Digital Products That',
  heroTitleAccent: 'Scale Your Business',
  heroDescription: 'BuildZone is a software house delivering custom web, mobile, and AI-powered solutions that help startups and enterprises innovate, automate and grow.',
  statsClients: '150+',
  statsProjects: '250+',
  statsExperience: '5+',
  statsSupport: '24/7',
  social: {
    linkedin: 'https://linkedin.com/company/buildzone-tech',
    github: 'https://github.com/buildzone-tech',
    twitter: 'https://twitter.com/buildzone_tech'
  },
  seo: {
    metaTitle: 'BuildZone — Scalable Digital Products & AI',
    metaDescription: 'Engineering scalable web apps, mobile apps, and autonomous AI systems.'
  }
};

export const getSettings = asyncHandler(async (req, res) => {
  try {
    let settings = await Setting.findOne();
    if (!settings) {
      settings = await Setting.create(defaultSettingsData);
    }
    return sendSuccess(res, settings, 'Global settings retrieved successfully');
  } catch (err) {
    console.error('getSettings DB error, fallback to defaults:', err);
    return sendSuccess(res, defaultSettingsData, 'Default settings loaded');
  }
});

export const updateSettings = asyncHandler(async (req, res) => {
  try {
    let settings = await Setting.findOne();
    if (!settings) {
      settings = await Setting.create({ ...defaultSettingsData, ...req.body });
    } else {
      settings = await Setting.findByIdAndUpdate(
        settings._id,
        req.body,
        { new: true, upsert: true, runValidators: false }
      );
    }
    return sendSuccess(res, settings, 'Global settings saved to database successfully');
  } catch (err) {
    console.error('updateSettings DB error:', err);
    return res.status(500).json({
      success: false,
      message: 'Failed to update settings in database: ' + (err?.message || 'DB Error'),
    });
  }
});
