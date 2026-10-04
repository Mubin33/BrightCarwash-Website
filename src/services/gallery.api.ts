import { api } from "@/lib/http";
import type { GalleryResponse } from '@/types/gallery';
import { transformGalleryImage } from '@/data/gallery';

export async function fetchGallery() {
    const { data } = await api.get<GalleryResponse>(`/gallery`);
    return data.data.map((img, i) => transformGalleryImage(img, i));
}