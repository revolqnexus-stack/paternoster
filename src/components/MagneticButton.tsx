'use client';

import { useRef, useCallback, useEffect } from 'react';

/**
 * Magnetic button: slightly follows the cursor when nearby.
 * Respects prefers-reduced-motion.
 */
export default function MagneticButton({
  children,
  className = '',
  strength = 0.4,
}: {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const reducedMotion = useRef(false);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (reducedMotion.current || !btnRef.current) return;

      const rect = btnRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const distance = Math.sqrt(x * x + y * y);

      // Only move when cursor is close enough
      if (distance < 120) {
        const moveX = x * strength;
        const moveY = y * strength;
        btnRef.current.style.transform = `translate(${moveX}px, ${moveY}px)`;
      } else {
        btnRef.current.style.transform = `translate(0, 0)`;
      }
    },
    [strength]
  );

  const handleMouseLeave = useCallback(() => {
    if (btnRef.current) {
      btnRef.current.style.transform = `translate(0, 0)`;
      btnRef.current.style.transition = 'transform 0.3s ease-out';
    }
  }, []);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    reducedMotion.current = mq.matches;

    if (!reducedMotion.current) {
      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }
  }, [handleMouseMove]);

  if (reducedMotion.current) {
    return (
      <button className={className}>{children}</button>
    );
  }

  return (
    <button
      ref={btnRef}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{ transition: 'transform 0.3s cubic-bezier(0.76, 0, 0.24, 1)' }}
    >
      {children}
    </button>
  );
}
