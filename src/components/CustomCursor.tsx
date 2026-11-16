'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

/**
 * Custom cursor: small circle that follows the mouse.
 * Grows to a "VIEW" label when hovering over elements with data-cursor attribute.
 * Respects prefers-reduced-motion.
 */
export default function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [state, setState] = useState<'default' | 'view'>('default');
  const cursorRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useRef<boolean>(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    reducedMotion.current = mq.matches;
    if (reducedMotion.current) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
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

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseenter', handleMouseEnter, true);
    window.addEventListener('mouseleave', handleMouseLeave, true);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseenter', handleMouseEnter, true);
      window.removeEventListener('mouseleave', handleMouseLeave, true);
    };
  }, []);

  const cursorStyle = {
    transform: `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%)`,
  };

  if (reducedMotion.current) return null;

  return (
    <div
      ref={cursorRef}
      className="fixed z-[9999] pointer-events-none rounded-full border border-ink/30 bg-ink/10 transition-all duration-300 ease-out"
      style={{
        ...cursorStyle,
        width: state === 'view' ? 60 : 24,
        height: state === 'view' ? 60 : 24,
        backgroundColor: state === 'view' ? 'rgba(10, 31, 51, 0.9)' : 'rgba(10, 10, 10, 0.6)',
        borderColor: state === 'view' ? 'transparent' : 'rgba(10, 10, 10, 0.3)',
      }}
    >
      {state === 'view' && (
        <span className="font-grotesk text-[0.6rem] font-medium text-paper uppercase tracking-wider leading-none">
          VIEW
        </span>
      )}
    </div>
  );
}
