import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    "/blog/[slug]": ["./content/blog/**"],
    "/api/posts": ["./content/blog/**"],
    "/api/post": ["./content/blog/**"],
  },
};

export default nextConfig;
