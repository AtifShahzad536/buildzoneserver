import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { sendError } from '../utils/apiResponse.js';

export const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return sendError(res, 'Access denied. No administrator authorization token provided.', 401);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'buildzone_secret');
    req.user = await User.findById(decoded.id).select('-password');
    if (!req.user) {
      return sendError(res, 'Administrator account associated with this token no longer exists.', 401);
    }

    // Explicitly reject Developer roles from accessing admin endpoints
    if (req.user.role === 'developer' || req.user.role === 'Developer') {
      return sendError(res, 'Forbidden: Developer accounts are strictly restricted from administrative operations.', 403);
    }

    next();
  } catch (error) {
    return sendError(res, 'Invalid or expired administrator token.', 401);
  }
};

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return sendError(res, 'Forbidden. Only administrators have permission to perform this action.', 403);
    }
    next();
  };
};
