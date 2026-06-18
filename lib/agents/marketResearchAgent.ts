// ============================================================
// lib/agents/marketResearchAgent.ts
// Market Research Agent — identifies competitors, trends,
// and opportunities for the startup idea via Gemini.
// ============================================================

import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HumanMessage } from "@langchain/core/messages";
import { MarketResearchOutput } from "@/types/startup";
import { buildMarketResearchPrompt } from "@/lib/prompts/marketResearchPrompt";

/**
 * runMarketResearchAgent
 * Calls Gemini with the market research prompt and parses the JSON response.
 * @param idea - The raw startup idea string from the user
 * @returns MarketResearchOutput with competitors, trends, opportunities
 */
export async function runMarketResearchAgent(
  idea: string
): Promise<MarketResearchOutput> {
  const model = new ChatGoogleGenerativeAI({
    model: "gemini-1.5-flash",
    apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
    temperature: 0.6,
  });

  const prompt = buildMarketResearchPrompt(idea);

  const response = await model.invoke([new HumanMessage(prompt)]);

  // Extract text content from the response
  const rawText =
    typeof response.content === "string"
      ? response.content
      : response.content
          .filter((c) => c.type === "text")
          .map((c) => (c as { type: "text"; text: string }).text)
          .join("");

  // Strip any markdown code fences if the model wraps the JSON
  const cleaned = rawText
    .replace(/```json\s*/gi, "")
    .replace(/```\s*/gi, "")
    .trim();

  let parsed: MarketResearchOutput;
  try {
    parsed = JSON.parse(cleaned);
  } catch {
    throw new Error(
      `Market Research Agent: Failed to parse JSON response: ${cleaned}`
    );
  }

  // Validate required fields
  if (
    !Array.isArray(parsed.competitors) ||
    !Array.isArray(parsed.marketTrends) ||
    !Array.isArray(parsed.opportunities)
  ) {
    throw new Error(
      "Market Research Agent: Response missing required array fields"
    );
  }

  return parsed;
}
