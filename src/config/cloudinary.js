import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';
import dotenv from 'dotenv';
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'demo',
  api_key: process.env.CLOUDINARY_API_KEY || 'demo',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'demo',
});

export const uploadToCloudinary = (buffer, options = {}) => {
  return new Promise((resolve, reject) => {
    // If demo credentials, fallback gracefully with a simulated URL
    if (process.env.CLOUDINARY_CLOUD_NAME === 'demo' || !process.env.CLOUDINARY_API_KEY) {
      return resolve({
        secure_url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
        public_id: `mock_media_${Date.now()}`,
        format: 'jpg',
        bytes: buffer ? buffer.length : 1024,
      });
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'buildzone',
        resource_type: 'auto',
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

export const deleteFromCloudinary = async (publicId) => {
  if (process.env.CLOUDINARY_CLOUD_NAME === 'demo') return { result: 'ok' };
  return await cloudinary.uploader.destroy(publicId);
};

export default cloudinary;
