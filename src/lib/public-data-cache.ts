const CACHE_TTL_MS = 5 * 60 * 1000;
const MAX_CACHE_ENTRIES = 100;

interface CacheEntry {
  expiresAt: number;
  value?: unknown;
  promise?: Promise<unknown>;
}

const entries = new Map<string, CacheEntry>();

function pruneCache(now: number): void {
  for (const [key, entry] of entries) {
    if (!entry.promise && entry.expiresAt <= now) entries.delete(key);
  }

  while (entries.size > MAX_CACHE_ENTRIES) {
    const oldest = [...entries]
      .filter(([, entry]) => !entry.promise)
      .sort(([, left], [, right]) => left.expiresAt - right.expiresAt)[0];
    if (!oldest) return;
    entries.delete(oldest[0]);
  }
}

export function fetchCachedPublicData<T>(
  key: string,
  fetchData: () => Promise<T>,
): Promise<T> {
  const now = Date.now();
  pruneCache(now);

  const cached = entries.get(key);
  if (cached?.promise) return cached.promise as Promise<T>;
  if (cached && cached.expiresAt > now && "value" in cached) {
    return Promise.resolve(cached.value as T);
  }

  const entry: CacheEntry = { expiresAt: 0 };
  const request = fetchData().then(
    (value) => {
      if (entries.get(key) === entry) {
        entry.value = value;
        entry.expiresAt = Date.now() + CACHE_TTL_MS;
        delete entry.promise;
      }
      return value;
    },
    (error: unknown) => {
      if (entries.get(key) === entry) entries.delete(key);
      throw error;
    },
  );
  entry.promise = request;
  entries.set(key, entry);
  return request;
}
