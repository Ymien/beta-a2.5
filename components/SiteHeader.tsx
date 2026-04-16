"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Menu, X } from "lucide-react";
import { useLang } from "@/components/LangProvider";

type NavItem = {
  href: string;
  label: string;
  desc: string;
};

export default function SiteHeader(props: { active?: string }) {
  const { active } = props;
  const [open, setOpen] = useState(false);
  const { lang, toggleLang } = useLang();

  const items = useMemo<NavItem[]>(
    () =>
      lang === "zh"
        ? [
            { href: "/", label: "留白", desc: "入口" },
            { href: "/blog/react-server-components", label: "随想", desc: "短文与片段" },
            { href: "/chat", label: "对话", desc: "多模型 · 思考" },
            { href: "/popup", label: "游乐场 · PopupMorph", desc: "弹窗形状动画" },
            { href: "/tetris", label: "游乐场 · Tetris", desc: "霓虹方块" },
            { href: "/game", label: "游乐场 · Match", desc: "记忆配对" },
          ]
        : [
            { href: "/", label: "Blank Space", desc: "Start here" },
            { href: "/blog/react-server-components", label: "Notes", desc: "Small essays & fragments" },
            { href: "/chat", label: "Dialog", desc: "Multi-model · Thinking" },
            { href: "/popup", label: "Playground · PopupMorph", desc: "Popup shape animator" },
            { href: "/tetris", label: "Playground · Tetris", desc: "Neon blocks" },
            { href: "/game", label: "Playground · Match", desc: "Memory game" },
          ],
    [lang]
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#0b0b0f]/70 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full border border-white/10 bg-white/[0.06] p-1">
            <img src="/avatar.svg" alt="Xyu" className="h-full w-full rounded-full" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-[var(--font-display)] text-[16px] font-medium tracking-tight text-white">
              {lang === "zh" ? "留白" : "Blank Space"}
            </span>
            <span className="text-[11px] text-white/45">Xyu</span>
          </div>
        </Link>

        <div className="relative flex items-center gap-2">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-2 text-sm font-medium text-white/80 shadow-sm transition hover:bg-white/[0.09]"
            aria-label={lang === "zh" ? "打开目录" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            <span className="hidden sm:inline">{lang === "zh" ? "目录" : "Menu"}</span>
          </button>

          <div
            className={`absolute right-0 top-[calc(100%+10px)] w-[min(320px,calc(100vw-2rem))] rounded-3xl border border-white/10 bg-[#14131a]/95 p-2 shadow-[0_22px_90px_rgba(0,0,0,0.55)] ${
              open ? "block" : "hidden"
            }`}
            role="menu"
          >
            <div className="px-3 pb-2 pt-1 flex items-center justify-between">
              <div className="text-[11px] font-medium tracking-widest text-white/45">
                {lang === "zh" ? "入口" : "PORTALS"}
              </div>
              <button
                type="button"
                onClick={() => {
                  toggleLang();
                  setOpen(false);
                }}
                className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-[11px] font-medium text-white/70 transition hover:bg-white/[0.1]"
              >
                {lang === "zh" ? "EN" : "中文"}
              </button>
            </div>
            <div className="flex flex-col">
              {items.map((item) => {
                const isActive =
                  (active && item.href === active) ||
                  (active === "home" && item.href === "/") ||
                  (active === "chat" && item.href === "/chat") ||
                  (active === "popup" && item.href === "/popup");
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center justify-between rounded-2xl px-4 py-3 text-sm transition ${
                      isActive
                        ? "bg-white/[0.06] text-[#e7c7a3]"
                        : "text-white/80 hover:bg-white/[0.06] hover:text-white"
                    }`}
                    role="menuitem"
                  >
                    <span className="flex flex-col">
                      <span className="font-medium">{item.label}</span>
                      <span className="text-[11px] text-white/45">{item.desc}</span>
                    </span>
                    <span className="text-white/25">↗</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
