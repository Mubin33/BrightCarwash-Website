import type { ApiService } from '@/types/services';

export interface ServiceData {
    id: string;
    name: string;
    description: string;
    descriptionHtml: string;
    price: number;
    duration: string;
    image: string;
    variationId: string;
    locationId: string;
}

export function transformService(apiService: ApiService): ServiceData {
    const variation = apiService.variations[0] || {
        id: '', version: '', name: '', durationMinutes: 0, priceInCents: 0, currency: 'USD', images: [],
    };
    const cleanHtml = (apiService.descriptionHtml || apiService.description)
        .replace(/<p>\s*(<br\s*\/?>\s*)*\s*<\/p>/gi, '');
    return {
        id: apiService.id,
        name: apiService.name,
        description: apiService.description,
        descriptionHtml: cleanHtml,
        price: variation.priceInCents / 100,
        duration: variation.durationMinutes >= 60
            ? `${Math.floor(variation.durationMinutes / 60)} hours${variation.durationMinutes % 60 > 0 ? ` ${variation.durationMinutes % 60} min` : ''}`
            : `${variation.durationMinutes} min`,
        image: apiService.images[0] || variation.images[0] || '/images/service.png',
        variationId: variation.id,
        locationId: '',
    };
}