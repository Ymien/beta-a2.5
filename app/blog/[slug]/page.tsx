import { getPostData, getSortedPostsData } from "@/lib/posts";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";

export async function generateStaticParams() {
  const posts = getSortedPostsData();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default function Post({ params }: { params: { slug: string } }) {
  const post = getPostData(params.slug);

  if (!post) return <div className="text-white text-center mt-32">Post not found.</div>;

  return (
    <div className="min-h-screen bg-slate-950 text-zinc-300 font-sans relative">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-[-10%] w-[50%] h-[50%] bg-cyan-900/10 blur-[150px] mix-blend-screen" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-900/10 blur-[150px] mix-blend-screen" />
      </div>

      <header className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-3xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="text-zinc-400 hover:text-white transition-colors flex items-center gap-2 text-sm font-medium">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
            Back to Home
          </Link>
          <span className="font-bold text-white tracking-wider flex items-center gap-2">Xyu</span>
        </div>
      </header>

      <main className="relative z-10 max-w-3xl mx-auto px-6 pt-32 pb-24">
        <article className="prose prose-invert prose-cyan max-w-none">
          <header className="mb-12 border-b border-white/5 pb-8">
            <time className="text-cyan-500 font-mono text-sm tracking-widest uppercase mb-4 block">
              {post.date}
            </time>
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
              {post.title}
            </h1>
          </header>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.content}
          </ReactMarkdown>
        </article>
      </main>
    </div>
  );
}