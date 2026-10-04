"use client";

import { useBookingLock } from "@/hooks/useBookingLock";
import { useState } from "react";

export function BookingLockNotice() {
  const { releaseError, retryRelease } = useBookingLock();
  const [retrying, setRetrying] = useState(false);
  if (!releaseError) return null;
  return <div role="alert" className="w-full text-sm">
    <p>{releaseError}</p>
    <button type="button" className="mt-2 underline" disabled={retrying} onClick={async () => {
      setRetrying(true);
      try { await retryRelease(); } finally { setRetrying(false); }
    }}>{retrying ? "Releasing previous slot…" : "Retry releasing slot"}</button>
  </div>;
}
