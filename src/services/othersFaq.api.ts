import { WashWithPurposeFaq, WashWithPurposeFaqResponse } from "@/types/faq";
import { api } from "@/lib/http";

export async function otherFaqs(): Promise<WashWithPurposeFaq[]> {
  const { data } = await api.get<WashWithPurposeFaqResponse>(
    "/wash-with-purpose-faq",
  );

  return data.data;
}
