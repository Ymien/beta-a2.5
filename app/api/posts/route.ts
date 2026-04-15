import { getSortedPostsData } from "@/lib/posts";

export async function GET() {
  const posts = getSortedPostsData().map((p) => ({
    slug: p.slug,
    title: p.title,
    date: p.date,
    excerpt: p.excerpt,
  }));
  return Response.json(posts);
}

