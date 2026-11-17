'use client';

import Link from 'next/link';
import ImageWithFallback from '@/components/ImageWithFallback';
import { stockImage } from '@/lib/stock-images';
import { motion } from 'framer-motion';
import GlareHover from '@/components/GlareHover';
import SplitFlapText from '@/components/SplitFlapText';
import Grainient from '@/components/Grainient';
import MaskedHeading from '@/components/MaskedHeading';
import HoloCard from '@/components/HoloCard';
import DitherVeil from '@/components/DitherVeil';

interface Article {
  title: string;
  author: string;
  date: string | null;
  excerpt: string;
  image: string;
  imageAlt: string;
  category: string;
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

// 4 "From the Journal" editorial pieces
const JOURNAL_PIECES = [
  {
    kicker: 'New essay',
    title: 'On the Uses of Difficulty',
    author: 'Elena Marlowe',
    date: '12 November 2026',
    image: stockImage('essay'),
    imageAlt: 'Abstract architecture mood',
    category: 'Essay',
  },
  {
    kicker: 'Criticism',
    title: 'Rereading Woolf in a Time of Crisis',
    author: 'Samuel Crane',
    date: '10 November 2026',
    image: stockImage('review'),
    imageAlt: 'Stack of books',
    category: 'Reviews',
  },
  {
    kicker: 'Fiction',
    title: 'A Sentence That Begins With Loss',
    author: 'Ali Smith',
    date: '7 November 2026',
    image: stockImage('cover7'),
    imageAlt: 'Moody literary scene',
    category: 'Fiction',
  },
  {
    kicker: 'Poetry',
    title: 'Fourteen Ways of Looking at a Footnote',
    author: 'Anne Carson',
    date: '4 November 2026',
    image: stockImage('cover8'),
    imageAlt: 'Soft literary light',
    category: 'Poetry',
  },
];

// 2 "Now Playing" audio pieces
const AUDIO_PIECES = [
  {
    title: 'The Art of Slow Reading',
    subtitle: 'A conversation with Samuel Crane',
    duration: '42 min',
    date: '11 November 2026',
    episode: 'EP. 34',
    image: stockImage('audio'),
    imageAlt: 'Headphones on a desk',
  },
  {
    title: 'Grief and the Literary Imagination',
    subtitle: 'Mira Thorne in conversation',
    duration: '58 min',
    date: '5 November 2026',
    episode: 'EP. 33',
    image: stockImage('cover9'),
    imageAlt: 'Moody audio essay visual',
  },
];

export default function HomeClient({ featured, rest, products }: HomeClientProps) {
  // Split rest: first 3 go to "In This Issue", all 7 shown in Writing grid
  const inThisIssue = rest.slice(0, 3);
  const writingGrid = rest;

  return (
    <div className="page-wrap">
      {/* ===== HERO — full width bg, two-column editorial ===== */}
      <section className="section-full hero-bg">
              <Grainient colors={['#fdfbf5', '#efece3', '#c9a266']} speed={0.5} style={{ opacity: 0.3 }} />
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
                    <GlareHover width="100%" height="100%" variant="streak" blendMode="screen">
                      <ImageWithFallback
                        src={featured.image}
                        alt={featured.imageAlt}
                        className="w-full h-full object-cover"
                        fallbackKey="reading"
                        aspectRatio="16/9"
                      />
                    </GlareHover>
                    <div className="hero-overlay" />
                  </motion.div>
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
                                    <SplitFlapText
                                      words={['Pater Noster', 'Writing', 'Ideas', 'Books']}
                                      className="font-mono text-[0.7rem] tracking-widest uppercase"
                                      color="var(--color-accent)"
                                    />
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
                    data-cursor="view"
                  >
                    Read the essay →
                  </motion.a>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

      <hr className="hairline mb-8 md:mb-12" />

      {/* ===== MARQUEE TICKER ===== */}
      <section className="marquee">
        <div className="marquee-track">
          <div className="marquee-content">
            <span className="marquee-item">Pater Noster</span>
            <span className="marquee-divider"></span>
            <span className="marquee-item">Independent journal of writing and ideas</span>
            <span className="marquee-divider"></span>
            <span className="marquee-item">Essays · Reviews · Criticism</span>
            <span className="marquee-divider"></span>
            <span className="marquee-item">Books · Objects · Subscriptions</span>
            <span className="marquee-divider"></span>
            <span className="marquee-item">Pater Noster</span>
            <span className="marquee-divider"></span>
            <span className="marquee-item">Independent journal of writing and ideas</span>
            <span className="marquee-divider"></span>
            <span className="marquee-item">Essays · Reviews · Criticism</span>
            <span className="marquee-divider"></span>
            <span className="marquee-item">Books · Objects · Subscriptions</span>
          </div>
        </div>
      </section>

      <hr className="hairline mb-8 md:mb-12" />

      {/* ===== FROM THE JOURNAL — 2-column editorial grid ===== */}
      <section className="section-full" style={{ background: 'var(--paper)' }}>
        <div className="container section-padding-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-baseline justify-between mb-8"
          >
            <h2 className="section-title text-gradient" style={{ marginBottom: 0 }}>From the Journal</h2>
            <Link
              href="/blog"
              className="font-serif text-sm cta-link"
              style={{ color: 'var(--muted)' }}
            >
              View all →
            </Link>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {JOURNAL_PIECES.map((piece, idx) => (
              <motion.article
                key={piece.title}
                variants={itemVariants}
                transition={{ delay: idx * 0.1 }}
                className="flex gap-5 items-start"
                style={{ borderBottom: '1px solid var(--hairline)', paddingBottom: '1.75rem' }}
              >
                <div
                  className="flex-shrink-0 overflow-hidden rounded-sm"
                  style={{ width: 96, height: 96 }}
                >
                  <ImageWithFallback
                    src={piece.image}
                    alt={piece.imageAlt}
                    className="w-full h-full object-cover"
                    fallbackKey="library"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className="text-xs uppercase tracking-widest font-sans mb-1"
                    style={{ color: 'var(--accent)' }}
                  >
                    {piece.kicker}
                  </p>
                  <a
                    href="/blog"
                    className="block font-serif text-base leading-snug hover:text-accent transition-colors mb-1"
                    style={{ color: 'var(--ink)' }}
                    data-cursor="view"
                  >
                    {piece.title}
                  </a>
                  <p className="text-xs font-sans" style={{ color: 'var(--muted)' }}>
                    {piece.author} · {piece.date}
                  </p>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      <hr className="hairline mb-8 md:mb-12" />

      {/* ===== NOW PLAYING — audio essay cards ===== */}
      <section className="section-full" style={{ background: 'var(--paper-2, var(--paper))' }}>
        <div className="container section-padding-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-baseline justify-between mb-8"
          >
            <h2 className="section-title text-gradient" style={{ marginBottom: 0 }}>Now Playing</h2>
            <Link
              href="/audio"
              className="font-serif text-sm cta-link"
              style={{ color: 'var(--muted)' }}
            >
              All episodes →
            </Link>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {AUDIO_PIECES.map((ep, idx) => (
              <motion.div
                key={ep.title}
                variants={itemVariants}
                transition={{ delay: idx * 0.12 }}
                className="glass-card flex gap-5 items-center p-5 rounded"
                style={{
                  border: '1px solid var(--hairline)',
                  background: 'var(--paper)',
                }}
              >
                {/* Cover art */}
                <div
                  className="flex-shrink-0 overflow-hidden rounded"
                  style={{ width: 80, height: 80, position: 'relative' }}
                >
                  <ImageWithFallback
                    src={ep.image}
                    alt={ep.imageAlt}
                    className="w-full h-full object-cover"
                    fallbackKey="fallback"
                  />
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <p
                    className="text-xs uppercase tracking-widest font-sans mb-1"
                    style={{ color: 'var(--muted)' }}
                  >
                    {ep.episode} · {ep.date}
                  </p>
                  <p
                    className="font-serif text-base leading-snug mb-1"
                    style={{ color: 'var(--ink)' }}
                  >
                    {ep.title}
                  </p>
                  <p className="text-xs font-sans" style={{ color: 'var(--muted)' }}>
                    {ep.subtitle}
                  </p>
                </div>

                {/* Play button + duration */}
                <div className="flex-shrink-0 flex flex-col items-center gap-1">
                  <button
                    aria-label={`Play ${ep.title}`}
                    className="flex items-center justify-center rounded-full transition-opacity hover:opacity-70"
                    style={{
                      width: 42,
                      height: 42,
                      background: 'var(--ink)',
                      color: 'var(--paper)',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    {/* Play triangle */}
                    <svg width="14" height="16" viewBox="0 0 14 16" fill="currentColor">
                      <path d="M2 1.5l11 6.5-11 6.5V1.5z" />
                    </svg>
                  </button>
                  <span
                    className="text-xs font-sans tabular-nums"
                    style={{ color: 'var(--muted)' }}
                  >
                    {ep.duration}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
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
            className="section-title text-gradient"
          >
            <MaskedHeading text="In this issue" gradient={['var(--color-ink)', 'var(--color-accent)']} />
          </motion.h2>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="issue-list-wrap"
          >
            {inThisIssue.map((article, idx) => (
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
                    data-cursor="view"
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
            className="section-title text-gradient"
          >
            Writing
          </motion.h2>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid-12"
          >
            {writingGrid.map((article, idx) => {
              const isLarge = idx % 2 === 0;
              return (
                <motion.div
                  key={article.title}
                  variants={itemVariants}
                  style={{ gridColumn: `span ${isLarge ? 7 : 5}` }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <article className="article-card glass-card card-tilt">
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
                      {article.category || 'Editorial'}
                    </motion.p>
                    <motion.a
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + idx * 0.05, duration: 0.5 }}
                      href="/"
                      className="article-card-title"
                      data-cursor="view"
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
                    {article.excerpt && (
                      <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.45 + idx * 0.05, duration: 0.5 }}
                        className="text-sm font-sans leading-relaxed mt-2"
                        style={{ color: 'var(--muted)' }}
                      >
                        {article.excerpt.length > 140
                          ? article.excerpt.slice(0, 140) + '…'
                          : article.excerpt}
                      </motion.p>
                    )}
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
              <h2 className="section-title text-gradient">From the shop</h2>
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
      data-cursor="view"
    >
      <HoloCard
        image={images[0]?.url || stockImage('cover10')}
        alt={product.title}
        preset="gold"
        intensity={0.6}
        foilColor="#c9a266"
        className="w-full h-full"
        style={{ width: '100%', height: '320px', aspectRatio: '3/4' }}
      />
      <div className="flex flex-col flex-1 p-6 gap-3">
        <p className="article-card-category">Editorial</p>
        <motion.a
          href={`/products/${product.handle}`}
          className="article-card-title"
          whileHover={{ color: 'rgba(26,26,26,0.7)' }}
          data-cursor="view"
        >
          {product.title}
        </motion.a>
        <p className="article-card-price">
          £{price.toFixed(2)}
        </p>
      </div>
    </motion.a>
  );
}
