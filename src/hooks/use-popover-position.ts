import { useState, useCallback, useLayoutEffect, type RefObject } from 'react';

interface Position {
    top: number;
    left: number;
    ready: boolean;
}

export function usePopoverPosition(
    triggerRef: RefObject<HTMLElement | null>,
    popoverRef: RefObject<HTMLElement | null>,
    open: boolean
) {
    const [position, setPosition] = useState<Position>({ top: 0, left: 0, ready: false });

    const calculate = useCallback(() => {
        if (!triggerRef.current || !popoverRef.current) return;
        const rect = triggerRef.current.getBoundingClientRect();
        const popRect = popoverRef.current.getBoundingClientRect();
        const popoverWidth = popRect.width;
        const popoverHeight = popRect.height;
        const { innerWidth, innerHeight } = window;

        let left = rect.left;
        if (left + popoverWidth > innerWidth - 8) {
            left = rect.right - popoverWidth;
        }
        left = Math.max(8, left);

        // Always place below the trigger; only clamp so it doesn't run off the bottom edge.
        let top = rect.bottom + 4;
        if (top + popoverHeight > innerHeight - 8) {
            top = Math.max(8, innerHeight - popoverHeight - 8);
        }

        setPosition({ top, left, ready: true });
    }, [triggerRef, popoverRef]);

    useLayoutEffect(() => {
        if (!open) {
            setPosition((p) => ({ ...p, ready: false }));
            return;
        }
        calculate();
        window.addEventListener('scroll', calculate, true);
        window.addEventListener('resize', calculate);
        return () => {
            window.removeEventListener('scroll', calculate, true);
            window.removeEventListener('resize', calculate);
        };
    }, [open, calculate]);

    return position;
}