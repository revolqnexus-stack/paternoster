'use client';

import { useCartStore } from '@/lib/store';
import Link from 'next/link';

export default function CartPage() {
  const { lines, total, closeCart } = useCartStore();
  const itemCount = lines.reduce((sum, l) => sum + l.quantity, 0);

  return (
    <div className="page-wrap">
      <div className="page-container py-12 md:py-24">
        <Link
          href="/products"
          className="font-serif text-sm font-normal text-navy italic underline underline-offset-2 mb-8 inline-block"
        >
          ← Back to Shop
        </Link>

        <div className="grid lg:grid-cols-12 gap-12">
          {/* Cart items */}
          <div className="lg:col-span-8">
            <h1 className="font-serif text-3xl md:text-4xl font-normal mb-8 text-ink leading-tight">
              Shopping Bag
            </h1>

            {lines.length === 0 ? (
              <div className="text-center py-24 measure mx-auto">
                <p className="font-serif text-lg text-gray-light italic mb-6">
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
                {lines.map((line: any) => {
                  const image =
                    line.merchandise.product.images?.edges?.[0]?.node?.url;
                  const price = parseFloat(line.merchandise.priceV2.amount);
                  const subtotal = price * line.quantity;

                  return (
                    <div
                      key={line.id}
                      className="flex gap-8 items-start py-8 border-b border-border"
                    >
                      <div className="aspect-[4/5] bg-border rounded-lg overflow-hidden flex-shrink-0 w-48 h-64">
                        <img
                          src={image || '/placeholder.svg'}
                          alt={line.merchandise.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 flex flex-col justify-between min-w-0">
                        <div>
                          <p className="font-serif text-lg font-normal text-ink leading-tight mb-2">
                            {line.merchandise.title}
                          </p>
                          <p className="font-serif text-base font-normal text-gray-light mb-4">
                            £{price.toFixed(2)}
                          </p>
                        </div>
                        <div className="flex items-center gap-4 text-sm font-serif font-normal">
                          <span className="text-ink">
                            Qty: {line.quantity}
                          </span>
                          <span className="text-gray-light underline underline-offset-2 hover:text-navy cursor-pointer">
                            Remove
                          </span>
                        </div>
                        <div className="mt-4 text-right font-serif text-base font-normal text-ink">
                          £{subtotal.toFixed(2)}
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* Total */}
                <div className="mt-12 pt-8 border-t border-border">
                  <div className="flex justify-between items-end mb-8">
                    <div>
                      <p className="font-serif text-base font-normal text-gray-light">
                        Subtotal ({itemCount} item{itemCount !== 1 ? 's' : ''})
                      </p>
                      <p className="font-serif text-2xl font-normal text-ink">
                        £{parseFloat(total).toFixed(2)}
                      </p>
                    </div>
                    <button
                      onClick={closeCart}
                      className="w-full py-5 rounded-full bg-ink text-paper font-serif text-sm font-normal uppercase tracking-wider hover:bg-navy-light transition-colors"
                    >
                      Checkout
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Order summary */}
          <div className="lg:col-span-4 hidden lg:block">
            <div className="sticky top-8">
              <div className="p-8 bg-border rounded-lg">
                <h3 className="font-serif text-xl font-normal mb-6 text-ink">
                  Order Summary
                </h3>
                <div className="flex justify-between mb-4">
                  <span className="font-serif text-sm font-normal text-gray-light">
                    Subtotal
                  </span>
                  <span className="font-serif text-sm font-normal text-ink">
                    £{parseFloat(total).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between mb-4">
                  <span className="font-serif text-sm font-normal text-gray-light">
                    Shipping
                  </span>
                  <span className="font-serif text-sm font-normal text-gray-light">
                    Calculated at checkout
                  </span>
                </div>
                <hr className="section-divider my-6" />
                <div className="flex justify-between mb-8">
                  <span className="font-serif text-sm font-normal text-ink font-normal">
                    Total
                  </span>
                  <span className="font-serif text-sm font-normal text-ink font-normal">
                    £{parseFloat(total).toFixed(2)}
                  </span>
                </div>
                <button
                  className="w-full py-5 rounded-full bg-ink text-paper font-serif text-sm font-normal uppercase tracking-wider hover:bg-navy-light transition-colors"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
