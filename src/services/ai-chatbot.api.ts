import { aiApi as api } from "@/lib/http";

export interface ChatMessage {
  role: "assistant" | "user" | string;
  content: string;
}

export interface Campaign {
  id: number;
  title: string;
  description?: string;
  image: string | null;
  is_active: boolean;
  start_date?: string | null;
  end_date?: string | null;
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
  campaigns?: Campaign[];
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
  const { data } = await api.post<ApiResponse<ChatSessionData>>(
    "/sessions/",
    payload,
  );

  return data.data;
}

export async function chat(
  sessionId: string,
  message: string,
): Promise<ChatSessionData> {
  const { data } = await api.post<ApiResponse<ChatSessionData>>(
    "/chat/message/",
    {
      session_id: sessionId,
      message,
    },
  );

  return data.data;
}
