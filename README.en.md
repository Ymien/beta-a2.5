<div align="center">

# 🎮 Web Mini‑Games

[![Next.js](https://img.shields.io/badge/Next.js-16.2-black?logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?logo=vercel)](https://vercel.com/)
[![Version](https://img.shields.io/badge/Version-0.25-blue.svg)]()

**Language / 语言:** **English** · [中文](./README.md)

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

