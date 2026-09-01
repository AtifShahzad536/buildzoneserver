import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true, trim: true },
  title: { type: String, required: true },
  excerpt: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String, required: true },
  author: { type: String, required: true },
  authorRole: { type: String, default: 'Principal Architect' },
  authorAvatar: { type: String, default: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80' },
  featuredImage: { type: String, required: true },
  publishedDate: { type: String, default: () => new Date().toISOString().split('T')[0] },
  readTime: { type: String, default: '6 min read' },
  tags: [{ type: String }],
  featured: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model('Blog', blogSchema);
