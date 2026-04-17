"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-black text-cyan-50 font-mono relative overflow-hidden selection:bg-fuchsia-500 selection:text-white flex items-center justify-center">
      <div className="fixed top-[-20%] left-[-10%] w-[60%] h-[60%] bg-red-600/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-fuchsia-600/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="relative z-10 w-full max-w-lg mx-auto px-6">
        <div className="bg-zinc-900/40 border border-red-500/30 rounded-2xl p-8 backdrop-blur-sm shadow-[0_0_40px_rgba(239,68,68,0.15)]">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.6)]" />
            <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.4)]" />
            <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.4)]" />
          </div>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-2 text-red-500 drop-shadow-[0_0_20px_rgba(239,68,68,0.6)]">
            SYSTEM ERROR
          </h1>

          <div className="inline-block px-3 py-1 mb-6 border border-red-500/30 bg-red-500/10 text-red-400 text-xs tracking-widest uppercase rounded-full shadow-[0_0_10px_rgba(239,68,68,0.2)]">
            {error.digest ? `ERR_${error.digest}` : "ERR_UNKNOWN"}
          </div>

          <div className="bg-black/60 border border-zinc-800 rounded-xl p-4 mb-8 overflow-x-auto">
            <div className="flex items-center gap-2 mb-2 text-xs text-zinc-600 tracking-widest uppercase">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              terminal output
            </div>
            <p className="text-sm text-zinc-400 leading-relaxed break-words">
              <span className="text-red-400 mr-1">{">"}</span>
              {error.message || "An unexpected error occurred."}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={reset}
              className="flex-1 py-3 px-4 bg-red-500/10 border border-red-500/30 hover:bg-red-500 hover:border-red-500 text-red-400 hover:text-white text-sm font-bold tracking-widest uppercase rounded-xl transition-all shadow-[0_0_15px_rgba(239,68,68,0.1)] hover:shadow-[0_0_25px_rgba(239,68,68,0.4)] cursor-pointer"
            >
              REBOOT
            </button>
            <Link
              href="/"
              className="flex-1 py-3 px-4 bg-white/5 border border-white/10 hover:bg-cyan-500 hover:border-cyan-500 text-zinc-400 hover:text-black text-sm font-bold tracking-widest uppercase rounded-xl transition-all text-center"
            >
              RETURN HOME
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
