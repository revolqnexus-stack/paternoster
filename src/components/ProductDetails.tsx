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
    <div className="page-wrap">
      <div className="page-container">
        <Link
          href="/products"
          className="text-muted hover:text-ink transition-colors text-sm font-serif-body italic"
        >
          ← The Shop
        </Link>

        <h1 className="section-title mb-4">{product.title}</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product image */}
          <div>
            <div className="article-card-image mb-4">
              {images[0]?.url ? (
                <img
                  src={images[0].url}
                  alt={images[0].altText || product.title}
                  className="w-full h-full object-cover"
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

          {/* Product info */}
          <div>
            <p className="label mb-2">
              {product.tags[0] || 'Editorial'}
            </p>

            <div className="mb-4">
              {onSale && comparePrice ? (
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-lg font-normal">
                    £{price.toFixed(2)}
                  </span>
                  <span className="text-muted line-through">
                    £{comparePrice.toFixed(2)}
                  </span>
                </div>
              ) : (
                <span className="font-serif text-lg font-normal">
                  £{price.toFixed(2)}
                </span>
              )}
            </div>

            {variants.length > 1 && (
              <div className="mb-6">
                <p className="label mb-2">Choose variant</p>
                <div className="flex flex-wrap gap-2">
                  {variants.map((v) => {
                    const isSelected = selectedVariant?.id === v.id;
                    const vPrice = parseFloat(v.priceV2.amount);
                    return (
                      <button
                        key={v.id}
                        onClick={() => setSelectedVariant(v)}
                        className={`border border-hairline bg-paper px-3 py-1.5 text-xs font-serif-body text-ink transition-colors ${
                          isSelected
                            ? 'bg-ink text-paper border-ink'
                            : 'hover:border-ink hover:bg-ink/5'
                        }`}
                      >
                        {v.title} — £{vPrice.toFixed(2)}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="mb-6">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity <= 1 || !product.availableForSale}
                  className="w-8 h-8 rounded border border-hairline bg-paper flex items-center justify-center text-ink hover:bg-ink hover:text-paper transition-colors disabled:opacity-50 disabled:pointer-events-none"
                >
                  <Minus size={12} strokeWidth={2} />
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                  }
                  className="w-8 h-8 text-center border border-hairline rounded text-ink font-serif-body text-sm focus:outline-none focus:border-ink"
                />
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  disabled={!product.availableForSale}
                  className="w-8 h-8 rounded border border-hairline bg-paper flex items-center justify-center text-ink hover:bg-ink hover:text-paper transition-colors disabled:opacity-50 disabled:pointer-events-none"
                >
                  <Plus size={12} strokeWidth={2} />
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
              className={`w-full py-3 border border-hairline bg-paper text-xs font-serif-body text-ink uppercase tracking-widest transition-colors ${
                isAdding ||
                cartLoading ||
                !product.availableForSale ||
                !selectedVariant
                  ? 'bg-muted text-paper cursor-not-allowed'
                  : 'hover:bg-ink hover:text-paper'
              }`}
            >
              {isAdding ? 'Adding…' : 'Add to bag'}
            </button>

            {!product.availableForSale && (
              <p className="mt-3 text-xs font-serif-body text-muted italic">
                Currently unavailable
              </p>
            )}
          </div>
        </div>

        <hr className="section-divider my-8" />

        {/* Details */}
        <h2 className="text-lg font-serif font-semibold mb-2 text-ink">
          Details
        </h2>
        <div className="font-serif-body text-lg leading-relaxed measure text-ink">
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
  );
}
