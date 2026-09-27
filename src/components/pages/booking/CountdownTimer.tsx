'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect, useCallback, useRef } from 'react';
import { useBooking } from '@/contexts/BookingContext';

const LOCK_DURATION_SECONDS = 10 * 60;

interface Props {
    onExpire?: () => void;
}

function calculateRemainingSeconds(lockTimestamp: number | null): number {
    if (!lockTimestamp) return LOCK_DURATION_SECONDS;
    const elapsedSeconds = Math.floor((Date.now() - lockTimestamp) / 1000);
    return Math.min(LOCK_DURATION_SECONDS, Math.max(0, LOCK_DURATION_SECONDS - elapsedSeconds));
}

export function CountdownTimer({ onExpire }: Props) {
    const router = useRouter();
    const { lockTimestamp } = useBooking();
    const [mounted, setMounted] = useState(false);
    const [, setTick] = useState(0);
    const hasExpiredRef = useRef(false);
    const prevTimestampRef = useRef<number | null>(lockTimestamp);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleExpire = useCallback(() => {
        onExpire?.();
        setTimeout(() => router.push('/booking?step=cart'), 0);
    }, [onExpire, router]);

    useEffect(() => {
        if (lockTimestamp !== prevTimestampRef.current) {
            prevTimestampRef.current = lockTimestamp;
            hasExpiredRef.current = false;
        }
    }, [lockTimestamp]);

    useEffect(() => {
        if (!mounted) return;

        if (calculateRemainingSeconds(lockTimestamp) <= 0 && !hasExpiredRef.current) {
            hasExpiredRef.current = true;
            handleExpire();
            return;
        }

        const interval = setInterval(() => {
            const remaining = calculateRemainingSeconds(lockTimestamp);
            if (remaining <= 0) {
                if (!hasExpiredRef.current) {
                    hasExpiredRef.current = true;
                    handleExpire();
                }
            }
            setTick((t) => t + 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [mounted, lockTimestamp, handleExpire]);

    const remaining = mounted ? calculateRemainingSeconds(lockTimestamp) : LOCK_DURATION_SECONDS;
    const minutes = Math.floor(remaining / 60);
    const seconds = remaining % 60;
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