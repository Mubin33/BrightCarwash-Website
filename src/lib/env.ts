function required(name: string, value: string | undefined): string {
  if (!value?.trim()) throw new Error(`Missing required environment variable: ${name}. See .env.example.`);
  return value.trim();
}

function httpUrl(name: string, value: string | undefined): string {
  const raw = required(name, value);
  try {
    const url = new URL(raw);
    if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password || url.search || url.hash) {
      throw new Error('Invalid base URL');
    }
  } catch {
    throw new Error(`${name} must be an absolute HTTP(S) base URL without credentials, query parameters, or fragments.`);
  }
  return raw.replace(/\/+$/, '');
}

function squareEnvironment(value: string | undefined): 'sandbox' | 'production' {
  const environment = required('NEXT_PUBLIC_SQUARE_ENVIRONMENT', value).toLowerCase();
  if (environment !== 'sandbox' && environment !== 'production') {
    throw new Error('NEXT_PUBLIC_SQUARE_ENVIRONMENT must be sandbox or production.');
  }
  return environment;
}

// Keep direct references so Next.js can inline public values during the build.
// Imported by next.config.ts to validate before building or starting the app.
export const API_BASE = httpUrl('NEXT_PUBLIC_API_BASE_URL', process.env.NEXT_PUBLIC_API_BASE_URL);
export const AI_API_BASE = httpUrl('NEXT_PUBLIC_API_BASE_AI_URL', process.env.NEXT_PUBLIC_API_BASE_AI_URL);
export const SQUARE_APP_ID = required('NEXT_PUBLIC_SQUARE_APP_ID', process.env.NEXT_PUBLIC_SQUARE_APP_ID);
export const SQUARE_ENVIRONMENT = squareEnvironment(process.env.NEXT_PUBLIC_SQUARE_ENVIRONMENT);
