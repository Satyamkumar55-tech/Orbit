"use client";

import React, { useState } from "react";
import { Icons } from "@/components/Icons";

export default function ContentStudioPage() {
  const [editorText, setEditorText] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTemplate, setActiveTemplate] = useState("newsletter");

  const templates = [
    { id: "newsletter", title: "Launch Newsletter", desc: "A compelling newsletter targeting initial subscribers.", icon: "✉️" },
    { id: "twitter", title: "Twitter Hook Thread", desc: "10-tweet thread outlining startup story and metrics.", icon: "🐦" },
    { id: "ph", title: "Product Hunt Pitch", desc: "Clear, benefit-oriented text for Hunter and Maker comments.", icon: "😸" },
  ];

  const generatedContent = {
    newsletter: `Subject: Introducing ORBIT — Startup ka Mission Control 🚀

Hey Founder,

Every great startup starts as a simple dream. But turning that dream into a venture requires flawless execution. 

That's why we built ORBIT — the AI Founder Orchestration System. It's your startup's mission control, helping you:
1. Validate market feasibility instantly.
2. Translate vision statements into milestone timelines.
3. Automate content studio workflows and track kanban tasks.

Ready to start your orbit?
Join the alpha waitlist today!

Best,
The ORBIT Team`,
    twitter: `1/ Turn your startup dreams into a command cockpit. 🚀

Today, we're introducing ORBIT — AI Founder Orchestration System. "Idea se Impact Tak."

Here's why we built it: (A short thread...) 👇

2/ Fragmented tools kill founder speed. Switching between Notion roadmaps, Linear task boards, and ChatGPT marketing drafts drains momentum. 

ORBIT unifies the zero-to-one loop in a single, technical command cockpit.  cockpit...`,
    ph: `Hello Hunters & Makers! 😸

We're super thrilled to launch ORBIT today! 

"Sapno ko startup mein badalne ka command center."

As founders, we found ourselves wasting hours configuring micro-services and syncing sheets. We built ORBIT to automate market feasibility scanners, roadmap builders, and content studio templates in one beautiful technical interface.

We'd love to hear your feedback below!`,
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setEditorText(generatedContent[activeTemplate as keyof typeof generatedContent]);
    }, 1500);
  };

  const publishingQueue = [
    { title: "Weekly Launch Newsletter", status: "Ready", date: "June 18, 10:00 AM", channel: "Email" },
    { title: "Twitter Launch Day Thread", status: "Drafting", date: "June 20, 02:00 PM", channel: "Twitter" },
    { title: "Product Hunt Maker Pitch", status: "Scheduled", date: "June 20, 12:01 AM", channel: "Product Hunt" },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center border-b border-borders/40 pb-4">
        <div>
          <span className="text-[10px] font-mono text-electric-blue uppercase tracking-widest block font-bold">CONTENT STUDIO</span>
          <h1 className="text-xl font-bold tracking-tight text-white mt-1">{"\"Brand ki awaaz duniya tak pahunchao.\""}</h1>
        </div>
        <span className="text-xs font-mono text-text-secondary">AI Credits: 4,800 remaining</span>
      </div>

      {/* Primary Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Templates Selection & Editor */}
        <div className="lg:col-span-8 space-y-6">
          {/* Template Selector Library */}
          <div className="glass-panel p-6 rounded-xl border border-borders">
            <span className="text-[10px] font-mono text-text-secondary uppercase tracking-wider block mb-4">Template Library</span>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {templates.map((tpl) => (
                <button
                  key={tpl.id}
                  onClick={() => {
                    setActiveTemplate(tpl.id);
                    setEditorText("");
                  }}
                  className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between group ${
                    activeTemplate === tpl.id
                      ? "bg-electric-blue/5 border-electric-blue/40"
                      : "border-borders bg-zinc-900/20 hover:border-white/20"
                  }`}
                >
                  <div className="text-xl mb-3">{tpl.icon}</div>
                  <div>
                    <h4 className="text-xs font-bold text-white group-hover:text-electric-blue transition-colors">
                      {tpl.title}
                    </h4>
                    <p className="text-[10px] text-text-secondary mt-1 leading-relaxed">
                      {tpl.desc}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Content Editor Workspace */}
          <div className="glass-panel p-6 rounded-xl border border-borders flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <span className="text-[10px] font-mono text-text-secondary uppercase tracking-wider">Editor Workspace</span>
              <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="px-4 py-2 bg-gradient-to-r from-electric-blue to-orbit-purple hover:brightness-110 disabled:bg-borders text-xs font-semibold rounded-lg text-white shadow-lg transition-all flex items-center gap-1.5"
              >
                {isGenerating ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    Generating copy...
                  </>
                ) : (
                  <>
                    <Icons.Sparkles size={14} />
                    Generate with AI
                  </>
                )}
              </button>
            </div>

            <div className="relative">
              <textarea
                value={editorText}
                onChange={(e) => setEditorText(e.target.value)}
                placeholder="Click 'Generate with AI' to compose matching templates, or type your drafts here..."
                className="w-full h-80 bg-zinc-900 border border-borders focus:border-electric-blue focus:ring-1 focus:ring-electric-blue rounded-xl p-4 text-xs text-white placeholder:text-text-secondary/50 focus:outline-none resize-none font-mono leading-relaxed"
              />
              {editorText && (
                <button
                  onClick={() => setEditorText("")}
                  className="absolute bottom-4 right-4 p-1.5 rounded-md border border-borders bg-zinc-900 hover:bg-white/5 text-text-secondary hover:text-white transition-all"
                  title="Clear Editor"
                >
                  <Icons.Trash size={14} />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Calendar and Publishing Queue */}
        <div className="lg:col-span-4 space-y-6">
          {/* Publishing Queue */}
          <div className="glass-panel p-6 rounded-xl border border-borders flex flex-col justify-between h-full">
            <div>
              <span className="text-[10px] font-mono text-text-secondary uppercase tracking-wider block mb-4">Publishing Queue</span>
              
              <div className="space-y-4">
                {publishingQueue.map((item, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl border border-borders bg-zinc-900/10 flex items-center justify-between gap-3">
                    <div className="overflow-hidden">
                      <span className="text-xs font-semibold text-white block truncate">{item.title}</span>
                      <span className="text-[10px] text-text-secondary font-mono block mt-1">
                        Channel: {item.channel}
                      </span>
                      <span className="text-[10px] text-text-secondary font-mono block mt-0.5">
                        Date: {item.date}
                      </span>
                    </div>

                    <span
                      className={`text-[9px] font-mono px-2 py-0.5 rounded border shrink-0 ${
                        item.status === "Ready"
                          ? "text-success-green bg-success-green/5 border-success-green/20"
                          : item.status === "Scheduled"
                          ? "text-electric-blue bg-electric-blue/5 border-electric-blue/20"
                          : "text-warning-orange bg-warning-orange/5 border-warning-orange/20"
                      }`}
                    >
                      {item.status.toUpperCase()}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-borders/60 flex items-center justify-between text-[10px] font-mono text-text-secondary">
              <span>Next Launch: 2 Days</span>
              <span className="text-electric-blue font-bold">Auto Sync On</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
