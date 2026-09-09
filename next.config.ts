import type { NextConfig } from "next";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const imageUrl = process.env.NEXT_PUBLIC_IMAGEURL;

const nextConfig: NextConfig = {
  reactCompiler: true,

  images: {
    remotePatterns: [
      ...(apiBaseUrl
        ? [
            {
              protocol: "https" as const,
              hostname: new URL(apiBaseUrl).hostname,
              pathname: "/**",
            },
          ]
        : []),

      ...(imageUrl
        ? [
            {
              protocol: "https" as const,
              hostname: new URL(imageUrl).hostname,
              pathname: "/**",
            },
          ]
        : []),

      {
        protocol: "https",
        hostname: "items-images-sandbox.s3.us-west-2.amazonaws.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "s3.us-east-1.amazonaws.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;

// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   reactCompiler: true,
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "seattle-relating-background-boating.trycloudflare.com",
//         pathname: "/**",
//       },
//       {
//         protocol: "https",
//         hostname: "items-images-sandbox.s3.us-west-2.amazonaws.com",
//         pathname: "/**",
//       },
//       {
//         protocol: "https",
//         hostname: "seattle-relating-background-boating.trycloudflare.com",
//         pathname: "/**",
//       },
//     ],
//   },
// };

// export default nextConfig;
