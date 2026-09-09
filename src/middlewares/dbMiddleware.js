import mongoose from 'mongoose';
import { connectDB } from '../config/db.js';

export const checkDBState = async (req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    try {
      await connectDB();
    } catch (e) {}
  }
  next();
};
