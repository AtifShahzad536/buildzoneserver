import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';
import dotenv from 'dotenv';
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dwo0pt9cq',
  api_key: process.env.CLOUDINARY_API_KEY || '475153828114626',
  api_secret: process.env.CLOUDINARY_API_SECRET || '5p6fHaraUSp49hwwZ7iqfviJomk',
});

/**
 * Uploads an image or video to Cloudinary with automatic streaming
 */
export const uploadToCloudinary = (buffer, options = {}) => {
  return new Promise((resolve, reject) => {
    const isVideo = options.resource_type === 'video' || (options.mimetype && options.mimetype.startsWith('video/'));

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
        if (error) {
          console.error('[Cloudinary Upload Error]:', error);
          return reject(error);
        }
        resolve(result);
      }
    );

    Readable.from(buffer).pipe(uploadStream);
  });
};

export const deleteFromCloudinary = async (publicId, resourceType = 'image') => {
  return await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
};

export default cloudinary;
