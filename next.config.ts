import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
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
