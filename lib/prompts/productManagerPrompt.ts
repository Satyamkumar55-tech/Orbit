// ============================================================
// lib/prompts/productManagerPrompt.ts
// Prompt template for the Product Manager Agent.
// Instructs the LLM to define MVP features, roadmap, and
// user stories for the startup idea.
// ============================================================

export function buildProductManagerPrompt(
  idea: string,
  strengths: string[],
  opportunities: string[]
): string {
  return `You are a seasoned product manager with expertise in lean startup methodology and agile development.

Define the product strategy for the following startup:

Startup Idea: "${idea}"

Key Strengths identified:
${strengths.map((s, i) => `${i + 1}. ${s}`).join("\n")}

Market Opportunities identified:
${opportunities.map((o, i) => `${i + 1}. ${o}`).join("\n")}

Your task is to:
1. Define the minimum viable product (MVP) core features — the smallest set of features that deliver value
2. Create a phased product roadmap (Phase 1: MVP → Phase 2: Growth → Phase 3: Scale)
3. Write concrete user stories in the format "As a [user], I want to [action] so that [benefit]"

Return ONLY a valid JSON object with this exact structure (no markdown, no explanation):
{
  "mvpFeatures": ["feature 1", "feature 2", "feature 3", "feature 4", "feature 5", "feature 6"],
  "roadmap": ["Phase 1 (Months 1-3): ...", "Phase 2 (Months 4-6): ...", "Phase 3 (Months 7-12): ...", "Phase 4 (Year 2): ..."],
  "userStories": ["As a [user type], I want to [action] so that [benefit]", "...repeat for 5-6 stories"]
}

Rules:
- MVP features must be essential — no nice-to-haves
- Roadmap phases must be specific about timeline and what gets built
- User stories must follow the standard format exactly
- Provide at least 5 MVP features, 4 roadmap phases, and 5 user stories
- Return ONLY the JSON object, nothing else`;
}
