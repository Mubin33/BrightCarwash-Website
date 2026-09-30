'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { useBooking } from '@/contexts/BookingContext';

const LOCK_DURATION_SECONDS = 10 * 60; // 10 minutes

interface Props {
    onExpire?: () => void;
}

function getStoredTimestamp(): number | null {
    if (typeof window === 'undefined') return null;
    try {
        const stored = localStorage.getItem('bookingLockTimestamp');
        if (stored) {
            const num = Number(stored);
            if (!isNaN(num) && num > 0) return num;
        }
    } catch {}
    return null;
}

function calculateRemainingSeconds(timestamp: number | null): number {
    if (!timestamp) return LOCK_DURATION_SECONDS;
    const elapsed = Math.floor((Date.now() - timestamp) / 1000);
    return Math.max(0, Math.min(LOCK_DURATION_SECONDS, LOCK_DURATION_SECONDS - elapsed));
}

export function CountdownTimer({ onExpire }: Props) {
    const router = useRouter();
    const { lockTimestamp, setLockTimestamp } = useBooking();
    const [mounted, setMounted] = useState(false);

    // Keep onExpire in a ref to avoid clearing/restarting the interval on every parent re-render
    const onExpireRef = useRef(onExpire);
    useEffect(() => {
        onExpireRef.current = onExpire;
    }, [onExpire]);

    const activeTimestamp = lockTimestamp || getStoredTimestamp();
    const [remainingSeconds, setRemainingSeconds] = useState<number>(() => {
        return calculateRemainingSeconds(activeTimestamp);
    });

    const hasExpiredRef = useRef(false);

    useEffect(() => {
        setMounted(true);
        const stored = getStoredTimestamp();
        if (!lockTimestamp && stored) {
            setLockTimestamp?.(stored);
        } else if (!lockTimestamp && !stored) {
            const now = Date.now();
            setLockTimestamp?.(now);
            try {
                localStorage.setItem('bookingLockTimestamp', now.toString());
            } catch {}
        }
    }, [lockTimestamp, setLockTimestamp]);

    useEffect(() => {
        if (!mounted) return;

        const effectiveTimestamp = lockTimestamp || getStoredTimestamp() || Date.now();

        const tick = () => {
            const remaining = calculateRemainingSeconds(effectiveTimestamp);
            setRemainingSeconds(remaining);

            if (remaining <= 0 && !hasExpiredRef.current) {
                hasExpiredRef.current = true;
                onExpireRef.current?.();
                setTimeout(() => {
                    router.push('/booking?step=cart');
                }, 0);
            }
        };

        // Run tick immediately when effect sets up
        tick();

        // Real-time 1 second tick interval
        const interval = setInterval(tick, 1000);

        // Recalculate immediately when tab becomes visible (handles background tab throttling)
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible') {
                tick();
            }
        };
        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            clearInterval(interval);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [mounted, lockTimestamp, router]);

    const minutes = Math.floor(remainingSeconds / 60);
    const seconds = remainingSeconds % 60;
    const display = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    if (!mounted) {
        return (
            <div className="flex p-4 sm:p-6 flex-col items-center gap-4 self-stretch rounded-xl border border-[#DFE1E7] bg-white">
                <div className="flex py-3 px-8 flex-col justify-center items-center gap-3 self-stretch rounded-lg bg-[#FFF7E6]">
                    <span className="text-[#FEC300]! font-bebas-neue text-4xl sm:text-5xl lg:text-[64px] font-normal leading-[100%] tracking-[4px] sm:tracking-[6.4px]">
                        10:00
                    </span>
                    <span className="text-[#FEC300]! font-inter text-base font-medium leading-[100%]">
                        Appointment held for
                    </span>
                </div>
            </div>
        );
    }

    return (
        <div className="flex p-4 sm:p-6 flex-col items-center gap-4 self-stretch rounded-xl border border-[#DFE1E7] bg-white">
            <div className="flex py-3 px-8 flex-col justify-center items-center gap-3 self-stretch rounded-lg bg-[#FFF7E6]">
                <span className="text-[#FEC300]! font-bebas-neue text-4xl sm:text-5xl lg:text-[64px] font-normal leading-[100%] tracking-[4px] sm:tracking-[6.4px]">
                    {display}
                </span>
                <span className="text-[#FEC300]! font-inter text-base font-medium leading-[100%]">
                    Appointment held for
                </span>
            </div>
        </div>
    );
}
