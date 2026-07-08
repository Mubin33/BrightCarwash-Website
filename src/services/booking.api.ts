import axios from 'axios';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

export interface AvailabilitySlot {
    startAt: string;
    locationId: string;
    appointmentSegments: {
        durationMinutes: number;
        teamMemberId: string;
        serviceVariationId: string;
        serviceVariationVersion: string;
    }[];
}

export interface AvailabilityResponse {
    locationId: string;
    range: { startAt: string; endAt: string };
    slots: AvailabilitySlot[];
}

export async function getAvailability(params: {
    locationId: string;
    serviceVariationIds: string[];
    startAt: string;
    endAt: string;
}): Promise<AvailabilityResponse> {
    const { data } = await axios.post(`${API_BASE}/appointments/availability`, params);
    return data.data;
}

export async function lockSlot(params: {
    locationId: string;
    startAt: string;
    serviceVariationIds: string[];
    cartId: string;
}) {
    const { data } = await axios.post(`${API_BASE}/appointments/lock`, params);
    return data.data;
}

export async function releaseLock(params: {
    locationId: string;
    startAt: string;
    lockToken: string;
}) {
    const { data } = await axios.post(`${API_BASE}/appointments/lock/release`, params);
    return data;
}

export async function checkoutBooking(params: {
    locationId: string;
    startAt: string;
    lockToken: string;
    cartItems: { serviceVariationId: string; teamMemberId: string }[];
    sourceId: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    customerNote: string;
    vehicle: string;
}) {
    const { data } = await axios.post(`${API_BASE}/appointments/checkout`, params);
    return data;
}