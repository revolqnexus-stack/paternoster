'use client';

import { useCartStore } from '@/lib/store';
import Link from 'next/link';
import Image from 'next/image';
import { stockImage } from '@/lib/stock-images';
import { Plus, Minus, ShoppingBag } from 'lucide-react';
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
    <div className="max-w-measure mx-auto px-6 py-12 md:py-24">
      <Link
        href="/products"
        className="font-serif text-sm font-normal text-navy italic underline underline-offset-2 mb-6 inline-block"
      >
        ← The Shop
      </Link>

      <div className="grid lg:grid-cols-2 gap-16 items-start">
        {/* Images */}
        <div className="flex flex-col gap-4">
          <div className="relative aspect-square bg-border rounded overflow-hidden">
            {images[0]?.url ? (
              <Image
                src={images[0].url}
                alt={images[0].altText || product.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            ) : (
              <Image
                src={stockImage('bookshelf')}
                alt={product.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            )}
            {onSale && (
              <span className="absolute top-3 right-3 bg-navy text-paper text-xs font-serif px-2 py-1 uppercase tracking-wider">
                Sale
              </span>
            )}
            {!product.availableForSale && (
              <span className="absolute top-3 right-3 bg-ink text-paper text-xs font-serif px-2 py-1 uppercase tracking-wider">
                Sold Out
              </span>
            )}
          </div>
          {images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {images.slice(0, 4).map((img) => (
                <button
                  key={img.url}
                  className="aspect-square bg-border border border-border rounded overflow-hidden hover:border-ink transition-colors"
                >
                  <img src={img.url} alt={img.altText} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div>
          <p className="font-serif text-xs font-normal text-navy uppercase tracking-widest mb-2">
            {product.tags[0] || 'Editorial'}
          </p>
          <h1 className="font-serif text-4xl md:text-5xl font-normal mb-4 text-ink leading-tight">
            {product.title}
          </h1>

          <div className="mb-6">
            {onSale && comparePrice ? (
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-serif font-normal text-ink">
                  £{price.toFixed(2)}
                </span>
                <span className="font-serif text-lg font-normal text-gray-light line-through">
                  £{comparePrice.toFixed(2)}
                </span>
              </div>
            ) : (
              <span className="text-2xl font-serif font-normal text-ink">
                £{price.toFixed(2)}
              </span>
            )}
          </div>

          {/* Variants */}
          {variants.length > 1 && (
            <div className="mb-8">
              <p className="font-serif text-xs font-normal text-gray-light uppercase tracking-widest mb-3">
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
                      className={`px-5 py-2.5 font-serif text-sm font-normal uppercase tracking-wider rounded-full border transition-all ${
                        isSelected
                          ? 'bg-ink text-paper border-ink'
                          : 'bg-paper text-ink border-border hover:border-ink'
                      }`}
                    >
                      {v.title} — £{vPrice.toFixed(2)}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quantity + Add to Cart */}
          <div className="mb-8">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                disabled={quantity <= 1 || !product.availableForSale}
                className="w-10 h-10 rounded-full border border-border bg-paper flex items-center justify-center text-ink hover:bg-ink hover:text-paper transition-colors disabled:opacity-50"
              >
                <Minus size={14} strokeWidth={2} />
              </button>
              <input
                type="number"
                value={quantity}
                onChange={(e) =>
                  setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                }
                className="w-12 h-10 text-center border border-border rounded text-ink font-serif font-normal text-sm focus:outline-none focus:border-navy"
              />
              <button
                onClick={() => setQuantity((q) => q + 1)}
                disabled={!product.availableForSale}
                className="w-10 h-10 rounded-full border border-border bg-paper flex items-center justify-center text-ink hover:bg-ink hover:text-paper transition-colors disabled:opacity-50"
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
            className={`w-full py-5 rounded-lg font-serif text-sm font-normal uppercase tracking-wider transition-all ${
              isAdding ||
              cartLoading ||
              !product.availableForSale ||
              !selectedVariant
                ? 'bg-gray-light text-paper cursor-not-allowed'
                : 'bg-ink text-paper hover:bg-navy-light'
            }`}
          >
            {isAdding ? 'Adding…' : 'Add to Cart'}
          </button>

          {!product.availableForSale && (
            <p className="mt-3 text-xs font-serif text-gray-light italic text-center">
              Currently unavailable
            </p>
          )}

          {/* Description */}
          <div className="mt-16 border-t border-border pt-8">
            <h2 className="font-serif text-xl font-normal mb-4 text-ink">
              Details
            </h2>
            <div className="font-serif-alt text-lg text-ink leading-relaxed max-w-none">
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
  );
}
