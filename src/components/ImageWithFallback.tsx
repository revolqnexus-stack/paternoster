'use client';

import { useState } from 'react';

interface ImageWithFallbackProps {
  src: string | undefined;
  alt: string;
  className?: string;
  fallbackKey?: 'reading' | 'library' | 'bookshelf' | 'typewriter' | 'coffee' | 'desk' | 'pen' | 'notebook' | 'fallback';
}

/**
 * Renders an image with a tonal gradient + grain SVG fallback.
 * If the src fails to load, shows a textured gradient placeholder
 * — NEVER visible alt text.
 */
export default function ImageWithFallback({
  src,
  alt,
  className = '',
  fallbackKey = 'fallback',
}: ImageWithFallbackProps) {
  const [broken, setBroken] = useState(false);

  // Deterministic grain color per key so fallbacks look intentional
  const grainColors: Record<string, string> = {
    reading: '#d8d0c0',
    library: '#d8d0c0',
    bookshelf: '#e8e0d0',
    typewriter: '#d8d0c0',
    coffee: '#e8e0d0',
    desk: '#d8d0c0',
    pen: '#e8e0d0',
    notebook: '#d8d0c0',
    fallback: '#d8d0c0',
  };
  const grainColor = grainColors[fallbackKey] || grainColors.fallback;

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ aspectRatio: '4/5' }}
    >
      {broken ? (
        <svg
          className="absolute inset-0 w-full h-full"
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <filter id="grain" x="0" y="0" width="100%" height="100%">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.6"
                numOctaves="3"
                stitchTiles="stitch"
              />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.4 0"
              />
              <feBlend
                mode="multiply"
                in2="SourceGraphic"
                in="SourceGraphic"
                result="mix"
              />
              <feBlend mode="normal" in="mix" in2="SourceGraphic" />
            </filter>
            <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopOpacity="0.55" />
              <stop offset="100%" stopOpacity="0.35" />
            </linearGradient>
          </defs>
          <rect
            width="100"
            height="100"
            fill={grainColor}
            filter="url(#grain)"
          />
          <rect
            width="100"
            height="100"
            fill="url(#grad)"
          />
        </svg>
      ) : (
        <img
          src={src || ''}
          alt={alt}
          className={`w-full h-full block ${className}`}
          onError={() => setBroken(true)}
          loading="lazy"
          decoding="async"
        />
      )}
    </div>
  );
}
