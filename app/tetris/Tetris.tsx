"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";

// --- 俄罗斯方块常量与游戏逻辑配置 ---
const COLS = 10; // 游戏区域总列数
const ROWS = 20; // 游戏区域总行数
const BLOCK_SIZE = 30; // 单个方块的像素大小估算值

// 方块的形状定义，0代表空白，数字代表方块种类及颜色索引
const SHAPES = [
  [], // 索引0：空
  [[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]], // 索引1：I型长条
  [[2, 0, 0], [2, 2, 2], [0, 0, 0]], // 索引2：J型
  [[0, 0, 3], [3, 3, 3], [0, 0, 0]], // 索引3：L型
  [[4, 4], [4, 4]], // 索引4：O型方块
  [[0, 5, 5], [5, 5, 0], [0, 0, 0]], // 索引5：S型
  [[0, 6, 0], [6, 6, 6], [0, 0, 0]], // 索引6：T型
  [[7, 7, 0], [0, 7, 7], [0, 0, 0]]  // 索引7：Z型
];

// Tailwind CSS 的特效类映射表，为每种方块赋予独特的赛博朋克发光与毛玻璃效果
const TAILWIND_GLOWS = [
  "", // 空白
  "shadow-[0_0_10px_#00ffff] bg-[#00ffff]/80 border-[#00ffff]", // I - 青色
  "shadow-[0_0_10px_#0000ff] bg-[#0000ff]/80 border-[#0000ff]", // J - 蓝色
  "shadow-[0_0_10px_#ff7f00] bg-[#ff7f00]/80 border-[#ff7f00]", // L - 橙色
  "shadow-[0_0_10px_#ffff00] bg-[#ffff00]/80 border-[#ffff00]", // O - 黄色
  "shadow-[0_0_10px_#00ff00] bg-[#00ff00]/80 border-[#00ff00]", // S - 绿色
  "shadow-[0_0_10px_#800080] bg-[#800080]/80 border-[#800080]", // T - 紫色
  "shadow-[0_0_10px_#ff0000] bg-[#ff0000]/80 border-[#ff0000]"  // Z - 红色
];

// 辅助函数：初始化一个 20x10 的全0二维数组作为空游戏面板
const createEmptyBoard = () => Array.from({ length: ROWS }, () => Array(COLS).fill(0));

// 辅助函数：随机生成一个新的方块及其初始坐标
const randomPiece = () => {
  const typeId = Math.floor(Math.random() * 7) + 1; // 随机 1-7
  return {
    shape: SHAPES[typeId],
    id: typeId,
    x: Math.floor(COLS / 2) - Math.floor(SHAPES[typeId][0].length / 2), // 居中生成
    y: 0 // 顶部生成
  };
};

