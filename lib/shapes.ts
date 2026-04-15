// Shape definitions & coordinate math
// Each shape is a pixel grid: '#' = filled, '.' = empty

export interface ShapeDefinition {
  name: string;
  icon: string;
  pattern: string[];
}

export const SHAPES: ShapeDefinition[] = [
  {
    name: '爱心',
    icon: '❤️',
    pattern: [
      '.##.##.',
      '#######',
      '#######',
      '#######',
      '.#####.',
      '..###..',
      '...#...',
    ],
  },
  {
    name: '星星',
    icon: '⭐',
    pattern: [
      '....#....',
      '....#....',
      '.#######.',
      '..#####..',
      '.##.#.##.',
      '.#..#..#.',
      '....#....',
      '...#.#...',
      '..#...#..',
    ],
  },
  {
    name: '笑脸',
    icon: '😊',
    pattern: [
      '..#####..',
      '.#.....#.',
      '#.#.#.#.#',
      '#.......#',
      '#.#...#.#',
      '#..###..#',
      '.#.....#.',
      '..#####..',
    ],
  },
  {
    name: '圆形',
    icon: '⭕',
    pattern: [
      '..####..',
      '.#....#.',
      '#......#',
      '#......#',
      '#......#',
      '#......#',
      '.#....#.',
      '..####..',
    ],
  },
  {
    name: '菱形',
    icon: '💎',
    pattern: [
      '...#...',
      '..###..',
      '.#####.',
      '#######',
      '.#####.',
      '..###..',
      '...#...',
    ],
  },
  {
    name: '闪电',
    icon: '⚡',
    pattern: [
      '...##.',
      '..##..',
      '.##...',
      '######',
      '..##..',
      '.##...',
      '##....',
      '#####.',
    ],
  },
  {
    name: '十字',
    icon: '✚',
    pattern: [
      '...#...',
      '...#...',
      '...#...',
      '#######',
      '#######',
      '...#...',
      '...#...',
      '...#...',
    ],
  },
  {
    name: '房子',
    icon: '🏠',
    pattern: [
      '...#...',
      '..###..',
      '.#####.',
      '#######',
      '#.###.#',
      '#.###.#',
      '#.###.#',
      '#######',
    ],
  },
  {
    name: '箭头',
    icon: '➡️',
    pattern: [
      '...#...',
      '..###..',
      '.#####.',
      '#######',
      '.#####.',
      '..###..',
      '...#...',
      '...#...',
      '...#...',
    ],
  },
  {
    name: '音符',
    icon: '🎵',
    pattern: [
      '..###..',
      '..#.#..',
      '..#.#..',
      '..#.#..',
      '#####..',
      '..#....',
      '.##....',
      '.#.....',
    ],
  },
];

// Math-based shape generators (continuous curves → sampled points)
export function heartCurve(n: number): { x: number; y: number }[] {
  const points: { x: number; y: number }[] = [];
  for (let i = 0; i < n; i++) {
    const t = (i / n) * 2 * Math.PI;
    const x = 16 * Math.sin(t) ** 3;
    const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
    points.push({ x, y: -y }); // flip y for screen coords
  }
  return points;
}

export function circleCurve(n: number, r: number = 10): { x: number; y: number }[] {
  const points: { x: number; y: number }[] = [];
  for (let i = 0; i < n; i++) {
    const t = (i / n) * 2 * Math.PI;
    points.push({ x: r * Math.cos(t), y: r * Math.sin(t) });
  }
  return points;
}

