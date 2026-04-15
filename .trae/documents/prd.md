## 1. 产品概述
响应用户需求，将当前高度模仿 GitHub Profile 的页面进一步重构为更符合“现代开发者个人博客 (Modern Developer Blog)”的排版与设计。
这是一个以展示技术文章、个人项目（小游戏、AI 工具）为核心的极简美学博客，同时保留小游戏的入口及大模型聊天体验页，所有子页面均能流畅跳回主页。

### 核心目标：
- 打造一个具有极简、优雅阅读体验的现代个人博客主页（灵感参考 Next.js 官方博客、Tailwind UI 博客模板等网络知名博客风格）。
- 将原有小游戏（Neon Tetris, Cyber Match）及新加入的大语言模型聊天页（Synapse AI）以“项目橱窗 / Projects”的形式优雅展示。
- 博客主页应具备清晰的区块划分：Hero 欢迎区、文章列表区 (Blog Posts)、项目作品区 (Projects)。

## 2. 核心功能与模块

### 2.1 现代个人博客主页 (`/`)
- **顶部导航 (Navbar)**：左侧 Logo 或博客名称，右侧包含“文章 (Blog)”、“项目 (Projects)”、“语言切换 (EN/中文)”等导航项。
- **Hero 欢迎区**：大号字体打招呼（如 "Building digital experiences."），简短的个人技术栈介绍。
- **项目作品区 (Featured Projects)**：以精美的卡片形式展示：
  - `Synapse AI`：大模型聊天体验页入口。
  - `Neon Tetris`：霓虹俄罗斯方块入口。
  - `Cyber Match`：赛博翻牌游戏入口。
- **博客文章区 (Latest Posts)**：以列表形式展示最新的博客文章摘要（模拟数据），包括标题、日期、阅读时间估算。
- **页脚 (Footer)**：社交链接（GitHub, Twitter等）与版权信息。

### 2.2 子应用模块 (保持不变，已完成开发)
- **`/chat` (Synapse AI)**：大模型前端体验页。
- **`/game` (Cyber Match)**：赛博记忆翻牌。
- **`/tetris` (Neon Tetris)**：霓虹俄罗斯方块。
- **共有特性**：所有子应用均在明显位置保留了“返回主站/Back to Home”的导航。

## 3. 用户界面设计

### 3.1 设计风格
- **极简与排版优先 (Minimalist & Typography-first)**：摒弃之前过于浓重的“黑客/代码”面板，采用大量的留白（Negative Space）、柔和的深色主题（Dark Mode by default，背景如 `#0a0a0a` 或深灰）。
- **字体 (Typography)**：标题使用现代无衬线字体（如 Inter 或系统自带 UI 字体），代码部分使用等宽字体。
- **色彩 (Colors)**：主体为黑白灰，卡片或交互元素在 Hover 时带有一丝赛博朋克风格的微弱霓虹发光（作为与内部小游戏的视觉统一）。

### 3.2 交互效果
- **平滑过渡 (Smooth Transitions)**：所有按钮和卡片在 Hover 时拥有优雅的位移和发光过渡。
- **响应式 (Responsive)**：完美适配移动端和桌面端。

## 4. 后续发布与部署要求
- 提交代码并推送，升级版本号至 `1.00`。
- 截断历史，发布 Release 和 Tag `v1.00`。