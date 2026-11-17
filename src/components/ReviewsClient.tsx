'use client';

import { motion } from 'framer-motion';
import { stockImage } from '@/lib/stock-images';

const GENRES = ['All', 'Fiction', 'Non-Fiction', 'Poetry', 'Politics', 'History', 'Science'];

interface Review {
  id: number;
  bookTitle: string;
  bookAuthor: string;
  reviewer: string;
  date: string;
  excerpt: string;
  rating: number;
  genre: string;
  image: string;
  imageAlt: string;
}

const REVIEWS: Review[] = [
  {
    id: 1,
    bookTitle: 'The Passenger',
    bookAuthor: 'Cormac McCarthy',
    reviewer: 'James Wood',
    date: '14 November 2026',
    excerpt:
      'McCarthy\'s long-awaited return to fiction is a haunted, magnificent wreck of a novel — a meditation on guilt, physics, and the impossibility of forgetting. It falls short of Blood Meridian\'s ferocity, but its ambitions are grander and stranger.',
    rating: 4,
    genre: 'Fiction',
    image: stockImage('reading'),
    imageAlt: 'Open book in low light',
  },
  {
    id: 2,
    bookTitle: 'The Wager: A Tale of Shipwreck, Mutiny and Murder',
    bookAuthor: 'David Grann',
    reviewer: 'Mary Beard',
    date: '7 November 2026',
    excerpt:
      'Grann\'s account of the 1741 shipwreck reads like Conrad rewritten by a historian, and that is precisely its achievement. The moral architecture of empire — its paperwork, its pardons, its silences — has rarely been laid so bare.',
    rating: 5,
    genre: 'History',
    image: stockImage('library'),
    imageAlt: 'Rows of library shelves',
  },
  {
    id: 3,
    bookTitle: 'Prophet Song',
    bookAuthor: 'Paul Lynch',
    reviewer: 'Jacqueline Rose',
    date: '1 November 2026',
    excerpt:
      'Lynch\'s Booker-winning novel arrives in a prose so pressurised it verges on apocalyptic scripture. Its subject — the collapse of Irish liberal democracy — has the chill of prophecy about it in this particular political moment.',
    rating: 5,
    genre: 'Fiction',
    image: stockImage('desk'),
    imageAlt: 'Writing desk with papers',
  },
  {
    id: 4,
    bookTitle: 'On Grief and Grieving',
    bookAuthor: 'Elisabeth Kübler-Ross & David Kessler',
    reviewer: 'Adam Phillips',
    date: '25 October 2026',
    excerpt:
      'The five stages of grief have become cultural furniture so familiar we forget they were always a heuristic, never a map. This reissue gives us the chance to read the original argument on its own strange, careful terms.',
    rating: 4,
    genre: 'Non-Fiction',
    image: stockImage('notebook'),
    imageAlt: 'Open notebook',
  },
  {
    id: 5,
    bookTitle: 'The Complete Poems',
    bookAuthor: 'Anne Carson',
    reviewer: 'Terry Castle',
    date: '18 October 2026',
    excerpt:
      'Carson remains the most formally restless poet writing in English, and this gathering of her work makes the restlessness visible as a coherent argument. Each book is a fresh formal wager, and she wins almost all of them.',
    rating: 5,
    genre: 'Poetry',
    image: stockImage('typewriter'),
    imageAlt: 'Typewriter keys',
  },
  {
    id: 6,
    bookTitle: 'The Jakarta Method',
    bookAuthor: 'Vincent Bevins',
    reviewer: 'Perry Anderson',
    date: '10 October 2026',
    excerpt:
      'Bevins reconstructs the US-backed anti-communist massacres of 1965–66 as a template for Cold War violence exported across the globe. The result is a work of serious revisionist history written with the urgency of journalism.',
    rating: 5,
    genre: 'Politics',
    image: stockImage('bookshelf'),
    imageAlt: 'Dense bookshelf',
  },
  {
    id: 7,
    bookTitle: 'Being Mortal',
    bookAuthor: 'Atul Gawande',
    reviewer: 'Hilary Mantel',
    date: '2 October 2026',
    excerpt:
      'Gawande\'s calm, devastating account of how modern medicine fails the dying reads as a moral indictment dressed as reportage. It changed the conversation about end-of-life care, and shows no signs of losing its force.',
    rating: 4,
    genre: 'Science',
    image: stockImage('coffee'),
    imageAlt: 'Cup of coffee on a book',
  },
  {
    id: 8,
    bookTitle: 'Jerusalem: The Biography',
    bookAuthor: 'Simon Sebag Montefiore',
    reviewer: 'Tom Holland',
    date: '24 September 2026',
    excerpt:
      'Montefiore\'s epic history of the most contested city on earth is a masterclass in popular historiography — densely sourced yet entirely readable, and newly urgent in the present moment.',
    rating: 4,
    genre: 'History',
    image: stockImage('pen'),
    imageAlt: 'Pen on manuscript',
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <span className="flex gap-0.5" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          style={{ color: i < count ? 'var(--accent)' : 'var(--hairline)' }}
          className="text-sm leading-none"
        >
          ★
        </span>
      ))}
    </span>
  );
}

