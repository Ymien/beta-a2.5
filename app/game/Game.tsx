"use client";

import { useReducer, useState, useEffect, useCallback, useRef, memo } from "react";
import Link from "next/link";

const EMOJIS = ["🚀", "🛸", "👾", "🤖", "🔮", "🌌", "💻", "⚡"];

interface CardData {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

interface GameState {
  cards: CardData[];
  flippedIndices: number[];
  moves: number;
  isWin: boolean;
}

type GameAction =
  | { type: "INIT_GAME" }
  | { type: "FLIP_CARD"; index: number }
  | { type: "CHECK_MATCH" }
  | { type: "RESET_MATCH" };

const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "INIT_GAME": {
      const pairedEmojis = [...EMOJIS, ...EMOJIS];
      const shuffledEmojis = shuffleArray(pairedEmojis);
      const shuffledCards = shuffledEmojis.map((emoji, index) => ({
        id: index,
        emoji,
        isFlipped: false,
        isMatched: false,
      }));
      return {
        cards: shuffledCards,
        flippedIndices: [],
        moves: 0,
        isWin: false,
      };
    }
    case "FLIP_CARD": {
      const { index } = action;
      if (
        state.flippedIndices.length === 2 ||
        state.cards[index].isFlipped ||
        state.cards[index].isMatched
      ) {
        return state;
      }
      const newCards = state.cards.map((card, i) =>
        i === index ? { ...card, isFlipped: true } : card
      );
      const newFlippedIndices = [...state.flippedIndices, index];
      const newMoves = newFlippedIndices.length === 2 ? state.moves + 1 : state.moves;
      return {
        ...state,
        cards: newCards,
        flippedIndices: newFlippedIndices,
        moves: newMoves,
      };
    }
    case "CHECK_MATCH": {
      if (state.flippedIndices.length !== 2) return state;
      const [firstIndex, secondIndex] = state.flippedIndices;
      const matchedCards = state.cards.map((card, i) =>
        i === firstIndex || i === secondIndex
          ? { ...card, isMatched: true }
          : card
      );
      const isWin = matchedCards.every((card) => card.isMatched);
      return {
        ...state,
        cards: matchedCards,
        flippedIndices: [],
        isWin,
      };
    }
    case "RESET_MATCH": {
      if (state.flippedIndices.length !== 2) return state;
      const [firstIndex, secondIndex] = state.flippedIndices;
      const resetCards = state.cards.map((card, i) =>
        i === firstIndex || i === secondIndex
          ? { ...card, isFlipped: false }
          : card
      );
      return {
        ...state,
        cards: resetCards,
        flippedIndices: [],
      };
    }
    default:
      return state;
  }
}

const Card = memo(({ card, index, onClick }: { card: CardData; index: number; onClick: (index: number) => void }) => (
  <div
    onClick={() => onClick(index)}
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
));
Card.displayName = "Card";

export default function Game() {
  const [state, dispatch] = useReducer(gameReducer, {
    cards: [],
    flippedIndices: [],
    moves: 0,
    isWin: false,
  });
  const [isClient, setIsClient] = useState(false);
  const [bestMoves, setBestMoves] = useState<number | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- standard Next.js hydration pattern
    setIsClient(true);
    try {
      const stored = localStorage.getItem("cyber-match-best");
      if (stored !== null) setBestMoves(Number(stored));
    } catch {}
    dispatch({ type: "INIT_GAME" });
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (state.isWin && (bestMoves === null || state.moves < bestMoves)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- saving best score on win
      setBestMoves(state.moves);
      try {
        localStorage.setItem("cyber-match-best", String(state.moves));
      } catch {}
    }
  }, [state.isWin, state.moves, bestMoves]);

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (state.flippedIndices.length === 2) {
      const [first, second] = state.flippedIndices;
      if (state.cards[first].emoji === state.cards[second].emoji) {
        const allMatchedAfter = state.cards.every(
          (card, i) => card.isMatched || i === first || i === second
        );
        if (allMatchedAfter) {
          timeoutRef.current = setTimeout(() => {
            dispatch({ type: "CHECK_MATCH" });
          }, 500);
        } else {
          dispatch({ type: "CHECK_MATCH" });
        }
      } else {
        timeoutRef.current = setTimeout(() => {
          dispatch({ type: "RESET_MATCH" });
        }, 1000);
      }
    }
  }, [state.flippedIndices, state.cards]);

  const initializeGame = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    dispatch({ type: "INIT_GAME" });
  }, []);

  const handleCardClick = useCallback((index: number) => {
    dispatch({ type: "FLIP_CARD", index });
  }, []);

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
            <span className="text-2xl font-bold">{state.moves}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-cyan-600 uppercase">最佳</span>
            <span className="text-2xl font-bold">{bestMoves !== null ? `${bestMoves}步` : "--"}</span>
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
        {state.cards.map((card, index) => (
          <Card key={card.id} card={card} index={index} onClick={handleCardClick} />
        ))}
      </div>

      {/* Win Modal */}
      {state.isWin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div className="bg-gray-900 border border-cyan-500/50 p-8 rounded-2xl shadow-[0_0_50px_rgba(34,211,238,0.3)] text-center flex flex-col items-center max-w-sm w-full animate-in zoom-in duration-300">
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-2">
              系统破解成功
            </h2>
            <p className="text-zinc-400 mb-6">
              共用 <span className="text-cyan-400 font-bold text-xl">{state.moves}</span> 步完成匹配
            </p>
            {bestMoves !== null && (
              <p className="text-zinc-400 mb-6">
                最佳记录: <span className="text-cyan-400 font-bold text-xl">{bestMoves}</span> 步
              </p>
            )}
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
