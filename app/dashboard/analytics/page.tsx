"use client";

import React, { useState } from "react";
import { Icons } from "@/components/Icons";

export default function AnalyticsPage() {
  const [hasData, setHasData] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleImport = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setHasData(true);
    }, 1500);
  };

  const kpis = [
    { title: "Monthly Recurring Revenue", value: "$12,480", change: "+14.8% MoM", color: "text-electric-blue" },
    { title: "Customer Acquisition Cost", value: "$142", change: "-8.2% MoM", color: "text-success-green" },
    { title: "Customer Lifetime Value", value: "$1,240", change: "+5.1% MoM", color: "text-orbit-purple" },
    { title: "Net Burn Rate", value: "$4,800/mo", change: "Stable", color: "text-warning-orange" },
  ];

  const funnelItems = [
    { stage: "Landing Visitors", count: "120,400", percent: 100, color: "bg-electric-blue" },
    { stage: "App Signups", count: "14,800", percent: 12.2, color: "bg-orbit-purple" },
    { stage: "Active Founders", count: "4,200", percent: 3.4, color: "bg-warning-orange" },
    { stage: "Paying Subscribers", count: "890", percent: 0.7, color: "bg-success-green" },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center border-b border-borders/40 pb-4">
        <div>
          <span className="text-[10px] font-mono text-electric-blue uppercase tracking-widest block font-bold">ANALYTICS ENGINE</span>
          <h1 className="text-xl font-bold tracking-tight text-white mt-1">Growth & Revenue Radar</h1>
        </div>
        {hasData && (
          <button
            onClick={() => setHasData(false)}
            className="px-3 py-1.5 border border-borders hover:bg-white/5 rounded-lg text-xs font-mono text-text-secondary hover:text-white transition-all"
          >
            Reset Data Node
          </button>
        )}
      </div>

      {/* EMPTY STATE */}
      {!hasData && !isLoading && (
        <div className="glass-panel py-20 px-6 rounded-xl border border-borders flex flex-col items-center justify-center text-center">
          <div className="w-12 h-12 rounded-full bg-white/5 border border-borders flex items-center justify-center text-electric-blue mb-4 animate-float">
            <Icons.Analytics size={24} />
          </div>
          <h3 className="text-sm font-bold text-white mb-1">
            {"\"Data aayega, growth dikhegi.\""}
          </h3>
          <p className="text-xs text-text-secondary max-w-sm mt-1 leading-relaxed">
            Configure system parameters or click below to simulate production metrics logs from your active ORBIT nodes.
          </p>
          <button
            onClick={handleImport}
            className="mt-6 px-5 py-2.5 bg-electric-blue hover:bg-blue-600 text-xs font-semibold rounded-lg text-white shadow-lg transition-all flex items-center gap-1.5"
          >
            <Icons.Sparkles size={14} />
            Import Metric Data
          </button>
        </div>
      )}

      {/* LOADER */}
      {isLoading && (
        <div className="glass-panel py-20 px-6 rounded-xl border border-borders flex flex-col items-center justify-center text-center space-y-4">
          <div className="w-10 h-10 border-4 border-electric-blue/20 border-t-electric-blue rounded-full animate-spin" />
          <p className="text-xs text-text-secondary font-mono">Syncing metrics data logs from orbit-nodes...</p>
        </div>
      )}

      {/* ANALYTICS REPORT */}
      {hasData && !isLoading && (
        <div className="space-y-6 animate-float">
          
          {/* KPI Dashboard Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {kpis.map((kpi, idx) => (
              <div key={idx} className="glass-panel p-4 rounded-xl border border-borders flex flex-col justify-between">
                <div>
                  <span className="text-[9px] font-mono text-text-secondary uppercase tracking-wider block">
                    {kpi.title}
                  </span>
                  <span className="text-xl font-bold text-white mt-1 block tracking-tight">
                    {kpi.value}
                  </span>
                </div>
                <span className={`text-[10px] font-mono mt-3 inline-block font-semibold ${kpi.color}`}>
                  {kpi.change}
                </span>
              </div>
            ))}
          </div>

          {/* Revenue Chart and Funnel grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Custom SVG Line Chart */}
            <div className="lg:col-span-8 glass-panel p-6 rounded-xl border border-borders flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono text-text-secondary uppercase tracking-wider block">Revenue Growth</span>
                <h3 className="text-sm font-bold text-white mt-1">MRR Progression (Last 6 Months)</h3>
              </div>

              {/* SVG Line Graph */}
              <div className="w-full h-52 my-6 relative flex items-end">
                <svg className="w-full h-full" viewBox="0 0 500 200" preserveAspectRatio="none">
                  {/* Grid background lines */}
                  <line x1="0" y1="50" x2="500" y2="50" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                  <line x1="0" y1="100" x2="500" y2="100" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                  <line x1="0" y1="150" x2="500" y2="150" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />

                  {/* Gradient Area under line */}
                  <defs>
                    <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 0 170 Q 100 150 200 110 T 400 60 L 500 30 L 500 200 L 0 200 Z"
                    fill="url(#chartGlow)"
                  />

                  {/* SVG Line path */}
                  <path
                    d="M 0 170 Q 100 150 200 110 T 400 60 L 500 30"
                    fill="none"
                    stroke="#3B82F6"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />

                  {/* Highlight dots */}
                  <circle cx="200" cy="110" r="4.5" fill="#3B82F6" className="glow-dot-blue" />
                  <circle cx="500" cy="30" r="4.5" fill="#10B981" className="glow-dot-green" />
                </svg>

                {/* X Axis labels */}
                <div className="absolute bottom-0 left-0 right-0 flex justify-between font-mono text-[9px] text-text-secondary px-2">
                  <span>Jan</span>
                  <span>Feb</span>
                  <span>Mar</span>
                  <span>Apr</span>
                  <span>May</span>
                  <span>Jun</span>
                </div>
              </div>

              <div className="flex justify-between items-center text-[10px] font-mono text-text-secondary pt-4 border-t border-borders/60">
                <span>Peak: $12.4K</span>
                <span>Active Core Nodes: 3</span>
              </div>
            </div>

            {/* Funnel conversion graph */}
            <div className="lg:col-span-4 glass-panel p-6 rounded-xl border border-borders flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono text-text-secondary uppercase tracking-wider block mb-4">Acquisition Funnel</span>
                
                <div className="space-y-4">
                  {funnelItems.map((f, idx) => (
                    <div key={idx} className="space-y-1.5">
                      <div className="flex justify-between text-[10px] font-mono text-text-secondary">
                        <span className="text-white font-semibold">{f.stage}</span>
                        <span>{f.count} ({f.percent}%)</span>
                      </div>
                      <div className="bg-borders h-2.5 rounded overflow-hidden">
                        <div className={`h-full ${f.color}`} style={{ width: `${f.percent}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-borders/60 text-[10px] font-mono text-text-secondary">
                <span>Overall: 0.7% CTR</span>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
