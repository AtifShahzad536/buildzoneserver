import mongoose from 'mongoose';

export const checkDBState = (req, res, next) => {
  // If MongoDB is connected, proceed directly
  if (mongoose.connection.readyState === 1) {
    return next();
  }

  // If database is offline (e.g. running on Vercel before MONGODB_URI is configured)
  if (req.method === 'GET') {
    return res.status(200).json({
      success: true,
      message: 'Cloud database offline. Returning empty dataset.',
      data: []
    });
  }

  return res.status(503).json({
    success: false,
    message: 'Cloud Database not connected. Please add MONGODB_URI in Vercel Project Settings.',
    error: 'DatabaseOffline'
  });
};