function ReviewCard({ review, index }: { review: Review; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      className="flex flex-col overflow-hidden rounded-sm"
      style={{ background: 'var(--paper-2)', border: '1px solid var(--hairline)' }}
    >
      {/* Cover image */}
      <div className="relative overflow-hidden" style={{ height: '220px' }}>
        <img
          src={review.image}
          alt={review.imageAlt}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
        />
        {/* Genre tag overlay */}
        <span
          className="absolute top-3 left-3 text-[10px] font-mono uppercase tracking-widest px-2 py-1"
          style={{ background: 'var(--accent)', color: 'var(--paper)' }}
        >
          {review.genre}
        </span>
      </div>

      {/* Card body */}
      <div className="flex flex-col flex-1 p-6 gap-3">
        <StarRating count={review.rating} />

        <div>
          <h3
            className="text-lg font-bold italic leading-snug mb-1"
            style={{ fontFamily: 'var(--font-serif)', color: 'var(--ink)' }}
          >
            {review.bookTitle}
          </h3>
          <p
            className="text-sm"
            style={{ fontFamily: 'var(--font-serif-body)', color: 'var(--ink-soft)' }}
          >
            {review.bookAuthor}
          </p>
        </div>

        <p
          className="text-sm leading-relaxed flex-1"
          style={{ fontFamily: 'var(--font-serif-body)', color: 'var(--muted)' }}
        >
          {review.excerpt}
        </p>

        <div className="flex items-center justify-between pt-3" style={{ borderTop: '1px solid var(--hairline)' }}>
          <div>
            <p
              className="text-[10px] uppercase tracking-widest"
              style={{ fontFamily: 'var(--font-mono)', color: 'var(--muted)' }}
            >
              Reviewed by {review.reviewer}
            </p>
            <p
              className="text-[11px] mt-0.5"
              style={{ fontFamily: 'var(--font-utility)', color: 'var(--muted-soft)' }}
            >
              {review.date}
            </p>
          </div>
          <a
            href="#"
            className="text-xs tracking-wide transition-colors duration-200 hover:opacity-70"
            style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent)' }}
          >
            Read Review →
          </a>
        </div>
      </div>
    </motion.article>
  );
}

export default function ReviewsClient() {
  return (
    <main style={{ background: 'var(--paper)', minHeight: '100vh' }}>
      {/* Page header */}
      <section
        className="pt-24 pb-12"
        style={{ borderBottom: '1px solid var(--hairline)' }}
      >
        <div className="page-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p
              className="text-[11px] uppercase tracking-[0.2em] mb-4"
              style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent)' }}
            >
              Pater Noster
            </p>
            <h1
              className="mb-3"
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'var(--step-display)',
                color: 'var(--ink)',
                lineHeight: 1.1,
              }}
            >
              Reviews
            </h1>
            <p
              className="text-lg max-w-xl"
              style={{ fontFamily: 'var(--font-serif-body)', color: 'var(--muted)' }}
            >
              Critical assessments of new and classic works
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter strip */}
      <section className="py-5" style={{ borderBottom: '1px solid var(--hairline)', background: 'var(--paper)' }}>
        <div className="page-container">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            {GENRES.map((genre, i) => (
              <button
                key={genre}
                className="shrink-0 px-4 py-1.5 text-xs tracking-widest uppercase transition-colors duration-200"
                style={{
                  fontFamily: 'var(--font-mono)',
                  borderRadius: '2px',
                  background: i === 0 ? 'var(--ink)' : 'transparent',
                  color: i === 0 ? 'var(--paper)' : 'var(--muted)',
                  border: i === 0 ? '1px solid var(--ink)' : '1px solid var(--hairline)',
                }}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews grid */}
      <section className="py-16">
        <div className="page-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {REVIEWS.map((review, i) => (
              <ReviewCard key={review.id} review={review} index={i} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
