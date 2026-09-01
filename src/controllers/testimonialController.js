import Testimonial from '../models/Testimonial.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { sendSuccess, sendError } from '../utils/apiResponse.js';

export const getAll = asyncHandler(async (req, res) => {
  const { search, category, limit = 100, page = 1 } = req.query;
  const filter = {};
  if (category && category !== 'All') filter.category = category;
  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: 'i' } },
      { name: { $regex: search, $options: 'i' } },
      { question: { $regex: search, $options: 'i' } },
    ];
  }
  const items = await Testimonial.find(filter).sort({ createdAt: -1 }).limit(Number(limit)).skip((Number(page) - 1) * Number(limit));
  return sendSuccess(res, items, 'Testimonial list retrieved');
});

export const getBySlugOrId = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  const item = await Testimonial.findOne({ $or: [{ slug }, { _id: slug.match(/^[0-9a-fA-F]{24}$/) ? slug : null }] });
  if (!item) return sendError(res, 'Testimonial not found', 404);
  return sendSuccess(res, item, 'Testimonial retrieved');
});

export const create = asyncHandler(async (req, res) => {
  const newItem = await Testimonial.create(req.body);
  return sendSuccess(res, newItem, 'Testimonial created successfully', 201);
});

export const update = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updated = await Testimonial.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
  if (!updated) return sendError(res, 'Testimonial not found', 404);
  return sendSuccess(res, updated, 'Testimonial updated successfully');
});

export const remove = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const deleted = await Testimonial.findByIdAndDelete(id);
  if (!deleted) return sendError(res, 'Testimonial not found', 404);
  return sendSuccess(res, { id }, 'Testimonial deleted successfully');
});
