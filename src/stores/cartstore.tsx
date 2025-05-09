import { MonthlyArticle } from '@/server/strapi';
import {create} from 'zustand';
import { persist } from 'zustand/middleware';

type CartItem = Pick<MonthlyArticle, 'cover'  |'price' | 'title' | 'available' | 'id' | 'discount_price'>

export interface CartStoreItem {
    item: CartItem
    quantity: number;
}

export interface CartStoreState {
    cart : CartStoreItem[]
}

interface StoreActions extends CartStoreState {
    addToCart: (item: CartItem) => void;
    removeFromCart: (itemId: number) => void;
    clearCart: () => void;
    deleteItem: (itemId: CartItem["id"]) => void;
}


export const useCartStore = create<StoreActions>()(
    persist(
        (set) => ({
            cart: [],
            addToCart: (item) => set((state) => {
                const existingItem = state.cart.find((cartItem) => cartItem.item.id === item.id);
                if (existingItem) {
                return {
                    cart: state.cart.map((cartItem) =>
                    cartItem.item.id === item.id
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem
                    ),
                };
                } else {
                return { cart: [...state.cart, { item, quantity: 1 }] };
                }
            }),
        
            removeFromCart: (itemId) => set((state) => {
                const existingItem = state.cart.find((cartItem) => cartItem.item.id === itemId);
                if (existingItem && existingItem.quantity > 1) {
                    return {
                        cart: state.cart.map((cartItem) =>
                            cartItem.item.id === itemId
                                ? { ...cartItem, quantity: cartItem.quantity - 1 }
                                : cartItem
                        ),
                    };
                } else {
                    return { cart: state.cart.filter((cartItem) => cartItem.item.id !== itemId) };
                }
            }),
        
            clearCart: () => set({ cart: [] }),
        
            deleteItem: (itemId) => set((state) => ({
                cart: state.cart.filter((cartItem) => cartItem.item.id !== itemId),
            })),
        }),
        {
            name: 'cart-storage',
        }
    )
);