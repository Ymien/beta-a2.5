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
            { href: "/", label: "首页", desc: "回到入口页" },
            { href: "/blog/react-server-components", label: "随想", desc: "文章与片段" },
            { href: "/chat", label: "对话", desc: "AI · 多模型" },
            { href: "/popup", label: "游乐场 · PopupMorph", desc: "弹窗形状动画" },
            { href: "/tetris", label: "游乐场 · Tetris", desc: "霓虹方块" },
            { href: "/game", label: "游乐场 · Match", desc: "记忆配对" },
          ]
        : [
            { href: "/", label: "Home", desc: "Start here" },
            { href: "/blog/react-server-components", label: "Notes", desc: "Posts & fragments" },
            { href: "/chat", label: "Dialog", desc: "AI · Multi-model" },
            { href: "/popup", label: "Playground · PopupMorph", desc: "Popup shape animator" },
            { href: "/tetris", label: "Playground · Tetris", desc: "Neon blocks" },
            { href: "/game", label: "Playground · Match", desc: "Memory game" },
          ],
    [lang]
  );

  return (
    <header className="sticky top-0 z-50 w-full bg-transparent">
      <div className="mx-auto max-w-6xl px-4 py-4 md:px-6">
        <div className="rounded-[28px] border border-black/10 bg-[#fbf7ef]/85 shadow-[0_16px_50px_rgba(0,0,0,0.12)] backdrop-blur-xl">
          <div className="flex h-14 items-center justify-between px-4 md:px-6">
            <Link href="/" className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full border border-black/10 bg-white/80 p-1">
                <img src="/avatar.svg" alt="Xyu" className="h-full w-full rounded-full" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-[var(--font-display)] text-[18px] font-medium tracking-tight text-[#15130f]">
                  Blank Space
                </span>
                <span className="text-[11px] text-black/45">Xyu</span>
              </div>
            </Link>

            <div className="relative flex items-center gap-2">
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-4 py-2 text-sm font-medium text-black/70 shadow-sm transition hover:bg-white"
                aria-label={lang === "zh" ? "打开目录" : "Open menu"}
                aria-expanded={open}
              >
                {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                <span>{lang === "zh" ? "目录" : "Menu"}</span>
              </button>

              <div
                className={`absolute right-0 top-[calc(100%+10px)] w-[min(360px,calc(100vw-2rem))] rounded-3xl border border-black/10 bg-white/95 p-2 shadow-[0_22px_90px_rgba(0,0,0,0.22)] ${
                  open ? "block" : "hidden"
                }`}
                role="menu"
              >
                <div className="px-3 pb-2 pt-1 flex items-center justify-between">
                  <div className="text-[11px] font-medium tracking-widest text-black/45">
                    {lang === "zh" ? "目录" : "MENU"}
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      toggleLang();
                      setOpen(false);
                    }}
                    className="rounded-full border border-black/10 bg-white/80 px-3 py-1 text-[11px] font-medium text-black/55 transition hover:bg-white"
                  >
                    {lang === "zh" ? "EN" : "中文"}
                  </button>
                </div>

                <div className="px-3 pb-2 text-[11px] text-black/40">
                  {lang === "zh" ? "轻写 · 轻做" : "Write lightly · Make lightly"}
                </div>

                <div className="grid grid-cols-1 gap-1">
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
                        className={`flex items-center justify-between rounded-2xl px-4 py-3 transition ${
                          isActive
                            ? "bg-black/5 text-[#b45309]"
                            : "text-black/70 hover:bg-black/5 hover:text-black"
                        }`}
                        role="menuitem"
                      >
                        <span className="flex flex-col">
                          <span className="text-sm font-medium">{item.label}</span>
                          <span className="text-[11px] text-black/45">{item.desc}</span>
                        </span>
                        <span className="text-black/30">↗</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
