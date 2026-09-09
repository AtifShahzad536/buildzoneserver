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
 * Uploads an image to Cloudinary with automatic WebP conversion and size optimization
 * @param {Buffer} buffer - Image file buffer
 * @param {Object} options - Custom upload & transformation options
 * @returns {Promise<Object>} Cloudinary upload result
 */
export const uploadToCloudinary = (buffer, options = {}) => {
  return new Promise((resolve, reject) => {
    // If demo credentials, fallback gracefully with a simulated WebP optimized URL
    if (process.env.CLOUDINARY_CLOUD_NAME === 'demo' || !process.env.CLOUDINARY_API_KEY) {
      return resolve({
        secure_url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80&fm=webp',
        public_id: `mock_media_${Date.now()}`,
        format: 'webp',
        bytes: buffer ? Math.round(buffer.length * 0.4) : 1024,
      });
    }

    // Default optimization transformations: Convert to WebP, auto quality, limit max dimensions
    const transformations = [
      { quality: options.quality || 'auto:good' },
      { fetch_format: 'webp' },
    ];

    if (options.maxWidth || options.maxHeight) {
      transformations.push({
        width: options.maxWidth || 1920,
        height: options.maxHeight || 1080,
        crop: 'limit',
      });
    } else {
      // Default: Downscale oversized 4K/8K images to maximum 1920px width without distortion
      transformations.push({
        width: 1920,
        crop: 'limit',
      });
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: options.folder || 'buildzone',
        resource_type: options.resource_type || 'image',
        format: 'webp', // Force convert output format to WebP
        transformation: transformations,
        ...options,
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    Readable.from(buffer).pipe(uploadStream);
  });
};

/**
 * Generates an on-the-fly optimized WebP URL for an existing Cloudinary asset
 * @param {string} publicId - Cloudinary Public ID
 * @param {Object} customOpts - Transformation options
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

export const deleteFromCloudinary = async (publicId) => {
  if (process.env.CLOUDINARY_CLOUD_NAME === 'demo') return { result: 'ok' };
  return await cloudinary.uploader.destroy(publicId);
};

export default cloudinary;
