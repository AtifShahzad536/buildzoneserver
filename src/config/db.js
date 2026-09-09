import mongoose from 'mongoose';
import dns from 'dns';

// Fallback DNS for resolving MongoDB SRV records in restricted networks
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (e) {
  // Ignore DNS set failures
}

let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export const connectDB = async () => {
  if (cached.conn && mongoose.connection.readyState === 1) {
    return cached.conn;
  }

  const uri = process.env.MONGODB_URI || process.env.MONGO_URI;
  if (!uri) {
    console.warn('[MongoDB Notice]: No MONGODB_URI or MONGO_URI specified in environment variables.');
    return null;
  }

  if (!cached.promise || mongoose.connection.readyState === 0) {
    const opts = {
      bufferCommands: true,
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 10000,
      maxPoolSize: 10,
    };

    cached.promise = mongoose.connect(uri, opts)
      .then((instance) => {
        console.log('[MongoDB Connected]:', instance.connection.host);
        return instance;
      })
      .catch((err) => {
        cached.promise = null;
        console.error('[MongoDB Connect Error]:', err.message);
        return null;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    return null;
  }

  return cached.conn;
};

export default connectDB;
