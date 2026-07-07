import type { ApiTestimonial } from '@/types/testimonials';

export interface TestimonialData {
    id: string;
    name: string;
    title: string;
    rating: number;
    comment: string;
    image: string;
    tall?: boolean;
    featured?: boolean;
}

export function transformTestimonial(api: ApiTestimonial): TestimonialData {
    return {
        id: api.id,
        name: api.name,
        title: api.designation,
        rating: api.ratings,
        comment: api.review_text,
        image: api.avatar || '',
        tall: api.review_text.length > 200,
        featured: false,
    };
}