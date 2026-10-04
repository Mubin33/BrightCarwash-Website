import { api } from "@/lib/http";
import type { LocationsResponse } from '@/types/locations';

export async function fetchLocations() {
    const { data } = await api.get<LocationsResponse>(`/appointments/locations`);
    return data.data;
}