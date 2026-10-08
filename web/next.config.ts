import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The shared db package is plain TypeScript compiled to ESM; let Next bundle it.
  transpilePackages: ["@community-pulse/db"],
};

export default nextConfig;
