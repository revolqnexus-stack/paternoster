'use client';

import { useCartStore } from '@/lib/store';
import Link from 'next/link';
import ImageWithFallback from '@/components/ImageWithFallback';
import { stockImage } from '@/lib/stock-images';
import { Plus, Minus } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

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
        <motion.a
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          href="/products"
          className="text-muted hover:text-ink transition-colors text-sm font-serif-body italic"
        >
          ← The Shop
        </motion.a>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="section-title mb-4"
        >
          {product.title}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {/* Product image */}
          <div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="article-card-image mb-4"
            >
              {images[0]?.url ? (
                <motion.img
                  src={images[0].url}
                  alt={images[0].altText || product.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                />
              ) : (
                <ImageWithFallback
                  src={stockImage('bookshelf')}
                  alt={product.title}
                  className="w-full h-full object-cover"
                  fallbackKey="bookshelf"
                />
              )}
            </motion.div>
          </div>

          {/* Product info */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="label mb-2"
            >
              {product.tags[0] || 'Editorial'}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mb-4"
            >
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
            </motion.div>

            {variants.length > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="mb-6"
              >
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45, duration: 0.4 }}
                  className="label mb-2"
                >
                  Choose variant
                </motion.p>
                <div className="flex flex-wrap gap-2">
                  {variants.map((v) => {
                    const isSelected = selectedVariant?.id === v.id;
                    const vPrice = parseFloat(v.priceV2.amount);
                    return (
                      <motion.button
                        key={v.id}
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        onClick={() => setSelectedVariant(v)}
                        className={`border border-hairline bg-paper px-3 py-1.5 text-xs font-serif-body text-ink transition-colors ${
                          isSelected
                            ? 'bg-ink text-paper border-ink'
                            : 'hover:border-ink hover:bg-ink/5'
                        }`}
                      >
                        {v.title} — £{vPrice.toFixed(2)}
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="mb-6"
            >
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
            </motion.div>

            <motion.button
              whileHover={{ backgroundColor: 'rgba(11,11,11,0.8)' }}
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
            </motion.button>

            {!product.availableForSale && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.4 }}
                className="mt-3 text-xs font-serif-body text-muted italic text-center"
              >
                Currently unavailable
              </motion.p>
            )}
          </div>
        </motion.div>

        <hr className="section-divider my-8" />

        {/* Details */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-lg font-serif font-semibold mb-2 text-ink"
        >
          Details
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="font-serif-body text-lg leading-relaxed measure text-ink"
        >
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
        </motion.div>
      </div>
    </div>
  );
}
