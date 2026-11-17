'use client';

import { motion } from 'framer-motion';
import { stockImage } from '@/lib/stock-images';

interface Episode {
  id: number;
  number: string;
  title: string;
  subtitle: string;
  duration: string;
  date: string;
  image: string;
  description?: string;
}

const FEATURED_EPISODE: Episode = {
  id: 0,
  number: 'Ep. 112',
  title: 'The Examined Sentence: Ian McEwan on Craft',
  subtitle: 'An extended conversation about prose style, structure, and the moral dimension of fiction',
  duration: '1:04:22',
  date: '12 November 2026',
  image: stockImage('reading'),
  description:
    'Ian McEwan joins us to discuss the composition of his most recent novel, the relationship between syntax and feeling, and why he believes every sentence is an ethical act. Recorded at the London Review Bookshop.',
};

const EPISODES: Episode[] = [
  {
    id: 1,
    number: 'Ep. 111',
    title: 'Rereading Sebald',
    subtitle: 'On grief, memory, and the photograph in W.G. Sebald\'s prose',
    duration: '52:08',
    date: '5 November 2026',
    image: stockImage('library'),
  },
  {
    id: 2,
    number: 'Ep. 110',
    title: 'Poem: "The Annunciation" — Anne Carson reads',
    subtitle: 'A live recording from the Edinburgh International Book Festival',
    duration: '18:34',
    date: '29 October 2026',
    image: stockImage('typewriter'),
  },
  {
    id: 3,
    number: 'Ep. 109',
    title: 'In Conversation: Zadie Smith on the Essay',
    subtitle: 'From personal experience to political argument — the essay\'s many forms',
    duration: '47:55',
    date: '22 October 2026',
    image: stockImage('desk'),
  },
  {
    id: 4,
    number: 'Ep. 108',
    title: 'Essay: "Against Transparency" — read by the author',
    subtitle: 'Adam Phillips reads his new essay on the limits of self-knowledge',
    duration: '34:12',
    date: '15 October 2026',
    image: stockImage('notebook'),
  },
  {
    id: 5,
    number: 'Ep. 107',
    title: 'On Translation: Daniel Hahn & Sophie Hughes',
    subtitle: 'What survives the crossing from one language to another?',
    duration: '55:40',
    date: '8 October 2026',
    image: stockImage('bookshelf'),
  },
  {
    id: 6,
    number: 'Ep. 106',
    title: 'Poetry Reading: Ocean Vuong\'s "Night Sky with Exit Wounds"',
    subtitle: 'A complete reading with brief reflections between poems',
    duration: '41:19',
    date: '1 October 2026',
    image: stockImage('pen'),
  },
  {
    id: 7,
    number: 'Ep. 105',
    title: 'The Critic\'s Art: Jacqueline Rose in Conversation',
    subtitle: 'On Plath, Freud, and the ethics of literary biography',
    duration: '1:08:45',
    date: '24 September 2026',
    image: stockImage('coffee'),
  },
  {
    id: 8,
    number: 'Ep. 104',
    title: 'Essay: "Difficult Beauty" — a reading',
    subtitle: 'Gabriel Josipovici reads on form, difficulty, and the resistant work of art',
    duration: '28:03',
    date: '17 September 2026',
    image: stockImage('reading'),
  },
];

function PlayCircle({ large = false }: { large?: boolean }) {
  return (
    <button
      className={`${large ? 'w-16 h-16 text-xl' : 'w-9 h-9 text-sm'} rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 hover:scale-110`}
      style={{
        background: 'var(--accent)',
        color: 'var(--paper)',
      }}
      aria-label="Play episode"
    >
      <span style={{ marginLeft: '2px' }}>▶</span>
    </button>
  );
}

