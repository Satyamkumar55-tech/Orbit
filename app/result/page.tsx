"use client";
// ============================================================
// app/result/page.tsx
// Displays the full startup analysis report fetched by ID.
// Renders all 8 sections using ResultCard components.
// ============================================================

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Sparkles,
  AlertTriangle,
  ShieldAlert,
  Lightbulb,
  Users,
  TrendingUp,
  Target,
  Code2,
  Map,
  BookOpen,
  ArrowLeft,
  Calendar,
  Share2,
  LayoutDashboard,
  AlertCircle,
  Rocket,
} from "lucide-react";
import ResultCard from "@/components/ResultCard";
import { StartupAnalysis } from "@/types/startup";

// Card config — maps each section to visual properties
const CARD_CONFIG = [
  {
    key: "strengths" as keyof StartupAnalysis,
    title: "Strengths",
    icon: Sparkles,
    gradient: "from-violet-500 to-purple-600",
    badgeColor: "bg-violet-500/20 text-violet-300 border-violet-500/30",
    dotColor: "bg-violet-400",
  },
  {
    key: "weaknesses" as keyof StartupAnalysis,
    title: "Weaknesses",
    icon: AlertTriangle,
    gradient: "from-amber-500 to-orange-600",
    badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    dotColor: "bg-amber-400",
  },
  {
    key: "risks" as keyof StartupAnalysis,
    title: "Risks",
    icon: ShieldAlert,
    gradient: "from-red-500 to-rose-600",
    badgeColor: "bg-red-500/20 text-red-300 border-red-500/30",
    dotColor: "bg-red-400",
  },
  {
    key: "suggestions" as keyof StartupAnalysis,
    title: "Strategic Suggestions",
    icon: Lightbulb,
    gradient: "from-yellow-500 to-amber-600",
    badgeColor: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
    dotColor: "bg-yellow-400",
  },
  {
    key: "competitors" as keyof StartupAnalysis,
    title: "Competitors",
    icon: Users,
    gradient: "from-blue-500 to-cyan-600",
    badgeColor: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    dotColor: "bg-blue-400",
  },
  {
    key: "marketTrends" as keyof StartupAnalysis,
    title: "Market Trends",
    icon: TrendingUp,
    gradient: "from-sky-500 to-indigo-600",
    badgeColor: "bg-sky-500/20 text-sky-300 border-sky-500/30",
    dotColor: "bg-sky-400",
  },
  {
    key: "opportunities" as keyof StartupAnalysis,
    title: "Opportunities",
    icon: Target,
    gradient: "from-teal-500 to-emerald-600",
    badgeColor: "bg-teal-500/20 text-teal-300 border-teal-500/30",
    dotColor: "bg-teal-400",
  },
  {
    key: "mvpFeatures" as keyof StartupAnalysis,
    title: "MVP Features",
    icon: Code2,
    gradient: "from-emerald-500 to-green-600",
    badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    dotColor: "bg-emerald-400",
  },
  {
    key: "roadmap" as keyof StartupAnalysis,
    title: "Product Roadmap",
    icon: Map,
    gradient: "from-pink-500 to-rose-600",
    badgeColor: "bg-pink-500/20 text-pink-300 border-pink-500/30",
    dotColor: "bg-pink-400",
  },
  {
    key: "userStories" as keyof StartupAnalysis,
    title: "User Stories",
    icon: BookOpen,
    gradient: "from-indigo-500 to-violet-600",
    badgeColor: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
    dotColor: "bg-indigo-400",
  },
];

