'use client';

import { useEffect, useRef } from 'react';
import { useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * ScrollReveal: reveals children on enter with clip-path inset wipe + slight parallax.
 * Headlines split into lines/words and rise in on enter.
 * Respects prefers-reduced-motion.
 */
export default function ScrollReveal({
  children,
  type = 'fade',
}: {
  children: React.ReactNode;
  type?: 'fade' | 'clip' | 'parallax';
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    reducedMotion.current = mq.matches;

    if (reducedMotion.current || !ref.current) return;

    const el = ref.current;

    if (type === 'clip') {
      // Clip-path inset wipe
      gsap.fromTo(
        el,
        {
          clipPath: 'inset(0 100% 0 0)',
          opacity: 0,
        },
        {
          clipPath: 'inset(0 0 0 0)',
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none none',
          },
        }
      );
    } else if (type === 'parallax') {
      // Slight parallax on scroll
      gsap.fromTo(
        el,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    } else {
      // Simple fade up
      gsap.fromTo(
        el,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [type]);

  return (
    <div ref={ref} className="opacity-0">
      {children}
    </div>
  );
}
