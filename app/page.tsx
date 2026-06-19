// ============================================================
// app/page.tsx — Home / Landing Page
// Hero section with animated headline, startup form, and
// "How it works" section showing the 3-agent pipeline.
// ============================================================

import StartupForm from "@/components/StartupForm";
import { Brain, TrendingUp, Code2, ArrowRight, Zap, Shield, BarChart3 } from "lucide-react";

const HOW_IT_WORKS = [
  {
    step: "01",
    icon: Brain,
    title: "Startup Advisor",
    description:
      "Our AI advisor analyzes your idea and surfaces key strengths, weaknesses, risks, and strategic suggestions.",
    gradient: "from-violet-500 to-purple-600",
    glow: "group-hover:shadow-violet-500/30",
  },
  {
    step: "02",
    icon: TrendingUp,
    title: "Market Research",
    description:
      "Deep-dives into your competitive landscape, identifies market trends, and surfaces untapped opportunities.",
    gradient: "from-blue-500 to-cyan-600",
    glow: "group-hover:shadow-blue-500/30",
  },
  {
    step: "03",
    icon: Code2,
    title: "Product Manager",
    description:
      "Defines your MVP feature set, creates a phased product roadmap, and writes concrete user stories.",
    gradient: "from-emerald-500 to-teal-600",
    glow: "group-hover:shadow-emerald-500/30",
  },
];

const FEATURES = [
  { icon: Zap, label: "Instant Analysis", desc: "Results in under 60 seconds" },
  { icon: Shield, label: "Honest Feedback", desc: "No sugar-coating, real insights" },
  { icon: BarChart3, label: "Full Report", desc: "8 sections of deep analysis" },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* ── Hero Section ──────────────────────────────────────── */}
      <section className="relative flex flex-col items-center justify-center min-h-screen px-4 pt-24 pb-16 text-center overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-violet-600/8 rounded-full blur-[140px] pointer-events-none" />

        {/* Badge */}
        <div className="animate-fade-in-up inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/25 text-violet-300 text-xs font-medium mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
          Powered by Google Gemini + LangGraph
        </div>

        {/* Headline */}
        <h1
          className="animate-fade-in-up text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1]"
          style={{ animationDelay: "80ms" }}
        >
          Validate your startup
          <br />
          <span className="gradient-text">idea with AI agents</span>
        </h1>

        {/* Subheadline */}
        <p
          className="animate-fade-in-up text-gray-400 text-lg sm:text-xl max-w-2xl mb-12 leading-relaxed"
          style={{ animationDelay: "160ms" }}
        >
          Enter your startup idea and let three specialized AI agents analyze it —
          advisor, market researcher, and product manager — delivering a full
          report in seconds.
        </p>

        {/* Form */}
        <div
          className="animate-fade-in-up w-full"
          style={{ animationDelay: "240ms" }}
        >
          <StartupForm />
        </div>

        {/* Feature pills */}
        <div
          className="animate-fade-in-up flex flex-wrap items-center justify-center gap-6 mt-12"
          style={{ animationDelay: "320ms" }}
        >
          {FEATURES.map(({ icon: Icon, label, desc }) => (
            <div key={label} className="flex items-center gap-2 text-gray-500">
              <Icon className="w-4 h-4 text-violet-400" />
              <span className="text-sm">
                <span className="text-gray-300 font-medium">{label}</span>
                {" — "}
                {desc}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── How it Works ──────────────────────────────────────── */}
      <section className="px-4 py-24 max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-violet-400 text-sm font-semibold uppercase tracking-widest mb-3">
            The Pipeline
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Three agents, one complete report
          </h2>
          <p className="text-gray-500 mt-4 max-w-xl mx-auto">
            Each agent specializes in a different dimension of startup validation
            and passes context to the next for richer, connected insights.
          </p>
        </div>

        {/* Agent cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 stagger">
          {HOW_IT_WORKS.map(({ step, icon: Icon, title, description, gradient, glow }) => (
            <div
              key={step}
              className={`group glass-card p-6 hover:border-white/20 hover:shadow-2xl ${glow} transition-all duration-300 animate-fade-in-up`}
            >
              {/* Step number */}
              <div className="flex items-center justify-between mb-5">
                <span className="text-4xl font-black text-white/5">{step}</span>
                <div
                  className={`w-11 h-11 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg`}
                >
                  <Icon className="w-5 h-5 text-white" />
                </div>
              </div>

              <h3 className="text-white font-bold text-lg mb-2">{title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{description}</p>

              {/* Arrow connector (not on last) */}
              <div className="mt-5 flex items-center gap-1 text-gray-700 text-xs">
                <span>Passes context</span>
                <ArrowRight className="w-3 h-3" />
                <span>next agent</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA Section ───────────────────────────────────────── */}
      <section className="px-4 py-20 text-center">
        <div className="max-w-2xl mx-auto glass-card p-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 to-indigo-600/5 pointer-events-none" />
          <h2 className="text-3xl font-bold text-white mb-4 relative">
            Ready to validate your idea?
          </h2>
          <p className="text-gray-400 mb-8 relative">
            Join thousands of founders who used Orbit to validate, refine, and launch faster.
          </p>
          <a
            href="#startup-idea-input"
            className="inline-flex items-center gap-2 btn-glow text-white font-semibold px-8 py-3 rounded-xl relative"
          >
            <Zap className="w-4 h-4" />
            Start Analyzing Free
          </a>
        </div>
      </section>
    </div>
  );
}
