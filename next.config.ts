import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'tooth-availability-coupons-stays.trycloudflare.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'items-images-sandbox.s3.us-west-2.amazonaws.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'bridge-decent-operational-power.trycloudflare.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 's3.us-east-1.amazonaws.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;