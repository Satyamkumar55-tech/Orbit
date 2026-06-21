// "use client";
// // ============================================================
// // components/StartupForm.tsx
// // Animated startup idea input form with submit handling.
// // Redirects to /submit?idea=... on form submission.
// // ============================================================

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { Sparkles, ArrowRight, Lightbulb } from "lucide-react";

// const placeholders = [
//   "AI Fitness Coach that adapts to your goals...",
//   "Marketplace for freelance architects...",
//   "Subscription box for local artisan foods...",
//   "Mental wellness app for remote workers...",
//   "Carbon footprint tracker with gamification...",
// ];

// export default function StartupForm() {
//   const [idea, setIdea] = useState("");
//   const [focused, setFocused] = useState(false);
//   const [placeholderIndex] = useState(
//     () => Math.floor(Math.random() * placeholders.length)
//   );
//   const router = useRouter();

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!idea.trim() || idea.trim().length < 5) return;
//     router.push(`/submit?idea=${encodeURIComponent(idea.trim())}`);
//   };

//   const charCount = idea.length;
//   const isValid = idea.trim().length >= 5;

//   return (
//     <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
//       <div
//         className={`relative rounded-2xl transition-all duration-300 ${
//           focused
//             ? "shadow-[0_0_0_2px_rgba(139,92,246,0.6),0_20px_60px_-10px_rgba(139,92,246,0.3)]"
//             : "shadow-[0_0_0_1px_rgba(255,255,255,0.08)]"
//         }`}
//       >
//         {/* Textarea Container */}
//         <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden">
//           {/* Header bar */}
//           <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
//             <Lightbulb className="w-4 h-4 text-amber-400" />
//             <span className="text-xs text-gray-400 font-medium">
//               Describe your startup idea
//             </span>
//             <span className="ml-auto text-xs text-gray-600">
//               {charCount}/500
//             </span>
//           </div>

//           {/* Textarea */}
//           <textarea
//             id="startup-idea-input"
//             value={idea}
//             onChange={(e) => setIdea(e.target.value.slice(0, 500))}
//             onFocus={() => setFocused(true)}
//             onBlur={() => setFocused(false)}
//             placeholder={placeholders[placeholderIndex]}
//             rows={4}
//             className="w-full px-5 py-4 bg-transparent text-white placeholder-gray-600 resize-none outline-none text-base leading-relaxed"
//           />

//           {/* Footer bar */}
//           <div className="flex items-center justify-between px-4 py-3 border-t border-white/5">
//             <p className="text-xs text-gray-600">
//               Be specific — the more detail, the better the analysis
//             </p>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               disabled={!isValid}
//               id="analyze-button"
//               className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
//                 isValid
//                   ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:from-violet-500 hover:to-indigo-500 shadow-lg shadow-violet-600/40 hover:shadow-violet-500/60 hover:scale-105 active:scale-95"
//                   : "bg-white/5 text-gray-600 cursor-not-allowed"
//               }`}
//             >
//               <Sparkles className="w-4 h-4" />
//               Analyze Idea
//               <ArrowRight className="w-4 h-4" />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Helper chips */}
//       <div className="flex flex-wrap gap-2 mt-4 justify-center">
//         {["AI Fitness Coach", "EdTech for Kids", "ClimateTech SaaS", "B2B Marketplace"].map(
//           (chip) => (
//             <button
//               type="button"
//               key={chip}
//               onClick={() => setIdea(chip)}
//               className="px-3 py-1 rounded-full text-xs text-gray-400 border border-white/10 bg-white/5 hover:bg-white/10 hover:text-gray-200 transition-all duration-150 hover:border-violet-500/50"
//             >
//               {chip}
//             </button>
//           )
//         )}
//       </div>
//     </form>
//   );
// }


"use client";
// ============================================================
// components/StartupForm.tsx
// Animated startup idea input form with submit handling.
// Redirects to /submit?idea=... on form submission.
// ============================================================

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, ArrowRight, Lightbulb } from "lucide-react";

const placeholders = [
  "AI Fitness Coach that adapts to your goals...",
  "Marketplace for freelance architects...",
  "Subscription box for local artisan foods...",
  "Mental wellness app for remote workers...",
  "Carbon footprint tracker with gamification...",
];

export default function StartupForm() {
  const [idea, setIdea] = useState("");
  const [focused, setFocused] = useState(false);

  // Start with a fixed value during SSR to prevent hydration mismatch
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  // Pick a random placeholder after hydration
  useEffect(() => {
    setPlaceholderIndex(
      Math.floor(Math.random() * placeholders.length)
    );
  }, []);

  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!idea.trim() || idea.trim().length < 5) return;
    router.push(`/submit?idea=${encodeURIComponent(idea.trim())}`);
  };

  const charCount = idea.length;
  const isValid = idea.trim().length >= 5;

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div
        className={`relative rounded-2xl transition-all duration-300 ${
          focused
            ? "shadow-[0_0_0_2px_rgba(139,92,246,0.6),0_20px_60px_-10px_rgba(139,92,246,0.3)]"
            : "shadow-[0_0_0_1px_rgba(255,255,255,0.08)]"
        }`}
      >
        {/* Textarea Container */}
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden">
          {/* Header bar */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
            <Lightbulb className="w-4 h-4 text-amber-400" />
            <span className="text-xs text-gray-400 font-medium">
              Describe your startup idea
            </span>
            <span className="ml-auto text-xs text-gray-600">
              {charCount}/500
            </span>
          </div>

          {/* Textarea */}
          <textarea
            id="startup-idea-input"
            value={idea}
            onChange={(e) => setIdea(e.target.value.slice(0, 500))}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder={placeholders[placeholderIndex]}
            rows={4}
            className="w-full px-5 py-4 bg-transparent text-white placeholder-gray-600 resize-none outline-none text-base leading-relaxed"
          />

          {/* Footer bar */}
          <div className="flex items-center justify-between px-4 py-3 border-t border-white/5">
            <p className="text-xs text-gray-600">
              Be specific — the more detail, the better the analysis
            </p>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!isValid}
              id="analyze-button"
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                isValid
                  ? "bg-linear-to-r from-violet-600 to-indigo-600 text-white hover:from-violet-500 hover:to-indigo-500 shadow-lg shadow-violet-600/40 hover:shadow-violet-500/60 hover:scale-105 active:scale-95"
                  : "bg-white/5 text-gray-600 cursor-not-allowed"
              }`}
            >
              <Sparkles className="w-4 h-4" />
              Analyze Idea
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Helper chips */}
      <div className="flex flex-wrap gap-2 mt-4 justify-center">
        {[
          "AI Fitness Coach",
          "EdTech for Kids",
          "ClimateTech SaaS",
          "B2B Marketplace",
        ].map((chip) => (
          <button
            type="button"
            key={chip}
            onClick={() => setIdea(chip)}
            className="px-3 py-1 rounded-full text-xs text-gray-400 border border-white/10 bg-white/5 hover:bg-white/10 hover:text-gray-200 transition-all duration-150 hover:border-violet-500/50"
          >
            {chip}
          </button>
        ))}
      </div>
    </form>
  );
}


