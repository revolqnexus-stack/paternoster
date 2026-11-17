'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { stockImage } from '@/lib/stock-images';
import ImageWithFallback from '@/components/ImageWithFallback';

/* ─── animation presets ─────────────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] as const } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

/* ─── data ───────────────────────────────────────────────────────────────── */
const FEATURED = {
  kicker: 'Featured Essay',
  title: 'The Silence of Henry James: Repression, Form, and the Unsaid',
  author: 'Julian Hale',
  date: '17 November 2026',
  excerpt:
    'What James withholds is as charged as what he renders. His late novels circle absence with the deliberateness of a surgeon who refuses to cut — the wound is everywhere implied, never shown. This essay reads that silence as a formal argument about consciousness itself.',
  image: stockImage('reading'),
  imageAlt: 'Open book in warm light',
  slug: '#',
};

const ARTICLES = [
  {
    title: 'Against Consolation: Grief, Psychoanalysis, and the Problem of Recovery',
    author: 'Elena Marlowe',
    date: '14 November 2026',
    excerpt:
      'Mourning, Freud insisted, is work. But what is the labour of grief supposed to produce? Phillips examines the therapeutic orthodoxy that grief must end.',
    image: stockImage('desk'),
    imageAlt: 'Writing desk with papers',
    category: 'Essays',
    slug: '#',
  },
  {
    title: 'Plath\'s Doubles: The Mirror Poems and the Question of Self',
    author: 'Mira Thorne',
    date: '10 November 2026',
    excerpt:
      'The mirror in Plath is never merely a surface. It is a site of encounter with an other who is also, impossibly, the self — a narcissism that devours its own reflection.',
    image: stockImage('typewriter'),
    imageAlt: 'Vintage typewriter',
    category: 'Criticism',
    slug: '#',
  },
  {
    title: 'Bolaño\'s Ghosts: Violence and Witness in 2666',
    author: 'Fiona Reid',
    date: '7 November 2026',
    excerpt:
      'The murders of Santa Teresa accumulate without resolution — Bolaño refusing the satisfactions of detection while insisting on a terrible fidelity to the fact of death.',
    image: stockImage('library'),
    imageAlt: 'Rows of library books',
    category: 'Reviews',
    slug: '#',
  },
  {
    title: 'The Novel After the Internet: What Form Can Still Do',
    author: 'Zadie Smith',
    date: '3 November 2026',
    excerpt:
      'Attention is now the scarcest resource. The novel\'s great formal problem is no longer plot but duration — how to persuade a reader that length is argument, not indulgence.',
    image: stockImage('notebook'),
    imageAlt: 'Open notebook on a table',
    category: 'Essays',
    slug: '#',
  },
  {
    title: 'Sebald\'s Photographs: Memory, Evidence, and the Staged Document',
    author: 'Arthur Bellweather',
    date: '29 October 2026',
    excerpt:
      'The blurry, slightly damaged photographs embedded in Sebald\'s prose are not illustrations. They function as hesitations — images that cannot quite confirm what the text almost remembers.',
    image: stockImage('pen'),
    imageAlt: 'Fountain pen on paper',
    category: 'Criticism',
    slug: '#',
  },
  {
    title: 'Thinking About Anger: On Aristotle, the Stoics, and Contemporary Rage',
    author: 'Martha C. Nussbaum',
    date: '23 October 2026',
    excerpt:
      'Anger, the ancients thought, requires an object, a wound, and a fantasy of payback. Contemporary political anger — diffuse, structural, often leaderless — fits that schema poorly.',
    image: stockImage('coffee'),
    imageAlt: 'Coffee cup beside an open book',
    category: 'Essays',
    slug: '#',
  },
  {
    title: 'Elizabeth Bishop and the Ethics of Seeing',
    author: 'Helen Vendler',
    date: '18 October 2026',
    excerpt:
      '"The art of losing isn\'t hard to master." Bishop\'s understatement is not stoicism — it is a formal discipline that refuses to convert grief into performance.',
    image: stockImage('bookshelf'),
    imageAlt: 'Bookshelf with coloured spines',
    category: 'Poetry',
    slug: '#',
  },
  {
    title: 'The Biographical Fallacy, Revisited',
    author: 'Colin Burrow',
    date: '11 October 2026',
    excerpt:
      'We read biography as though it explains the work. We rarely ask whether the work might instead explain — or refute — the life. Burrow argues for a more suspicious literary history.',
    image: stockImage('desk'),
    imageAlt: 'Desk lamp over handwritten pages',
    category: 'Reviews',
    slug: '#',
  },
];

