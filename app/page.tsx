"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Globe } from "lucide-react";

export default function Home() {
  const [lang, setLang] = useState<"zh" | "en">("zh");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const t = {
    zh: {
      navHome: "主页",
      navBlog: "文章",
      navProjects: "项目",
      langToggle: "EN",
      heroGreeting: "Hi, I'm Ymien 👋",
      heroTitle: "构建下一代 Web 体验",
      heroDesc: "我是一名前端开发者，热衷于极简设计与极致性能。这里是我的数字花园，记录着我的技术思考，以及使用 React、Next.js 和 Tailwind CSS 构建的创意实验。",
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
      readMore: "阅读更多 →",
      post1Title: "使用 Next.js 15 App Router 构建静态博客",
      post1Date: "2026年4月12日",
      post1Desc: "探讨在现代 React 生态中，如何利用最新的 Server Components 和 Turbopack 打造极速响应的静态博客。",
      post2Title: "Tailwind CSS v4 探索：极简与发光美学",
      post2Date: "2026年4月05日",
      post2Desc: "分享如何在不写一行自定义 CSS 的情况下，利用 Tailwind 的工具类实现极具质感的深色模式霓虹特效。",
      post3Title: "告别 Canvas：DOM 渲染游戏的可行性",
      post3Date: "2026年3月28日",
      post3Desc: "剖析我为何选择使用纯 React 状态和 CSS Grid 来重构经典的俄罗斯方块游戏。",
      footerCopyright: "© 2026 Ymien. All rights reserved.",
    },
    en: {
      navHome: "Home",
      navBlog: "Blog",
      navProjects: "Projects",
      langToggle: "中",
      heroGreeting: "Hi, I'm Ymien 👋",
      heroTitle: "Building the next-gen web.",
      heroDesc: "I'm a frontend developer passionate about minimalist design and extreme performance. Welcome to my digital garden, where I share my technical thoughts and creative experiments built with React, Next.js, and Tailwind CSS.",
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
      readMore: "Read more →",
      post1Title: "Building Static Blogs with Next.js 15 App Router",
      post1Date: "Apr 12, 2026",
      post1Desc: "Exploring how to leverage the latest Server Components and Turbopack to build blazing fast static blogs in the modern React ecosystem.",
      post2Title: "Tailwind CSS v4: Minimalism & Glow Aesthetics",
      post2Date: "Apr 05, 2026",
      post2Desc: "Sharing how to achieve high-quality dark mode neon effects using only Tailwind utility classes without writing custom CSS.",
      post3Title: "Farewell Canvas: The Viability of DOM Rendered Games",
      post3Date: "Mar 28, 2026",
      post3Desc: "Breaking down why I chose to rebuild the classic Tetris using pure React state and CSS Grid.",
      footerCopyright: "© 2026 Ymien. All rights reserved.",
    }
  }[lang];

  const toggleLang = () => setLang(lang === "zh" ? "en" : "zh");

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-300 font-sans selection:bg-cyan-500/30 selection:text-cyan-50 relative">
      
      {/* Background subtle noise/glow */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-cyan-500/5 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] bg-fuchsia-500/5 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay"></div>
      </div>

      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="font-bold text-white tracking-wider flex items-center gap-2 group z-50">
            <div className="w-6 h-6 bg-gradient-to-tr from-cyan-500 to-fuchsia-500 rounded-md group-hover:rotate-12 transition-transform duration-300"></div>
            Ymien
          </Link>
          
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-colors z-50"
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Fullscreen Collapsible Menu */}
        <div 
          className={`fixed inset-0 bg-[#0a0a0a]/95 backdrop-blur-xl transition-all duration-500 ease-in-out z-40 flex flex-col items-center justify-center ${
            isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
          }`}
        >
          <nav className="flex flex-col items-center gap-8 text-2xl font-light tracking-widest uppercase">
            <Link 
              href="#blog" 
              onClick={() => setIsMenuOpen(false)}
              className="text-zinc-400 hover:text-cyan-400 transition-colors"
            >
              {t.navBlog}
            </Link>
            <Link 
              href="#projects" 
              onClick={() => setIsMenuOpen(false)}
              className="text-zinc-400 hover:text-fuchsia-400 transition-colors"
            >
              {t.navProjects}
            </Link>
            <button 
              onClick={() => {
                toggleLang();
                setIsMenuOpen(false);
              }}
              className="mt-4 flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-colors"
            >
              <Globe className="w-5 h-5" />
              {t.langToggle}
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-4xl mx-auto px-6 pt-32 pb-24">
        
        {/* Hero Section */}
        <section className="py-16 md:py-24">
          <h2 className="text-cyan-400 font-mono text-sm tracking-widest uppercase mb-4 animate-fade-in-up">
            {t.heroGreeting}
          </h2>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">
            {t.heroTitle}
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 leading-relaxed max-w-2xl font-light">
            {t.heroDesc}
          </p>
          <div className="mt-10 flex items-center gap-4">
            <a href="https://github.com/Ymien" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white transition-all hover:scale-110">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path></svg>
            </a>
            <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-cyan-400 transition-all hover:scale-110">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"></path></svg>
            </a>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-16 border-t border-white/5">
          <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
            <span className="w-8 h-px bg-cyan-500"></span>
            {t.sectionProjects}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Synapse AI */}
            <Link href="/chat" className="group block p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-cyan-500/30 transition-all duration-300">
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
                </div>
                <svg className="w-5 h-5 text-zinc-600 group-hover:text-cyan-400 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
              </div>
              <h4 className="text-xl font-bold text-zinc-200 group-hover:text-cyan-300 transition-colors mb-2">{t.projectSynapseTitle}</h4>
              <p className="text-sm text-zinc-500 leading-relaxed">
                {t.projectSynapseDesc}
              </p>
              <div className="mt-4 flex gap-2">
                <span className="text-xs font-mono px-2 py-1 rounded bg-black/50 text-zinc-400 border border-white/5">React</span>
                <span className="text-xs font-mono px-2 py-1 rounded bg-black/50 text-zinc-400 border border-white/5">LLM UI</span>
              </div>
            </Link>

            {/* Neon Tetris */}
            <Link href="/tetris" className="group block p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-fuchsia-500/30 transition-all duration-300">
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-lg bg-fuchsia-500/10 flex items-center justify-center text-fuchsia-400 group-hover:scale-110 transition-transform">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
                </div>
                <svg className="w-5 h-5 text-zinc-600 group-hover:text-fuchsia-400 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
              </div>
              <h4 className="text-xl font-bold text-zinc-200 group-hover:text-fuchsia-300 transition-colors mb-2">{t.projectTetrisTitle}</h4>
              <p className="text-sm text-zinc-500 leading-relaxed">
                {t.projectTetrisDesc}
              </p>
              <div className="mt-4 flex gap-2">
                <span className="text-xs font-mono px-2 py-1 rounded bg-black/50 text-zinc-400 border border-white/5">Game</span>
                <span className="text-xs font-mono px-2 py-1 rounded bg-black/50 text-zinc-400 border border-white/5">Grid</span>
              </div>
            </Link>

            {/* Cyber Match */}
            <Link href="/game" className="group block p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-purple-500/30 transition-all duration-300">
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                </div>
                <svg className="w-5 h-5 text-zinc-600 group-hover:text-purple-400 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
              </div>
              <h4 className="text-xl font-bold text-zinc-200 group-hover:text-purple-300 transition-colors mb-2">{t.projectMatchTitle}</h4>
              <p className="text-sm text-zinc-500 leading-relaxed">
                {t.projectMatchDesc}
              </p>
              <div className="mt-4 flex gap-2">
                <span className="text-xs font-mono px-2 py-1 rounded bg-black/50 text-zinc-400 border border-white/5">Game</span>
                <span className="text-xs font-mono px-2 py-1 rounded bg-black/50 text-zinc-400 border border-white/5">3D</span>
              </div>
            </Link>

            {/* PopupMorph */}
            <Link href="/popup" className="group block p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-yellow-500/30 transition-all duration-300">
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center text-yellow-400 group-hover:scale-110 transition-transform">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"></path></svg>
                </div>
                <svg className="w-5 h-5 text-zinc-600 group-hover:text-yellow-400 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
              </div>
              <h4 className="text-xl font-bold text-zinc-200 group-hover:text-yellow-300 transition-colors mb-2">{t.projectPopupTitle}</h4>
              <p className="text-sm text-zinc-500 leading-relaxed">
                {t.projectPopupDesc}
              </p>
              <div className="mt-4 flex gap-2">
                <span className="text-xs font-mono px-2 py-1 rounded bg-black/50 text-zinc-400 border border-white/5">Tool</span>
                <span className="text-xs font-mono px-2 py-1 rounded bg-black/50 text-zinc-400 border border-white/5">Animation</span>
              </div>
            </Link>
          </div>
        </section>

        {/* Blog Posts Section */}
        <section id="blog" className="py-16 border-t border-white/5">
          <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
            <span className="w-8 h-px bg-fuchsia-500"></span>
            {t.sectionBlog}
          </h3>
          
          <div className="flex flex-col gap-8">
            <article className="group cursor-pointer">
              <time className="text-sm font-mono text-zinc-500 mb-2 block">{t.post1Date}</time>
              <h4 className="text-xl font-bold text-zinc-200 group-hover:text-cyan-400 transition-colors mb-3">
                {t.post1Title}
              </h4>
              <p className="text-zinc-400 text-sm leading-relaxed mb-3">
                {t.post1Desc}
              </p>
              <span className="text-sm text-cyan-500 font-medium group-hover:underline flex items-center gap-1">
                {t.readMore}
              </span>
            </article>

            <article className="group cursor-pointer">
              <time className="text-sm font-mono text-zinc-500 mb-2 block">{t.post2Date}</time>
              <h4 className="text-xl font-bold text-zinc-200 group-hover:text-fuchsia-400 transition-colors mb-3">
                {t.post2Title}
              </h4>
              <p className="text-zinc-400 text-sm leading-relaxed mb-3">
                {t.post2Desc}
              </p>
              <span className="text-sm text-fuchsia-500 font-medium group-hover:underline flex items-center gap-1">
                {t.readMore}
              </span>
            </article>

            <article className="group cursor-pointer">
              <time className="text-sm font-mono text-zinc-500 mb-2 block">{t.post3Date}</time>
              <h4 className="text-xl font-bold text-zinc-200 group-hover:text-purple-400 transition-colors mb-3">
                {t.post3Title}
              </h4>
              <p className="text-zinc-400 text-sm leading-relaxed mb-3">
                {t.post3Desc}
              </p>
              <span className="text-sm text-purple-500 font-medium group-hover:underline flex items-center gap-1">
                {t.readMore}
              </span>
            </article>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-[#0a0a0a] relative z-10">
        <div className="max-w-4xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-zinc-600 font-mono">
            {t.footerCopyright}
          </p>
          <div className="flex items-center gap-4 text-sm font-medium text-zinc-500">
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">GitHub</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
}