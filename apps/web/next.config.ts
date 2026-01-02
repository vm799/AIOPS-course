import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  typedRoutes: false, // Disabled temporarily for build compatibility
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
  // Ignore build errors for now (development phase)
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: true, // Temporarily disabled for build
  },
};

export default nextConfig;
