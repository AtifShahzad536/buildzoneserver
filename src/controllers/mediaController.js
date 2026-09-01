import Media from '../models/Media.js';
import { uploadToCloudinary, deleteFromCloudinary } from '../config/cloudinary.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { sendSuccess, sendError } from '../utils/apiResponse.js';

export const uploadMedia = asyncHandler(async (req, res) => {
  if (!req.file) return sendError(res, 'Please provide a file to upload', 400);

  const result = await uploadToCloudinary(req.file.buffer);

  const media = await Media.create({
    url: result.secure_url,
    publicId: result.public_id,
    fileName: req.file.originalname,
    fileType: req.file.mimetype,
    fileSize: result.bytes || req.file.size,
    format: result.format || 'jpg',
  });

  return sendSuccess(res, media, 'File uploaded successfully to Cloudinary', 201);
});

export const getAllMedia = asyncHandler(async (req, res) => {
  const mediaList = await Media.find().sort({ createdAt: -1 });
  return sendSuccess(res, mediaList, 'Media library retrieved');
});

export const deleteMedia = asyncHandler(async (req, res) => {
  const media = await Media.findById(req.params.id);
  if (media) {
    await deleteFromCloudinary(media.publicId);
    await media.deleteOne();
  }
  return sendSuccess(res, { id: req.params.id }, 'Media deleted');
});
