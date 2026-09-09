import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';
import dotenv from 'dotenv';
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'demo',
  api_key: process.env.CLOUDINARY_API_KEY || 'demo',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'demo',
});

/**
 * Uploads an image or video to Cloudinary with automatic optimization
 * @param {Buffer} buffer - File buffer
 * @param {Object} options - Custom upload & transformation options
 * @returns {Promise<Object>} Cloudinary upload result
 */
export const uploadToCloudinary = (buffer, options = {}) => {
  return new Promise((resolve, reject) => {
    const isVideo = options.resource_type === 'video' || (options.mimetype && options.mimetype.startsWith('video/'));

    // If demo credentials, fallback gracefully with a simulated URL
    if (process.env.CLOUDINARY_CLOUD_NAME === 'demo' || !process.env.CLOUDINARY_API_KEY) {
      return resolve({
        secure_url: isVideo
          ? 'https://res.cloudinary.com/demo/video/upload/sample.mp4'
          : 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80&fm=webp',
        public_id: mock_media_,
        format: isVideo ? 'mp4' : 'webp',
        bytes: buffer ? buffer.length : 1024,
      });
    }

    const uploadOptions = {
      folder: options.folder || 'buildzone',
      resource_type: isVideo ? 'video' : (options.resource_type || 'auto'),
      ...options,
    };

    if (!isVideo) {
      uploadOptions.format = 'webp';
      uploadOptions.transformation = [
        { quality: options.quality || 'auto:good' },
        { fetch_format: 'webp' },
        { width: options.maxWidth || 1920, crop: 'limit' }
      ];
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      uploadOptions,
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    Readable.from(buffer).pipe(uploadStream);
  });
};

/**
 * Generates an on-the-fly optimized URL for an existing Cloudinary asset
 */
export const getOptimizedImageUrl = (publicId, customOpts = {}) => {
  return cloudinary.url(publicId, {
    fetch_format: 'webp',
    quality: 'auto',
    crop: 'limit',
    width: 1920,
    secure: true,
    ...customOpts,
  });
};

export const deleteFromCloudinary = async (publicId, resourceType = 'image') => {
  if (process.env.CLOUDINARY_CLOUD_NAME === 'demo') return { result: 'ok' };
  return await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
};

export default cloudinary;
