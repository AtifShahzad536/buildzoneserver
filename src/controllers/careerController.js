import Career from '../models/Career.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { sendSuccess, sendError } from '../utils/apiResponse.js';

export const getAll = asyncHandler(async (req, res) => {
  const careers = await Career.find().sort({ createdAt: -1 });
  return sendSuccess(res, careers, 'Job openings retrieved');
});

export const getBySlugOrId = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  const career = await Career.findOne({ $or: [{ slug }, { _id: slug.match(/^[0-9a-fA-F]{24}$/) ? slug : null }] });
  if (!career) return sendError(res, 'Job opening not found', 404);
  return sendSuccess(res, career, 'Job details retrieved');
});

export const applyJob = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const career = await Career.findById(id);
  if (!career) return sendError(res, 'Job opening not found', 404);

  const application = {
    applicantName: req.body.applicantName,
    applicantEmail: req.body.applicantEmail,
    applicantPhone: req.body.applicantPhone,
    portfolioUrl: req.body.portfolioUrl,
    resumeUrl: req.body.resumeUrl,
    coverLetter: req.body.coverLetter,
  };

  career.applications.unshift(application);
  await career.save();
  return sendSuccess(res, application, 'Application submitted successfully', 201);
});

export const create = asyncHandler(async (req, res) => {
  const job = await Career.create(req.body);
  return sendSuccess(res, job, 'Job created', 201);
});

export const update = asyncHandler(async (req, res) => {
  const job = await Career.findByIdAndUpdate(req.params.id, req.body, { new: true });
  return sendSuccess(res, job, 'Job updated');
});

export const remove = asyncHandler(async (req, res) => {
  await Career.findByIdAndDelete(req.params.id);
  return sendSuccess(res, { id: req.params.id }, 'Job deleted');
});
