"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Message {
  id: string;
  role: "user" | "ai" | "system";
  content: string;
}

export default function ChatInterface() {
  const [selectedModel, setSelectedModel] = useState("deepseek");
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { id: Date.now().toString(), role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    const aiMessageId = (Date.now() + 1).toString();
    setMessages((prev) => [...prev, { id: aiMessageId, role: "ai", content: "" }]);

    abortControllerRef.current = new AbortController();

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          modelId: selectedModel,
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
          if (line.startsWith("data: ") && line !== "data: [DONE]") {
            try {
              const data = JSON.parse(line.slice(6));
              if (data.choices && data.choices[0]?.delta?.content) {
                aiText += data.choices[0].delta.content;
                setMessages((prev) => prev.map((msg) => msg.id === aiMessageId ? { ...msg, content: aiText } : msg));
              }
            } catch (e) {
              // Ignore parse errors from partial chunks
            }
          }
        }
      }
    } catch (error: any) {
      if (error.name !== "AbortError") {
        console.error("Chat error:", error);
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
    <div className="flex flex-col min-h-screen bg-black text-cyan-400 font-mono relative overflow-hidden">
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-fuchsia-600/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-cyan-600/10 blur-[150px] rounded-full pointer-events-none" />

      <header className="z-10 flex w-full justify-between items-center p-4 md:p-6 border-b border-cyan-900/30 bg-black/50 backdrop-blur-md">
        <Link 
          href="/" 
          className="text-fuchsia-400 hover:text-fuchsia-300 tracking-widest text-sm uppercase transition-colors drop-shadow-[0_0_8px_rgba(192,38,211,0.8)] flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          返回主站
        </Link>
        <h1 className="text-xl md:text-2xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]">
          SYNAPSE AI
        </h1>
        <div className="flex flex-col md:flex-row items-center gap-2">
          <label className="text-xs text-cyan-500 uppercase tracking-widest opacity-80 hidden md:block">Model</label>
          <select 
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            className="bg-black border border-cyan-900/50 text-cyan-400 text-sm rounded-md px-2 py-1 outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
          >
            <option value="deepseek">DeepSeek 3.2</option>
            <option value="glm4">GLM 4.7</option>
            <option value="doubao1.8">豆包 1.8</option>
            <option value="doubao2.0pro">豆包 2.0 Pro</option>
          </select>
        </div>
      </header>

      <main className="flex-1 w-full max-w-4xl mx-auto p-4 md:p-8 flex flex-col gap-6 z-10 overflow-y-auto mb-24 scroll-smooth">
        {messages.length === 0 && (
          <div className="text-center text-cyan-800/50 mt-20 animate-pulse">
            [ SYSTEM ONLINE. AWAITING INPUT. ]
          </div>
        )}
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex w-full ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div 
              className={`max-w-[90%] md:max-w-[80%] p-4 backdrop-blur-md ${
                msg.role === "user" 
                  ? "bg-cyan-900/40 border border-cyan-500/50 text-white rounded-2xl rounded-tr-none shadow-[0_0_15px_rgba(34,211,238,0.2)]" 
                  : msg.role === "system"
                  ? "bg-red-900/20 border border-red-500/30 text-red-400 rounded-2xl shadow-[0_0_15px_rgba(220,38,38,0.1)]"
                  : "bg-fuchsia-900/20 border border-fuchsia-500/30 text-cyan-50 rounded-2xl rounded-tl-none shadow-[0_0_15px_rgba(192,38,211,0.1)] prose prose-invert prose-cyan max-w-none"
              }`}
            >
              <div className="text-xs opacity-50 mb-2 tracking-widest uppercase flex items-center gap-2">
                {msg.role === "user" ? "USER_INPUT" : msg.role === "system" ? "SYSTEM_ERROR" : `SYSTEM_AI // ${selectedModel.toUpperCase()}`}
              </div>
              {msg.role === "user" || msg.role === "system" ? (
                <div className="leading-relaxed whitespace-pre-wrap">
                  {msg.content}
                </div>
              ) : (
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {msg.content || "..."}
                </ReactMarkdown>
              )}
            </div>
          </div>
        ))}
        
        {isLoading && messages.length > 0 && messages[messages.length - 1].role === "user" && (
          <div className="flex w-full justify-start">
            <div className="max-w-[85%] p-4 rounded-2xl rounded-tl-none bg-fuchsia-900/20 border border-fuchsia-500/30 text-cyan-50 backdrop-blur-md flex items-center gap-2">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </main>

      <footer className="fixed bottom-0 w-full border-t border-cyan-900/30 bg-black/80 backdrop-blur-xl z-20 p-4">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-4 items-center">
          <form 
            onSubmit={handleSubmit}
            className="w-full flex gap-4"
          >
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter your command sequence..."
              className="flex-1 bg-white/5 border border-cyan-900/50 rounded-xl px-4 md:px-6 py-3 md:py-4 text-white placeholder-cyan-900/50 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all shadow-inner"
              disabled={isLoading}
            />
            {isLoading ? (
              <button 
                type="button"
                onClick={stop}
                className="px-6 py-3 md:px-8 md:py-4 bg-red-900/50 hover:bg-red-800/80 border border-red-500/50 text-red-200 font-bold rounded-xl transition-all shadow-[0_0_15px_rgba(220,38,38,0.4)]"
              >
                STOP
              </button>
            ) : (
              <button 
                type="submit"
                disabled={!input.trim()}
                className="px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(34,211,238,0.4)]"
              >
                SEND
              </button>
            )}
          </form>
        </div>
      </footer>
    </div>
  );
}