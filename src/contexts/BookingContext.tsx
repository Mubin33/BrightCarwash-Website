"use client";

import type { ServiceData } from "@/data/services";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export interface LastBookingDetails {
  services: ServiceData[];
  locationId?: string;
  startAt?: string;
  date?: string;
  time?: string;
  customerName?: string;
  customerEmail?: string;
  total?: number;
  vehicle?: string;
}

interface BookingContextType {
  selectedServices: ServiceData[];
  selectedLocation: string;
  lockToken: string | null;
  lockTimestamp: number | null;
  lastBookingDetails: LastBookingDetails | null;
  setLockToken: (token: string | null, timestamp?: number | null) => void;
  setLockTimestamp: (timestamp: number | null) => void;
  addService: (service: ServiceData) => void;
  removeService: (id: string) => void;
  clearServices: () => void;
  resetServices: () => void;
  setSelectedLocation: (locationId: string) => void;
  setLastBookingDetails: (details: LastBookingDetails | null) => void;
}

const BookingContext = createContext<BookingContextType | null>(null);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [selectedServices, setSelectedServices] = useState<ServiceData[]>([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [lockToken, setLockToken] = useState<string | null>(null);
  const [lockTimestamp, setLockTimestamp] = useState<number | null>(null);
  const [lastBookingDetails, setLastBookingDetails] =
    useState<LastBookingDetails | null>(null);

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    const stored = localStorage.getItem("bookingServices");
    if (stored) {
      try {
        setSelectedServices(JSON.parse(stored));
      } catch {}
    }
    const storedLocation = localStorage.getItem("bookingLocation");
    if (storedLocation) setSelectedLocation(storedLocation);
    const storedLockToken = localStorage.getItem("bookingLockToken");
    const storedLockTimestamp = localStorage.getItem("bookingLockTimestamp");
    if (storedLockToken && storedLockTimestamp) {
      const timestamp = Number(storedLockTimestamp);
      const elapsedSeconds = (Date.now() - timestamp) / 1000;
      if (elapsedSeconds < 10 * 60) {
        setLockToken(storedLockToken);
        setLockTimestamp(timestamp);
      } else {
        localStorage.removeItem("bookingLockToken");
        localStorage.removeItem("bookingLockTimestamp");
      }
    } else if (storedLockToken) {
      const now = Date.now();
      setLockToken(storedLockToken);
      setLockTimestamp(now);
      localStorage.setItem("bookingLockTimestamp", now.toString());
    }
    const storedLastBooking = localStorage.getItem("lastBookingDetails");
    if (storedLastBooking) {
      try {
        setLastBookingDetails(JSON.parse(storedLastBooking));
      } catch {}
    }
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  useEffect(() => {
    if (selectedServices.length > 0) {
      localStorage.setItem("bookingServices", JSON.stringify(selectedServices));
    } else {
      localStorage.removeItem("bookingServices");
    }
  }, [selectedServices]);

  useEffect(() => {
    if (selectedLocation)
      localStorage.setItem("bookingLocation", selectedLocation);
  }, [selectedLocation]);

  useEffect(() => {
    if (lockToken) {
      localStorage.setItem("bookingLockToken", lockToken);
    } else {
      localStorage.removeItem("bookingLockToken");
    }
  }, [lockToken]);

  useEffect(() => {
    if (lockTimestamp) {
      localStorage.setItem("bookingLockTimestamp", lockTimestamp.toString());
    } else {
      localStorage.removeItem("bookingLockTimestamp");
    }
  }, [lockTimestamp]);

  useEffect(() => {
    if (lastBookingDetails) {
      localStorage.setItem(
        "lastBookingDetails",
        JSON.stringify(lastBookingDetails),
      );
    } else {
      localStorage.removeItem("lastBookingDetails");
    }
  }, [lastBookingDetails]);

  const handleSetLockToken = useCallback(
    (token: string | null, timestamp?: number | null) => {
      setLockToken((prevToken) => {
        if (token) {
          if (timestamp !== undefined) {
            setLockTimestamp(timestamp);
          } else if (prevToken !== token) {
            setLockTimestamp(Date.now());
          } else {
            setLockTimestamp((prevTs) => prevTs ?? Date.now());
          }
        } else {
          setLockTimestamp(null);
        }
        return token;
      });
    },
    [],
  );

  const handleSetLockTimestamp = useCallback((timestamp: number | null) => {
    setLockTimestamp(timestamp);
  }, []);

  const addService = useCallback(
    (service: ServiceData) => {
      setSelectedServices((prev) => {
        if (prev.some((s) => s.id === service.id)) return prev;
        const updated = [...prev, service];
        localStorage.setItem("bookingServices", JSON.stringify(updated));
        return updated;
      });
      if (!selectedLocation && service.locationId) {
        setSelectedLocation(service.locationId);
      }
    },
    [selectedLocation],
  );

  const removeService = useCallback((id: string) => {
    setSelectedServices((prev) => {
      const updated = prev.filter((s) => s.id !== id);
      localStorage.setItem("bookingServices", JSON.stringify(updated));
      return updated;
    });
  }, []);

  const resetServices = useCallback(() => {
    setSelectedServices((prev) => {
      if (prev.length > 0) {
        setLastBookingDetails((current) => current || { services: [...prev] });
      }
      return [];
    });
    setLockToken(null);
    setLockTimestamp(null);
    localStorage.removeItem("bookingServices");
    localStorage.removeItem("bookingLockToken");
    localStorage.removeItem("bookingLockTimestamp");
  }, []);

  const clearServices = useCallback(() => {
    resetServices();
    setSelectedLocation("");
    localStorage.removeItem("bookingLocation");
  }, [resetServices]);

  return (
    <BookingContext.Provider
      value={{
        selectedServices,
        selectedLocation,
        lockToken,
        lockTimestamp,
        lastBookingDetails,
        setLockToken: handleSetLockToken,
        setLockTimestamp: handleSetLockTimestamp,
        addService,
        removeService,
        clearServices,
        resetServices,
        setSelectedLocation,
        setLastBookingDetails,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context)
    throw new Error("useBooking must be used within a BookingProvider");
  return context;
}
