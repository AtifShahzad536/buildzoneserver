import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
  applicantName: { type: String, required: true },
  applicantEmail: { type: String, required: true },
  applicantPhone: { type: String },
  portfolioUrl: { type: String },
  resumeUrl: { type: String },
  coverLetter: { type: String },
  appliedAt: { type: Date, default: Date.now },
  status: { type: String, enum: ['Review', 'Interview', 'Offer', 'Rejected'], default: 'Review' }
});

const careerSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true, trim: true },
  title: { type: String, required: true },
  department: { type: String, required: true },
  location: { type: String, default: 'Remote / Global' },
  type: { type: String },
  employmentType: { type: String },
  experience: { type: String, default: 'Senior (5+ yrs)' },
  salaryRange: { type: String, default: '$130,000 - $180,000' },
  shortDescription: { type: String },
  description: { type: String },
  responsibilities: [{ type: String }],
  requirements: [{ type: String }],
  niceToHave: [{ type: String }],
  benefits: [{ type: String }],
  active: { type: Boolean, default: true },
  applications: [applicationSchema]
}, { timestamps: true });

careerSchema.pre('save', function(next) {
  if (!this.description && this.shortDescription) this.description = this.shortDescription;
  if (!this.shortDescription && this.description) this.shortDescription = this.description;
  if (!this.type && this.employmentType) this.type = this.employmentType;
  if (!this.employmentType && this.type) this.employmentType = this.type;
  next();
});

export default mongoose.model('Career', careerSchema);
