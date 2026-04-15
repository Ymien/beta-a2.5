import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
}

const postsDirectory = path.join(process.cwd(), "content/blog");

export function getSortedPostsData(): Post[] {
  // Check if directory exists, if not create it
  if (!fs.existsSync(postsDirectory)) {
    fs.mkdirSync(postsDirectory, { recursive: true });
    
    // Create sample posts
    const samplePost1 = `---
title: "The Next-Gen Web: Exploring React Server Components"
date: "2026-04-12"
excerpt: "Diving deep into how React Server Components are reshaping the way we build modern web applications."
---

# The Next-Gen Web: Exploring React Server Components

React Server Components (RSC) represent one of the most significant architectural shifts in the React ecosystem. By moving rendering to the server, we can significantly reduce the JavaScript bundle size sent to the client.

## Why RSC?
- **Zero Bundle Size:** Components rendered on the server send HTML, not JS.
- **Direct Backend Access:** You can fetch data directly from your database without an API layer.
- **Automatic Code Splitting:** Client components are loaded only when needed.

This is just the beginning of a new era of web development.
`;
    const samplePost2 = `---
title: "Building Cyberpunk UIs with Tailwind CSS v4"
date: "2026-04-05"
excerpt: "A practical guide to creating stunning neon glow effects and glassmorphism using pure Tailwind utility classes."
---

# Building Cyberpunk UIs with Tailwind CSS v4

Tailwind CSS v4 introduces powerful new features that make building complex UIs a breeze. Today, we're exploring the cyberpunk aesthetic.

## The Glow Effect
Creating a neon glow is simple with box shadows and backdrop filters.

\`\`\`html
<div className="bg-cyan-500/10 border border-cyan-500/30 shadow-[0_0_15px_rgba(34,211,238,0.5)]">
  Neon Box
</div>
\`\`\`

Combine this with dark themes (\`bg-[#0a0a0a]\`) and you've got a recipe for a stunning futuristic interface.
`;
    
    fs.writeFileSync(path.join(postsDirectory, "react-server-components.md"), samplePost1);
    fs.writeFileSync(path.join(postsDirectory, "cyberpunk-ui-tailwind.md"), samplePost2);
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter(fileName => fileName.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      const matterResult = matter(fileContents);

      return {
        slug,
        title: matterResult.data.title as string,
        date: matterResult.data.date as string,
        excerpt: matterResult.data.excerpt as string,
        content: matterResult.content,
      };
    });

  return allPostsData.sort((a, b) => {
    if (a.date < b.date) return 1;
    return -1;
  });
}

export function getPostData(slug: string): Post | undefined {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return undefined;

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const matterResult = matter(fileContents);

  return {
    slug,
    title: matterResult.data.title,
    date: matterResult.data.date,
    excerpt: matterResult.data.excerpt,
    content: matterResult.content,
  };
}