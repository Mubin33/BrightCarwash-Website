import { api } from "@/lib/http";
import type { ServicesResponse } from '@/types/services';
import { transformService } from '@/data/services';

export async function fetchServices(locationId?: string): Promise<ReturnType<typeof transformService>[]> {
    const params = new URLSearchParams();
    if (locationId) params.set('locationId', locationId);
    const { data } = await api.get<ServicesResponse>(`/appointments/services?${params}`);
    return data.data.map(transformService);
}