"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const EMOJIS = ["🚀", "🛸", "👾", "🤖", "🔮", "🌌", "💻", "⚡"];

interface CardData {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export default function Game() {
  const [cards, setCards] = useState<CardData[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [isWin, setIsWin] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    initializeGame();
  }, []);

  const initializeGame = () => {
    const shuffledCards = [...EMOJIS, ...EMOJIS]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        emoji,
        isFlipped: false,
        isMatched: false,
      }));
    setCards(shuffledCards);
    setFlippedIndices([]);
    setMoves(0);
    setIsWin(false);
  };

  const handleCardClick = (index: number) => {
    if (
      flippedIndices.length === 2 ||
      cards[index].isFlipped ||
      cards[index].isMatched
    ) {
      return;
    }

    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);

    const newFlippedIndices = [...flippedIndices, index];
    setFlippedIndices(newFlippedIndices);

    if (newFlippedIndices.length === 2) {
      setMoves((m) => m + 1);
      const [firstIndex, secondIndex] = newFlippedIndices;

      if (newCards[firstIndex].emoji === newCards[secondIndex].emoji) {
        // Match
        newCards[firstIndex].isMatched = true;
        newCards[secondIndex].isMatched = true;
        setCards(newCards);
        setFlippedIndices([]);

        if (newCards.every((card) => card.isMatched)) {
          setTimeout(() => setIsWin(true), 500);
        }
      } else {
        // No match
        setTimeout(() => {
          const resetCards = [...newCards];
          resetCards[firstIndex].isFlipped = false;
          resetCards[secondIndex].isFlipped = false;
          setCards(resetCards);
          setFlippedIndices([]);
        }, 1000);
      }
    }
  };

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-black text-cyan-400 font-mono flex flex-col items-center py-12 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-600/20 blur-[120px] rounded-full pointer-events-none" />

      {/* Header */}
      <div className="z-10 flex flex-col items-center mb-8 w-full max-w-md px-4">
        <Link href="/" className="self-start text-fuchsia-400 hover:text-fuchsia-300 mb-4 tracking-widest text-sm uppercase transition-colors flex items-center gap-2 drop-shadow-[0_0_8px_rgba(192,38,211,0.8)]">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          返回主站
        </Link>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]">
          CYBER MATCH
        </h1>
        <div className="flex justify-between w-full items-center bg-white/5 border border-white/10 backdrop-blur-md px-6 py-3 rounded-xl shadow-[0_0_30px_rgba(0,0,0,0.5)]">
          <div className="flex flex-col">
            <span className="text-xs text-cyan-600 uppercase">步数</span>
            <span className="text-2xl font-bold">{moves}</span>
          </div>
          <button
            onClick={initializeGame}
            className="px-6 py-2 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white rounded-lg uppercase tracking-widest text-sm font-bold shadow-[0_0_15px_rgba(147,51,234,0.5)] hover:shadow-[0_0_25px_rgba(34,211,238,0.6)] transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
          >
            重启系统
          </button>
        </div>
      </div>

      {/* Game Grid */}
      <div className="z-10 grid grid-cols-4 gap-3 md:gap-4 p-4 md:p-6 bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)]">
        {cards.map((card, index) => (
          <div
            key={card.id}
            onClick={() => handleCardClick(index)}
            className="relative w-16 h-20 md:w-20 md:h-24 lg:w-24 lg:h-32 cursor-pointer perspective-[1000px] group"
          >
            <div
              className={`w-full h-full transition-transform duration-500 preserve-3d ${
                card.isFlipped ? "rotate-y-180" : ""
              }`}
              style={{ transformStyle: 'preserve-3d', transform: card.isFlipped ? 'rotateY(180deg)' : 'none' }}
            >
              {/* Card Back (Unflipped) */}
              <div 
                className="absolute w-full h-full rounded-xl border border-white/10 bg-gradient-to-br from-gray-900 to-black shadow-[inset_0_0_20px_rgba(147,51,234,0.2)] group-hover:shadow-[inset_0_0_30px_rgba(34,211,238,0.4)] flex items-center justify-center transition-shadow"
                style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
              >
                <div className="w-8 h-8 border-2 border-cyan-500/50 rotate-45 group-hover:border-cyan-400 transition-colors" />
              </div>

              {/* Card Front (Flipped) */}
              <div
                className={`absolute w-full h-full rounded-xl border flex items-center justify-center text-3xl md:text-4xl lg:text-5xl ${
                  card.isMatched
                    ? "bg-cyan-900/40 border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.4)]"
                    : "bg-purple-900/40 border-purple-400 shadow-[0_0_20px_rgba(147,51,234,0.4)]"
                }`}
                style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
              >
                <span className="drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">
                  {card.emoji}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Win Modal */}
      {isWin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div className="bg-gray-900 border border-cyan-500/50 p-8 rounded-2xl shadow-[0_0_50px_rgba(34,211,238,0.3)] text-center flex flex-col items-center max-w-sm w-full animate-in zoom-in duration-300">
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-2">
              系统破解成功
            </h2>
            <p className="text-zinc-400 mb-6">
              共用 <span className="text-cyan-400 font-bold text-xl">{moves}</span> 步完成匹配
            </p>
            <button
              onClick={initializeGame}
              className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 text-black rounded-lg uppercase tracking-widest font-bold shadow-[0_0_20px_rgba(34,211,238,0.4)] hover:shadow-[0_0_30px_rgba(34,211,238,0.6)] transition-all cursor-pointer"
            >
              再次挑战
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
