// ============================================================
// lib/agents/productManagerAgent.ts
// Product Manager Agent — defines MVP features, roadmap,
// and user stories using context from previous agents.
// ============================================================

import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HumanMessage } from "@langchain/core/messages";
import { ProductManagerOutput } from "@/types/startup";
import { buildProductManagerPrompt } from "@/lib/prompts/productManagerPrompt";

/**
 * runProductManagerAgent
 * Calls Gemini with the PM prompt (enriched with advisor + market context)
 * and parses the JSON response.
 * @param idea - The startup idea
 * @param strengths - Strengths from advisor agent (used as context)
 * @param opportunities - Opportunities from market research agent (used as context)
 * @returns ProductManagerOutput with mvpFeatures, roadmap, userStories
 */
export async function runProductManagerAgent(
  idea: string,
  strengths: string[],
  opportunities: string[]
): Promise<ProductManagerOutput> {
  const model = new ChatGoogleGenerativeAI({
    model: "gemini-1.5-flash",
    apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
    temperature: 0.65,
  });

  const prompt = buildProductManagerPrompt(idea, strengths, opportunities);

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

  let parsed: ProductManagerOutput;
  try {
    parsed = JSON.parse(cleaned);
  } catch {
    throw new Error(
      `Product Manager Agent: Failed to parse JSON response: ${cleaned}`
    );
  }

  // Validate required fields
  if (
    !Array.isArray(parsed.mvpFeatures) ||
    !Array.isArray(parsed.roadmap) ||
    !Array.isArray(parsed.userStories)
  ) {
    throw new Error(
      "Product Manager Agent: Response missing required array fields"
    );
  }

  return parsed;
}
