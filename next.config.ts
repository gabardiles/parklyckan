import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // All imagery is self-hosted under /public — no external image hosts.
  images: {
    // Serve modern formats; AVIF first (smaller), WebP fallback.
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000, // cache optimized images for a year
  },
  poweredByHeader: false,
  compress: true,
};

export default nextConfig;
