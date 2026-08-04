// src/types/booking.ts

export interface ContactValues {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    note: string;
}

export interface BookingValidationErrors {
    firstName?: string;
    lastName?: string;
    phone?: string;
    email?: string;
    agreed?: string;
}

export interface AppointmentSummary {
    subtotalInCents: number;
    taxInCents: number;
    totalInCents: number;
    totalDurationMinutes: number;
    currency: string;
}

export interface CheckoutRequest {
    locationId: string;
    startAt: string;
    lockToken: string;
    cartItems: {
        serviceVariationId: string;
        teamMemberId: string;
    }[];
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    customerNote: string;
    vehicle: string;
    nonce: string;
}

export interface LockSlotRequest {
    locationId: string;
    startAt: string;
    serviceVariationIds: string[];
    cartId: string;
}

export interface ReleaseLockRequest {
    locationId: string;
    startAt: string;
    lockToken: string;
}

export interface AvailabilityRequest {
    locationId: string;
    serviceVariationIds: string[];
    startAt: string;
    endAt: string;
}

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