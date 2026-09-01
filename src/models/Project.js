import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true, trim: true },
  name: { type: String },
  title: { type: String },
  client: { type: String, required: true },
  industry: { type: String, required: true },
  year: { type: String, default: '2026' },
  category: { type: String, required: true },
  serviceCategory: { type: String },
  image: { type: String },
  coverImage: { type: String },
  images: [{ type: String }],
  shortDescription: { type: String },
  summary: { type: String },
  description: { type: String },
  architecture: { type: String },
  results: { type: String },
  metrics: [{
    label: { type: String },
    value: { type: String }
  }],
  technologies: [{ type: String }],
  liveUrl: { type: String },
  caseStudySlug: { type: String },
  featured: { type: Boolean, default: false }
}, { timestamps: true });

projectSchema.pre('save', function(next) {
  if (!this.title && this.name) this.title = this.name;
  if (!this.name && this.title) this.name = this.title;
  if (!this.coverImage && this.image) this.coverImage = this.image;
  if (!this.image && this.coverImage) this.image = this.coverImage;
  if (!this.summary && this.shortDescription) this.summary = this.shortDescription;
  if (!this.shortDescription && this.summary) this.shortDescription = this.summary;
  next();
});

export default mongoose.model('Project', projectSchema);
