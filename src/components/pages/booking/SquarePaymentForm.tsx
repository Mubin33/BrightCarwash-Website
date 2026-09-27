"use client";

import { useTheme } from "@/contexts/ThemeContext";
import type { BookingValidationErrors } from "@/types/booking";
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

export interface SquarePaymentFormHandle {
  tokenize: () => Promise<string | null>;
  isReady: () => boolean;
}

interface TokenizeResult {
  status: string;
  token?: string;
  errors?: Array<{ detail?: string; message?: string }>;
}

interface CardInstance {
  tokenize: () => Promise<TokenizeResult>;
  destroy: () => Promise<boolean | void>;
  attach: (element: HTMLElement) => Promise<void>;
}

interface Props {
  locationId: string;
  onNonceReady?: (nonce: string) => void;
  disabled?: boolean;
  agreed: boolean;
  onAgreeChange: (value: boolean) => void;
  errors?: BookingValidationErrors;
  submitted?: boolean;
}

declare global {
  interface Window {
    Square?: {
      payments: (
        appId: string,
        locationId: string,
      ) => {
        card: (options?: unknown) => Promise<CardInstance>;
      };
    };
  }
}

const APP_ID = process.env.NEXT_PUBLIC_SQUARE_APP_ID || "";
const SQUARE_ENV = process.env.NEXT_PUBLIC_SQUARE_ENVIRONMENT?.toLowerCase();
const isProduction = SQUARE_ENV === "production";
const SQUARE_SCRIPT_URL = isProduction
  ? "https://web.squarecdn.com/v1/square.js"
  : "https://sandbox.web.squarecdn.com/v1/square.js";
const showTestCards = !isProduction && process.env.NODE_ENV !== "production";

// Module-level flag to prevent duplicate script injection across re-renders
let squareScriptLoading = false;
let squareScriptLoaded = false;

export const SquarePaymentForm = forwardRef<SquarePaymentFormHandle, Props>(
  function SquarePaymentForm(
    {
      locationId,
      onNonceReady,
      disabled,
      agreed,
      onAgreeChange,
      errors = {},
      submitted = false,
    },
    ref,
  ) {
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState("");
    const cardRef = useRef<HTMLDivElement>(null);
    const cardInstanceRef = useRef<CardInstance | null>(null);
    const initializedRef = useRef(false);
    const { theme } = useTheme();
    const isDark = theme === "dark";

    useEffect(() => {
      if (!APP_ID || !locationId) return;
      if (initializedRef.current) return;

      async function initSquare() {
        if (!window.Square) return;
        if (initializedRef.current) return;
        initializedRef.current = true;

        if (cardInstanceRef.current) {
          try {
            await cardInstanceRef.current.destroy();
          } catch {}
          cardInstanceRef.current = null;
        }

        if (cardRef.current) {
          cardRef.current.innerHTML = "";
        }

        try {
          const payments = window.Square.payments(APP_ID, locationId);
          const card = await payments.card({
            style: {
              input: {
                fontSize: "14px",
                color: isDark ? "#FFFFFF" : "#1D1F2C",
                backgroundColor: isDark ? "rgba(255,255,255,0.08)" : "#F8FAFB",
              },
              ".input-container": {
                borderColor: isDark ? "rgba(255,255,255,0.2)" : "#DFE1E7",
              },
              ".input-container.is-focus": {
                borderColor: "#0098E8",
              },
              ".message-text": {
                color: "#FF4345",
              },
              "input::placeholder": {
                color: "#A5A5AB",
              },
            },
          });
          await card.attach(cardRef.current!);
          cardInstanceRef.current = card;
          setLoaded(true);
        } catch (err: unknown) {
          setError(
            err instanceof Error
              ? err.message
              : "Failed to initialize payments",
          );
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
          existingScript.addEventListener("load", initSquare);
          existingScript.addEventListener("error", () =>
            setError("Failed to load payment system"),
          );
        }
        return;
      }

      if (squareScriptLoading) return;
      squareScriptLoading = true;

      const script = document.createElement("script");
      script.src = SQUARE_SCRIPT_URL;
      script.async = true;
      script.onload = () => {
        squareScriptLoaded = true;
        squareScriptLoading = false;
        initSquare();
      };
      script.onerror = () => {
        squareScriptLoading = false;
        setError("Failed to load payment system");
      };
      document.body.appendChild(script);

      const cardElement = cardRef.current;

      return () => {
        initializedRef.current = false;

        if (cardInstanceRef.current) {
          try {
            cardInstanceRef.current.destroy();
          } catch {}
          cardInstanceRef.current = null;
        }
        if (cardElement) {
          cardElement.innerHTML = "";
        }
      };
    }, [locationId, isDark]);

    const handleTokenize = useCallback(async (): Promise<string | null> => {
      if (!cardInstanceRef.current) return null;
      const result = await cardInstanceRef.current.tokenize();

      if (result.status === "OK" && result.token) {
        onNonceReady?.(result.token);
        setError("");
        return result.token;
      }
      const tokenizeErrors = result.errors ?? [];
      const firstDetail = tokenizeErrors
        .map((e) => e.detail || e.message)
        .filter(Boolean)[0];

      setError(
        firstDetail ||
          `Payment failed (${result.status}). Check card details and try again.`,
      );
      return null;
    }, [onNonceReady]);

    useImperativeHandle(
      ref,
      () => ({
        tokenize: handleTokenize,
        isReady: () => Boolean(loaded && cardInstanceRef.current),
      }),
      [handleTokenize, loaded],
    );

    const hasAgreedError = submitted && errors?.agreed;

    return (
      <div
        className={`flex p-4 sm:p-6 flex-col items-center gap-6 self-stretch rounded-xl border ${
          isDark
            ? "border-white/20 bg-white/[0.04]"
            : "border-[#DFE1E7] bg-white"
        }`}
      >
        <div className="flex flex-col items-start gap-6 self-stretch">
          <h3
            className={`font-inter text-xl font-bold leading-normal ${isDark ? "text-white" : "text-[#1D1F2C]"}`}
          >
            Payment Details
          </h3>

          {!loaded && !error && (
            <div className="w-full h-12 bg-gray-100 dark:bg-white/10 animate-pulse rounded-lg" />
          )}

          <div
            ref={cardRef}
            id="card-container"
            className="w-full min-h-[48px]"
          />

          {showTestCards && (
            <p
              className={`font-inter text-xs ${isDark ? "text-white/40" : "text-[#A5A5AB]"}`}
            >
              Sandbox test cards (CVV: 111) — Visa: 4111 1111 1111 1111 |
              Mastercard: 5105 1051 0510 5100 | Discover: 6011 0000 0000 0004
            </p>
          )}

          <label className="flex items-center gap-2 self-stretch cursor-pointer">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => onAgreeChange(e.target.checked)}
              className="w-4 h-4 rounded accent-[#B23730]"
              disabled={disabled}
            />
            <span
              className={`font-inter text-sm ${isDark ? "text-white/70" : "text-[#777980]"}`}
            >
              I have read and agreed to the{" "}
              <a
                href="/privacy-policy"
                target="_blank"
                className="text-[#0098E8] underline hover:text-[#0088D8] transition-colors"
              >
                Privacy &amp; Policy
              </a>{" "}
              of Brightside Car Wash.
            </span>
          </label>
          {hasAgreedError && (
            <span className="text-[#FF4345] font-inter text-xs mt-1">
              {errors?.agreed}
            </span>
          )}
        </div>
      </div>
    );
  },
);

SquarePaymentForm.displayName = "SquarePaymentForm";
