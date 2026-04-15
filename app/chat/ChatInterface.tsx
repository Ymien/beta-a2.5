"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

interface Message {
  id: string;
  role: "user" | "ai";
  content: string;
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "ai",
      content: "Hello! I am Synapse AI, your cyberpunk virtual assistant. How can I assist you today?"
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!inputValue.trim() || isTyping) return;

    const newUserMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue.trim(),
    };

    setMessages((prev) => [...prev, newUserMsg]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "Processing your request through the neural network...",
        "Accessing mainframe databases...",
        "I'm analyzing the data. Please standby.",
        "That's an interesting query. According to my neural weights, the answer is embedded in the grid.",
        "System override initiated. Just kidding, I'm just an AI simulation."
      ];
      
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "ai",
        content: responses[Math.floor(Math.random() * responses.length)]
      };
      
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-cyan-400 font-mono relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-fuchsia-600/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-cyan-600/10 blur-[150px] rounded-full pointer-events-none" />

      {/* Header */}
      <header className="z-10 flex w-full justify-between items-center p-6 border-b border-cyan-900/30 bg-black/50 backdrop-blur-md">
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
        <div className="w-[100px]"></div> {/* Spacer */}
      </header>

      {/* Chat Area */}
      <main className="flex-1 w-full max-w-4xl mx-auto p-4 md:p-8 flex flex-col gap-6 z-10 overflow-y-auto mb-24">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex w-full ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div 
              className={`max-w-[85%] md:max-w-[75%] p-4 backdrop-blur-md ${
                msg.role === "user" 
                  ? "bg-cyan-900/40 border border-cyan-500/50 text-white rounded-2xl rounded-tr-none shadow-[0_0_15px_rgba(34,211,238,0.2)]" 
                  : "bg-fuchsia-900/20 border border-fuchsia-500/30 text-cyan-50 rounded-2xl rounded-tl-none shadow-[0_0_15px_rgba(192,38,211,0.1)]"
              }`}
            >
              <div className="text-xs opacity-50 mb-1 tracking-widest uppercase">
                {msg.role === "user" ? "USER_INPUT" : "SYSTEM_AI"}
              </div>
              <div className="leading-relaxed whitespace-pre-wrap">
                {msg.content}
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
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

      {/* Input Area */}
      <footer className="fixed bottom-0 w-full border-t border-cyan-900/30 bg-black/80 backdrop-blur-xl z-20 p-4">
        <div className="max-w-4xl mx-auto flex gap-4">
          <input 
            type="text" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSend();
            }}
            placeholder="Enter your command sequence..."
            className="flex-1 bg-white/5 border border-cyan-900/50 rounded-xl px-6 py-4 text-white placeholder-cyan-900/50 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all shadow-inner"
            disabled={isTyping}
          />
          <button 
            onClick={handleSend}
            disabled={isTyping || !inputValue.trim()}
            className="px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(34,211,238,0.4)]"
          >
            SEND
          </button>
        </div>
      </footer>
    </div>
  );
}