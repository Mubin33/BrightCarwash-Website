"use client";

import { Icon } from "@/components/ui/Icon";
import { useBooking } from "@/contexts/BookingContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useLocations } from "@/hooks/useLocations";
import type { ApiLocation } from "@/types/locations";
import { AlertTriangle, ChevronDown } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

function formatAddress(loc: ApiLocation): string {
  const a = loc.address;
  if (!a) return "";
  return `${a.addressLine1}, ${a.locality}, ${a.administrativeDistrictLevel1} ${a.postalCode}`;
}

export function LocationFilter() {
  const [open, setOpen] = useState(false);
  const [pendingLocation, setPendingLocation] = useState<ApiLocation | null>(
    null,
  );
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const {
    selectedLocation,
    setSelectedLocation,
    selectedServices,
    resetServices,
  } = useBooking();
  const { locations, loading } = useLocations();
  const ref = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const selectedLoc = locations.find((l) => l.id === selectedLocation);
  const selectedName = selectedLoc?.name || locations[0]?.name || "";

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!selectedLocation && locations.length > 0) {
      setSelectedLocation(locations[0].id);
    }
  }, [locations, selectedLocation, setSelectedLocation]);

  const handleCancelSwitch = useCallback(() => {
    setShowConfirmModal(false);
    setPendingLocation(null);
  }, []);

  const handleConfirmSwitch = useCallback(() => {
    if (pendingLocation) {
      resetServices();
      setSelectedLocation(pendingLocation.id);
    }
    setShowConfirmModal(false);
    setPendingLocation(null);
  }, [pendingLocation, resetServices, setSelectedLocation]);

  useEffect(() => {
    if (!showConfirmModal) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleCancelSwitch();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [showConfirmModal, handleCancelSwitch]);

  const handleSelect = (loc: ApiLocation) => {
    setOpen(false);
    if (loc.id === selectedLocation) {
      return;
    }

    if (selectedServices.length > 0) {
      setPendingLocation(loc);
      setShowConfirmModal(true);
    } else {
      setSelectedLocation(loc.id);
    }
  };

  if (loading || locations.length === 0) return null;

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`flex py-4 px-4 items-center gap-4 rounded-lg border text-sm font-inter cursor-pointer ${
          isDark
            ? "border-white/20 bg-white/[0.12] text-white"
            : "border-[#DFE1E7] bg-white text-[#1D1F2C]"
        }`}
      >
        <Icon name="location" width={16} height={16} color="#0098E8" />
        <span>{selectedName}</span>
        <ChevronDown size={16} className="text-[#777980]" />
      </button>
      {open && (
        <div
          className={`absolute top-full left-0 mt-1 w-full rounded-lg border shadow-lg z-50 ${
            isDark
              ? "border-white/20 bg-[#1A1A1A]"
              : "border-[#E8E8E9] bg-white"
          }`}
        >
          {locations.map((loc) => (
            <button
              key={loc.id}
              type="button"
              onClick={() => handleSelect(loc)}
              className={`w-full py-3 px-4 text-left text-sm font-inter transition-colors cursor-pointer ${
                selectedLocation === loc.id
                  ? "text-[#0098E8] bg-[#F0F8FF] dark:bg-[#0098E8]/20"
                  : isDark
                    ? "text-white hover:bg-white/[0.08]"
                    : "text-[#1D1F2C] hover:bg-[#F8FAFB]"
              }`}
            >
              <div className="font-medium">{loc.name}</div>
              <div
                className={`text-xs mt-0.5 ${isDark ? "text-white/50" : "text-[#777980]"}`}
              >
                {formatAddress(loc)}
              </div>
            </button>
          ))}
        </div>
      )}

      {showConfirmModal && (
        <div
          className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs"
          onClick={(e) => {
            if (e.target === e.currentTarget) handleCancelSwitch();
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="location-change-modal-title"
        >
          <div
            className={`w-full max-w-md p-6 rounded-2xl border shadow-xl flex flex-col gap-4 ${
              isDark
                ? "border-white/20 bg-[#1A1A1A] text-white"
                : "border-[#DFE1E7] bg-white text-[#1D1F2C]"
            }`}
          >
            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-full bg-amber-500/10 text-amber-500 shrink-0">
                <AlertTriangle size={22} />
              </div>
              <div className="flex flex-col gap-1">
                <h3
                  id="location-change-modal-title"
                  className="font-semibold text-base sm:text-lg font-inter"
                >
                  Switch Location?
                </h3>
                <p
                  className={`text-sm font-inter leading-relaxed ${isDark ? "text-white/70" : "text-[#777980]"}`}
                >
                  Switching locations will clear current cart.
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-2">
              <button
                type="button"
                onClick={handleCancelSwitch}
                className={`px-4 py-2.5 rounded-lg text-sm font-medium font-inter transition-colors cursor-pointer ${
                  isDark
                    ? "bg-white/10 hover:bg-white/20 text-white"
                    : "bg-gray-100 hover:bg-gray-200 text-[#1D1F2C]"
                }`}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmSwitch}
                className="px-4 py-2.5 rounded-lg text-sm font-medium font-inter bg-[#B23730] hover:bg-[#962e28] text-white transition-colors cursor-pointer"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
