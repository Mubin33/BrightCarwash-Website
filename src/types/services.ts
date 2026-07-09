export interface ServiceVariation {
    id: string;
    version: string;
    name: string;
    durationMinutes: number;
    priceInCents: number;
    currency: string;
    images: string[];
}

export interface ApiService {
    id: string;
    name: string;
    description: string;
    descriptionHtml: string | null;
    variations: ServiceVariation[];
    images: string[];
}

export interface ServicesResponse {
    success: boolean;
    message: string;
    length: number;
    data: ApiService[];
    nextCursor: string | null;
}