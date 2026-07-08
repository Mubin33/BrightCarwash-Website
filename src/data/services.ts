import type { ApiService, ServiceVariation } from '@/types/services';

export interface ServiceData {
    id: string;
    name: string;
    description: string;
    price: number;
    duration: string;
    image: string;
    variationId: string;
    locationId: string;
}

export function transformService(apiService: ApiService): ServiceData {
    const variation: ServiceVariation = apiService.variations[0] || {
        id: '', version: '', name: '', durationMinutes: 0, priceInCents: 0, currency: 'USD', images: [],
    };
    return {
        id: apiService.id,
        name: apiService.name,
        description: apiService.description,
        price: variation.priceInCents / 100,
        duration: variation.durationMinutes >= 60
            ? `${Math.floor(variation.durationMinutes / 60)} hours${variation.durationMinutes % 60 > 0 ? ` ${variation.durationMinutes % 60} min` : ''}`
            : `${variation.durationMinutes} min`,
        image: apiService.images[0] || variation.images[0] || '/images/service.png',
        variationId: variation.id,
        locationId: '',
    };
}