import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { normalizePostSlug } from "@/lib/post-slug";

export interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
}

const postsDirectory = path.join(process.cwd(), "content/blog");

function readPostFromFile(filePath: string, slug: string): Post | null {
  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContents = fs.readFileSync(filePath, "utf8");
  const matterResult = matter(fileContents);
  const title = String(matterResult.data.title || slug);
  const date = String(matterResult.data.date || "");
  const excerpt = String(matterResult.data.excerpt || "");

  return {
    slug,
    title,
    date,
    excerpt,
    content: matterResult.content,
  };
}

export function getSortedPostsData(): Post[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const allPostsData = fs
    .readdirSync(postsDirectory, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith(".md"))
    .map((entry) => {
      const slug = entry.name.replace(/\.md$/i, "");
      return readPostFromFile(path.join(postsDirectory, entry.name), slug);
    })
    .filter((post): post is Post => post !== null);

  return allPostsData.sort((a, b) => {
    return b.date.localeCompare(a.date);
  });
}

export function getPostData(slug: string): Post | undefined {
  const safeSlug = normalizePostSlug(slug);
  if (!safeSlug) return undefined;

  const fullPath = path.join(postsDirectory, `${safeSlug}.md`);
  return readPostFromFile(fullPath, safeSlug) ?? undefined;
}
