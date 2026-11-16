'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

/**
 * Page load preloader: wordmark reveal, then hero image scales 1.15 → 1
 * with clip-path wipe, headline lines slide up from masked overflow, staggered.
 * Respects prefers-reduced-motion.
 */
export default function Preloader({ children }: { children: React.ReactNode }) {
  const [loaded, setLoaded] = useState(false);
  const [wordmarkVisible, setWordmarkVisible] = useState(false);
  const reducedMotion = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    reducedMotion.current = mq.matches;

    if (reducedMotion.current) {
      setLoaded(true);
      setWordmarkVisible(true);
      return;
    }

    // Wordmark reveal
    const wordmarkTimer = setTimeout(() => setWordmarkVisible(true), 100);

    // Full preloader duration
    const loadTimer = setTimeout(() => {
      setLoaded(true);
    }, 1400);

    return () => {
      clearTimeout(wordmarkTimer);
      clearTimeout(loadTimer);
    };
  }, []);

  if (reducedMotion.current) return <>{children}</>;

  return (
    <>
      {/* Preloader overlay */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        exit={{ opacity: 0 }}
        transition={{
          delay: loaded ? 0 : 1.4,
          duration: 0.6,
          ease: [0.76, 0, 0.24, 1] as const,
        }}
        style={{ pointerEvents: loaded ? 'none' : 'auto' }}
        className="fixed inset-0 z-[10000] bg-paper flex items-center justify-center"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: wordmarkVisible ? 1 : 0,
            scale: wordmarkVisible ? 1 : 0.8,
          }}
          transition={{
            duration: 0.6,
            ease: [0.76, 0, 0.24, 1] as const,
          }}
          className="font-display text-[clamp(3rem,8vw,5rem)] font-normal text-ink italic leading-none tracking-tight"
        >
          Pater Noster
        </motion.div>
      </motion.div>

      {/* Content — revealed after preloader */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          delay: loaded ? 0 : 1.6,
          duration: 0.6,
        }}
        className="min-h-screen"
      >
        {children}
      </motion.div>
    </>
  );
}
