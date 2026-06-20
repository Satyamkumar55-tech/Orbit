// ============================================================
// lib/mongodb.ts
// Singleton MongoDB connection helper.
// Caches the connection across Next.js API route invocations
// to avoid creating a new connection on every request.
// ============================================================

import mongoose from "mongoose";

let MONGODB_URI = process.env.MONGODB_URI as string | undefined;

if (!MONGODB_URI && process.env.NODE_ENV === "production") {
  throw new Error(
    "Please define the MONGODB_URI environment variable in .env.local (production requires a real MongoDB)."
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
    const uriToUse = MONGODB_URI;

    if (uriToUse) {
      cached.promise = mongoose.connect(uriToUse, { bufferCommands: false });
    } else if (process.env.NODE_ENV !== "production") {
      // If no URI provided in development, we'll lazily start an in-memory MongoDB when needed.
      // The `mongodb-memory-server` package is used via dynamic import so production builds won't include it.
      cached.promise = (async () => {
        const { MongoMemoryServer } = await import("mongodb-memory-server");
        const mongod = await MongoMemoryServer.create();
        const uri = mongod.getUri();
        // keep a reference on the global to avoid GC
        (global as any).__mongod = mongod;
        return mongoose.connect(uri, { bufferCommands: false });
      })();
    } else {
      throw new Error("No MongoDB URI and not in development mode.");
    }
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    // Reset promise so next call retries
    cached.promise = null;

    const original = error instanceof Error ? error.message : String(error);

    // If connection failed and we're in development, attempt in-memory fallback
    if (process.env.NODE_ENV !== "production") {
      try {
        const { MongoMemoryServer } = await import("mongodb-memory-server");
        const mongod = await MongoMemoryServer.create();
        const uri = mongod.getUri();
        (global as any).__mongod = mongod;
        cached.promise = mongoose.connect(uri, { bufferCommands: false });
        cached.conn = await cached.promise;
        return cached.conn;
      } catch (memErr) {
        const memMsg = memErr instanceof Error ? memErr.message : String(memErr);
        throw new Error(
          `MongoDB connection failed: ${original}. Also attempted in-memory MongoDB and failed: ${memMsg}`
        );
      }
    }

    throw new Error(
      `MongoDB connection failed: ${original}.\n` +
        `Check that your MONGODB_URI in .env.local is correct, that your network allows outbound connections to Atlas (or your MongoDB host), and that any IP allowlists are configured.`
    );
  }

  return cached.conn;
}
