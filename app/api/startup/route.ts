// ============================================================
// app/api/startup/route.ts
// API Route handlers for POST and GET /api/startup
//
// POST: Runs the LangGraph pipeline, saves to MongoDB, returns report
// GET:  Returns all previous startup analyses from MongoDB
// ============================================================

import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { runStartupGraph } from "@/lib/graph/startupGraph";
import Startup from "@/models/Startup";
import { SubmitStartupRequest } from "@/types/startup";

// ── POST /api/startup ────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const body: SubmitStartupRequest = await req.json();
    const { idea } = body;

    // Validate input
    if (!idea || typeof idea !== "string" || idea.trim().length < 5) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid startup idea (min 5 characters)." },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    await connectToDatabase();

    // Run the full LangGraph multi-agent pipeline
    const graphResult = await runStartupGraph(idea.trim());

    // Destructure the agent outputs from graph state
    const { advisorOutput, marketResearchOutput, productManagerOutput } = graphResult;

    if (!advisorOutput || !marketResearchOutput || !productManagerOutput) {
      throw new Error("One or more agents failed to return output.");
    }

    // Save the complete analysis to MongoDB
    const newStartup = await Startup.create({
      startupIdea: idea.trim(),
      // Advisor Agent outputs
      strengths: advisorOutput.strengths,
      weaknesses: advisorOutput.weaknesses,
      risks: advisorOutput.risks,
      suggestions: advisorOutput.suggestions,
      // Market Research Agent outputs
      competitors: marketResearchOutput.competitors,
      marketTrends: marketResearchOutput.marketTrends,
      opportunities: marketResearchOutput.opportunities,
      // Product Manager Agent outputs
      mvpFeatures: productManagerOutput.mvpFeatures,
      roadmap: productManagerOutput.roadmap,
      userStories: productManagerOutput.userStories,
    });

    return NextResponse.json(
      {
        success: true,
        data: {
          _id: newStartup._id.toString(),
          startupIdea: newStartup.startupIdea,
          strengths: newStartup.strengths,
          weaknesses: newStartup.weaknesses,
          risks: newStartup.risks,
          suggestions: newStartup.suggestions,
          competitors: newStartup.competitors,
          marketTrends: newStartup.marketTrends,
          opportunities: newStartup.opportunities,
          mvpFeatures: newStartup.mvpFeatures,
          roadmap: newStartup.roadmap,
          userStories: newStartup.userStories,
          createdAt: newStartup.createdAt,
        },
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("[POST /api/startup] Error:", error);
    const message =
      error instanceof Error ? error.message : "An unexpected error occurred.";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

// ── GET /api/startup ─────────────────────────────────────────
// Supports ?id= for single record lookup, or no param for all records
export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (id) {
      // Single record lookup by MongoDB ObjectId
      const startup = await Startup.findById(id).lean();
      if (!startup) {
        return NextResponse.json(
          { success: false, error: "Analysis not found." },
          { status: 404 }
        );
      }
      return NextResponse.json(
        { success: true, data: [{ ...startup, _id: startup._id.toString() }] },
        { status: 200 }
      );
    }

    // Fetch all analyses, newest first, limit to 50
    const startups = await Startup.find({})
      .sort({ createdAt: -1 })
      .limit(50)
      .lean();

    const data = startups.map((s) => ({
      ...s,
      _id: s._id.toString(),
      createdAt: s.createdAt,
    }));

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error: unknown) {
    console.error("[GET /api/startup] Error:", error);
    const message =
      error instanceof Error ? error.message : "An unexpected error occurred.";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
