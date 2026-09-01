import mongoose from 'mongoose';

const caseStudySchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true, trim: true },
  title: { type: String, required: true },
  client: { type: String, required: true },
  industry: { type: String, required: true },
  location: { type: String },
  projectDuration: { type: String },
  duration: { type: String },
  heroImage: { type: String, required: true },
  challenge: { type: String, required: true },
  solution: { type: String, required: true },
  architecture: { type: String },
  features: [{ type: String }],
  technology: [{ type: String }],
  technologies: [{ type: String }],
  developmentProcess: [{
    phase: { type: String },
    detail: { type: String }
  }],
  results: [mongoose.Schema.Types.Mixed],
  metrics: [{
    label: { type: String },
    value: { type: String }
  }],
  testimonial: {
    quote: { type: String },
    author: { type: String },
    role: { type: String },
    company: { type: String }
  }
}, { timestamps: true });

export default mongoose.model('CaseStudy', caseStudySchema);
