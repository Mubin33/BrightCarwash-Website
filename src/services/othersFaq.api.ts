import { WashWithPurposeFaq, WashWithPurposeFaqResponse } from "@/types/faq";
import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

const apiClient = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
});

export async function otherFaqs(): Promise<WashWithPurposeFaq[]> {
  const { data } = await apiClient.get<WashWithPurposeFaqResponse>(
    "/wash-with-purpose-faq",
  );

  return data.data;
}
