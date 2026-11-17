// Zustand store for cart management
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { createCart, addToCart as apiAddToCart, removeFromCart as apiRemoveFromCart } from './shopify';
import { toast } from 'react-hot-toast';

interface CartLine {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    priceV2: {
      amount: string;
      currencyCode: string;
    };
    product: {
      title: string;
      handle: string;
      images: {
        edges: Array<{
          node: {
            url: string;
            altText: string;
          };
        }>;
      };
    };
  };
}

export type { CartLine };

interface CartState {
  cartId: string | null;
  lines: CartLine[];
  total: string;
  isOpen: boolean;
  isLoading: boolean;
  
  initCart: () => Promise<void>;
  addToCart: (merchandiseId: string, quantity?: number) => Promise<void>;
  removeFromCart: (lineId: string) => Promise<void>;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cartId: null,
      lines: [],
      total: '0.00',
      isOpen: false,
      isLoading: false,

      initCart: async () => {
        const { cartId } = get();
        if (!cartId) {
          const cart = await createCart();
          set({ cartId: cart.id });
        }
      },

      addToCart: async (merchandiseId: string, quantity = 1) => {
        set({ isLoading: true });
        try {
          let currentCartId = get().cartId;

          if (!currentCartId) {
            const cart = await createCart();
            currentCartId = cart.id;
            set({ cartId: currentCartId });
          }

          if (!currentCartId) throw new Error('Failed to create cart');

          const cart = await apiAddToCart(currentCartId, merchandiseId, quantity);
          
          set({
            cartId: cart.id,
            lines: cart.lines.edges.map((edge: any) => edge.node),
            total: cart.estimatedCost.totalAmount.amount,
            isOpen: true,
          });
          toast.success('Added to cart');
        } catch (error) {
          console.error('Error adding to cart:', error);
        } finally {
          set({ isLoading: false });
        }
      },

      removeFromCart: async (lineId: string) => {
        set({ isLoading: true });
        try {
          const { cartId } = get();
          if (!cartId) return;

          const cart = await apiRemoveFromCart(cartId, [lineId]);
          
          set({
            lines: cart.lines.edges.map((edge: any) => edge.node),
            total: cart.estimatedCost.totalAmount.amount,
          });
        } catch (error) {
          console.error('Error removing from cart:', error);
        } finally {
          set({ isLoading: false });
        }
      },

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
    }),
    {
      name: 'lrb-cart-storage',
      partialize: (state) => ({
        cartId: state.cartId,
      }),
    }
  )
);
