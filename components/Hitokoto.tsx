"use client";

import { useState, useEffect } from "react";
import { Quote } from "lucide-react";

export default function Hitokoto() {
  const [quote, setQuote] = useState({
    hitokoto: "The Matrix has you...",
    from: "The Matrix"
  });

  useEffect(() => {
    fetch("https://v1.hitokoto.cn/?c=i")
      .then((res) => res.json())
      .then((data) => {
        setQuote(data);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="w-full max-w-2xl mt-12 bg-white/[0.02] border border-white/5 rounded-2xl p-6 backdrop-blur-sm relative group overflow-hidden transition-colors hover:bg-white/[0.04]">
      <div className="absolute -top-4 -left-4 text-cyan-500/10 group-hover:text-cyan-500/20 transition-colors">
        <Quote className="w-24 h-24" />
      </div>
      <blockquote className="relative z-10">
        <p className="text-lg md:text-xl text-zinc-300 font-light leading-relaxed mb-4">
          "{quote.hitokoto}"
        </p>
        <footer className="text-sm text-cyan-500 font-mono flex items-center justify-end">
          <span className="w-4 h-px bg-cyan-500 mr-2"></span>
          {quote.from}
        </footer>
      </blockquote>
    </div>
  );
}