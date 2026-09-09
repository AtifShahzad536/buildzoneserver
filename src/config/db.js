import mongoose from 'mongoose';
import dns from 'dns';

// Fix for Windows / ISP DNS resolvers refusing SRV lookups (querySrv ECONNREFUSED)
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (e) {
  // Ignore if custom DNS fails
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

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 8000,
    };

    cached.promise = mongoose.connect(uri, opts)
      .then((mongooseInstance) => {
        console.log('[MongoDB Connected]: ' + mongooseInstance.connection.host + '/' + mongooseInstance.connection.name);
        return mongooseInstance;
      })
      .catch((err) => {
        cached.promise = null;
        console.error('[MongoDB Connection Error]: ' + err.message);
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
