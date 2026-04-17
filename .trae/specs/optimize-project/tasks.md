# Tasks

- [x] Task 1: 重构 Tetris 游戏循环架构 — 从 requestAnimationFrame 依赖链改为 useRef + setInterval 模式
  - [x] SubTask 1.1: 将 gameLoop 从 requestAnimationFrame 改为 setInterval，使用 ref 存储 interval ID
  - [x] SubTask 1.2: 重构 moveDown/hardDrop/rotate/moveHorizontal，移除 useCallback 依赖链，改用 ref 读取最新状态
  - [x] SubTask 1.3: 修复 hardDrop 的时序问题，确保 piece 位置更新后再 merge
  - [x] SubTask 1.4: 更新 useEffect 中的游戏循环启动/停止逻辑
  - [x] SubTask 1.5: 验证游戏运行正常，无无限重渲染

- [x] Task 2: 重构 Game 状态管理 — 扁平化 handleCardClick 中的嵌套 setState
  - [x] SubTask 2.1: 将 handleCardClick 中 setCards 回调内的 setFlippedIndices/setMoves 提取到外层
  - [x] SubTask 2.2: 使用单一状态对象或 useReducer 管理游戏状态
  - [x] SubTask 2.3: 验证翻牌匹配逻辑正确

- [x] Task 3: 重构 ChatInterface 消息输入 — 移除 ref 同步模式
  - [x] SubTask 3.1: 移除 inputValueRef/isTypingRef，改用 useCallback 依赖项
  - [x] SubTask 3.2: handleSend 使用函数式 setState 确保状态一致性
  - [x] SubTask 3.3: 验证快速连续发送消息无异常

- [x] Task 4: 添加 localStorage 持久化
  - [x] SubTask 4.1: Game 组件添加最佳步数记录（localStorage key: `cyber-match-best`）
  - [x] SubTask 4.2: Tetris 组件添加最高分记录（localStorage key: `neon-tetris-highscore`）
  - [x] SubTask 4.3: 在 UI 中显示历史最佳成绩

- [x] Task 5: 添加全局 Error Boundary
  - [x] SubTask 5.1: 创建 ErrorBoundary 组件（Next.js error.tsx 约定）
  - [x] SubTask 5.2: 自动被 Next.js App Router 使用
  - [x] SubTask 5.3: 设计赛博朋克风格的错误恢复界面

- [x] Task 6: 路由级代码分割
  - [x] SubTask 6.1: 使用 dynamic import 重构 chat/page.tsx、game/page.tsx、tetris/page.tsx
  - [x] SubTask 6.2: 保留 metadata 导出在 Server Component 层
  - [x] SubTask 6.3: 添加加载骨架屏（Loader 组件）

- [x] Task 7: Tetris 面板渲染优化
  - [x] SubTask 7.1: 创建 memoized TetrisRow 组件，按行粒度渲染
  - [x] SubTask 7.2: 优化 displayVal 计算逻辑，使用 useMemo + computeDisplayBoard
  - [x] SubTask 7.3: 验证方块下落时仅重渲染变化行

- [x] Task 8: 验证与测试
  - [x] SubTask 8.1: 运行 TypeScript 类型检查（零错误）
  - [x] SubTask 8.2: 运行 ESLint 检查（零错误）
  - [x] SubTask 8.3: 运行 next build 验证构建成功
  - [x] SubTask 8.4: 功能回归测试（Chat/Game/Tetris 核心流程）

- [ ] Task 9: 提交 Git
  - [ ] SubTask 9.1: git add 所有变更文件
  - [ ] SubTask 9.2: git commit 提交优化变更

# Task Dependencies
- [Task 2] depends on [Task 1] (先完成 Tetris 重构再处理 Game，积累经验)
- [Task 3] independent (可与 Task 1/2 并行)
- [Task 4] depends on [Task 1, Task 2] (持久化依赖稳定的状态管理)
- [Task 5] independent (可与任何 Task 并行)
- [Task 6] depends on [Task 1, Task 2, Task 3] (代码分割依赖组件稳定)
- [Task 7] depends on [Task 1] (渲染优化依赖游戏循环架构确定)
- [Task 8] depends on [Task 1-7] (所有优化完成后验证)
- [Task 9] depends on [Task 8] (验证通过后提交)
