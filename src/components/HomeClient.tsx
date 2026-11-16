'use client';

import Link from 'next/link';
import ImageWithFallback from '@/components/ImageWithFallback';
import { stockImage } from '@/lib/stock-images';
import { motion } from 'framer-motion';

interface Article {
  title: string;
  author: string;
  date: string | null;
  excerpt: string;
  image: string;
  imageAlt: string;
}

interface Product {
  id: string;
  handle: string;
  title: string;
  priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
  images: { edges: Array<{ node: { url: string; altText: string } }> };
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] as const } },
};

interface HomeClientProps {
  featured: Article;
  rest: Article[];
  products: Product[];
}

export default function HomeClient({ featured, rest, products }: HomeClientProps) {
  return (
    <div className="page-wrap">
      {/* ===== HERO — full width bg, two-column editorial ===== */}
      <section className="section-full hero-bg">
        <div className="container section-padding-lg">
          <div className="hero-content-wrap">
            <div className="hero-image-col">
              <div className="hero-image-wrap">
                <motion.div
                  initial={{ scale: 1.15 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] as const }}
                  className="hero-image"
                >
                  <ImageWithFallback
                    src={featured.image}
                    alt={featured.imageAlt}
                    className="w-full h-full object-cover"
                    fallbackKey="reading"
                  />
                </motion.div>
                <div className="hero-overlay" />
              </div>
            </div>
            <div className="hero-text-col">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] as const }}
                className="hero-content"
              >
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="hero-kicker"
                >
                  Featured
                </motion.p>
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="hero-title"
                >
                  {featured.title}
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className="hero-byline"
                >
                  By {featured.author}
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                  className="hero-excerpt"
                >
                  {featured.excerpt}
                </motion.p>
                <motion.a
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.6 }}
                  href="/"
                  className="text-ink underline underline-offset-2 hover:text-accent transition-colors font-serif"
                >
                  Read the essay →
                </motion.a>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <hr className="hairline mb-8 md:mb-12" />

      {/* ===== IN THIS ISSUE — full width bg, three-column index ===== */}
      <section className="section-full bg-paper-2">
        <div className="container section-padding-md">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="section-title"
          >
            In this issue
          </motion.h2>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="issue-list-wrap"
          >
            {rest.map((article, idx) => (
              <motion.div
                key={article.title}
                variants={itemVariants}
                transition={{ delay: idx * 0.08 }}
                className="issue-list"
              >
                <div className="issue-number">
                  0{idx + 1}
                </div>
                <div className="issue-info">
                  <motion.p
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + idx * 0.05, duration: 0.5 }}
                    className="issue-author"
                  >
                    {article.author}
                  </motion.p>
                  <motion.a
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + idx * 0.05, duration: 0.5 }}
                    href="/"
                    className="issue-title"
                  >
                    {article.title}
                  </motion.a>
                </div>
                <div className="issue-meta">
                  {article.date || ''}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <hr className="hairline mb-8 md:mb-12" />

      {/* ===== EDITORIAL ESSAY GRID — full width bg, centered container ===== */}
      <section className="section-full">
        <div className="container section-padding-lg">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="section-title"
          >
            Writing
          </motion.h2>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid-12"
          >
            {rest.map((article, idx) => {
              const isLarge = idx % 2 === 0;
              return (
                <motion.div
                  key={article.title}
                  variants={itemVariants}
                  style={{ gridColumn: `span ${isLarge ? 7 : 5}` }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <article className="article-card">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 + idx * 0.05, duration: 0.6 }}
                      className="article-card-image"
                    >
                      <ImageWithFallback
                        src={article.image}
                        alt={article.imageAlt}
                        className="w-full h-full object-cover"
                        fallbackKey="bookshelf"
                      />
                    </motion.div>
                    <motion.p
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + idx * 0.05, duration: 0.5 }}
                      className="article-card-category"
                    >
                      Editorial
                    </motion.p>
                    <motion.a
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + idx * 0.05, duration: 0.5 }}
                      href="/"
                      className="article-card-title"
                    >
                      {article.title}
                    </motion.a>
                    <motion.p
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + idx * 0.05, duration: 0.5 }}
                      className="article-card-author"
                    >
                      {article.author}
                    </motion.p>
                    {article.date && (
                      <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + idx * 0.05, duration: 0.5 }}
                        className="article-card-date"
                      >
                        {article.date}
                      </motion.p>
                    )}
                  </article>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      <hr className="hairline mb-8 md:mb-12" />

      {/* ===== SHOP — full width bg, centered container ===== */}
      {products.length > 0 && (
        <section className="section-full border-t border-hairline">
          <div className="container section-padding-lg">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="section-title">From the shop</h2>
            </motion.div>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {products.map((product: any, idx: number) => (
                <motion.div
                  key={product.id}
                  variants={itemVariants}
                  transition={{ delay: idx * 0.08 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}
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
        <div className="article-card-image">
          {images[0]?.url ? (
            <motion.img
              src={images[0].url}
              alt={images[0].altText || product.title}
              className="w-full h-full object-cover"
              loading="lazy"
              whileHover={{ scale: 1.05 }}
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
        </div>
        <p className="article-card-category">
          Editorial
        </p>
        <motion.a
          href={`/products/${product.handle}`}
          className="article-card-title"
          whileHover={{ color: 'rgba(26,26,26,0.7)' }}
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
