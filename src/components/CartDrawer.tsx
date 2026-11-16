'use client';

import { useCartStore } from '@/lib/store';
import { removeFromCart as apiRemoveFromCart } from '@/lib/shopify';
import { stockImage } from '@/lib/stock-images';
import { X, ShoppingBag, Plus, Minus, Trash2 } from 'lucide-react';
import Image from 'next/image';
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
      <div className="absolute inset-0 bg-ink/30 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md h-full bg-paper shadow-2xl flex flex-col transform transition-transform duration-300 translate-x-0">
        <div className="px-6 py-4 border-b border-border flex items-center justify-between">
          <h2 className="font-serif text-2xl font-normal text-ink">Your Cart</h2>
          <button onClick={onClose} className="p-2 rounded hover:bg-paper/50">
            <X size={24} strokeWidth={2} />
          </button>
        </div>

        {isEmpty ? (
          <div className="flex-1 flex flex-col items-center justify-center py-20 text-center px-6">
            <ShoppingBag size={48} className="text-border mb-4" />
            <p className="font-serif text-lg text-gray-light">Your cart is empty.</p>
            <Link
              href="/products"
              className="mt-4 font-serif text-base font-normal text-navy italic underline underline-offset-2"
            >
              Start Shopping ›
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {lines.map((line) => {
                const image = line.merchandise.product.images.edges[0]?.node.url;
                const price = parseFloat(line.merchandise.priceV2.amount);
                const lineTotal = price * line.quantity;

                return (
                  <div
                    key={line.id}
                    className="flex gap-4 items-start bg-paper p-3 rounded border border-border mb-4"
                  >
                    <div className="relative aspect-[4/5] w-20 h-24 flex-shrink-0 rounded overflow-hidden bg-border border border-border">
                      {image ? (
                        <Image
                          src={image}
                          alt={line.merchandise.product.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Image
                          src={stockImage('bookshelf')}
                          alt={line.merchandise.product.title}
                          className="w-full h-full object-cover"
                        />
                      )}
                      {deleting.has(line.id) && (
                        <div className="absolute inset-0 bg-ink/20 flex items-center justify-center">
                          <div className="w-4 h-4 border-2 border-paper border-solid rounded-full rounded-t"></div>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-serif text-sm font-normal text-ink leading-tight line-clamp-2 mb-2">
                        {line.merchandise.product.title}
                      </p>
                      <div className="mt-2 flex items-baseline gap-2">
                        <span className="font-serif font-medium text-ink">
                          £{price.toFixed(2)}
                        </span>
                        <span className="font-serif text-xs text-gray-light line-through">
                          ×{line.quantity}
                        </span>
                        <span className="ml-auto font-serif font-medium text-ink">
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
                          className="w-8 h-8 rounded-full border border-border bg-paper flex items-center justify-center text-ink hover:bg-ink hover:text-paper transition-all text-xs disabled:opacity-50"
                        >
                          <Minus size={14} strokeWidth={2} />
                        </button>
                        <span className="font-serif text-xs text-ink w-8 text-center">
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
                          className="w-8 h-8 rounded-full border border-border bg-paper flex items-center justify-center text-gray-light hover:text-ink transition-all text-xs disabled:opacity-50"
                        >
                          <Trash2 size={14} strokeWidth={2} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="p-6 border-t border-border bg-paper">
              <div className="mb-4 flex justify-between text-sm">
                <span className="font-serif text-gray-light">Subtotal</span>
                <span className="font-serif font-medium text-ink">£{parseFloat(total).toFixed(2)}</span>
              </div>
              <button
                disabled={isLoading || !cartId}
                onClick={() => {
                  // Navigate to cart page for checkout
                }}
                className={`w-full py-4 rounded-lg font-serif text-sm font-normal uppercase tracking-wider transition-all ${
                  isLoading || !cartId
                    ? 'bg-gray-light text-paper cursor-not-allowed'
                    : 'bg-ink text-paper hover:bg-navy-light'
                }`}
              >
                {isLoading ? 'Processing…' : 'Proceed to Checkout'}
              </button>
              <p className="mt-3 text-center text-xs font-serif text-gray-light italic">
                Secure checkout powered by Shopify
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
