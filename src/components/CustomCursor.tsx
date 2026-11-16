'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Custom cursor — Revol-Q style.
 * Small champagne dot that follows the mouse.
 * Grows to a "VIEW" label when hovering over interactive elements.
 * mix-blend-mode: multiply so it's visible on both light and dark backgrounds.
 */
export default function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [state, setState] = useState<'default' | 'view'>('default');
  const reducedMotion = useRef<boolean>(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    reducedMotion.current = mq.matches;
    if (reducedMotion.current) return;

    let ticking = false;

    const handleMouseMove = (e: MouseEvent) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setPos({ x: e.clientX, y: e.clientY });
          ticking = false;
        });
        ticking = true;
      }
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target?.closest('[data-cursor="view"]')) {
        setState('view');
      }
    };

    const handleMouseLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target?.closest('[data-cursor="view"]')) {
        setState('default');
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseenter', handleMouseEnter, true);
    window.addEventListener('mouseleave', handleMouseLeave, true);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseenter', handleMouseEnter, true);
      window.removeEventListener('mouseleave', handleMouseLeave, true);
    };
  }, []);

  if (reducedMotion.current) return null;

  return (
    <div
      className="fixed z-[999999] pointer-events-none rounded-full transition-all duration-300 ease-out"
      style={{
        transform: `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%)`,
        width: state === 'view' ? 64 : 20,
        height: state === 'view' ? 64 : 20,
        backgroundColor: state === 'view' ? 'rgba(201, 162, 102, 0.9)' : 'rgba(201, 162, 102, 0.85)',
        borderColor: state === 'view' ? 'transparent' : 'rgba(201, 162, 102, 0.5)',
        mixBlendMode: state === 'view' ? 'screen' : 'multiply',
        border: state === 'view' ? 'none' : '1px solid rgba(201, 162, 102, 0.5)',
      }}
    >
      {state === 'view' && (
        <span
          className="font-mono text-[0.65rem] font-medium text-ink uppercase tracking-wider leading-none"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            opacity: state === 'view' ? 1 : 0,
          }}
        >
          VIEW
        </span>
      )}
    </div>
  );
}
