'use client';

import Link from 'next/link';
import ImageWithFallback from '@/components/ImageWithFallback';
import { stockImage } from '@/lib/stock-images';
import { motion } from 'framer-motion';

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] as const } },
};

interface MockProduct {
  id: string;
  handle: string;
  title: string;
  price: string;
  image: string;
  category: string;
}

export default function ProductsClient({ products }: { products: any[] }) {
  const MOCK_PRODUCTS: MockProduct[] = [
    {
      id: 'mock-1',
      handle: 'lrb-tote-bag',
      title: 'LRB Tote Bag',
      price: '£18.00',
      image: stockImage('notebook'),
      category: 'Accessories',
    },
    {
      id: 'mock-2',
      handle: 'pater-noster-print-vol-i',
      title: 'Pater Noster Print Vol. I',
      price: '£32.00',
      image: stockImage('desk'),
      category: 'Prints',
    },
    {
      id: 'mock-3',
      handle: 'the-reading-room-essays',
      title: 'The Reading Room: Essays',
      price: '£14.99',
      image: stockImage('reading'),
      category: 'Books',
    },
    {
      id: 'mock-4',
      handle: 'lrb-subscription-annual',
      title: 'LRB Subscription (Annual)',
      price: '£79.00',
      image: stockImage('library'),
      category: 'Subscriptions',
    },
    {
      id: 'mock-5',
      handle: 'writers-notebook-ruled',
      title: "Writer's Notebook — Ruled",
      price: '£12.00',
      image: stockImage('pen'),
      category: 'Stationery',
    },
    {
      id: 'mock-6',
      handle: 'pater-noster-enamel-pin',
      title: 'Pater Noster Enamel Pin',
      price: '£8.00',
      image: stockImage('typewriter'),
      category: 'Accessories',
    },
  ];

  const isMock = products.length === 0;
  const displayProducts = isMock ? MOCK_PRODUCTS : null;

  return (
    <div className="page-wrap">
      <div className="page-container">
        {/* ── Shop header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 max-w-2xl"
        >
          <p className="label mb-3" style={{ color: 'var(--muted)' }}>
            Curated objects for the life of the mind
          </p>
          <h1 className="section-title mb-5">The Shop</h1>
          <p
            className="font-serif-body text-base leading-relaxed"
            style={{ color: 'var(--muted)' }}
          >
            From limited-edition prints and essential reading to stationery and
            keepsakes — each object in the Pater Noster shop has been chosen with
            the same care we bring to every essay we publish.
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="label mb-8"
          style={{ color: 'var(--muted)' }}
        >
          {isMock ? `${MOCK_PRODUCTS.length} items` : `${products.length} items`}
        </motion.p>

        {/* ── Real products grid ── */}
        {!isMock && (
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
                <RealProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* ── Mock products grid ── */}
        {isMock && (
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
            }}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {MOCK_PRODUCTS.map((product, idx) => (
              <motion.div
                key={product.id}
                variants={itemVariants}
                transition={{ delay: idx * 0.06 }}
              >
                <MockProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}

/* ── Real product card (Shopify data) ── */
function RealProductCard({ product }: { product: any }) {
  const images = product.images?.edges?.map((e: any) => e.node) || [];
  const price = parseFloat(product.priceRange.minVariantPrice.amount);

  return (
    <motion.a
      href={`/products/${product.handle}`}
      whileHover={{ y: -5 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="block"
    >
      <article className="article-card">
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
              src={stockImage('cover7')}
              alt={product.title}
              className="w-full h-full object-cover"
              fallbackKey="bookshelf"
            />
          )}
        </motion.div>
        <p className="article-card-category">Editorial</p>
        <motion.span
          className="article-card-title block"
          whileHover={{ color: 'rgba(11,11,11,0.7)' }}
        >
          {product.title}
        </motion.span>
        <p className="article-card-price">£{price.toFixed(2)}</p>
      </article>
    </motion.a>
  );
}

/* ── Mock product card (placeholder data) ── */
function MockProductCard({ product }: { product: MockProduct }) {
  return (
    <motion.article
      whileHover={{ y: -5 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="article-card"
    >
      {/* Image */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="article-card-image overflow-hidden"
      >
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </motion.div>

      {/* Category tag */}
      <p className="article-card-category">{product.category}</p>

      {/* Title */}
      <p className="article-card-title">{product.title}</p>

      {/* Price */}
      <p
        className="font-serif text-base font-semibold mt-1 mb-4"
        style={{ color: 'var(--ink)' }}
      >
        {product.price}
      </p>

      {/* Add to Bag */}
      <button
        type="button"
        className="w-full py-2.5 font-serif text-sm font-semibold tracking-wide transition-opacity hover:opacity-80"
        style={{ background: 'var(--ink)', color: 'var(--paper)' }}
        onClick={() => {/* not wired */}}
      >
        Add to Bag
      </button>
    </motion.article>
  );
}
