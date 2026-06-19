"use client";
// ============================================================
// components/Navbar.tsx
// Sticky glassmorphism navbar with Orbit branding and nav links.
// ============================================================

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Rocket, LayoutDashboard, Zap } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home", icon: Zap },
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/30 group-hover:shadow-violet-500/50 transition-all duration-300">
              <Rocket className="w-4 h-4 text-white" />
            </div>
            <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 opacity-0 group-hover:opacity-40 blur-md transition-all duration-300" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
            Orbit
          </span>
        </Link>

        {/* Nav Links */}
        <div className="flex items-center gap-1 bg-white/5 border border-white/10 backdrop-blur-xl rounded-full px-2 py-1.5">
          {navLinks.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-violet-600 text-white shadow-lg shadow-violet-600/30"
                    : "text-gray-400 hover:text-white hover:bg-white/10"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {label}
              </Link>
            );
          })}
        </div>

        {/* CTA */}
        <Link
          href="/"
          className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-sm font-semibold hover:from-violet-500 hover:to-indigo-500 transition-all duration-200 shadow-lg shadow-violet-600/30 hover:shadow-violet-500/50 hover:scale-105"
        >
          <Rocket className="w-3.5 h-3.5" />
          New Analysis
        </Link>
      </div>
    </nav>
  );
}
