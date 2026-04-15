<div align="center">
  <h1>🎮 Web Mini-Games Collection</h1>
  <p><strong>Cyberpunk-themed Web Mini-Games</strong></p>

  [![Next.js](https://img.shields.io/badge/Framework-Next.js_15-black?logo=next.js)](https://nextjs.org/)
  [![React](https://img.shields.io/badge/Library-React_19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
  [![TypeScript](https://img.shields.io/badge/Language-TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind_CSS_4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
  [![Version](https://img.shields.io/badge/Version-0.50-blue.svg)]()

  [![Vercel Deployment](https://img.shields.io/badge/Live_Demo_on-beta--a2--5.vercel.app-000000?style=for-the-badge&logo=vercel)](https://beta-a2-5.vercel.app/)

  <p>
    <a href="./README.md"><b>🇨🇳 简体中文</b></a> •
    <b>🇬🇧 English</b>
  </p>
</div>

---

## About
A Next.js (App Router) mini‑game hub that can be deployed to Vercel with zero friction. The homepage includes **click‑to‑switch bilingual (EN/中文)** gameplay instructions with controls, goals, and visual highlights for each game.

- **Entry:** `/`
- **Changelog:** [CHANGELOG.en.md](./CHANGELOG.en.md) · [CHANGELOG.md](./CHANGELOG.md)

## Games

### 🎮 Cyber Match (Memory Cards)
- **Route:** `/game`
- **Gameplay:** A grid hides pairs of symbols. Click to flip cards; if two consecutive flips match, they stay open with neon glow; otherwise, they flip back after a short delay.
- **Goal:** Find all pairs to “hack the system”.
- **Visuals:** Glassmorphism UI + 3D flip animations + neon glow effects.

### 🎮 Neon Tetris
- **Route:** `/tetris`
- **Gameplay:** Classic Tetris rules: blocks fall, lock on contact, full rows clear for score, and the fall speed increases as you progress.
- **Controls:**
  - `← / →`: move
  - `↑`: rotate
  - `↓`: soft drop
  - `Space`: hard drop
- **Mobile:** On-screen touch controls appear automatically.
- **Visuals:** Pure CSS Grid + Tailwind glow (no Canvas) to preserve authentic neon aesthetics.

## Local Development
```bash
npm install
npm run dev
```
Open: http://localhost:3000

## Deploy to Vercel
Import the repo into Vercel. The project is root-aligned and includes `vercel.json` for smooth Next.js builds.

