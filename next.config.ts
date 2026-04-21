import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    allowedHosts: [".monkeycode-ai.online"],
  } as NextConfig["experimental"] & { allowedHosts: string[] },
  outputFileTracingIncludes: {
    "/blog/[slug]": ["./content/blog/**"],
    "/api/posts": ["./content/blog/**"],
    "/api/post": ["./content/blog/**"],
  },
};

export default nextConfig;
