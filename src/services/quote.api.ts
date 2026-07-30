import axios from 'axios';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

interface QuoteParams {
    full_name: string;
    email: string;
    phone: string;
    vehicle_type: string;
    date?: string; // ✅ Add date as optional string
}

export async function submitQuote(params: QuoteParams) {
    const { data } = await axios.post(`${API_BASE}/quote`, params);
    return data;
}