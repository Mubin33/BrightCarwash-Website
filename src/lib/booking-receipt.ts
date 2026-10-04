import type { ServiceData } from '@/data/services';

// Only fields used to display the confirmation; never retain contact or vehicle details.
export interface LastBookingDetails {
  services: Pick<ServiceData, 'id' | 'name' | 'duration' | 'price'>[];
  startAt?: string;
  date?: string;
  time?: string;
  total?: number;
}

export const BOOKING_RECEIPT_KEY = 'bookingReceipt.v1';
export const BOOKING_RECEIPT_TTL_MS = 15 * 60 * 1000;

export function sanitizeBookingReceipt(value: unknown): LastBookingDetails | null {
  if (!value || typeof value !== 'object') return null;
  const receipt = value as Record<string, unknown>;
  if (!Array.isArray(receipt.services)) return null;
  const services: LastBookingDetails['services'] = [];
  for (const service of receipt.services) {
    if (!service || typeof service !== 'object' || typeof service.id !== 'string'
      || typeof service.name !== 'string' || typeof service.duration !== 'string'
      || typeof service.price !== 'number' || !Number.isFinite(service.price)) return null;
    services.push({ id: service.id, name: service.name, duration: service.duration, price: service.price });
  }
  const result: LastBookingDetails = { services };
  for (const key of ['startAt', 'date', 'time'] as const) {
    if (typeof receipt[key] === 'string') result[key] = receipt[key];
  }
  if (typeof receipt.total === 'number' && Number.isFinite(receipt.total)) result.total = receipt.total;
  return result;
}

export function writeBookingReceipt(storage: Storage, details: LastBookingDetails | null): void {
  try {
    // Remove a previous receipt even when writing its replacement fails.
    storage.removeItem(BOOKING_RECEIPT_KEY);
    const receipt = sanitizeBookingReceipt(details);
    if (receipt) storage.setItem(BOOKING_RECEIPT_KEY, JSON.stringify({
      expiresAt: Date.now() + BOOKING_RECEIPT_TTL_MS, receipt,
    }));
  } catch { /* The current confirmation still works in memory if storage is unavailable. */ }
}

export function readBookingReceipt(storage: Storage): LastBookingDetails | null {
  try {
    const raw = storage.getItem(BOOKING_RECEIPT_KEY);
    if (!raw) return null;
    const value = JSON.parse(raw);
    const now = Date.now();
    if (typeof value?.expiresAt === 'number' && value.expiresAt > now
      && value.expiresAt <= now + BOOKING_RECEIPT_TTL_MS) {
      const receipt = sanitizeBookingReceipt(value.receipt);
      if (receipt) return receipt;
    }
  } catch { /* Invalid or inaccessible session data must not interrupt booking. */ }
  try { storage.removeItem(BOOKING_RECEIPT_KEY); } catch { /* Storage access denied. */ }
  return null;
}
