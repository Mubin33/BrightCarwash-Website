'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { Calendar } from '@/components/ui/Calendar';
import { useBooking } from '@/contexts/BookingContext';
import { useAvailableDates } from '@/hooks/useAvailableDates';
import { useTheme } from '@/contexts/ThemeContext';
import { format } from 'date-fns';
import { useBookingLock } from '@/hooks/useBookingLock';
import { toast } from 'react-toastify';
import { useNextAvailableDate } from '@/hooks/useNextAvailableDate';
import { TimeSlotList } from './TimeSlotList';
import { useSlotGrouping } from "@/hooks/useSlotGrouping"

interface Props { onProceed: () => void; onBack: () => void; }

export function DateTimeStep({ onProceed, onBack }: Props) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const dateParam = searchParams.get('date');
    const timeParam = searchParams.get('time');
    const [date, setDate] = useState<Date | undefined>(dateParam ? new Date(dateParam) : new Date());
    const [selectedTime, setSelectedTime] = useState<string | null>(timeParam || null);
    const [dateLoading, setDateLoading] = useState(false);
    const { lock, loading: lockLoading } = useBookingLock();
    const { selectedServices, selectedLocation } = useBooking();
    const { availableDates, getSlotsForDate, loading: cacheLoading, removeSlot } = useAvailableDates(selectedLocation, selectedServices.map(s => s.variationId));
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const dateStr = date ? format(date, 'yyyy-MM-dd') : '';
    const slots = useMemo(() => getSlotsForDate(dateStr), [getSlotsForDate, dateStr]);
    const timeSlots = useSlotGrouping(slots);
    const nextAvailable = useNextAvailableDate(date, availableDates);

    // removed the effect that cleared time/startAt – now handled by CheckoutButtons

    useEffect(() => { if (slots.length > 0 || !date) setDateLoading(false); }, [slots, date]);
    useEffect(() => { if (!dateParam && !date) setDate(new Date()); }, [dateParam]);
    useEffect(() => { if (!dateParam && date) updateParams({ date: format(date, 'yyyy-MM-dd') }); }, []);

    const updateParams = (updates: Record<string, string>) => { const params = new URLSearchParams(searchParams.toString()); Object.entries(updates).forEach(([k, v]) => params.set(k, v)); router.push(`/booking?${params.toString()}`, { scroll: false }); };
    const handleDateChange = (newDate: Date) => { setDate(newDate); setSelectedTime(null); setDateLoading(true); updateParams({ date: format(newDate, 'yyyy-MM-dd') }); };
    const handleProceed = async () => { if (!date || !selectedTime || !selectedLocation) return; const startAt = searchParams.get('startAt') || ''; const result = await lock(selectedLocation, startAt, selectedServices.map(s => s.variationId)); if (result && !result.alreadyLocked) { onProceed(); } else { removeSlot(startAt); setSelectedTime(null); toast.error('This time slot is no longer available. Please select another time.'); } };
    const goToNextAvailable = () => { if (nextAvailable) { const nextDate = new Date(nextAvailable + 'T00:00:00'); setDate(nextDate); setSelectedTime(null); updateParams({ date: nextAvailable }); } };

    if (!selectedLocation || selectedServices.length === 0) return <div className="flex items-center justify-center py-12"><div className="w-6 h-6 border-2 border-[#0098E8] border-t-transparent rounded-full animate-spin" /></div>;

    return (
        <div className={`flex flex-col lg:flex-row w-full p-4 sm:p-6 items-start gap-6 rounded-lg border ${isDark ? 'border-white/20 bg-white/[0.06]' : 'border-[#DFE1E7] bg-[#F8FAFB]'}`}>
            <div className={`flex p-4 flex-col items-center gap-3 self-stretch flex-1 rounded-xl border ${isDark ? 'border-white/10 bg-white/[0.04]' : 'border-[#D2D2D5] bg-white'}`}>
                <Calendar value={date} onChange={handleDateChange} isDark={isDark} availableDates={availableDates} />
                <div className="w-full h-px bg-[#DFE1E7] dark:bg-white/20" />
                <div className="flex flex-col items-start gap-2.5 self-stretch"><span className={`font-inter text-base font-bold leading-normal ${isDark ? 'text-white' : 'text-[#1D1F2C]'}`}>Timezone</span><div className="flex items-center gap-2"><Icon name="clock" width={16} height={16} color="#4A4C56" /><span className={`font-inter text-sm font-medium leading-normal ${isDark ? 'text-white/70' : 'text-[#4A4C56]'}`}>{Intl.DateTimeFormat().resolvedOptions().timeZone}</span></div></div>
                {nextAvailable && <Button variant="outline" onClick={goToNextAvailable} className={`w-full mt-2 py-2 px-3 justify-center rounded-lg border font-inter text-xs sm:text-sm ${isDark ? 'text-white hover:bg-white/10' : 'text-[#1D1F2C]'}`}>Check Next Available Date</Button>}
            </div>
            <div className="flex flex-col justify-between items-start flex-1 self-stretch gap-6">
                <TimeSlotList slots={slots} timeSlots={timeSlots} cacheLoading={cacheLoading} dateLoading={dateLoading} date={date} selectedTime={selectedTime} isDark={isDark} onTimeChange={(slot) => { setSelectedTime(format(new Date(slot.startAt), 'hh:mm a')); updateParams({ time: format(new Date(slot.startAt), 'hh:mm a'), teamMemberId: slot.appointmentSegments[0]?.teamMemberId || '', startAt: slot.startAt }); }} />
                <div className="flex w-full gap-4">
                    <Button variant="outline" onClick={onBack} className={`flex-1 py-[14px] px-5 justify-center rounded-xl border font-inter text-sm ${isDark ? 'border-white/20 hover:bg-white/10! dark:hover:bg-white/20! text-white' : 'border-[#DFE1E7] hover:bg-white/10! dark:hover:bg-white/20! text-[#1B1B1B]'}`}>Back</Button>
                    <Button onClick={handleProceed} disabled={!date || !selectedTime || lockLoading} isLoading={lockLoading} loadingText="Verifying slot..." className={`flex-1 py-[14px] px-5 justify-center items-center gap-2 rounded-xl text-white font-inter text-sm disabled:opacity-50 ${isDark ? 'border-white/20 hover:bg-white/10 text-white' : 'border-[#DFE1E7] text-black'}`}>Continue to checkout</Button>
                </div>
            </div>
        </div>
    );
}