"use client";

import type { ServiceData } from "@/data/services";
import { readBookingSnapshot, writeBookingSnapshot } from "@/lib/booking-storage";
import { bookingReducer, initialBookingState, type BookingAction, type BookingSelection } from "@/lib/booking-state";
import { useBookingLockController } from "@/hooks/useBookingLock";
import { createContext, useCallback, useContext, useEffect, useReducer, useRef } from "react";

import { readBookingReceipt, writeBookingReceipt, sanitizeBookingReceipt, type LastBookingDetails } from "@/lib/booking-receipt";
export type { LastBookingDetails } from "@/lib/booking-receipt";

interface BookingContextType {
  hydrated: boolean;
  selectedServices: ServiceData[];
  selectedLocation: string;
  selection: BookingSelection;
  lockToken: string | null;
  lockTimestamp: number | null;
  lastBookingDetails: LastBookingDetails | null;
  lockActions: ReturnType<typeof useBookingLockController>;
  setSelection: (selection: BookingSelection) => void;
  addService: (service: ServiceData) => void;
  removeService: (id: string) => void;
  clearServices: () => void;
  resetServices: () => void;
  setSelectedLocation: (locationId: string) => void;
  setLastBookingDetails: (details: LastBookingDetails | null) => void;
}
const BookingContext = createContext<BookingContextType | null>(null);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(bookingReducer, initialBookingState);
  const stateRef = useRef(initialBookingState);
  const getState = useCallback(() => stateRef.current, []);
  const send = useCallback((action: BookingAction) => {
    stateRef.current = bookingReducer(stateRef.current, action);
    dispatch(action);
    try { writeBookingSnapshot(localStorage, stateRef.current); } catch { /* Storage access can be denied. */ }
  }, []);
  useEffect(() => {
    let restored = { ...initialBookingState, hydrated: true };
    try { restored = readBookingSnapshot(localStorage, window.location.search); } catch { /* Use memory only. */ }
    try {
      if (window.location.pathname === '/booking' && new URLSearchParams(window.location.search).get('step') === 'confirmed') {
        restored.lastBookingDetails = readBookingReceipt(sessionStorage);
      } else {
        writeBookingReceipt(sessionStorage, null);
      }
    } catch { /* Use memory only when session storage is unavailable. */ }
    send({ type: 'restore', state: restored });
  }, [send]);
  const lockActions = useBookingLockController(getState, send);
  const { abandon } = lockActions;
  const setSelection = useCallback((selection: BookingSelection) => {
    if (JSON.stringify(getState().selection) !== JSON.stringify(selection)) abandon();
    send({ type: 'selection', selection });
  }, [getState, send, abandon]);
  const addService = useCallback((service: ServiceData) => {
    if (getState().selectedServices.some(s => s.id === service.id)) return;
    abandon(); send({ type: 'add', service });
  }, [getState, abandon, send]);
  const removeService = useCallback((id: string) => { abandon(); send({ type: 'remove', id }); }, [abandon, send]);
  const setSelectedLocation = useCallback((locationId: string) => {
    if (getState().selectedLocation !== locationId) abandon();
    send({ type: 'location', locationId });
  }, [getState, abandon, send]);
  const resetServices = useCallback(() => { abandon(); send({ type: 'reset', clearLocation: false }); }, [abandon, send]);
  const clearServices = useCallback(() => { send({ type: 'reset', clearLocation: true }); }, [send]);
  const setLastBookingDetails = useCallback((details: LastBookingDetails | null) => {
    const receipt = sanitizeBookingReceipt(details);
    try { writeBookingReceipt(sessionStorage, receipt); } catch { /* Keep confirmation available in memory. */ }
    send({ type: 'receipt', details: receipt });
  }, [send]);
  return <BookingContext.Provider value={{ ...state, lockToken: state.activeLock?.token ?? null,
    lockTimestamp: state.activeLock?.timestamp ?? null, lockActions, setSelection, addService, removeService,
    clearServices, resetServices, setSelectedLocation, setLastBookingDetails,
  }}>{children}</BookingContext.Provider>;
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) throw new Error("useBooking must be used within a BookingProvider");
  return context;
}
