'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import {
  SHAPES,
  parseShape,
  normalizeShape,
  WINDOW_THEMES,
  DEFAULT_TIPS,
  DEFAULT_COLORS,
  ANIMATION_SCRIPTS,
  type WindowStyle,
} from '@/lib/shapes';
import { generatePopupHTML } from '@/lib/popup-html';
import { cn } from '@/lib/utils';

// ---- Custom Cell for Editor ----
interface CustomCell {
  x: number;
  y: number;
  active: boolean;
}

// ---- Main Component ----
export default function PopupController() {
  const [currentShapeIndex, setCurrentShapeIndex] = useState(0);
  const [windowStyle, setWindowStyle] = useState<WindowStyle>('tkinter');
  const [winWidth, setWinWidth] = useState(150);
  const [winHeight, setWinHeight] = useState(60);
  const [tips, setTips] = useState(DEFAULT_TIPS.join('\n'));
  const [speed, setSpeed] = useState(1);
  const [currentScript, setCurrentScript] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  const [customGrid, setCustomGrid] = useState<CustomCell[]>([]);
  const [useCustom, setUseCustom] = useState(false);
  const [logMessages, setLogMessages] = useState<string[]>([]);

  const openWindows = useRef<Window[]>([]);
  const abortRef = useRef(false);
  const isRunningRef = useRef(false);

  const EDITOR_COLS = 9;
  const EDITOR_ROWS = 9;

  // --- Init grid via useEffect ---
  useEffect(() => {
    const cells: CustomCell[] = [];
    for (let y = 0; y < EDITOR_ROWS; y++) {
      for (let x = 0; x < EDITOR_COLS; x++) {
        cells.push({ x, y, active: false });
      }
    }
    setCustomGrid(cells);
  }, []);

  // --- Helpers ---
  const getRandomTip = useCallback(() => {
    const tipList = tips.split('\n').filter((t) => t.trim());
    return tipList[Math.floor(Math.random() * tipList.length)] || 'Hello!';
  }, [tips]);

  const getRandomColor = useCallback(() => {
    return DEFAULT_COLORS[Math.floor(Math.random() * DEFAULT_COLORS.length)];
  }, []);

  const addLog = useCallback((msg: string) => {
    const time = new Date().toLocaleTimeString();
    setLogMessages((prev) => [...prev.slice(-80), `[${time}] ${msg}`]);
  }, []);

  // --- Get screen dimensions ---
  const getScreenSize = useCallback(() => {
    return {
      w: window.screen.availWidth,
      h: window.screen.availHeight,
    };
  }, []);

  // --- Open a real popup window ---
  const openPopupWindow = useCallback(
    (x: number, y: number, opts?: { title?: string; content?: string; color?: string }): Window | null => {
      const html = generatePopupHTML({
        title: opts?.title ?? '提示',
        content: opts?.content ?? getRandomTip(),
        color: opts?.color ?? getRandomColor(),
        style: windowStyle,
        width: winWidth,
        height: winHeight,
      });

      const features = [
        `width=${winWidth}`,
        `height=${winHeight}`,
        `left=${x}`,
        `top=${y}`,
        'toolbar=no',
        'menubar=no',
        'location=no',
        'status=no',
        'scrollbars=no',
        'resizable=yes',
      ].join(',');

      try {
        const win = window.open('about:blank', '_blank', features);
        if (!win) {
          addLog('弹窗被浏览器拦截！请允许弹窗权限');
          return null;
        }
        win.document.open();
        win.document.write(html);
        win.document.close();
        openWindows.current.push(win);
        return win;
      } catch (e) {
        addLog(`弹窗失败: ${e}`);
        return null;
      }
    },
    [windowStyle, winWidth, winHeight, getRandomTip, getRandomColor, addLog]
  );

  // --- Close all open windows ---
  const closeAllOpenWindows = useCallback(async (intervalMs: number = 15) => {
    const wins = [...openWindows.current];
    openWindows.current = [];
    addLog(`关闭 ${wins.length} 个弹窗...`);

    for (const w of wins) {
      if (abortRef.current) break;
      try {
        if (w && !w.closed) w.close();
      } catch {
        // ignore
      }
      await sleep(intervalMs / speed);
    }
    addLog('全部关闭');
  }, [speed, addLog]);

  // --- Close all immediately ---
  const closeAllImmediate = useCallback(() => {
    for (const w of openWindows.current) {
      try { if (w && !w.closed) w.close(); } catch { /* ignore */ }
    }
    openWindows.current = [];
  }, []);

  // --- Calculate shape positions on screen ---
  const getShapeScreenPositions = useCallback(
    (shapeIndex: number): { x: number; y: number }[] => {
      if (shapeIndex < 0 || shapeIndex >= SHAPES.length) return [];
      const raw = parseShape(SHAPES[shapeIndex].pattern);
      const norm = normalizeShape(raw);
      const screen = getScreenSize();

      if (norm.length === 0) return [];

      const xs = norm.map((c) => c.x);
      const ys = norm.map((c) => c.y);
      const minX = Math.min(...xs);
      const maxX = Math.max(...xs);
      const minY = Math.min(...ys);
      const maxY = Math.max(...ys);
      const shapeW = maxX - minX || 1;
      const shapeH = maxY - minY || 1;

      const availW = screen.w - winWidth - 20;
      const availH = screen.h - winHeight - 40;
      const scale = Math.min(availW / shapeW, availH / shapeH, 55);

      const cx = screen.w / 2;
      const cy = screen.h / 2;

      return norm.map((c) => ({
        x: Math.round(cx + c.x * scale - winWidth / 2),
        y: Math.round(cy + c.y * scale - winHeight / 2),
      }));
    },
    [getScreenSize, winWidth, winHeight]
  );

  // --- Get custom shape positions ---
  const getCustomScreenPositions = useCallback((): { x: number; y: number }[] => {
    const activeCells = customGrid.filter((c) => c.active);
    if (activeCells.length === 0) return [];
    const raw = activeCells.map((c) => ({ x: c.x, y: c.y }));
    const norm = normalizeShape(raw);
    const screen = getScreenSize();

    if (norm.length === 0) return [];

    const xs = norm.map((c) => c.x);
    const ys = norm.map((c) => c.y);
    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);
    const shapeW = maxX - minX || 1;
    const shapeH = maxY - minY || 1;

    const availW = screen.w - winWidth - 20;
    const availH = screen.h - winHeight - 40;
    const scale = Math.min(availW / shapeW, availH / shapeH, 55);

    const cx = screen.w / 2;
    const cy = screen.h / 2;

    return norm.map((c) => ({
      x: Math.round(cx + c.x * scale - winWidth / 2),
      y: Math.round(cy + c.y * scale - winHeight / 2),
    }));
  }, [customGrid, getScreenSize, winWidth, winHeight]);

  // --- Form shape with real popups ---
  const formShape = useCallback(
    async (shapeIndex: number, spawnInterval: number) => {
      const positions = useCustom && shapeIndex === -1
        ? getCustomScreenPositions()
        : getShapeScreenPositions(shapeIndex);

      if (positions.length === 0) return;
      const shapeName = shapeIndex >= 0 ? SHAPES[shapeIndex].name : '自定义';
      addLog(`成形: ${shapeName} (${positions.length}个弹窗)`);

      for (let i = 0; i < positions.length; i++) {
        if (abortRef.current) return;
        openPopupWindow(positions[i].x, positions[i].y);
        await sleep(spawnInterval / speed);
      }
    },
    [useCustom, getCustomScreenPositions, getShapeScreenPositions, openPopupWindow, speed, addLog]
  );

  // --- Burst: random popup positions ---
  const burstWindows = useCallback(
    async (count: number, spawnInterval: number) => {
      const screen = getScreenSize();
      addLog(`暴击: ${count}个随机弹窗`);

      for (let i = 0; i < count; i++) {
        if (abortRef.current) return;
        const x = Math.floor(Math.random() * (screen.w - winWidth));
        const y = Math.floor(Math.random() * (screen.h - winHeight - 40));
        openPopupWindow(x, y);
        await sleep(spawnInterval / speed);
      }
    },
    [getScreenSize, winWidth, winHeight, openPopupWindow, speed, addLog]
  );

  // --- Run animation script ---
  const runScript = useCallback(async () => {
    if (isRunningRef.current) return;
    isRunningRef.current = true;
    setIsRunning(true);
    abortRef.current = false;

    const script = ANIMATION_SCRIPTS[currentScript];
    addLog(`▶ 开始: ${script.name}`);

    for (const step of script.steps) {
      if (abortRef.current) break;
      switch (step.action) {
        case 'form':
          await formShape(step.shapeIndex, step.spawnInterval);
          break;
        case 'burst':
          await burstWindows(step.count ?? 100, step.spawnInterval);
          break;
        case 'close':
          await closeAllOpenWindows(step.closeInterval ?? 20);
          break;
        case 'pause':
          await sleep(step.duration / speed);
          break;
      }
    }

    addLog('✓ 完成!');
    isRunningRef.current = false;
    setIsRunning(false);
  }, [currentScript, speed, formShape, burstWindows, closeAllOpenWindows, addLog]);

  // --- Stop ---
  const stopScript = useCallback(() => {
    abortRef.current = true;
    isRunningRef.current = false;
    setIsRunning(false);
    closeAllImmediate();
    addLog('⏹ 已停止，关闭所有弹窗');
  }, [closeAllImmediate, addLog]);

  // --- Quick form a single shape ---
  const quickForm = useCallback(
    (index: number) => {
      setCurrentShapeIndex(index);
      setUseCustom(false);
      closeAllImmediate();
      setTimeout(() => formShape(index, 40), 200);
    },
    [closeAllImmediate, formShape]
  );

  // --- Apply custom shape ---
  const applyCustomShape = useCallback(() => {
    setUseCustom(true);
    setCurrentShapeIndex(-1);
    closeAllImmediate();
    setTimeout(() => formShape(-1, 40), 200);
  }, [closeAllImmediate, formShape]);

  // --- Toggle grid cell ---
  const toggleCell = useCallback((x: number, y: number) => {
    setCustomGrid((prev) =>
      prev.map((c) => (c.x === x && c.y === y ? { ...c, active: !c.active } : c))
    );
  }, []);

  // --- Clear grid ---
  const clearGrid = useCallback(() => {
    setCustomGrid((prev) => prev.map((c) => ({ ...c, active: false })));
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white font-['Space_Grotesk','PingFang_SC','Microsoft_YaHei',sans-serif]">
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            PopupMorph
          </h1>
          <p className="text-sm text-white/30 mt-1">真实弹窗形状动画生成器 — 弹出真正的系统窗口</p>
        </div>

        {/* Warning */}
        <div className="mb-4 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
          <p className="text-xs text-amber-300/80">
            请先允许浏览器弹窗权限！点击运行后浏览器会提示&ldquo;允许弹出窗口&rdquo;，请选择允许。
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* === Shapes === */}
          <div className="lg:col-span-1 space-y-4">
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/8">
              <h2 className="text-sm font-semibold mb-3">形状选择</h2>
              <div className="grid grid-cols-5 gap-1.5">
                {SHAPES.map((shape, i) => (
                  <button
                    key={shape.name}
                    onClick={() => quickForm(i)}
                    className={cn(
                      'flex flex-col items-center gap-0.5 p-2 rounded-lg transition-all',
                      'hover:bg-white/10 active:scale-95',
                      currentShapeIndex === i && !useCustom
                        ? 'bg-white/12 ring-1 ring-cyan-500/30'
                        : 'bg-white/[0.04]'
                    )}
                  >
                    <span className="text-base">{shape.icon}</span>
                    <span className="text-[8px] text-white/40">{shape.name}</span>
                  </button>
                ))}
              </div>

              {/* Custom Editor */}
              <div className="mt-3">
                <button
                  onClick={() => setShowEditor(!showEditor)}
                  className={cn(
                    'w-full py-1.5 px-3 rounded-lg text-xs transition-all',
                    'border border-white/10 hover:bg-white/8',
                    showEditor && 'bg-white/10'
                  )}
                >
                  ✏️ 自定义形状
                </button>
                {showEditor && (
                  <div className="mt-2 p-2 rounded-lg bg-white/[0.03] border border-white/8">
                    <div
                      className="grid gap-[2px] mx-auto mb-2"
                      style={{ gridTemplateColumns: `repeat(${EDITOR_COLS}, 1fr)`, maxWidth: '144px' }}
                    >
                      {customGrid.map((cell) => (
                        <button
                          key={`${cell.x}-${cell.y}`}
                          onClick={() => toggleCell(cell.x, cell.y)}
                          className={cn(
                            'aspect-square rounded-[2px] transition-all',
                            cell.active ? 'bg-cyan-400' : 'bg-white/[0.06] hover:bg-white/10'
                          )}
                        />
                      ))}
                    </div>
                    <div className="flex gap-1">
                      <button onClick={clearGrid} className="flex-1 py-1 rounded text-[9px] bg-white/5 hover:bg-white/10">清空</button>
                      <button onClick={applyCustomShape} className="flex-1 py-1 rounded text-[9px] bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 font-medium">应用</button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Window Style */}
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/8">
              <h2 className="text-sm font-semibold mb-3">弹窗样式</h2>
              <div className="space-y-1">
                {WINDOW_THEMES.map((theme) => (
                  <button
                    key={theme.style}
                    onClick={() => setWindowStyle(theme.style)}
                    className={cn(
                      'w-full text-left px-3 py-2 rounded-lg text-xs transition-all',
                      windowStyle === theme.style
                        ? 'bg-white/12 text-white ring-1 ring-white/10'
                        : 'bg-white/[0.03] text-white/50 hover:bg-white/8'
                    )}
                  >
                    <span className="font-medium">{theme.name}</span>
                    <span className="text-white/30 ml-2">{theme.description}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* === Config + Scripts === */}
          <div className="lg:col-span-2 space-y-4">
            {/* Animation Scripts */}
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/8">
              <h2 className="text-sm font-semibold mb-3">动画脚本</h2>
              <div className="grid grid-cols-2 gap-2">
                {ANIMATION_SCRIPTS.map((script, i) => (
                  <button
                    key={script.name}
                    onClick={() => { setCurrentScript(i); if (!isRunning) closeAllImmediate(); }}
                    className={cn(
                      'text-left p-3 rounded-lg transition-all',
                      currentScript === i
                        ? 'bg-amber-500/10 ring-1 ring-amber-500/20'
                        : 'bg-white/[0.03] hover:bg-white/[0.06]'
                    )}
                  >
                    <div className="text-xs font-medium text-white/80">{script.name}</div>
                    <div className="text-[9px] text-white/30 mt-0.5">{script.description}</div>
                  </button>
                ))}
              </div>

              {/* Steps preview */}
              <div className="mt-3 flex flex-wrap gap-1.5">
                {ANIMATION_SCRIPTS[currentScript].steps.map((step, i) => (
                  <span key={i} className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-white/[0.04] text-[9px] text-white/30">
                    <span className="text-white/15">{i + 1}.</span>
                    {step.action === 'form' ? `成形:${step.shapeIndex >= 0 ? SHAPES[step.shapeIndex]?.name : '?'}`
                      : step.action === 'burst' ? `暴击:${step.count}个`
                      : step.action === 'close' ? '关闭'
                      : `暂停:${step.duration / 1000}s`}
                  </span>
                ))}
              </div>
            </div>

            {/* Configuration */}
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/8">
              <h2 className="text-sm font-semibold mb-3">弹窗配置</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] text-white/40 mb-1 block">宽度: {winWidth}px</label>
                  <input type="range" min={80} max={350} step={10} value={winWidth}
                    onChange={(e) => setWinWidth(Number(e.target.value))}
                    className="w-full slider" />
                </div>
                <div>
                  <label className="text-[10px] text-white/40 mb-1 block">高度: {winHeight}px</label>
                  <input type="range" min={30} max={200} step={10} value={winHeight}
                    onChange={(e) => setWinHeight(Number(e.target.value))}
                    className="w-full slider" />
                </div>
              </div>
              <div className="mt-3">
                <label className="text-[10px] text-white/40 mb-1 block">播放速度: {speed}x</label>
                <input type="range" min={0.25} max={3} step={0.25} value={speed}
                  onChange={(e) => setSpeed(Number(e.target.value))}
                  className="w-full slider" />
              </div>
              <div className="mt-3">
                <label className="text-[10px] text-white/40 mb-1 block">弹窗内容 (每行一条)</label>
                <textarea value={tips} onChange={(e) => setTips(e.target.value)}
                  className="w-full h-20 p-2 rounded-lg bg-white/[0.04] border border-white/8 text-xs text-white/70 resize-none focus:outline-none focus:ring-1 focus:ring-cyan-500/30"
                  placeholder="每行一条提示语" />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              {!isRunning ? (
                <button
                  onClick={runScript}
                  className="flex-1 py-3 rounded-xl text-sm font-semibold bg-gradient-to-r from-amber-500/20 to-orange-500/20 hover:from-amber-500/30 hover:to-orange-500/30 text-amber-300 ring-1 ring-amber-500/20 transition-all active:scale-[0.97]"
                >
                  ▶ 运行脚本
                </button>
              ) : (
                <button
                  onClick={stopScript}
                  className="flex-1 py-3 rounded-xl text-sm font-semibold bg-red-500/20 hover:bg-red-500/30 text-red-300 ring-1 ring-red-500/20 transition-all active:scale-[0.97]"
                >
                  ⏹ 停止并关闭所有弹窗
                </button>
              )}
              <button
                onClick={() => { closeAllImmediate(); addLog('已清空'); }}
                disabled={isRunning}
                className="px-5 py-3 rounded-xl text-sm bg-white/5 hover:bg-white/10 text-white/50 disabled:opacity-30 transition-colors"
              >
                清空弹窗
              </button>
            </div>

            {/* Quick actions */}
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => { closeAllImmediate(); setTimeout(() => burstWindows(30, 20), 200); }}
                disabled={isRunning}
                className="py-2 rounded-lg text-xs bg-white/[0.04] hover:bg-white/8 text-white/40 disabled:opacity-30 transition-colors"
              >
                💥 快速暴击 (30个)
              </button>
              <button
                onClick={() => { closeAllImmediate(); setTimeout(() => burstWindows(80, 10), 200); }}
                disabled={isRunning}
                className="py-2 rounded-lg text-xs bg-white/[0.04] hover:bg-white/8 text-white/40 disabled:opacity-30 transition-colors"
              >
                💥💥 满屏暴击 (80个)
              </button>
              <button
                onClick={() => closeAllOpenWindows(15)}
                disabled={isRunning}
                className="py-2 rounded-lg text-xs bg-white/[0.04] hover:bg-white/8 text-white/40 disabled:opacity-30 transition-colors"
              >
                🚪 优雅关闭
              </button>
            </div>

            {/* Log */}
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/6 max-h-40 overflow-y-auto">
              <div className="text-[9px] text-white/20 font-mono space-y-0.5">
                {logMessages.length === 0 ? (
                  <div>等待操作... 点击&ldquo;运行脚本&rdquo;开始弹窗</div>
                ) : (
                  logMessages.slice(-12).map((msg, i) => (
                    <div key={i} className="text-white/30">{msg}</div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, Math.max(ms, 1)));
}
