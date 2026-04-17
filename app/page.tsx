"use client";

import Link from "next/link";
import { useState, useEffect, useCallback, useRef, memo } from "react";

type Color = "fuchsia" | "cyan" | "purple";

const gradientClasses: Record<Color, string> = {
  fuchsia: "from-fuchsia-500 to-purple-500",
  cyan: "from-cyan-400 to-blue-500",
  purple: "from-purple-500 to-pink-500",
};

const tagClasses: Record<Color, string> = {
  fuchsia: "bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/20",
  cyan: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  purple: "bg-purple-500/10 text-purple-400 border-purple-500/20",
};

const borderHoverClasses: Record<Color, string> = {
  fuchsia: "border-fuchsia-500/20 hover:border-fuchsia-500/60 hover:shadow-[0_15px_40px_-10px_rgba(192,38,211,0.3)]",
  cyan: "border-cyan-500/20 hover:border-cyan-500/60 hover:shadow-[0_15px_40px_-10px_rgba(34,211,238,0.3)]",
  purple: "border-purple-500/20 hover:border-purple-500/60 hover:shadow-[0_15px_40px_-10px_rgba(168,85,247,0.3)]",
};

const btnHoverClasses: Record<Color, string> = {
  fuchsia: "hover:bg-fuchsia-500 hover:border-fuchsia-500 text-white",
  cyan: "hover:bg-cyan-500 hover:border-cyan-500 text-black",
  purple: "hover:bg-purple-500 hover:border-purple-500 text-white",
};

const content = {
  zh: {
    langToggle: "English",
    greeting: "Hello, World! 欢迎来到我的赛博朋克极客主页。",
    aboutMeTitle: "关于我",
    aboutMeDesc: "我是一名热衷于构建具有极致交互和视觉体验的现代 Web 开发者。在这里，你可以体验我使用 Next.js 和 Tailwind CSS 构建的创意小游戏和 AI 交互原型。所有的项目都经过精心设计，追求卓越的性能与极致的赛博朋克美学。",
    projectsTitle: "项目橱窗",
    cyberMatchTitle: "🎮 Cyber Match",
    cyberMatchDesc: "这是一款赛博朋克风格的记忆配对小游戏。网格中隐藏着成对的神秘符号。\n• 玩法：点击翻开卡片。如果连续两张图案相同则匹配成功并闪烁霓虹光芒。\n• 目标：找出所有匹配的卡片完成系统破解！",
    neonTetrisTitle: "🎮 Neon Tetris",
    neonTetrisDesc: "带有动态霓虹发光特效的经典俄罗斯方块游戏，结合了毛玻璃面板与赛博朋克光影。\n• 操作：使用 [←][→] 左右移动，[↑] 旋转，[↓] 加速下落，[空格键] 瞬间降落。\n• 目标：紧密拼接消除满行以获取更高分数！",
    synapseAiTitle: "🤖 Synapse AI",
    synapseAiDesc: "纯净版前端大模型聊天交互界面体验。\n• 特性：拥有类似终端指令风格的 UI 设计，展示了沉浸式的 AI 思考动画和流畅的聊天信息流呈现。\n• 目标：体验下一代 AI 交互的前端视觉范式。",
    btnPlay: "TRY IT OUT",
  },
  en: {
    langToggle: "中文",
    greeting: "Hello, World! Welcome to my Cyberpunk Geek Portfolio.",
    aboutMeTitle: "About Me",
    aboutMeDesc: "I am a modern Web Developer passionate about building extreme interactive and visual experiences. Here, you can experience creative mini-games and AI interaction prototypes built with Next.js and Tailwind CSS. All projects are meticulously designed for outstanding performance and extreme cyberpunk aesthetics.",
    projectsTitle: "Projects Showcase",
    cyberMatchTitle: "🎮 Cyber Match",
    cyberMatchDesc: "A cyberpunk-themed memory card game hiding pairs of mysterious neon symbols.\n• How to play: Click to flip cards. Matching consecutive cards will trigger a neon glow.\n• Goal: Find all matching pairs to hack the system!",
    neonTetrisTitle: "🎮 Neon Tetris",
    neonTetrisDesc: "Classic Tetris featuring dynamic neon glow effects, glassmorphism panels, and a cyberpunk atmosphere.\n• Controls: Use arrow keys to move and rotate, down arrow to accelerate, and spacebar to hard drop.\n• Goal: Arrange blocks to fill rows and score points!",
    synapseAiTitle: "🤖 Synapse AI",
    synapseAiDesc: "A pure frontend LLM chat interface prototype.\n• Features: Terminal-style UI design, immersive AI thinking animations, and fluid chat message streams.\n• Goal: Experience the next-generation frontend visual paradigm for AI interactions.",
    btnPlay: "TRY IT OUT",
  }
};

type ContentKey = keyof typeof content;
type Lang = "zh" | "en";

