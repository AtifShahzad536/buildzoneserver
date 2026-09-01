import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema({
  author: { type: String },
  clientName: { type: String },
  role: { type: String },
  clientRole: { type: String },
  company: { type: String },
  clientCompany: { type: String },
  avatar: { type: String },
  clientAvatar: { type: String },
  quote: { type: String, required: true },
  rating: { type: Number, default: 5 },
  project: { type: String },
  projectType: { type: String },
  featured: { type: Boolean, default: true }
}, { timestamps: true });

testimonialSchema.pre('save', function(next) {
  if (!this.clientName && this.author) this.clientName = this.author;
  if (!this.author && this.clientName) this.author = this.clientName;
  if (!this.clientRole && this.role) this.clientRole = this.role;
  if (!this.role && this.clientRole) this.role = this.clientRole;
  if (!this.clientCompany && this.company) this.clientCompany = this.company;
  if (!this.company && this.clientCompany) this.company = this.clientCompany;
  if (!this.clientAvatar && this.avatar) this.clientAvatar = this.avatar;
  if (!this.avatar && this.clientAvatar) this.avatar = this.clientAvatar;
  next();
});

export default mongoose.model('Testimonial', testimonialSchema);
