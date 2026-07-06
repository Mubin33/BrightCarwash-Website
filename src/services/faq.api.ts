import axios from 'axios';
import type { FaqResponse } from '@/types/faq';
import { transformFaq } from '@/data/faq';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function fetchFaqs() {
    const { data } = await axios.get<FaqResponse>(`${API_BASE}/faq`);
    return data.data.map(transformFaq);
}