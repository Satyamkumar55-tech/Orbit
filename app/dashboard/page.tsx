"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Icons } from "@/components/Icons";

export default function DashboardPage() {
  const [healthScore, setHealthScore] = useState(88);

  const quickActions = [
    { label: "Validate Idea", href: "/dashboard/idea-validation", icon: <Icons.Idea className="text-electric-blue" size={16} /> },
    { label: "Sprint Planner", href: "/dashboard/product-planning", icon: <Icons.Planning className="text-orbit-purple" size={16} /> },
    { label: "Kanban Board", href: "/dashboard/task-center", icon: <Icons.Task className="text-success-green" size={16} /> },
    { label: "Market Radar", href: "/dashboard/market-research", icon: <Icons.Research className="text-warning-orange" size={16} /> },
  ];

  const milestones = [
    { name: "Market Validation", status: "completed", progress: 100, date: "June 05" },
    { name: "Alpha Architecture", status: "completed", progress: 100, date: "June 10" },
    { name: "Dashboard Prototype", status: "active", progress: 68, date: "June 20" },
    { name: "Beta Launch", status: "pending", progress: 0, date: "July 15" },
  ];

  const activities = [
    { user: "Founder (You)", action: "Created task 'Implement drag-drop kanban'", time: "10m ago", category: "Task" },
    { user: "AI Co-pilot", action: "Generated 3 content ideas for launch day", time: "2h ago", category: "Content" },
    { user: "System Monitor", action: "Recalculated startup validation score (94%)", time: "5h ago", category: "System" },
    { user: "Founder (You)", action: "Completed market comparison sheet", time: "Yesterday", category: "Market" },
  ];

  return (
    <div className="space-y-6 animate-float-delayed">
      {/* Top Welcome Header */}
      <div className="glass-panel p-6 rounded-xl border border-borders flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative overflow-hidden bg-gradient-to-r from-electric-blue/[0.02] via-orbit-purple/[0.02] to-transparent">
        <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-orbit-purple/5 to-transparent rounded-bl-full pointer-events-none" />
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            Welcome aboard, Founder 🚀
          </h1>
          <p className="text-sm text-text-secondary mt-1">
            {"\"Aaj ka mission: Apne vision ko reality mein convert karna.\""}
          </p>
        </div>
        <div className="flex gap-3 shrink-0">
          <Link
            href="/dashboard/task-center"
            className="px-4 py-2 text-xs font-semibold bg-electric-blue hover:bg-blue-600 rounded-lg text-white shadow-lg shadow-electric-blue/15 transition-all flex items-center gap-1.5"
          >
            <Icons.Plus size={14} />
            New Sprints Task
          </Link>
          <button
            onClick={() => setHealthScore((prev) => Math.min(100, prev + 1))}
            className="px-4 py-2 text-xs font-semibold border border-borders hover:bg-white/5 rounded-lg text-text-primary transition-all flex items-center gap-1.5 glass-panel"
          >
            <Icons.Sparkles size={14} className="text-orbit-purple" />
            Check Health Log
          </button>
        </div>
      </div>

      {/* Primary Metrics Cockpit Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Startup Health Circular Progress Widget */}
        <div className="md:col-span-4 glass-panel p-6 rounded-xl border border-borders flex flex-col items-center justify-between text-center relative">
          <div className="w-full flex justify-between items-center mb-4">
            <span className="text-[10px] font-mono text-text-secondary uppercase tracking-wider">Startup Health Score</span>
            <span className="w-2 h-2 rounded-full bg-success-green glow-dot-green animate-pulse" />
          </div>

          <div className="relative w-36 h-36 flex items-center justify-center">
            {/* SVG Circle progress */}
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="72"
                cy="72"
                r="60"
                className="stroke-borders fill-none"
                strokeWidth="8"
              />
              <circle
                cx="72"
                cy="72"
                r="60"
                className="stroke-electric-blue fill-none transition-all duration-500 ease-out"
                strokeWidth="8"
                strokeDasharray={377}
                strokeDashoffset={377 - (377 * healthScore) / 100}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-3xl font-bold text-white tracking-tight">{healthScore}%</span>
              <span className="text-[9px] font-mono text-success-green bg-success-green/5 border border-success-green/20 px-1.5 py-0.5 rounded mt-1">
                OPTIMIZED
              </span>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-borders/60 w-full flex justify-around text-xs font-mono">
            <div>
              <span className="block text-white font-bold">18 Mo</span>
              <span className="text-[9px] text-text-secondary">AI Runway</span>
            </div>
            <div className="border-l border-borders/60 h-8" />
            <div>
              <span className="block text-white font-bold">94%</span>
              <span className="text-[9px] text-text-secondary">Market Fit</span>
            </div>
          </div>
        </div>

        {/* Milestone Roadmap Progression Widget */}
        <div className="md:col-span-8 glass-panel p-6 rounded-xl border border-borders flex flex-col justify-between">
          <div className="flex justify-between items-center mb-4">
            <div>
              <span className="text-[10px] font-mono text-text-secondary uppercase tracking-wider">Progress Tracker</span>
              <h3 className="text-sm font-bold text-white mt-0.5">Active Milestones</h3>
            </div>
            <span className="text-xs font-mono text-electric-blue">68% Total Progress</span>
          </div>

          <div className="space-y-4">
            {milestones.map((m, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <div className="w-24 shrink-0">
                  <span className="text-xs font-medium text-white truncate block">{m.name}</span>
                  <span className="text-[9px] font-mono text-text-secondary">{m.date}</span>
                </div>
                <div className="flex-1 bg-borders h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      m.status === "completed"
                        ? "bg-success-green"
                        : m.status === "active"
                        ? "bg-electric-blue"
                        : "bg-borders"
                    }`}
                    style={{ width: `${m.progress}%` }}
                  />
                </div>
                <div className="w-12 text-right">
                  <span className="text-xs font-mono text-text-secondary">{m.progress}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Cockpit Actions & Activity Log */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Launch Control Action list */}
        <div className="glass-panel p-6 rounded-xl border border-borders flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-mono text-text-secondary uppercase tracking-wider block mb-4">Quick Actions</span>
            <div className="grid grid-cols-2 gap-3">
              {quickActions.map((action, idx) => (
                <Link
                  key={idx}
                  href={action.href}
                  className="p-3 rounded-lg border border-borders hover:border-electric-blue/40 bg-zinc-900/30 hover:bg-electric-blue/[0.02] transition-all flex flex-col items-center justify-center text-center group"
                >
                  <div className="p-2 rounded-lg bg-white/5 border border-borders mb-2 group-hover:scale-105 transition-all">
                    {action.icon}
                  </div>
                  <span className="text-xs font-semibold text-text-secondary group-hover:text-white transition-colors">
                    {action.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>
          <div className="mt-6 p-3 rounded-lg border border-borders/80 bg-white/[0.01] flex items-center justify-between text-[10px] font-mono text-text-secondary">
            <span>Control Node: Main cockpit</span>
            <span className="text-success-green flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-success-green glow-dot-green animate-pulse" />
              Online
            </span>
          </div>
        </div>

        {/* Recent Activity Sprints logs */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-xl border border-borders">
          <div className="flex justify-between items-center mb-4">
            <div>
              <span className="text-[10px] font-mono text-text-secondary uppercase tracking-wider">Mission feed</span>
              <h3 className="text-sm font-bold text-white mt-0.5">Recent Activities</h3>
            </div>
            <button className="text-xs font-mono text-electric-blue hover:underline">View All logs</button>
          </div>

          <div className="divide-y divide-borders/60">
            {activities.map((act, idx) => (
              <div key={idx} className="py-3.5 flex items-center justify-between gap-4 first:pt-0 last:pb-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/5 border border-borders flex items-center justify-center text-xs font-bold text-text-secondary shrink-0">
                    {act.category.charAt(0)}
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-white block">{act.user}</span>
                    <span className="text-xs text-text-secondary mt-0.5 block">{act.action}</span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-[10px] text-text-secondary font-mono block">{act.time}</span>
                  <span className="text-[9px] font-mono text-electric-blue border border-electric-blue/25 bg-electric-blue/[0.02] px-1.5 py-0.5 rounded mt-1 inline-block">
                    {act.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick insights metric widgets */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="glass-panel p-4 rounded-xl border border-borders flex flex-col justify-between">
          <span className="text-[10px] font-mono text-text-secondary uppercase tracking-wider">Goal Completion</span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-2xl font-bold text-white">83%</span>
            <span className="text-xs text-success-green font-mono font-bold">+5% wk</span>
          </div>
          <div className="w-full bg-borders h-1 rounded-full mt-3 overflow-hidden">
            <div className="bg-success-green h-full rounded-full" style={{ width: "83%" }} />
          </div>
        </div>

        <div className="glass-panel p-4 rounded-xl border border-borders flex flex-col justify-between">
          <span className="text-[10px] font-mono text-text-secondary uppercase tracking-wider">Sprint Velocity</span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-2xl font-bold text-white">12.4</span>
            <span className="text-xs text-success-green font-mono font-bold">Optimal</span>
          </div>
          <div className="w-full bg-borders h-1 rounded-full mt-3 overflow-hidden">
            <div className="bg-electric-blue h-full rounded-full" style={{ width: "75%" }} />
          </div>
        </div>

        <div className="glass-panel p-4 rounded-xl border border-borders flex flex-col justify-between">
          <span className="text-[10px] font-mono text-text-secondary uppercase tracking-wider">AI Runway</span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-2xl font-bold text-white">18 Mo</span>
            <span className="text-xs text-warning-orange font-mono font-bold">Burn: $12k</span>
          </div>
          <div className="w-full bg-borders h-1 rounded-full mt-3 overflow-hidden">
            <div className="bg-warning-orange h-full rounded-full" style={{ width: "60%" }} />
          </div>
        </div>

        <div className="glass-panel p-4 rounded-xl border border-borders flex flex-col justify-between">
          <span className="text-[10px] font-mono text-text-secondary uppercase tracking-wider">Market Demand</span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-2xl font-bold text-white">High</span>
            <span className="text-xs text-success-green font-mono font-bold">Score: 94</span>
          </div>
          <div className="w-full bg-borders h-1 rounded-full mt-3 overflow-hidden">
            <div className="bg-success-green h-full rounded-full" style={{ width: "94%" }} />
          </div>
        </div>
      </div>
    </div>
  );
}
