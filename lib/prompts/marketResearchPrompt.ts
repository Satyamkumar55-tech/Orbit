// ============================================================
// lib/prompts/marketResearchPrompt.ts
// Prompt template for the Market Research Agent.
// Instructs the LLM to research competitors, trends, and
// market opportunities for the startup idea.
// ============================================================

export function buildMarketResearchPrompt(idea: string): string {
  return `You are a senior market research analyst specializing in tech startups and emerging markets.

Conduct thorough market research for the following startup idea:

Startup Idea: "${idea}"

Your task is to:
1. Identify the top direct and indirect competitors in this space
2. Analyze the most relevant current market trends that impact this idea
3. Identify untapped opportunities and market gaps this startup could exploit

Return ONLY a valid JSON object with this exact structure (no markdown, no explanation):
{
  "competitors": ["Competitor 1 with brief description", "Competitor 2 with brief description", "Competitor 3 with brief description", "Competitor 4 with brief description", "Competitor 5 with brief description"],
  "marketTrends": ["trend 1 with context", "trend 2 with context", "trend 3 with context", "trend 4 with context"],
  "opportunities": ["opportunity 1", "opportunity 2", "opportunity 3", "opportunity 4", "opportunity 5"]
}

Rules:
- For competitors, include the company name and what they do (e.g., "Peloton — at-home connected fitness equipment")
- For trends, include data points or specific context where possible
- For opportunities, be specific about the market gap or underserved segment
- Provide at least 4 items per array
- Return ONLY the JSON object, nothing else`;
}
