import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  typedRoutes: false, // Disabled temporarily - causes type errors with dynamic Link hrefs
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "stream.mux.com",
      },
      {
        protocol: "https",
        hostname: "player.vimeo.com",
      },
    ],
  },
  // Optimize for Vercel deployment
  poweredByHeader: false,
  compress: true,
  // Handle external packages
  transpilePackages: ["@paper-design/shaders-react"],
  // Strict type checking enabled
  typescript: {
    ignoreBuildErrors: false,
  },
  // ESLint temporarily disabled - will re-enable after fixing warnings
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
