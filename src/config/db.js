import mongoose from 'mongoose';

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI || process.env.MONGO_URI;
  if (!uri) {
    console.warn('?? No MONGODB_URI or MONGO_URI specified in environment variables.');
    return;
  }
  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`? MongoDB Connected: ${conn.connection.host}/${conn.connection.name}`);
  } catch (error) {
    console.warn(`?? MongoDB Connection Warning: ${error.message}`);
    console.warn('?? Running in resilient mode. Ensure MongoDB is active locally or cloud URI is configured.');
  }
};
