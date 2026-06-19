// ============================================================
// types/startup.ts
// Core TypeScript interfaces for the Orbit platform.
// All agent outputs and DB models are typed here.
// ============================================================

/** Output from the Startup Advisor Agent */
export interface AdvisorOutput {
  strengths: string[];
  weaknesses: string[];
  risks: string[];
  suggestions: string[];
}

/** Output from the Market Research Agent */
export interface MarketResearchOutput {
  competitors: string[];
  marketTrends: string[];
  opportunities: string[];
}

/** Output from the Product Manager Agent */
export interface ProductManagerOutput {
  mvpFeatures: string[];
  roadmap: string[];
  userStories: string[];
}

/** Combined full analysis report (union of all agent outputs) */
export interface StartupAnalysis
  extends AdvisorOutput,
    MarketResearchOutput,
    ProductManagerOutput {
  _id?: string;
  startupIdea: string;
  createdAt?: string | Date;
}

/** Shape of the POST /api/startup request body */
export interface SubmitStartupRequest {
  idea: string;
}

/** Shape of the POST /api/startup response */
export interface SubmitStartupResponse {
  success: boolean;
  data?: StartupAnalysis;
  error?: string;
}

/** Shape of the GET /api/startup response */
export interface GetStartupsResponse {
  success: boolean;
  data?: StartupAnalysis[];
  error?: string;
}

/** LangGraph state object passed between nodes */
export interface StartupGraphState {
  idea: string;
  advisorOutput?: AdvisorOutput;
  marketResearchOutput?: MarketResearchOutput;
  productManagerOutput?: ProductManagerOutput;
}
