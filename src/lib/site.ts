import type { Metadata } from 'next';

export const SITE_NAME = 'Brightside Car Wash';
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://brightsidecarwash.com').replace(/\/$/, '');
export const SITE_DESCRIPTION = 'Premium car wash and detailing services in Naperville. Veteran-owned, family-operated, and built around convenience, quality, and community.';
export const DEFAULT_OG_IMAGE = `${SITE_URL}/images/logo.png`;

/** Keep canonical URLs and social previews specific to each page. */
export function createPageMetadata(
  path: string,
  title: string,
  description: string,
  image = DEFAULT_OG_IMAGE,
  type: 'website' | 'article' = 'website',
): Metadata {
  const url = new URL(path, SITE_URL).toString();
  const socialTitle = `${title} | ${SITE_NAME}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type,
      url,
      siteName: SITE_NAME,
      title: socialTitle,
      description,
      images: [{ url: image, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: socialTitle,
      description,
      images: [image],
    },
  };
}
