// ============================================================
// models/Startup.ts
// Mongoose schema and model for storing startup analyses.
// ============================================================

import mongoose, { Schema, Document, Model } from "mongoose";
import { StartupAnalysis } from "@/types/startup";

/** Mongoose document interface — combines StartupAnalysis with Document */
export interface StartupDocument extends Omit<StartupAnalysis, "_id">, Document {}

const StartupSchema = new Schema<StartupDocument>(
  {
    startupIdea: { type: String, required: true, trim: true },

    // Advisor Agent outputs
    strengths: { type: [String], default: [] },
    weaknesses: { type: [String], default: [] },
    risks: { type: [String], default: [] },
    suggestions: { type: [String], default: [] },

    // Market Research Agent outputs
    competitors: { type: [String], default: [] },
    marketTrends: { type: [String], default: [] },
    opportunities: { type: [String], default: [] },

    // Product Manager Agent outputs
    mvpFeatures: { type: [String], default: [] },
    roadmap: { type: [String], default: [] },
    userStories: { type: [String], default: [] },
  },
  {
    timestamps: true, // adds createdAt + updatedAt automatically
  }
);

// Prevent model recompilation in Next.js hot-reload dev mode
const Startup: Model<StartupDocument> =
  mongoose.models.Startup ||
  mongoose.model<StartupDocument>("Startup", StartupSchema);

export default Startup;
