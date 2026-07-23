'use client';

import { useEffect, useState, useRef } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

interface Props {
    locationId: string;
    onNonceReady: (nonce: string) => void;
    disabled?: boolean;
    agreed: boolean;
    onAgreeChange: (value: boolean) => void;
}

declare global {
    interface Window {
        Square?: any;
    }
}

const APP_ID = process.env.NEXT_PUBLIC_SQUARE_APP_ID || '';

// Module-level flag to prevent duplicate script injection across re-renders
let squareScriptLoading = false;
let squareScriptLoaded = false;

export function SquarePaymentForm({ locationId, onNonceReady, disabled, agreed, onAgreeChange }: Props) {
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState('');
    const cardRef = useRef<HTMLDivElement>(null);
    const cardInstanceRef = useRef<any>(null);
    // Tracks whether THIS component instance has already run initSquare
    const initializedRef = useRef(false);
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    useEffect(() => {
        if (!APP_ID || !locationId) return;
        // Guard: only initialize once per component mount
        if (initializedRef.current) return;

        async function initSquare() {
            if (!window.Square) return;
            if (initializedRef.current) return;
            initializedRef.current = true;

            // Destroy any previous card instance attached to this component
            if (cardInstanceRef.current) {
                try {
                    await cardInstanceRef.current.destroy();
                } catch { }
                cardInstanceRef.current = null;
            }

            // Clear any leftover iframes from a previous attach
            if (cardRef.current) {
                cardRef.current.innerHTML = '';
            }

            try {
                const payments = window.Square.payments(APP_ID, locationId);
                const card = await payments.card({
                    style: {
                        input: {
                            fontSize: '14px',
                            color: isDark ? '#FFFFFF' : '#1D1F2C',
                            backgroundColor: isDark ? 'rgba(255,255,255,0.08)' : '#F8FAFB',
                        },
                        '.input-container': {
                            borderColor: isDark ? 'rgba(255,255,255,0.2)' : '#DFE1E7',
                        },
                        '.input-container.is-focus': {
                            borderColor: '#0098E8',
                        },
                        '.message-text': {
                            color: '#FF4345',
                        },
                        'input::placeholder': {
                            color: '#A5A5AB',
                        },
                    },
                });
                console.log('Square card instance created:', card);
                await card.attach(cardRef.current!);
                cardInstanceRef.current = card;
                setLoaded(true);
            } catch (err: any) {
                setError(err.message || 'Failed to initialize payments');
            }
        }

        if (window.Square) {
            initSquare();
            return;
        }

        const existingScript = document.querySelector('script[src*="square.js"]');
        if (existingScript) {
            if (squareScriptLoaded) {
                initSquare();
            } else {
                existingScript.addEventListener('load', initSquare);
                existingScript.addEventListener('error', () => setError('Failed to load payment system'));
            }
            return;
        }

        if (squareScriptLoading) return;
        squareScriptLoading = true;

        const script = document.createElement('script');
        script.src = 'https://sandbox.web.squarecdn.com/v1/square.js';
        script.async = true;
        script.onload = () => {
            squareScriptLoaded = true;
            squareScriptLoading = false;
            initSquare();
        };
        script.onerror = () => {
            squareScriptLoading = false;
            setError('Failed to load payment system');
        };
        document.body.appendChild(script);

        return () => {
            initializedRef.current = false;

            if (cardInstanceRef.current) {
                try {
                    cardInstanceRef.current.destroy();
                } catch { }
                cardInstanceRef.current = null;
            }
            if (cardRef.current) {
                cardRef.current.innerHTML = '';
            }
        };
    }, [locationId]);

    const handleTokenize = async (): Promise<string | null> => {
        if (!cardInstanceRef.current) return null;
        const result = await cardInstanceRef.current.tokenize();

        console.log('Square tokenize result:', JSON.stringify(result, null, 2));

        if (result.status === 'OK') {
            onNonceReady(result.token);
            setError('');
            return result.token;
        }
        const errors: any[] = result.errors ?? [];
        const firstDetail = errors
            .map((e: any) => e.detail || e.message)
            .filter(Boolean)[0];

        console.warn(
            'Square tokenize errors:',
            errors.length ? errors : `status=${result.status}`
        );

        setError(firstDetail || `Payment failed (${result.status}). Check card details and try again.`);
        return null;
    };

    useEffect(() => {
        if (loaded) {
            (window as any).__tokenizeCard = handleTokenize;
        }
        return () => {
            delete (window as any).__tokenizeCard;
        };
    }, [loaded]);

    return (
        <div className={`flex p-4 sm:p-6 flex-col items-center gap-6 self-stretch rounded-xl border ${isDark ? 'border-white/20 bg-white/[0.04]' : 'border-[#DFE1E7] bg-white'
            }`}>
            <div className="flex flex-col items-start gap-6 self-stretch">
                <h3 className={`font-inter text-xl font-bold leading-normal ${isDark ? 'text-white' : 'text-[#1D1F2C]'}`}>
                    Payment Details
                </h3>

                {!loaded && !error && (
                    <div className="w-full h-12 bg-gray-100 dark:bg-white/10 animate-pulse rounded-lg" />
                )}

                <div ref={cardRef} id="card-container" className="w-full min-h-[48px]" />

                <p className={`font-inter text-xs ${isDark ? 'text-white/40' : 'text-[#A5A5AB]'}`}>
                    Sandbox test cards (CVV: 111) — Visa: 4111 1111 1111 1111 | Mastercard: 5105 1051 0510 5100 | Discover: 6011 0000 0000 0004
                </p>

                <label className="flex items-center gap-2 self-stretch cursor-pointer">
                    <input
                        type="checkbox"
                        checked={agreed}
                        onChange={(e) => onAgreeChange(e.target.checked)}
                        className="w-4 h-4 rounded accent-[#B23730]"
                        disabled={disabled}
                    />
                    <span className={`font-inter text-sm ${isDark ? 'text-white/70' : 'text-[#777980]'}`}>
                        I have read and agreed to the{' '}
                        <a href="/privacy-policy" target="_blank" className="text-[#0098E8] underline hover:text-[#0088D8] transition-colors">
                            Privacy &amp; Policy
                        </a>
                        {' '}of Brightside Car Wash.
                    </span>
                </label>
            </div>
        </div>
    );
} 