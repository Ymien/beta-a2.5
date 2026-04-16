"use client";

import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import SiteHeader from "@/components/SiteHeader";

export default function Post({ params }: { params: { slug: string } }) {
  const [post, setPost] = useState<any | null>(null);
  const [status, setStatus] = useState<"loading" | "ok" | "not_found" | "error">(
    "loading"
  );

  useEffect(() => {
    setStatus("loading");
    fetch(`/api/post?slug=${encodeURIComponent(params.slug)}`)
      .then(async (r) => {
        if (r.status === 404) {
          setStatus("not_found");
          setPost(null);
          return;
        }
        if (!r.ok) {
          setStatus("error");
          setPost(null);
          return;
        }
        const data = await r.json();
        setPost(data);
        setStatus("ok");
      })
      .catch(() => {
        setStatus("error");
        setPost(null);
      });
  }, [params.slug]);

  return (
    <div className="min-h-screen bg-[#fbf7ef] text-[#15130f]">
      <SiteHeader active="blog" />

      <main className="mx-auto max-w-3xl px-4 py-10 md:px-6 md:py-14">
        {status === "loading" ? (
          <div className="rounded-[28px] border border-black/10 bg-white/80 px-6 py-12 text-center text-sm text-black/45 shadow-[0_18px_70px_rgba(0,0,0,0.08)] backdrop-blur-xl md:px-10">
            Loading…
          </div>
        ) : status === "not_found" ? (
          <div className="rounded-[28px] border border-black/10 bg-white/80 px-6 py-12 text-center text-sm text-black/45 shadow-[0_18px_70px_rgba(0,0,0,0.08)] backdrop-blur-xl md:px-10">
            Post not found.
          </div>
        ) : status === "error" || !post ? (
          <div className="rounded-[28px] border border-black/10 bg-white/80 px-6 py-12 text-center text-sm text-black/45 shadow-[0_18px_70px_rgba(0,0,0,0.08)] backdrop-blur-xl md:px-10">
            Failed to load.
          </div>
        ) : (
          <article className="rounded-[28px] border border-black/10 bg-white/80 px-6 py-10 shadow-[0_18px_70px_rgba(0,0,0,0.08)] backdrop-blur-xl md:px-10">
            <header className="mb-10 border-b border-black/10 pb-7">
              <time className="font-mono text-xs tracking-widest uppercase text-black/55 mb-4 block">
                {post.date}
              </time>
              <h1 className="font-[var(--font-display)] text-4xl md:text-6xl font-medium tracking-tight text-[#15130f] leading-tight">
                {post.title}
              </h1>
            </header>
            <div className="prose max-w-none prose-headings:tracking-tight prose-a:text-[#b45309] prose-a:no-underline hover:prose-a:underline prose-code:rounded prose-code:bg-black/5 prose-code:px-1 prose-code:py-0.5 prose-pre:rounded-2xl prose-pre:border prose-pre:border-black/10 prose-pre:bg-black/95 prose-pre:text-white">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
            </div>
          </article>
        )}
      </main>
    </div>
  );
}
