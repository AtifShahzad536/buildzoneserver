import mongoose from 'mongoose';

// Disable buffering so queries do not hang 10 seconds if database is offline
mongoose.set('bufferCommands', false);

export const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    return mongoose.connection;
  }
  const uri = process.env.MONGODB_URI || process.env.MONGO_URI;
  if (!uri) {
    console.warn('?? No MONGODB_URI or MONGO_URI specified in environment variables.');
    return null;
  }
  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`? MongoDB Connected: ${conn.connection.host}/${conn.connection.name}`);
    return conn;
  } catch (error) {
    console.warn(`?? MongoDB Connection Warning: ${error.message}`);
    return null;
  }
};
