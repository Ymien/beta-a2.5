import { getPostData, getSortedPostsData } from "@/lib/posts";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import SiteHeader from "@/components/SiteHeader";

export async function generateStaticParams() {
  const posts = getSortedPostsData();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default function Post({ params }: { params: { slug: string } }) {
  const post = getPostData(params.slug);

  if (!post) return <div className="text-center mt-32">Post not found.</div>;

  return (
    <div className="min-h-screen bg-[#f7f2e8] text-[#1e1c16]">
      <SiteHeader />

      <main className="mx-auto max-w-3xl px-4 py-10 md:px-6 md:py-14">
        <article className="rounded-[28px] border border-black/10 bg-white/70 px-6 py-10 shadow-[0_18px_60px_rgba(0,0,0,0.06)] backdrop-blur-xl md:px-10">
          <header className="mb-10 border-b border-black/10 pb-7">
            <time className="font-mono text-xs tracking-widest uppercase text-black/55 mb-4 block">
              {post.date}
            </time>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#1e1c16] leading-tight">
              {post.title}
            </h1>
          </header>
          <div className="prose max-w-none prose-headings:tracking-tight prose-a:text-[#b45309] prose-a:no-underline hover:prose-a:underline prose-code:rounded prose-code:bg-black/5 prose-code:px-1 prose-code:py-0.5 prose-pre:rounded-2xl prose-pre:border prose-pre:border-black/10 prose-pre:bg-black/90 prose-pre:text-white">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
          </div>
        </article>
      </main>
    </div>
  );
}
