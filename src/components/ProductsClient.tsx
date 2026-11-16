'use client';

import Link from 'next/link';
import ImageWithFallback from '@/components/ImageWithFallback';
import { stockImage } from '@/lib/stock-images';
import { motion } from 'framer-motion';

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] as const } },
};

export default function ProductsClient({ products }: { products: any[] }) {
  return (
    <div className="page-wrap">
      <div className="page-container">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="section-title mb-6"
        >
          The Shop
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="label mb-4"
        >
          {products.length} items
        </motion.p>

        {products.length === 0 ? (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif-body text-muted"
          >
            No products found.
          </motion.p>
        ) : (
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
            }}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {products.map((product: any, idx: number) => (
              <motion.div
                key={product.id}
                variants={itemVariants}
                transition={{ delay: idx * 0.06 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}

interface ProductCardProps {
  product: any;
}

function ProductCard({ product }: ProductCardProps) {
  const images = product.images?.edges?.map((e: any) => e.node) || [];
  const price = parseFloat(product.priceRange.minVariantPrice.amount);

  return (
    <motion.a
      key={product.id}
      href={`/products/${product.handle}`}
      whileHover={{ y: -5 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="block"
    >
      <motion.article
        whileHover={{ y: -5 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="article-card"
      >
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="article-card-image"
        >
          {images[0]?.url ? (
            <img
              src={images[0].url}
              alt={images[0].altText || product.title}
              className="w-full h-full object-cover"
              loading="lazy"
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
        <p className="article-card-category">
          Editorial
        </p>
        <motion.a
          href={`/products/${product.handle}`}
          className="article-card-title"
          whileHover={{ color: 'rgba(11,11,11,0.7)' }}
        >
          {product.title}
        </motion.a>
        <p className="article-card-price">
          £{price.toFixed(2)}
        </p>
      </motion.article>
    </motion.a>
  );
}
