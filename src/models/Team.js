import mongoose from 'mongoose';

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String },
  position: { type: String },
  department: { type: String, default: 'Engineering' },
  bio: { type: String },
  avatar: { type: String },
  image: { type: String },
  skills: [{ type: String }],
  linkedin: { type: String },
  github: { type: String },
  twitter: { type: String },
  social: {
    linkedin: { type: String },
    github: { type: String },
    twitter: { type: String }
  },
  order: { type: Number, default: 0 }
}, { timestamps: true });

teamSchema.pre('save', function(next) {
  if (!this.role && this.position) this.role = this.position;
  if (!this.position && this.role) this.position = this.role;
  if (!this.avatar && this.image) this.avatar = this.image;
  if (!this.image && this.avatar) this.image = this.avatar;
  next();
});

export default mongoose.model('Team', teamSchema);
