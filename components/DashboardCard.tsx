"use client";
// ============================================================
// components/DashboardCard.tsx
// Compact card for the dashboard history list.
// Shows idea title, date, and quick stats summary.
// ============================================================

import Link from "next/link";
import { Calendar, ArrowUpRight, Sparkles, TrendingUp, Code2 } from "lucide-react";
import { StartupAnalysis } from "@/types/startup";

interface DashboardCardProps {
  startup: StartupAnalysis;
}

export default function DashboardCard({ startup }: DashboardCardProps) {
  const formattedDate = startup.createdAt
    ? new Date(startup.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "Unknown date";

  const stats = [
    {
      icon: Sparkles,
      label: "Strengths",
      count: startup.strengths?.length ?? 0,
      color: "text-violet-400",
    },
    {
      icon: TrendingUp,
      label: "Competitors",
      count: startup.competitors?.length ?? 0,
      color: "text-blue-400",
    },
    {
      icon: Code2,
      label: "MVP Features",
      count: startup.mvpFeatures?.length ?? 0,
      color: "text-emerald-400",
    },
  ];

  return (
    <Link href={`/result?id=${startup._id}`}>
      <div className="group relative bg-white/4 backdrop-blur-sm border border-white/10 rounded-2xl p-5 hover:bg-white/7 hover:border-white/20 hover:shadow-2xl hover:shadow-violet-500/5 transition-all duration-300 cursor-pointer overflow-hidden">
        {/* Hover glow */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="absolute top-0 right-0 w-32 h-32 bg-violet-600/10 rounded-full blur-2xl" />
        </div>

        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <h3 className="text-white font-semibold text-base leading-snug line-clamp-2 flex-1">
            {startup.startupIdea}
          </h3>
          <ArrowUpRight className="w-4 h-4 text-gray-600 group-hover:text-violet-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 flex-shrink-0 mt-0.5" />
        </div>

        {/* Stats row */}
        <div className="flex items-center gap-4 mb-4">
          {stats.map(({ icon: Icon, label, count, color }) => (
            <div key={label} className="flex items-center gap-1.5">
              <Icon className={`w-3.5 h-3.5 ${color}`} />
              <span className="text-gray-400 text-xs">{count} {label}</span>
            </div>
          ))}
        </div>

        {/* First strength preview */}
        {startup.strengths?.[0] && (
          <p className="text-gray-600 text-xs leading-relaxed line-clamp-2 mb-4 border-l-2 border-violet-500/30 pl-3">
            {startup.strengths[0]}
          </p>
        )}

        {/* Date */}
        <div className="flex items-center gap-1.5 text-gray-600 text-xs">
          <Calendar className="w-3 h-3" />
          <span>{formattedDate}</span>
        </div>
      </div>
    </Link>
  );
}
