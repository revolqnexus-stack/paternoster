'use client';

import Link from 'next/link';
import ImageWithFallback from '@/components/ImageWithFallback';
import { stockImage } from '@/lib/stock-images';
import { motion } from 'framer-motion';
import SplitFlapText from '@/components/SplitFlapText';
import Grainient from '@/components/Grainient';
import FloatingLines from '@/components/FloatingLines';
import LiquidEther from '@/components/LiquidEther';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import GlareHover from '@/components/GlareHover';
import MaskedHeading from '@/components/MaskedHeading';
import HoloCard from '@/components/HoloCard';
import DitherVeil from '@/components/DitherVeil';
import { useCartStore } from '@/lib/store';

interface Article {
  title: string;
  author: string;
  date: string | null;
  excerpt: string;
  image: string;
  imageAlt: string;
  category: string;
  relatedProduct?: string;
}

interface Product {
  id: string;
  handle: string;
  title: string;
  priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
  images: { edges: Array<{ node: { url: string; altText: string } }> };
}

interface HomeClientProps {
  featured: Article;
  rest: Article[];
  products: Product[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { y: 12, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
};

/* ── Optional-image card ────────────────────────────────────── */

function CardImage({ src, alt, aspectRatio }: { src?: string; alt?: string; aspectRatio?: string }) {
  if (!src) return null;
  return (
    <div className="relative overflow-hidden rounded-sm mb-4" style={{ aspectRatio }}>
      <ImageWithFallback
        src={src}
        alt={alt || ''}
        className="w-full h-full object-cover"
        fallbackKey="fallback"
      />
    </div>
  );
}

/* ── Editorial card (essay / review / blog) ─────────────────── */

function EditorialCard({ article, asLink }: { article: Article; asLink?: boolean }) {
  return (
    <article
      className="card-tilt rounded-sm overflow-hidden"
      style={{
        border: '1px solid var(--hairline)',
        background: 'var(--paper)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <CardImage src={article.image} alt={article.imageAlt} aspectRatio="4/5" />
      <div className="p-5">
        <span
          className="text-[0.65rem] uppercase tracking-widest font-mono mb-2 block"
          style={{ color: 'var(--color-accent)', letterSpacing: '0.1em' }}
        >
          {article.category}
        </span>
        <p className="text-xs font-serif mb-1" style={{ color: 'var(--ink)' }}>
          {article.title}
        </p>
        <p className="text-xs font-serif italic mb-2" style={{ color: 'var(--muted)' }}>
          By {article.author}
        </p>
        {article.date && (
          <p className="text-[0.7rem] font-mono mb-3" style={{ color: 'var(--muted)' }}>
            {article.date}
          </p>
        )}
        {article.excerpt && (
          <p className="text-sm font-serif leading-relaxed mb-4" style={{ color: 'var(--ink-soft)' }}>
            {article.excerpt}
          </p>
        )}
        {article.relatedProduct ? (
          <Link
            href={`/products/${article.relatedProduct}`}
            className="text-xs font-mono uppercase tracking-wider flex items-center gap-1"
            style={{ color: 'var(--color-accent)' }}
          >
            Buy the book →
          </Link>
        ) : (
          <Link
            href="/"
            className="text-xs font-mono uppercase tracking-wider flex items-center gap-1"
            style={{ color: 'var(--color-accent)' }}
          >
            Read →
          </Link>
        )}
      </div>
    </article>
  );
}

/* ── Audio card ─────────────────────────────────────────────── */

interface AudioCardProps {
  title: string;
  subtitle: string;
  duration: string;
  episode: string;
  date: string;
  image: string;
  imageAlt: string;
}

function AudioCard({ title, subtitle, duration, episode, date, image, imageAlt }: AudioCardProps) {
  return (
    <article
      className="card-tilt rounded-sm overflow-hidden"
      style={{
        border: '1px solid var(--hairline)',
        background: 'var(--paper)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <CardImage src={image} alt={imageAlt} aspectRatio="1/1" />
      <div className="p-5">
        <p className="text-[0.7rem] uppercase tracking-widest font-mono mb-1" style={{ color: 'var(--muted)' }}>
          {episode} · {date}
        </p>
        <p className="text-xs font-serif mb-1" style={{ color: 'var(--ink)' }}>
          {title}
        </p>
        <p className="text-xs font-serif italic mb-3" style={{ color: 'var(--muted)' }}>
          {subtitle}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono tabular-nums" style={{ color: 'var(--muted)' }}>
            {duration}
          </span>
          <button
            aria-label={`Play ${title}`}
            className="flex items-center justify-center rounded-full"
            style={{
              width: 32,
              height: 32,
              background: 'var(--ink)',
              color: 'var(--paper)',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            <svg width="10" height="12" viewBox="0 0 10 12" fill="currentColor">
              <path d="M1.5 1l7 5-7 5V1z" />
            </svg>
          </button>
        </div>
      </div>
    </article>
  );
}

/* ── Shop product card ──────────────────────────────────────── */

interface ShopCardProps {
  product: Product;
  className?: string;
}

function ShopCard({ product, className }: ShopCardProps) {
  const images = product.images?.edges?.map((e: any) => e.node) || [];
  const price = parseFloat(product.priceRange.minVariantPrice.amount);
  const addToCartStore = useCartStore();

  return (
    <article
      className={`card-tilt rounded-sm overflow-hidden ${className || ''}`}
      style={{
        border: '1px solid var(--hairline)',
        background: 'var(--paper)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <CardImage src={images[0]?.url} alt={images[0]?.altText || product.title} aspectRatio="4/5" />
      <div className="p-4">
        <p className="text-[0.65rem] uppercase tracking-widest font-mono mb-1" style={{ color: 'var(--muted)' }}>
          From the shop
        </p>
        <p className="text-xs font-serif mb-1" style={{ color: 'var(--ink)' }}>
          {product.title}
        </p>
        <p className="text-xs font-mono mb-3" style={{ color: 'var(--muted)' }}>
          £{price.toFixed(2)}
        </p>
        <button
          onClick={() => addToCartStore.addToCart('', 1)}
          disabled={addToCartStore.isLoading}
          className="w-full text-center text-[0.7rem] uppercase tracking-widest font-mono py-2 mb-2"
          style={{
            background: 'var(--ink)',
            color: 'var(--paper)',
            border: '1px solid var(--ink)',
            cursor: addToCartStore.isLoading ? 'not-allowed' : 'pointer',
            opacity: addToCartStore.isLoading ? 0.5 : 1,
          }}
        >
          Add to cart
        </button>
        <Link
          href={`/products/${product.handle}`}
          className="text-[0.7rem] font-mono uppercase tracking-wider text-center block"
          style={{ color: 'var(--color-accent)' }}
        >
          View →
        </Link>
      </div>
    </article>
  );
}

/* ── Home client ────────────────────────────────────────────── */

export default function HomeClient({ featured, rest, products }: HomeClientProps) {
  const inThisIssue = rest.slice(0, 3);
  const latestWriting = rest.slice(3);

  const AUDIO_PIECES = [
    {
      title: 'The Art of Slow Reading',
      subtitle: 'A conversation with Samuel Crane',
      duration: '42 min',
      episode: 'EP. 34',
      date: '11 November 2026',
      image: stockImage('mood2'),
      imageAlt: 'Abstract editorial mood',
    },
    {
      title: 'Grief and the Literary Imagination',
      subtitle: 'Mira Thorne in conversation',
      duration: '58 min',
      episode: 'EP. 33',
      date: '5 November 2026',
      image: stockImage('cover9'),
      imageAlt: 'Moody audio essay visual',
    },
  ];

  const shopItems = products.slice(0, 4);

  const { register, handleSubmit, formState: { errors } } = useForm<{ email: string }>();

  const onSubmit = (data: { email: string }) => {
    toast.success(`Subscribed ${data.email}`);
  };

  return (
    <div className="page-wrap">
      {/* ===== FEATURED PIECE — hero ===== */}
      <section className="section-full hero-bg overflow-hidden">
        <Grainient colors={['#fdfbf5', '#efece3', '#c9a266']} speed={0.5} style={{ opacity: 0.3 }} />
        <FloatingLines linesGradient={['#c9a266', '#efece3', '#fdfbf5']} lineCount={6} lineDistance={40} />
        <LiquidEther colors={['#c9a266', '#efece3']} intensity={0.4} mouseForce={0.5} />
        <div className="container section-padding-lg">
          <div className="hero-content-wrap gap-6 md:gap-12">
            <div className="hero-image-col">
              <div className="hero-image-wrap">
                <GlareHover width="100%" height="100%" variant="streak" blendMode="screen">
                  <CardImage src={featured.image} alt={featured.imageAlt} aspectRatio="4/5" />
                </GlareHover>
              </div>
            </div>
            <div className="hero-text-col">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="hero-content"
              >
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.4 }}
                  className="hero-kicker"
                >
                  <SplitFlapText
                    words={['Pater Noster', 'Writing', 'Ideas', 'Books']}
                    className="split-flap-text font-mono tracking-widest uppercase"
                    color="var(--color-accent)"
                  />
                </motion.p>
                <motion.h1
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="hero-title"
                >
                  {featured.title}
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                  className="hero-byline"
                >
                  By {featured.author}
                </motion.p>
                {featured.date && (
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35, duration: 0.4 }}
                    className="text-xs font-mono mb-4"
                    style={{ color: 'var(--muted)' }}
                  >
                    {featured.date}
                  </motion.p>
                )}
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="hero-excerpt"
                >
                  {featured.excerpt}
                </motion.p>
                {featured.relatedProduct ? (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.4 }}
                  >
                    <Link
                      href={`/products/${featured.relatedProduct}`}
                      className="text-xs font-mono uppercase tracking-wider inline-block mb-6"
                      style={{ color: 'var(--color-accent)' }}
                      data-cursor="view"
                    >
                      Buy the book →
                    </Link>
                  </motion.div>
                ) : (
                  <motion.a
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.4 }}
                    href="/"
                    className="text-ink underline underline-offset-2 hover:text-accent transition-colors font-serif inline-block mb-6"
                    data-cursor="view"
                  >
                    Read the essay →
                  </motion.a>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <hr className="hairline mb-8 md:mb-12" />

      {/* ===== CURRENT ISSUE — numbered contents list ===== */}
      <section className="section-full" style={{ background: 'var(--paper)' }}>
        <div className="container section-padding-md">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-baseline justify-between mb-6"
          >
            <h2 className="section-title">Current issue</h2>
          </motion.div>
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
                transition={{ delay: idx * 0.05 }}
                className="issue-list"
              >
                <div className="issue-number">
                  0{idx + 1}
                </div>
                <div className="issue-info">
                  <motion.p
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + idx * 0.03, duration: 0.4 }}
                    className="issue-author"
                  >
                    {article.author}
                  </motion.p>
                  <motion.a
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + idx * 0.03, duration: 0.4 }}
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

      {/* ===== LATEST WRITING — editorial cards with images ===== */}
      <section className="section-full" style={{ background: 'var(--paper-2, var(--paper))' }}>
        <div className="container section-padding-md">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-baseline justify-between mb-6"
          >
            <h2 className="section-title">Latest writing</h2>
          </motion.div>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {latestWriting.map((article, idx) => (
              <motion.div
                key={article.title}
                variants={itemVariants}
                transition={{ delay: idx * 0.06 }}
              >
                <EditorialCard article={article} asLink />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <hr className="hairline mb-8 md:mb-12" />

      {/* ===== AUDIO · VIDEO ===== */}
      <section className="section-full" style={{ background: 'var(--paper)' }}>
        <div className="container section-padding-md">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-baseline justify-between mb-6"
          >
            <h2 className="section-title">Audio · Video</h2>
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
                transition={{ delay: idx * 0.06 }}
              >
                <AudioCard {...ep} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <hr className="hairline mb-8 md:mb-12" />

      {/* ===== FROM THE SHOP — quiet carousel strip ===== */}
      {shopItems.length > 0 && (
        <section className="section-full border-t border-hairline pt-16 pb-24">
          <DitherVeil pattern="noise" pixelSize={4} levels={4} style={{ opacity: 0.3 }} />
          <div className="container section-padding-md">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-baseline justify-between mb-6"
            >
              <h2 className="section-title">From the shop</h2>
            </motion.div>
            <Swiper
              slidesPerView={1}
              spaceBetween={24}
              centeredSlides
              loop
              pagination={{ clickable: true }}
              navigation={{ enabled: true }}
              breakpoints={{
                640: { slidesPerView: 2, centeredSlides: false },
                1024: { slidesPerView: 3, centeredSlides: false },
              }}
              className="my-swiper"
            >
              {shopItems.map((product, idx) => (
                <SwiperSlide key={product.id}>
                  <motion.div
                    key={product.id}
                    variants={itemVariants}
                    transition={{ delay: idx * 0.06 }}
                    className="flex flex-col items-center"
                  >
                    <ShopCard product={product} className="w-full max-w-xs" />
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>
      )}

      {/* ===== NEWSLETTER ===== */}
      <section className="section-full border-t border-hairline pt-16 pb-24">
        <div className="container section-padding-md">
          <div
            className="flex flex-col items-center gap-4 text-center"
            style={{ maxWidth: '42ch', margin: '0 auto' }}
          >
            <h2 className="section-title" style={{ textAlign: 'center', marginBottom: 0 }}>
              Subscribe
            </h2>
            <p className="text-sm font-serif leading-relaxed" style={{ color: 'var(--muted)' }}>
              Occasional letters from Pater Noster. New essays, reviews, and what’s in the shop.
            </p>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col sm:flex-row gap-2 w-full"
              style={{ maxWidth: '320px' }}
            >
              <input
                {...register('email', { required: 'Email is required', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email' } })}
                type="email"
                placeholder="you@example.com"
                className="flex-1 border border-hairline bg-transparent px-4 py-2 text-sm font-serif focus:outline-none focus:border-accent"
              />
              {errors.email && (
                <span className="text-xs text-red-500 font-mono" style={{ alignSelf: 'flex-start' }}>
                  {errors.email.message}
                </span>
              )}
              <button
                type="submit"
                className="px-6 py-2 text-[0.7rem] uppercase tracking-widest font-mono"
                style={{
                  background: 'var(--ink)',
                  color: 'var(--paper)',
                  border: '1px solid var(--ink)',
                  cursor: 'pointer',
                }}
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
