import { v4 as uuidv4 } from 'uuid';

let memoryCartId: string | undefined;

// A transport identifier scoped to this tab, independent of the booking snapshot.
export function getCartId(): string {
    try {
        const stored = sessionStorage.getItem('cart_id');
        if (stored) return stored;
    } catch { /* Private-mode storage may be unavailable. */ }
    memoryCartId ??= `cart_${uuidv4()}`;
    try { sessionStorage.setItem('cart_id', memoryCartId); } catch { /* Keep the in-memory id stable. */ }
    return memoryCartId;
}
