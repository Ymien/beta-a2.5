"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Lang = "zh" | "en";

type LangContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
};

const LangContext = createContext<LangContextValue | null>(null);

export function LangProvider(props: { children: React.ReactNode }) {
  const { children } = props;
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const stored = window.localStorage.getItem("xyu_lang");
    if (stored === "zh" || stored === "en") setLangState(stored);
  }, []);

  const setLang = (next: Lang) => {
    setLangState(next);
    window.localStorage.setItem("xyu_lang", next);
  };

  const toggleLang = () => setLang(lang === "zh" ? "en" : "zh");

  const value = useMemo(() => ({ lang, setLang, toggleLang }), [lang]);

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within LangProvider");
  return ctx;
}
