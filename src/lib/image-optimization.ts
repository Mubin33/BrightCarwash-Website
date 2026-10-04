// Shared with next.config.ts so external CMS images only use allowed hosts.
const imageHosts = [
  "bright-carwash-api.pixelstack.cloud",
  "**.pixelstack.cloud",
  "items-images-sandbox.s3.us-west-2.amazonaws.com",
  "s3.us-east-1.amazonaws.com",
  "**.amazonaws.com",
];

export const imageRemotePatterns = imageHosts.map((hostname) => ({
  protocol: "https" as const,
  hostname,
  pathname: "/**",
}));

// This original repeatedly times out when fetched by the Next.js optimizer.
// Bypass only this asset; keep resizing and compression for other S3 images.
const directImageSources = new Set([
  'https://items-images-sandbox.s3.us-west-2.amazonaws.com/files/6a4297a6880f7d9a85a0661fb919a72f9770c3b5/original.png',
]);

/** Preserve direct loading for external sources outside the optimizer allowlist. */
export function shouldBypassImageOptimization(src: string): boolean {
  if (src.startsWith("/") && !src.startsWith("//")) return false;

  try {
    const url = new URL(src);
    if (directImageSources.has(`${url.origin}${url.pathname}`)) return true;
    return !imageRemotePatterns.some((pattern) => {
      const matchesHost = pattern.hostname.startsWith("**.")
        ? url.hostname.endsWith(pattern.hostname.slice(2))
        : url.hostname === pattern.hostname;
      return url.protocol === `${pattern.protocol}:` && matchesHost;
    });
  } catch {
    return true;
  }
}
