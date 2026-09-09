import mongoose from 'mongoose';

const mediaSchema = new mongoose.Schema({
  url: { type: String, required: true },
  publicId: { type: String, required: true },
  fileName: { type: String, required: true },
  name: { type: String },
  category: { type: String, default: 'Projects' },
  fileType: { type: String, default: 'image' },
  fileSize: { type: mongoose.Schema.Types.Mixed },
  size: { type: String },
  format: { type: String },
  date: { type: String },
  uploadedBy: { type: String, default: 'Admin' }
}, { timestamps: true, strict: false });

export default mongoose.model('Media', mediaSchema);
