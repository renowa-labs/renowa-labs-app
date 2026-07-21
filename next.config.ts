import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/engineering/building-ai-first-products-from-azerbaijan",
        destination: "/engineering/building-ai-first-products",
        permanent: true,
      },
      {
        source: "/engineering/mobile-first-job-discovery-azerbaijan",
        destination: "/engineering/mobile-first-job-discovery",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "renowa-labs.com" }],
        destination: "https://www.renowa-labs.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
