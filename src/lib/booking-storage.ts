import { initialBookingState, emptySelection, bookingServiceKey, BOOKING_LOCK_DURATION_MS, type BookingState, type BookingSelection } from './booking-state';
import { isBookingDateKey, isBookingTimestamp } from './bookingValidation';
import type { ServiceData } from '@/data/services';

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isService(value: unknown): value is ServiceData {
  return isRecord(value)
    && ['id', 'name', 'description', 'descriptionHtml', 'duration', 'image', 'variationId', 'locationId']
      .every((key) => typeof value[key] === 'string')
    && typeof value.price === 'number' && Number.isFinite(value.price);
}

export function isStoredServices(value: unknown): value is ServiceData[] {
  return Array.isArray(value) && value.every(isService);
}

export const BOOKING_SNAPSHOT_KEY = 'bookingSnapshot.v1';
const legacyKeys = ['bookingServices', 'bookingLocation', 'bookingLockToken', 'bookingLockTimestamp', 'lastBookingDetails'];

export function readBookingSnapshot(storage: Storage, search = ''): BookingState {
  const state = { ...initialBookingState, hydrated: true };
  // Purge the legacy PII key independently of snapshot migration or write success.
  try { storage.removeItem('lastBookingDetails'); } catch { /* Storage access denied. */ }
  try {
    const raw = storage.getItem(BOOKING_SNAPSHOT_KEY);
    if (raw) {
      let value: unknown;
      try { value = JSON.parse(raw); }
      catch {
        storage.removeItem(BOOKING_SNAPSHOT_KEY);
        return state;
      }
      if (isRecord(value) && 'lastBookingDetails' in value) {
        delete value.lastBookingDetails;
        try { storage.setItem(BOOKING_SNAPSHOT_KEY, JSON.stringify(value)); }
        catch { storage.removeItem(BOOKING_SNAPSHOT_KEY); }
      }
      if (!isRecord(value) || value.version !== 1 || !isStoredServices(value.selectedServices)
        || typeof value.selectedLocation !== 'string') return state;
      state.selectedServices = value.selectedServices;
      state.selectedLocation = value.selectedLocation;
      state.selection = validateSelection(value.selection);
      const lock = value.activeLock;
      if (isRecord(lock) && typeof lock.token === 'string' && !!lock.token.trim()
        && typeof lock.timestamp === 'number' && Number.isFinite(lock.timestamp)
        && lock.timestamp <= Date.now() && Date.now() - lock.timestamp < BOOKING_LOCK_DURATION_MS
        && lock.locationId === state.selectedLocation && lock.startAt === state.selection.startAt
        && lock.serviceKey === bookingServiceKey(state.selectedServices) && !!state.selection.startAt) {
        state.activeLock = { token: lock.token, timestamp: lock.timestamp, locationId: state.selectedLocation,
          startAt: state.selection.startAt, serviceKey: bookingServiceKey(state.selectedServices) };
      }
      return state;
    }
    for (const [key, validator, assign] of [
      ['bookingServices', isStoredServices, (value: ServiceData[]) => { state.selectedServices = value; }],
    ] as const) {
      const saved = storage.getItem(key);
      if (!saved) continue;
      try {
        const value = JSON.parse(saved);
        if (!validator(value)) throw new Error('Invalid saved booking');
        // Each validator above belongs to its corresponding assignment.
        (assign as (value: unknown) => void)(value);
      } catch { console.warn(`Discarding invalid ${key} from localStorage.`); }
    }
    state.selectedLocation = storage.getItem('bookingLocation') || '';
    state.selection = selectionFromSearch(search);
    const token = storage.getItem('bookingLockToken');
    const timestamp = Number(storage.getItem('bookingLockTimestamp'));
    if (token && timestamp > 0 && timestamp <= Date.now() && Date.now() - timestamp < BOOKING_LOCK_DURATION_MS
      && state.selectedLocation && state.selection.startAt && state.selectedServices.length) {
      state.activeLock = { token, timestamp, locationId: state.selectedLocation,
        startAt: state.selection.startAt, serviceKey: bookingServiceKey(state.selectedServices) };
    }
  } catch { /* Storage may be unavailable; booking still works in memory. */ }
  return state;
}

function validateSelection(value: unknown): BookingSelection {
  if (!isRecord(value)) return emptySelection;
  const date = typeof value.date === 'string' && isBookingDateKey(value.date) ? value.date : '';
  const startAt = typeof value.startAt === 'string' && isBookingTimestamp(value.startAt) ? value.startAt : '';
  const teamMemberId = typeof value.teamMemberId === 'string' ? value.teamMemberId : '';
  return { date, startAt: teamMemberId.trim() ? startAt : '', teamMemberId: startAt ? teamMemberId : '' };
}

export function selectionFromSearch(search: string): BookingSelection {
  const params = new URLSearchParams(search);
  return validateSelection({ date: params.get('date'), startAt: params.get('startAt'), teamMemberId: params.get('teamMemberId') });
}

export function writeBookingSnapshot(storage: Storage, state: BookingState): void {
  if (!state.hydrated) return;
  try { storage.removeItem('lastBookingDetails'); } catch { /* Storage access denied. */ }
  try {
    const snapshot = { selectedServices: state.selectedServices, selectedLocation: state.selectedLocation,
      selection: state.selection, activeLock: state.activeLock };
    storage.setItem(BOOKING_SNAPSHOT_KEY, JSON.stringify({ version: 1, ...snapshot }));
    // Only remove legacy data after the replacement has been saved successfully.
    legacyKeys.forEach(key => storage.removeItem(key));
  } catch { /* Quota/private-mode failures must not interrupt checkout. */ }
}
