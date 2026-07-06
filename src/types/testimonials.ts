export interface ApiTestimonial {
    id: string;
    avatar: string | null;
    name: string;
    designation: string;
    review_text: string;
    ratings: number;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export interface TestimonialsResponse {
    success: boolean;
    message: string;
    data: {
        testimonials: ApiTestimonial[];
        meta: {
            totalItems: number;
            itemCount: number;
            itemsPerPage: number;
            totalPages: number;
            currentPage: number;
            hasNextPage: boolean;
            hasPreviousPage: boolean;
        };
    };
}