import mongoose from 'mongoose';

const DB_URI = process.env.DB_URI as string;

if (!DB_URI) {
  throw new Error('Please define the DB_URI environment variable inside .env.local');
}

// Global cache for the DB connection
interface MongooseCache {
  conn: mongoose.Connection | null;
  promise: Promise<mongoose.Connection> | null;
}

declare global {
  var mongooseCache: MongooseCache | undefined;
}

const cached = global.mongooseCache || (global.mongooseCache = { conn: null, promise: null });

async function connectDB(): Promise<mongoose.Connection> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(DB_URI).then((mongoose) => mongoose.connection);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectDB;
