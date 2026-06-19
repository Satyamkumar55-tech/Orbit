"use client";
// ============================================================
// app/submit/page.tsx
// Receives the idea via query param, calls POST /api/startup,
// shows LoadingScreen while waiting, then redirects to result.
// ============================================================

import { useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import { AlertCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";

function SubmitContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const idea = searchParams.get("idea") ?? "";

  const [error, setError] = useState<string | null>(null);
  // Use a ref to prevent double-invocation in React Strict Mode
  const hasFired = useRef(false);

  useEffect(() => {
    if (!idea) {
      router.replace("/");
      return;
    }

    if (hasFired.current) return;
    hasFired.current = true;

    const analyze = async () => {
      try {
        const res = await fetch("/api/startup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ idea }),
        });

        const json = await res.json();

        if (!res.ok || !json.success) {
          throw new Error(json.error ?? "Analysis failed. Please try again.");
        }

        // Redirect to the result page with the new document ID
        router.push(`/result?id=${json.data._id}`);
      } catch (err: unknown) {
        const message =
          err instanceof Error ? err.message : "An unexpected error occurred.";
        setError(message);
      }
    };

    analyze();
  }, [idea, router]);

  // ── Error state ─────────────────────────────────────────────
  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
        <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-6">
          <AlertCircle className="w-8 h-8 text-red-400" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-3">Analysis Failed</h2>
        <p className="text-gray-400 max-w-md mb-8 text-sm">{error}</p>
        <div className="flex gap-3">
          <Link
            href="/"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-300 text-sm hover:bg-white/10 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <button
            onClick={() => {
              setError(null);
              hasFired.current = false;
              // re-trigger by refreshing
              window.location.reload();
            }}
            className="px-5 py-2.5 rounded-xl btn-glow text-white text-sm font-semibold"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return <LoadingScreen idea={idea} />;
}

// Wrap in Suspense because useSearchParams() requires it in Next.js 15
export default function SubmitPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-violet-500 border-t-transparent animate-spin" />
        </div>
      }
    >
      <SubmitContent />
    </Suspense>
  );
}
