import app from '../src/app.js';
import { connectDB } from '../src/config/db.js';
import mongoose from 'mongoose';

export default async function handler(req, res) {
  if (mongoose.connection.readyState !== 1) {
    try {
      await connectDB();
    } catch (e) {
      console.warn('DB connection warning in serverless handler:', e.message);
    }
  }
  return app(req, res);
}
