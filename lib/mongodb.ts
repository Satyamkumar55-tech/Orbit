// ============================================================
// lib/mongodb.ts
// Singleton MongoDB connection helper.
// Caches the connection across Next.js API route invocations
// to avoid creating a new connection on every request.
// ============================================================

import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable in .env.local"
  );
}

/**
 * Global cache to store the mongoose connection promise.
 * We use `global` so the cache persists across hot-reloads in dev.
 */
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Extend NodeJS global type to include our cache
declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache;
}

let cached: MongooseCache = global.mongooseCache;

if (!cached) {
  cached = global.mongooseCache = { conn: null, promise: null };
}

/**
 * connectToDatabase
 * Returns a cached mongoose instance or creates a new connection.
 */
export async function connectToDatabase(): Promise<typeof mongoose> {
  // Return existing connection if available
  if (cached.conn) {
    return cached.conn;
  }

  // Create a new connection promise if one doesn't exist
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    // Reset promise so next call retries
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}
