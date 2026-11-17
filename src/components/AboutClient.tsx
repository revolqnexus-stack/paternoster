'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { stockImage } from '@/lib/stock-images';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.76, 0, 0.24, 1] as const },
});

const TEAM = [
  {
    name: 'Margaret Ashworth',
    role: 'Founding Editor',
    initials: 'MA',
    bio: 'Margaret has led Pater Noster since its founding in 2014, shaping its distinctive voice at the intersection of literary criticism and contemporary thought.',
  },
  {
    name: 'Thomas Lin',
    role: 'Reviews & Criticism',
    initials: 'TL',
    bio: "Thomas commissions and edits the journal's reviews section, drawing on two decades of experience as a literary critic and former Books Editor at the TLS.",
  },
  {
    name: 'Priya Nair',
    role: 'Design & Visual',
    initials: 'PN',
    bio: "Priya oversees the visual identity of the journal, bringing a typographer's rigour and a painter's eye to every page and digital surface.",
  },
];

const STATS = [
  { figure: '10+', label: 'Years in Print' },
  { figure: '2,400', label: 'Essays Published' },
  { figure: '480', label: 'Contributors' },
  { figure: '62', label: 'Countries Reached' },
];

export default function AboutClient() {
  return (
    <div className="page-wrap">
      {/* ── Hero ── */}
      <motion.div
        {...fadeUp()}
        className="relative w-full overflow-hidden"
        style={{ height: '480px' }}
      >
        <img
          src={stockImage('library')}
          alt="Library interior"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Dark overlay */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, rgba(11,11,11,0.55) 0%, rgba(11,11,11,0.75) 100%)' }}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <motion.p
            {...fadeUp(0.1)}
            className="label mb-4"
            style={{ color: 'rgba(245,241,235,0.65)' }}
          >
            Est. 2014
          </motion.p>
          <motion.h1
            {...fadeUp(0.2)}
            className="font-serif text-5xl md:text-6xl font-semibold tracking-tight"
            style={{ color: 'var(--paper)' }}
          >
            About Pater Noster
          </motion.h1>
          <motion.p
            {...fadeUp(0.3)}
            className="mt-4 font-serif-body text-lg max-w-xl leading-relaxed"
            style={{ color: 'rgba(245,241,235,0.75)' }}
          >
            An independent journal of writing and ideas — published since 2014.
          </motion.p>
        </div>
      </motion.div>

      <div className="page-container">
        {/* ── Mission ── */}
        <motion.section
          {...fadeUp(0.1)}
          className="mt-20 mb-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-start"
        >
          {/* Pull-quote */}
          <div className="flex items-start">
            <blockquote
              className="font-serif text-2xl md:text-3xl italic leading-snug"
              style={{ color: 'var(--ink)', borderLeft: '3px solid var(--accent)', paddingLeft: '1.5rem' }}
            >
              "We believe in slow reading, in difficult books, in writing that takes its time."
            </blockquote>
          </div>

          {/* Editorial paragraphs */}
          <div className="space-y-5 font-serif-body text-base leading-relaxed" style={{ color: 'var(--ink)' }}>
            <p>
              Pater Noster was founded in 2014 as a home for long-form literary criticism at a moment when the form
              itself seemed under threat. We publish essays, reviews, and criticism — work that demands patience from
              both writer and reader, that argues for the value of time spent with a difficult text.
            </p>
            <p>
              Our editorial philosophy is simple: we commission writers who have something at stake. Every piece in
              our pages is the result of a genuine encounter — with a book, an idea, an argument that will not let go.
              We do not publish summaries. We publish thinking.
            </p>
            <p>
              Pater Noster is published in association with the{' '}
              <Link
                href="https://www.lrb.co.uk/"
                className="underline underline-offset-2 hover:opacity-70 transition-opacity"
                target="_blank"
                rel="noopener noreferrer"
              >
                London Review of Books
              </Link>
              , drawing on its archive of over four decades of critical writing while maintaining a distinct editorial
              identity and a commitment to publishing new voices alongside established critics.
            </p>
          </div>
        </motion.section>

        <hr style={{ borderColor: 'var(--hairline)' }} className="mb-20" />

        {/* ── Team ── */}
        <motion.section {...fadeUp(0.15)} className="mb-20">
          <p className="label mb-2" style={{ color: 'var(--muted)' }}>The Editors</p>
          <h2 className="font-serif text-3xl font-semibold mb-10" style={{ color: 'var(--ink)' }}>
            Who We Are
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TEAM.map((person, i) => (
              <motion.div
                key={person.name}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.2 + i * 0.1, ease: [0.76, 0, 0.24, 1] }}
                className="flex flex-col items-center text-center"
              >
                {/* Circular avatar */}
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center mb-4 font-serif text-xl font-semibold"
                  style={{ background: 'var(--paper-2)', color: 'var(--ink)' }}
                >
                  {person.initials}
                </div>
                <h3 className="font-serif text-lg font-semibold mb-0.5" style={{ color: 'var(--ink)' }}>
                  {person.name}
                </h3>
                <p className="label mb-3" style={{ color: 'var(--muted)' }}>{person.role}</p>
                <p className="font-serif-body text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
                  {person.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <hr style={{ borderColor: 'var(--hairline)' }} className="mb-20" />
      </div>

      {/* ── Stats strip ── */}
      <motion.section
        {...fadeUp(0.2)}
        className="w-full py-16"
        style={{ background: 'var(--ink-black)' }}
      >
        <div className="page-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25 + i * 0.08 }}
              >
                <p className="font-serif text-4xl md:text-5xl font-semibold mb-2" style={{ color: 'var(--paper)' }}>
                  {s.figure}
                </p>
                <p className="label" style={{ color: 'rgba(245,241,235,0.5)' }}>{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <div className="page-container">
        {/* ── Subscribe ── */}
        <motion.section
          {...fadeUp(0.25)}
          className="my-24 text-center max-w-xl mx-auto"
        >
          <p className="label mb-3" style={{ color: 'var(--muted)' }}>Newsletter</p>
          <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-4" style={{ color: 'var(--ink)' }}>
            Join 24,000 readers
          </h2>
          <p className="font-serif-body text-base leading-relaxed mb-8" style={{ color: 'var(--muted)' }}>
            Receive new essays, reviews, and reading recommendations directly in your inbox — once a fortnight,
            without advertising.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-3 font-serif-body text-sm border outline-none focus:ring-1"
              style={{
                background: 'var(--paper)',
                color: 'var(--ink)',
                borderColor: 'var(--hairline)',
                maxWidth: '320px',
              }}
            />
            <button
              type="submit"
              className="px-6 py-3 font-serif text-sm font-semibold tracking-wide transition-opacity hover:opacity-80"
              style={{ background: 'var(--ink)', color: 'var(--paper)' }}
            >
              Subscribe
            </button>
          </form>
          <p className="mt-4 font-serif-body text-xs" style={{ color: 'var(--muted)' }}>
            Free to join. Unsubscribe at any time.
          </p>
        </motion.section>

        {/* ── Visit the Magazine ── */}
        <div className="mb-16 text-center">
          <hr style={{ borderColor: 'var(--hairline)' }} className="mb-10" />
          <p className="font-serif-body text-sm mb-2" style={{ color: 'var(--muted)' }}>
            Discover the latest issue, subscribe, and explore the archive at{' '}
            <Link
              href="https://www.lrb.co.uk/"
              className="underline underline-offset-2 hover:opacity-70 transition-opacity"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--ink)' }}
            >
              lrb.co.uk
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
