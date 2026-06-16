"use client";

import React, { useState } from "react";
import { Icons } from "@/components/Icons";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [notifications, setNotifications] = useState({ email: true, slack: false, aiAlerts: true });
  const [accentColor, setAccentColor] = useState("blue");

  const [profile, setProfile] = useState({
    name: "Founder Persona",
    email: "founder@orbit-nodes.io",
    startup: "ORBIT SaaS",
    tagline: "Build. Launch. Scale.",
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Settings saved successfully! (Simulation)");
  };

  const tabs = [
    { id: "profile", label: "Profile & Workspace", icon: <Icons.Home size={14} /> },
    { id: "appearance", label: "Appearance Preferences", icon: <Icons.Sparkles size={14} /> },
    { id: "security", label: "API Credentials", icon: <Icons.Lock size={14} /> },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center border-b border-borders/40 pb-4">
        <div>
          <span className="text-[10px] font-mono text-electric-blue uppercase tracking-widest block font-bold">COCKPIT CONFIG</span>
          <h1 className="text-xl font-bold tracking-tight text-white mt-1">Platform Settings</h1>
        </div>
        <span className="text-xs font-mono text-text-secondary">Version 1.0.0</span>
      </div>

      {/* Tabs list */}
      <div className="flex border-b border-borders/60 gap-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 pb-3 text-xs font-medium border-b-2 transition-all ${
              activeTab === tab.id
                ? "border-electric-blue text-white"
                : "border-transparent text-text-secondary hover:text-white"
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB CONTENT: PROFILE & WORKSPACE */}
      {activeTab === "profile" && (
        <div className="glass-panel p-6 rounded-xl border border-borders animate-float">
          <span className="text-[10px] font-mono text-text-secondary uppercase tracking-wider block mb-6">Workspace Setup</span>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-mono text-text-secondary uppercase mb-1.5">Founder Name</label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="w-full bg-zinc-900 border border-borders focus:border-electric-blue rounded-lg p-2.5 text-xs text-white focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[10px] font-mono text-text-secondary uppercase mb-1.5">Email Address</label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className="w-full bg-zinc-900 border border-borders focus:border-electric-blue rounded-lg p-2.5 text-xs text-white focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[10px] font-mono text-text-secondary uppercase mb-1.5">Startup Name</label>
                <input
                  type="text"
                  value={profile.startup}
                  onChange={(e) => setProfile({ ...profile, startup: e.target.value })}
                  className="w-full bg-zinc-900 border border-borders focus:border-electric-blue rounded-lg p-2.5 text-xs text-white focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[10px] font-mono text-text-secondary uppercase mb-1.5">Primary Tagline</label>
                <input
                  type="text"
                  value={profile.tagline}
                  onChange={(e) => setProfile({ ...profile, tagline: e.target.value })}
                  className="w-full bg-zinc-900 border border-borders focus:border-electric-blue rounded-lg p-2.5 text-xs text-white focus:outline-none"
                />
              </div>
            </div>

            {/* Notification checkboxes */}
            <div className="pt-4 border-t border-borders/50 mt-6">
              <span className="text-[10px] font-mono text-text-secondary uppercase tracking-wider block mb-4">Communications</span>
              <div className="space-y-3">
                <label className="flex items-center gap-3 text-xs text-text-secondary cursor-pointer hover:text-white transition-colors">
                  <input
                    type="checkbox"
                    checked={notifications.email}
                    onChange={(e) => setNotifications({ ...notifications, email: e.target.checked })}
                    className="rounded border-borders bg-zinc-900 text-electric-blue focus:ring-0 w-4 h-4 cursor-pointer"
                  />
                  <span>Send daily validation updates and metric summaries via Email</span>
                </label>

                <label className="flex items-center gap-3 text-xs text-text-secondary cursor-pointer hover:text-white transition-colors">
                  <input
                    type="checkbox"
                    checked={notifications.slack}
                    onChange={(e) => setNotifications({ ...notifications, slack: e.target.checked })}
                    className="rounded border-borders bg-zinc-900 text-electric-blue focus:ring-0 w-4 h-4 cursor-pointer"
                  />
                  <span>Push critical execution delays and sprint reports to Slack</span>
                </label>

                <label className="flex items-center gap-3 text-xs text-text-secondary cursor-pointer hover:text-white transition-colors">
                  <input
                    type="checkbox"
                    checked={notifications.aiAlerts}
                    onChange={(e) => setNotifications({ ...notifications, aiAlerts: e.target.checked })}
                    className="rounded border-borders bg-zinc-900 text-electric-blue focus:ring-0 w-4 h-4 cursor-pointer"
                  />
                  <span>Enable live AI suggestions in the right dashboard panels</span>
                </label>
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-borders/50 mt-6">
              <button
                type="submit"
                className="px-5 py-2.5 bg-electric-blue hover:bg-blue-600 text-xs font-semibold rounded-lg text-white shadow-lg transition-all"
              >
                Save Settings
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TAB CONTENT: APPEARANCE PREFERENCES */}
      {activeTab === "appearance" && (
        <div className="glass-panel p-6 rounded-xl border border-borders animate-float space-y-6">
          <div>
            <span className="text-[10px] font-mono text-text-secondary uppercase tracking-wider block mb-4">Cockpit Accent Highlight</span>
            <div className="flex gap-4">
              <button
                onClick={() => setAccentColor("blue")}
                className={`px-4 py-2.5 rounded-lg border text-xs font-mono transition-all ${
                  accentColor === "blue"
                    ? "bg-electric-blue/10 border-electric-blue text-electric-blue font-bold"
                    : "border-borders text-text-secondary hover:text-white"
                }`}
              >
                Electric Blue (#3B82F6)
              </button>
              <button
                onClick={() => setAccentColor("purple")}
                className={`px-4 py-2.5 rounded-lg border text-xs font-mono transition-all ${
                  accentColor === "purple"
                    ? "bg-orbit-purple/10 border-orbit-purple text-orbit-purple font-bold"
                    : "border-borders text-text-secondary hover:text-white"
                }`}
              >
                Orbit Purple (#8B5CF6)
              </button>
            </div>
          </div>

          <div className="pt-4 border-t border-borders/50">
            <span className="text-[10px] font-mono text-text-secondary uppercase tracking-wider block mb-2">Interface Scaling</span>
            <div className="text-xs text-text-secondary">
              Theme locked to <span className="text-white font-semibold font-mono">Dark Mode First</span> for technical alignment.
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: API CREDENTIALS */}
      {activeTab === "security" && (
        <div className="glass-panel p-6 rounded-xl border border-borders animate-float space-y-6">
          <div>
            <span className="text-[10px] font-mono text-text-secondary uppercase tracking-wider block mb-2">Access Credentials</span>
            <p className="text-xs text-text-secondary mb-4">
              Use these tokens to query metric endpoints or validate tasks from external CI/CD pipelines.
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-mono text-text-secondary uppercase mb-1.5">ORBIT API Token</label>
                <div className="flex gap-2">
                  <input
                    type="password"
                    value="orb_live_7c8d9a0f12b3e4f5a6b7c8d9e0f"
                    readOnly
                    className="flex-1 bg-zinc-900 border border-borders rounded-lg p-2.5 text-xs text-text-secondary font-mono focus:outline-none"
                  />
                  <button
                    onClick={() => alert("Token copied! (Simulation)")}
                    className="px-4 py-2 bg-white/5 border border-borders hover:bg-white/10 rounded-lg text-xs font-mono text-white transition-all"
                  >
                    Copy Token
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono text-text-secondary uppercase mb-1.5">AI Engine Token</label>
                <div className="flex gap-2">
                  <input
                    type="password"
                    value="ai_node_9a0b1c2d3e4f5a6b7c8d9e0"
                    readOnly
                    className="flex-1 bg-zinc-900 border border-borders rounded-lg p-2.5 text-xs text-text-secondary font-mono focus:outline-none"
                  />
                  <button
                    onClick={() => alert("Token copied! (Simulation)")}
                    className="px-4 py-2 bg-white/5 border border-borders hover:bg-white/10 rounded-lg text-xs font-mono text-white transition-all"
                  >
                    Copy Token
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
