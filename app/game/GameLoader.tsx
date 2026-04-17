"use client";

import dynamic from "next/dynamic";

const Game = dynamic(() => import("./Game"), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center font-mono">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-600/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="relative z-10 flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-2 border-purple-400 border-t-transparent rounded-full animate-spin shadow-[0_0_15px_rgba(168,85,247,0.5)]" />
        <p className="text-purple-400/70 text-sm tracking-widest uppercase animate-pulse">
          Loading Cyber Match...
        </p>
      </div>
    </div>
  ),
});

export default Game;