export default function AudioClient() {
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
              Audio
            </h1>
            <p
              className="text-lg max-w-xl"
              style={{ fontFamily: 'var(--font-serif-body)', color: 'var(--muted)' }}
            >
              Readings, conversations, and essays for the ear
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured episode */}
      <section className="py-16" style={{ borderBottom: '1px solid var(--hairline)' }}>
        <div className="page-container">
          <p
            className="text-[11px] uppercase tracking-widest mb-6"
            style={{ fontFamily: 'var(--font-mono)', color: 'var(--muted)' }}
          >
            Latest Episode
          </p>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col md:flex-row gap-8 p-8 rounded-sm"
            style={{ background: 'var(--paper-2)', border: '1px solid var(--hairline)' }}
          >
            {/* Cover art */}
            <div
              className="shrink-0 rounded-sm overflow-hidden"
              style={{ width: '220px', height: '220px', alignSelf: 'center' }}
            >
              <img
                src={FEATURED_EPISODE.image}
                alt={FEATURED_EPISODE.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Episode info */}
            <div className="flex flex-col justify-center gap-4 flex-1">
              <div>
                <p
                  className="text-[11px] uppercase tracking-widest mb-2"
                  style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent)' }}
                >
                  {FEATURED_EPISODE.number}
                </p>
                <h2
                  className="text-2xl font-semibold leading-snug mb-2"
                  style={{ fontFamily: 'var(--font-serif)', color: 'var(--ink)' }}
                >
                  {FEATURED_EPISODE.title}
                </h2>
                <p
                  className="text-sm mb-3"
                  style={{ fontFamily: 'var(--font-serif-body)', color: 'var(--muted)' }}
                >
                  {FEATURED_EPISODE.description}
                </p>
                <p
                  className="text-xs"
                  style={{ fontFamily: 'var(--font-utility)', color: 'var(--muted-soft)' }}
                >
                  {FEATURED_EPISODE.date} · {FEATURED_EPISODE.duration}
                </p>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-4">
                <PlayCircle large />
                <a
                  href="#"
                  className="text-xs tracking-widest uppercase px-5 py-2.5 transition-colors duration-200"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    border: '1px solid var(--ink)',
                    color: 'var(--ink)',
                  }}
                >
                  Listen Now
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Episodes list */}
      <section className="py-16">
        <div className="page-container">
          <p
            className="text-[11px] uppercase tracking-widest mb-6"
            style={{ fontFamily: 'var(--font-mono)', color: 'var(--muted)' }}
          >
            All Episodes
          </p>

          <div className="flex flex-col" style={{ border: '1px solid var(--hairline)', borderRadius: '2px' }}>
            {EPISODES.map((episode, i) => (
              <motion.div
                key={episode.id}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="flex items-center gap-4 px-5 py-4 group hover:bg-paper-2 transition-colors duration-200"
                style={{
                  borderBottom: i < EPISODES.length - 1 ? '1px solid var(--hairline)' : 'none',
                  background: i % 2 === 1 ? 'var(--paper-2)' : 'transparent',
                }}
              >
                {/* Episode number */}
                <span
                  className="text-xs w-16 shrink-0 text-right"
                  style={{ fontFamily: 'var(--font-mono)', color: 'var(--muted-soft)' }}
                >
                  {episode.number}
                </span>

                {/* Cover image */}
                <div
                  className="w-12 h-12 shrink-0 rounded-sm overflow-hidden"
                  style={{ background: 'var(--paper-2)' }}
                >
                  <img
                    src={episode.image}
                    alt={episode.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Title + subtitle */}
                <div className="flex-1 min-w-0">
                  <p
                    className="text-sm font-semibold leading-snug truncate"
                    style={{ fontFamily: 'var(--font-serif)', color: 'var(--ink)' }}
                  >
                    {episode.title}
                  </p>
                  <p
                    className="text-xs mt-0.5 truncate"
                    style={{ fontFamily: 'var(--font-serif-body)', color: 'var(--muted)' }}
                  >
                    {episode.subtitle}
                  </p>
                  <p
                    className="text-[10px] mt-1"
                    style={{ fontFamily: 'var(--font-utility)', color: 'var(--muted-soft)' }}
                  >
                    {episode.date}
                  </p>
                </div>

                {/* Duration */}
                <span
                  className="text-xs shrink-0 hidden sm:block"
                  style={{ fontFamily: 'var(--font-mono)', color: 'var(--muted)' }}
                >
                  {episode.duration}
                </span>

                {/* Play button */}
                <PlayCircle />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
