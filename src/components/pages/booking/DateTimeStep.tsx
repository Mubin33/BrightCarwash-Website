"use client";

import { BookingLockNotice } from "./BookingLockNotice";
import { Button } from "@/components/ui/Button";
import { Calendar } from "@/components/ui/Calendar";
import { Icon } from "@/components/ui/Icon";
import { useBooking } from "@/contexts/BookingContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useAvailableDates } from "@/hooks/useAvailableDates";
import { useBookingLock } from "@/hooks/useBookingLock";
import { useNextAvailableDate } from "@/hooks/useNextAvailableDate";
import { useSlotGrouping } from "@/hooks/useSlotGrouping";
import { hasBookingDetails } from "@/lib/bookingValidation";
import { utcDateKey, formatUtcTime } from "@/lib/bookingTime";
import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "react-toastify";
import { TimeSlotList } from "./TimeSlotList";

interface Props {
  onProceed: (startAt: string, time: string) => void;
  onBack: () => void;
}

export function DateTimeStep({ onProceed, onBack }: Props) {
  const { selection, setSelection, selectedServices, selectedLocation } = useBooking();
  const { date: dateParam, startAt: selectedStartAt } = selection;
  const [today] = useState(() => utcDateKey(new Date()));
  const dateStr = dateParam || (selectedStartAt ? utcDateKey(selectedStartAt) : today);
  const date = useMemo(() => new Date(dateStr + 'T00:00:00Z'), [dateStr]);
  const selectedTime = selectedStartAt ? formatUtcTime(selectedStartAt) : null;
  const [dateLoading, setDateLoading] = useState(false);
  const { lock, loading: lockLoading } = useBookingLock();
  const selectionRef = useRef(selection);
  useEffect(() => { selectionRef.current = selection; }, [selection]);
  const mounted = useRef(true);
  useEffect(() => { mounted.current = true; return () => { mounted.current = false; }; }, []);
  const {
    availableDates,
    getSlotsForDate,
    loading: cacheLoading,
    removeSlot,
    error: availabilityError,
    refetch: retryAvailability,
  } = useAvailableDates(
    selectedLocation,
    selectedServices.map((s) => s.variationId),
    date,
  );
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const slots = useMemo(
    () => getSlotsForDate(dateStr),
    [getSlotsForDate, dateStr],
  );
  const timeSlots = useSlotGrouping(slots);
  const nextAvailable = useNextAvailableDate(date, availableDates);

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (slots.length > 0 || !cacheLoading) setDateLoading(false);
  }, [slots, cacheLoading]);
  /* eslint-enable react-hooks/set-state-in-effect */

  const handleDateChange = (newDate: Date) => {
    setSelection({ date: utcDateKey(newDate), startAt: '', teamMemberId: '' });
    setDateLoading(true);
  };

  const handleTimeChange = (slot: {
    startAt: string;
    appointmentSegments: { teamMemberId: string }[];
  }) => {
    const teamMemberId = slot.appointmentSegments[0]?.teamMemberId || "";
    if (!hasBookingDetails({
      startAt: slot.startAt, teamMemberId, locationId: selectedLocation,
      serviceVariationIds: selectedServices.map((service) => service.variationId),
    })) {
      toast.warning("This slot is missing booking details. Please select another time.");
      return;
    }
    setSelection({ date: utcDateKey(slot.startAt), startAt: slot.startAt, teamMemberId });
  };

  const handleProceed = async () => {
    if (availabilityError || cacheLoading || lockLoading || !hasBookingDetails({ ...selection, locationId: selectedLocation,
      serviceVariationIds: selectedServices.map(service => service.variationId) })) {
      toast.warning("Please select a valid date and time again.");
      return;
    }
    const result = await lock(selectedLocation, selectedStartAt, selectedServices.map(s => s.variationId));
    if (!mounted.current || selectionRef.current !== selection) return;
    if (result && !result.alreadyLocked) {
      onProceed(selectedStartAt, formatUtcTime(selectedStartAt));
    } else if (result?.alreadyLocked) {
      removeSlot(selectedStartAt);
      setSelection({ date: dateStr, startAt: '', teamMemberId: '' });
      toast.error("This time slot is no longer available. Please select another time.");
    }
  };

  const goToNextAvailable = () => {
    if (nextAvailable) handleDateChange(new Date(nextAvailable + 'T00:00:00Z'));
  };

  if (!selectedLocation || selectedServices.length === 0)
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-6 h-6 border-2 border-[#0098E8] border-t-transparent rounded-full animate-spin" />
      </div>
    );

  return (
    <div
      className={`flex flex-col lg:flex-row w-full p-4 sm:p-6 items-start gap-6 rounded-lg border ${isDark ? "border-white/20 bg-white/[0.06]" : "border-[#DFE1E7] bg-[#F8FAFB]"}`}
    >
      <div
        className={`flex p-4 flex-col items-center gap-3 self-stretch flex-1 rounded-xl border ${isDark ? "border-white/10 bg-white/[0.04]" : "border-[#D2D2D5] bg-white"}`}
      >
        <Calendar
          value={date}
          onChange={handleDateChange}
          isDark={isDark}
          availableDates={availableDates}
        />
        <div className="w-full h-px bg-[#DFE1E7] dark:bg-white/20" />
        <div className="flex flex-col items-start gap-2.5 self-stretch">
          <span
            className={`font-inter text-base font-bold leading-normal ${isDark ? "text-white" : "text-[#1D1F2C]"}`}
          >
            Timezone
          </span>
          <div className="flex items-center gap-2">
            <Icon name="clock" width={16} height={16} color="#4A4C56" />
            <span
              className={`font-inter text-sm font-medium leading-normal ${isDark ? "text-white/70" : "text-[#4A4C56]"}`}
            >
              UTC
            </span>
          </div>
        </div>
        {nextAvailable && (
          <Button
            variant="outline"
            onClick={goToNextAvailable}
            className={`w-full mt-2 py-2 px-3 justify-center rounded-lg border font-inter text-xs sm:text-sm ${isDark ? "text-white hover:bg-white/10" : "text-[#1D1F2C]"}`}
          >
            Check Next Available Date
          </Button>
        )}
      </div>
      <div className="flex flex-col justify-between items-start flex-1 self-stretch gap-6">
        <BookingLockNotice />
        {availabilityError ? (
          <div role="alert" className="w-full text-sm">
            <p>{availabilityError}</p>
            <button type="button" className="mt-2 underline" onClick={retryAvailability}>Retry availability</button>
          </div>
        ) : <TimeSlotList
          slots={slots}
          timeSlots={timeSlots}
          cacheLoading={cacheLoading}
          dateLoading={dateLoading}
          date={date}
          selectedTime={selectedTime}
          selectedStartAt={selectedStartAt}
          isDark={isDark}
          onTimeChange={handleTimeChange}
        />}
        <div className="flex w-full gap-4">
          <Button
            variant="outline"
            onClick={onBack}
            className={`flex-1 py-[14px] px-5 justify-center rounded-xl border font-inter text-sm ${isDark ? "border-white/20 hover:bg-white/10! dark:hover:bg-white/20! text-white" : "border-[#DFE1E7] hover:bg-white/10! dark:hover:bg-white/20! text-[#1B1B1B]"}`}
          >
            Back
          </Button>
          <Button
            onClick={handleProceed}
            disabled={!date || !selectedStartAt || lockLoading || cacheLoading || Boolean(availabilityError)}
            isLoading={lockLoading}
            loadingText="Verifying slot..."
            className={`flex-1 py-[14px] px-5 justify-center items-center gap-2 rounded-xl text-black bg-[#FEC300] font-inter text-sm disabled:opacity-50 ${isDark ? "border-white/20 hover:bg-white/10 text-white" : "border-[#DFE1E7] text-black"}`}
          >
            Continue to checkout
          </Button>
        </div>
      </div>
    </div>
  );
}
