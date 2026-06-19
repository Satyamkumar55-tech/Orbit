"use client";
// ============================================================
// components/LoadingScreen.tsx
// Animated multi-step agent progress tracker shown while
// the LangGraph pipeline processes the startup idea.
// ============================================================

import { useEffect, useState } from "react";
import { Brain, TrendingUp, Code2, Database, Rocket, CheckCircle2 } from "lucide-react";

const STEPS = [
  {
    id: 1,
    icon: Brain,
    label: "Startup Advisor",
    description: "Analyzing strengths, weaknesses, risks...",
    color: "from-violet-500 to-purple-600",
    glow: "shadow-violet-500/40",
    duration: 8000,
  },
  {
    id: 2,
    icon: TrendingUp,
    label: "Market Research",
    description: "Researching competitors & trends...",
    color: "from-blue-500 to-cyan-600",
    glow: "shadow-blue-500/40",
    duration: 8000,
  },
  {
    id: 3,
    icon: Code2,
    label: "Product Manager",
    description: "Defining MVP & roadmap...",
    color: "from-emerald-500 to-teal-600",
    glow: "shadow-emerald-500/40",
    duration: 8000,
  },
  {
    id: 4,
    icon: Database,
    label: "Saving Analysis",
    description: "Storing results to database...",
    color: "from-amber-500 to-orange-600",
    glow: "shadow-amber-500/40",
    duration: 3000,
  },
];

interface LoadingScreenProps {
  idea: string;
}

export default function LoadingScreen({ idea }: LoadingScreenProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  // Cycle through steps to simulate progress (visual only)
  useEffect(() => {
    let stepIdx = 0;

    const advance = () => {
      if (stepIdx < STEPS.length - 1) {
        setCompletedSteps((prev) => [...prev, stepIdx]);
        stepIdx++;
        setCurrentStep(stepIdx);
        setTimeout(advance, STEPS[stepIdx].duration);
      }
    };

    const timer = setTimeout(advance, STEPS[0].duration);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const CurrentIcon = STEPS[currentStep]?.icon ?? Rocket;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-20">
      {/* Central animated orb */}
      <div className="relative mb-12">
        {/* Outer glow rings */}
        <div className="absolute inset-0 rounded-full bg-violet-500/20 blur-3xl scale-150 animate-pulse" />
        <div className="absolute inset-0 rounded-full bg-indigo-500/10 blur-xl scale-125 animate-ping" />

        {/* Main orb */}
        <div
          className={`relative w-24 h-24 rounded-full bg-gradient-to-br ${STEPS[currentStep]?.color} flex items-center justify-center shadow-2xl ${STEPS[currentStep]?.glow}`}
          style={{ animation: "spin 3s linear infinite" }}
        >
          <CurrentIcon className="w-10 h-10 text-white" />
        </div>

        {/* Orbit dots */}
        <div
          className="absolute inset-0 rounded-full border-2 border-dashed border-violet-500/30"
          style={{ animation: "spin 4s linear infinite reverse" }}
        />
      </div>

      {/* Idea label */}
      <div className="mb-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-gray-400 max-w-sm text-center truncate">
        Analyzing: &quot;{idea}&quot;
      </div>

      <h2 className="text-2xl font-bold text-white mb-1">
        {STEPS[currentStep]?.label}
      </h2>
      <p className="text-gray-500 text-sm mb-12">
        {STEPS[currentStep]?.description}
      </p>

      {/* Step tracker */}
      <div className="w-full max-w-md space-y-3">
        {STEPS.map((step, idx) => {
          const isCompleted = completedSteps.includes(idx);
          const isCurrent = idx === currentStep;
          const isPending = idx > currentStep;
          const StepIcon = step.icon;

          return (
            <div
              key={step.id}
              className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-500 ${
                isCurrent
                  ? "bg-white/8 border-white/20 scale-102"
                  : isCompleted
                  ? "bg-white/4 border-white/8"
                  : "bg-white/2 border-white/5 opacity-40"
              }`}
            >
              {/* Step icon / check */}
              <div
                className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                  isCompleted
                    ? "bg-emerald-500/20"
                    : isCurrent
                    ? `bg-gradient-to-br ${step.color} shadow-lg ${step.glow}`
                    : "bg-white/5"
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                ) : (
                  <StepIcon
                    className={`w-5 h-5 ${isCurrent ? "text-white" : "text-gray-600"}`}
                  />
                )}
              </div>

              {/* Label + bar */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span
                    className={`text-sm font-medium ${
                      isCompleted
                        ? "text-emerald-400"
                        : isCurrent
                        ? "text-white"
                        : "text-gray-600"
                    }`}
                  >
                    {step.label}
                  </span>
                  <span className="text-xs text-gray-600">
                    {isCompleted ? "Done ✓" : isCurrent ? "Running..." : isPending ? "Waiting" : ""}
                  </span>
                </div>

                {/* Progress bar */}
                <div className="h-1 rounded-full bg-white/5 overflow-hidden">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${step.color} transition-all duration-1000`}
                    style={{
                      width: isCompleted ? "100%" : isCurrent ? "60%" : "0%",
                      animation: isCurrent ? "progress 8s ease-out forwards" : undefined,
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <p className="mt-8 text-xs text-gray-700 text-center max-w-sm">
        Our AI agents are working hard. This usually takes 20–40 seconds.
      </p>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes progress {
          from { width: 0%; }
          to { width: 85%; }
        }
      `}</style>
    </div>
  );
}
