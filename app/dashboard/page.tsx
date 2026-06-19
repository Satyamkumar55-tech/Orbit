"use client";
// ============================================================
// app/dashboard/page.tsx
// History of all analyzed startups with search functionality.
// ============================================================

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  Search,
  Rocket,
  AlertCircle,
  RefreshCw,
  X,
} from "lucide-react";
import DashboardCard from "@/components/DashboardCard";
import { StartupAnalysis } from "@/types/startup";

// ── Skeleton for loading state ───────────────────────────────
function GridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="glass-card p-5 animate-pulse space-y-3">
          <div className="h-4 bg-white/10 rounded w-3/4" />
          <div className="h-3 bg-white/5 rounded w-1/2" />
          <div className="flex gap-3 pt-1">
            <div className="h-3 bg-white/5 rounded w-20" />
            <div className="h-3 bg-white/5 rounded w-20" />
          </div>
          <div className="h-3 bg-white/5 rounded w-full" />
          <div className="h-3 bg-white/5 rounded w-2/3" />
          <div className="h-3 bg-white/5 rounded w-24 mt-2" />
        </div>
      ))}
    </div>
  );
}

export default function DashboardPage() {
  const [startups, setStartups] = useState<StartupAnalysis[]>([]);
  const [filtered, setFiltered] = useState<StartupAnalysis[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const fetchStartups = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/startup");
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.error ?? "Failed to load.");
      setStartups(json.data ?? []);
      setFiltered(json.data ?? []);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Unknown error.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStartups();
  }, []);

  // Live search filter
  useEffect(() => {
    if (!query.trim()) {
      setFiltered(startups);
    } else {
      const q = query.toLowerCase();
      setFiltered(
        startups.filter((s) =>
          s.startupIdea.toLowerCase().includes(q) ||
          s.strengths?.some((str) => str.toLowerCase().includes(q)) ||
          s.competitors?.some((c) => c.toLowerCase().includes(q))
        )
      );
    }
  }, [query, startups]);

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 max-w-6xl mx-auto">
      {/* ── Page header ──────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 animate-fade-in-up">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <LayoutDashboard className="w-5 h-5 text-violet-400" />
            <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          </div>
          <p className="text-gray-500 text-sm">
            {startups.length} startup
            {startups.length !== 1 ? "s" : ""} analyzed
          </p>
        </div>

        <Link
          href="/"
          className="flex items-center gap-2 btn-glow text-white font-semibold px-5 py-2.5 rounded-xl text-sm self-start sm:self-auto"
        >
          <Rocket className="w-4 h-4" />
          New Analysis
        </Link>
      </div>

      {/* ── Search bar ───────────────────────────────────────── */}
      <div className="relative mb-8 animate-fade-in-up" style={{ animationDelay: "80ms" }}>
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
        <input
          type="text"
          id="dashboard-search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by idea, strength, or competitor..."
          className="w-full pl-11 pr-10 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 text-sm outline-none focus:border-violet-500/50 focus:bg-white/8 transition-all"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-400 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* ── States: loading / error / empty / grid ───────────── */}
      {loading ? (
        <GridSkeleton />
      ) : error ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-5">
            <AlertCircle className="w-7 h-7 text-red-400" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">Failed to load</h3>
          <p className="text-gray-500 text-sm mb-6 max-w-xs">{error}</p>
          <button
            onClick={fetchStartups}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-gray-300 text-sm hover:bg-white/10 transition-all"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Retry
          </button>
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          {startups.length === 0 ? (
            <>
              {/* Empty state — no analyses yet */}
              <div className="w-20 h-20 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mb-6">
                <Rocket className="w-9 h-9 text-violet-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                No analyses yet
              </h3>
              <p className="text-gray-500 text-sm mb-8 max-w-sm">
                Submit your first startup idea and the analysis will appear here.
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 btn-glow text-white font-semibold px-6 py-3 rounded-xl text-sm"
              >
                <Rocket className="w-4 h-4" />
                Analyze Your First Idea
              </Link>
            </>
          ) : (
            <>
              {/* No search results */}
              <Search className="w-8 h-8 text-gray-700 mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">
                No results for &quot;{query}&quot;
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Try a different search term.
              </p>
              <button
                onClick={() => setQuery("")}
                className="text-violet-400 text-sm hover:text-violet-300 transition-colors"
              >
                Clear search
              </button>
            </>
          )}
        </div>
      ) : (
        <>
          {/* Result count when searching */}
          {query && (
            <p className="text-gray-600 text-xs mb-4">
              {filtered.length} result{filtered.length !== 1 ? "s" : ""} for &quot;{query}&quot;
            </p>
          )}

          {/* Cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 stagger">
            {filtered.map((startup) => (
              <div key={startup._id} className="animate-fade-in-up">
                <DashboardCard startup={startup} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
