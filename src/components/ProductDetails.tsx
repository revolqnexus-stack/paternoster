'use client';

import { useCartStore } from '@/lib/store';
import Link from 'next/link';
import ImageWithFallback from '@/components/ImageWithFallback';
import { stockImage } from '@/lib/stock-images';
import { Plus, Minus } from 'lucide-react';
import { useState } from 'react';

interface ProductImage {
  url: string;
  altText: string;
  width: number;
  height: number;
}

interface ProductVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  priceV2: { amount: string; currencyCode: string };
  selectedOptions: Array<{ name: string; value: string }>;
}

interface ProductData {
  id: string;
  title: string;
  handle: string;
  description: string;
  descriptionHtml: string;
  tags: string[];
  availableForSale: boolean;
  priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
  compareAtPriceRange?: { minVariantPrice: { amount: string } | null };
  images: { edges: Array<{ node: ProductImage }> };
  variants: { edges: Array<{ node: ProductVariant }> };
}

export default function ProductDetails({
  product,
}: {
  product: ProductData;
}) {
  const { addToCart, isLoading: cartLoading } = useCartStore();

  const images = product.images?.edges?.map((e) => e.node) || [];
  const variants = product.variants?.edges?.map((e) => e.node) || [];
  const price = parseFloat(product.priceRange.minVariantPrice.amount);
  const compareAtPrice = product.compareAtPriceRange?.minVariantPrice?.amount;
  const comparePrice =
    compareAtPrice && parseFloat(compareAtPrice) > 0
      ? parseFloat(compareAtPrice)
      : null;
  const onSale = comparePrice && comparePrice > price;

  const [selectedVariant, setSelectedVariant] = useState(
    variants[0] || null
  );
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    if (!selectedVariant) return;
    setIsAdding(true);
    try {
      await addToCart(selectedVariant.id, quantity);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="page-wrap relative z-10">
      <div className="page-container py-8 md:py-16">
        <Link
          href="/products"
          className="font-ui-sans text-xs font-medium text-blue italic underline underline-offset-2 mb-8 md:mb-12 inline-block hover:text-ink transition-colors"
        >
          ← The Shop
        </Link>

        <div className="grid lg:grid-cols-12 gap-12">
          {/* Product image - left, span 7 */}
          <div className="lg:col-span-7">
            <div className="relative aspect-[4/5] bg-paper-2 overflow-hidden">
              {images[0]?.url ? (
                <img
                  src={images[0].url}
                  alt={images[0].altText || product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]"
                />
              ) : (
                <ImageWithFallback
                  src={stockImage('bookshelf')}
                  alt={product.title}
                  className="w-full h-full object-cover"
                  fallbackKey="bookshelf"
                />
              )}
            </div>
          </div>

          {/* Product info - right, span 5 */}
          <div className="lg:col-span-5 flex flex-col justify-between min-h-[600px]">
            <div>
              <p className="font-ui-sans text-xs font-medium text-blue uppercase tracking-widest mb-2">
                {product.tags[0] || 'Editorial'}
              </p>
              <h1 className="font-display font-bold text-[clamp(2.5rem,6vw,4rem)] leading-[1.1] tracking-[-0.02em] text-ink mb-4 italic">
                {product.title}
              </h1>

              <div className="mb-8">
                {onSale && comparePrice ? (
                  <div className="flex items-baseline gap-3">
                    <span className="font-display font-bold text-[clamp(2rem,5vw,3rem)] leading-none text-ink">
                      £{price.toFixed(2)}
                    </span>
                    <span className="font-ui-sans text-lg font-medium text-muted line-through">
                      £{comparePrice.toFixed(2)}
                    </span>
                  </div>
                ) : (
                  <span className="font-display font-bold text-[clamp(2rem,5vw,3rem)] leading-none text-ink">
                    £{price.toFixed(2)}
                  </span>
                )}
              </div>

              {variants.length > 1 && (
                <div className="mb-8">
                  <p className="font-ui-sans text-xs font-medium text-muted uppercase tracking-widest mb-3">
                    Choose variant
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {variants.map((v) => {
                      const isSelected = selectedVariant?.id === v.id;
                      const vPrice = parseFloat(v.priceV2.amount);
                      return (
                        <button
                          key={v.id}
                          onClick={() => setSelectedVariant(v)}
                          className={`px-6 py-3 font-ui-sans text-xs font-medium uppercase tracking-wider border transition-all duration-300 ${
                            isSelected
                              ? 'bg-ink text-blue-ink border-ink'
                              : 'bg-paper text-ink border-hairline hover:border-blue hover:bg-blue/5'
                          }`}
                        >
                          {v.title} — £{vPrice.toFixed(2)}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="mb-8">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1 || !product.availableForSale}
                    className="w-10 h-10 rounded-sm border border-hairline bg-paper flex items-center justify-center text-ink hover:bg-ink hover:text-paper transition-colors disabled:opacity-50 disabled:pointer-events-none"
                  >
                    <Minus size={14} strokeWidth={2} />
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) =>
                      setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                    }
                    className="w-12 h-10 text-center border border-hairline rounded-sm text-ink font-ui-sans font-medium text-sm focus:outline-none focus:border-blue"
                  />
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    disabled={!product.availableForSale}
                    className="w-10 h-10 rounded-sm border border-hairline bg-paper flex items-center justify-center text-ink hover:bg-ink hover:text-paper transition-colors disabled:opacity-50 disabled:pointer-events-none"
                  >
                    <Plus size={14} strokeWidth={2} />
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={
                  isAdding ||
                  cartLoading ||
                  !product.availableForSale ||
                  !selectedVariant
                }
                className={`w-full py-5 rounded-sm font-ui-sans text-sm font-medium uppercase tracking-wider transition-all duration-300 ${
                  isAdding ||
                  cartLoading ||
                  !product.availableForSale ||
                  !selectedVariant
                    ? 'bg-muted text-paper cursor-not-allowed'
                    : 'bg-blue text-blue-ink hover:bg-ink'
                }`}
              >
                {isAdding ? 'Adding…' : 'Add to bag'}
              </button>

              {!product.availableForSale && (
                <p className="mt-4 text-[0.8rem] font-ui-sans text-muted italic text-center">
                  Currently unavailable
                </p>
              )}
            </div>

            <hr className="hairline my-8" />

            {/* Details */}
            <div>
              <h2 className="font-display font-bold text-xl leading-[1.1] text-ink mb-4 italic">
                Details
              </h2>
              <div className="font-text-serif text-lg leading-relaxed measure text-ink opacity-90">
                {product.descriptionHtml ? (
                  <div
                    className="prose-html"
                    dangerouslySetInnerHTML={{
                      __html: product.descriptionHtml,
                    }}
                  />
                ) : (
                  <p>{product.description || 'No description available.'}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
