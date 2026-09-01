import Setting from '../models/Setting.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { sendSuccess } from '../utils/apiResponse.js';

export const getSettings = asyncHandler(async (req, res) => {
  let settings = await Setting.findOne();
  if (!settings) settings = await Setting.create({});
  return sendSuccess(res, settings, 'Settings retrieved');
});

export const updateSettings = asyncHandler(async (req, res) => {
  let settings = await Setting.findOne();
  if (!settings) settings = await Setting.create(req.body);
  else settings = await Setting.findByIdAndUpdate(settings._id, req.body, { new: true });
  return sendSuccess(res, settings, 'Settings updated');
});
