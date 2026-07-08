'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';

const LOCK_DURATION_MINUTES = 10;

interface Props {
    onExpire?: () => void;
}

export function CountdownTimer({ onExpire }: Props) {
    const router = useRouter();
    const [timeLeft, setTimeLeft] = useState(LOCK_DURATION_MINUTES * 60);

    const handleExpire = useCallback(() => {
        onExpire?.();
        router.push('/booking?step=cart');
    }, [onExpire, router]);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    handleExpire();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, [handleExpire]);

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const display = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    return (
        <div className="flex p-4 sm:p-6 flex-col items-center gap-4 self-stretch rounded-xl border border-[#DFE1E7] bg-white">
            <div className="flex py-3 px-8 flex-col justify-center items-center gap-3 self-stretch rounded-lg bg-[#F7EBEA]">
                <span className="text-[#B23730] font-bebas-neue text-[64px] font-normal leading-[100%] tracking-[6.4px]">
                    {display}
                </span>
                <span className="text-[#C15F59] font-inter text-base font-medium leading-[100%]">
                    Appointment held for
                </span>
            </div>
        </div>
    );
}