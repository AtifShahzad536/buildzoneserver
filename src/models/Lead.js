import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema({
  id: { type: String },
  type: { type: String, default: 'Note' },
  note: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

const leadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  company: { type: String },
  country: { type: String },
  service: { type: String, default: 'Custom Software' },
  budget: { type: String, default: '$10k - $25k' },
  timeline: { type: String },
  message: { type: String },
  projectDetails: { type: String },
  source: { type: String, default: 'Website Inquiry' },
  assignedTo: { type: String },
  status: { type: String, default: 'New' },
  createdDate: { type: String, default: () => new Date().toISOString() },
  activities: [activitySchema]
}, { timestamps: true });

leadSchema.pre('save', function(next) {
  if (!this.message && this.projectDetails) this.message = this.projectDetails;
  if (!this.projectDetails && this.message) this.projectDetails = this.message;
  next();
});

export default mongoose.model('Lead', leadSchema);
