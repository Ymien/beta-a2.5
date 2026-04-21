# 用户指令记忆

本文件记录了用户的指令、偏好和教导，用于在未来的交互中提供参考。

## 格式

### 用户指令条目
用户指令条目应遵循以下格式：

[用户指令摘要]
- Date: [YYYY-MM-DD]
- Context: [提及的场景或时间]
- Instructions:
  - [用户教导或指示的内容，逐行描述]

### 项目知识条目
Agent 在任务执行过程中发现的条目应遵循以下格式：

[项目知识摘要]
- Date: [YYYY-MM-DD]
- Context: Agent 在执行 [具体任务描述] 时发现
- Category: [代码结构|代码模式|代码生成|构建方法|测试方法|依赖关系|环境配置]
- Instructions:
  - [具体的知识点，逐行描述]

## 去重策略
- 添加新条目前，检查是否存在相似或相同的指令
- 若发现重复，跳过新条目或与已有条目合并
- 合并时，更新上下文或日期信息
- 这有助于避免冗余条目，保持记忆文件整洁

## 条目

[项目使用 Next App Router 与本地 Markdown 博客]
- Date: 2026-04-21
- Context: Agent 在执行 UI 重构与博客文件查找修复时发现
- Category: 代码结构
- Instructions:
  - 项目基于 Next.js App Router，主要页面位于 `app/`
  - 博客内容通过 `content/blog/*.md` 提供，页面和 API 都依赖 `lib/posts.ts` 读取

[项目常用开发命令]
- Date: 2026-04-21
- Context: Agent 在执行 UI 重构与博客文件查找修复时发现
- Category: 构建方法
- Instructions:
  - 本地开发使用 `npm run dev`
  - 构建使用 `npm run build`
  - 静态检查使用 `npm run lint`
  - 纯逻辑测试使用 `npm run test`
