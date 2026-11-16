'use client';

import { useEffect, useState, useRef } from 'react';

/**
 * Preloader: shows wordmark + progress bar on first visit, then fades out.
 * Respects prefers-reduced-motion.
 */
export default function Preloader({ children }: { children: React.ReactNode }) {
  const [loaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const reducedMotion = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    reducedMotion.current = mq.matches;

    if (reducedMotion.current) {
      setLoaded(true);
      return;
    }

    let p = 0;
    const timer = setInterval(() => {
      p += Math.random() * 15;
      if (p >= 100) {
        p = 100;
        setProgress(100);
        clearInterval(timer);
        setTimeout(() => setLoaded(true), 400);
      } else {
        setProgress(p);
      }
    }, 100);

    return () => clearInterval(timer);
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
        }}
      >
        <div className="preloader-wordmark">Pater Noster</div>
        <div
          className={`preloader-bar ${progress >= 100 ? 'loaded' : ''}`}
        />
      </div>
      <div
        className="min-h-screen"
        style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.8s ease-out' }}
      >
        {children}
      </div>
    </>
  );
}
