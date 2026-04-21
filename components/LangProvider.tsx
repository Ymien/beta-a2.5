"use client";

import { createContext, useContext, useState } from "react";

export type Lang = "zh" | "en";

type LangContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
};

const LangContext = createContext<LangContextValue | null>(null);

export function LangProvider(props: { children: React.ReactNode }) {
  const { children } = props;
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window === "undefined") {
      return "zh";
    }

    const stored = window.localStorage.getItem("xyu_lang");
    return stored === "zh" || stored === "en" ? stored : "zh";
  });

  const setLang = (next: Lang) => {
    setLangState(next);
    window.localStorage.setItem("xyu_lang", next);
  };

  const toggleLang = () => setLang(lang === "zh" ? "en" : "zh");

  return <LangContext.Provider value={{ lang, setLang, toggleLang }}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within LangProvider");
  return ctx;
}
