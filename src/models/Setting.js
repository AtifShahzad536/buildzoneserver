import mongoose from 'mongoose';

const settingSchema = new mongoose.Schema({
  companyName: { type: String, default: 'BuildZone' },
  tagline: { type: String, default: 'WE BUILD DIGITAL PRODUCTS THAT MOVE BUSINESSES FORWARD' },
  description: { type: String },
  contactEmail: { type: String, default: 'contact@buildzone.tech' },
  salesEmail: { type: String, default: 'sales@buildzone.tech' },
  phone: { type: String, default: '+1 (555) 382-9201' },
  address: { type: String, default: 'Tech Innovation Hub, Silicon Avenue' },
  social: {
    linkedin: { type: String, default: 'https://linkedin.com/company/buildzone-tech' },
    github: { type: String, default: 'https://github.com/buildzone-tech' },
    twitter: { type: String, default: 'https://twitter.com/buildzone_tech' }
  },
  seo: {
    metaTitle: { type: String, default: 'BuildZone — Scalable Digital Products & AI' },
    metaDescription: { type: String, default: 'Engineering scalable web apps, mobile apps, and autonomous AI systems.' },
    keywords: [{ type: String }]
  }
}, { timestamps: true });

export default mongoose.model('Setting', settingSchema);
