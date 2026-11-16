'use client';

import Link from 'next/link';
import { useCartStore } from '@/lib/store';
import { ShoppingBag } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { createPortal } from 'react-dom';

const navLinks = [
  { href: '/',         label: 'Home' },
  { href: '/products', label: 'Shop' },
  { href: '/about',    label: 'About' },
];

const allLinks = [
  { href: '/',         label: 'Home',    num: '00' },
  { href: '/products', label: 'Shop',    num: '01' },
  { href: '/about',    label: 'About',   num: '02' },
  { href: '/journal',  label: 'Journal', num: '03' },
  { href: '/contact',  label: 'Contact', num: '04' },
];

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <span className="ham-icon" aria-hidden="true">
      <span className={`ham-line ham-line--top${open ? ' ham-line--open' : ''}`} />
      <span className={`ham-line ham-line--mid${open ? ' ham-line--open' : ''}`} />
      <span className={`ham-line ham-line--bot${open ? ' ham-line--open' : ''}`} />
    </span>
  );
}

export default function Header() {
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [menuOpen, setMenuOpen]             = useState(false);
  const [scrolled, setScrolled]             = useState(false);
  const [mounted, setMounted]               = useState(false);
  const { lines } = useCartStore();
  const cartCount = lines.reduce((sum, line) => sum + line.quantity, 0);
  const pathname  = usePathname();
  const btnRef    = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Mount check for portal
  useEffect(() => { setMounted(true); }, []);

  // Scroll shadow
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  // ESC + resize
  useEffect(() => {
    const onKey    = (e: KeyboardEvent) => { if (e.key === 'Escape') { setMenuOpen(false); btnRef.current?.focus(); } };
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => { window.removeEventListener('keydown', onKey); window.removeEventListener('resize', onResize); };
  }, []);

  // Block scroll-through on touch
  useEffect(() => {
    const el = overlayRef.current;
    if (!el) return;
    const block = (e: TouchEvent) => { if (menuOpen) e.preventDefault(); };
    el.addEventListener('touchmove', block, { passive: false });
    return () => el.removeEventListener('touchmove', block);
  }, [menuOpen]);

  const menuOverlay = (
    <div
      ref={overlayRef}
      id="mobile-navigation"
      className="pn-mob-overlay"
      data-open={menuOpen ? 'true' : 'false'}
      aria-hidden={!menuOpen}
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
    >
      <div className="pn-mob-inner">
        <nav className="pn-mob-links" aria-label="Site navigation">
          {allLinks.map((l, i) => {
            const active = l.href === '/' ? pathname === '/' : pathname.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`pn-mob-link${active ? ' pn-mob-link--active' : ''}`}
                style={{ transitionDelay: menuOpen ? `${i * 55}ms` : '0ms' }}
                onClick={() => setMenuOpen(false)}
              >
                <span className="pn-mob-link__num">{l.num}</span>
                <span className="pn-mob-link__label">{l.label}</span>
                <span className="pn-mob-link__arrow">↗</span>
              </Link>
            );
          })}
        </nav>

        <footer className="pn-mob-footer">
          <div className="pn-mob-footer__left">
            <span className="pn-mob-footer__meta">London · paternoster.co</span>
          </div>
          <button
            onClick={() => { setCartDrawerOpen(true); setMenuOpen(false); }}
            className="pn-mob-footer__bag"
            data-cursor="view"
          >
            Shopping Bag →
          </button>
        </footer>
      </div>

      <style>{`
        .pn-mob-overlay {
          position: fixed;
          inset: 0;
          z-index: 9998;
          background: var(--paper);
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
          touch-action: none;
          overscroll-behavior: contain;
          transition: opacity 280ms cubic-bezier(0.16,1,0.3,1),
                      visibility 0s linear 280ms;
        }
        .pn-mob-overlay[data-open="true"] {
          opacity: 1;
          visibility: visible;
          pointer-events: auto;
          transition: opacity 280ms cubic-bezier(0.16,1,0.3,1),
                      visibility 0s linear 0ms;
        }
        .pn-mob-inner {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 100%;
          padding: 72px 20px 40px;
          box-sizing: border-box;
        }
        .pn-mob-links {
          display: flex;
          flex-direction: column;
          flex: 1;
          justify-content: center;
        }
        .pn-mob-link {
          display: flex;
          align-items: baseline;
          gap: 14px;
          padding: 14px 0;
          border-bottom: 1px solid var(--hairline);
          text-decoration: none;
          opacity: 0;
          transform: translateY(14px);
          transition: opacity 300ms cubic-bezier(0.16,1,0.3,1),
                      transform 300ms cubic-bezier(0.16,1,0.3,1);
        }
        .pn-mob-overlay[data-open="true"] .pn-mob-link {
          opacity: 1;
          transform: translateY(0);
        }
        .pn-mob-link__num {
          font-family: var(--font-mono);
          font-size: 9px;
          letter-spacing: 0.2em;
          color: var(--muted-soft);
          min-width: 22px;
          flex-shrink: 0;
        }
        .pn-mob-link__label {
          font-family: var(--font-serif);
          font-size: clamp(2.2rem, 9vw, 3.5rem);
          font-weight: 500;
          line-height: 1;
          letter-spacing: -0.03em;
          color: var(--ink);
          flex: 1;
          transition: color 180ms;
        }
        .pn-mob-link:hover .pn-mob-link__label { color: var(--accent); }
        .pn-mob-link--active .pn-mob-link__label { color: var(--accent); }
        .pn-mob-link__arrow {
          font-size: 0.85rem;
          color: var(--hairline);
          flex-shrink: 0;
          transition: color 180ms, transform 200ms;
        }
        .pn-mob-link:hover .pn-mob-link__arrow {
          color: var(--accent);
          transform: translate(3px,-3px);
        }
        .pn-mob-footer {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 1rem;
          padding-top: 20px;
          border-top: 1px solid var(--hairline);
          flex-wrap: wrap;
        }
        .pn-mob-footer__left { display: flex; flex-direction: column; gap: 4px; }
        .pn-mob-footer__meta {
          font-family: var(--font-mono);
          font-size: 0.58rem;
          letter-spacing: 0.18em;
          color: var(--muted-soft);
          text-transform: uppercase;
        }
        .pn-mob-footer__bag {
          font-family: var(--font-serif-body);
          font-size: 0.75rem;
          letter-spacing: 0.04em;
          color: var(--ink);
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          transition: color 180ms;
        }
        .pn-mob-footer__bag:hover { color: var(--accent); }
        @media (prefers-reduced-motion: reduce) {
          .pn-mob-overlay, .pn-mob-link { transition-duration: 0.01ms !important; }
        }
      `}</style>
    </div>
  );

  return (
    <>
      {/* Fixed masthead */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`masthead${scrolled ? ' masthead--scrolled' : ''}`}
      >
        <div className="masthead-inner">
          {/* Left: hamburger */}
          <button
            ref={btnRef}
            type="button"
            onClick={() => setMenuOpen(o => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            className="masthead-ham-btn"
            data-cursor="view"
          >
            <HamburgerIcon open={menuOpen} />
          </button>

          {/* Center: logo */}
          <motion.a
            whileHover={{ scale: 1.02 }}
            href="/"
            className="masthead-logo"
          >
            Pater Noster
          </motion.a>

          {/* Right: desktop nav + cart */}
          <div className="masthead-right">
            <nav className="masthead-nav hidden md:flex" aria-label="Site navigation">
              {navLinks.map((l) => {
                const active = l.href === '/' ? pathname === '/' : pathname.startsWith(l.href);
                return (
                  <motion.a
                    key={l.href}
                    whileHover={{ y: -1 }}
                    href={l.href}
                    className={`masthead-nav-link${active ? ' masthead-nav-link--active' : ''}`}
                    data-cursor="view"
                  >
                    {l.label}
                  </motion.a>
                );
              })}
            </nav>

            {/* Mobile cart icon */}
            <button
              onClick={() => setCartDrawerOpen(true)}
              className="text-ink hover:text-accent transition-colors p-0 bg-none border-none md:hidden"
              aria-label="Cart"
              data-cursor="view"
            >
              <ShoppingBag size={15} strokeWidth={1.5} />
              {cartCount > 0 && <span className="text-xs font-mono ml-1">({cartCount})</span>}
            </button>

            {/* Desktop cart */}
            <button
              onClick={() => setCartDrawerOpen(true)}
              className="hidden md:flex items-center gap-1.5 text-ink hover:text-accent transition-colors p-0 bg-none border-none font-serif-body text-sm"
              aria-label="Cart"
              data-cursor="view"
            >
              <ShoppingBag size={15} strokeWidth={1.5} />
              {cartCount > 0 && <span className="text-xs font-mono">({cartCount})</span>}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Mobile overlay — portalled to body */}
      {mounted && createPortal(menuOverlay, document.body)}

      {/* Cart Drawer */}
      {cartDrawerOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50"
        >
          <div
            className="absolute inset-0 bg-accent/20 backdrop-blur-sm"
            onClick={() => setCartDrawerOpen(false)}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="absolute right-0 top-0 bottom-0 w-96 bg-paper border-l border-hairline shadow-2xl p-8"
          >
            {/* Close — proper X */}
            <button
              onClick={() => setCartDrawerOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded hover:bg-hairline/50 transition-colors text-ink text-lg leading-none"
              aria-label="Close"
              data-cursor="view"
            >
              ×
            </button>
            <motion.h2
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="font-serif font-semibold text-lg mb-6 text-ink"
            >
              Shopping Bag
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="font-serif-body text-sm text-muted"
            >
              Your bag is empty.
            </motion.div>
          </motion.div>
        </motion.div>
      )}

      <style>{`
        /* ── Hamburger button ── */
        .masthead-ham-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          padding: 0;
          background: none;
          border: none;
          cursor: pointer;
          -webkit-tap-highlight-color: transparent;
          touch-action: manipulation;
          flex-shrink: 0;
        }
        .ham-icon {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          width: 20px;
          height: 14px;
          position: relative;
        }
        .ham-line {
          display: block;
          height: 1px;
          background: var(--ink);
          border-radius: 1px;
          position: absolute;
          transition: width 240ms cubic-bezier(0.16,1,0.3,1),
                      transform 240ms cubic-bezier(0.16,1,0.3,1),
                      opacity 140ms ease;
          transform-origin: center;
        }
        .ham-line--top { width: 20px; top: 0; }
        .ham-line--mid { width: 14px; top: 50%; margin-top: -0.5px; }
        .ham-line--bot { width: 17px; bottom: 0; }
        .ham-line--top.ham-line--open { width: 20px; top: 50%; margin-top: -0.5px; transform: rotate(45deg); }
        .ham-line--mid.ham-line--open { opacity: 0; transform: scaleX(0); }
        .ham-line--bot.ham-line--open { width: 20px; bottom: auto; top: 50%; margin-top: -0.5px; transform: rotate(-45deg); }

        /* ── Active nav link ── */
        .masthead-nav-link {
          font-family: var(--font-serif-body);
          font-size: 0.8125rem;
          font-weight: 400;
          text-decoration: none;
          color: var(--ink);
          letter-spacing: -0.01em;
          line-height: 1;
          padding-bottom: 2px;
          border-bottom: 1px solid transparent;
          transition: color 200ms ease, border-color 200ms ease;
        }
        .masthead-nav-link:hover {
          color: var(--accent);
        }
        .masthead-nav-link--active {
          color: var(--accent);
          border-bottom-color: var(--accent);
        }

        /* ── Scroll shadow ── */
        .masthead--scrolled {
          box-shadow: 0 1px 20px rgba(26,26,26,0.07);
          background: rgba(253,251,245,0.9) !important;
          backdrop-filter: blur(12px) !important;
          -webkit-backdrop-filter: blur(12px) !important;
          border-bottom-color: transparent !important;
        }

        /* ── Hamburger on mobile ── */
        @media (hover: none), (pointer: coarse) {
          .masthead-ham-btn { transform: none !important; translate: none !important; }
        }
      `}</style>
    </>
  );
}
