import { api } from "@/lib/http";
import type { TestimonialsResponse } from '@/types/testimonials';
import { transformTestimonial } from '@/data/testimonials';

export async function fetchTestimonials(page = 1, limit = 10) {
    const { data } = await api.get<TestimonialsResponse>(`/testimonials?page=${page}&limit=${limit}`);
    return data.data.testimonials.map(transformTestimonial);
}