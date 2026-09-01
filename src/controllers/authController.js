import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { sendSuccess, sendError } from '../utils/apiResponse.js';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'buildzone_secret', {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
};

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.matchPassword(password))) {
    return sendError(res, 'Invalid credentials provided.', 401);
  }

  const token = generateToken(user._id);
  return sendSuccess(res, {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
    },
  }, 'Authenticated successfully');
});

export const getMe = asyncHandler(async (req, res) => {
  return sendSuccess(res, req.user, 'Current user profile');
});
