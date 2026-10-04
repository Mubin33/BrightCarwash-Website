import { API_BASE, AI_API_BASE } from "@/lib/env";
import { createHttpClient } from "@/lib/http-client";

export const api = createHttpClient(API_BASE);
// AI responses and payment processing can take longer than ordinary reads.
export const aiApi = createHttpClient(AI_API_BASE, 30_000);