// Memoized project card component
const ProjectCard = memo(({
  title,
  description,
  href,
  color,
  tag,
  btnText,
}: {
  title: string;
  description: string;
  href: string;
  color: Color;
  tag: string;
  btnText: string;
}) => (
  <div className={`group relative bg-zinc-900/40 border ${borderHoverClasses[color]} rounded-2xl p-6 flex flex-col justify-between overflow-hidden transition-all duration-500 hover:-translate-y-2`}>
    <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${gradientClasses[color]} transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}></div>
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-white group-hover:text-fuchsia-400 transition-colors">{title}</h3>
        <span className={`px-2 py-1 text-[10px] uppercase tracking-widest border rounded ${tagClasses[color]}`}>{tag}</span>
      </div>
      <p className="text-sm text-zinc-400 leading-relaxed whitespace-pre-line mb-8">
        {description}
      </p>
    </div>
    <Link
      href={href}
      className={`w-full py-3 px-4 bg-white/5 border border-white/10 ${btnHoverClasses[color]} text-sm font-bold tracking-widest uppercase rounded-xl transition-all flex items-center justify-center gap-2 group/btn`}
    >
      {btnText}
      <svg className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
    </Link>
  </div>
));
ProjectCard.displayName = "ProjectCard";

export default function Home() {
  const [lang, setLang] = useState<Lang>("zh");
  const [typedText, setTypedText] = useState("");
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const toggleLang = useCallback(() => {
    setLang(prevLang => prevLang === "zh" ? "en" : "zh");
  }, []);

  const t = content[lang as ContentKey];

  // Typewriter effect for the greeting
  useEffect(() => {
    let currentText = "";
    let currentIndex = 0;
    const fullText = t.greeting;
    
    // Reset
    setTypedText("");
    
    if (intervalRef.current) clearInterval(intervalRef.current);
    
    intervalRef.current = setInterval(() => {
      if (currentIndex < fullText.length) {
        currentText += fullText[currentIndex];
        setTypedText(currentText);
        currentIndex++;
      } else {
        if (intervalRef.current) clearInterval(intervalRef.current);
      }
    }, 50); // typing speed

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [t.greeting]);

  return (
    <div className="min-h-screen bg-black text-cyan-50 font-mono relative overflow-hidden selection:bg-fuchsia-500 selection:text-white">
      {/* Ambient Background Effects */}
      <div className="fixed top-[-20%] left-[-10%] w-[60%] h-[60%] bg-fuchsia-600/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-cyan-600/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")", backgroundRepeat: "repeat", mixBlendMode: "overlay" }}></div>

      {/* Header & Language Toggle */}
      <header className="relative z-50 flex justify-end p-6 max-w-6xl mx-auto w-full">
        <button 
          onClick={toggleLang}
          className="flex items-center gap-2 px-5 py-2.5 bg-zinc-900/80 hover:bg-zinc-800 text-white border border-zinc-700/50 rounded-full text-sm font-bold transition-all shadow-[0_0_15px_rgba(34,211,238,0.1)] hover:shadow-[0_0_20px_rgba(192,38,211,0.3)] backdrop-blur-md cursor-pointer uppercase tracking-widest"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"></path>
          </svg>
          {t.langToggle}
        </button>
      </header>

      <main className="relative z-10 flex flex-col items-center w-full max-w-6xl mx-auto px-6 pb-24">
        
        {/* Hero Section */}
        <section className="w-full py-16 md:py-24 flex flex-col items-start border-b border-white/10 mb-16">
          <div className="inline-block px-3 py-1 mb-6 border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs tracking-widest uppercase rounded-full shadow-[0_0_10px_rgba(34,211,238,0.2)]">
            v0.50.0 // ONLINE
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-fuchsia-500 drop-shadow-[0_0_15px_rgba(34,211,238,0.4)]">
              &lt;SYSTEM_INIT /&gt;
            </span>
          </h1>
          <div className="h-[80px] md:h-[60px] w-full text-xl md:text-2xl text-zinc-400 leading-relaxed font-light">
            <span className="text-cyan-400 mr-2">{">"}</span>
            {typedText}
            <span className="inline-block w-3 h-6 ml-1 bg-cyan-400 animate-pulse"></span>
          </div>
          
          <div className="mt-12 max-w-2xl bg-white/5 border border-white/10 p-6 md:p-8 rounded-2xl backdrop-blur-sm shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:border-white/20 transition-colors">
            <h2 className="text-lg uppercase tracking-widest text-fuchsia-400 mb-4 font-bold drop-shadow-[0_0_8px_rgba(192,38,211,0.5)]">
              {t.aboutMeTitle}
            </h2>
            <p className="text-zinc-300 leading-loose">
              {t.aboutMeDesc}
            </p>
            <div className="mt-6 flex gap-4">
              <a href="https://github.com/Ymien" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-cyan-400 transition-colors flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path></svg>
                GitHub
              </a>
            </div>
          </div>
        </section>

        {/* Projects Gallery */}
        <section className="w-full">
          <div className="flex items-center gap-4 mb-10">
            <h2 className="text-3xl font-bold tracking-widest text-white uppercase">
              {t.projectsTitle}
            </h2>
            <div className="h-px flex-1 bg-gradient-to-r from-cyan-500/50 to-transparent"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Project 1: Synapse AI */}
            <ProjectCard
              title={t.synapseAiTitle}
              description={t.synapseAiDesc}
              href="/chat"
              color="fuchsia"
              tag="LLM UI"
              btnText={t.btnPlay}
            />

            {/* Project 2: Neon Tetris */}
            <ProjectCard
              title={t.neonTetrisTitle}
              description={t.neonTetrisDesc}
              href="/tetris"
              color="cyan"
              tag="GAME"
              btnText={t.btnPlay}
            />

            {/* Project 3: Cyber Match */}
            <ProjectCard
              title={t.cyberMatchTitle}
              description={t.cyberMatchDesc}
              href="/game"
              color="purple"
              tag="GAME"
              btnText={t.btnPlay}
            />

          </div>
        </section>
      </main>
    </div>
  );
}