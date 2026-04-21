import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import SiteHeader from "@/components/SiteHeader";
import { getPostData } from "@/lib/posts";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostData(slug);

  if (!post) {
    return {
      title: "Post not found | Blank Space",
    };
  }

  return {
    title: `${post.title} | Blank Space`,
    description: post.excerpt,
  };
}

export default async function Post({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostData(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#f6efe3] text-[#15130f]">
      <SiteHeader active="/blog" />

      <main className="mx-auto max-w-5xl px-4 pb-16 pt-6 md:px-6 md:pb-24 md:pt-8">
        <article className="overflow-hidden rounded-[36px] border border-black/10 bg-white/82 shadow-[0_24px_90px_rgba(15,23,42,0.08)] backdrop-blur-xl">
          <header className="border-b border-black/10 bg-[linear-gradient(135deg,rgba(255,250,243,0.92),rgba(247,238,223,0.95))] px-6 py-8 md:px-10 md:py-10">
            <Link
              href="/"
              className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-black/10 bg-white/85 px-4 py-2 text-sm font-medium text-black/65 transition hover:bg-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Back home
            </Link>

            <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-black/50">
              <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/72 px-4 py-2">
                <CalendarDays className="h-4 w-4 text-[#b45309]" />
                {post.date}
              </span>
              <span className="rounded-full border border-black/10 bg-white/72 px-4 py-2">Markdown</span>
            </div>

            <h1 className="mt-6 max-w-4xl font-[var(--font-display)] text-4xl font-medium leading-tight tracking-tight text-[#15130f] md:text-6xl">
              {post.title}
            </h1>

            {post.excerpt ? <p className="mt-5 max-w-2xl text-base leading-8 text-black/60 md:text-lg">{post.excerpt}</p> : null}
          </header>

          <div className="px-6 py-8 md:px-10 md:py-10">
            <div className="prose prose-lg max-w-none prose-headings:font-[var(--font-display)] prose-headings:tracking-tight prose-p:text-black/70 prose-li:text-black/70 prose-strong:text-[#15130f] prose-a:text-[#b45309] prose-a:no-underline hover:prose-a:underline prose-code:rounded prose-code:bg-black/5 prose-code:px-1 prose-code:py-0.5 prose-pre:rounded-[24px] prose-pre:border prose-pre:border-black/10 prose-pre:bg-[#15130f] prose-pre:text-white">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
            </div>
          </div>
        </article>
      </main>
    </div>
  );
}
