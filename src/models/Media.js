import mongoose from 'mongoose';

const mediaSchema = new mongoose.Schema({
  url: { type: String, required: true },
  publicId: { type: String, required: true },
  fileName: { type: String, required: true },
  fileType: { type: String, default: 'image' },
  fileSize: { type: Number },
  format: { type: String },
  uploadedBy: { type: String, default: 'Admin' }
}, { timestamps: true });

export default mongoose.model('Media', mediaSchema);
