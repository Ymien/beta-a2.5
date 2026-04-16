"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import SiteHeader from "@/components/SiteHeader";
import { useLang } from "@/components/LangProvider";

interface Message {
  id: string;
  role: "user" | "ai" | "system";
  content: string;
  thinking?: string;
  thinkingOpen?: boolean;
}

type ThinkingType = "auto" | "enabled" | "disabled";

export default function ChatInterface() {
  const { lang } = useLang();
  const ui = useMemo(
    () =>
      lang === "zh"
        ? {
            title: "对话",
            subtitle: "多模型 · 流式输出",
            chooseModel: "选择模型",
            thinking: "思考",
            clear: "清空",
            showThinking: "显示思考",
            hideThinking: "隐藏思考",
            thinkingPanel: "思考过程",
            startHint: "选择模型并输入内容开始对话",
            placeholder: "消息…（Enter 发送，Shift+Enter 换行）",
            stop: "停止",
            send: "发送",
            modeAuto: "AUTO",
            modeOn: "ON",
            modeOff: "OFF",
          }
        : {
            title: "Dialog",
            subtitle: "Multi-model · Streaming",
            chooseModel: "Choose model",
            thinking: "Thinking",
            clear: "Clear",
            showThinking: "Show reasoning",
            hideThinking: "Hide reasoning",
            thinkingPanel: "Reasoning",
            startHint: "Pick a model, then write.",
            placeholder: "Message… (Enter to send, Shift+Enter for a new line)",
            stop: "Stop",
            send: "Send",
            modeAuto: "AUTO",
            modeOn: "ON",
            modeOff: "OFF",
          },
    [lang]
  );
  const models = useMemo(
    () => [
      { id: "doubao2.0pro", name: "Doubao Pro", note: "旗舰全能" },
      { id: "doubao1.8", name: "Doubao 1.8", note: "多模态/Agent" },
      { id: "doubao1.5pro", name: "Doubao 1.5 Pro", note: "32k 对话" },
      { id: "deepseek3.2", name: "DeepSeek 3.2", note: "深度推理" },
      { id: "glm4.7", name: "GLM-4.7", note: "编程推理" },
    ],
    []
  );

  const [selectedModel, setSelectedModel] = useState(models[0]?.id ?? "doubao2.0pro");
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [thinkingType, setThinkingType] = useState<ThinkingType>("auto");
  const [showThinking, setShowThinking] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    if (selectedModel === "glm4.7" && thinkingType === "auto") {
      setThinkingType("disabled");
    }
  }, [selectedModel, thinkingType]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { id: Date.now().toString(), role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    const aiMessageId = (Date.now() + 1).toString();
    setMessages((prev) => [...prev, { id: aiMessageId, role: "ai", content: "", thinking: "", thinkingOpen: false }]);

    abortControllerRef.current = new AbortController();

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          modelId: selectedModel,
          thinkingType,
          messages: [...messages, userMessage].map((m) => ({ role: m.role === "ai" ? "assistant" : m.role, content: m.content })),
        }),
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      if (!response.body) throw new Error("No response body");

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let aiText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");
        
        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed.startsWith("data:")) continue;
          const payload = trimmed.slice(5).trim();
          if (!payload || payload === "[DONE]") continue;

          try {
            const data = JSON.parse(payload);

            const deltaText =
              (typeof data?.choices?.[0]?.delta?.content === "string" &&
                data.choices[0].delta.content) ||
              (typeof data?.delta === "string" && data.delta) ||
              (data?.type === "response.output_text.delta" &&
                typeof data?.delta === "string" &&
                data.delta) ||
              (data?.type === "response.output_text.done" &&
                typeof data?.text === "string" &&
                data.text);

            const thinkingDelta =
              (data?.type === "response.reasoning_text.delta" &&
                typeof data?.delta === "string" &&
                data.delta) ||
              (data?.type === "response.reasoning_text.done" &&
                typeof data?.text === "string" &&
                data.text);

            if (typeof thinkingDelta === "string" && thinkingDelta.length > 0) {
              setMessages((prev) =>
                prev.map((msg) =>
                  msg.id === aiMessageId
                    ? { ...msg, thinking: (msg.thinking || "") + thinkingDelta }
                    : msg
                )
              );
            }

            if (typeof deltaText === "string" && deltaText.length > 0) {
              aiText += deltaText;
              setMessages((prev) =>
                prev.map((msg) =>
                  msg.id === aiMessageId ? { ...msg, content: aiText } : msg
                )
              );
            }
          } catch (e) {}
        }
      }
    } catch (error: any) {
      if (error.name !== "AbortError") {
        setMessages((prev) => [
          ...prev.filter(m => m.id !== aiMessageId),
          { id: aiMessageId, role: "system", content: `Error: ${error.message}` }
        ]);
      }
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  };

  const stop = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f2e8] text-[#1e1c16]">
      <SiteHeader active="chat" />

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 py-6 md:grid-cols-[1fr_360px] md:gap-8 md:px-6 md:py-10">
        <div className="rounded-3xl border border-black/10 bg-white/60 shadow-[0_20px_60px_rgba(0,0,0,0.08)] backdrop-blur-xl">
          <div className="flex flex-col gap-2 border-b border-black/10 px-4 py-4 md:flex-row md:items-center md:justify-between md:px-6">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-2xl bg-black/5 p-2 text-[#1e1c16]">
                <span className="flex h-full w-full items-center justify-center rounded-xl bg-white/70 text-sm font-semibold">
                  N
                </span>
              </div>
              <div className="flex flex-col leading-tight">
                <div className="text-base font-semibold">{ui.title}</div>
                <div className="text-xs text-black/50">{ui.subtitle}</div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 md:justify-end">
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsModelOpen((v) => !v)}
                  className="inline-flex items-center gap-2 rounded-full border border-[#d97706]/25 bg-[#fff6ea] px-4 py-2 text-sm font-medium text-[#b45309] shadow-sm transition hover:border-[#d97706]/40 hover:bg-[#fff1dd]"
                  aria-haspopup="listbox"
                  aria-expanded={isModelOpen}
                >
                  <span className="inline-flex h-2 w-2 rounded-full bg-[#22c55e]" />
                  {models.find((m) => m.id === selectedModel)?.name ?? ui.chooseModel}
                  <span className="text-[#b45309]/70">▾</span>
                </button>
                <div
                  className={`absolute right-0 top-[calc(100%+10px)] w-[min(340px,calc(100vw-2rem))] rounded-3xl border border-black/10 bg-[#fffaf3] p-2 shadow-[0_22px_70px_rgba(0,0,0,0.18)] ${
                    isModelOpen ? "block" : "hidden"
                  }`}
                  role="listbox"
                >
                  {models.map((m) => {
                    const active = m.id === selectedModel;
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => {
                          setSelectedModel(m.id);
                          setIsModelOpen(false);
                        }}
                        className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left transition ${
                          active ? "bg-black/5" : "hover:bg-black/5"
                        }`}
                      >
                        <div className="flex flex-col">
                          <div className="text-sm font-semibold text-[#1e1c16]">
                            {m.name}
                          </div>
                          <div className="text-xs text-black/50">{m.note}</div>
                        </div>
                        <div
                          className={`h-2.5 w-2.5 rounded-full ${
                            active ? "bg-[#d97706]" : "bg-black/10"
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  setThinkingType((v) =>
                    v === "auto" ? "enabled" : v === "enabled" ? "disabled" : "auto"
                  )
                }
                className={`rounded-full border px-4 py-2 text-sm font-medium shadow-sm transition ${
                  thinkingType === "enabled"
                    ? "border-[#0f766e]/30 bg-[#ecfeff] text-[#0f766e] hover:bg-[#cffafe]"
                    : thinkingType === "disabled"
                    ? "border-[#991b1b]/20 bg-[#fef2f2] text-[#991b1b] hover:bg-[#fee2e2]"
                    : "border-black/10 bg-white/60 text-black/60 hover:bg-white"
                }`}
              >
                {ui.thinking}{" "}
                {thinkingType === "auto"
                  ? ui.modeAuto
                  : thinkingType === "enabled"
                  ? ui.modeOn
                  : ui.modeOff}
              </button>

              <button
                type="button"
                onClick={() => setShowThinking((v) => !v)}
                className={`rounded-full border px-4 py-2 text-sm font-medium shadow-sm transition ${
                  showThinking
                    ? "border-black/10 bg-white text-black/70"
                    : "border-black/10 bg-white/60 text-black/60 hover:bg-white"
                }`}
              >
                {showThinking ? ui.hideThinking : ui.showThinking}
              </button>

              <button
                type="button"
                onClick={() => {
                  stop();
                  setMessages([]);
                }}
                className="rounded-full border border-black/10 bg-white/60 px-4 py-2 text-sm font-medium text-black/60 shadow-sm transition hover:bg-white"
              >
                {ui.clear}
              </button>
            </div>
          </div>

          <div className="flex h-[calc(100vh-18rem)] flex-col md:h-[calc(100vh-20rem)]">
            <div className="flex-1 overflow-y-auto px-4 py-5 md:px-6">
              {messages.length === 0 ? (
                <div className="mx-auto mt-14 max-w-md text-center text-sm text-black/40">
                  {ui.startHint}
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {messages.map((msg) => {
                    const isUser = msg.role === "user";
                    const isSystem = msg.role === "system";
                    return (
                      <div
                        key={msg.id}
                        className={`flex ${isUser ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[92%] rounded-3xl border px-4 py-3 text-sm leading-relaxed md:max-w-[80%] ${
                            isUser
                              ? "border-black/10 bg-[#1e1c16] text-[#f7f2e8]"
                              : isSystem
                              ? "border-red-500/20 bg-red-50 text-red-700"
                              : "border-black/10 bg-white/70 text-[#1e1c16] shadow-sm"
                          }`}
                        >
                      {!isUser && !isSystem && showThinking && (msg.thinking || "").length > 0 && (
                        <div className="mb-3 rounded-2xl border border-black/10 bg-black/[0.03] p-3">
                          <button
                            type="button"
                            onClick={() =>
                              setMessages((prev) =>
                                prev.map((m) =>
                                  m.id === msg.id ? { ...m, thinkingOpen: !m.thinkingOpen } : m
                                )
                              )
                            }
                            className="flex w-full items-center justify-between text-xs font-medium text-black/60"
                          >
                            <span>{ui.thinkingPanel}</span>
                            <span className="text-black/35">{msg.thinkingOpen ? "−" : "+"}</span>
                          </button>
                          {msg.thinkingOpen && (
                            <div className="mt-2 whitespace-pre-wrap text-xs leading-relaxed text-black/60">
                              {msg.thinking}
                            </div>
                          )}
                        </div>
                      )}
                          {isUser || isSystem ? (
                            <div className="whitespace-pre-wrap">{msg.content}</div>
                          ) : (
                            <div className="prose prose-sm max-w-none prose-p:my-2 prose-pre:my-3 prose-pre:rounded-2xl prose-pre:border prose-pre:border-black/10 prose-pre:bg-black/90 prose-pre:text-white">
                              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {msg.content || "..."}
                              </ReactMarkdown>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="border-t border-black/10 bg-[#fffaf3] p-4 md:p-6">
              <form onSubmit={handleSubmit} className="flex items-end gap-3">
                <div className="flex-1">
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSubmit(e as unknown as React.FormEvent);
                      }
                    }}
                    rows={2}
                    placeholder={ui.placeholder}
                    className="w-full resize-none rounded-2xl border border-black/10 bg-white/70 px-4 py-3 text-sm text-[#1e1c16] outline-none transition focus:border-[#d97706]/40 focus:ring-2 focus:ring-[#d97706]/20"
                    disabled={isLoading}
                  />
                  <div className="mt-2 text-[11px] text-black/40">
                    {models.find((m) => m.id === selectedModel)?.name} ·{" "}
                    {thinkingType === "auto"
                      ? "自动思考"
                      : thinkingType === "enabled"
                      ? "强制深度思考"
                      : "强制关闭思考"}{" "}
                    · SSE 流式输出
                  </div>
                </div>

                {isLoading ? (
                  <button
                    type="button"
                    onClick={stop}
                    className="h-11 rounded-2xl border border-red-500/20 bg-red-50 px-5 text-sm font-medium text-red-700 shadow-sm transition hover:bg-red-100"
                  >
                    {ui.stop}
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={!input.trim()}
                    className="h-11 rounded-2xl bg-[#e7c7a3] px-6 text-sm font-medium text-[#1e1c16] shadow-sm transition hover:bg-[#ddb98f] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {ui.send}
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>

        <aside className="hidden flex-col gap-4 md:flex">
          <div className="rounded-3xl border border-black/10 bg-white/60 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.08)] backdrop-blur-xl">
            <div className="text-sm font-semibold text-[#1e1c16]">快捷入口</div>
            <div className="mt-4 grid grid-cols-1 gap-2 text-sm">
              <Link
                href="/blog/react-server-components"
                className="rounded-2xl border border-black/10 bg-white/60 px-4 py-3 text-black/70 transition hover:bg-white"
              >
                文章
              </Link>
              <Link
                href="/popup"
                className="rounded-2xl border border-black/10 bg-white/60 px-4 py-3 text-black/70 transition hover:bg-white"
              >
                PopupMorph
              </Link>
              <Link
                href="/tetris"
                className="rounded-2xl border border-black/10 bg-white/60 px-4 py-3 text-black/70 transition hover:bg-white"
              >
                小游戏
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
