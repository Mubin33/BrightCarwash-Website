export interface ApiGalleryImage {
    id: string;
    name: string;
    image: string;
    created_at: string;
    updated_at: string;
}

export interface GalleryResponse {
    success: boolean;
    message: string;
    data: ApiGalleryImage[];
}