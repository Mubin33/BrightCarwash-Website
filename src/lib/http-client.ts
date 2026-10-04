import axios, { type InternalAxiosRequestConfig } from "axios";

export const REQUEST_TIMEOUT_MS = 10_000;

type RetryConfig = InternalAxiosRequestConfig & { retryCount?: number };

export type ApiFailure = {
  kind: "timeout" | "network" | "cancelled" | "http" | "unknown";
  message: string;
  status?: number;
};

export function getApiFailure(error: unknown, fallback = "Request failed. Please try again."): ApiFailure {
  if (axios.isCancel(error)) return { kind: "cancelled", message: "Request cancelled." };
  if (!axios.isAxiosError(error)) return { kind: "unknown", message: fallback };
  if (error.code === "ECONNABORTED" || error.code === "ETIMEDOUT") {
    return { kind: "timeout", message: "The server took too long to respond. Please try again." };
  }
  if (!error.response && (error.code === "ERR_NETWORK" || error.request)) {
    return { kind: "network", message: "Unable to reach the server. Please check your connection." };
  }
  const message: unknown = error.response?.data?.message;
  const messages = Array.isArray(message) ? message.filter((value): value is string => typeof value === "string") : [];
  return {
    kind: error.response ? "http" : "unknown",
    status: error.response?.status,
    message: (typeof message === "string" ? message : messages.join(", ")) || fallback,
  };
}

export function createHttpClient(baseURL: string, timeout = REQUEST_TIMEOUT_MS) {
  const client = axios.create({ baseURL, timeout });

  client.interceptors.response.use(undefined, async (error: unknown) => {
    if (!axios.isAxiosError(error) || axios.isCancel(error)) throw error;
    const config = error.config as RetryConfig | undefined;
    const failure = getApiFailure(error);
    const retryable = failure.kind === "network" || failure.kind === "timeout"
      || [502, 503, 504].includes(failure.status ?? 0);
    if (!config || config.method?.toLowerCase() !== "get" || !retryable
      || config.signal?.aborted || (config.retryCount ?? 0) >= 2) throw error;

    config.retryCount = (config.retryCount ?? 0) + 1;
    await new Promise((resolve) => setTimeout(resolve, 500 * 2 ** (config.retryCount! - 1)));
    // Axios checks cancellation before dispatching the next attempt.
    return client.request(config);
  });

  // Preserve Axios errors and response metadata for existing status-based hooks.
  return client;
}
