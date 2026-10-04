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

import { SQUARE_APP_ID as APP_ID, SQUARE_ENVIRONMENT } from "@/lib/env";
const SQUARE_ENV = SQUARE_ENVIRONMENT;
const isProduction = SQUARE_ENV === "production";
const SQUARE_SCRIPT_URL = isProduction
  ? "https://web.squarecdn.com/v1/square.js"
  : "https://sandbox.web.squarecdn.com/v1/square.js";
const showTestCards = !isProduction && process.env.NODE_ENV !== "production";

let squareScriptPromise: Promise<void> | null = null;

function loadSquareScript(): Promise<void> {
  if (window.Square) return Promise.resolve();
  if (squareScriptPromise) return squareScriptPromise;

  squareScriptPromise = new Promise<void>((resolve, reject) => {
    let script = document.querySelector<HTMLScriptElement>(
      `script[src="${SQUARE_SCRIPT_URL}"]`,
    );
    const shouldAppend = !script;

    if (!script) {
      script = document.createElement("script");
      script.src = SQUARE_SCRIPT_URL;
      script.async = true;
    }

    const finish = (error?: Error) => {
      script?.removeEventListener("load", handleLoad);
      script?.removeEventListener("error", handleError);
      if (loadTimeout) clearTimeout(loadTimeout);

      if (error) {
        script?.remove();
        squareScriptPromise = null;
        reject(error);
        return;
      }

      if (!window.Square) {
        script?.remove();
        squareScriptPromise = null;
        reject(new Error("Square payment system did not initialize."));
        return;
      }

      resolve();
    };

    const handleLoad = () => finish();
    const handleError = () =>
      finish(new Error("Failed to load payment system. Check your connection and try again."));
    const loadTimeout = setTimeout(
      () => finish(new Error("Loading the payment system timed out. Please try again.")),
      15000,
    );

    script.addEventListener("load", handleLoad, { once: true });
    script.addEventListener("error", handleError, { once: true });

    if (shouldAppend) document.body.appendChild(script);
  });

  return squareScriptPromise;
}

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
    const [canRetry, setCanRetry] = useState(false);
    const [retryCount, setRetryCount] = useState(0);
    const cardRef = useRef<HTMLDivElement>(null);
    const cardInstanceRef = useRef<CardInstance | null>(null);
    const { theme } = useTheme();
    const isDark = theme === "dark";

    useEffect(() => {
      let active = true;
      const cleanupSquareCard = () => {
        active = false;
        const card = cardInstanceRef.current;
        cardInstanceRef.current = null;

        if (card) {
          void card.destroy().catch((destroyError: unknown) => {
            console.error("Failed to clean up Square card form.", destroyError);
          });
          return;
        }

        if (cardRef.current) {
          cardRef.current.innerHTML = "";
        }
      };

      setLoaded(false);
      setError("");
      setCanRetry(false);

      if (!locationId) {
        setError("Choose a service location before entering payment details.");
        return cleanupSquareCard;
      }

      async function initSquare() {
        let cardInstance: CardInstance | null = null;
        try {
          await loadSquareScript();
          if (!active || !cardRef.current) return;

          const square = window.Square;
          if (!square) {
            throw new Error("Square payment system did not initialize.");
          }
          const payments = square.payments(APP_ID, locationId);
          cardInstance = await payments.card({
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

          if (!active || !cardRef.current) {
            await cardInstance.destroy();
            cardInstance = null;
            return;
          }

          await cardInstance.attach(cardRef.current);
          if (!active) {
            await cardInstance.destroy();
            cardInstance = null;
            return;
          }

          cardInstanceRef.current = cardInstance;
          cardInstance = null;
          setLoaded(true);
        } catch (err: unknown) {
          if (cardInstance) {
            await cardInstance.destroy().catch((destroyError: unknown) => {
              console.error("Failed to clean up Square card form.", destroyError);
            });
          }
          if (active) {
            setError(
              err instanceof Error
                ? err.message
                : "Failed to initialize payments. Please try again.",
            );
            setCanRetry(true);
          }
        }
      }

      void initSquare();

      return cleanupSquareCard;
    }, [locationId, isDark, retryCount]);

    const handleTokenize = useCallback(async (): Promise<string | null> => {
      if (!cardInstanceRef.current) return null;
      let result: TokenizeResult;
      try {
        result = await cardInstanceRef.current.tokenize();
      } catch (err: unknown) {
        setCanRetry(false);
        setError(
          err instanceof Error ? err.message : "Payment could not be processed.",
        );
        return null;
      }

      if (result.status === "OK" && result.token) {
        onNonceReady?.(result.token);
        setError("");
        setCanRetry(false);
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
      setCanRetry(false);
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

          <div
            id="card-container"
            className={`relative w-full ${loaded ? "min-h-[72px]" : "h-12"}`}
          >
            {!loaded && !error && (
              <div
                aria-hidden="true"
                className={`absolute inset-0 flex items-center rounded-md border-2 border-[#0098E8] px-3 font-inter text-sm ${
                  isDark ? "bg-white/[0.08]" : "bg-[#F8FAFB]"
                }`}
              >
                <span className="flex h-6 w-9 shrink-0 items-center justify-center rounded bg-[#555]">
                  <span className="h-px w-6 bg-white/40" />
                </span>
                <span className="flex-1 pl-4 text-[#A5A5AB]">Card number</span>
                <span className="w-1/4 text-center text-[#A5A5AB]">MM/YY</span>
                <span className="w-1/5 text-center text-[#A5A5AB]">CVV</span>
              </div>
            )}
            <div
              ref={cardRef}
              className={`w-full ${
                loaded
                  ? "relative min-h-[72px]"
                  : "invisible absolute inset-0 min-h-[48px]"
              }`}
            />
          </div>

          {error && (
            <div
              className="flex w-full items-center justify-between gap-3 text-sm text-[#FF4345]"
              role="alert"
            >
              <span>{error}</span>
              {locationId && canRetry && (
                <button
                  type="button"
                  className="shrink-0 underline"
                  onClick={() => setRetryCount((count) => count + 1)}
                >
                  Try again
                </button>
              )}
            </div>
          )}

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
                rel="noopener noreferrer"
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
