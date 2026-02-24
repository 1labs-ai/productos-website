import type { NextConfig } from "next";

// Bundle analyzer (run with ANALYZE=true npm run build)
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  // Enable compression for all responses
  compress: true,

  // Disable source maps in production for smaller bundles
  productionBrowserSourceMaps: false,

  // Image optimization settings
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },

  // Experimental optimizations
  experimental: {
    optimizeCss: true,
  },

  // Cache headers for static assets
  async headers() {
    return [
      {
        // Images - immutable cache for 1 year
        source: "/:all*(svg|jpg|jpeg|png|webp|avif|gif|ico)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // JS and CSS - immutable cache for 1 year (hashed filenames)
        source: "/:all*(js|css)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // Fonts - immutable cache for 1 year
        source: "/:all*(woff|woff2|ttf|otf|eot)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default withBundleAnalyzer(nextConfig);
