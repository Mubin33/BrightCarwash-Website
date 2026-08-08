import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "holiday-exposure-pocket-whilst.trycloudflare.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "items-images-sandbox.s3.us-west-2.amazonaws.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "holiday-exposure-pocket-whilst.trycloudflare.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
