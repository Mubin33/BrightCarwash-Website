import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_AI_URL;
console.log(API_BASE);

const apiClient = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
});

export interface ChatMessage {
  role: "assistant" | "user" | string;
  content: string;
}

export interface ChatSessionData {
  session_id: string;
  user_id: string;
  email?: string;
  status?: string;
  created_at?: string;
  question_type?: string;
  answer?: string;
  messages?: ChatMessage[];
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

const defaultEmail = `guest-${Date.now()}@brightside.ai`;

export async function createSession(params?: {
  email?: string;
  name?: string;
}): Promise<ChatSessionData> {
  const payload = {
    email: params?.email || defaultEmail,
    name: params?.name || "Guest",
  };
  const { data } = await apiClient.post<ApiResponse<ChatSessionData>>(
    "/sessions/",
    payload,
  );

  return data.data;
}

export async function chat(
  sessionId: string,
  message: string,
): Promise<ChatSessionData> {
  const { data } = await apiClient.post<ApiResponse<ChatSessionData>>(
    "/chat/message/",
    {
      session_id: sessionId,
      message,
    },
  );

  return data.data;
}
