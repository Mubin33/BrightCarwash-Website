'use client';

import { useCallback, useRef, useState } from 'react';
import { isAxiosError } from 'axios';
import { toast } from 'react-toastify';
import { useBooking } from '@/contexts/BookingContext';
import { getApiFailure } from '@/lib/http-client';
import { getCartId } from '@/lib/cart-id';
import { BOOKING_LOCK_DURATION_MS, bookingServiceKey, type BookingAction, type BookingState } from '@/lib/booking-state';
import { lockSlot, releaseLock, releaseLockBeacon, type ReleaseLockParams } from '@/services/booking.api';
import type { BookingLockResult } from '@/types/booking';

// Mounted once by BookingProvider; every consumer shares requests and lock ownership.
export function useBookingLockController(getState: () => BookingState, send: (action: BookingAction) => void) {
  const [loading, setLoading] = useState(false);
  const epoch = useRef(0);
  const pending = useRef<{ key: string; promise: Promise<BookingLockResult> } | null>(null);

  const failedReleases = useRef(new Map<string, { params: ReleaseLockParams; expiresAt: number }>());
  const releasing = useRef(new Map<string, Promise<boolean>>());
  const [releaseError, setReleaseError] = useState<string | null>(null);
  const pruneExpiredReleases = useCallback(() => {
    const now = Date.now();
    for (const [token, release] of failedReleases.current) {
      if (release.expiresAt <= now) failedReleases.current.delete(token);
    }
    return [...failedReleases.current.values()];
  }, []);
  const updateReleaseError = useCallback(() => {
    setReleaseError(pruneExpiredReleases().length
      ? 'We could not release your previous time slot. Please retry; otherwise the temporary hold will expire automatically.'
      : null);
  }, [pruneExpiredReleases]);
  const releaseTracked = useCallback((
    params: ReleaseLockParams,
    keepalive = false,
    expiresAt = Date.now() + BOOKING_LOCK_DURATION_MS,
  ): Promise<boolean> => {
    if (expiresAt <= Date.now()) {
      failedReleases.current.delete(params.lockToken);
      updateReleaseError();
      return Promise.resolve(true);
    }
    const existing = releasing.current.get(params.lockToken);
    if (existing) return existing;
    failedReleases.current.set(params.lockToken, { params, expiresAt });
    const request = (async () => {
      try {
        if (keepalive) {
          if (!await releaseLockBeacon(params)) throw new Error('Release failed');
        } else {
          await releaseLock(params);
        }
        failedReleases.current.delete(params.lockToken);
        return true;
      } catch {
        return false;
      } finally {
        releasing.current.delete(params.lockToken);
        updateReleaseError();
        const failedRelease = failedReleases.current.get(params.lockToken);
        if (failedRelease) {
          setTimeout(updateReleaseError, Math.max(0, failedRelease.expiresAt - Date.now()) + 1);
        }
      }
    })();
    releasing.current.set(params.lockToken, request);
    return request;
  }, [updateReleaseError]);
  const retryRelease = useCallback(async () => {
    const results = await Promise.all(pruneExpiredReleases().map(({ params, expiresAt }) =>
      releaseTracked(params, false, expiresAt)));
    return results.every(Boolean);
  }, [pruneExpiredReleases, releaseTracked]);

  const release = useCallback(async () => {
    epoch.current++;
    pending.current = null;
    setLoading(false);
    const held = getState().activeLock;
    if (!held) return retryRelease();
    send({ type: 'lock', lock: null });
    await releaseTracked(
      { locationId: held.locationId, startAt: held.startAt, lockToken: held.token },
      false,
      held.timestamp + BOOKING_LOCK_DURATION_MS,
    );
    return retryRelease();
  }, [getState, send, releaseTracked, retryRelease]);

  const abandon = useCallback(() => {
    epoch.current++;
    pending.current = null;
    setLoading(false);
    const held = getState().activeLock;
    if (!held) return;
    send({ type: 'lock', lock: null });
    void releaseTracked(
      { locationId: held.locationId, startAt: held.startAt, lockToken: held.token },
      true,
      held.timestamp + BOOKING_LOCK_DURATION_MS,
    );
  }, [getState, send, releaseTracked]);

  const lock = useCallback((locationId: string, startAt: string, ids: string[]): Promise<BookingLockResult> => {
    const serviceKey = JSON.stringify([...ids].sort());
    const key = JSON.stringify([locationId, startAt, serviceKey]);
    if (pending.current?.key === key) return pending.current.promise;
    const held = getState().activeLock;
    if (held && held.locationId === locationId && held.startAt === startAt && held.serviceKey === serviceKey
      && Date.now() - held.timestamp < BOOKING_LOCK_DURATION_MS) return Promise.resolve({ lockToken: held.token });
    const previousRelease = release();
    const requestEpoch = epoch.current;
    setLoading(true);
    const promise = (async (): Promise<BookingLockResult> => {
      try {
        if (!await previousRelease) return null;
        if (epoch.current !== requestEpoch) return null;
        const result = await lockSlot({ locationId, startAt, serviceVariationIds: ids, cartId: getCartId() });
        const state = getState();
        if (epoch.current !== requestEpoch || state.selectedLocation !== locationId
          || state.selection.startAt !== startAt || bookingServiceKey(state.selectedServices) !== serviceKey) {
          void releaseTracked({ locationId, startAt, lockToken: result.lockToken }, true);
          return null;
        }
        send({ type: 'lock', lock: { token: result.lockToken, timestamp: Date.now(), locationId, startAt, serviceKey } });
        return result;
      } catch (error) {
        if (isAxiosError(error) && error.response?.status === 409) return { alreadyLocked: true };
        toast.error(getApiFailure(error, 'Failed to lock slot').message);
        return null;
      } finally {
        if (epoch.current === requestEpoch) { pending.current = null; setLoading(false); }
      }
    })();
    pending.current = { key, promise };
    return promise;
  }, [getState, send, release, releaseTracked]);
  return { lock, release, abandon, loading, releaseError, retryRelease };
}

export function useBookingLock() {
  const { lockToken, lockActions } = useBooking();
  return { lockToken, ...lockActions };
}
