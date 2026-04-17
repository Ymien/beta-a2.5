# 项目全面优化 Spec

## Why
当前项目存在多个性能瓶颈、功能缺陷、代码质量问题和用户体验痛点，需要系统性识别并修复，以提升应用整体质量、响应速度和用户满意度。

## What Changes
- 修复 Tetris 游戏主循环中 `requestAnimationFrame` 依赖链导致的无限重渲染问题
- 修复 Game 组件中 `handleCardClick` 在 `setCards` 回调内调用其他 setState 的反模式
- 修复 ChatInterface 中 `inputValueRef`/`isTypingRef` 同步模式不安全的问题
- 修复 Tetris 中 `hardDrop` 同步更新 ref + 调用 merge 的时序问题
- 为 Game 和 Tetris 添加 `localStorage` 持久化（最佳成绩/最高分）
- 为 ChatInterface 添加消息虚拟滚动优化（大量消息时）
- 添加全局 Error Boundary 防止子组件崩溃导致白屏
- 优化 Tetris 游戏面板渲染性能（减少不必要的单元格重渲染）
- 添加路由级代码分割（React.lazy）
- 修复页面路由中 metadata 导出与 "use client" 的冲突
- **BREAKING**: 重构 Tetris 游戏循环架构，从 `requestAnimationFrame` 依赖链改为 `useRef` + `setInterval` 模式

## Impact
- Affected specs: Tetris 游戏核心循环、Game 状态管理、ChatInterface 交互、路由架构
- Affected code: `app/tetris/Tetris.tsx`, `app/game/Game.tsx`, `app/chat/ChatInterface.tsx`, `app/page.tsx`, `app/layout.tsx`, `app/chat/page.tsx`, `app/game/page.tsx`, `app/tetris/page.tsx`

---

## ADDED Requirements

### Requirement: Tetris 游戏循环架构重构
系统 SHALL 将 Tetris 游戏主循环从 `requestAnimationFrame` + `useCallback` 依赖链模式重构为 `useRef` + `setInterval` 模式，消除因 `moveDown` 函数引用变化导致的无限重渲染。

#### Scenario: 游戏循环稳定运行
- **WHEN** Tetris 组件挂载且游戏未暂停/未结束
- **THEN** 游戏循环 SHALL 使用 `setInterval` 以 `dropInterval` 间隔调用 `moveDown`
- **AND** `moveDown` 函数引用变化时 SHALL NOT 触发循环重建

#### Scenario: 暂停/恢复游戏
- **WHEN** 用户点击暂停按钮
- **THEN** 系统 SHALL 清除 interval 并停止方块下落
- **WHEN** 用户点击恢复按钮
- **THEN** 系统 SHALL 重新启动 interval

### Requirement: Game 状态管理重构
系统 SHALL 将 Game 组件的 `handleCardClick` 中嵌套的 `setCards` 回调内调用 `setFlippedIndices`/`setMoves` 的反模式重构为扁平化的状态更新流程。

#### Scenario: 翻牌匹配逻辑
- **WHEN** 用户点击第二张卡片
- **THEN** 系统 SHALL 在单次渲染周期内完成所有状态更新
- **AND** SHALL NOT 在 `setCards` 回调内部调用其他 setState

### Requirement: ChatInterface 消息输入安全
系统 SHALL 移除 `inputValueRef`/`isTypingRef` 的同步模式，改用函数式 setState 和 `useCallback` 依赖项来保证状态一致性。

#### Scenario: 快速连续发送消息
- **WHEN** 用户快速输入并按 Enter 发送
- **THEN** 系统 SHALL 正确读取当前输入值和 typing 状态
- **AND** SHALL NOT 出现 stale closure 导致的空消息或重复发送

### Requirement: localStorage 持久化
系统 SHALL 为 Game 和 Tetris 提供最佳成绩/最高分的 localStorage 持久化。

#### Scenario: 保存最高分
- **WHEN** 游戏结束且得分高于历史最高分
- **THEN** 系统 SHALL 将新最高分写入 localStorage
- **AND** 在游戏界面显示历史最高分

#### Scenario: 读取历史最高分
- **WHEN** 组件挂载
- **THEN** 系统 SHALL 从 localStorage 读取历史最高分并显示

### Requirement: 全局 Error Boundary
系统 SHALL 在 layout 层添加 Error Boundary，防止单个页面组件崩溃导致整页白屏。

#### Scenario: 子组件运行时错误
- **WHEN** 任意子组件抛出未捕获的运行时错误
- **THEN** 系统 SHALL 显示友好的错误恢复界面
- **AND** 提供返回首页的链接

### Requirement: 路由级代码分割
系统 SHALL 对 /chat、/game、/tetris 路由实现懒加载，减少首屏 JS 体积。

#### Scenario: 首页加载
- **WHEN** 用户访问首页
- **THEN** 系统 SHALL NOT 加载 ChatInterface、Game、Tetris 的 JS 代码
- **AND** 仅在用户导航到对应路由时加载

### Requirement: Tetris 面板渲染优化
系统 SHALL 对 Tetris 游戏面板实现按行 memoization，避免每帧重渲染所有 200 个单元格。

#### Scenario: 方块下落时
- **WHEN** 当前方块下落一行
- **THEN** 系统 SHALL 仅重渲染方块所在行及相邻行
- **AND** SHALL NOT 重渲染未变化的行

### Requirement: 修复路由 metadata 导出冲突
系统 SHALL 将各路由页面的 metadata 导出移至独立的 Server Component 层，避免与 "use client" 指令冲突。

#### Scenario: SSR 渲染
- **WHEN** Next.js SSR 渲染 /chat、/game、/tetris 路由
- **THEN** 系统 SHALL 正确生成对应页面的 metadata
- **AND** metadata 导出 SHALL NOT 与客户端组件冲突

## MODIFIED Requirements

### Requirement: Tetris hardDrop 逻辑
hardDrop SHALL 通过函数式 setState 更新 piece 位置，然后在 setState 回调后同步调用 mergePieceToBoard，而非直接修改 ref 后调用 merge。

## REMOVED Requirements

### Requirement: inputValueRef/isTypingRef 同步模式
**Reason**: 该模式在并发场景下不安全，且违反 React 单向数据流原则
**Migration**: 改用 useCallback 依赖项 + 函数式 setState
