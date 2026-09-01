import mongoose from 'mongoose';

const industrySchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true, trim: true },
  name: { type: String, required: true },
  iconName: { type: String, default: 'Building' },
  shortDescription: { type: String, required: true },
  heroDescription: { type: String },
  challenges: [{ type: String }],
  solutions: [{ type: String }],
  stats: [{
    label: { type: String },
    value: { type: String }
  }],
  caseStudies: [{ type: String }]
}, { timestamps: true });

export default mongoose.model('Industry', industrySchema);
