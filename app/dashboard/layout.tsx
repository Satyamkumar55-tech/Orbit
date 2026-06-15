"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Icons } from "@/components/Icons";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isInsightsOpen, setIsInsightsOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const menuItems = [
    { label: "Dashboard", href: "/dashboard", icon: <Icons.Home size={20} /> },
    { label: "Idea Validation", href: "/dashboard/idea-validation", icon: <Icons.Idea size={20} /> },
    { label: "Product Planning", href: "/dashboard/product-planning", icon: <Icons.Planning size={20} /> },
    { label: "Market Research", href: "/dashboard/market-research", icon: <Icons.Research size={20} /> },
    { label: "Content Studio", href: "/dashboard/content-studio", icon: <Icons.Content size={20} /> },
    { label: "Task Center", href: "/dashboard/task-center", icon: <Icons.Task size={20} /> },
    { label: "Analytics", href: "/dashboard/analytics", icon: <Icons.Analytics size={20} /> },
    { label: "Settings", href: "/dashboard/settings", icon: <Icons.Settings size={20} /> },
  ];

  const searchCommands = [
    { label: "Go to Dashboard", category: "Navigation", shortcut: "G D", action: () => router.push("/dashboard") },
    { label: "Validate New Idea", category: "Workflow", shortcut: "V I", action: () => router.push("/dashboard/idea-validation") },
    { label: "View Roadmap Sprints", category: "Planning", shortcut: "V R", action: () => router.push("/dashboard/product-planning") },
    { label: "Analyze Competitor Gap", category: "Market", shortcut: "A C", action: () => router.push("/dashboard/market-research") },
    { label: "Draft Product Update", category: "Content", shortcut: "D P", action: () => router.push("/dashboard/content-studio") },
    { label: "Create Sprint Task", category: "Task", shortcut: "C T", action: () => router.push("/dashboard/task-center") },
    { label: "Show Growth Charts", category: "Analytics", shortcut: "S G", action: () => router.push("/dashboard/analytics") },
    { label: "Manage Workspace Details", category: "Settings", shortcut: "M W", action: () => router.push("/dashboard/settings") },
  ];

  // Shortcut listener (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const filteredCommands = searchCommands.filter((cmd) =>
    cmd.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-primary-bg overflow-hidden text-text-primary">
      {/* Search Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-black/60 backdrop-blur-sm transition-all">
          <div className="w-full max-w-xl glass-panel rounded-xl shadow-2xl border border-borders bg-zinc-950 overflow-hidden flex flex-col">
            <div className="flex items-center gap-3 px-4 border-b border-borders/60 h-14">
              <Icons.Search className="text-text-secondary" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Type a command or search page..."
                className="flex-1 bg-transparent text-sm text-text-primary placeholder:text-text-secondary/70 focus:outline-none"
                autoFocus
              />
              <span className="text-[10px] font-mono text-text-secondary bg-white/5 border border-borders px-1.5 py-0.5 rounded">
                ESC
              </span>
            </div>

            <div className="max-h-[300px] overflow-y-auto p-2 flex flex-col gap-1">
              {filteredCommands.length > 0 ? (
                filteredCommands.map((cmd, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      cmd.action();
                      setIsSearchOpen(false);
                      setSearchQuery("");
                    }}
                    className="flex items-center justify-between px-3 py-2.5 rounded-lg text-left text-xs text-text-secondary hover:text-white hover:bg-white/5 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <Icons.Sparkles className="text-electric-blue/70 group-hover:text-electric-blue" size={14} />
                      <span>{cmd.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-text-secondary/60 bg-white/[0.02] px-1.5 py-0.5 rounded border border-borders/20">
                        {cmd.category}
                      </span>
                      <kbd className="text-[9px] font-mono text-text-secondary bg-white/10 px-1.5 py-0.5 rounded">
                        {cmd.shortcut}
                      </kbd>
                    </div>
                  </button>
                ))
              ) : (
                <div className="p-8 text-center text-xs text-text-secondary font-mono">
                  No matching commands found.
                </div>
              )}
            </div>

            <div className="border-t border-borders/60 p-3 bg-white/[0.02] flex justify-between items-center text-[10px] font-mono text-text-secondary">
              <div>Use arrow keys to navigate. Enter to select.</div>
              <div>ORBIT System Cockpit v1.0</div>
            </div>
          </div>
        </div>
      )}

      {/* LEFT SIDEBAR */}
      <aside
        className={`glass-panel border-r border-borders flex flex-col justify-between transition-all duration-300 relative z-40 bg-zinc-950/40 backdrop-blur-md ${
          isSidebarCollapsed ? "w-16" : "w-64"
        }`}
      >
        <div className="flex flex-col">
          {/* Logo Header */}
          <div className={`flex items-center border-b border-borders/80 h-16 px-4 gap-3 justify-between`}>
            {!isSidebarCollapsed ? (
              <Link href="/" className="flex items-center gap-2.5 group">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-electric-blue to-orbit-purple flex items-center justify-center font-bold text-xs text-white">
                  O
                </div>
                <div>
                  <span className="font-bold text-sm tracking-wider block">ORBIT</span>
                  <span className="text-[9px] text-text-secondary/80 font-mono tracking-widest block uppercase -mt-0.5">Mission Control</span>
                </div>
              </Link>
            ) : (
              <Link href="/" className="w-8 h-8 rounded-lg bg-gradient-to-tr from-electric-blue to-orbit-purple flex items-center justify-center font-bold text-sm text-white mx-auto">
                O
              </Link>
            )}

            {!isSidebarCollapsed && (
              <button
                onClick={() => setIsSidebarCollapsed(true)}
                className="p-1 rounded-md border border-borders hover:bg-white/5 text-text-secondary hover:text-white transition-all"
              >
                <Icons.ChevronLeft size={16} />
              </button>
            )}
          </div>

          {/* Collapsed Toggle Button */}
          {isSidebarCollapsed && (
            <div className="py-4 border-b border-borders/40 flex justify-center">
              <button
                onClick={() => setIsSidebarCollapsed(false)}
                className="p-1 rounded-md border border-borders hover:bg-white/5 text-text-secondary hover:text-white transition-all"
              >
                <Icons.ChevronRight size={16} />
              </button>
            </div>
          )}

          {/* Menu Items */}
          <nav className="p-3 flex flex-col gap-1">
            {menuItems.map((item, idx) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={idx}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all group relative ${
                    isActive
                      ? "bg-gradient-to-r from-electric-blue/10 to-orbit-purple/10 border border-electric-blue/20 text-white font-semibold"
                      : "text-text-secondary hover:text-white hover:bg-white/5 border border-transparent"
                  }`}
                >
                  <div className={`transition-transform duration-200 group-hover:scale-110 ${isActive ? "text-electric-blue" : "text-text-secondary group-hover:text-white"}`}>
                    {item.icon}
                  </div>
                  {!isSidebarCollapsed && <span className="truncate">{item.label}</span>}
                  
                  {/* Glowing Indicator dot */}
                  {isActive && (
                    <div className="absolute right-3 w-1.5 h-1.5 rounded-full bg-electric-blue glow-dot-blue" />
                  )}

                  {/* Tooltip for collapsed mode */}
                  {isSidebarCollapsed && (
                    <div className="absolute left-20 ml-2 px-2 py-1 bg-zinc-900 border border-borders text-[10px] rounded text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 font-mono shadow-xl">
                      {item.label}
                    </div>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User profile bottom item */}
        <div className="p-3 border-t border-borders/80 bg-white/[0.01]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-electric-blue/20 to-orbit-purple/20 border border-borders flex items-center justify-center font-bold text-xs text-white shrink-0">
              FD
            </div>
            {!isSidebarCollapsed && (
              <div className="flex-1 overflow-hidden">
                <span className="block text-xs font-bold text-white leading-none truncate">Founder Cockpit</span>
                <span className="text-[10px] text-success-green font-mono flex items-center gap-1 mt-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-success-green glow-dot-green animate-pulse" />
                  Online: Orbit-01
                </span>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* CORE WORKSPACE SECTION */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* TOP COMMAND BAR */}
        <header className="h-16 border-b border-borders flex items-center justify-between px-6 bg-zinc-950/20 backdrop-blur-md relative z-30 shrink-0">
          <div className="flex items-center gap-4 flex-1 max-w-md">
            {/* Command shortcut button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex-1 flex items-center justify-between px-3 py-1.5 rounded-lg border border-borders bg-zinc-900/40 text-xs text-text-secondary hover:text-white hover:border-borders/80 transition-all font-mono"
            >
              <div className="flex items-center gap-2">
                <Icons.Search size={14} />
                <span>Search dashboard...</span>
              </div>
              <div className="flex items-center gap-1 text-[10px]">
                <kbd className="bg-white/5 border border-borders/60 px-1 py-0.5 rounded">Ctrl</kbd>
                <span>+</span>
                <kbd className="bg-white/5 border border-borders/60 px-1.5 py-0.5 rounded">K</kbd>
              </div>
            </button>
          </div>

          <div className="flex items-center gap-4">
            {/* Insights panel Toggle */}
            <button
              onClick={() => setIsInsightsOpen(!isInsightsOpen)}
              className={`p-2 rounded-lg border text-text-secondary hover:text-white transition-all flex items-center gap-1.5 text-xs font-mono font-medium ${
                isInsightsOpen ? "bg-electric-blue/10 border-electric-blue/30 text-white" : "border-borders hover:bg-white/5"
              }`}
            >
              <Icons.Sparkles size={14} className={isInsightsOpen ? "text-electric-blue" : ""} />
              <span>Insights</span>
            </button>

            {/* Notification Indicator */}
            <div className="relative cursor-pointer p-2 rounded-lg border border-borders hover:bg-white/5 text-text-secondary hover:text-white transition-all">
              <Icons.Bell size={16} />
              <div className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-warning-orange glow-dot-orange" />
            </div>

            {/* App Home Button */}
            <Link
              href="/"
              className="px-3 py-1.5 rounded-lg border border-borders text-xs font-mono text-text-secondary hover:text-white hover:bg-white/5 transition-all flex items-center gap-1"
            >
              Home
              <Icons.ArrowUpRight size={12} />
            </Link>
          </div>
        </header>

        {/* WORKSPACE & INSIGHTS GRID */}
        <div className="flex-1 flex overflow-hidden">
          {/* Main workspace */}
          <main className="flex-1 overflow-y-auto p-6 relative">
            <div className="max-w-6xl mx-auto space-y-6">{children}</div>
          </main>

          {/* RIGHT INSIGHTS PANEL */}
          {isInsightsOpen && (
            <aside className="w-80 border-l border-borders bg-zinc-950/40 backdrop-blur-md overflow-y-auto p-4 shrink-0 hidden xl:flex flex-col gap-4 relative z-20">
              <div className="flex items-center justify-between pb-3 border-b border-borders">
                <span className="font-bold text-xs uppercase tracking-wider text-white flex items-center gap-2">
                  <Icons.Sparkles className="text-electric-blue" size={14} />
                  AI Suggestion Engine
                </span>
                <span className="text-[9px] font-mono text-success-green border border-success-green/20 bg-success-green/5 px-2 py-0.5 rounded">
                  ACTIVE
                </span>
              </div>

              {/* Recommendation Card */}
              <div className="glass-panel p-4 rounded-xl border border-borders bg-gradient-to-b from-electric-blue/[0.03] to-transparent">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-electric-blue glow-dot-blue" />
                  <span className="text-xs font-bold text-white font-mono uppercase">Opportunity Alert</span>
                </div>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Competitor analysis indicates a gap in SaaS orchestration tools inside the local Asian enterprise market.
                </p>
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => router.push("/dashboard/market-research")}
                    className="text-[10px] font-mono text-electric-blue hover:underline"
                  >
                    Investigate Market Gap →
                  </button>
                </div>
              </div>

              {/* Task Alert Card */}
              <div className="glass-panel p-4 rounded-xl border border-borders bg-gradient-to-b from-warning-orange/[0.03] to-transparent">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-warning-orange glow-dot-orange" />
                  <span className="text-xs font-bold text-white font-mono uppercase">Sprint Warning</span>
                </div>
                <p className="text-xs text-text-secondary leading-relaxed">
                  {"Roadmap Milestone \"Validation Alpha\" has 2 open tasks overdue. Execution velocity is down by 8%."}
                </p>
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => router.push("/dashboard/task-center")}
                    className="text-[10px] font-mono text-warning-orange hover:underline"
                  >
                    Open Kanban Board →
                  </button>
                </div>
              </div>

              {/* Activity Feeds */}
              <div className="flex-1 flex flex-col gap-2.5 mt-2">
                <span className="font-bold text-[10px] font-mono text-text-secondary uppercase tracking-widest block">
                  Mission Timeline Logs
                </span>
                <div className="flex flex-col gap-3 font-mono text-[10px] text-text-secondary/80">
                  <div className="flex gap-2.5 items-start">
                    <span className="text-text-secondary mt-0.5">14:20</span>
                    <div>
                      <span className="text-white">SYSTEM</span>: Compiled planning models.
                    </div>
                  </div>
                  <div className="flex gap-2.5 items-start">
                    <span className="text-text-secondary mt-0.5">12:05</span>
                    <div>
                      <span className="text-white">FOUNDER</span>: Edited validation parameters.
                    </div>
                  </div>
                  <div className="flex gap-2.5 items-start">
                    <span className="text-text-secondary mt-0.5">Yesterday</span>
                    <div>
                      <span className="text-white">AI CO-PILOT</span>: Auto-generated 4 content campaigns.
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick controls info at the bottom */}
              <div className="border-t border-borders pt-4 mt-auto">
                <div className="flex justify-between items-center text-[9px] font-mono text-text-secondary">
                  <span>Server: orbit-west-01</span>
                  <span>Ping: 14ms</span>
                </div>
              </div>
            </aside>
          )}
        </div>
      </div>
    </div>
  );
}
