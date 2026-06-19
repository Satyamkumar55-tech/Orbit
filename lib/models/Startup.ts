// lib/models/Startup.ts

import mongoose, { Schema, Document, Model } from "mongoose"

// TypeScript interface
export interface IStartup extends Document {
  startupName: string
  idea: string
  aiResponse: {
      marketResearch: string
      productPlan: string
      softwareArchitecture: string
      marketingStrategy: string
      roadmap: string[]
    }
  documents: string[]
  createdAt: Date
  updatedAt: Date
}

// Schema
const StartupSchema: Schema = new Schema(
  {
    startupName: {
      type: String,
      required: [true, "Startup name is required"],
      trim: true,
      maxlength: [100, "Startup name cannot exceed 100 characters"],
    },

    idea: {
      type: String,
      required: [true, "Idea is required"],
      trim: true,
      maxlength: [2000, "Idea cannot exceed 2000 characters"],
    },

    aiResponse: {

        marketResearch: {
            type: String,
            default: ""
        },

        productPlan: {
            type: String,
            default: ""
        },

        softwareArchitecture: {
            type: String,
            default: ""
        },

        marketingStrategy: {
            type: String,
            default: ""
        },

        roadmap: {
            type: [String],
            default: []
        }

    },

    documents: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
)

// Model
const Startup: Model<IStartup> =
  mongoose.models.Startup ||
  mongoose.model<IStartup>("Startup", StartupSchema)

export default Startup