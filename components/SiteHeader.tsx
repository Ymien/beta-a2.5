"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { Compass, Languages, Menu, Sparkles, X } from "lucide-react";
import { useLang } from "@/components/LangProvider";

type NavItem = {
  href: string;
  label: string;
  desc: string;
};

export default function SiteHeader(props: { active?: string }) {
  const { active } = props;
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
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

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/" || active === "home";
    }

    if (href.startsWith("/blog/")) {
      return pathname.startsWith("/blog/") || active === "/blog";
    }

    return pathname === href || pathname.startsWith(`${href}/`) || active === href;
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-transparent">
      <div className="mx-auto max-w-6xl px-4 py-4 md:px-6">
        <div className="overflow-hidden rounded-[32px] border border-black/10 bg-[rgba(255,251,245,0.8)] shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur-2xl">
          <div className="flex items-center justify-between gap-4 px-4 py-3 md:px-6">
            <Link href="/" className="flex min-w-0 items-center gap-3 rounded-full pr-2 transition hover:opacity-90">
              <div className="flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white/90 p-1 shadow-sm">
                <img src="/avatar.svg" alt="Xyu" className="h-full w-full rounded-full" />
              </div>
              <div className="min-w-0">
                <div className="font-[var(--font-display)] text-xl font-medium tracking-tight text-[#15130f]">
                  Blank Space
                </div>
                <div className="truncate text-[11px] tracking-[0.22em] text-black/45 uppercase">
                  {lang === "zh" ? "写作 · 实验 · 小作品" : "Notes · Experiments · Play"}
                </div>
              </div>
            </Link>

            <nav className="hidden items-center gap-2 lg:flex" aria-label={lang === "zh" ? "主导航" : "Primary navigation"}>
              {items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`inline-flex cursor-pointer items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${
                    isActive(item.href)
                      ? "bg-[#15130f] text-white shadow-[0_12px_30px_rgba(21,19,15,0.18)]"
                      : "bg-white/70 text-black/65 hover:bg-white hover:text-black"
                  }`}
                >
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>

            <div className="relative flex items-center gap-2">
              <button
                type="button"
                onClick={toggleLang}
                className="hidden cursor-pointer items-center gap-2 rounded-full border border-black/10 bg-white/75 px-4 py-2 text-sm font-medium text-black/70 transition hover:bg-white md:inline-flex"
                aria-label={lang === "zh" ? "切换语言" : "Toggle language"}
              >
                <Languages className="h-4 w-4" />
                <span>{lang === "zh" ? "EN" : "中文"}</span>
              </button>

              <button
                type="button"
                onClick={() => setOpen((value) => !value)}
                className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-black/10 bg-white/75 px-4 py-2 text-sm font-medium text-black/70 transition hover:bg-white lg:hidden"
                aria-label={lang === "zh" ? "打开目录" : "Open menu"}
                aria-expanded={open}
              >
                {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                <span>{lang === "zh" ? "目录" : "Menu"}</span>
              </button>

              <div
                className={`absolute right-0 top-[calc(100%+12px)] w-[min(380px,calc(100vw-2rem))] rounded-[28px] border border-black/10 bg-white/95 p-3 shadow-[0_30px_90px_rgba(15,23,42,0.16)] ${
                  open ? "block" : "hidden"
                }`}
                role="menu"
              >
                <div className="flex items-center justify-between rounded-2xl bg-[#f6efe3] px-4 py-3">
                  <div>
                    <div className="text-[11px] font-semibold tracking-[0.2em] text-black/45 uppercase">
                      {lang === "zh" ? "导航" : "Explore"}
                    </div>
                    <div className="mt-1 text-sm text-black/65">
                      {lang === "zh" ? "文章、实验和互动页面入口" : "Jump between notes, tools, and playful pages."}
                    </div>
                  </div>
                  <Compass className="h-5 w-5 text-[#b45309]" />
                </div>

                <div className="mt-3 grid grid-cols-1 gap-2">
                  {items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={`flex cursor-pointer items-start justify-between rounded-2xl px-4 py-3 transition ${
                        isActive(item.href)
                          ? "bg-[#15130f] text-white"
                          : "bg-[#fffaf3] text-black/75 hover:bg-[#f6efe3] hover:text-black"
                      }`}
                      role="menuitem"
                    >
                      <span>
                        <span className="block text-sm font-medium">{item.label}</span>
                        <span className={`mt-1 block text-[11px] ${isActive(item.href) ? "text-white/70" : "text-black/45"}`}>
                          {item.desc}
                        </span>
                      </span>
                      <Sparkles className={`mt-0.5 h-4 w-4 ${isActive(item.href) ? "text-white/80" : "text-[#b45309]"}`} />
                    </Link>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => {
                    toggleLang();
                    setOpen(false);
                  }}
                  className="mt-3 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm font-medium text-black/70 transition hover:bg-[#f6efe3] md:hidden"
                >
                  <Languages className="h-4 w-4" />
                  <span>{lang === "zh" ? "切换到 English" : "切换到中文"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
