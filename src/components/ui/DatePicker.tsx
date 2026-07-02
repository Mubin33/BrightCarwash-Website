'use client';

import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
import 'react-day-picker/style.css';
import { usePopoverPosition } from '@/hooks/use-popover-position';

interface Props {
    value: Date | undefined;
    onChange: (date: Date | undefined) => void;
    placeholder?: string;
    className?: string;
}

export function DatePicker({ value, onChange, placeholder = 'Select date', className = '' }: Props) {
    const [open, setOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const popoverRef = useRef<HTMLDivElement>(null);
    const position = usePopoverPosition(triggerRef, popoverRef, open);

    useEffect(() => setMounted(true), []);

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (
                triggerRef.current?.contains(e.target as Node) ||
                popoverRef.current?.contains(e.target as Node)
            ) return;
            setOpen(false);
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <>
            <button
                ref={triggerRef}
                type="button"
                onClick={() => setOpen(!open)}
                className={`w-full px-4 py-3 border border-[#DFE1E7] rounded-lg text-sm text-left outline-none focus:border-[#0098E8] bg-white ${!value ? 'text-[#777980]' : 'text-[#1B1B1B]'} ${className}`}
            >
                {value ? format(value, 'MMM dd, yyyy') : placeholder}
            </button>
            {open && mounted && createPortal(
                <div
                    ref={popoverRef}
                    style={{
                        position: 'fixed',
                        top: position.top,
                        left: position.left,
                        zIndex: 9999,
                        visibility: position.ready ? 'visible' : 'hidden',
                    }}
                    className="bg-white rounded-lg border border-[#E8E8E9] shadow-lg p-1.5"
                >
                    <style>{`
  .rdp { --rdp-day-width: 26px; --rdp-day-height: 26px; --rdp-font-size: 11px; --rdp-nav-height: 26px; }
  .rdp-month_caption { font-size: 12px; padding: 2px 0; }
  .rdp-weekday { font-size: 9px; padding: 2px 0; }
  .rdp-months { margin: 0; }
`}</style>
                    <DayPicker
                        mode="single"
                        selected={value}
                        onSelect={(d) => { onChange(d); setOpen(false); }}
                    />
                </div>,
                document.body
            )}
        </>
    );
}