import type { ApiFaq } from '@/types/faq';

export interface FaqItem {
    id: string;
    question: string;
    answer: string;
}

export function transformFaq(api: ApiFaq): FaqItem {
    return { id: api.id, question: api.question, answer: api.answer };
}