"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Icons } from "@/components/Icons";

// Custom Canvas-based Orbit Particle System
const OrbitCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    canvas.width = 500;
    canvas.height = 500;

    const resize = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resize();
    window.addEventListener("resize", resize);

    // Particle setup
    interface Particle {
      angle: number;
      speed: number;
      radius: number;
      size: number;
      color: string;
      glow: boolean;
    }

    const particles: Particle[] = [];
    const colors = ["#3B82F6", "#8B5CF6", "#10B981", "#F59E0B"];
    
    // Generate particles on 3 orbital rings
    const rings = [60, 110, 170];
    for (let i = 0; i < 24; i++) {
      const ringIndex = i % 3;
      particles.push({
        angle: Math.random() * Math.PI * 2,
        speed: (0.005 + Math.random() * 0.008) * (ringIndex === 1 ? -1 : 1),
        radius: rings[ringIndex],
        size: 2 + Math.random() * 3,
        color: colors[i % colors.length],
        glow: Math.random() > 0.5,
      });
    }

    const render = () => {
      const w = canvas.width / window.devicePixelRatio;
      const h = canvas.height / window.devicePixelRatio;
      ctx.clearRect(0, 0, w, h);

      const centerX = w / 2;
      const centerY = h / 2;

      // Draw dashed orbital rings
      ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
      ctx.lineWidth = 1;
      rings.forEach((r) => {
        ctx.beginPath();
        ctx.setLineDash([4, 6]);
        ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
        ctx.stroke();
      });
      ctx.setLineDash([]);

      // Draw central orbit core
      const gradient = ctx.createRadialGradient(centerX, centerY, 5, centerX, centerY, 35);
      gradient.addColorStop(0, "rgba(139, 92, 246, 0.35)");
      gradient.addColorStop(0.5, "rgba(59, 130, 246, 0.15)");
      gradient.addColorStop(1, "rgba(9, 9, 11, 0)");

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 35, 0, Math.PI * 2);
      ctx.fill();

      // Outer glowing border of the core
      ctx.strokeStyle = "rgba(59, 130, 246, 0.2)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 25, 0, Math.PI * 2);
      ctx.stroke();

      // Draw central star dot
      ctx.fillStyle = "#fafafa";
      ctx.beginPath();
      ctx.arc(centerX, centerY, 3, 0, Math.PI * 2);
      ctx.fill();

      // Draw orbiting particles
      particles.forEach((p) => {
        p.angle += p.speed;
        const x = centerX + Math.cos(p.angle) * p.radius;
        const y = centerY + Math.sin(p.angle) * p.radius;

        // Glow effect for selected particles
        if (p.glow) {
          ctx.shadowBlur = 10;
          ctx.shadowColor = p.color;
        } else {
          ctx.shadowBlur = 0;
        }

        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.shadowBlur = 0; // reset
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full max-w-[500px] max-h-[500px]" />;
};

export default function Home() {
  const [activeStep, setActiveStep] = useState(0);

  const journeySteps = [
    { name: "Idea", desc: "Socho Bada. Define the initial vision and startup core concept.", color: "text-blue-500", glow: "glow-dot-blue" },
    { name: "Validation", desc: "Kya yeh idea market mein chalega? Test assumptions & demand.", color: "text-purple-500", glow: "glow-dot-purple" },
    { name: "Planning", desc: "Vision ko roadmap mein badlo. Outline architecture & timelines.", color: "text-blue-400", glow: "glow-dot-blue" },
    { name: "Research", desc: "Competition ko samjho, market ko jeeto. Analyze metrics & niche.", color: "text-orange-500", glow: "glow-dot-orange" },
    { name: "Execution", desc: "Execution hi superpower hai. Manage tasks and compile code.", color: "text-green-500", glow: "glow-dot-green" },
    { name: "Growth", desc: "Scale karo smart. Secure investment, automate workflows, grow 10x.", color: "text-purple-400", glow: "glow-dot-purple" },
  ];

  const features = [
    {
      title: "Idea Validation",
      hindi: "Kya yeh idea market mein chalega?",
      desc: "Simulate market parameters, consumer profiles, and product-market fit to analyze feasibility before writing a single line of code.",
      icon: <Icons.Idea className="text-electric-blue" size={24} />,
      colorClass: "glass-panel-hover",
    },
    {
      title: "Product Planning",
      hindi: "Vision ko roadmap mein badlo.",
      desc: "Architect workflows, milestone structures, and layout requirements automatically mapped onto interactive timeline roadmaps.",
      icon: <Icons.Planning className="text-orbit-purple" size={24} />,
      colorClass: "glass-card-purple",
    },
    {
      title: "Market Research",
      hindi: "Competition ko samjho, market ko jeeto.",
      desc: "Deep-dive competitive landscapes, aggregate trend insights, and find white spaces with direct tactical recommendation reports.",
      icon: <Icons.Research className="text-warning-orange" size={24} />,
      colorClass: "glass-card-orange",
    },
    {
      title: "Content Studio",
      hindi: "Brand ki awaaz duniya tak pahunchao.",
      desc: "Generate professional campaigns, product launch newsletters, and social assets matching your startup's voice.",
      icon: <Icons.Content className="text-electric-blue" size={24} />,
      colorClass: "glass-panel-hover",
    },
    {
      title: "Task Center",
      hindi: "Execution hi startup ki asli superpower hai.",
      desc: "A developer-first workspace with responsive Kanban boards, automated timelines, and micro-metric task progress calculations.",
      icon: <Icons.Task className="text-success-green" size={24} />,
      colorClass: "glass-card-green",
    },
  ];

  const testimonials = [
    {
      name: "Aarav Mehta",
      role: "Founder, ZenithAI",
      metrics: "Raised $2.4M seed, 18 Days after launch",
      quote: "Orbit converted our messy notion roadmaps and scattered drafts into an actionable, investor-ready command center. Essential for zero-to-one phase.",
      avatar: "AM",
    },
    {
      name: "Priya Sharma",
      role: "Co-Founder, Swasthya Link",
      metrics: "120k Users in 3 Months",
      quote: "Idea validation segment pointed out a critical niche opportunity we would have missed. Startup ka mission control, literally.",
      avatar: "PS",
    },
    {
      name: "Devanshu Roy",
      role: "Solo Creator, BuildStack",
      metrics: "$12k/mo MRR with 1 Creator",
      quote: "Content studio and execution tracker keep me focused. No more platform hopping. I manage the whole loop inside Orbit.",
      avatar: "DR",
    },
  ];

  return (
    <div className="relative min-h-screen bg-primary-bg text-text-primary tech-grid flex flex-col justify-between selection:bg-electric-blue/30 selection:text-white">
      {/* Dynamic Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-electric-blue/10 rounded-full blur-[120px] pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-orbit-purple/10 rounded-full blur-[120px] pointer-events-none animate-pulse-slow" />

      {/* Global Header */}
      <header className="sticky top-0 z-50 w-full glass-panel border-b border-borders backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative w-8 h-8 rounded-lg bg-gradient-to-tr from-electric-blue to-orbit-purple flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
              <span className="text-white font-bold text-sm tracking-wider">O</span>
              <div className="absolute -inset-0.5 bg-gradient-to-tr from-electric-blue to-orbit-purple rounded-lg blur opacity-30 group-hover:opacity-60 transition-opacity" />
            </div>
            <div>
              <span className="font-bold text-lg tracking-wider text-text-primary">ORBIT</span>
              <span className="text-[10px] block text-text-secondary leading-none uppercase tracking-widest font-mono">Idea se Impact Tak</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-text-secondary">
            <a href="#features" className="hover:text-text-primary transition-colors">Features</a>
            <a href="#journey" className="hover:text-text-primary transition-colors">Journey</a>
            <a href="#testimonials" className="hover:text-text-primary transition-colors">Testimonials</a>
          </nav>

          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="px-4 py-2 text-xs font-semibold tracking-wider text-text-primary border border-borders rounded-lg hover:bg-white/5 transition-all glass-panel"
            >
              Enter Control Panel
            </Link>
            <Link
              href="/dashboard"
              className="px-4 py-2 text-xs font-semibold tracking-wider text-white bg-electric-blue hover:bg-blue-600 rounded-lg shadow-lg hover:shadow-electric-blue/20 transition-all flex items-center gap-1.5"
            >
              Start Your Orbit
              <Icons.ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 py-20 lg:py-28 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative">
          <div className="lg:col-span-7 flex flex-col items-start text-left z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-borders text-xs text-electric-blue font-mono mb-6 backdrop-blur">
              <span className="w-2 h-2 rounded-full bg-success-green animate-ping" />
              <span>STABLE VERSION 1.0 AVAILABLE</span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-white mb-4 leading-[1.1]">
              Build the Future. <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-electric-blue via-orbit-purple to-purple-400">
                Launch with Confidence.
              </span>
            </h1>

            <p className="text-lg text-text-secondary max-w-xl mb-3 leading-relaxed font-medium">
              {"\"Sapno ko startup mein badalne ka command center.\""}
            </p>
            <p className="text-sm text-text-secondary/70 max-w-lg mb-8 font-mono">
              The AI Founder Orchestration System. Validate markets, compile roadmaps, automate content, and coordinate sprints in one unified cockpit.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
              <Link
                href="/dashboard"
                className="px-8 py-4 bg-gradient-to-r from-electric-blue to-orbit-purple text-sm font-semibold rounded-xl text-center text-white hover:brightness-110 shadow-xl shadow-orbit-purple/15 transition-all flex items-center justify-center gap-2 group"
              >
                Start Your Orbit
                <Icons.ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
              <a
                href="#features"
                className="px-8 py-4 border border-borders text-sm font-semibold rounded-xl text-center text-text-primary hover:bg-white/5 transition-all glass-panel flex items-center justify-center gap-2"
              >
                Explore Platform
              </a>
            </div>

            {/* Subtext and mini labels */}
            <div className="mt-12 pt-8 border-t border-borders/50 w-full max-w-xl grid grid-cols-3 gap-6 font-mono text-[11px] text-text-secondary">
              <div>
                <span className="block text-white font-bold text-base mb-1">98.2%</span>
                ACCURACY METRIC
              </div>
              <div>
                <span className="block text-white font-bold text-base mb-1">10x</span>
                EXECUTION ACCELERATION
              </div>
              <div>
                <span className="block text-white font-bold text-base mb-1">Zero</span>
                API KEY CONFIG NEEDED
              </div>
            </div>
          </div>

          {/* Interactive Orbit Canvas Container */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            {/* Hologram boundary lines */}
            <div className="absolute -inset-10 border border-dashed border-white/5 rounded-full pointer-events-none animate-orbit-cw" />
            <div className="absolute -inset-5 border border-dashed border-white/[0.03] rounded-full pointer-events-none animate-orbit-ccw" />

            <div className="relative w-full aspect-square max-w-[420px] max-h-[420px] flex items-center justify-center glass-panel rounded-full border border-borders bg-zinc-950/20 backdrop-blur-sm p-4">
              <OrbitCanvas />

              {/* Floating Metric Badges */}
              <div className="absolute top-12 -left-8 animate-float glass-panel p-3 rounded-lg border border-borders flex items-center gap-2 shadow-2xl backdrop-blur-md">
                <div className="w-2 h-2 rounded-full bg-success-green glow-dot-green" />
                <div className="font-mono text-[10px]">
                  <span className="text-text-secondary">Validation:</span>{" "}
                  <span className="text-success-green font-bold">94%</span>
                </div>
              </div>

              <div className="absolute bottom-12 -right-8 animate-float-delayed glass-panel p-3 rounded-lg border border-borders flex items-center gap-2 shadow-2xl backdrop-blur-md">
                <div className="w-2.5 h-2.5 rounded-full bg-electric-blue glow-dot-blue" />
                <div className="font-mono text-[10px]">
                  <span className="text-text-secondary">Sprints:</span>{" "}
                  <span className="text-electric-blue font-bold">12 Done</span>
                </div>
              </div>

              <div className="absolute top-1/2 -translate-y-1/2 -right-16 animate-float glass-panel p-3 rounded-lg border border-borders flex items-center gap-2 shadow-2xl backdrop-blur-md">
                <div className="w-2 h-2 rounded-full bg-warning-orange glow-dot-orange" />
                <div className="font-mono text-[10px]">
                  <span className="text-text-secondary">Runway:</span>{" "}
                  <span className="text-warning-orange font-bold">18 Mo</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Showcase */}
        <section id="features" className="max-w-7xl mx-auto px-6 py-24 border-t border-borders/40 relative">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold text-electric-blue font-mono tracking-widest uppercase mb-3">SYSTEM CAPABILITIES</h2>
            <p className="text-3xl lg:text-4xl font-bold text-white mb-4">
              {"\"Idea se Impact Tak.\""}
            </p>
            <p className="text-text-secondary text-base">
              Everything required to orchestrate a modern startup. Designed for speed, styled for investors, and built for execution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className={`glass-panel p-8 rounded-xl border border-borders flex flex-col justify-between group cursor-pointer ${feature.colorClass}`}
              >
                <div>
                  <div className="w-12 h-12 rounded-lg bg-white/5 border border-borders flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1 tracking-tight flex items-center gap-2">
                    {feature.title}
                  </h3>
                  <span className="text-[11px] font-mono text-text-secondary bg-white/5 px-2 py-0.5 rounded border border-borders/40 mb-4 inline-block">
                    {feature.hindi}
                  </span>
                  <p className="text-sm text-text-secondary leading-relaxed mt-2">
                    {feature.desc}
                  </p>
                </div>
                <div className="mt-8 flex items-center gap-1.5 text-xs font-semibold text-text-primary/70 group-hover:text-electric-blue transition-colors font-mono">
                  Launch Module
                  <Icons.ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Founder Journey Timeline */}
        <section id="journey" className="max-w-7xl mx-auto px-6 py-24 border-t border-borders/40 relative">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold text-orbit-purple font-mono tracking-widest uppercase mb-3">ROADMAP ENGINE</h2>
            <p className="text-3xl lg:text-4xl font-bold text-white mb-4">
              From Vision to Venture
            </p>
            <p className="text-text-secondary text-base">
              {"\"Socho bada, banao tez, aur scale karo smart.\""}
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            {/* Connecting Line */}
            <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-borders -translate-y-1/2 hidden md:block" />
            <div className="absolute top-1/2 left-[25px] right-[25px] h-[2px] bg-gradient-to-r from-electric-blue via-orbit-purple to-success-green -translate-y-1/2 hidden md:block opacity-35" />

            <div className="grid grid-cols-1 md:grid-cols-6 gap-8 relative z-10">
              {journeySteps.map((step, idx) => {
                const isActive = activeStep === idx;
                return (
                  <div
                    key={idx}
                    className="flex flex-col items-center text-center cursor-pointer group"
                    onClick={() => setActiveStep(idx)}
                  >
                    {/* Node Dot */}
                    <div className="relative mb-4">
                      <div
                        className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 ${
                          isActive
                            ? "bg-secondary-surface border-electric-blue shadow-lg scale-110"
                            : "bg-primary-bg border-borders group-hover:border-white/30"
                        }`}
                      >
                        <span className="font-mono text-xs font-bold text-text-secondary">{idx + 1}</span>
                      </div>
                      {isActive && (
                        <div className={`absolute -inset-0.5 rounded-full blur opacity-60 bg-electric-blue pointer-events-none`} />
                      )}
                    </div>

                    <h3 className={`text-sm font-bold tracking-wider uppercase mb-1 ${step.color}`}>
                      {step.name}
                    </h3>
                  </div>
                );
              })}
            </div>

            {/* Active Step Details Panel */}
            <div className="mt-12 glass-panel p-8 rounded-xl border border-borders relative overflow-hidden max-w-2xl mx-auto animate-float">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-electric-blue/10 to-transparent rounded-bl-full pointer-events-none" />
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-xs font-bold text-electric-blue border border-electric-blue/30 px-2 py-0.5 rounded">
                  STEP 0{activeStep + 1}
                </span>
                <span className="font-mono text-xs text-text-secondary">ACTIVE PHASE</span>
              </div>
              <h4 className="text-xl font-bold text-white mb-2">
                {journeySteps[activeStep].name} Stage
              </h4>
              <p className="text-sm text-text-secondary leading-relaxed">
                {journeySteps[activeStep].desc}
              </p>
              <div className="mt-6 flex gap-4">
                <Link
                  href="/dashboard"
                  className="text-xs font-semibold text-electric-blue hover:underline flex items-center gap-1"
                >
                  Enter Workspace
                  <Icons.ArrowUpRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="max-w-7xl mx-auto px-6 py-24 border-t border-borders/40">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold text-success-green font-mono tracking-widest uppercase mb-3">TRUSTED BY BUILDERS</h2>
            <p className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Real Impact. Faster Execution.
            </p>
            <p className="text-text-secondary text-base">
              Designed for dreamers. Built for founders. Check how pioneers launch their products.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <div key={idx} className="glass-panel p-6 rounded-xl border border-borders flex flex-col justify-between">
                <div>
                  {/* Success Metric */}
                  <div className="inline-block text-[11px] font-mono font-bold text-success-green bg-success-green/5 border border-success-green/20 px-2.5 py-1 rounded-md mb-6">
                    {t.metrics}
                  </div>
                  <p className="text-sm text-text-secondary leading-relaxed italic">
                    {"\""}{t.quote}{"\""}
                  </p>
                </div>
                <div className="mt-8 pt-6 border-t border-borders/40 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-electric-blue/20 to-orbit-purple/20 border border-borders flex items-center justify-center text-xs font-bold text-white">
                    {t.avatar}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">{t.name}</h4>
                    <span className="text-[11px] text-text-secondary font-mono">{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-borders bg-zinc-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-12 md:py-16 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-4 flex flex-col gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-electric-blue to-orbit-purple flex items-center justify-center font-bold text-sm text-white">
                O
              </div>
              <span className="font-bold text-lg text-white tracking-wider">ORBIT</span>
            </div>
            <p className="text-xs text-text-secondary leading-relaxed max-w-sm">
              An all-in-one execution engine translating core vision statements into technical realities. Build, validate, and launch.
            </p>
            <span className="text-xs font-mono text-electric-blue mt-2">
              ORBIT: Idea se Impact Tak.
            </span>
          </div>

          <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-8 border-t md:border-t-0 md:border-l border-borders md:pl-8 pt-8 md:pt-0">
            {/* Quote 1 */}
            <div>
              <span className="block text-[10px] font-mono text-text-secondary uppercase tracking-wider mb-2">FOUNDER CODE</span>
              <blockquote className="text-sm text-text-primary font-medium leading-relaxed">
                {"\"Great startups aren't built by chance. They're built by consistent execution.\""}
              </blockquote>
            </div>
            {/* Quote 2 */}
            <div>
              <span className="block text-[10px] font-mono text-text-secondary uppercase tracking-wider mb-2">HINDI DIL SE</span>
              <blockquote className="text-sm text-text-primary font-medium leading-relaxed">
                {"\"Bade sapne dekhna pehla step hai, unhe reality banana asli game hai.\""}
              </blockquote>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-6 border-t border-borders/50 flex flex-col sm:flex-row items-center justify-between text-[11px] text-text-secondary font-mono gap-4">
          <div>© {new Date().getFullYear()} Orbit Orchestrations Inc. All rights reserved.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-text-primary transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-text-primary transition-colors">Contact Center</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
