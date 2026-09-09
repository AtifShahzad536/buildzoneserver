import Media from '../models/Media.js';
import { uploadToCloudinary, deleteFromCloudinary } from '../config/cloudinary.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { sendSuccess, sendError } from '../utils/apiResponse.js';

export const uploadMedia = asyncHandler(async (req, res) => {
  if (req.file) {
    const isVideo = req.file.mimetype.startsWith('video/');
    let fileUrl = null;
    let publicId = 'media_' + Date.now();

    // 1. Try Cloudinary upload if available
    try {
      const result = await uploadToCloudinary(req.file.buffer, {
        resource_type: isVideo ? 'video' : 'image',
        mimetype: req.file.mimetype,
      });
      if (result && result.secure_url && !result.secure_url.includes('sample.mp4')) {
        fileUrl = result.secure_url;
        publicId = result.public_id || publicId;
      }
    } catch (cErr) {
      console.warn('Cloudinary upload bypassed:', cErr.message);
    }

    // 2. Direct MongoDB persistent storage & streaming URL
    const mediaDoc = new Media({
      fileName: req.file.originalname,
      fileType: req.file.mimetype,
      fileSize: req.file.size,
      size: (req.file.size / (1024 * 1024)).toFixed(2) + ' MB',
      format: req.file.originalname.split('.').pop() || (isVideo ? 'mp4' : 'png'),
      category: req.body.category || (isVideo ? 'HeroVideo' : 'Projects'),
      publicId,
      fileData: req.file.buffer.toString('base64'),
    });

    if (!fileUrl) {
      const host = req.get('host') || 'buildzoneserver.vercel.app';
      const protocol = host.includes('localhost') ? 'http' : 'https';
      fileUrl = protocol + '://' + host + '/api/v1/media/stream/' + mediaDoc._id;
    }

    mediaDoc.url = fileUrl;
    await mediaDoc.save();

    return sendSuccess(res, {
      id: mediaDoc._id,
      _id: mediaDoc._id,
      url: mediaDoc.url,
      fileName: mediaDoc.fileName,
      fileType: mediaDoc.fileType,
      size: mediaDoc.size
    }, 'Media uploaded and globally persisted successfully', 201);
  }

  if (req.body && req.body.url) {
    const isVideo = req.body.url.includes('.mp4') || req.body.url.includes('video') || req.body.url.includes('youtube') || req.body.url.includes('vimeo');
    const media = await Media.create({
      url: req.body.url,
      publicId: 'url_' + Date.now(),
      fileName: req.body.name || req.body.fileName || 'asset_' + Date.now(),
      fileType: isVideo ? 'video/mp4' : 'image/jpeg',
      fileSize: req.body.size || '1.0 MB',
      format: isVideo ? 'mp4' : 'jpg',
      category: req.body.category || (isVideo ? 'HeroVideo' : 'Projects'),
    });
    return sendSuccess(res, media, 'Media asset saved successfully', 201);
  }

  return sendError(res, 'Please provide a file or media URL to upload', 400);
});

export const streamMedia = asyncHandler(async (req, res) => {
  const media = await Media.findById(req.params.id);
  if (!media || !media.fileData) {
    return res.status(404).json({ success: false, message: 'Media file not found' });
  }

  const buffer = Buffer.from(media.fileData, 'base64');
  const contentType = media.fileType || 'application/octet-stream';
  const totalSize = buffer.length;

  const range = req.headers.range;
  if (range && contentType.startsWith('video/')) {
    const parts = range.replace(/bytes=/, '').split('-');
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : totalSize - 1;
    const chunksize = (end - start) + 1;
    const fileChunk = buffer.slice(start, end + 1);

    res.writeHead(206, {
      'Content-Range': 'bytes ' + start + '-' + end + '/' + totalSize,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': contentType,
      'Cache-Control': 'public, max-age=31536000, immutable',
    });
    return res.end(fileChunk);
  }

  res.writeHead(200, {
    'Content-Length': totalSize,
    'Content-Type': contentType,
    'Cache-Control': 'public, max-age=31536000, immutable',
  });
  return res.end(buffer);
});

export const getAllMedia = asyncHandler(async (req, res) => {
  const mediaList = await Media.find().select('-fileData').sort({ createdAt: -1 });
  return sendSuccess(res, mediaList, 'Media library retrieved');
});

export const deleteMedia = asyncHandler(async (req, res) => {
  const media = await Media.findById(req.params.id);
  if (media) {
    if (media.publicId && !media.publicId.startsWith('url_') && !media.publicId.startsWith('media_')) {
      const isVideo = media.fileType && media.fileType.startsWith('video/');
      await deleteFromCloudinary(media.publicId, isVideo ? 'video' : 'image').catch(() => {});
    }
    await media.deleteOne();
  }
  return sendSuccess(res, { id: req.params.id }, 'Media deleted');
});
