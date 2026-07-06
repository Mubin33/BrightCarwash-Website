export interface ApiNewsCategory {
    id: string;
    name: string;
    slug: string;
    created_at: string;
    updated_at: string;
}

export interface NewsCategoriesResponse {
    success: boolean;
    message: string;
    data: ApiNewsCategory[];
}

export interface ApiNewsArticle {
    id: string;
    title: string;
    slug: string;
    content: string;
    summary: string;
    image_url: string;
    category_id: string;
    is_published: boolean;
    created_at: string;
    updated_at: string;
    created_by_id: string;
    category: {
        name: string;
        slug: string;
    };
    creator: {
        first_name: string;
        last_name: string;
        email: string;
    };
}

export interface NewsListResponse {
    success: boolean;
    message: string;
    data: {
        items: ApiNewsArticle[];
        meta: {
            total: number;
            page: number;
            limit: number;
            total_pages: number;
            next_page: number | null;
            prev_page: number | null;
        };
    };
}

export interface NewsDetailResponse {
    success: boolean;
    message: string;
    data: ApiNewsArticle;
}