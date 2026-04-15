"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import SiteHeader from "@/components/SiteHeader";
import Hitokoto from "@/components/Hitokoto";
import MusicPlayer from "@/components/MusicPlayer";
import type { Post } from "@/lib/posts";

export default function Home() {
  const [lang, setLang] = useState<"zh" | "en">("zh");
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch("/api/posts")
      .then((r) => r.json())
      .then((data) => setPosts(data))
      .catch(() => setPosts([]));
  }, []);

  const t = {
    zh: {
      navHome: "主页",
      navBlog: "文章",
      navProjects: "项目",
      langToggle: "EN",
      heroGreeting: "Hi, I'm Xyu 👋",
      heroTitle: "代码与设计的交响乐",
      heroDesc: "我是一名充满激情的开发者，喜欢构建极致体验的 Web 应用与创意工具。这是我的数字花园，记录着我的思考、灵感与实验。",
      sectionProjects: "精选项目",
      projectSynapseTitle: "Synapse AI",
      projectSynapseDesc: "沉浸式前端大语言模型聊天模拟界面，具有极具科幻感的思考动画与流式打字输出。",
      projectTetrisTitle: "Neon Tetris",
      projectTetrisDesc: "摒弃 Canvas，采用纯 DOM + CSS Grid 打造的 60fps 赛博朋克风俄罗斯方块。",
      projectMatchTitle: "Cyber Match",
      projectMatchDesc: "考验短期记忆的卡片配对游戏，拥有平滑的 3D 翻转与霓虹边缘发光特效。",
      projectPopupTitle: "PopupMorph",
      projectPopupDesc: "极具创意的弹窗形状动画生成器，通过弹窗组合成形状并创建 GIF 动画效果。",
      sectionBlog: "最新文章",
      readMore: "阅读文章 →",
      footerCopyright: "© 2026 Xyu. All rights reserved.",
    },
    en: {
      navHome: "Home",
      navBlog: "Blog",
      navProjects: "Projects",
      langToggle: "中",
      heroGreeting: "Hi, I'm Xyu 👋",
      heroTitle: "A Symphony of Code & Design.",
      heroDesc: "I'm a passionate developer who loves building web apps and creative tools with extreme experiences. Welcome to my digital garden, where I log my thoughts, inspirations, and experiments.",
      sectionProjects: "Featured Projects",
      projectSynapseTitle: "Synapse AI",
      projectSynapseDesc: "An immersive frontend LLM chat simulation interface, featuring sci-fi thinking animations and streaming typewriter output.",
      projectTetrisTitle: "Neon Tetris",
      projectTetrisDesc: "Ditching Canvas for pure DOM + CSS Grid. A 60fps cyberpunk-themed Tetris game.",
      projectMatchTitle: "Cyber Match",
      projectMatchDesc: "A short-term memory card matching game with smooth 3D flips and neon edge-glow effects.",
      projectPopupTitle: "PopupMorph",
      projectPopupDesc: "A highly creative popup shape animation generator to build shapes and create GIF animations via system popups.",
      sectionBlog: "Latest Posts",
      readMore: "Read Post →",
      footerCopyright: "© 2026 Xyu. All rights reserved.",
    }
  }[lang];

  const toggleLang = () => setLang(lang === "zh" ? "en" : "zh");

  return (
    <div className="min-h-screen bg-[#f7f2e8] text-[#1e1c16]">
      <SiteHeader active="home" />

      {/* Main Content */}
      <main className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14">
        
        {/* Hero Section */}
        <section className="grid grid-cols-1 gap-10 rounded-[32px] border border-black/10 bg-white/60 px-6 py-10 shadow-[0_20px_60px_rgba(0,0,0,0.08)] backdrop-blur-xl md:grid-cols-[1.2fr_0.8fr] md:px-10 md:py-14">
          <div className="flex flex-col items-start gap-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/60 px-4 py-2 text-xs font-medium text-black/60">
              <span className="inline-flex h-2 w-2 rounded-full bg-[#22c55e]" />
              Xyu · Developer
              <button
                type="button"
                onClick={toggleLang}
                className="ml-2 rounded-full border border-black/10 bg-white/80 px-3 py-1 text-[11px] text-black/60 transition hover:bg-white"
              >
                {t.langToggle}
              </button>
            </div>
            <h1 className="text-4xl font-extrabold leading-[1.02] tracking-tight text-[#1e1c16] md:text-6xl">
              {t.heroTitle}
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-black/60 md:text-lg">
              {t.heroDesc}
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="https://github.com/Ymien"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-5 py-2.5 text-sm font-medium text-black/70 shadow-sm transition hover:bg-white"
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
              <Link
                href="/chat"
                className="inline-flex items-center gap-2 rounded-full bg-[#e7c7a3] px-5 py-2.5 text-sm font-medium text-[#1e1c16] shadow-sm transition hover:bg-[#ddb98f]"
              >
                进入 AI 聊天
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <Hitokoto />
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="mt-14">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-xl font-semibold text-[#1e1c16] md:text-2xl">
              {t.sectionProjects}
            </h3>
            <div className="hidden text-sm text-black/40 md:block">工具 · AI · 游戏</div>
          </div>
          
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
            <Link href="/chat" className="group block p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-cyan-500/30 transition-all duration-300 text-left">
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 group-hover:scale-110 group-hover:rotate-3 transition-transform">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
                </div>
                <svg className="w-5 h-5 text-zinc-600 group-hover:text-cyan-400 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
              </div>
              <h4 className="text-xl font-bold text-zinc-200 group-hover:text-cyan-300 transition-colors mb-3">{t.projectSynapseTitle}</h4>
              <p className="text-sm text-zinc-500 leading-relaxed">
                {t.projectSynapseDesc}
              </p>
            </Link>

            <Link href="/tetris" className="group block p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-fuchsia-500/30 transition-all duration-300 text-left">
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 rounded-xl bg-fuchsia-500/10 flex items-center justify-center text-fuchsia-400 group-hover:scale-110 group-hover:rotate-3 transition-transform">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
                </div>
                <svg className="w-5 h-5 text-zinc-600 group-hover:text-fuchsia-400 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
              </div>
              <h4 className="text-xl font-bold text-zinc-200 group-hover:text-fuchsia-300 transition-colors mb-3">{t.projectTetrisTitle}</h4>
              <p className="text-sm text-zinc-500 leading-relaxed">
                {t.projectTetrisDesc}
              </p>
            </Link>

            <Link href="/game" className="group block p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-purple-500/30 transition-all duration-300 text-left">
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 group-hover:scale-110 group-hover:rotate-3 transition-transform">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                </div>
                <svg className="w-5 h-5 text-zinc-600 group-hover:text-purple-400 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
              </div>
              <h4 className="text-xl font-bold text-zinc-200 group-hover:text-purple-300 transition-colors mb-3">{t.projectMatchTitle}</h4>
              <p className="text-sm text-zinc-500 leading-relaxed">
                {t.projectMatchDesc}
              </p>
            </Link>

            <Link href="/popup" className="group block p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-yellow-500/30 transition-all duration-300 text-left">
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 rounded-xl bg-yellow-500/10 flex items-center justify-center text-yellow-400 group-hover:scale-110 group-hover:rotate-3 transition-transform">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"></path></svg>
                </div>
                <svg className="w-5 h-5 text-zinc-600 group-hover:text-yellow-400 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
              </div>
              <h4 className="text-xl font-bold text-zinc-200 group-hover:text-yellow-300 transition-colors mb-3">{t.projectPopupTitle}</h4>
              <p className="text-sm text-zinc-500 leading-relaxed">
                {t.projectPopupDesc}
              </p>
            </Link>
          </div>
        </section>

        {/* Blog Posts Section */}
        <section id="blog" className="mt-14">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-xl font-semibold text-[#1e1c16] md:text-2xl">
              {t.sectionBlog}
            </h3>
            <div className="hidden text-sm text-black/40 md:block">Markdown · 阅读模式</div>
          </div>
          
          <div className="flex flex-col gap-6 rounded-[28px] border border-black/10 bg-white/60 px-6 py-8 shadow-[0_18px_60px_rgba(0,0,0,0.06)] backdrop-blur-xl md:px-10 md:py-10">
            {posts.map(post => (
              <article key={post.slug} className="group flex flex-col md:flex-row gap-6 md:gap-12 items-start text-left">
                <time className="text-sm font-mono text-zinc-500 md:w-32 flex-shrink-0 md:pt-1">
                  {post.date}
                </time>
                <div className="flex-1">
                  <h4 className="text-2xl font-bold text-zinc-200 group-hover:text-cyan-400 transition-colors mb-4">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h4>
                  <p className="text-zinc-400 leading-relaxed mb-4">
                    {post.excerpt}
                  </p>
                  <Link href={`/blog/${post.slug}`} className="text-sm text-cyan-500 font-medium group-hover:underline inline-flex items-center gap-2">
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
      <footer className="border-t border-black/10 bg-[#f7f2e8]">
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
