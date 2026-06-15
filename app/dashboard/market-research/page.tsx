"use client";

import React from "react";

export default function MarketResearchPage() {
  const trends = [
    { title: "Bilingual SaaS Systems", growth: "+42% YoY", status: "Critical Opportunity", desc: "India-focused startups are demanding localized Indian languages UI (Hindi + English)." },
    { title: "Dev-Tools Consolidation", growth: "+18% MoM", status: "Growing Trend", desc: "Teams prefer unified dashboards (like Linear + Vercel) over fragmented micro-apps." },
    { title: "AI Agent Orchestration", growth: "+110% YoY", status: "High Interest", desc: "No-code workflow orchestrators are capturing premium mid-market business budgets." },
  ];

  const competitors = [
    { name: "SaaS Alpha", price: "$29/mo", share: "24%", strengths: "Established brand, strong template library", weakness: "No Hindi copywriting support, slow dashboards" },
    { name: "Cockpit Beta", price: "$49/mo", share: "12%", strengths: "Advanced Gantt charts, great kanban", weakness: "High pricing, no automated validation systems" },
    { name: "Console Gamma", price: "Free", share: "5%", strengths: "Developer APIs, open source flexibility", weakness: "Steep learning curve, manual hosting required" },
  ];

  const opportunityQuadrant = [
    { title: "Leader Zone", desc: "High Feasibility, High Demand. Unified dashboards with multilingual UI support.", border: "border-electric-blue bg-electric-blue/[0.01]" },
    { title: "Niche Target", desc: "High Feasibility, Low Demand. Offline validation scripts for local developers.", border: "border-borders" },
    { title: "Future Bet", desc: "Low Feasibility, High Demand. Cross-platform mobile agent compiler apps.", border: "border-borders" },
    { title: "Avoid/Pivot", desc: "Low Feasibility, Low Demand. Traditional non-interactive planning tools.", border: "border-borders" },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center border-b border-borders/40 pb-4">
        <div>
          <span className="text-[10px] font-mono text-warning-orange uppercase tracking-widest block font-bold">MARKET INTELLIGENCE</span>
          <h1 className="text-xl font-bold tracking-tight text-white mt-1">{"\"Competition ko samjho, market ko jeeto.\""}</h1>
        </div>
        <span className="text-xs font-mono text-text-secondary">Scan: 48h Fresh</span>
      </div>

      {/* Market Trend Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {trends.map((t, idx) => (
          <div key={idx} className="glass-panel p-6 rounded-xl border border-borders flex flex-col justify-between group cursor-pointer hover:border-warning-orange/40 transition-all">
            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-[10px] font-mono text-warning-orange bg-warning-orange/5 border border-warning-orange/20 px-2 py-0.5 rounded">
                  {t.status}
                </span>
                <span className="text-xs font-bold text-success-green font-mono">{t.growth}</span>
              </div>
              <h3 className="text-sm font-bold text-white mb-2 group-hover:text-warning-orange transition-colors">
                {t.title}
              </h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                {t.desc}
              </p>
            </div>
            <div className="mt-6 text-[10px] font-mono text-text-secondary flex items-center gap-1 group-hover:text-white transition-colors">
              Analyze Demographics
              <span>→</span>
            </div>
          </div>
        ))}
      </div>

      {/* Competitor Grid */}
      <div className="glass-panel p-6 rounded-xl border border-borders">
        <span className="text-[10px] font-mono text-text-secondary uppercase tracking-wider block mb-4">Competitor Breakdown Grid</span>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-borders/80 text-text-secondary font-mono text-[9px]">
                <th className="pb-3">COMPETITOR</th>
                <th className="pb-3">PRICING</th>
                <th className="pb-3">MARKET SHARE</th>
                <th className="pb-3">PRIMARY STRENGTH</th>
                <th className="pb-3 text-right">SECONDARY WEAKNESS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-borders/50">
              {competitors.map((c, idx) => (
                <tr key={idx} className="hover:bg-white/[0.01]">
                  <td className="py-3.5 font-semibold text-white">{c.name}</td>
                  <td className="py-3.5 text-text-secondary font-mono">{c.price}</td>
                  <td className="py-3.5 text-text-secondary font-mono">{c.share}</td>
                  <td className="py-3.5 text-text-secondary">{c.strengths}</td>
                  <td className="py-3.5 text-right text-warning-orange">{c.weakness}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Opportunity Matrix board */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* SWOT Opportunity Quadrant Map */}
        <div className="lg:col-span-8 glass-panel p-6 rounded-xl border border-borders">
          <span className="text-[10px] font-mono text-text-secondary uppercase tracking-wider block mb-4">Market Quadrant Board</span>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {opportunityQuadrant.map((quad, idx) => (
              <div key={idx} className={`p-4 rounded-xl border flex flex-col justify-between ${quad.border}`}>
                <div>
                  <h4 className="text-xs font-bold text-white flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-warning-orange" />
                    {quad.title}
                  </h4>
                  <p className="text-xs text-text-secondary mt-2 leading-relaxed">
                    {quad.desc}
                  </p>
                </div>
                <div className="mt-4 text-[9px] font-mono text-text-secondary">
                  Actionable Level: High
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Research Insights Summary */}
        <div className="lg:col-span-4 glass-panel p-6 rounded-xl border border-borders flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-mono text-text-secondary uppercase tracking-wider block mb-4">Research Insights</span>
            
            <div className="space-y-4">
              <div className="flex gap-3 items-start">
                <div className="w-5 h-5 rounded-md bg-warning-orange/15 border border-warning-orange/30 flex items-center justify-center shrink-0 mt-0.5 text-warning-orange">
                  <span className="text-[10px]">★</span>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Niche Positioning</h4>
                  <p className="text-[11px] text-text-secondary mt-0.5 leading-relaxed">
                    Localize copywriting dashboards. Startups inside tier-2 Indian hubs value regional content translation templates.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <div className="w-5 h-5 rounded-md bg-warning-orange/15 border border-warning-orange/30 flex items-center justify-center shrink-0 mt-0.5 text-warning-orange">
                  <span className="text-[10px]">★</span>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Pricing Strategy</h4>
                  <p className="text-[11px] text-text-secondary mt-0.5 leading-relaxed">
                    Implement a modular sandbox tier. Allow founders to prototype 1 idea completely free, charging for roadmap exports.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-borders/60 text-[10px] font-mono text-text-secondary">
            <span>Primary Target: SaaS Builders</span>
          </div>
        </div>
      </div>
    </div>
  );
}
