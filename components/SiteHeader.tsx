"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Menu, X } from "lucide-react";

type NavItem = {
  href: string;
  label: string;
};

export default function SiteHeader(props: { active?: "home" | "popup" | "chat" }) {
  const { active } = props;
  const [open, setOpen] = useState(false);

  const items = useMemo<NavItem[]>(
    () => [
      { href: "/", label: "首页" },
      { href: "/popup", label: "PopupMorph" },
      { href: "/chat", label: "NeuraChat" },
    ],
    []
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-black/10 bg-[#f7f2e8]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 md:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold tracking-tight text-[#1e1c16]"
        >
          <span className="text-base md:text-lg">PopupMorph.dev</span>
        </Link>

        <nav className="hidden items-center gap-7 text-sm md:flex">
          {items.map((item) => {
            const isActive =
              (active === "home" && item.href === "/") ||
              (active === "popup" && item.href === "/popup") ||
              (active === "chat" && item.href === "/chat");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`transition-colors ${
                  isActive
                    ? "text-[#d97706]"
                    : "text-[#1e1c16]/70 hover:text-[#1e1c16]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-white/50 text-[#1e1c16] shadow-sm transition hover:bg-white md:hidden"
            aria-label="打开菜单"
            aria-expanded={open}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>

          <Link
            href="/chat"
            className="hidden items-center gap-2 rounded-full border border-[#d97706]/25 bg-[#fff6ea] px-4 py-2 text-sm font-medium text-[#b45309] shadow-sm transition hover:border-[#d97706]/40 hover:bg-[#fff1dd] md:inline-flex"
          >
            <span className="inline-flex h-2 w-2 rounded-full bg-[#22c55e]" />
            NeuraChat
          </Link>
        </div>
      </div>

      <div
        className={`md:hidden ${
          open ? "block" : "hidden"
        } border-t border-black/10 bg-[#f7f2e8]`}
      >
        <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3">
          {items.map((item) => {
            const isActive =
              (active === "home" && item.href === "/") ||
              (active === "popup" && item.href === "/popup") ||
              (active === "chat" && item.href === "/chat");
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`rounded-xl px-3 py-2 text-sm transition ${
                  isActive
                    ? "bg-black/5 text-[#d97706]"
                    : "text-[#1e1c16]/75 hover:bg-black/5 hover:text-[#1e1c16]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}

