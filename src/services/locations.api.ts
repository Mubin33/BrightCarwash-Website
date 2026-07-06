import axios from 'axios';
import type { LocationsResponse } from '@/types/locations';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function fetchLocations() {
    const { data } = await axios.get<LocationsResponse>(`${API_BASE}/api/appointments/locations`);
    return data.data;
}