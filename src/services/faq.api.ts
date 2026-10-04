import { api } from "@/lib/http";
import type { FaqResponse } from '@/types/faq';
import { transformFaq } from '@/data/faq';

export async function fetchFaqs() {
    const { data } = await api.get<FaqResponse>(`/faq`);
    return data.data.map(transformFaq);
}