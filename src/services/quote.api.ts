import { api } from "@/lib/http";

interface QuoteParams {
    full_name: string;
    email: string;
    phone: string;
    vehicle_type: string;
    date?: string; 
}

export async function submitQuote(params: QuoteParams) {
    const { data } = await api.post(`/quote`, params);
    return data;
}