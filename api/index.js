import app from '../src/app.js';
import { connectDB } from '../src/config/db.js';

let isConnected = false;

export default async function handler(req, res) {
  if (!isConnected && (process.env.MONGODB_URI || process.env.MONGO_URI)) {
    try {
      await connectDB();
      isConnected = true;
    } catch (e) {
      console.warn("DB connection warning in serverless handler:", e.message);
    }
  }
  return app(req, res);
}