/* ─── category pill ─────────────────────────────────────────────────────── */
function CategoryTag({ label }: { label: string }) {
  return (
    <span
      className="inline-block font-mono text-[10px] tracking-[0.18em] uppercase px-2 py-0.5 rounded-sm"
      style={{
        color: 'var(--accent)',
        background: 'var(--accent-glow)',
        border: '1px solid color-mix(in srgb, var(--accent) 25%, transparent)',
      }}
    >
      {label}
    </span>
  );
}

/* ─── article card ──────────────────────────────────────────────────────── */
function ArticleCard({ article }: { article: typeof ARTICLES[number] }) {
  return (
    <motion.article
      variants={fadeUp}
      className="group flex flex-col overflow-hidden rounded-sm"
      style={{ background: 'var(--paper)', border: '1px solid var(--hairline)' }}
    >
      {/* image */}
      <Link href={article.slug} className="block overflow-hidden aspect-[16/9] relative shrink-0">
        <ImageWithFallback
          src={article.image}
          alt={article.imageAlt}
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </Link>

      {/* body */}
      <div className="flex flex-col flex-1 p-6 gap-3">
        <CategoryTag label={article.category} />

        <Link href={article.slug}>
          <h3
            className="font-serif text-lg leading-snug hover:underline underline-offset-2"
            style={{ color: 'var(--ink)' }}
          >
            {article.title}
          </h3>
        </Link>

        <div className="flex items-center gap-2" style={{ color: 'var(--muted)' }}>
          <span className="font-serif-body text-sm">{article.author}</span>
          <span aria-hidden>·</span>
          <span className="font-mono text-xs">{article.date}</span>
        </div>

        <p className="font-serif-body text-sm leading-relaxed flex-1" style={{ color: 'var(--ink-soft)' }}>
          {article.excerpt}
        </p>

        <Link
          href={article.slug}
          className="font-mono text-xs tracking-widest uppercase mt-auto hover:underline underline-offset-2"
          style={{ color: 'var(--accent)' }}
        >
          Read →
        </Link>
      </div>
    </motion.article>
  );
}

