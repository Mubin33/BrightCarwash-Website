export interface ApiFaq {
    id: string;
    question: string;
    answer: string;
    display_order: number;
    created_at: string;
}

export interface FaqResponse {
    success: boolean;
    message: string;
    data: ApiFaq[];
}