import { v4 as uuidv4 } from 'uuid';

export function getCartId(): string {
    const key = 'cart_id';
    let cartId = sessionStorage.getItem(key);
    if (!cartId) {
        cartId = `cart_${uuidv4()}`;
        sessionStorage.setItem(key, cartId);
    }
    return cartId;
}