// ============================================================
// app/layout.tsx
// Root layout — applies global styles, fonts, and Navbar.
// ============================================================

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Orbit — AI-Powered Startup Validator",
  description:
    "Validate your startup idea in seconds using multiple AI agents. Get strengths, weaknesses, market research, competitor analysis, MVP features, and a full product roadmap.",
  keywords: ["startup", "AI", "validation", "market research", "MVP", "product roadmap"],
  authors: [{ name: "Orbit" }],
  openGraph: {
    title: "Orbit — AI-Powered Startup Validator",
    description: "Validate your startup idea with AI agents in seconds.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-[#080810] text-white antialiased min-h-screen">
        {/* Ambient background gradients */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-violet-600/8 rounded-full blur-[120px]" />
          <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-indigo-600/6 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-1/2 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[120px]" />
        </div>

        {/* Subtle grid overlay */}
        <div
          className="fixed inset-0 pointer-events-none opacity-[0.015]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: "64px 64px",
          }}
        />

        <Navbar />

        <main className="relative z-10">{children}</main>
      </body>
    </html>
  );
}
