<div align="center">
  <h1>🎮 Web Mini-Games Collection</h1>
  <p><strong>赛博朋克风格网页小游戏合集</strong></p>

  [![Next.js](https://img.shields.io/badge/Framework-Next.js_15-black?logo=next.js)](https://nextjs.org/)
  [![React](https://img.shields.io/badge/Library-React_19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
  [![TypeScript](https://img.shields.io/badge/Language-TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind_CSS_4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
  [![Version](https://img.shields.io/badge/Version-0.75-blue.svg)]()

  [![Vercel Deployment](https://img.shields.io/badge/Live_Demo_on-beta--a2--5.vercel.app-000000?style=for-the-badge&logo=vercel)](https://beta-a2-5.vercel.app/)

  <p>
    <b>🇨🇳 简体中文</b> •
    <a href="./README.en.md"><b>🇬🇧 English</b></a>
  </p>
</div>

---

## 项目介绍
这是一个可直接部署到 Vercel 的 Next.js（App Router）网页小游戏合集。主页提供**可点击切换的中英双语**介绍，包含每个小游戏的玩法、操作说明、目标与视觉特点。

- **站点入口：** `/`
- **更新日志：** [CHANGELOG.md](./CHANGELOG.md)（中文）· [CHANGELOG.en.md](./CHANGELOG.en.md)

## 小游戏一览

### 🎮 Cyber Match（记忆翻牌）
- **入口：** `/game`
- **玩法：** 网格中隐藏着成对符号。点击卡片翻开；连续翻开的两张卡片若图案相同则保持翻开并触发霓虹闪烁，否则会在短暂延迟后自动翻回。
- **目标：** 找到并匹配所有卡片对，完成“系统破解”。
- **视觉：** 玻璃拟态面板 + 3D 翻转动画 + 霓虹光晕。

### 🎮 Neon Tetris（霓虹俄罗斯方块）
- **入口：** `/tetris`
- **玩法：** 经典俄罗斯方块规则：方块下落、触底固定、满行消除得分，得分/等级提升后下落速度加快。
- **操作：**
  - `← / →`：左右移动
  - `↑`：旋转
  - `↓`：加速下落
  - `Space`：硬降落（瞬间落到底部）
- **移动端：** 自动显示虚拟触控按键。
- **视觉：** 纯 CSS Grid 渲染 + Tailwind 光效（无 Canvas），保持真实霓虹发光质感。

## 本地运行
```bash
npm install
npm run dev
```
打开：http://localhost:3000

## 部署到 Vercel
将仓库导入 Vercel 后会自动识别 Next.js 并构建部署（根目录已对齐，含 `vercel.json`）。