// ── Skeleton loader ──────────────────────────────────────────
function Skeleton() {
  return (
    <div className="animate-pulse space-y-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="glass-card p-5 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10" />
            <div>
              <div className="w-32 h-4 bg-white/10 rounded mb-1" />
              <div className="w-16 h-3 bg-white/5 rounded" />
            </div>
          </div>
          <div className="space-y-2 pt-2">
            {Array.from({ length: 3 }).map((_, j) => (
              <div key={j} className="h-3 bg-white/5 rounded w-full" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function ResultContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [data, setData] = useState<StartupAnalysis | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!id) {
      router.replace("/");
      return;
    }

    const fetchResult = async () => {
      try {
        const res = await fetch(`/api/startup?id=${id}`);
        const json = await res.json();

        if (!res.ok || !json.success) {
          throw new Error(json.error ?? "Failed to load analysis.");
        }

        // GET returns array; find by id
        const found = Array.isArray(json.data)
          ? json.data.find((s: StartupAnalysis) => s._id === id)
          : null;

        if (!found) throw new Error("Analysis not found.");
        setData(found);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Unknown error.");
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, [id, router]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // ── Error ────────────────────────────────────────────────────
  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center pt-20">
        <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-6">
          <AlertCircle className="w-8 h-8 text-red-400" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-3">Failed to load</h2>
        <p className="text-gray-400 max-w-md mb-8 text-sm">{error}</p>
        <Link
          href="/"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-300 text-sm hover:bg-white/10 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 max-w-6xl mx-auto">
      {/* ── Back + actions ─────────────────────────────────── */}
      <div className="flex items-center justify-between mb-8">
        <Link
          href="/"
          className="flex items-center gap-2 text-gray-500 hover:text-gray-300 text-sm transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          New Analysis
        </Link>
        <div className="flex items-center gap-2">
          <Link
            href="/dashboard"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-400 text-sm hover:bg-white/10 transition-all"
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            Dashboard
          </Link>
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-400 text-sm hover:bg-white/10 transition-all"
          >
            <Share2 className="w-3.5 h-3.5" />
            {copied ? "Copied!" : "Share"}
          </button>
        </div>
      </div>

      {loading ? (
        <Skeleton />
      ) : data ? (
        <>
          {/* ── Report header ────────────────────────────────── */}
          <div className="mb-10 animate-fade-in-up">
            {/* Idea badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/25 text-violet-300 text-xs font-medium mb-4">
              <Rocket className="w-3 h-3" />
              Startup Analysis Report
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3 leading-tight">
              {data.startupIdea}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {data.createdAt
                  ? new Date(data.createdAt).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : ""}
              </span>
              <span className="text-gray-700">•</span>
              <span>10 sections · {CARD_CONFIG.reduce((acc, c) => acc + ((data[c.key] as string[])?.length ?? 0), 0)} insights</span>
            </div>
          </div>

          {/* ── Score summary strip ──────────────────────────── */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
            {[
              { label: "Strengths", count: data.strengths.length, color: "text-violet-400", bg: "bg-violet-500/10 border-violet-500/20" },
              { label: "Competitors", count: data.competitors.length, color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20" },
              { label: "MVP Features", count: data.mvpFeatures.length, color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
              { label: "Roadmap Phases", count: data.roadmap.length, color: "text-pink-400", bg: "bg-pink-500/10 border-pink-500/20" },
            ].map(({ label, count, color, bg }) => (
              <div key={label} className={`rounded-xl border p-4 ${bg} animate-fade-in-up`}>
                <div className={`text-2xl font-bold ${color} mb-0.5`}>{count}</div>
                <div className="text-gray-500 text-xs">{label}</div>
              </div>
            ))}
          </div>

          {/* ── Agent section headers + cards ───────────────── */}
          {/* ADVISOR */}
          <SectionHeader label="01" title="Startup Advisor" color="text-violet-400" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10 stagger">
            {CARD_CONFIG.slice(0, 4).map((cfg, idx) => (
              <ResultCard
                key={cfg.key}
                title={cfg.title}
                items={(data[cfg.key] as string[]) ?? []}
                icon={cfg.icon}
                gradient={cfg.gradient}
                badgeColor={cfg.badgeColor}
                dotColor={cfg.dotColor}
                delay={idx * 80}
              />
            ))}
          </div>

          {/* MARKET RESEARCH */}
          <SectionHeader label="02" title="Market Research" color="text-blue-400" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 stagger">
            {CARD_CONFIG.slice(4, 7).map((cfg, idx) => (
              <ResultCard
                key={cfg.key}
                title={cfg.title}
                items={(data[cfg.key] as string[]) ?? []}
                icon={cfg.icon}
                gradient={cfg.gradient}
                badgeColor={cfg.badgeColor}
                dotColor={cfg.dotColor}
                delay={idx * 80}
              />
            ))}
          </div>

          {/* PRODUCT MANAGER */}
          <SectionHeader label="03" title="Product Manager" color="text-emerald-400" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 stagger">
            {CARD_CONFIG.slice(7).map((cfg, idx) => (
              <ResultCard
                key={cfg.key}
                title={cfg.title}
                items={(data[cfg.key] as string[]) ?? []}
                icon={cfg.icon}
                gradient={cfg.gradient}
                badgeColor={cfg.badgeColor}
                dotColor={cfg.dotColor}
                delay={idx * 80}
              />
            ))}
          </div>

          {/* ── Bottom CTA ──────────────────────────────────── */}
          <div className="mt-16 text-center">
            <p className="text-gray-600 text-sm mb-4">Want to validate another idea?</p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 btn-glow text-white font-semibold px-6 py-3 rounded-xl text-sm"
            >
              <Rocket className="w-4 h-4" />
              Analyze Another Startup
            </Link>
          </div>
        </>
      ) : null}
    </div>
  );
}

// ── Section divider header ───────────────────────────────────
function SectionHeader({
  label,
  title,
  color,
}: {
  label: string;
  title: string;
  color: string;
}) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="text-xs font-bold text-gray-700">{label}</span>
      <div className="h-px flex-1 bg-white/5" />
      <span className={`text-xs font-semibold uppercase tracking-widest ${color}`}>
        {title}
      </span>
      <div className="h-px flex-1 bg-white/5" />
    </div>
  );
}

export default function ResultPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-violet-500 border-t-transparent animate-spin" />
        </div>
      }
    >
      <ResultContent />
    </Suspense>
  );
}
