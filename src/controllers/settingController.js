import Setting from '../models/Setting.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { sendSuccess } from '../utils/apiResponse.js';

const defaultSettingsData = {
  companyName: 'BuildZone',
  tagline: 'BEST SOFTWARE AGENCY IN SIALKOT | GLOBAL SOFTWARE & AI ENGINEERING',
  description: 'BuildZone is the best software agency in Sialkot. We engineer custom software, mobile apps, enterprise ERPs, and AI solutions for global clients.',
  logoUrl: '',
  ogImageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
  contactEmail: 'info@buildzonetechnology.com',
  salesEmail: 'info@buildzonetechnology.com',
  phone: '+92105464116',
  whatsappNumber: '+92105464116',
  whatsappMessage: 'Hello BuildZone Team, I would like to discuss a new software engineering project.',
  address: 'Executive Tech District, Paris Road, Sialkot',
  heroMediaType: 'video',
  heroBgColor: '#F2F2F2',
  heroVideoUrl: 'https://youtu.be/egpm1YixC4Q',
  heroBadgeText: '⭐ BEST SOFTWARE AGENCY IN SIALKOT • GLOBAL IT ENGINEERING',
  heroTitlePrefix: 'We Build Digital Products That',
  heroTitleAccent: 'Scale Your Business',
  heroDescription: 'BuildZone Technology is the premier software agency in Sialkot, delivering custom enterprise ERPs, mobile apps, scalable web portals, and AI-powered solutions.',
  statsClients: '150+',
  statsProjects: '250+',
  statsExperience: '5+',
  statsSupport: '24/7',
  socialLinks: {
    linkedin: 'https://linkedin.com/company/buildzone-tech',
    github: 'https://github.com/buildzone-tech',
    twitter: 'https://twitter.com/buildzone_tech',
    instagram: 'https://instagram.com/buildzone.official',
    facebook: 'https://facebook.com/buildzonetech',
    tiktok: 'https://tiktok.com/@buildzone_dev',
    youtube: 'https://youtube.com/@buildzone_tech',
    whatsapp: '+92105464116'
  },
  social: {
    linkedin: 'https://linkedin.com/company/buildzone-tech',
    github: 'https://github.com/buildzone-tech',
    twitter: 'https://twitter.com/buildzone_tech',
    instagram: 'https://instagram.com/buildzone.official',
    facebook: 'https://facebook.com/buildzonetech',
    tiktok: 'https://tiktok.com/@buildzone_dev',
    youtube: 'https://youtube.com/@buildzone_tech'
  },
  seo: {
    metaTitle: 'BuildZone | Best Software Agency in Sialkot',
    metaDescription: 'BuildZone is the best software agency in Sialkot. We engineer custom software, mobile apps, enterprise ERPs, and AI solutions for global clients.'
  }
};

export const getSettings = asyncHandler(async (req, res) => {
  try {
    let settings = await Setting.findOne();
    if (!settings) {
      settings = await Setting.create(defaultSettingsData);
    } else {
      // Auto-sanitize legacy Rick Astley video
      if (settings.heroVideoUrl && settings.heroVideoUrl.includes('dQw4w9WgXcQ')) {
        settings.heroVideoUrl = 'https://youtu.be/egpm1YixC4Q';
        await settings.save();
      }
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
      // Clean up legacy video if passed
      if (req.body.heroVideoUrl && req.body.heroVideoUrl.includes('dQw4w9WgXcQ')) {
        req.body.heroVideoUrl = 'https://youtu.be/egpm1YixC4Q';
      }

      settings = await Setting.findByIdAndUpdate(
        settings._id,
        { $set: req.body },
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
