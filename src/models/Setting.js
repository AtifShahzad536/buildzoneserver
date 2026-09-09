import mongoose from 'mongoose';

const settingSchema = new mongoose.Schema({
  companyName: { type: String, default: 'BuildZone' },
  tagline: { type: String, default: 'WE BUILD DIGITAL PRODUCTS THAT MOVE BUSINESSES FORWARD' },
  description: { type: String },
  logoUrl: { type: String },
  ogImageUrl: { type: String, default: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80' },
  contactEmail: { type: String, default: 'contact@buildzone.tech' },
  salesEmail: { type: String, default: 'sales@buildzone.tech' },
  phone: { type: String, default: '+1 (555) 382-9201' },
  whatsappNumber: { type: String, default: '+1 (555) 382-9201' },
  whatsappMessage: { type: String, default: 'Hello BuildZone Team, I would like to discuss a new software engineering project.' },
  address: { type: String, default: 'Tech Innovation Hub, Silicon Avenue' },
  social: {
    linkedin: { type: String, default: 'https://linkedin.com/company/buildzone-tech' },
    github: { type: String, default: 'https://github.com/buildzone-tech' },
    twitter: { type: String, default: 'https://twitter.com/buildzone_tech' }
  },
  socialLinks: {
    linkedin: { type: String },
    github: { type: String },
    twitter: { type: String }
  },
  seo: {
    metaTitle: { type: String, default: 'BuildZone — Scalable Digital Products & AI' },
    metaDescription: { type: String, default: 'Engineering scalable web apps, mobile apps, and autonomous AI systems.' },
    keywords: [{ type: String }]
  },
  metaTitle: { type: String },
  metaDescription: { type: String }
}, { timestamps: true, strict: false });

export default mongoose.model('Setting', settingSchema);
