"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [lang, setLang] = useState<"zh" | "en">("zh");

  const toggleLang = () => {
    setLang(lang === "zh" ? "en" : "zh");
  };

  const content = {
    zh: {
      titlePrefix: "Welcome to ",
      titleHighlight: "网络小游戏",
      introTitle: "小游戏介绍",
      cyberMatchTitle: "🎮 Cyber Match (记忆翻牌)",
      cyberMatchDesc: "这是一款赛博朋克风格的记忆配对小游戏。网格中隐藏着成对的神秘符号。\n• 玩法：点击任意卡片即可翻开。\n• 规则：如果连续翻开的两张卡片图案相同，它们将保持翻开状态并闪烁霓虹光芒；如果图案不同，卡片会在短暂延迟后自动翻回背面。\n• 目标：运用你的短期记忆，找出所有匹配的卡片。全场卡片匹配成功即可完成系统破解！",
      neonTetrisTitle: "🎮 Neon Tetris (霓虹俄罗斯方块)",
      neonTetrisDesc: "这是一款带有动态霓虹发光特效的经典俄罗斯方块游戏，结合了毛玻璃面板与赛博朋克光影。\n• 操作：使用 [←][→] 左右移动方块，使用 [↑] 顺时针旋转方块，使用 [↓] 加速方块下落，按下 [空格键] 让方块瞬间降落到底部。\n• 移动端：界面下方会自动生成虚拟触控按键，方便在手机上畅玩。\n• 目标：将下落的方块紧密拼接，填满一整行即可消除并获得得分。连续消除更多行可获得分数加成，随着分数提升，方块下落速度也会越来越快！",
      cyberMatchBtn: "CYBER MATCH",
      neonTetrisBtn: "NEON TETRIS",
      langToggle: "English"
    },
    en: {
      titlePrefix: "Welcome to ",
      titleHighlight: "Web Mini-Games",
      introTitle: "Game Instructions",
      cyberMatchTitle: "🎮 Cyber Match (Memory Card)",
      cyberMatchDesc: "A cyberpunk-themed memory card game. A grid hides pairs of mysterious neon symbols.\n• How to play: Click any card to flip it over.\n• Rules: If two consecutive flipped cards have matching patterns, they will stay open with a neon glow; otherwise, they flip back automatically after a short delay.\n• Goal: Use your short-term memory to find all matching pairs. Match all cards to hack the system!",
      neonTetrisTitle: "🎮 Neon Tetris",
      neonTetrisDesc: "A classic Tetris game featuring dynamic neon glow effects, glassmorphism panels, and a cyberpunk atmosphere.\n• Controls: Use [←][→] arrow keys to move blocks left or right, [↑] to rotate blocks clockwise, [↓] to accelerate the drop, and press the [Spacebar] to hard drop blocks to the bottom.\n• Mobile: Virtual touch controls will automatically appear at the bottom of the screen for mobile gameplay.\n• Goal: Arrange the falling blocks tightly to fill entire rows. Filled rows will be cleared to score points. Clearing multiple rows at once grants bonus points. As your score increases, the blocks will fall faster!",
      cyberMatchBtn: "CYBER MATCH",
      neonTetrisBtn: "NEON TETRIS",
      langToggle: "中文"
    }
  };

  const t = content[lang];

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black min-h-screen relative">
      {/* 语言切换按钮 */}
      <div className="absolute top-6 right-6 z-50">
        <button 
          onClick={toggleLang}
          className="flex items-center gap-2 px-5 py-2.5 bg-zinc-800/80 hover:bg-zinc-700 dark:bg-white/10 dark:hover:bg-white/20 text-white border border-zinc-700 dark:border-white/20 rounded-full font-bold transition-all shadow-[0_0_15px_rgba(34,211,238,0.2)] hover:shadow-[0_0_20px_rgba(192,38,211,0.4)] backdrop-blur-md cursor-pointer"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"></path>
          </svg>
          {t.langToggle}
        </button>
      </div>

      <main className="flex flex-1 w-full max-w-4xl flex-col items-center justify-center py-20 px-8 bg-white dark:bg-black">
        <div className="flex flex-col items-center gap-10 w-full text-center">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight tracking-tight text-black dark:text-white drop-shadow-md">
            {t.titlePrefix} <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">{t.titleHighlight}</span>
          </h1>
          
          {/* 详细游戏介绍区块 */}
          <div className="w-full bg-zinc-100 dark:bg-zinc-900/50 p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm text-left">
            <h2 className="text-2xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
              {t.introTitle}
            </h2>
            
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-bold text-zinc-800 dark:text-zinc-200">{t.cyberMatchTitle}</h3>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed whitespace-pre-line">
                  {t.cyberMatchDesc}
                </p>
              </div>

              <div className="h-px w-full bg-zinc-200 dark:bg-zinc-800"></div>

              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-bold text-zinc-800 dark:text-zinc-200">{t.neonTetrisTitle}</h3>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed whitespace-pre-line">
                  {t.neonTetrisDesc}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 w-full justify-center mt-4">
            {/* Cyber Match Game Link */}
            <Link
              href="/game"
              className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-gradient-to-r from-purple-600 to-pink-600 font-mono rounded-xl hover:from-purple-500 hover:to-pink-500 shadow-[0_0_20px_rgba(192,38,211,0.4)] hover:shadow-[0_0_30px_rgba(192,38,211,0.6)] hover:-translate-y-1 overflow-hidden"
            >
              <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-black"></span>
              <span className="relative flex items-center gap-2">
                <svg className="w-6 h-6 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                {t.cyberMatchBtn}
              </span>
            </Link>

            {/* Neon Tetris Game Link */}
            <Link
              href="/tetris"
              className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-gradient-to-r from-cyan-500 to-blue-600 font-mono rounded-xl hover:from-cyan-400 hover:to-blue-500 shadow-[0_0_20px_rgba(34,211,238,0.4)] hover:shadow-[0_0_30px_rgba(34,211,238,0.6)] hover:-translate-y-1 overflow-hidden"
            >
              <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-black"></span>
              <span className="relative flex items-center gap-2">
                <svg className="w-6 h-6 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                {t.neonTetrisBtn}
              </span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
