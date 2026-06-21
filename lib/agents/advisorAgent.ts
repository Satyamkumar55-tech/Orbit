// ============================================================
// lib/agents/advisorAgent.ts
// Startup Advisor Agent — analyzes the idea and returns
// strengths, weaknesses, risks, and suggestions via Gemini.
// ============================================================

import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HumanMessage } from "@langchain/core/messages";
import { AdvisorOutput } from "@/types/startup";
import { buildAdvisorPrompt } from "@/lib/prompts/advisorPrompt";

/**
 * runAdvisorAgent
 * Calls Gemini with the advisor prompt and parses the JSON response.
 * @param idea - The raw startup idea string from the user
 * @returns AdvisorOutput with strengths, weaknesses, risks, suggestions
 */
export async function runAdvisorAgent(idea: string): Promise<AdvisorOutput> {
  const model = new ChatGoogleGenerativeAI({
    model: "gemini-3.1-flash-lite",
    apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
    temperature: 0.7,
  });

  const prompt = buildAdvisorPrompt(idea);

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

  let parsed: AdvisorOutput;
  try {
    parsed = JSON.parse(cleaned);
  } catch {
    throw new Error(`Advisor Agent: Failed to parse JSON response: ${cleaned}`);
  }

  // Validate required fields
  if (
    !Array.isArray(parsed.strengths) ||
    !Array.isArray(parsed.weaknesses) ||
    !Array.isArray(parsed.risks) ||
    !Array.isArray(parsed.suggestions)
  ) {
    throw new Error("Advisor Agent: Response missing required array fields");
  }

  return parsed;
}
