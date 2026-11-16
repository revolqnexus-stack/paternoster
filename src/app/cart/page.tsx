"use client";

import { getCart } from '@/lib/shopify';
import { useCartStore } from '@/lib/store';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ShoppingBag, Trash2, Plus, Minus } from 'lucide-react';

export default async function CartPage() {
  const { cartId, lines: storeLines, removeFromCart, addToCart } = useCartStore();
  const [lines, setLines] = useState(storeLines);
  const [checkoutUrl, setCheckoutUrl] = useState<string>('#');
  const [isLoading, setIsLoading] = useState(true);
  const [deleting, setDeleting] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!cartId) {
      setIsLoading(false);
      return;
    }
    (async () => {
      try {
        const cart = await getCart(cartId);
        setLines(cart.lines.edges.map((e: any) => e.node));
        setCheckoutUrl(cart.checkoutUrl || '#');
      } catch (e) {
        console.error('Failed to load cart:', e);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [cartId]);

  const handleRemove = async (lineId: string) => {
    setDeleting((prev) => new Set([...prev, lineId]));
    try {
      await removeFromCart(lineId);
      if (cartId) {
        const cart = await getCart(cartId);
        setLines(cart.lines.edges.map((e: any) => e.node));
        setCheckoutUrl(cart.checkoutUrl || '#');
      }
    } finally {
      setDeleting((prev) => new Set([...prev].filter((id) => id !== lineId)));
    }
  };

  const handleQtyChange = async (lineId: string, merchandiseId: string, delta: number) => {
    const line = lines.find((l) => l.id === lineId);
    if (!line) return;
    const newQty = Math.max(1, line.quantity + delta);
    setIsLoading(true);
    try {
      await addToCart(merchandiseId, newQty - line.quantity);
      if (cartId) {
        const cart = await getCart(cartId);
        setLines(cart.lines.edges.map((e: any) => e.node));
        setCheckoutUrl(cart.checkoutUrl || '#');
      }
    } catch (e) {
      console.error('Failed to update quantity:', e);
    } finally {
      setIsLoading(false);
    }
  };

  const subtotal = lines.reduce(
    (sum, l) => sum + parseFloat(l.merchandise.priceV2.amount) * l.quantity,
    0
  );

  if (isLoading) {
    return (
      <div className="page-wrap">
        <div className="page-container py-20 md:py-32">
          <div className="text-center measure mx-auto">
            <div className="w-8 h-8 border-4 border-border border-t-ink rounded-full animate-spin mb-4"></div>
            <p className="font-serif text-lg text-gray-light">Loading your cart…</p>
          </div>
        </div>
      </div>
    );
  }

  if (!cartId || lines.length === 0) {
    return (
      <div className="page-wrap">
        <div className="page-container py-20 md:py-32">
          <div className="text-center measure mx-auto">
            <ShoppingBag size={48} className="text-border mb-6" />
            <h1 className="font-serif text-4xl font-normal mb-4 text-ink leading-tight">
              Your Cart is Empty
            </h1>
            <p className="font-serif-alt text-lg text-gray-light mb-8">
              Looks like you haven't added anything yet. Start browsing the collection.
            </p>
            <Link
              href="/products"
              className="font-serif text-base font-normal text-navy italic underline underline-offset-2"
            >
              Start Shopping ›
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrap">
      <div className="page-container py-12 md:py-24">
        <nav className="mb-8">
          <Link
            href="/products"
            className="font-serif text-sm font-normal text-navy italic underline underline-offset-2 flex items-center gap-2"
          >
            <ShoppingBag size={14} strokeWidth={2} /> Continue Shopping
          </Link>
        </nav>

        <h1 className="font-serif text-4xl md:text-5xl font-normal mb-8 text-ink leading-tight">
          Your Cart
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            {lines.map((line) => {
              const image = line.merchandise.product.images.edges[0]?.node.url;
              const price = parseFloat(line.merchandise.priceV2.amount);
              const lineTotal = price * line.quantity;

              return (
                <div
                  key={line.id}
                  className="flex gap-4 items-start bg-paper p-4 rounded border border-border mb-4"
                >
                  <div className="relative aspect-[4/5] w-24 h-30 flex-shrink-0 rounded overflow-hidden bg-border border border-border">
                    {image ? (
                      <img src={image} alt={line.merchandise.product.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-light text-sm italic">📦</div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-serif text-sm font-normal text-ink leading-tight line-clamp-2 mb-2">
                      {line.merchandise.product.title}
                    </p>
                    <div className="flex items-center gap-4 mb-2">
                      <span className="font-serif font-medium text-ink">
                        £{price.toFixed(2)}
                      </span>
                      <div className="flex items-center gap-1 bg-border rounded px-2 py-1">
                        <button
                          onClick={() => handleQtyChange(line.id, line.merchandise.id, -1)}
                          className="w-6 h-6 rounded border border-border bg-paper flex items-center justify-center text-ink hover:bg-ink hover:text-paper transition-colors text-xs disabled:opacity-50"
                          disabled={line.quantity <= 1}
                        >
                          <Minus size={12} strokeWidth={2} />
                        </button>
                        <span className="font-serif text-xs text-ink w-6 text-center">
                          {line.quantity}
                        </span>
                        <button
                          onClick={() => handleQtyChange(line.id, line.merchandise.id, 1)}
                          className="w-6 h-6 rounded border border-border bg-paper flex items-center justify-center text-ink hover:bg-ink hover:text-paper transition-colors text-xs"
                        >
                          <Plus size={12} strokeWidth={2} />
                        </button>
                      </div>
                      <span className="ml-auto font-serif font-medium text-ink">
                        £{lineTotal.toFixed(2)}
                      </span>
                    </div>
                    <button
                      onClick={() => handleRemove(line.id)}
                      className="text-xs font-serif text-gray-light hover:text-ink transition-colors px-2 py-1"
                    >
                      <Trash2 size={14} strokeWidth={2} className="mr-1" /> Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-paper p-6 rounded border border-border sticky top-24">
              <h2 className="font-serif text-lg font-normal mb-4 text-ink">
                Order Summary
              </h2>
              <div className="mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-serif text-gray-light">Subtotal</span>
                  <span className="font-serif font-medium text-ink">
                    £{subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-serif text-gray-light">Shipping</span>
                  <span className="font-serif font-medium text-ink">Calculated at checkout</span>
                </div>
                <div className="flex justify-between text-sm font-medium text-ink pt-4 border-t border-border">
                  <span>Total</span>
                  <span>£{subtotal.toFixed(2)}</span>
                </div>
              </div>

              <button
                disabled={isLoading}
                onClick={() => {
                  if (checkoutUrl && checkoutUrl !== '#') {
                    window.location.href = checkoutUrl;
                  }
                }}
                className={`w-full py-4 rounded-lg font-serif text-sm font-normal uppercase tracking-wider transition-all ${
                  isLoading
                    ? 'bg-gray-light text-paper cursor-not-allowed'
                    : 'bg-ink text-paper hover:bg-navy-light'
                }`}
              >
                {isLoading ? 'Processing…' : 'Proceed to Checkout'}
              </button>
              <p className="mt-4 text-center text-xs font-serif text-gray-light italic">
                Secure checkout powered by Shopify
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
