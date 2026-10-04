import type { LockSlotRequest, LockSlotResponse } from '@/types/booking';
import { REQUEST_TIMEOUT_MS } from '@/lib/http-client';
import { api } from "@/lib/http";

import { API_BASE } from "@/lib/env";

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
    const { data } = await api.post(`/appointments/availability`, params);
    return data.data;
}

export async function lockSlot(params: LockSlotRequest): Promise<LockSlotResponse> {
    const { data } = await api.post<{ data: LockSlotResponse }>(`/appointments/lock`, params);
    return data.data;
}

export interface ReleaseLockParams {
    locationId: string;
    startAt: string;
    lockToken: string;
}

const releaseLockUrl = `${API_BASE}/appointments/lock/release`;

export async function releaseLock(params: ReleaseLockParams) {
    const { data } = await api.post(releaseLockUrl, params);
    return data;
}

/** Best-effort release during navigation/unload; keepalive lets the request outlive the page. */
export async function releaseLockBeacon(params: ReleaseLockParams): Promise<boolean> {
    if (!params.locationId || !params.startAt || !params.lockToken) return false;

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
    try {
        const response = await fetch(releaseLockUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(params),
            keepalive: true,
            signal: controller.signal,
        });
        return response.ok;
    } catch {
        return false;
    } finally {
        clearTimeout(timer);
    }
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
    const { data } = await api.post(`/appointments/checkout`, params, { timeout: 30_000 });
    return data;
}