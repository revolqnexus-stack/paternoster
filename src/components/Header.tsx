'use client';

import { useCartStore } from '@/lib/store';
import { ShoppingBag, Search } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { createPortal } from 'react-dom';
import Hamburger from 'hamburger-react';

// Desktop left-nav — focused, editorial
const desktopLinks = [
  { href: '/products', label: 'Shop'    },
  { href: '/blog',     label: 'Journal' },
  { href: '/about',    label: 'About'   },
];

// Mobile full-screen overlay — expanded
const mobileLinks = [
  { href: '/',         label: 'Home',    num: '00' },
  { href: '/products', label: 'Shop',    num: '01' },
  { href: '/blog',     label: 'Journal', num: '02' },
  { href: '/reviews',  label: 'Reviews', num: '03' },
  { href: '/videos',   label: 'Videos',  num: '04' },
  { href: '/audio',    label: 'Audio',   num: '05' },
  { href: '/about',    label: 'About',   num: '06' },
  { href: '/contact',  label: 'Contact', num: '07' },
];

function HamburgerIcon() {
  return <Hamburger />;
}

export default function Header() {
  const [cartOpen, setCartOpen]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const [scrolled, setScrolled]   = useState(false);
  const [mounted, setMounted]     = useState(false);
  const { lines }  = useCartStore();
  const cartCount  = lines.reduce((s, l) => s + l.quantity, 0);
  const pathname   = usePathname();
  const btnRef     = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setMounted(true); }, []);

  // Scroll → subtle shadow only
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 4);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  // Close overlay on route change
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  // ESC + resize
  useEffect(() => {
    const onKey    = (e: KeyboardEvent) => { if (e.key === 'Escape') { setMenuOpen(false); btnRef.current?.focus(); } };
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => { window.removeEventListener('keydown', onKey); window.removeEventListener('resize', onResize); };
  }, []);

  // Block touchmove bleed-through
  useEffect(() => {
    const el = overlayRef.current;
    if (!el) return;
    const block = (e: TouchEvent) => { if (menuOpen) e.preventDefault(); };
    el.addEventListener('touchmove', block, { passive: false });
    return () => el.removeEventListener('touchmove', block);
  }, [menuOpen]);

  /* ─── Mobile full-screen overlay ─── */
  const overlay = (
    <div
      ref={overlayRef}
      id="pn-nav"
      className="pn-overlay"
      data-open={menuOpen ? 'true' : 'false'}
      aria-hidden={!menuOpen}
      role="dialog"
      aria-modal="true"
      aria-label="Navigation"
    >
      <div className="pn-overlay__inner">
        {/* X close in top-right */}
        <button
          onClick={() => setMenuOpen(false)}
          className="pn-overlay__close"
          aria-label="Close menu"
        >
          <span className="pn-overlay__close-line pn-overlay__close-line--a" />
          <span className="pn-overlay__close-line pn-overlay__close-line--b" />
        </button>

        <nav className="pn-overlay__links" aria-label="Site navigation">
          {mobileLinks.map((l, i) => {
            const active = l.href === '/' ? pathname === '/' : pathname.startsWith(l.href);
            return (
              <a
                key={l.href}
                href={l.href}
                className={`pn-overlay__link${active ? ' pn-overlay__link--active' : ''}`}
                style={{ transitionDelay: menuOpen ? `${i * 40}ms` : '0ms' }}
                onClick={() => setMenuOpen(false)}
              >
                <span className="pn-overlay__num">{l.num}</span>
                <span className="pn-overlay__label">{l.label}</span>
                <span className="pn-overlay__arrow">↗</span>
              </a>
            );
          })}
        </nav>

        <footer className="pn-overlay__footer">
          <span className="pn-overlay__meta">London · paternoster.co</span>
          <button
            className="pn-overlay__bag"
            onClick={() => { setCartOpen(true); setMenuOpen(false); }}
          >
            Shopping Bag →
          </button>
        </footer>
      </div>

      <style>{`
        .pn-overlay {
          position: fixed; inset: 0; z-index: 9999;
          background: var(--paper);
          opacity: 0; visibility: hidden; pointer-events: none;
          touch-action: none; overscroll-behavior: contain;
          transition: opacity 240ms cubic-bezier(0.16,1,0.3,1),
                      visibility 0s linear 240ms;
        }
        .pn-overlay[data-open="true"] {
          opacity: 1; visibility: visible; pointer-events: auto;
          transition: opacity 240ms cubic-bezier(0.16,1,0.3,1),
                      visibility 0s linear 0ms;
        }
        .pn-overlay__inner {
          display: flex; flex-direction: column;
          height: 100%; padding: 56px 24px 36px;
          box-sizing: border-box; position: relative;
        }
        .pn-overlay__close {
          position: absolute; top: 14px; right: 18px;
          width: 40px; height: 40px;
          background: none; border: none; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          -webkit-tap-highlight-color: transparent;
        }
        .pn-overlay__close-line {
          display: block; width: 20px; height: 1px;
          background: var(--ink); border-radius: 1px; position: absolute;
        }
        .pn-overlay__close-line--a { transform: rotate(45deg); }
        .pn-overlay__close-line--b { transform: rotate(-45deg); }
        .pn-overlay__links {
          display: flex; flex-direction: column;
          flex: 1; justify-content: center;
        }
        .pn-overlay__link {
          display: flex; align-items: baseline; gap: 12px;
          padding: 11px 0; border-bottom: 1px solid var(--hairline);
          text-decoration: none;
          opacity: 0; transform: translateY(10px);
          transition: opacity 260ms cubic-bezier(0.16,1,0.3,1),
                      transform 260ms cubic-bezier(0.16,1,0.3,1);
        }
        .pn-overlay[data-open="true"] .pn-overlay__link {
          opacity: 1; transform: translateY(0);
        }
        .pn-overlay__num {
          font-family: var(--font-mono); font-size: 8px;
          letter-spacing: 0.2em; color: var(--muted-soft);
          min-width: 20px; flex-shrink: 0;
        }
        .pn-overlay__label {
          font-family: var(--font-serif);
          font-size: clamp(1.75rem, 7.5vw, 3rem);
          font-weight: 500; line-height: 1; letter-spacing: -0.03em;
          color: var(--ink); flex: 1; transition: color 150ms;
        }
        .pn-overlay__link:hover .pn-overlay__label,
        .pn-overlay__link--active .pn-overlay__label { color: var(--accent); }
        .pn-overlay__arrow {
          font-size: 0.8rem; color: var(--hairline-soft); flex-shrink: 0;
          transition: color 150ms, transform 170ms;
        }
        .pn-overlay__link:hover .pn-overlay__arrow {
          color: var(--accent); transform: translate(3px, -3px);
        }
        .pn-overlay__footer {
          display: flex; align-items: center; justify-content: space-between;
          padding-top: 18px; border-top: 1px solid var(--hairline);
          gap: 1rem; flex-wrap: wrap;
        }
        .pn-overlay__meta {
          font-family: var(--font-mono); font-size: 0.55rem;
          letter-spacing: 0.18em; color: var(--muted-soft); text-transform: uppercase;
        }
        .pn-overlay__bag {
          font-family: var(--font-serif-body); font-size: 0.72rem;
          color: var(--ink); background: none; border: none; padding: 0;
          cursor: pointer; transition: color 150ms;
        }
        .pn-overlay__bag:hover { color: var(--accent); }
        @media (prefers-reduced-motion: reduce) {
          .pn-overlay, .pn-overlay__link { transition-duration: 0.01ms !important; }
        }
      `}</style>
    </div>
  );

  return (
    <>
      {/* ─── Masthead ─── */}
      <motion.header
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className={`masthead${scrolled ? ' masthead--scrolled' : ''}`}
        role="banner"
      >
        <div className="masthead-inner">

          {/* ── LEFT COLUMN ── */}
          <div className="mh-left">
            {/* Mobile: hamburger */}
            <button
              ref={btnRef}
              type="button"
              onClick={() => setMenuOpen(o => !o)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="pn-nav"
              className="mh-ham-btn"
              data-cursor="view"
            >
              <HamburgerIcon />
            </button>

            {/* Desktop: left nav links */}
            <nav className="mh-desktnav" aria-label="Primary navigation">
              {desktopLinks.map((l) => {
                const active = l.href === '/' ? pathname === '/' : pathname.startsWith(l.href);
                return (
                  <motion.a
                    key={l.href}
                    whileHover={{ y: -1 }}
                    href={l.href}
                    className={`mh-navlink${active ? ' mh-navlink--active' : ''}`}
                    data-cursor="view"
                  >
                    {l.label}
                  </motion.a>
                );
              })}
            </nav>
          </div>

          {/* ── CENTER COLUMN — logo, mathematically centered by grid ── */}
          <motion.a
            whileHover={{ opacity: 0.75 }}
            href="/"
            className="masthead-logo"
            data-cursor="view"
          >
            Pater Noster
          </motion.a>

          {/* ── RIGHT COLUMN — utility icons ── */}
          <div className="mh-right">
            <button
              className="mh-icon-btn"
              aria-label="Search"
              data-cursor="view"
            >
              <Search size={16} strokeWidth={1.5} />
            </button>
            <button
              onClick={() => setCartOpen(true)}
              className="mh-icon-btn"
              aria-label={cartCount > 0 ? `Cart, ${cartCount} items` : 'Cart'}
              data-cursor="view"
            >
              <ShoppingBag size={16} strokeWidth={1.5} />
              {cartCount > 0 && <span className="mh-cart-count">{cartCount}</span>}
            </button>
          </div>

        </div>
      </motion.header>

      {/* Mobile overlay */}
      {mounted && createPortal(overlay, document.body)}

      {/* ─── Cart Drawer ─── */}
      {cartOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[200]"
        >
          <div
            className="absolute inset-0 bg-ink/10 backdrop-blur-sm"
            onClick={() => setCartOpen(false)}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            transition={{ type: 'spring', stiffness: 340, damping: 30 }}
            className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-paper border-l border-hairline flex flex-col"
          >
            <div className="flex items-center justify-between px-6 h-14 border-b border-hairline flex-shrink-0">
              <h2 className="font-serif text-sm font-semibold tracking-wide text-ink">Shopping Bag</h2>
              <button
                onClick={() => setCartOpen(false)}
                className="w-8 h-8 flex items-center justify-center text-ink hover:text-accent transition-colors text-xl leading-none"
                aria-label="Close cart"
              >
                ×
              </button>
            </div>
            <div className="flex-1 flex items-center justify-center p-8">
              <p className="font-serif-body text-sm text-muted text-center">Your bag is empty.</p>
            </div>
          </motion.div>
        </motion.div>
      )}

      <style>{`
        /* ── Left column: ham on mobile, links on desktop ── */
        .mh-left {
          display: flex;
          align-items: center;
        }

        /* Hamburger — mobile only */
        .mh-ham-btn {
          display: flex; align-items: center; justify-content: center;
          width: 36px; height: 36px; padding: 0;
          background: none; border: none; cursor: pointer;
          -webkit-tap-highlight-color: transparent; touch-action: manipulation;
        }
        @media (min-width: 768px) { .mh-ham-btn { display: none; } }

        /* Ham lines */
        .pn-ham {
          display: flex; flex-direction: column; align-items: flex-end;
          width: 20px; height: 14px; position: relative;
        }
        .pn-ham__line {
          display: block; height: 1px; background: var(--ink);
          border-radius: 1px; position: absolute;
          transition: width 230ms cubic-bezier(0.16,1,0.3,1),
                      transform 230ms cubic-bezier(0.16,1,0.3,1),
                      opacity 130ms ease;
          transform-origin: center;
        }
        .pn-ham__line--t { width: 20px; top: 0; }
        .pn-ham__line--m { width: 13px; top: 50%; margin-top: -0.5px; }
        .pn-ham__line--b { width: 17px; bottom: 0; }
        .pn-ham__line--t.pn-ham__line--open { width: 20px; top: 50%; margin-top: -0.5px; transform: rotate(45deg); }
        .pn-ham__line--m.pn-ham__line--open { opacity: 0; transform: scaleX(0); }
        .pn-ham__line--b.pn-ham__line--open { width: 20px; bottom: auto; top: 50%; margin-top: -0.5px; transform: rotate(-45deg); }

        /* Desktop left nav */
        .mh-desktnav {
          display: none; align-items: center; gap: 2rem;
        }
        @media (min-width: 768px) { .mh-desktnav { display: flex; } }

        .mh-navlink {
          font-family: var(--font-serif-body);
          font-size: 0.8125rem; font-weight: 400;
          text-decoration: none; color: var(--ink);
          letter-spacing: 0.01em; line-height: 1;
          white-space: nowrap;
          padding-bottom: 1px;
          border-bottom: 1px solid transparent;
          transition: color 180ms ease, border-color 180ms ease;
        }
        .mh-navlink:hover { color: var(--accent); text-decoration: none; }
        .mh-navlink--active { color: var(--accent); border-bottom-color: var(--accent); }

        /* ── Right column — right-aligned icons ── */
        .mh-right {
          display: flex; align-items: center; gap: 1.25rem;
          justify-content: flex-end;
        }
        .mh-icon-btn {
          display: flex; align-items: center; gap: 4px;
          padding: 0; background: none; border: none;
          color: var(--ink); cursor: pointer;
          transition: color 180ms ease;
          position: relative;
        }
        .mh-icon-btn:hover { color: var(--accent); }
        .mh-cart-count {
          position: absolute; top: -6px; right: -8px;
          font-family: var(--font-mono); font-size: 9px; line-height: 1;
          background: var(--accent); color: var(--paper);
          border-radius: 100px; padding: 1px 4px; min-width: 14px;
          text-align: center;
        }

        /* ── Scroll state — hairline shadow only, no dark blur ── */
        .masthead--scrolled {
          background: rgba(250,249,245,0.92) !important;
          backdrop-filter: blur(10px) !important;
          -webkit-backdrop-filter: blur(10px) !important;
          box-shadow: 0 1px 0 var(--hairline) !important;
          border-bottom-color: transparent !important;
        }

        /* ── Mobile logo: static (not grid-centered, no room) ── */
        @media (max-width: 767px) {
          .masthead-inner {
            grid-template-columns: auto 1fr auto !important;
          }
          .masthead-logo {
            text-align: center;
            font-size: 0.875rem;
          }
          .mh-right { gap: 1rem; }
        }

        @media (hover: none), (pointer: coarse) {
          .mh-ham-btn { transform: none !important; }
        }
      `}</style>
    </>
  );
}
