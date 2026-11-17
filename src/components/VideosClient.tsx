'use client';

import { motion } from 'framer-motion';
import { stockImage } from '@/lib/stock-images';

interface Video {
  id: number;
  title: string;
  speaker: string;
  date: string;
  duration: string;
  views: string;
  description?: string;
  image: string;
}

const FEATURED_VIDEO: Video = {
  id: 0,
  title: 'On Writing and the Problem of Time: A Conversation with Colm Tóibín',
  speaker: 'Colm Tóibín',
  date: '10 November 2026',
  duration: '58:14',
  views: '12.4k views',
  description:
    'In this extended conversation, novelist Colm Tóibín reflects on the composition of his most recent novel, the relationship between historical research and imaginative freedom, and what it means to inhabit another person\'s consciousness on the page.',
  image: stockImage('library'),
};

const GRID_VIDEOS: Video[] = [
  {
    id: 1,
    title: 'The Art of the Essay: Craft Lecture',
    speaker: 'Zadie Smith',
    date: '4 November 2026',
    duration: '42:30',
    views: '8.9k views',
    image: stockImage('reading'),
  },
  {
    id: 2,
    title: 'Poetry Reading: "Autobiography of Red" and After',
    speaker: 'Anne Carson',
    date: '28 October 2026',
    duration: '31:15',
    views: '6.1k views',
    image: stockImage('typewriter'),
  },
  {
    id: 3,
    title: 'Panel: The State of Literary Criticism',
    speaker: 'Samuel Crane, Fiona Reid & Elena Marlowe',
    date: '20 October 2026',
    duration: '1:12:08',
    views: '14.2k views',
    image: stockImage('bookshelf'),
  },
  {
    id: 4,
    title: 'Lecture: Empire, Memory and the Historical Novel',
    speaker: 'Hilary Mantel',
    date: '13 October 2026',
    duration: '50:22',
    views: '9.7k views',
    image: stockImage('desk'),
  },
  {
    id: 5,
    title: 'In Conversation: Psychoanalysis and Literature',
    speaker: 'Samuel Crane & Clara Voss',
    date: '5 October 2026',
    duration: '1:04:47',
    views: '11.3k views',
    image: stockImage('notebook'),
  },
  {
    id: 6,
    title: 'The Difficult Novel: Reading Blanchot',
    speaker: 'Gabriel Josipovici',
    date: '27 September 2026',
    duration: '38:55',
    views: '4.8k views',
    image: stockImage('pen'),
  },
];

function PlayButton({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const dims = { sm: 'w-10 h-10 text-base', md: 'w-14 h-14 text-xl', lg: 'w-20 h-20 text-3xl' };
  return (
    <div
      className={`${dims[size]} rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}
      style={{
        background: 'var(--accent)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
      }}
    >
      <span style={{ color: 'var(--paper)', marginLeft: '3px' }}>▶</span>
    </div>
  );
}

function DurationBadge({ duration }: { duration: string }) {
  return (
    <span
      className="absolute bottom-2 right-2 text-[10px] px-2 py-0.5 rounded-sm"
      style={{
        fontFamily: 'var(--font-mono)',
        background: 'rgba(5,5,5,0.85)',
        color: 'var(--paper)',
        backdropFilter: 'blur(4px)',
      }}
    >
      {duration}
    </span>
  );
}

function VideoCard({ video, index }: { video: Video; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group cursor-pointer"
    >
      {/* Thumbnail */}
      <div className="relative overflow-hidden rounded-sm mb-3" style={{ aspectRatio: '16/9', background: 'var(--paper-2)' }}>
        <img
          src={video.image}
          alt={video.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 flex items-center justify-center" style={{ background: 'rgba(5,5,5,0.3)' }}>
          <PlayButton size="sm" />
        </div>
        <DurationBadge duration={video.duration} />
      </div>

      {/* Meta */}
      <h3
        className="text-sm font-semibold leading-snug mb-1 group-hover:opacity-70 transition-opacity"
        style={{ fontFamily: 'var(--font-serif)', color: 'var(--ink)' }}
      >
        {video.title}
      </h3>
      <p
        className="text-xs mb-1"
        style={{ fontFamily: 'var(--font-serif-body)', color: 'var(--muted)' }}
      >
        {video.speaker}
      </p>
      <p
        className="text-[11px]"
        style={{ fontFamily: 'var(--font-utility)', color: 'var(--muted-soft)' }}
      >
        {video.date} · {video.views}
      </p>
    </motion.div>
  );
}

export default function VideosClient() {
  return (
    <main style={{ background: 'var(--paper)', minHeight: '100vh' }}>
      {/* Page header */}
      <section className="pt-24 pb-12" style={{ borderBottom: '1px solid var(--hairline)' }}>
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
              Videos
            </h1>
            <p
              className="text-lg max-w-xl"
              style={{ fontFamily: 'var(--font-serif-body)', color: 'var(--muted)' }}
            >
              Lectures, readings, and conversations
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured video */}
      <section className="py-16" style={{ borderBottom: '1px solid var(--hairline)' }}>
        <div className="page-container">
          <p
            className="text-[11px] uppercase tracking-widest mb-6"
            style={{ fontFamily: 'var(--font-mono)', color: 'var(--muted)' }}
          >
            Featured
          </p>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="group cursor-pointer"
          >
            {/* 16:9 featured thumbnail */}
            <div
              className="relative overflow-hidden rounded-sm mb-6"
              style={{ aspectRatio: '16/9', background: 'var(--paper-2)', maxHeight: '520px' }}
            >
              <img
                src={FEATURED_VIDEO.image}
                alt={FEATURED_VIDEO.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{ background: 'rgba(5,5,5,0.4)' }}
              >
                <PlayButton size="lg" />
              </div>
              <DurationBadge duration={FEATURED_VIDEO.duration} />
            </div>

            {/* Featured meta */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h2
                  className="text-2xl font-semibold leading-snug mb-2"
                  style={{ fontFamily: 'var(--font-serif)', color: 'var(--ink)' }}
                >
                  {FEATURED_VIDEO.title}
                </h2>
                <p
                  className="text-sm"
                  style={{ fontFamily: 'var(--font-utility)', color: 'var(--muted)' }}
                >
                  {FEATURED_VIDEO.speaker} · {FEATURED_VIDEO.date}
                </p>
              </div>
              <div>
                <p
                  className="text-sm leading-relaxed"
                  style={{ fontFamily: 'var(--font-serif-body)', color: 'var(--muted)' }}
                >
                  {FEATURED_VIDEO.description}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Video grid */}
      <section className="py-16">
        <div className="page-container">
          <p
            className="text-[11px] uppercase tracking-widest mb-8"
            style={{ fontFamily: 'var(--font-mono)', color: 'var(--muted)' }}
          >
            All Videos
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {GRID_VIDEOS.map((video, i) => (
              <VideoCard key={video.id} video={video} index={i} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