export function starCurve(n: number, outerR: number = 12, innerR: number = 5, points_count: number = 5): { x: number; y: number }[] {
  const pts: { x: number; y: number }[] = [];
  for (let i = 0; i < n; i++) {
    const t = (i / n) * 2 * Math.PI;
    const angle = t - Math.PI / 2;
    const segment = (2 * Math.PI) / points_count;
    const halfSeg = segment / 2;
    const modAngle = ((angle % segment) + segment) % segment;
    const r = modAngle < halfSeg
      ? innerR + (outerR - innerR) * (1 - modAngle / halfSeg)
      : innerR + (outerR - innerR) * ((modAngle - halfSeg) / halfSeg);
    pts.push({ x: r * Math.cos(angle), y: r * Math.sin(angle) });
  }
  return pts;
}

export function spiralCurve(n: number, maxR: number = 12): { x: number; y: number }[] {
  const points: { x: number; y: number }[] = [];
  for (let i = 0; i < n; i++) {
    const t = (i / n) * 4 * Math.PI;
    const r = (i / n) * maxR;
    points.push({ x: r * Math.cos(t), y: r * Math.sin(t) });
  }
  return points;
}

// Parse pixel pattern → coordinates
export function parseShape(pattern: string[]): { x: number; y: number }[] {
  const coords: { x: number; y: number }[] = [];
  pattern.forEach((row, y) => {
    for (let x = 0; x < row.length; x++) {
      if (row[x] === '#') {
        coords.push({ x, y });
      }
    }
  });
  return coords;
}

// Normalize so shape is centered at (0,0)
export function normalizeShape(coords: { x: number; y: number }[]): { x: number; y: number }[] {
  if (coords.length === 0) return [];
  const cx = coords.reduce((s, c) => s + c.x, 0) / coords.length;
  const cy = coords.reduce((s, c) => s + c.y, 0) / coords.length;
  return coords.map((c) => ({ x: c.x - cx, y: c.y - cy }));
}

// Scale normalized coords to fit stage
export function scaleToStage(
  coords: { x: number; y: number }[],
  stageW: number,
  stageH: number,
  winW: number,
  winH: number,
  padding: number = 40
): { x: number; y: number }[] {
  if (coords.length === 0) return [];
  const xs = coords.map((c) => c.x);
  const ys = coords.map((c) => c.y);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const shapeW = maxX - minX || 1;
  const shapeH = maxY - minY || 1;
  const availW = stageW - padding * 2 - winW;
  const availH = stageH - padding * 2 - winH;
  const scale = Math.min(availW / shapeW, availH / shapeH, 50);
  const cx = stageW / 2;
  const cy = stageH / 2;
  return coords.map((c) => ({
    x: Math.round(cx + c.x * scale - winW / 2),
    y: Math.round(cy + c.y * scale - winH / 2),
  }));
}

// Window style themes
export type WindowStyle = 'win95' | 'macos' | 'tkinter' | 'modern' | 'linux';

export interface WindowTheme {
  name: string;
  style: WindowStyle;
  description: string;
}

export const WINDOW_THEMES: WindowTheme[] = [
  { name: 'Windows 95', style: 'win95', description: '经典灰色窗口' },
  { name: 'macOS', style: 'macos', description: '毛玻璃风格' },
  { name: 'tkinter', style: 'tkinter', description: 'Python tkinter 风格' },
  { name: 'Modern', style: 'modern', description: '现代扁平风格' },
  { name: 'Linux', style: 'linux', description: 'GNOME 风格' },
];

// Default tips (like the tkinter example)
export const DEFAULT_TIPS = [
  '多喝水利', '好好爱自己', '好好吃饭', '保持好心情',
  '我想你了', '顺顺利利', '别熬夜', '天凉了多穿衣服',
  '加油哦', '你最棒了', '要开心哦', '别忘了我',
  '注意休息', '少吃外卖', '多运动', '记得微笑',
];

export const DEFAULT_COLORS = [
  '#FF6B6B', '#4ECDC4', '#FFE66D', '#95E1D3',
  '#F38181', '#AA96DA', '#FCBAD3', '#A8D8EA',
  '#FF9A8B', '#88D8B0', '#FFCC5C', '#FF6F91',
];

