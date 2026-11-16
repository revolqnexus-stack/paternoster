'use client';

import { useCartStore } from '@/lib/store';
import { removeFromCart as apiRemoveFromCart, createCart, addToCart as apiAddToCart } from '@/lib/shopify';
import { X, ShoppingBag, Plus, Minus, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

interface CartLine {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    priceV2: { amount: string; currencyCode: string };
    product: {
      title: string;
      handle: string;
      images: CartImage[];
    };
  };
}

interface CartImage {
  edges: Array<{ node: { url: string; altText: string } }>;
}

export default function CartDrawer({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { lines, total, isLoading, removeFromCart, addToCart, cartId } = useCartStore();
  const [deleting, setDeleting] = useState<Set<string>>(new Set());

  if (!isOpen) return null;

  const isEmpty = lines.length === 0;

  return (
    <div className="fixed inset-0 z-[100] flex flex-col" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Panel */}
      <div className="relative w-full max-w-md h-full bg-white shadow-2xl flex flex-col transform transition-transform duration-300 translate-x-0">
        {/* Header */}
        <div className="px-6 py-4 border-b border-border-subtle flex items-center justify-between">
          <h2 className="font-heading text-2xl font-normal text-soft-black">Your Cart</h2>
          <button onClick={onClose} className="text-charcoal/60 hover:text-charcoal">
            <X size={24} />
          </button>
        </div>

        {/* Empty State */}
        {isEmpty ? (
          <div className="flex-1 flex flex-col items-center justify-center py-20 text-center px-6">
            <ShoppingBag size={48} className="text-border-subtle mb-4" />
            <p className="text-charcoal/60">Your cart is empty.</p>
            <Link
              href="/products"
              className="mt-4 inline-block border-2 border-soft-black text-soft-black px-8 py-3 hover:bg-soft-black hover:text-ivory transition-all font-medium text-sm uppercase tracking-wider"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <>
            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {lines.map((line) => {
                const image = line.merchandise.product.images.edges[0]?.node.url;
                const price = parseFloat(line.merchandise.priceV2.amount);
                const lineTotal = price * line.quantity;

                return (
                  <div
                    key={line.id}
                    className="flex gap-4 items-start bg-ivory p-3 rounded-lg border border-border-subtle"
                  >
                    <div className="relative aspect-[4/5] w-20 h-24 flex-shrink-0 rounded-md overflow-hidden bg-cream border border-border-subtle">
                      {image ? (
                        <img
                          src={image}
                          alt={line.merchandise.product.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-charcoal/20 text-sm">
                          📦
                        </div>
                      )}
                      {deleting.has(line.id) && (
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                          <div className="w-4 h-4 border-2 border-white border-solid rounded-full rounded-t"></div>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-heading text-sm font-normal text-soft-black leading-tight line-clamp-2">
                        {line.merchandise.product.title}
                      </p>
                      <p className="text-xs text-charcoal/60 mt-1">
                        {line.merchandise.product.handle}
                      </p>
                      <div className="mt-2 flex items-baseline gap-2">
                        <span className="font-body text-sm font-medium text-charcoal">
                          £{price.toFixed(2)}
                        </span>
                        <span className="text-xs text-sage line-through">
                          ×{line.quantity}
                        </span>
                        <span className="ml-auto font-body text-sm font-medium text-charcoal">
                          £{lineTotal.toFixed(2)}
                        </span>
                      </div>
                      <div className="mt-3 flex items-center gap-2">
                        <button
                          onClick={() => {
                            setDeleting((prev) => new Set([...prev, line.id]));
                            addToCart(line.merchandise.id, -1);
                            setTimeout(() => setDeleting((prev) => new Set([...prev].filter((id) => id !== line.id))), 300);
                          }}
                          disabled={deleting.has(line.id)}
                          className="w-8 h-8 rounded-full border border-border-subtle bg-white flex items-center justify-center text-charcoal hover:text-burgundy hover:border-burgundy transition-all text-xs disabled:opacity-50"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="font-mono text-xs text-charcoal w-8 text-center">
                          {line.quantity}
                        </span>
                        <button
                          onClick={() => {
                            setDeleting((prev) => new Set([...prev, line.id]));
                            apiRemoveFromCart(cartId!, [line.id]);
                            removeFromCart(line.id);
                            setTimeout(() => setDeleting((prev) => new Set([...prev].filter((id) => id !== line.id))), 300);
                          }}
                          disabled={deleting.has(line.id) || !cartId}
                          className="w-8 h-8 rounded-full border border-border-subtle bg-white flex items-center justify-center text-red-600 hover:bg-red-50 hover:border-red-200 transition-all text-xs disabled:opacity-50"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-border-subtle bg-white">
              <div className="mb-4 flex justify-between text-sm">
                <span className="text-charcoal/60">Subtotal</span>
                <span className="font-heading font-normal text-soft-black">£{parseFloat(total).toFixed(2)}</span>
              </div>
              <button
                disabled={isLoading || !cartId}
                onClick={() => {
                  // Navigate to checkout - we need the checkout URL from Shopify
                  // For now, link to cart page which can show checkout
                }}
                className={`w-full py-4 rounded-lg font-body text-sm font-medium uppercase tracking-wider transition-all ${
                  isLoading || !cartId
                    ? 'bg-sage text-white cursor-not-allowed'
                    : 'bg-soft-black text-ivory hover:bg-burgundy'
                }`}
              >
                {isLoading ? 'Processing...' : 'Proceed to Checkout'}
              </button>
              <p className="mt-3 text-center text-xs text-charcoal/50">
                Secure checkout powered by Shopify
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
