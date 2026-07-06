import axios from 'axios';
import type { GalleryResponse } from '@/types/gallery';
import { transformGalleryImage } from '@/data/gallery';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function fetchGallery() {
    const { data } = await axios.get<GalleryResponse>(`${API_BASE}/gallery`);
    return data.data.map((img, i) => transformGalleryImage(img, i));
}