'use client';

import { motion } from 'framer-motion';
import ImageWithFallback from '@/components/ImageWithFallback';

interface HeroProps {
  title: string;
  kicker: string;
  byline: string;
  excerpt: string;
  image: string;
  imageAlt: string;
}

export default function Hero({
  title,
  kicker,
  byline,
  excerpt,
  image,
  imageAlt,
}: HeroProps) {
  return (
    <section className="relative z-10 min-h-[100svh] flex flex-col">
      {/* Full-bleed hero image behind text — normal flow grid */}
      <div className="relative w-full overflow-hidden">
        <ImageWithFallback
          src={image}
          alt={imageAlt}
          className="w-full h-[100svh] object-cover"
          fallbackKey="reading"
          data-cursor="view"
        />
        {/* Dark gradient overlay so light text reads over any image */}
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.75)] via-[rgba(0,0,0,0.25)] to-[rgba(0,0,0,0.1)] pointer-events-none" />
      </div>

      {/* Text content — normal flow, no absolute overlap */}
      <div className="page-container pt-8 pb-20 md:pt-16 md:pb-32 relative z-10">
        <div className="max-w-[60ch]">
          <p className="label-caps mb-3 md:mb-4 uppercase tracking-widest text-paper">
            {kicker}
          </p>
          {/* Descender-safe headline wrapper */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] as const }}
            className="font-display text-[clamp(3.5rem,11vw,13rem)] font-normal leading-[0.92] tracking-[-0.03em] text-paper italic mb-6 md:mb-8"
            style={{ paddingBottom: '0.18em', marginBottom: '-0.18em' }}
          >
            {title}
          </motion.h1>
          <p className="font-serif text-[clamp(1.125rem,2vw,1.5rem)] leading-relaxed text-paper mb-8 md:mb-10">
            {excerpt}
          </p>
          {/* Byline directly above excerpt, never overlaps headline */}
          <p className="font-grotesk text-[0.6875rem] font-medium text-paper/80 uppercase tracking-[0.2em] italic mb-2">
            By {byline}
          </p>
          <a
            href="/"
            className="font-grotesk text-sm md:text-base font-medium text-paper italic underline underline-offset-2 hover:text-navy-light transition-colors"
          >
            Read the essay →
          </a>
        </div>
      </div>
    </section>
  );
}
