"use client";

import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [lang, setLang] = useState<"zh" | "en">("zh");

  const t = {
    zh: {
      overview: "概览",
      repositories: "项目仓库",
      blog: "个人博客",
      pinned: "置顶项目",
      synapseAiDesc: "基于大语言模型的前端聊天交互体验页，支持流式响应与思考动画。",
      neonTetrisDesc: "基于 React + Tailwind CSS 构建的赛博朋克风俄罗斯方块。",
      cyberMatchDesc: "赛博朋克风格的记忆配对小游戏，考验你的短期记忆力。",
      blogPosts: "最新博客文章",
      post1Title: "如何使用 Next.js 15 构建高性能静态站点",
      post1Date: "2026年4月12日",
      post2Title: "Tailwind CSS v4 中的设计系统与发光特效指南",
      post2Date: "2026年4月05日",
      post3Title: "放弃 Canvas：用纯 DOM 实现 60fps 的俄罗斯方块",
      post3Date: "2026年3月28日",
      langToggle: "English",
      bio: "热爱构建极致交互体验的现代前端开发者。开源爱好者。The Matrix has you.",
      follow: "关注",
      followers: "2.4k",
      following: "14",
      stars: "12.8k",
      contributions: "过去一年有 1,337 次提交",
      learnMore: "了解我们如何计算提交",
      less: "少",
      more: "多"
    },
    en: {
      overview: "Overview",
      repositories: "Repositories",
      blog: "Blog",
      pinned: "Pinned",
      synapseAiDesc: "Frontend LLM chat interface prototype supporting streaming responses and thinking animations.",
      neonTetrisDesc: "Cyberpunk-themed Tetris built with React + Tailwind CSS.",
      cyberMatchDesc: "Cyberpunk-themed memory matching game testing your short-term memory.",
      blogPosts: "Recent Blog Posts",
      post1Title: "Building High-Performance Static Sites with Next.js 15",
      post1Date: "Apr 12, 2026",
      post2Title: "Design Systems and Glow Effects in Tailwind CSS v4",
      post2Date: "Apr 05, 2026",
      post3Title: "Ditching Canvas: 60fps Tetris using Pure DOM",
      post3Date: "Mar 28, 2026",
      langToggle: "中文",
      bio: "Modern frontend developer passionate about extreme interactive experiences. Open source enthusiast. The Matrix has you.",
      follow: "Follow",
      followers: "2.4k",
      following: "14",
      stars: "12.8k",
      contributions: "1,337 contributions in the last year",
      learnMore: "Learn how we count contributions",
      less: "Less",
      more: "More"
    }
  }[lang];

  const toggleLang = () => setLang(lang === "zh" ? "en" : "zh");

  // 生成 GitHub 风格的提交日历
  const generateContributions = () => {
    const weeks = [];
    const colors = ['bg-[#161b22]', 'bg-[#161b22]', 'bg-[#161b22]', 'bg-[#0e4429]', 'bg-[#006d32]', 'bg-[#26a641]', 'bg-[#39d353]'];
    for (let i = 0; i < 52; i++) {
      const days = [];
      for (let j = 0; j < 7; j++) {
        // 随机分配颜色，让空白格子居多
        const color = colors[Math.floor(Math.random() * Math.random() * colors.length)];
        days.push(<div key={`${i}-${j}`} className={`w-[10px] h-[10px] rounded-[2px] ${color} outline outline-1 outline-white/5 -outline-offset-1`}></div>);
      }
      weeks.push(<div key={i} className="flex flex-col gap-[3px]">{days}</div>);
    }
    return weeks;
  };

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9] font-sans selection:bg-[#58a6ff]/30">
      
      {/* 顶部导航栏 */}
      <header className="w-full bg-[#010409] border-b border-[#30363d] px-4 md:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <svg height="32" aria-hidden="true" viewBox="0 0 16 16" version="1.1" width="32" className="fill-white">
            <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
          </svg>
          <div className="hidden md:flex bg-[#0d1117] border border-[#30363d] rounded-md px-3 py-1.5 text-sm text-[#8b949e] w-64 items-center">
            Search or jump to...
          </div>
        </div>
        <button 
          onClick={toggleLang}
          className="text-sm font-semibold border border-[#30363d] bg-[#21262d] hover:bg-[#30363d] px-3 py-1 rounded-md transition-colors"
        >
          {t.langToggle}
        </button>
      </header>

      {/* 个人主页标签栏 */}
      <div className="w-full border-b border-[#30363d] mt-6 sticky top-0 bg-[#0d1117] z-40">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 flex gap-8 text-sm">
          <div className="hidden md:block w-1/4"></div>
          <nav className="flex gap-2 md:gap-6 overflow-x-auto">
            <div className="flex items-center gap-2 py-3 border-b-2 border-[#f78166] text-[#c9d1d9] font-semibold cursor-pointer">
              <svg className="w-4 h-4 fill-current opacity-70" viewBox="0 0 16 16"><path d="M10.561 8.073a6.005 6.005 0 0 1 3.432 5.142.75.75 0 1 1-1.498.07 4.5 4.5 0 0 0-8.99 0 .75.75 0 0 1-1.498-.07 6.004 6.004 0 0 1 3.431-5.142 3.999 3.999 0 1 1 5.123 0ZM10.5 5a2.5 2.5 0 1 0-5 0 2.5 2.5 0 0 0 5 0Z"></path></svg>
              {t.overview}
            </div>
            <div className="flex items-center gap-2 py-3 border-b-2 border-transparent text-[#c9d1d9] hover:bg-[#b1bac41f] px-2 rounded-t-md cursor-pointer transition-colors">
              <svg className="w-4 h-4 fill-current opacity-70" viewBox="0 0 16 16"><path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z"></path></svg>
              {t.repositories}
              <span className="bg-[#b1bac41f] text-[#c9d1d9] text-xs py-0.5 px-2 rounded-full">3</span>
            </div>
            <div className="flex items-center gap-2 py-3 border-b-2 border-transparent text-[#c9d1d9] hover:bg-[#b1bac41f] px-2 rounded-t-md cursor-pointer transition-colors">
              <svg className="w-4 h-4 fill-current opacity-70" viewBox="0 0 16 16"><path d="M0 3.75C0 2.784.784 2 1.75 2h12.5c.966 0 1.75.784 1.75 1.75v8.5A1.75 1.75 0 0 1 14.25 14H1.75A1.75 1.75 0 0 1 0 12.25Zm1.75-.25a.25.25 0 0 0-.25.25v8.5c0 .138.112.25.25.25h12.5a.25.25 0 0 0 .25-.25v-8.5a.25.25 0 0 0-.25-.25ZM3.5 6.25a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5a.75.75 0 0 1-.75-.75Zm.75 2.25h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1 0-1.5Z"></path></svg>
              {t.blog}
            </div>
          </nav>
        </div>
      </div>

      {/* 主体内容 */}
      <main className="max-w-[1280px] mx-auto px-4 md:px-8 py-8 flex flex-col md:flex-row gap-8">
        
        {/* 左侧：个人信息侧边栏 */}
        <aside className="w-full md:w-1/4 flex flex-col relative md:-mt-12">
          <div className="w-1/2 md:w-full aspect-square rounded-full border border-[#30363d] overflow-hidden bg-[#161b22] mb-4 shadow-xl z-10 flex items-center justify-center relative group cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-fuchsia-500/20 group-hover:opacity-50 transition-opacity"></div>
            <svg className="w-1/2 h-1/2 fill-[#8b949e] group-hover:fill-[#c9d1d9] transition-colors" viewBox="0 0 16 16">
              <path d="M10.561 8.073a6.005 6.005 0 0 1 3.432 5.142.75.75 0 1 1-1.498.07 4.5 4.5 0 0 0-8.99 0 .75.75 0 0 1-1.498-.07 6.004 6.004 0 0 1 3.431-5.142 3.999 3.999 0 1 1 5.123 0ZM10.5 5a2.5 2.5 0 1 0-5 0 2.5 2.5 0 0 0 5 0Z"></path>
            </svg>
          </div>
          <h1 className="flex flex-col mb-4">
            <span className="text-2xl font-bold text-[#c9d1d9]">Web Developer</span>
            <span className="text-xl text-[#8b949e] font-light">ymien</span>
          </h1>
          <button className="w-full py-1.5 bg-[#21262d] border border-[#30363d] rounded-md text-sm font-semibold hover:bg-[#30363d] transition-colors mb-4">
            {t.follow}
          </button>
          <p className="text-[#c9d1d9] text-sm mb-4 leading-relaxed">
            {t.bio}
          </p>
          <div className="flex items-center text-sm text-[#8b949e] gap-1 mb-6 hover:text-[#58a6ff] cursor-pointer">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 16 16"><path d="M5.5 3.5a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM2 5.5a3.5 3.5 0 1 1 5.898 2.549 5.508 5.508 0 0 1 3.034 4.084.75.75 0 1 1-1.482.235 4 4 0 0 0-7.9 0 .75.75 0 0 1-1.482-.236A5.507 5.507 0 0 1 3.102 8.05 3.498 3.498 0 0 1 2 5.5ZM11 4a.75.75 0 1 0 0 1.5 1.5 1.5 0 0 1 .666 2.844.75.75 0 0 0-.416.672v.352a.75.75 0 0 0 .574.718 4.636 4.636 0 0 1 2.859 2.418.75.75 0 0 0 1.343-.67 6.136 6.136 0 0 0-3.774-3.19A3.001 3.001 0 0 0 11 4Z"></path></svg>
            <span className="font-bold text-[#c9d1d9]">{t.followers}</span> {t.followers.replace(/[0-9.k]/g, '')} · <span className="font-bold text-[#c9d1d9]">{t.following}</span> {t.following.replace(/[0-9]/g, '')}
          </div>
          <ul className="flex flex-col gap-2 text-sm text-[#c9d1d9]">
            <li className="flex items-center gap-2">
              <svg className="w-4 h-4 fill-[#8b949e]" viewBox="0 0 16 16"><path d="m12.596 11.596-3.535 3.536a1.5 1.5 0 0 1-2.122 0l-6.47-6.47a1.5 1.5 0 0 1-.44-1.06V2.5A1.5 1.5 0 0 1 1.5 1h5.104c.398 0 .779.158 1.06.44l6.47 6.47a1.5 1.5 0 0 1 0 2.122ZM1.5 2.5v5.104l6.47 6.47.071-.071L1.5 2.5Zm10.035 8.035L5.065 4.065 4 5.13l6.47 6.47 1.065-1.065ZM3.75 5.5a1.75 1.75 0 1 0 0-3.5 1.75 1.75 0 0 0 0 3.5Z"></path></svg>
              Next.js, React, Tailwind
            </li>
            <li className="flex items-center gap-2">
              <svg className="w-4 h-4 fill-[#8b949e]" viewBox="0 0 16 16"><path d="M7.75 2a.75.75 0 0 1 .75.75V7h4.25a.75.75 0 0 1 0 1.5H8.5v4.25a.75.75 0 0 1-1.5 0V8.5H2.75a.75.75 0 0 1 0-1.5H7V2.75A.75.75 0 0 1 7.75 2Z"></path></svg>
              <a href="https://beta-a2-5.vercel.app/" target="_blank" className="hover:text-[#58a6ff] hover:underline">beta-a2-5.vercel.app</a>
            </li>
          </ul>
        </aside>

        {/* 右侧：置顶项目与博客文章 */}
        <div className="w-full md:w-3/4 flex flex-col gap-6">
          
          {/* Pinned Repositories */}
          <div>
            <h2 className="text-base mb-3 text-[#c9d1d9]">{t.pinned}</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              
              {/* Repo 1: Synapse AI */}
              <Link href="/chat" className="border border-[#30363d] rounded-md p-4 bg-[#0d1117] flex flex-col justify-between hover:border-[#8b949e] transition-colors group">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <svg className="w-4 h-4 fill-[#8b949e]" viewBox="0 0 16 16"><path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z"></path></svg>
                    <span className="text-[#58a6ff] font-semibold text-sm group-hover:underline">Synapse-AI</span>
                    <span className="px-2 py-0.5 border border-[#30363d] text-[#8b949e] rounded-full text-xs ml-2">Public</span>
                  </div>
                  <p className="text-xs text-[#8b949e] mb-4">{t.synapseAiDesc}</p>
                </div>
                <div className="flex items-center gap-4 text-xs text-[#8b949e]">
                  <div className="flex items-center gap-1">
                    <span className="w-3 h-3 rounded-full bg-[#3178c6]"></span>
                    TypeScript
                  </div>
                  <div className="flex items-center gap-1 hover:text-[#58a6ff] cursor-pointer">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 16 16"><path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z"></path></svg>
                    4.2k
                  </div>
                </div>
              </Link>

              {/* Repo 2: Neon Tetris */}
              <Link href="/tetris" className="border border-[#30363d] rounded-md p-4 bg-[#0d1117] flex flex-col justify-between hover:border-[#8b949e] transition-colors group">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <svg className="w-4 h-4 fill-[#8b949e]" viewBox="0 0 16 16"><path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z"></path></svg>
                    <span className="text-[#58a6ff] font-semibold text-sm group-hover:underline">Neon-Tetris</span>
                    <span className="px-2 py-0.5 border border-[#30363d] text-[#8b949e] rounded-full text-xs ml-2">Public</span>
                  </div>
                  <p className="text-xs text-[#8b949e] mb-4">{t.neonTetrisDesc}</p>
                </div>
                <div className="flex items-center gap-4 text-xs text-[#8b949e]">
                  <div className="flex items-center gap-1">
                    <span className="w-3 h-3 rounded-full bg-[#3178c6]"></span>
                    TypeScript
                  </div>
                  <div className="flex items-center gap-1 hover:text-[#58a6ff] cursor-pointer">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 16 16"><path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z"></path></svg>
                    5.1k
                  </div>
                </div>
              </Link>

              {/* Repo 3: Cyber Match */}
              <Link href="/game" className="border border-[#30363d] rounded-md p-4 bg-[#0d1117] flex flex-col justify-between hover:border-[#8b949e] transition-colors group lg:col-span-2">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <svg className="w-4 h-4 fill-[#8b949e]" viewBox="0 0 16 16"><path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z"></path></svg>
                    <span className="text-[#58a6ff] font-semibold text-sm group-hover:underline">Cyber-Match</span>
                    <span className="px-2 py-0.5 border border-[#30363d] text-[#8b949e] rounded-full text-xs ml-2">Public</span>
                  </div>
                  <p className="text-xs text-[#8b949e] mb-4">{t.cyberMatchDesc}</p>
                </div>
                <div className="flex items-center gap-4 text-xs text-[#8b949e]">
                  <div className="flex items-center gap-1">
                    <span className="w-3 h-3 rounded-full bg-[#3178c6]"></span>
                    TypeScript
                  </div>
                  <div className="flex items-center gap-1 hover:text-[#58a6ff] cursor-pointer">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 16 16"><path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z"></path></svg>
                    3.5k
                  </div>
                </div>
              </Link>

            </div>
          </div>

          {/* 模拟代码贡献图 (Contribution Graph) */}
          <div className="mt-4">
            <h2 className="text-base mb-3 text-[#c9d1d9]">{t.contributions}</h2>
            <div className="border border-[#30363d] rounded-md p-4 bg-[#0d1117] overflow-x-auto">
              <div className="flex gap-[3px] min-w-max">
                {generateContributions()}
              </div>
              <div className="flex justify-between items-center text-xs text-[#8b949e] mt-2">
                <span className="hover:text-[#58a6ff] cursor-pointer">{t.learnMore}</span>
                <div className="flex items-center gap-1">
                  {t.less}
                  <div className="w-[10px] h-[10px] rounded-[2px] bg-[#161b22] outline outline-1 outline-white/5 -outline-offset-1"></div>
                  <div className="w-[10px] h-[10px] rounded-[2px] bg-[#0e4429] outline outline-1 outline-white/5 -outline-offset-1"></div>
                  <div className="w-[10px] h-[10px] rounded-[2px] bg-[#006d32] outline outline-1 outline-white/5 -outline-offset-1"></div>
                  <div className="w-[10px] h-[10px] rounded-[2px] bg-[#26a641] outline outline-1 outline-white/5 -outline-offset-1"></div>
                  <div className="w-[10px] h-[10px] rounded-[2px] bg-[#39d353] outline outline-1 outline-white/5 -outline-offset-1"></div>
                  {t.more}
                </div>
              </div>
            </div>
          </div>

          {/* 博客文章列表 */}
          <div className="mt-4">
            <h2 className="text-base mb-3 text-[#c9d1d9] flex items-center gap-2">
              <svg className="w-4 h-4 fill-[#8b949e]" viewBox="0 0 16 16"><path d="M0 3.75C0 2.784.784 2 1.75 2h12.5c.966 0 1.75.784 1.75 1.75v8.5A1.75 1.75 0 0 1 14.25 14H1.75A1.75 1.75 0 0 1 0 12.25Zm1.75-.25a.25.25 0 0 0-.25.25v8.5c0 .138.112.25.25.25h12.5a.25.25 0 0 0 .25-.25v-8.5a.25.25 0 0 0-.25-.25ZM3.5 6.25a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5a.75.75 0 0 1-.75-.75Zm.75 2.25h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1 0-1.5Z"></path></svg>
              {t.blogPosts}
            </h2>
            <div className="flex flex-col border border-[#30363d] rounded-md overflow-hidden bg-[#0d1117]">
              <div className="p-4 border-b border-[#30363d] hover:bg-[#161b22] transition-colors cursor-pointer group">
                <h3 className="text-[#58a6ff] font-semibold text-base mb-1 group-hover:underline">{t.post1Title}</h3>
                <p className="text-xs text-[#8b949e]">{t.post1Date}</p>
              </div>
              <div className="p-4 border-b border-[#30363d] hover:bg-[#161b22] transition-colors cursor-pointer group">
                <h3 className="text-[#58a6ff] font-semibold text-base mb-1 group-hover:underline">{t.post2Title}</h3>
                <p className="text-xs text-[#8b949e]">{t.post2Date}</p>
              </div>
              <div className="p-4 hover:bg-[#161b22] transition-colors cursor-pointer group">
                <h3 className="text-[#58a6ff] font-semibold text-base mb-1 group-hover:underline">{t.post3Title}</h3>
                <p className="text-xs text-[#8b949e]">{t.post3Date}</p>
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* 底部 Footer */}
      <footer className="max-w-[1280px] mx-auto px-4 md:px-8 py-10 mt-10 border-t border-[#30363d] text-xs text-[#8b949e] flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <svg className="w-6 h-6 fill-current" viewBox="0 0 16 16"><path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path></svg>
          <span>© 2026 Web Developer, Inc.</span>
        </div>
        <div className="flex gap-4 flex-wrap justify-center">
          <span className="hover:text-[#58a6ff] hover:underline cursor-pointer">Terms</span>
          <span className="hover:text-[#58a6ff] hover:underline cursor-pointer">Privacy</span>
          <span className="hover:text-[#58a6ff] hover:underline cursor-pointer">Security</span>
          <span className="hover:text-[#58a6ff] hover:underline cursor-pointer">Status</span>
          <span className="hover:text-[#58a6ff] hover:underline cursor-pointer">Docs</span>
        </div>
      </footer>
    </div>
  );
}