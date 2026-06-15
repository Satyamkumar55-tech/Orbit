"use client";

import React, { useState } from "react";

export default function ProductPlanningPage() {
  const [filter, setFilter] = useState("all");

  const timelineItems = [
    { id: 1, name: "Design System Tokens", phase: "Milestone 1", progress: 100, status: "completed", duration: "W1 - W2", color: "bg-success-green" },
    { id: 2, name: "Core Landing Page UX", phase: "Milestone 1", progress: 100, status: "completed", duration: "W2 - W3", color: "bg-success-green" },
    { id: 3, name: "Dashboard Shell Integration", phase: "Milestone 2", progress: 85, status: "active", duration: "W3 - W5", color: "bg-electric-blue" },
    { id: 4, name: "Interactive Kanban Board", phase: "Milestone 2", progress: 40, status: "active", duration: "W4 - W6", color: "bg-electric-blue" },
    { id: 5, name: "AI Feedback Agent Integration", phase: "Milestone 3", progress: 0, status: "pending", duration: "W6 - W8", color: "bg-borders" },
    { id: 6, name: "Beta Release Rollout", phase: "Milestone 4", progress: 0, status: "pending", duration: "W8 - W10", color: "bg-borders" },
  ];

  const featureMatrix = [
    { name: "Command search modal", impact: "High", effort: "Low", priority: "P1" },
    { name: "Canvas orbit particle view", impact: "High", effort: "Medium", priority: "P1" },
    { name: "Live Gantt chart edit", impact: "Medium", effort: "High", priority: "P2" },
    { name: "Settings appearance customizer", impact: "Low", effort: "Low", priority: "P3" },
    { name: "AI campaign generator", impact: "High", effort: "High", priority: "P2" },
  ];

  const filteredTimeline = timelineItems.filter((item) => {
    if (filter === "all") return true;
    return item.status === filter;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center border-b border-borders/40 pb-4">
        <div>
          <span className="text-[10px] font-mono text-orbit-purple uppercase tracking-widest block font-bold">PLANNING SUITE</span>
          <h1 className="text-xl font-bold tracking-tight text-white mt-1">{"\"Vision ko roadmap mein badlo.\""}</h1>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1.5 rounded-lg text-[10px] font-mono border transition-all ${
              filter === "all" ? "bg-white/10 border-white/20 text-white" : "border-borders text-text-secondary hover:text-white"
            }`}
          >
            All Phase
          </button>
          <button
            onClick={() => setFilter("active")}
            className={`px-3 py-1.5 rounded-lg text-[10px] font-mono border transition-all ${
              filter === "active" ? "bg-electric-blue/15 border-electric-blue/30 text-electric-blue" : "border-borders text-text-secondary hover:text-white"
            }`}
          >
            Active
          </button>
          <button
            onClick={() => setFilter("completed")}
            className={`px-3 py-1.5 rounded-lg text-[10px] font-mono border transition-all ${
              filter === "completed" ? "bg-success-green/15 border-success-green/30 text-success-green" : "border-borders text-text-secondary hover:text-white"
            }`}
          >
            Completed
          </button>
        </div>
      </div>

      {/* Timeline Gantt Chart View */}
      <div className="glass-panel p-6 rounded-xl border border-borders relative">
        <div className="flex justify-between items-center mb-6">
          <div>
            <span className="text-[10px] font-mono text-text-secondary uppercase tracking-wider block">Gantt Chart View</span>
            <h3 className="text-sm font-bold text-white mt-0.5">Development Phases</h3>
          </div>
          <span className="text-xs font-mono text-text-secondary">Schedule: June - August</span>
        </div>

        {/* Timeline Table Grid */}
        <div className="space-y-4">
          {filteredTimeline.map((item) => (
            <div key={item.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-3 rounded-lg border border-borders bg-zinc-900/20 hover:border-white/10 transition-all">
              <div className="flex items-center gap-3">
                <div className={`w-2 h-10 rounded ${item.color}`} />
                <div>
                  <h4 className="text-xs font-bold text-white leading-none">{item.name}</h4>
                  <span className="text-[10px] font-mono text-text-secondary inline-block mt-1">{item.phase}</span>
                </div>
              </div>

              {/* Progress and Timeline Visualization */}
              <div className="flex items-center gap-6 flex-1 sm:justify-end">
                <div className="w-full sm:max-w-[150px]">
                  <div className="flex justify-between text-[9px] font-mono text-text-secondary mb-1">
                    <span>Progress</span>
                    <span>{item.progress}%</span>
                  </div>
                  <div className="bg-borders h-1 rounded-full overflow-hidden">
                    <div className={`h-full ${item.status === "completed" ? "bg-success-green" : "bg-electric-blue"}`} style={{ width: `${item.progress}%` }} />
                  </div>
                </div>

                <div className="w-16 font-mono text-[10px] text-text-secondary text-right shrink-0">
                  {item.duration}
                </div>

                <div className="w-20 text-right shrink-0">
                  <span
                    className={`text-[9px] font-mono px-2 py-0.5 rounded border ${
                      item.status === "completed"
                        ? "text-success-green bg-success-green/5 border-success-green/20"
                        : item.status === "active"
                        ? "text-electric-blue bg-electric-blue/5 border-electric-blue/20"
                        : "text-text-secondary bg-white/5 border-borders"
                    }`}
                  >
                    {item.status.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Feature Priority Matrix and Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Feature Matrix Grid Table */}
        <div className="lg:col-span-8 glass-panel p-6 rounded-xl border border-borders flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-mono text-text-secondary uppercase tracking-wider block mb-4">Prioritization Matrix</span>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-borders/80 text-text-secondary font-mono text-[9px]">
                    <th className="pb-3">FEATURE NAME</th>
                    <th className="pb-3">IMPACT</th>
                    <th className="pb-3">EFFORT</th>
                    <th className="pb-3 text-right">PRIORITY</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-borders/50">
                  {featureMatrix.map((feat, idx) => (
                    <tr key={idx} className="hover:bg-white/[0.01]">
                      <td className="py-3 font-semibold text-white">{feat.name}</td>
                      <td className="py-3 text-text-secondary">
                        <span className="text-success-green">{feat.impact}</span>
                      </td>
                      <td className="py-3 text-text-secondary">{feat.effort}</td>
                      <td className="py-3 text-right font-mono font-bold text-electric-blue">{feat.priority}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-borders/60 flex items-center justify-between text-[10px] font-mono text-text-secondary">
            <span>Matrix Algorithm: Effort-Impact Index</span>
            <span className="text-electric-blue">Updated automatically</span>
          </div>
        </div>

        {/* Milestone Tracker & Planning Workspace */}
        <div className="lg:col-span-4 glass-panel p-6 rounded-xl border border-borders flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-mono text-text-secondary uppercase tracking-wider block mb-4">Milestone Tracker</span>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full border border-success-green flex items-center justify-center shrink-0 text-success-green bg-success-green/5 mt-0.5">
                  <span className="text-[10px]">✓</span>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Milestone 1: Prototype V1</h4>
                  <p className="text-[11px] text-text-secondary mt-0.5 leading-relaxed">
                    UX schemas, system variables, global landing page layouts verified.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full border border-electric-blue flex items-center justify-center shrink-0 text-electric-blue bg-electric-blue/5 mt-0.5">
                  <span className="text-[10px]">2</span>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Milestone 2: Execution Cockpit</h4>
                  <p className="text-[11px] text-text-secondary mt-0.5 leading-relaxed">
                    Build kanban state integrations, SVGs dashboards and editors.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full border border-borders flex items-center justify-center shrink-0 text-text-secondary bg-white/5 mt-0.5">
                  <span className="text-[10px]">3</span>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Milestone 3: Beta Scale</h4>
                  <p className="text-[11px] text-text-secondary mt-0.5 leading-relaxed">
                    Deploy AI feedback pipelines and funnel optimization engines.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-borders/60 flex items-center justify-between text-[10px] font-mono text-text-secondary">
            <span>Critical Path: 45 Days</span>
          </div>
        </div>
      </div>
    </div>
  );
}
