import type { ServiceData } from '@/data/services';
import type { LastBookingDetails } from '@/contexts/BookingContext';

export const BOOKING_LOCK_DURATION_MS = 10 * 60 * 1000;

export interface BookingSelection { date: string; startAt: string; teamMemberId: string }
export interface BookingLock { token: string; timestamp: number; locationId: string; startAt: string; serviceKey: string }
export interface BookingState {
  hydrated: boolean;
  selectedServices: ServiceData[];
  selectedLocation: string;
  selection: BookingSelection;
  activeLock: BookingLock | null;
  lastBookingDetails: LastBookingDetails | null;
}
export const emptySelection: BookingSelection = { date: '', startAt: '', teamMemberId: '' };
export const initialBookingState: BookingState = {
  hydrated: false, selectedServices: [], selectedLocation: '', selection: emptySelection,
  activeLock: null, lastBookingDetails: null,
};
export type BookingAction =
  | { type: 'restore'; state: BookingState }
  | { type: 'add'; service: ServiceData }
  | { type: 'remove'; id: string }
  | { type: 'location'; locationId: string }
  | { type: 'selection'; selection: BookingSelection }
  | { type: 'lock'; lock: BookingLock | null }
  | { type: 'receipt'; details: LastBookingDetails | null }
  | { type: 'reset'; clearLocation: boolean };
export function bookingReducer(state: BookingState, action: BookingAction): BookingState {
  switch (action.type) {
    case 'restore': return { ...action.state, hydrated: true };
    case 'add': return state.selectedServices.some(s => s.id === action.service.id) ? state : {
      ...state, selectedServices: [...state.selectedServices, action.service],
      selectedLocation: state.selectedLocation || action.service.locationId, selection: emptySelection,
    };
    case 'remove': return { ...state, selectedServices: state.selectedServices.filter(s => s.id !== action.id), selection: emptySelection };
    case 'location': return action.locationId === state.selectedLocation ? state : { ...state, selectedLocation: action.locationId, selection: emptySelection };
    case 'selection': return { ...state, selection: action.selection };
    case 'lock': return { ...state, activeLock: action.lock };
    case 'receipt': return { ...state, lastBookingDetails: action.details };
    case 'reset': return { ...state, selectedServices: [], activeLock: null, selection: emptySelection,
      selectedLocation: action.clearLocation ? '' : state.selectedLocation,
      lastBookingDetails: state.lastBookingDetails || (state.selectedServices.length ? { services: [...state.selectedServices] } : null),
    };
  }
}
export function bookingServiceKey(services: ServiceData[]): string {
  return JSON.stringify(services.map(s => s.variationId).sort());
}