// Animation sequence step
export type AnimationAction = 'form' | 'burst' | 'close' | 'pause';

export interface AnimationStep {
  action: AnimationAction;
  shapeIndex: number; // which shape, -1 = custom
  customCoords?: { x: number; y: number }[];
  count?: number; // for burst: how many random windows
  duration: number; // total duration in ms
  spawnInterval: number; // ms between each window spawn
  closeInterval?: number; // ms between each window close
}

// Predefined animation scripts (like the tkinter example)
export const ANIMATION_SCRIPTS: { name: string; description: string; steps: AnimationStep[] }[] = [
  {
    name: '爱心绽放 + 满屏暴击',
    description: '经典tkinter效果：爱心成形 → 满屏弹窗 → 优雅关闭',
    steps: [
      { action: 'form', shapeIndex: 0, duration: 4000, spawnInterval: 40 },
      { action: 'pause', shapeIndex: -1, duration: 1000, spawnInterval: 0 },
      { action: 'close', shapeIndex: -1, duration: 800, spawnInterval: 8, closeInterval: 8 },
      { action: 'burst', shapeIndex: -1, count: 120, duration: 3000, spawnInterval: 15 },
      { action: 'pause', shapeIndex: -1, duration: 5000, spawnInterval: 0 },
      { action: 'close', shapeIndex: -1, duration: 3000, spawnInterval: 0, closeInterval: 25 },
    ],
  },
  {
    name: '星星闪耀',
    description: '星星成形 → 旋转扩散 → 收回 → 关闭',
    steps: [
      { action: 'form', shapeIndex: 1, duration: 3000, spawnInterval: 35 },
      { action: 'pause', shapeIndex: -1, duration: 2000, spawnInterval: 0 },
      { action: 'form', shapeIndex: 4, duration: 2000, spawnInterval: 30 },
      { action: 'pause', shapeIndex: -1, duration: 1500, spawnInterval: 0 },
      { action: 'form', shapeIndex: 2, duration: 2000, spawnInterval: 30 },
      { action: 'pause', shapeIndex: -1, duration: 2000, spawnInterval: 0 },
      { action: 'close', shapeIndex: -1, duration: 2000, spawnInterval: 0, closeInterval: 20 },
    ],
  },
  {
    name: '变形循环',
    description: '爱心 → 菱形 → 圆形 → 闪电 → 笑脸 循环',
    steps: [
      { action: 'form', shapeIndex: 0, duration: 2000, spawnInterval: 30 },
      { action: 'pause', shapeIndex: -1, duration: 800, spawnInterval: 0 },
      { action: 'form', shapeIndex: 4, duration: 1500, spawnInterval: 30 },
      { action: 'pause', shapeIndex: -1, duration: 800, spawnInterval: 0 },
      { action: 'form', shapeIndex: 3, duration: 1500, spawnInterval: 30 },
      { action: 'pause', shapeIndex: -1, duration: 800, spawnInterval: 0 },
      { action: 'form', shapeIndex: 6, duration: 1500, spawnInterval: 30 },
      { action: 'pause', shapeIndex: -1, duration: 800, spawnInterval: 0 },
      { action: 'form', shapeIndex: 2, duration: 1500, spawnInterval: 30 },
      { action: 'pause', shapeIndex: -1, duration: 1500, spawnInterval: 0 },
      { action: 'close', shapeIndex: -1, duration: 2000, spawnInterval: 0, closeInterval: 25 },
    ],
  },
  {
    name: '满屏轰炸',
    description: '直接满屏弹窗暴击，然后优雅关闭',
    steps: [
      { action: 'burst', shapeIndex: -1, count: 200, duration: 4000, spawnInterval: 10 },
      { action: 'pause', shapeIndex: -1, duration: 3000, spawnInterval: 0 },
      { action: 'close', shapeIndex: -1, duration: 4000, spawnInterval: 0, closeInterval: 20 },
    ],
  },
];
