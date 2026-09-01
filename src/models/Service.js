import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true, trim: true },
  title: { type: String, required: true },
  category: { type: String, required: true },
  shortDescription: { type: String, required: true },
  heroDescription: { type: String },
  iconName: { type: String, default: 'Globe' },
  deliverables: [{ type: String }],
  technologies: [{ type: String }],
  process: [{
    step: { type: String },
    title: { type: String },
    desc: { type: String }
  }],
  faqs: [{
    q: { type: String },
    a: { type: String }
  }]
}, { timestamps: true });

export default mongoose.model('Service', serviceSchema);
