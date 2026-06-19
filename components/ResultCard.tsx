"use client";
// ============================================================
// components/ResultCard.tsx
// Reusable card component for displaying a section of the
// startup analysis (strengths, competitors, roadmap, etc.)
// ============================================================

import { LucideIcon, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

interface ResultCardProps {
  title: string;
  items: string[];
  icon: LucideIcon;
  gradient: string;       // e.g. "from-violet-500 to-purple-600"
  badgeColor: string;     // e.g. "bg-violet-500/20 text-violet-300 border-violet-500/30"
  dotColor: string;       // e.g. "bg-violet-400"
  delay?: number;         // stagger animation delay in ms
}

export default function ResultCard({
  title,
  items,
  icon: Icon,
  gradient,
  badgeColor,
  dotColor,
  delay = 0,
}: ResultCardProps) {
  const [expanded, setExpanded] = useState(true);

  return (
    <div
      className="group bg-white/4 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-300 hover:bg-white/6 hover:shadow-xl"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Card Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-3 p-5 text-left"
      >
        {/* Icon */}
        <div
          className={`w-10 h-10 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg flex-shrink-0`}
        >
          <Icon className="w-5 h-5 text-white" />
        </div>

        {/* Title + count */}
        <div className="flex-1 min-w-0">
          <h3 className="text-white font-semibold text-base">{title}</h3>
          <p className="text-gray-500 text-xs mt-0.5">{items.length} items</p>
        </div>

        {/* Collapse toggle */}
        <div className="text-gray-600 group-hover:text-gray-400 transition-colors">
          {expanded ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </div>
      </button>

      {/* Divider */}
      {expanded && <div className="h-px bg-white/5 mx-5" />}

      {/* Items list */}
      {expanded && (
        <ul className="p-5 pt-4 space-y-3">
          {items.map((item, idx) => (
            <li key={idx} className="flex items-start gap-3">
              {/* Numbered badge */}
              <span
                className={`flex-shrink-0 w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center border ${badgeColor} mt-0.5`}
              >
                {idx + 1}
              </span>
              {/* Dot */}
              <span className={`flex-shrink-0 w-1.5 h-1.5 rounded-full ${dotColor} mt-2`} />
              {/* Content */}
              <p className="text-gray-300 text-sm leading-relaxed">{item}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
