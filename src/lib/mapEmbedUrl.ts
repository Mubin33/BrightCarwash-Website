/** Fail closed for malformed or untrusted API-provided map URLs. */
export function getSafeMapEmbedUrl(value: unknown): string | null {
  if (typeof value !== "string") return null;

  try {
    const url = new URL(value);
    if (
      url.origin !== "https://www.google.com" ||
      url.pathname !== "/maps/embed" ||
      url.username ||
      url.password
    ) {
      return null;
    }

    return url.href;
  } catch {
    return null;
  }
}
