'use client';

import { useCartStore } from '@/lib/store';
import Link from 'next/link';

export default function CartPage() {
  const { lines, total, closeCart } = useCartStore();
  const itemCount = lines.reduce((sum, l) => sum + l.quantity, 0);

  return (
    <div className="page-wrap">
      <div className="page-container">
        <Link
          href="/products"
          className="text-muted hover:text-ink transition-colors text-sm font-serif-body italic"
        >
          ← Back to Shop
        </Link>

        <h1 className="section-title mb-8">Shopping Bag</h1>

        {lines.length === 0 ? (
          <div className="text-center py-16 measure mx-auto">
            <p className="font-serif-body text-lg text-muted mb-4">
              Your bag is empty.
            </p>
            <Link
              href="/products"
              className="text-ink underline underline-offset-2 hover:text-muted transition-colors"
            >
              Browse The Shop →
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
                  className="grid grid-cols-12 gap-6 border-b border-hairline py-6"
                >
                  <div className="col-span-2 md:col-span-1">
                    <div className="aspect-[4/5] bg-hairline overflow-hidden">
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
                  </div>
                  <div className="col-span-10 md:col-span-8 flex flex-col justify-between">
                    <div>
                      <a
                        href={`/products/${line.merchandise.product.handle}`}
                        className="article-title"
                      >
                        {line.merchandise.title}
                      </a>
                      <p className="font-serif-body text-sm text-muted mb-2">
                        £{price.toFixed(2)}
                      </p>
                    </div>
                    <div className="flex items-center gap-4 text-sm font-serif-body text-muted">
                      <span>Qty: {line.quantity}</span>
                      <button
                        onClick={() => closeCart()}
                        className="text-muted hover:text-ink underline underline-offset-2"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="mt-4 text-right font-serif text-base font-normal text-ink">
                      £{subtotal.toFixed(2)}
                    </div>
                  </div>
                </div>
              );
            })}

            <div className="mt-8 pt-8 border-t border-hairline">
              <div className="flex justify-between items-end mb-4">
                <div>
                  <p className="font-serif-body text-sm text-muted">
                    Subtotal ({itemCount} item{itemCount !== 1 ? 's' : ''})
                  </p>
                  <p className="font-serif text-lg font-normal text-ink">
                    £{parseFloat(total).toFixed(2)}
                  </p>
                </div>
                <button
                  onClick={closeCart}
                  className="w-auto py-3 border border-hairline bg-paper text-xs font-serif-body text-ink uppercase tracking-widest hover:bg-ink hover:text-paper transition-colors"
                >
                  Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

import ImageWithFallback from '@/components/ImageWithFallback';
import { stockImage } from '@/lib/stock-images';
