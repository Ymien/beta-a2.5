"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowUpRight, FileText, Sparkles, WandSparkles } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import Hitokoto from "@/components/Hitokoto";
import MusicPlayer from "@/components/MusicPlayer";
import type { Post } from "@/lib/posts";
import { useLang } from "@/components/LangProvider";

export default function Home() {
  const { lang } = useLang();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    fetch("/api/posts", { signal: controller.signal })
      .then((r) => r.json())
      .then((data) => setPosts(Array.isArray(data) ? data : []))
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, []);

  const t =
    lang === "zh"
      ? {
          heroEyebrow: "个人站点 / Notes & Experiments",
          heroTitle: "把想法、实验和轻量作品放在同一张桌面上。",
          heroDesc:
            "我把文章、对话页面和小型互动项目整理成一个更清晰的入口。内容保持安静，布局更有秩序，移动端也更容易浏览。",
          heroPrimary: "查看最新文章",
          heroSecondary: "进入对话页",
          heroMeta: ["双语切换", "博客内容直读", "更清晰的导航"],
          featureTitle: "入口区",
          featureDesc: "从写作、AI 对话到互动实验，所有页面现在都有统一的视觉节奏。",
          postsTitle: "最新文章",
          postsDesc: "按时间排序的 Markdown 文章列表。",
          loading: "正在加载文章…",
          empty: "暂时还没有文章。",
          readMore: "继续阅读",
          footerCopyright: "© 2026 Xyu · Blank Space",
        }
      : {
          heroEyebrow: "Personal site / Notes & Experiments",
          heroTitle: "One calm surface for writing, experiments, and playful tools.",
          heroDesc:
            "Notes, small interactive pages, and AI experiments now share a cleaner layout with stronger hierarchy and a smoother mobile experience.",
          heroPrimary: "Browse latest notes",
          heroSecondary: "Open chat",
          heroMeta: ["Bilingual switch", "Direct blog reads", "Cleaner navigation"],
          featureTitle: "Entry points",
          featureDesc: "Writing, dialog, and experiments now follow the same visual rhythm.",
          postsTitle: "Latest notes",
          postsDesc: "Markdown posts ordered by date.",
          loading: "Loading posts…",
          empty: "No posts yet.",
          readMore: "Continue reading",
          footerCopyright: "© 2026 Xyu · Blank Space",
        };

  const featuredPost = posts[0];
  const morePosts = featuredPost ? posts.slice(1) : posts;
  const quickLinks = [
    {
      href: "/chat",
      label: lang === "zh" ? "对话" : "Dialog",
      desc: lang === "zh" ? "多模型聊天与交互" : "Multi-model conversation space",
    },
    {
      href: "/popup",
      label: "PopupMorph",
      desc: lang === "zh" ? "弹窗形状实验" : "Shape-morphing popup playground",
    },
    {
      href: "/tetris",
      label: "Tetris",
      desc: lang === "zh" ? "霓虹风格小游戏" : "Arcade-style neon blocks",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f6efe3] text-[#15130f]">
      <SiteHeader active="home" />

      <main className="mx-auto max-w-6xl px-4 pb-14 pt-6 md:px-6 md:pb-20 md:pt-8">
        <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="relative overflow-hidden rounded-[36px] border border-black/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.95),rgba(249,241,227,0.92))] px-6 py-8 shadow-[0_24px_90px_rgba(15,23,42,0.08)] md:px-10 md:py-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/80 px-4 py-2 text-xs font-semibold tracking-[0.18em] text-black/50 uppercase">
              <Sparkles className="h-3.5 w-3.5 text-[#b45309]" />
              {t.heroEyebrow}
            </div>

            <div className="mt-6 flex flex-col items-start gap-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/80 px-4 py-2 text-xs font-medium text-black/60">
                <Image
                  src="/avatar.svg"
                  alt="Xyu"
                  width={20}
                  height={20}
                  className="h-5 w-5 rounded-full border border-black/10 bg-white"
                />
                <span className="inline-flex h-2 w-2 rounded-full bg-[#22c55e]" />
                Xyu · {lang === "zh" ? "开发者" : "Developer"}
              </div>

              <h1 className="max-w-3xl font-[var(--font-display)] text-5xl leading-[0.95] font-medium tracking-tight text-[#15130f] md:text-7xl">
                {t.heroTitle}
              </h1>

              <p className="max-w-2xl text-base leading-8 text-black/65 md:text-lg">
                {t.heroDesc}
              </p>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="#posts"
                  className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-[#15130f] px-5 py-3 text-sm font-medium text-white transition hover:opacity-90"
                >
                  <FileText className="h-4 w-4" />
                  {t.heroPrimary}
                </Link>
                <Link
                  href="/chat"
                  className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-black/10 bg-white/80 px-5 py-3 text-sm font-medium text-black/70 transition hover:bg-white"
                >
                  <WandSparkles className="h-4 w-4 text-[#b45309]" />
                  {t.heroSecondary}
                </Link>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {t.heroMeta.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-black/10 bg-white/75 px-4 py-2 text-xs font-medium text-black/55"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-6">
            <div className="rounded-[32px] border border-black/10 bg-[#15130f] px-6 py-7 text-white shadow-[0_24px_90px_rgba(15,23,42,0.16)] md:px-7">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-[11px] font-semibold tracking-[0.2em] text-white/55 uppercase">
                    {t.featureTitle}
                  </div>
                  <p className="mt-3 max-w-sm text-sm leading-7 text-white/75">{t.featureDesc}</p>
                </div>
                <ArrowUpRight className="h-5 w-5 text-[#fbbf24]" />
              </div>

              <div className="mt-6 grid gap-3">
                {quickLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group flex cursor-pointer items-center justify-between rounded-2xl border border-white/10 bg-white/6 px-4 py-4 transition hover:bg-white/10"
                  >
                    <div>
                      <div className="text-sm font-medium text-white">{item.label}</div>
                      <div className="mt-1 text-xs leading-6 text-white/60">{item.desc}</div>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-white/55 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                ))}
              </div>
            </div>

            <div className="rounded-[32px] border border-black/10 bg-white/75 p-5 shadow-[0_20px_70px_rgba(15,23,42,0.08)] backdrop-blur-xl">
              <Hitokoto />
            </div>
          </div>
        </section>

        <section id="posts" className="mt-8 rounded-[36px] border border-black/10 bg-white/70 px-6 py-8 shadow-[0_24px_90px_rgba(15,23,42,0.06)] backdrop-blur-xl md:mt-10 md:px-8 md:py-10">
          <div className="flex flex-col gap-3 border-b border-black/10 pb-6 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="font-[var(--font-display)] text-3xl font-medium tracking-tight text-[#15130f] md:text-5xl">
                {t.postsTitle}
              </h2>
              <p className="mt-2 text-sm leading-7 text-black/55">{t.postsDesc}</p>
            </div>
            <div className="text-xs font-semibold tracking-[0.2em] text-black/35 uppercase">Markdown</div>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              {loading ? (
                <div className="rounded-[28px] border border-black/10 bg-[#fffaf3] px-6 py-10 text-sm text-black/50">
                  {t.loading}
                </div>
              ) : featuredPost ? (
                <Link
                  href={`/blog/${featuredPost.slug}`}
                  className="group block cursor-pointer rounded-[30px] border border-black/10 bg-[#fffaf3] px-6 py-7 transition hover:-translate-y-0.5 hover:shadow-[0_24px_70px_rgba(15,23,42,0.08)] md:px-7"
                >
                  <div className="text-xs font-semibold tracking-[0.2em] text-[#b45309] uppercase">
                    {lang === "zh" ? "精选文章" : "Featured note"}
                  </div>
                  <h3 className="mt-4 text-3xl font-semibold tracking-tight text-[#15130f] md:text-4xl">
                    {featuredPost.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-black/60 md:text-base">{featuredPost.excerpt}</p>
                  <div className="mt-8 flex items-center justify-between text-sm font-medium text-black/55">
                    <time>{featuredPost.date}</time>
                    <span className="inline-flex items-center gap-2 text-[#b45309]">
                      {t.readMore}
                      <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              ) : (
                <div className="rounded-[28px] border border-black/10 bg-[#fffaf3] px-6 py-10 text-sm text-black/50">
                  {t.empty}
                </div>
              )}
            </div>

            <div className="grid gap-4">
              {morePosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group flex cursor-pointer flex-col rounded-[28px] border border-black/10 bg-white px-5 py-5 transition hover:-translate-y-0.5 hover:bg-[#fffaf3] hover:shadow-[0_18px_60px_rgba(15,23,42,0.08)]"
                >
                  <div className="text-xs font-semibold tracking-[0.18em] text-black/35 uppercase">{post.date}</div>
                  <h3 className="mt-3 text-xl font-semibold tracking-tight text-[#15130f] transition-colors group-hover:text-[#b45309]">
                    {post.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-7 text-black/58">{post.excerpt}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[#b45309]">
                    {t.readMore}
                    <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-black/10 bg-[#f6efe3]">
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
