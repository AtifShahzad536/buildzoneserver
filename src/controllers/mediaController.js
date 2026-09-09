import Media from '../models/Media.js';
import { uploadToCloudinary, deleteFromCloudinary } from '../config/cloudinary.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { sendSuccess, sendError } from '../utils/apiResponse.js';

export const uploadMedia = asyncHandler(async (req, res) => {
  if (req.file) {
    const isVideo = req.file.mimetype.startsWith('video/');
    const result = await uploadToCloudinary(req.file.buffer, {
      resource_type: isVideo ? 'video' : 'image',
      mimetype: req.file.mimetype,
    });

    const media = await Media.create({
      url: result.secure_url,
      publicId: result.public_id,
      fileName: req.file.originalname,
      fileType: req.file.mimetype,
      fileSize: result.bytes || req.file.size,
      size: ${((result.bytes || req.file.size) / (1024 * 1024)).toFixed(2)} MB,
      format: result.format || (isVideo ? 'mp4' : 'webp'),
      category: req.body.category || 'HeroShowcase',
    });

    return sendSuccess(res, media, 'File uploaded successfully to Cloudinary', 201);
  }

  if (req.body && req.body.url) {
    const isVideo = req.body.url.includes('.mp4') || req.body.url.includes('video') || req.body.url.includes('youtube') || req.body.url.includes('vimeo');
    const media = await Media.create({
      url: req.body.url,
      publicId: url_,
      fileName: req.body.name || req.body.fileName || sset_,
      fileType: isVideo ? 'video/mp4' : 'image/jpeg',
      fileSize: req.body.size || '1.0 MB',
      format: isVideo ? 'mp4' : 'jpg',
      category: req.body.category || 'HeroShowcase',
    });
    return sendSuccess(res, media, 'Media asset saved successfully', 201);
  }

  return sendError(res, 'Please provide a file or media URL to upload', 400);
});

export const getAllMedia = asyncHandler(async (req, res) => {
  const mediaList = await Media.find().sort({ createdAt: -1 });
  return sendSuccess(res, mediaList, 'Media library retrieved');
});

export const deleteMedia = asyncHandler(async (req, res) => {
  const media = await Media.findById(req.params.id);
  if (media) {
    if (media.publicId && !media.publicId.startsWith('url_')) {
      const isVideo = media.fileType && media.fileType.startsWith('video/');
      await deleteFromCloudinary(media.publicId, isVideo ? 'video' : 'image');
    }
    await media.deleteOne();
  }
  return sendSuccess(res, { id: req.params.id }, 'Media deleted');
});
