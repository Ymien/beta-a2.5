import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [".monkeycode-ai.online"],
  outputFileTracingIncludes: {
    "/blog/[slug]": ["./content/blog/**"],
    "/api/posts": ["./content/blog/**"],
    "/api/post": ["./content/blog/**"],
  },
};

export default nextConfig;
