"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Menu, X } from "lucide-react";

type NavItem = {
  href: string;
  label: string;
};

export default function SiteHeader(props: { active?: string }) {
  const { active } = props;
  const [open, setOpen] = useState(false);

  const items = useMemo<NavItem[]>(
    () => [
      { href: "/", label: "首页" },
      { href: "/blog/react-server-components", label: "文章" },
      { href: "/chat", label: "AI 聊天" },
      { href: "/popup", label: "PopupMorph" },
      { href: "/tetris", label: "Neon Tetris" },
      { href: "/game", label: "Cyber Match" },
    ],
    []
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
            <div className="px-3 pb-2 pt-1 text-[11px] font-medium tracking-widest text-black/40">
              PORTALS
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
                    <span>{item.label}</span>
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
