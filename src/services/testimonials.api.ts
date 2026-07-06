import axios from 'axios';
import type { TestimonialsResponse } from '@/types/testimonials';
import { transformTestimonial } from '@/data/testimonials';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function fetchTestimonials(page = 1, limit = 10) {
    const { data } = await axios.get<TestimonialsResponse>(`${API_BASE}/testimonials?page=${page}&limit=${limit}`);
    return data.data.testimonials.map(transformTestimonial);
}