"use client";

import { useMemo, useState, useEffect } from "react";
import { Quote } from "lucide-react";
import { useLang } from "@/components/LangProvider";

export default function Hitokoto() {
  const { lang } = useLang();
  const [quote, setQuote] = useState({
    hitokoto: "The Matrix has you...",
    from: "The Matrix"
  });

  const fallbackEn = useMemo(
    () => [
      { hitokoto: "Make it work, make it right, make it fast.", from: "Kent Beck" },
      { hitokoto: "Simplicity is the ultimate sophistication.", from: "Leonardo da Vinci" },
      { hitokoto: "A good system is a usable system.", from: "Notes" },
      { hitokoto: "Small steps, sharp tools.", from: "Notes" },
      { hitokoto: "Write less, say more.", from: "Notes" },
      { hitokoto: "Clarity is kindness.", from: "Notes" },
    ],
    []
  );

  useEffect(() => {
    if (lang === "zh") {
      fetch("https://v1.hitokoto.cn/?c=i&encode=json")
        .then((res) => res.json())
        .then((data) => {
          if (data?.hitokoto) setQuote(data);
        })
        .catch(() => {});
      return;
    }

    fetch("https://api.quotable.io/random")
      .then((res) => res.json())
      .then((data) => {
        if (data?.content) {
          setQuote({ hitokoto: data.content, from: data.author || "Quotable" });
        } else {
          const idx = new Date().getDate() % fallbackEn.length;
          setQuote(fallbackEn[idx]);
        }
      })
      .catch(() => {
        const idx = new Date().getDate() % fallbackEn.length;
        setQuote(fallbackEn[idx]);
      });
  }, [lang, fallbackEn]);

  return (
    <div className="w-full max-w-2xl bg-white/[0.03] border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-sm relative group overflow-hidden transition-colors hover:bg-white/[0.05]">
      <div className="absolute -top-4 -left-4 text-white/10 group-hover:text-white/15 transition-colors">
        <Quote className="w-24 h-24" />
      </div>
      <blockquote className="relative z-10">
        <p className="text-base md:text-lg text-white/80 font-normal leading-relaxed mb-4">
          “{quote.hitokoto}”
        </p>
        <footer className="text-sm text-white/55 font-mono flex items-center justify-end">
          <span className="w-4 h-px bg-white/25 mr-2"></span>
          {quote.from}
        </footer>
      </blockquote>
    </div>
  );
}
