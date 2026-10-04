import { API_BASE, AI_API_BASE } from "./src/lib/env";
import type { NextConfig } from "next";
import { securityHeaders } from "./src/lib/security-headers";
import { imageRemotePatterns } from "./src/lib/image-optimization";

const nextConfig: NextConfig = {
  reactCompiler: true,
  output: "standalone",

  images: {
    remotePatterns: imageRemotePatterns,
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders({
          apiUrls: [API_BASE, AI_API_BASE],
          imageUrl: process.env.NEXT_PUBLIC_IMAGEURL,
          development: process.env.NODE_ENV === "development",
        }),
      },
    ];
  },

  async redirects() {
    return [
      {
        source: "/store",
        destination: "https://brightsidecw.qbstores.com/",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
