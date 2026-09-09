import app from '../src/app.js';
import { connectDB } from '../src/config/db.js';
import mongoose from 'mongoose';

export default async function handler(req, res) {
  try {
    if (mongoose.connection.readyState !== 1) {
      await connectDB();
    }
  } catch (e) {
    console.warn('DB connection notice:', e ? e.message : 'Unknown');
  }
  return app(req, res);
}
