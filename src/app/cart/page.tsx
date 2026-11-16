'use client';

import { useCartStore } from '@/lib/store';
import Link from 'next/link';
import ImageWithFallback from '@/components/ImageWithFallback';
import { stockImage } from '@/lib/stock-images';

export default function CartPage() {
  const { lines, total, closeCart } = useCartStore();
  const itemCount = lines.reduce((sum, l) => sum + l.quantity, 0);

  return (
    <div className="page-wrap relative z-10">
      <div className="page-container py-8 md:py-16">
        <Link
          href="/products"
          className="font-grotesk text-xs font-medium text-navy italic underline underline-offset-2 mb-8 md:mb-12 inline-block hover:text-navy-light transition-colors"
        >
          ← Back to Shop
        </Link>

        <h1 className="font-display text-[clamp(3rem,8vw,5rem)] font-normal mb-12 text-ink leading-tight italic">
          Shopping Bag
        </h1>

        {lines.length === 0 ? (
          <div className="text-center py-32 measure mx-auto">
            <p className="font-display text-2xl md:text-3xl text-gray-light italic mb-6">
              Your bag is empty
            </p>
            <Link
              href="/products"
              className="font-grotesk text-base font-medium text-navy italic underline underline-offset-2 hover:text-navy-light transition-colors"
            >
              Browse Collection →
            </Link>
          </div>
        ) : (
          <>
            <div className="grid lg:grid-cols-12 gap-12">
              {/* Cart items */}
              <div className="lg:col-span-8">
                {lines.map((line: any) => {
                  const image =
                    line.merchandise.product.images?.edges?.[0]?.node?.url;
                  const price = parseFloat(line.merchandise.priceV2.amount);
                  const subtotal = price * line.quantity;

                  return (
                    <div
                      key={line.id}
                      className="flex gap-6 items-start py-8 border-b border-border"
                    >
                      <div className="aspect-[4/5] bg-border overflow-hidden flex-shrink-0 w-40 md:w-48">
                        {image ? (
                          <img
                            src={image}
                            alt={line.merchandise.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <ImageWithFallback
                            src={line.merchandise.product.images?.edges?.[0]?.node?.url || stockImage('bookshelf')}
                            alt={line.merchandise.title}
                            className="w-full h-full object-cover"
                            fallbackKey="bookshelf"
                          />
                        )}
                      </div>
                      <div className="flex-1 flex flex-col justify-between min-w-0">
                        <div>
                          <p className="font-serif text-base font-normal text-ink leading-tight mb-2">
                            {line.merchandise.title}
                          </p>
                          <p className="font-grotesk text-sm font-medium text-navy mb-4">
                            £{price.toFixed(2)}
                          </p>
                        </div>
                        <div className="flex items-center gap-4 text-sm font-grotesk font-medium">
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
                      <p className="font-grotesk text-sm font-medium text-gray-light">
                        Subtotal ({itemCount} item{itemCount !== 1 ? 's' : ''})
                      </p>
                      <p className="font-display text-2xl font-normal text-ink">
                        £{parseFloat(total).toFixed(2)}
                      </p>
                    </div>
                    <button
                      onClick={closeCart}
                      className="w-full py-5 rounded-full bg-ink text-paper font-grotesk text-xs font-medium uppercase tracking-wider hover:bg-navy-light transition-colors"
                    >
                      Checkout
                    </button>
                  </div>
                </div>
              </div>

              {/* Order summary */}
              <div className="lg:col-span-4 hidden lg:block">
                <div className="sticky top-8">
                  <div className="p-8 bg-border">
                    <h3 className="font-display text-xl font-normal mb-6 text-ink italic">
                      Order Summary
                    </h3>
                    <div className="flex justify-between mb-4">
                      <span className="font-grotesk text-sm font-medium text-gray-light">
                        Subtotal
                      </span>
                      <span className="font-grotesk text-sm font-medium text-ink">
                        £{parseFloat(total).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between mb-4">
                      <span className="font-grotesk text-sm font-medium text-gray-light">
                        Shipping
                      </span>
                      <span className="font-grotesk text-sm font-medium text-gray-light">
                        Calculated at checkout
                      </span>
                    </div>
                    <hr className="hairline my-6" />
                    <div className="flex justify-between mb-8">
                      <span className="font-grotesk text-sm font-medium text-ink">
                        Total
                      </span>
                      <span className="font-grotesk text-sm font-medium text-ink">
                        £{parseFloat(total).toFixed(2)}
                      </span>
                    </div>
                    <button
                      className="w-full py-5 rounded-full bg-ink text-paper font-grotesk text-xs font-medium uppercase tracking-wider hover:bg-navy-light transition-colors"
                    >
                      Proceed to Checkout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
