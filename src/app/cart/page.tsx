"use client";

import { getCart } from '@/lib/shopify';
import { useCartStore, type CartLine } from '@/lib/store';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ShoppingBag, Trash2, Plus, Minus, ExternalLink } from 'lucide-react';

export default async function CartPage() {
  const { cartId, lines: storeLines, removeFromCart, addToCart } = useCartStore();
  const [lines, setLines] = useState<CartLine[]>(storeLines);
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
      <div className="min-h-screen bg-ivory flex items-center justify-center py-20 px-6">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-border-subtle border-t-burgundy rounded-full animate-spin mb-4"></div>
          <p className="text-charcoal/60">Loading your cart…</p>
        </div>
      </div>
    );
  }

  if (!cartId || lines.length === 0) {
    return (
      <div className="min-h-screen bg-ivory py-20 px-6">
        <div className="max-w-prose mx-auto text-center">
          <ShoppingBag size={48} className="text-border-subtle mb-6" />
          <h1 className="font-heading text-4xl font-normal mb-4 text-soft-black">
            Your Cart is Empty
          </h1>
          <p className="text-charcoal/60 mb-8">
            Looks like you haven't added anything yet. Start browsing the collection.
          </p>
          <Link
            href="/products"
            className="inline-block border-2 border-soft-black text-soft-black px-10 py-3 hover:bg-soft-black hover:text-ivory transition-all font-medium text-sm uppercase tracking-wider"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ivory py-12 px-6">
      <div className="max-w-container mx-auto">
        <nav className="mb-8">
          <Link
            href="/products"
            className="text-xs uppercase tracking-wider text-charcoal hover:text-burgundy transition-colors flex items-center gap-1"
          >
            <ShoppingBag size={14} /> Continue Shopping
          </Link>
        </nav>

        <h1 className="font-heading text-4xl md:text-5xl font-normal mb-8 text-soft-black">
          Your Cart
        </h1>

        <div className="lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {lines.map((line) => {
              const image = line.merchandise.product.images.edges[0]?.node.url;
              const price = parseFloat(line.merchandise.priceV2.amount);
              const lineTotal = price * line.quantity;

              return (
                <div
                  key={line.id}
                  className="flex gap-4 items-start bg-white p-4 rounded-lg border border-border-subtle mb-4"
                >
                  <div className="relative aspect-[4/5] w-24 h-30 flex-shrink-0 rounded-md overflow-hidden bg-cream border border-border-subtle">
                    {image ? (
                      <img src={image} alt={line.merchandise.product.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-charcoal/20 text-sm">📦</div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-heading text-sm font-normal text-soft-black leading-tight line-clamp-2 mb-2">
                      {line.merchandise.product.title}
                    </p>
                    <div className="flex items-center gap-4 mb-2">
                      <span className="font-body font-medium text-charcoal">
                        £{price.toFixed(2)}
                      </span>
                      <div className="flex items-center gap-1 bg-ivory rounded-lg px-2 py-1">
                        <button
                          onClick={() => handleQtyChange(line.id, line.merchandise.id, -1)}
                          className="w-6 h-6 rounded border border-border-subtle bg-white flex items-center justify-center text-charcoal hover:bg-charcoal hover:text-white transition-colors text-xs disabled:opacity-50"
                          disabled={line.quantity <= 1}
                        >
                          <Minus size={12} />
                        </button>
                        <span className="font-mono text-xs text-charcoal w-6 text-center">
                          {line.quantity}
                        </span>
                        <button
                          onClick={() => handleQtyChange(line.id, line.merchandise.id, 1)}
                          className="w-6 h-6 rounded border border-border-subtle bg-white flex items-center justify-center text-charcoal hover:bg-charcoal hover:text-white transition-colors text-xs"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <span className="ml-auto font-body font-medium text-charcoal">
                        £{lineTotal.toFixed(2)}
                      </span>
                    </div>
                    <button
                      onClick={() => handleRemove(line.id)}
                      className="text-xs text-red-600 hover:bg-red-50 hover:text-red-800 transition-colors px-2 py-1 rounded"
                    >
                      <Trash2 size={14} className="mr-1" /> Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg border border-border-subtle sticky top-24">
              <h2 className="font-heading text-lg font-normal mb-4 text-soft-black">
                Order Summary
              </h2>
              <div className="mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-charcoal/60">Subtotal</span>
                  <span className="font-body font-medium text-charcoal">
                    £{subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-charcoal/60">Shipping</span>
                  <span className="font-body font-medium text-charcoal">Calculated at checkout</span>
                </div>
                <div className="flex justify-between text-sm font-medium text-soft-black pt-4 border-t border-border-subtle">
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
                className={`w-full py-4 rounded-lg font-body text-sm font-medium uppercase tracking-wider transition-all ${
                  isLoading
                    ? 'bg-sage text-white cursor-not-allowed'
                    : 'bg-soft-black text-ivory hover:bg-burgundy'
                }`}
              >
                {isLoading ? 'Processing…' : 'Proceed to Checkout'}
              </button>
              <p className="mt-4 text-center text-xs text-charcoal/50">
                Secure checkout powered by Shopify
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
