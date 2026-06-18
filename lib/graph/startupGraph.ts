// ============================================================
// lib/graph/startupGraph.ts
// LangGraph StateGraph orchestrating all three AI agents.
//
// Flow:
//   START → advisorNode → marketResearchNode → productManagerNode → END
//
// Each node enriches the shared state object before passing
// control to the next node in the pipeline.
// ============================================================

import { StateGraph, END, START } from "@langchain/langgraph";
import { Annotation } from "@langchain/langgraph";
import { runAdvisorAgent } from "@/lib/agents/advisorAgent";
import { runMarketResearchAgent } from "@/lib/agents/marketResearchAgent";
import { runProductManagerAgent } from "@/lib/agents/productManagerAgent";
import {
  AdvisorOutput,
  MarketResearchOutput,
  ProductManagerOutput,
} from "@/types/startup";

// ── Define the shared graph state using LangGraph Annotation ──────────────────
const GraphState = Annotation.Root({
  idea: Annotation<string>({
    reducer: (_, next) => next,
    default: () => "",
  }),
  advisorOutput: Annotation<AdvisorOutput | undefined>({
    reducer: (_, next) => next,
    default: () => undefined,
  }),
  marketResearchOutput: Annotation<MarketResearchOutput | undefined>({
    reducer: (_, next) => next,
    default: () => undefined,
  }),
  productManagerOutput: Annotation<ProductManagerOutput | undefined>({
    reducer: (_, next) => next,
    default: () => undefined,
  }),
});

type GraphStateType = typeof GraphState.State;

// ── Node: Startup Advisor ────────────────────────────────────────────────────
async function advisorNode(state: GraphStateType): Promise<Partial<GraphStateType>> {
  console.log("[LangGraph] Running Advisor Agent...");
  const advisorOutput = await runAdvisorAgent(state.idea);
  return { advisorOutput };
}

// ── Node: Market Research ────────────────────────────────────────────────────
async function marketResearchNode(
  state: GraphStateType
): Promise<Partial<GraphStateType>> {
  console.log("[LangGraph] Running Market Research Agent...");
  const marketResearchOutput = await runMarketResearchAgent(state.idea);
  return { marketResearchOutput };
}

// ── Node: Product Manager ────────────────────────────────────────────────────
async function productManagerNode(
  state: GraphStateType
): Promise<Partial<GraphStateType>> {
  console.log("[LangGraph] Running Product Manager Agent...");

  // Pass advisor strengths + market opportunities as context for richer output
  const strengths = state.advisorOutput?.strengths ?? [];
  const opportunities = state.marketResearchOutput?.opportunities ?? [];

  const productManagerOutput = await runProductManagerAgent(
    state.idea,
    strengths,
    opportunities
  );
  return { productManagerOutput };
}

// ── Build the StateGraph ─────────────────────────────────────────────────────
const workflow = new StateGraph(GraphState)
  .addNode("advisor", advisorNode)
  .addNode("marketResearch", marketResearchNode)
  .addNode("productManager", productManagerNode)
  .addEdge(START, "advisor")
  .addEdge("advisor", "marketResearch")
  .addEdge("marketResearch", "productManager")
  .addEdge("productManager", END);

// Compile the graph into a runnable
export const startupGraph = workflow.compile();

/**
 * runStartupGraph
 * Entry point for the full multi-agent pipeline.
 * @param idea - The startup idea from the user
 * @returns The final graph state with all agent outputs
 */
export async function runStartupGraph(idea: string): Promise<GraphStateType> {
  console.log(`[LangGraph] Starting pipeline for idea: "${idea}"`);

  const result = await startupGraph.invoke({ idea });

  console.log("[LangGraph] Pipeline complete.");
  return result;
}
