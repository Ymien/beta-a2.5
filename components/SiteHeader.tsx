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
            { href: "/", label: "首页", desc: "写作与实验的入口" },
            { href: "/blog/react-server-components", label: "随笔", desc: "文章、记录与想法" },
            { href: "/chat", label: "AI 聊天", desc: "多模型 · 思考模式" },
            { href: "/popup", label: "PopupMorph", desc: "弹窗形状动画生成器" },
            { href: "/tetris", label: "Neon Tetris", desc: "霓虹俄罗斯方块" },
            { href: "/game", label: "Cyber Match", desc: "记忆配对小游戏" },
          ]
        : [
            { href: "/", label: "Home", desc: "Start here" },
            { href: "/blog/react-server-components", label: "Notes", desc: "Posts and small essays" },
            { href: "/chat", label: "AI Chat", desc: "Multi-model · Thinking" },
            { href: "/popup", label: "PopupMorph", desc: "Popup shape animator" },
            { href: "/tetris", label: "Neon Tetris", desc: "Neon tetris" },
            { href: "/game", label: "Cyber Match", desc: "Memory match game" },
          ],
    [lang]
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-black/10 bg-[#fbf7ef]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold text-[#15130f]">
          <img
            src="/avatar.svg"
            alt="Xyu"
            className="h-7 w-7 rounded-full border border-black/10 bg-white/70"
          />
          <span className="text-base tracking-tight md:text-lg">Xyu</span>
        </Link>

        <div className="relative flex items-center gap-2">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/60 px-3 py-2 text-sm font-medium text-black/70 shadow-sm transition hover:bg-white"
            aria-label="打开导航"
            aria-expanded={open}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            <span className="hidden sm:inline">导航</span>
          </button>

          <div
            className={`absolute right-0 top-[calc(100%+10px)] w-[min(320px,calc(100vw-2rem))] rounded-3xl border border-black/10 bg-[#fffaf3] p-2 shadow-[0_22px_70px_rgba(0,0,0,0.18)] ${
              open ? "block" : "hidden"
            }`}
            role="menu"
          >
            <div className="px-3 pb-2 pt-1 flex items-center justify-between">
              <div className="text-[11px] font-medium tracking-widest text-black/40">
                PORTALS
              </div>
              <button
                type="button"
                onClick={() => {
                  toggleLang();
                  setOpen(false);
                }}
                className="rounded-full border border-black/10 bg-white/70 px-3 py-1 text-[11px] font-medium text-black/60 transition hover:bg-white"
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
                        ? "bg-black/5 text-[#b45309]"
                        : "text-black/70 hover:bg-black/5 hover:text-black"
                    }`}
                    role="menuitem"
                  >
                    <span className="flex flex-col">
                      <span className="font-medium">{item.label}</span>
                      <span className="text-[11px] text-black/40">{item.desc}</span>
                    </span>
                    <span className="text-black/25">↗</span>
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
