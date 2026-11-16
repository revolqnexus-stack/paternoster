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
    <section className="relative z-10">
      {/* Full-bleed hero image, 100vh on desktop */}
      <div className="relative h-[85vh] md:h-[100vh] w-full overflow-hidden">
        <ImageWithFallback
          src={image}
          alt={imageAlt}
          className="absolute inset-0 w-full h-full object-cover"
          fallbackKey="reading"
          data-cursor="view"
        />
        {/* Headline overlapping the image, half off the bottom edge */}
        <div className="absolute bottom-[-8%] left-0 w-full px-6 md:px-12 -translate-y-1/2 z-20">
          <div className="page-container">
            <p className="label-caps mb-2 md:mb-3 uppercase tracking-widest">
              {kicker}
            </p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] as const }}
              className="font-display text-[clamp(4rem,12vw,14rem)] font-normal leading-[0.9] tracking-[-0.03em] text-ink italic mb-4 md:mb-6"
            >
              {title}
            </motion.h1>
            <p className="font-serif text-[clamp(1.125rem,2vw,1.5rem)] leading-relaxed text-ink max-w-[65ch]">
              {excerpt}
            </p>
            <p className="font-grotesk text-sm md:text-base font-medium text-navy mt-6 italic tracking-tight">
              — {byline}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
