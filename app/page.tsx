"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import SiteHeader from "@/components/SiteHeader";
import Hitokoto from "@/components/Hitokoto";
import MusicPlayer from "@/components/MusicPlayer";
import type { Post } from "@/lib/posts";
import { useLang } from "@/components/LangProvider";

export default function Home() {
  const { lang } = useLang();
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch("/api/posts")
      .then((r) => r.json())
      .then((data) => setPosts(data))
      .catch(() => setPosts([]));
  }, []);

  const t = useMemo(
    () =>
      lang === "zh"
        ? {
            heroTitle: "留白",
            heroSubtitle: "随想 · 随心",
            heroDesc:
              "把一些想法留在这里。不是宣言，也不赶进度。右上角目录是入口。",
            sectionNotes: "随想",
            readMore: "打开阅读 →",
            footerCopyright: "© 2026 Xyu · 留白",
          }
        : {
            heroTitle: "Blank Space",
            heroSubtitle: "Notes · Drift · By heart",
            heroDesc:
              "A small page to keep what passes through — a sentence, a sketch, a thought that refuses to leave.",
            sectionNotes: "Notes",
            readMore: "Read →",
            footerCopyright: "© 2026 Xyu · Blank Space",
          },
    [lang]
  );

  return (
    <div className="min-h-screen bg-[#fbf7ef] text-[#15130f]">
      <SiteHeader active="home" />

      {/* Main Content */}
      <main className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14">
        
        {/* Hero Section */}
        <section className="relative grid grid-cols-1 gap-10 overflow-hidden rounded-[32px] border border-black/10 bg-white/70 px-6 py-10 shadow-[0_18px_70px_rgba(0,0,0,0.08)] backdrop-blur-xl md:grid-cols-[1.15fr_0.85fr] md:px-10 md:py-14">
          <div className="flex flex-col items-start gap-6">
            <div className="relative inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/80 px-4 py-2 text-xs font-medium text-black/55">
              <img
                src="/avatar.svg"
                alt="Xyu"
                className="h-5 w-5 rounded-full border border-black/10 bg-white"
              />
              <span className="inline-flex h-2 w-2 rounded-full bg-[#22c55e]" />
              Xyu · {lang === "zh" ? "开发者" : "Developer"}
            </div>
            <h1 className="relative font-[var(--font-display)] text-5xl font-medium leading-[0.92] tracking-tight text-[#15130f] md:text-7xl">
              {t.heroTitle}
            </h1>
            <div className="relative text-sm font-medium tracking-[0.22em] text-black/45 uppercase">
              {t.heroSubtitle}
            </div>
            <p className="relative max-w-xl text-base leading-relaxed text-black/60 md:text-lg">
              {t.heroDesc}
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="https://github.com/Ymien"
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/80 px-5 py-2.5 text-sm font-medium text-black/70 shadow-sm transition hover:bg-white"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
                GitHub
              </a>
            </div>
          </div>
          <div className="relative flex items-center justify-center">
            <Hitokoto />
          </div>
        </section>

        {/* Blog Posts Section */}
        <section id="blog" className="mt-14">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="font-[var(--font-display)] text-2xl font-medium tracking-tight text-[#15130f] md:text-3xl">
              {t.sectionNotes}
            </h3>
            <div className="hidden text-sm text-black/40 md:block">Markdown</div>
          </div>
          
          <div className="flex flex-col gap-6 rounded-[28px] border border-black/10 bg-white/70 px-6 py-8 shadow-[0_18px_70px_rgba(0,0,0,0.06)] backdrop-blur-xl md:px-10 md:py-10">
            {posts.map(post => (
              <article key={post.slug} className="group flex flex-col md:flex-row gap-6 md:gap-12 items-start text-left">
                <time className="text-sm font-mono text-black/45 md:w-32 flex-shrink-0 md:pt-1">
                  {post.date}
                </time>
                <div className="flex-1">
                  <h4 className="text-xl md:text-2xl font-semibold text-[#15130f] group-hover:text-[#b45309] transition-colors mb-3">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h4>
                  <p className="text-black/60 leading-relaxed mb-3">
                    {post.excerpt}
                  </p>
                  <Link href={`/blog/${post.slug}`} className="text-sm text-[#b45309] font-medium group-hover:underline inline-flex items-center gap-2">
                    {t.readMore}
                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-black/10 bg-[#fbf7ef]">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-10 text-center text-sm text-black/45 md:flex-row md:px-6">
          <div>{t.footerCopyright}</div>
          <a
            href="https://github.com/Ymien"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black/55 transition hover:text-black"
          >
            GitHub
          </a>
        </div>
      </footer>

      <MusicPlayer />
    </div>
  );
}
