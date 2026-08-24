import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // Railway build must not fail on optional static DB pages
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
  async redirects() {
    return [
      { source: "/product/grok-heavy-1-month", destination: "/product/grok-heavy?variant=1-month", permanent: false },
      { source: "/product/grok-heavy-12-months", destination: "/product/grok-heavy?variant=12-months", permanent: false },
      { source: "/product/cursor-ultra-1-month", destination: "/product/cursor-ultra?variant=1-month", permanent: false },
      { source: "/product/cursor-ultra-12-months", destination: "/product/cursor-ultra?variant=12-months", permanent: false },
    ];
  },
};

export default nextConfig;
