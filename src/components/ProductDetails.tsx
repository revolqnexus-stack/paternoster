'use client';

import { getProduct } from '@/lib/shopify';
import { useCartStore } from '@/lib/store';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { Plus, Minus, ShoppingBag } from 'lucide-react';
import { useState, useEffect } from 'react';

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

  const inCart = selectedVariant
    ? (() => {
        const lines = (useCartStore.getState() as any).lines;
        return lines.find((l: any) => l.merchandise.id === selectedVariant?.id);
      })()
    : null;
  const cartQty = inCart ? inCart.quantity : 0;

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
    <div className="max-w-container mx-auto px-6 py-12 md:py-24">
      <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-start">
        {/* Images */}
        <div className="flex flex-col gap-4">
          <div className="relative aspect-[4/5] bg-cream border border-border-subtle rounded-lg overflow-hidden">
            {images[0]?.url ? (
              <Image
                src={images[0].url}
                alt={images[0].altText || product.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-charcoal/20 text-4xl">
                📖
              </div>
            )}
            {onSale && (
              <span className="absolute top-3 right-3 bg-burgundy text-ivory text-xs px-2 py-1 uppercase tracking-wide font-medium">
                Sale
              </span>
            )}
            {!product.availableForSale && (
              <span className="absolute top-3 right-3 bg-charcoal text-ivory text-xs px-2 py-1 uppercase tracking-wide font-medium">
                Sold Out
              </span>
            )}
          </div>
          {images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {images.slice(0, 4).map((img) => (
                <button
                  key={img.url}
                  className="aspect-square bg-cream border border-border-subtle rounded-md overflow-hidden hover:border-charcoal transition-colors"
                >
                  <img src={img.url} alt={img.altText} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div>
          <p className="text-xs uppercase tracking-widest text-burgundy font-medium mb-2">
            {product.tags[0] || 'Editorial'}
          </p>
          <h1 className="font-heading text-4xl md:text-5xl font-normal mb-4 text-soft-black leading-tight">
            {product.title}
          </h1>

          <div className="mb-2">
            {onSale && comparePrice ? (
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-body font-medium text-charcoal">
                  £{price.toFixed(2)}
                </span>
                <span className="text-sm text-sage line-through">
                  £{comparePrice.toFixed(2)}
                </span>
              </div>
            ) : (
              <span className="text-xl font-body font-medium text-charcoal">
                £{price.toFixed(2)}
              </span>
            )}
          </div>

          {/* Variants */}
          {variants.length > 1 && (
            <div className="mb-6">
              <p className="text-xs uppercase tracking-wider text-charcoal/60 font-medium mb-3">
                Choose variant
              </p>
              <div className="flex flex-wrap gap-2">
                {variants.map((v) => {
                  const isSelected = selectedVariant?.id === v.id;
                  const vPrice = parseFloat(v.priceV2.amount);
                  return (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariant(v)}
                      className={`px-4 py-2 text-xs font-medium uppercase tracking-wider rounded-full border transition-all ${
                        isSelected
                          ? 'bg-soft-black text-ivory border-soft-black'
                          : 'bg-white text-charcoal border-border-subtle hover:border-charcoal'
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
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                disabled={quantity <= 1 || !product.availableForSale}
                className="w-10 h-10 rounded-full border border-border-subtle bg-white flex items-center justify-center text-charcoal hover:bg-charcoal hover:text-white transition-colors disabled:opacity-50"
              >
                <Minus size={16} />
              </button>
              <input
                type="number"
                value={quantity}
                onChange={(e) =>
                  setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                }
                className="w-12 h-10 text-center border border-border-subtle rounded-lg text-charcoal font-medium text-sm focus:outline-none focus:border-burgundy"
              />
              <button
                onClick={() => setQuantity((q) => q + 1)}
                disabled={!product.availableForSale}
                className="w-10 h-10 rounded-full border border-border-subtle bg-white flex items-center justify-center text-charcoal hover:bg-charcoal hover:text-white transition-colors disabled:opacity-50"
              >
                <Plus size={16} />
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
            className={`w-full py-5 rounded-lg font-body text-sm font-medium uppercase tracking-wider transition-all ${
              isAdding ||
              cartLoading ||
              !product.availableForSale ||
              !selectedVariant
                ? 'bg-sage text-white cursor-not-allowed'
                : cartQty > 0
                  ? 'bg-burgundy text-ivory hover:bg-burgundy-light'
                  : 'bg-soft-black text-ivory hover:bg-burgundy'
            }`}
          >
            {isAdding
              ? 'Adding…'
              : cartQty > 0
                ? `Added ({cartQty})`
                : 'Add to Cart'}
          </button>

          {!product.availableForSale && (
            <p className="mt-3 text-xs text-charcoal/50 text-center">
              Currently unavailable
            </p>
          )}

          {/* Description */}
          <div className="mt-12 border-t border-border-subtle pt-8">
            <h2 className="font-heading text-xl font-normal mb-4 text-soft-black">
              Details
            </h2>
            <div className="prose prose-sm text-charcoal/80 leading-relaxed max-w-none">
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
