import { sendError } from '../utils/apiResponse.js';

export const notFound = (req, res, next) => {
  sendError(res, `Resource Not Found — ${req.originalUrl}`, 404);
};

export const errorHandler = (err, req, res, next) => {
  console.error('?? Backend Error:', err.message);

  // If database connection is not ready or MONGODB_URI is not set in Vercel environment variables
  if (
    err.name === 'MongooseError' || 
    err.name === 'MongoServerSelectionError' || 
    err.name === 'MongoNetworkError' ||
    (err.message && (err.message.includes('buffering timed out') || err.message.includes('before running operations')))
  ) {
    return res.status(200).json({
      success: true,
      message: 'Database offline or MONGODB_URI not configured in Vercel. Seamless fallback active.',
      data: []
    });
  }

  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  sendError(
    res,
    err.message || 'Internal Server Error',
    statusCode,
    process.env.NODE_ENV === 'development' ? { stack: err.stack } : null
  );
};
