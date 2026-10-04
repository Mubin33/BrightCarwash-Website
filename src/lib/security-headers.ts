interface SecurityHeaderOptions {
  apiUrls: string[];
  imageUrl?: string;
  development: boolean;
}

const frames = [
  "'self'",
  'https://app.flexwash.com',
  'https://www.google.com/maps/embed',
  'https://*.squarecdn.com',
  'https://*.squareupsandbox.com',
  'https://*.squareup.com',
].join(' ');

// Keep both Square environments available for sandbox verification and production.
const squareScripts = 'https://web.squarecdn.com https://sandbox.web.squarecdn.com';

export function securityHeaders({ apiUrls, imageUrl, development }: SecurityHeaderOptions) {
  const apiOrigins = [...new Set(apiUrls.map(url => new URL(url).origin))].join(' ');
  let imageOrigin = '';
  try { if (imageUrl) imageOrigin = new URL(imageUrl).origin; }
  catch { /* Relative image paths are already covered by self. */ }

  // Do not enforce resource restrictions until checkout and inline Next.js scripts
  // have been validated. Report-only violations appear in the browser console.
  const reportOnly = [
    "default-src 'self'",
    `script-src 'self' ${squareScripts}${development ? " 'unsafe-eval'" : ''}`,
    `style-src 'self' 'unsafe-inline' ${squareScripts}`,
    `connect-src 'self' ${apiOrigins} ${squareScripts} https://pci-connect.squareup.com https://pci-connect.squareupsandbox.com https://o160250.ingest.sentry.io${development ? ' ws: wss:' : ''}`,
    `img-src 'self' data: blob: https://*.pixelstack.cloud https://*.amazonaws.com ${imageOrigin}`,
    "font-src 'self' data: https://square-fonts-production-f.squarecdn.com https://d1g145x70srn7h.cloudfront.net",
    `frame-src ${frames}`,
    "object-src 'none'",
    "base-uri 'self'",
    "frame-ancestors 'self'",
  ].join('; ');

  return [
    { key: 'Content-Security-Policy', value: `frame-src ${frames}; frame-ancestors 'self'; object-src 'none'; base-uri 'self';` },
    { key: 'Content-Security-Policy-Report-Only', value: reportOnly },
    { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
    { key: 'X-Content-Type-Options', value: 'nosniff' },
    { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
    // No payment/geolocation restrictions: preserve payment and map capabilities.
    { key: 'Permissions-Policy', value: 'camera=(), microphone=()' },
  ];
}