export default function Tetris() {
  // --- 状态定义 ---
  const [board, setBoard] = useState<number[][]>(createEmptyBoard()); // 游戏面板的状态（已固定的方块）
  const [piece, setPiece] = useState(randomPiece()); // 当前正在下落的方块
  const [nextPiece, setNextPiece] = useState(randomPiece()); // 预览中的下一个方块
  const [gameOver, setGameOver] = useState(false); // 游戏是否结束的标志位
  const [isPaused, setIsPaused] = useState(false); // 游戏是否暂停的标志位
  const [score, setScore] = useState(0); // 当前得分
  const [level, setLevel] = useState(1); // 当前等级
  const [lines, setLines] = useState(0); // 累计消除的行数
  
  // 使用 useRef 记录 requestAnimationFrame 的 ID 和上一次渲染时间，用于平滑游戏循环
  const requestRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  // 根据等级计算下落间隔，最高速度限制为 100ms
  const dropInterval = Math.max(100, 1000 - (level - 1) * 100);

  // 初始化/重置游戏状态
  const resetGame = () => {
    setBoard(createEmptyBoard());
    setPiece(randomPiece());
    setNextPiece(randomPiece());
    setScore(0);
    setLevel(1);
    setLines(0);
    setGameOver(false);
    setIsPaused(false);
  };

  // 核心逻辑：碰撞检测，检查目标位置是否超出边界或与已存在的方块重叠
  const isCollision = (pShape: number[][], pX: number, pY: number, currentBoard: number[][]) => {
    for (let y = 0; y < pShape.length; y++) {
      for (let x = 0; x < pShape[y].length; x++) {
        if (pShape[y][x] !== 0) {
          const newX = pX + x;
          const newY = pY + y;
          if (newX < 0 || newX >= COLS || newY >= ROWS || (newY >= 0 && currentBoard[newY][newX] !== 0)) {
            return true; // 发生碰撞
          }
        }
      }
    }
    return false; // 无碰撞
  };

  // 核心逻辑：将当前下落到底部的方块合并到静态面板（board）中
  const mergePieceToBoard = () => {
    const newBoard = board.map(row => [...row]);
    piece.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value !== 0 && piece.y + y >= 0) {
          newBoard[piece.y + y][piece.x + x] = value;
        }
      });
    });

    // 检查并消除所有填满的行
    let linesCleared = 0;
    for (let y = ROWS - 1; y >= 0; y--) {
      if (newBoard[y].every(cell => cell !== 0)) {
        newBoard.splice(y, 1); // 移除填满的行
        newBoard.unshift(Array(COLS).fill(0)); // 顶部补充新的空行
        linesCleared++;
        y++; // 由于移除了当前行，需要重新检查当前索引位置
      }
    }

    // 消除行后的得分和等级计算
    if (linesCleared > 0) {
      const newLines = lines + linesCleared;
      setLines(newLines);
      // 得分权重数组：0行, 1行, 2行, 3行, 4行
      setScore(s => s + [0, 100, 300, 500, 800][linesCleared] * level);
      setLevel(Math.floor(newLines / 10) + 1); // 每 10 行升一级
    }

    setBoard(newBoard);
    
    // 生成下一个方块
    const newP = nextPiece;
    setNextPiece(randomPiece());
    
    // 如果新方块在初始位置就发生碰撞，说明堆满了，游戏结束
    if (isCollision(newP.shape, newP.x, newP.y, newBoard)) {
      setGameOver(true);
    } else {
      setPiece(newP);
    }
  };

  // --- 操作与控制逻辑 ---
  // 向下移动方块
  const moveDown = useCallback(() => {
    if (!isCollision(piece.shape, piece.x, piece.y + 1, board)) {
      setPiece(prev => ({ ...prev, y: prev.y + 1 }));
    } else {
      mergePieceToBoard(); // 如果向下碰撞，则合并到面板
    }
  }, [piece, board]);

  // 水平移动方块（dir: -1 左移，1 右移）
  const moveHorizontal = (dir: number) => {
    if (!isCollision(piece.shape, piece.x + dir, piece.y, board)) {
      setPiece(prev => ({ ...prev, x: prev.x + dir }));
    }
  };

  // 旋转方块
  const rotate = () => {
    // 矩阵顺时针旋转90度
    const rotated = piece.shape[0].map((_, index) => 
      piece.shape.map(row => row[index]).reverse()
    );
    // 只有在旋转后不发生碰撞时才应用旋转
    if (!isCollision(rotated, piece.x, piece.y, board)) {
      setPiece(prev => ({ ...prev, shape: rotated }));
    }
  };

  // 硬降落（瞬间落到底部）
  const hardDrop = () => {
    let newY = piece.y;
    while (!isCollision(piece.shape, piece.x, newY + 1, board)) {
      newY++;
    }
    setPiece(prev => ({ ...prev, y: newY }));
    // 下一次 game tick 会处理合并
  };

  // --- 游戏主循环 ---
  const gameLoop = useCallback((time: number) => {
    if (gameOver || isPaused) return;

    if (time - lastTimeRef.current > dropInterval) {
      moveDown();
      lastTimeRef.current = time;
    }
    requestRef.current = requestAnimationFrame(gameLoop);
  }, [moveDown, dropInterval, gameOver, isPaused]);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(requestRef.current); // 组件卸载时清理定时器
  }, [gameLoop]);

  // --- 键盘事件监听 ---
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameOver || isPaused) return;
      switch(e.key) {
        case "ArrowLeft": moveHorizontal(-1); break;
        case "ArrowRight": moveHorizontal(1); break;
        case "ArrowDown": moveDown(); break;
        case "ArrowUp": rotate(); break;
        case " ": hardDrop(); break;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown); // 卸载时清理事件监听
  }, [piece, board, gameOver, isPaused]);

  // --- UI 渲染辅助函数 ---
  // 渲染游戏网格中的单个小方格
  const renderCell = (value: number, key: string, extraClasses = "") => (
    <div 
      key={key} 
      className={`w-full h-full border border-white/5 rounded-sm transition-all duration-100 ${value ? TAILWIND_GLOWS[value] : 'bg-white/5'} ${extraClasses}`}
    />
  );

  return (
    <div className="min-h-screen bg-black font-mono flex flex-col items-center py-8 relative overflow-hidden text-cyan-400">
      {/* Background glow */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-fuchsia-600/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-cyan-600/10 blur-[150px] rounded-full pointer-events-none" />

      {/* Header */}
      <div className="z-10 flex w-full max-w-4xl justify-between items-center px-6 mb-8">
        <Link href="/" className="text-fuchsia-400 hover:text-fuchsia-300 tracking-widest text-sm uppercase transition-colors drop-shadow-[0_0_8px_rgba(192,38,211,0.8)]">
          &lt; 返回主站
        </Link>
        <h1 className="text-3xl md:text-5xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)] animate-pulse">
          NEON TETRIS
        </h1>
        <div className="w-[80px]"></div> {/* Spacer */}
      </div>

      <div className="z-10 flex flex-col md:flex-row gap-8 items-start">
        {/* Game Board */}
        <div className="relative bg-black/40 p-2 rounded-xl border border-cyan-500/30 shadow-[0_0_40px_rgba(34,211,238,0.15)] backdrop-blur-md">
          <div 
            className="grid gap-[1px] bg-white/10 p-[1px] rounded-lg"
            style={{ 
              gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))`,
              gridTemplateRows: `repeat(${ROWS}, minmax(0, 1fr))`,
              width: `${COLS * 24}px`,
              height: `${ROWS * 24}px`
            }}
          >
            {board.map((row, y) => row.map((cell, x) => {
              // Overlay current falling piece
              let displayVal = cell;
              if (
                piece.shape &&
                y >= piece.y && y < piece.y + piece.shape.length &&
                x >= piece.x && x < piece.x + piece.shape[0].length &&
                piece.shape[y - piece.y][x - piece.x] !== 0
              ) {
                displayVal = piece.shape[y - piece.y][x - piece.x];
              }
              return renderCell(displayVal, `${x}-${y}`);
            }))}
          </div>

          {/* Game Over Overlay */}
          {gameOver && (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm rounded-xl">
              <h2 className="text-4xl font-bold text-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.8)] mb-4 animate-pulse">SYSTEM FAILURE</h2>
              <p className="text-white mb-6">Final Score: <span className="text-cyan-400 font-bold">{score}</span></p>
              <button 
                onClick={resetGame}
                className="px-6 py-2 bg-transparent border-2 border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-black font-bold uppercase tracking-widest rounded transition-all shadow-[0_0_15px_rgba(34,211,238,0.4)]"
              >
                Reboot
              </button>
            </div>
          )}
        </div>

        {/* Side Panel */}
        <div className="flex flex-col gap-6 w-full md:w-48">
          {/* Next Piece */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-md shadow-[0_0_20px_rgba(0,0,0,0.5)]">
            <h3 className="text-xs uppercase text-zinc-400 mb-3 tracking-widest">Next Sequence</h3>
            <div className="flex justify-center items-center h-24">
              <div 
                className="grid gap-[1px]"
                style={{ 
                  gridTemplateColumns: `repeat(${nextPiece.shape[0]?.length || 4}, 20px)`,
                  gridTemplateRows: `repeat(${nextPiece.shape?.length || 4}, 20px)`
                }}
              >
                {nextPiece.shape.map((row, y) => row.map((cell, x) => (
                  <div key={`next-${x}-${y}`} className={`w-5 h-5 rounded-sm ${cell ? TAILWIND_GLOWS[cell] : 'transparent'}`} />
                )))}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-md flex flex-col gap-4">
            <div>
              <div className="text-xs uppercase text-zinc-400 tracking-widest">Score</div>
              <div className="text-2xl font-bold text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]">{score}</div>
            </div>
            <div>
              <div className="text-xs uppercase text-zinc-400 tracking-widest">Level</div>
              <div className="text-xl font-bold text-fuchsia-400 drop-shadow-[0_0_8px_rgba(192,38,211,0.6)]">{level}</div>
            </div>
            <div>
              <div className="text-xs uppercase text-zinc-400 tracking-widest">Lines</div>
              <div className="text-xl font-bold text-white">{lines}</div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-col gap-3">
            <button 
              onClick={() => setIsPaused(!isPaused)}
              className="w-full py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-lg uppercase tracking-widest text-sm font-bold transition-all"
            >
              {isPaused ? "RESUME" : "PAUSE"}
            </button>
            <button 
              onClick={resetGame}
              className="w-full py-3 bg-red-900/40 hover:bg-red-900/60 border border-red-500/50 text-red-400 rounded-lg uppercase tracking-widest text-sm font-bold transition-all"
            >
              ABORT
            </button>
          </div>

          {/* Mobile Controls (Visible only on small screens) */}
          <div className="md:hidden grid grid-cols-3 gap-2 mt-4">
            <div />
            <button onClick={rotate} className="bg-white/10 p-4 rounded-lg active:bg-cyan-500/50">↑</button>
            <div />
            <button onClick={() => moveHorizontal(-1)} className="bg-white/10 p-4 rounded-lg active:bg-cyan-500/50">←</button>
            <button onClick={moveDown} className="bg-white/10 p-4 rounded-lg active:bg-cyan-500/50">↓</button>
            <button onClick={() => moveHorizontal(1)} className="bg-white/10 p-4 rounded-lg active:bg-cyan-500/50">→</button>
            <button onClick={hardDrop} className="col-span-3 bg-white/10 p-4 rounded-lg active:bg-fuchsia-500/50 text-xs tracking-widest">DROP</button>
          </div>
        </div>
      </div>
    </div>
  );
}