/* ─── main component ────────────────────────────────────────────────────── */
export default function BlogClient() {
  return (
    <div className="page-wrap" style={{ background: 'var(--paper)' }}>

      {/* ═══ HERO BAND ══════════════════════════════════════════════════════ */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="section-full relative overflow-hidden"
        style={{ background: 'var(--ink-black)' }}
      >
        {/* subtle paper texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `repeating-linear-gradient(
              0deg, transparent, transparent 1px,
              rgba(253,251,245,0.6) 1px, rgba(253,251,245,0.6) 2px
            )`,
          }}
          aria-hidden
        />

        <div className="container section-padding-lg relative z-10 flex flex-col items-start gap-6 py-24 md:py-36">
          {/* eyebrow rule */}
          <div className="flex items-center gap-4">
            <div className="h-px w-12" style={{ background: 'var(--accent)' }} />
            <span className="font-mono text-xs tracking-[0.22em] uppercase" style={{ color: 'var(--accent)' }}>
              Pater Noster
            </span>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
            className="font-serif leading-none"
            style={{
              fontSize: 'clamp(3.5rem, 10vw, 7rem)',
              color: 'var(--paper)',
              letterSpacing: '-0.02em',
            }}
          >
            Journal
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.38, ease: [0.76, 0, 0.24, 1] }}
            className="font-serif-body text-lg md:text-xl leading-relaxed max-w-lg"
            style={{ color: 'var(--muted-on-black)' }}
          >
            Essays, reviews, and criticism — written at length.
          </motion.p>
        </div>
      </motion.section>

      {/* ═══ FEATURED ESSAY ═════════════════════════════════════════════════ */}
      <section className="container section-padding-lg">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
          className="grid md:grid-cols-2 gap-0 overflow-hidden rounded-sm"
          style={{ border: '1px solid var(--hairline)' }}
        >
          {/* left — image */}
          <div className="relative min-h-[340px] md:min-h-[480px] overflow-hidden">
            <ImageWithFallback
              src={FEATURED.image}
              alt={FEATURED.imageAlt}
              className="object-cover"
            />
            {/* gradient overlay on right edge for desktop */}
            <div
              className="absolute inset-y-0 right-0 w-24 hidden md:block"
              style={{ background: 'linear-gradient(to right, transparent, var(--paper-2))' }}
              aria-hidden
            />
          </div>

          {/* right — editorial copy */}
          <div
            className="flex flex-col justify-center gap-5 p-8 md:p-12"
            style={{ background: 'var(--paper-2)' }}
          >
            <div className="flex items-center gap-3">
              <div className="h-px w-8" style={{ background: 'var(--accent)' }} />
              <span className="font-mono text-xs tracking-[0.2em] uppercase" style={{ color: 'var(--accent)' }}>
                {FEATURED.kicker}
              </span>
            </div>

            <h2
              className="font-serif leading-tight"
              style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', color: 'var(--ink)' }}
            >
              {FEATURED.title}
            </h2>

            <div className="flex items-center gap-2" style={{ color: 'var(--muted)' }}>
              <span className="font-serif-body text-sm font-semibold">{FEATURED.author}</span>
              <span aria-hidden>·</span>
              <span className="font-mono text-xs">{FEATURED.date}</span>
            </div>

            <p
              className="font-serif-body text-base leading-relaxed"
              style={{ color: 'var(--ink-soft)', maxWidth: '52ch' }}
            >
              {FEATURED.excerpt}
            </p>

            <div className="pt-2">
              <Link
                href={FEATURED.slug}
                className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase px-6 py-3 transition-colors"
                style={{
                  background: 'var(--ink)',
                  color: 'var(--paper)',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLAnchorElement).style.background = 'var(--accent)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLAnchorElement).style.background = 'var(--ink)';
                }}
              >
                Read Essay →
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ═══ SECTION DIVIDER ════════════════════════════════════════════════ */}
      <div className="container">
        <div className="flex items-center gap-6 py-2">
          <div className="h-px flex-1" style={{ background: 'var(--hairline)' }} />
          <span className="font-mono text-[11px] tracking-[0.2em] uppercase" style={{ color: 'var(--muted)' }}>
            All Essays
          </span>
          <div className="h-px flex-1" style={{ background: 'var(--hairline)' }} />
        </div>
      </div>

      {/* ═══ ESSAYS GRID ════════════════════════════════════════════════════ */}
      <section className="container section-padding-lg">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={stagger}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {ARTICLES.map((article) => (
            <ArticleCard key={article.title} article={article} />
          ))}
        </motion.div>

        {/* Load more — editorial placeholder */}
        <div className="flex justify-center mt-16">
          <button
            type="button"
            className="font-mono text-xs tracking-widest uppercase px-8 py-3 transition-colors"
            style={{
              border: '1px solid var(--hairline)',
              color: 'var(--muted)',
              background: 'transparent',
            }}
          >
            Load More Essays
          </button>
        </div>
      </section>

      {/* ═══ MASTHEAD / SUBSCRIBE STRIP ═════════════════════════════════════ */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{ background: 'var(--paper-2)', borderTop: '1px solid var(--hairline)', borderBottom: '1px solid var(--hairline)' }}
      >
        <div className="container py-14 md:py-20 flex flex-col md:flex-row items-center justify-between gap-10">
          {/* copy */}
          <div className="flex flex-col gap-3 text-center md:text-left">
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <div className="h-px w-8" style={{ background: 'var(--accent)' }} />
              <span className="font-mono text-[10px] tracking-[0.22em] uppercase" style={{ color: 'var(--accent)' }}>
                Subscribe
              </span>
            </div>
            <h2
              className="font-serif leading-tight"
              style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)', color: 'var(--ink)' }}
            >
              Subscribe to Pater Noster
            </h2>
            <p className="font-serif-body text-sm" style={{ color: 'var(--muted)', maxWidth: '40ch' }}>
              Weekly essays delivered to your inbox. No noise, no algorithm — just slow reading.
            </p>
          </div>

          {/* email form */}
          <form
            onSubmit={e => e.preventDefault()}
            className="flex gap-0 w-full md:w-auto max-w-sm"
            aria-label="Newsletter sign-up"
          >
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 font-serif-body text-sm px-4 py-3 outline-none"
              style={{
                background: 'var(--paper)',
                border: '1px solid var(--hairline)',
                borderRight: 'none',
                color: 'var(--ink)',
              }}
              aria-label="Email address"
            />
            <button
              type="submit"
              className="font-mono text-[11px] tracking-widest uppercase px-5 py-3 shrink-0 transition-colors"
              style={{
                background: 'var(--ink)',
                color: 'var(--paper)',
                border: '1px solid var(--ink)',
              }}
            >
              Subscribe
            </button>
          </form>
        </div>
      </motion.section>
    </div>
  );
}
