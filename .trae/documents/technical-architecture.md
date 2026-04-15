## 1. 架构设计
```mermaid
graph TD
    A["主页 (现代个人博客风格) `/`"] --> B["Synapse AI 聊天页 `/chat`"]
    A --> C["Cyber Match 小游戏 `/game`"]
    A --> D["Neon Tetris 小游戏 `/tetris`"]
    B -.-> |"返回主页"| A
    C -.-> |"返回主页"| A
    D -.-> |"返回主页"| A
    A --> E["多语言切换状态 (useState)"]
    A --> F["最新博客文章 (模拟数据)"]
    A --> G["精选项目卡片 (展示上述三个模块)"]
```

## 2. 技术说明
- **框架**：React 19 + Next.js 15 (App Router)
- **样式**：Tailwind CSS v4
- **组件结构 (主页重构)**：
  - `Navbar`：顶部固定或绝对定位的极简导航栏，包含 Logo 和语言切换按钮。
  - `Hero`：带有微弱渐变背景的大字号欢迎区。
  - `Projects`：基于 Grid 布局的项目展示区。
  - `Posts`：基于 Flex 列表布局的文章展示区。
  - `Footer`：底部版权与链接区。
- **多语言 (i18n)**：在 `/` 页面根组件使用 `useState` 维护中英文文本字典。

## 3. 路由定义
| 路由 | 目的 |
|-------|---------|
| `/` | 现代开发者个人博客主页（项目展示，文章列表，双语切换） |
| `/chat` | Synapse AI 聊天体验页（保持原样） |
| `/game` | 赛博翻牌游戏（保持原样） |
| `/tetris` | 霓虹俄罗斯方块（保持原样） |

## 4. 开发任务
1. **重构 `app/page.tsx`**：移除原本生硬的 GitHub Profile 结构，使用更自然、极简且有设计感的现代博客模板排版（如：居中内容流、大标题、精美的卡片设计）。
2. **重写多语言词典**：适配新的博客模板文本（Hero Slogan, Project Titles/Descriptions, Article Titles, etc.）。
3. **版本升版与发布**：执行构建测试，推送代码并升版至 `1.00`。