'use client';

import { useCartStore } from '@/lib/store';
import Link from 'next/link';
import { X, ShoppingBag, ChevronLeft, ChevronRight } from 'lucide-react';

export default function CartDrawer({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const {
    lines,
    total,
    isLoading,
    addToCart,
    removeFromCart,
    closeCart,
  } = useCartStore();

  const itemCount = lines.reduce((sum, l) => sum + l.quantity, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Drawer panel */}
      <div className="absolute right-0 top-0 bottom-0 w-full md:w-96 bg-paper border-l border-border shadow-2xl transform transition-transform duration-300 translate-x-0">
        {/* Drawer header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-border">
          <h2 className="font-serif text-2xl font-normal text-ink">
            Shopping Bag
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-border bg-paper flex items-center justify-center text-ink hover:bg-ink hover:text-paper transition-colors"
          >
            <X size={16} strokeWidth={2} />
          </button>
        </div>

        {/* Cart content */}
        <div className="px-8 pb-8 overflow-y-auto max-h-[calc(100vh-140px)]">
          {lines.length === 0 ? (
            <div className="text-center py-16 measure mx-auto">
              <ShoppingBag size={48} strokeWidth={1.5} className="mx-auto mb-6 text-gray-light" />
              <p className="font-serif text-lg text-gray-light italic mb-4">
                Your bag is empty
              </p>
              <Link
                href="/products"
                className="font-serif text-base font-normal text-navy italic underline underline-offset-2"
              >
                Browse Collection ›
              </Link>
            </div>
          ) : (
            <>
              <div className="grid gap-6">
                {lines.map((line: any) => {
                  const image =
                    line.merchandise.product.images?.edges?.[0]?.node?.url;
                  const price = parseFloat(line.merchandise.priceV2.amount);
                  const subtotal = price * line.quantity;

                  return (
                    <div
                      key={line.id}
                      className="flex gap-4 items-center py-4 border-b border-border"
                    >
                      <div className="aspect-[4/5] bg-border rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={image || '/placeholder.svg'}
                          alt={line.merchandise.title}
                          className="w-full h-auto max-h-[120px] object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-serif text-sm font-normal text-ink leading-tight mb-1">
                          {line.merchandise.title}
                        </p>
                        <p className="font-serif text-sm font-normal text-gray-light mb-2">
                          £{price.toFixed(2)} each
                        </p>
                        <div className="flex items-center gap-4">
                          <button
                            onClick={() => closeCart()}
                            className="w-8 h-8 rounded-full border border-border bg-paper flex items-center justify-center text-ink hover:bg-ink hover:text-paper transition-colors disabled:opacity-50 disabled:pointer-events-none"
                          >
                            <ChevronLeft size={12} strokeWidth={2} />
                          </button>
                          <span className="w-8 text-center font-serif text-xs font-normal text-ink">
                            {line.quantity}
                          </span>
                          <button
                            onClick={() => closeCart()}
                            className="w-8 h-8 rounded-full border border-border bg-paper flex items-center justify-center text-ink hover:bg-ink hover:text-paper transition-colors"
                          >
                            <ChevronRight size={12} strokeWidth={2} />
                          </button>
                          <button
                            onClick={() => removeFromCart(line.id)}
                            className="font-serif text-xs font-normal text-gray-light underline underline-offset-2 hover:text-navy transition-colors"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                      <div className="text-right min-w-[60px]">
                        <p className="font-serif text-sm font-normal text-ink font-normal">
                          £{subtotal.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Total */}
              <div className="mt-8 pt-6 border-t border-border">
                <div className="flex justify-between mb-4">
                  <span className="font-serif text-base font-normal text-ink">
                    Subtotal ({itemCount} item{itemCount !== 1 ? 's' : ''})
                  </span>
                  <span className="font-serif text-base font-normal text-ink font-normal">
                    £{parseFloat(total).toFixed(2)}
                  </span>
                </div>
                <button
                  className="w-full py-5 rounded-full bg-ink text-paper font-serif text-sm font-normal uppercase tracking-wider hover:bg-navy-light transition-colors"
                >
                  Checkout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
