import { getPostData } from "@/lib/posts";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const slug = url.searchParams.get("slug");
  if (!slug) return Response.json({ error: "Missing slug" }, { status: 400 });

  const post = getPostData(slug);
  if (!post) return Response.json({ error: "Post not found" }, { status: 404 });

  return Response.json(post);
}

