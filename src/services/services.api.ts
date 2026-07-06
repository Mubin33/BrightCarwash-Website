import axios from 'axios';
import type { ServicesResponse, ApiService } from '@/types/services';
import { transformService } from '@/data/services';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function fetchServices(locationId?: string): Promise<ReturnType<typeof transformService>[]> {
    const params = new URLSearchParams();
    if (locationId) params.set('locationId', locationId);
    const { data } = await axios.get<ServicesResponse>(`${API_BASE}/appointments/services?${params}`);
    return data.data.map(transformService);
}