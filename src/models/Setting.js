import mongoose from 'mongoose';

const settingSchema = new mongoose.Schema({
  companyName: { type: String, default: 'BuildZone' },
  tagline: { type: String, default: 'BEST SOFTWARE AGENCY IN SIALKOT | GLOBAL SOFTWARE & AI ENGINEERING' },
  description: { type: String, default: 'BuildZone is the best software agency in Sialkot. We engineer custom software, mobile apps, enterprise ERPs, and AI solutions for global clients.' },
  logoUrl: { type: String },
  ogImageUrl: { type: String, default: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80' },
  contactEmail: { type: String, default: 'info@buildzonetechnology.com' },
  salesEmail: { type: String, default: 'info@buildzonetechnology.com' },
  phone: { type: String, default: '+92105464116' },
  whatsappNumber: { type: String, default: '+92105464116' },
  whatsappMessage: { type: String, default: 'Hello BuildZone Team, I would like to discuss a new software engineering project.' },
  address: { type: String, default: 'Executive Tech District, Paris Road, Sialkot' },
  
  // Hero Video & Showcase Configuration (Database Tracked)
  heroMediaType: { type: String, default: 'video' },
  heroBgColor: { type: String, default: '#F2F2F2' },
  heroVideoUrl: { type: String, default: 'https://youtu.be/egpm1YixC4Q' },
  heroBadgeText: { type: String, default: '⭐ BEST SOFTWARE AGENCY IN SIALKOT • GLOBAL IT ENGINEERING' },
  heroTitlePrefix: { type: String, default: 'We Build Digital Products That' },
  heroTitleAccent: { type: String, default: 'Scale Your Business' },
  heroDescription: { type: String, default: 'BuildZone Technology is the premier software agency in Sialkot, delivering custom enterprise ERPs, mobile apps, scalable web portals, and AI-powered solutions.' },
  statsClients: { type: String, default: '150+' },
  statsProjects: { type: String, default: '250+' },
  statsExperience: { type: String, default: '5+' },
  statsSupport: { type: String, default: '24/7' },

  socialVisibility: {
    linkedin: { type: Boolean, default: true },
    github: { type: Boolean, default: true },
    twitter: { type: Boolean, default: true },
    instagram: { type: Boolean, default: true },
    facebook: { type: Boolean, default: true },
    tiktok: { type: Boolean, default: true },
    youtube: { type: Boolean, default: true },
    whatsapp: { type: Boolean, default: true }
  },
  socialLinks: {
    linkedin: { type: String, default: 'https://linkedin.com/company/buildzone-tech' },
    github: { type: String, default: 'https://github.com/buildzone-tech' },
    twitter: { type: String, default: 'https://twitter.com/buildzone_tech' },
    instagram: { type: String, default: 'https://instagram.com/buildzone.official' },
    facebook: { type: String, default: 'https://facebook.com/buildzonetech' },
    tiktok: { type: String, default: 'https://tiktok.com/@buildzone_dev' },
    youtube: { type: String, default: 'https://youtube.com/@buildzone_tech' },
    whatsapp: { type: String, default: '+92105464116' }
  },
  social: {
    linkedin: { type: String, default: 'https://linkedin.com/company/buildzone-tech' },
    github: { type: String, default: 'https://github.com/buildzone-tech' },
    twitter: { type: String, default: 'https://twitter.com/buildzone_tech' },
    instagram: { type: String, default: 'https://instagram.com/buildzone.official' },
    facebook: { type: String, default: 'https://facebook.com/buildzonetech' },
    tiktok: { type: String, default: 'https://tiktok.com/@buildzone_dev' },
    youtube: { type: String, default: 'https://youtube.com/@buildzone_tech' }
  },
  seo: {
    metaTitle: { type: String, default: 'BuildZone | Best Software Agency in Sialkot' },
    metaDescription: { type: String, default: 'BuildZone is the best software agency in Sialkot. We engineer custom software, mobile apps, enterprise ERPs, and AI solutions for global clients.' },
    keywords: [{ type: String }]
  },
  metaTitle: { type: String },
  metaDescription: { type: String }
}, { timestamps: true, strict: false });

export default mongoose.model('Setting', settingSchema);
