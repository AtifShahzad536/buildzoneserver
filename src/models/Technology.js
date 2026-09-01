import mongoose from 'mongoose';

const technologySchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  iconName: { type: String, default: 'Code2' },
  description: { type: String },
  popularity: { type: String, default: 'Production Core' },
  docUrl: { type: String },
  order: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model('Technology', technologySchema);
