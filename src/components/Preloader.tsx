'use client';

import { useEffect, useState, useRef } from 'react';

/**
 * Preloader: shows wordmark + progress bar on first visit, then fades out.
 * Always completes within a max time so content is never trapped.
 * Respects prefers-reduced-motion.
 */
export default function Preloader({ children }: { children: React.ReactNode }) {
  const [loaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const reducedMotion = useRef(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    reducedMotion.current = mq.matches;

    if (reducedMotion.current) {
      setLoaded(true);
      return;
    }

    let p = 0;
    timerRef.current = setInterval(() => {
      p += Math.random() * 15;
      if (p >= 100) {
        p = 100;
        setProgress(100);
        if (timerRef.current) clearInterval(timerRef.current);
        timeoutRef.current = setTimeout(() => setLoaded(true), 400);
      } else {
        setProgress(p);
      }
    }, 100);

    // Safety net: always complete within 3 seconds even if random walk is slow
    timeoutRef.current = setTimeout(() => {
      if (timerRef.current) clearInterval(timerRef.current);
      setProgress(100);
      setLoaded(true);
    }, 3000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  if (reducedMotion.current) return <>{children}</>;

  return (
    <>
      <div
        className="preloader"
        style={{
          opacity: loaded ? 0 : 1,
          transition: 'opacity 0.6s ease-out',
          pointerEvents: loaded ? 'none' : 'auto',
          visibility: loaded ? 'hidden' : 'visible',
        }}
      >
        <div className="preloader-wordmark">Pater Noster</div>
        <div
          className={`preloader-bar ${progress >= 100 ? 'loaded' : ''}`}
        />
      </div>
      <div
        className="min-h-screen"
        style={{
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.8s ease-out',
          visibility: loaded ? 'visible' : 'hidden',
          pointerEvents: loaded ? 'auto' : 'none',
        }}
      >
        {children}
      </div>
    </>
  );
}
