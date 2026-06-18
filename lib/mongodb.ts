// lib/mongodb.ts

import mongoose from "mongoose"

// Read the MongoDB connection string from .env.local
const MONGODB_URI = process.env.MONGODB_URI as string

// Stop immediately if the URI is missing
if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable in .env.local"
  )
}

// Global cache object
let cached = (global as any).mongoose

// Create cache if it doesn't exist
if (!cached) {
  cached = (global as any).mongoose = {
    conn: null,
    promise: null,
  }
}

// Function to connect to MongoDB
async function connectToDatabase() {
  // If already connected, return existing connection
  if (cached.conn) {
    return cached.conn
  }

  // If connection is not currently being created, create one
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    })
  }

  // Wait for connection to complete
  cached.conn = await cached.promise

  // Return connection
  return cached.conn
}

// Allow other files to use this function
export default connectToDatabase