'use client';

import Link from 'next/link';
import { useCartStore } from '@/lib/store';
import { ShoppingBag } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { createPortal } from 'react-dom';

// Desktop nav — keep concise, group content types under "Read" / "Watch" / "Listen" if needed
const navLinks = [
  { href: '/products',   label: 'Shop' },
  { href: '/blog',       label: 'Blog' },
  { href: '/reviews',    label: 'Reviews' },
  { href: '/videos',     label: 'Videos' },
  { href: '/audio',      label: 'Audio' },
  { href: '/about',      label: 'About' },
];

// Mobile overlay — same links + home + contact
const allLinks = [
  { href: '/',           label: 'Home',    num: '00' },
  { href: '/products',   label: 'Shop',    num: '01' },
  { href: '/blog',       label: 'Blog',    num: '02' },
  { href: '/reviews',    label: 'Reviews', num: '03' },
  { href: '/videos',     label: 'Videos',  num: '04' },
  { href: '/audio',      label: 'Audio',   num: '05' },
  { href: '/about',      label: 'About',   num: '06' },
  { href: '/contact',    label: 'Contact', num: '07' },
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
  const cartCount  = lines.reduce((sum, line) => sum + line.quantity, 0);
  const pathname   = usePathname();
  const btnRef     = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setMounted(true); }, []);

  // Scroll shadow
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close on route change
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  // ESC + resize → close
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

  /* ─── Mobile full-screen overlay ─── */
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
        {/* Close button inside overlay */}
        <button
          onClick={() => setMenuOpen(false)}
          className="pn-mob-close"
          aria-label="Close menu"
        >
          <span className="pn-mob-close__line pn-mob-close__line--a" />
          <span className="pn-mob-close__line pn-mob-close__line--b" />
        </button>

        <nav className="pn-mob-links" aria-label="Site navigation">
          {allLinks.map((l, i) => {
            const active = l.href === '/' ? pathname === '/' : pathname.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`pn-mob-link${active ? ' pn-mob-link--active' : ''}`}
                style={{ transitionDelay: menuOpen ? `${i * 45}ms` : '0ms' }}
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
          <span className="pn-mob-footer__meta">London · paternoster.co</span>
          <button
            onClick={() => { setCartDrawerOpen(true); setMenuOpen(false); }}
            className="pn-mob-footer__bag"
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
          transition: opacity 260ms cubic-bezier(0.16,1,0.3,1),
                      visibility 0s linear 260ms;
        }
        .pn-mob-overlay[data-open="true"] {
          opacity: 1;
          visibility: visible;
          pointer-events: auto;
          transition: opacity 260ms cubic-bezier(0.16,1,0.3,1),
                      visibility 0s linear 0ms;
        }
        .pn-mob-inner {
          display: flex;
          flex-direction: column;
          height: 100%;
          padding: 60px 24px 36px;
          box-sizing: border-box;
          position: relative;
        }
        /* ── close X inside overlay ── */
        .pn-mob-close {
          position: absolute;
          top: 16px; right: 20px;
          width: 40px; height: 40px;
          background: none; border: none; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          -webkit-tap-highlight-color: transparent;
        }
        .pn-mob-close__line {
          display: block;
          width: 20px; height: 1px;
          background: var(--ink);
          border-radius: 1px;
          position: absolute;
        }
        .pn-mob-close__line--a { transform: rotate(45deg); }
        .pn-mob-close__line--b { transform: rotate(-45deg); }

        /* ── links list ── */
        .pn-mob-links {
          display: flex;
          flex-direction: column;
          flex: 1;
          justify-content: center;
          gap: 0;
        }
        .pn-mob-link {
          display: flex;
          align-items: baseline;
          gap: 12px;
          padding: 11px 0;
          border-bottom: 1px solid var(--hairline);
          text-decoration: none;
          opacity: 0;
          transform: translateY(12px);
          transition: opacity 280ms cubic-bezier(0.16,1,0.3,1),
                      transform 280ms cubic-bezier(0.16,1,0.3,1);
        }
        .pn-mob-overlay[data-open="true"] .pn-mob-link {
          opacity: 1;
          transform: translateY(0);
        }
        .pn-mob-link__num {
          font-family: var(--font-mono);
          font-size: 8px;
          letter-spacing: 0.2em;
          color: var(--muted-soft);
          min-width: 20px;
          flex-shrink: 0;
        }
        .pn-mob-link__label {
          font-family: var(--font-serif);
          font-size: clamp(1.6rem, 7vw, 2.8rem);
          font-weight: 500;
          line-height: 1;
          letter-spacing: -0.03em;
          color: var(--ink);
          flex: 1;
          transition: color 160ms;
        }
        .pn-mob-link:hover .pn-mob-link__label,
        .pn-mob-link--active .pn-mob-link__label { color: var(--accent); }
        .pn-mob-link__arrow {
          font-size: 0.8rem;
          color: var(--hairline-soft);
          flex-shrink: 0;
          transition: color 160ms, transform 180ms;
        }
        .pn-mob-link:hover .pn-mob-link__arrow {
          color: var(--accent);
          transform: translate(3px, -3px);
        }

        /* ── footer strip ── */
        .pn-mob-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 18px;
          border-top: 1px solid var(--hairline);
          gap: 1rem;
          flex-wrap: wrap;
        }
        .pn-mob-footer__meta {
          font-family: var(--font-mono);
          font-size: 0.55rem;
          letter-spacing: 0.18em;
          color: var(--muted-soft);
          text-transform: uppercase;
        }
        .pn-mob-footer__bag {
          font-family: var(--font-serif-body);
          font-size: 0.72rem;
          letter-spacing: 0.03em;
          color: var(--ink);
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          transition: color 160ms;
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
      {/* ─── Fixed masthead ─── */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className={`masthead${scrolled ? ' masthead--scrolled' : ''}`}
      >
        <div className="masthead-inner">

          {/* LEFT — hamburger (mobile only) */}
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

          {/* CENTER — logo (always) */}
          <motion.a
            whileHover={{ scale: 1.015 }}
            href="/"
            className="masthead-logo"
          >
            Pater Noster
          </motion.a>

          {/* RIGHT — desktop nav + cart */}
          <div className="masthead-right">
            {/* Desktop nav — hidden on mobile */}
            <nav className="masthead-desktnav" aria-label="Site navigation">
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

            {/* Cart — always visible */}
            <button
              onClick={() => setCartDrawerOpen(true)}
              className="masthead-cart-btn"
              aria-label={`Cart${cartCount > 0 ? `, ${cartCount} items` : ''}`}
              data-cursor="view"
            >
              <ShoppingBag size={15} strokeWidth={1.5} />
              {cartCount > 0 && <span className="masthead-cart-count">({cartCount})</span>}
            </button>
          </div>

        </div>
      </motion.div>

      {/* Mobile overlay portalled to body */}
      {mounted && createPortal(menuOverlay, document.body)}

      {/* ─── Cart Drawer ─── */}
      {cartDrawerOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[200]"
        >
          <div
            className="absolute inset-0 bg-ink/10 backdrop-blur-sm"
            onClick={() => setCartDrawerOpen(false)}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-paper border-l border-hairline shadow-2xl flex flex-col"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-hairline">
              <h2 className="font-serif font-semibold text-base text-ink">Shopping Bag</h2>
              <button
                onClick={() => setCartDrawerOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-sm hover:bg-hairline transition-colors text-ink text-xl leading-none"
                aria-label="Close cart"
              >
                ×
              </button>
            </div>
            <div className="flex-1 flex items-center justify-center p-6">
              <p className="font-serif-body text-sm text-muted text-center">Your bag is empty.</p>
            </div>
          </motion.div>
        </motion.div>
      )}

      <style>{`
        /* ── Hamburger button — mobile only ── */
        .masthead-ham-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px; height: 36px;
          padding: 0;
          background: none; border: none;
          cursor: pointer;
          -webkit-tap-highlight-color: transparent;
          touch-action: manipulation;
          flex-shrink: 0;
        }
        /* hide hamburger on desktop */
        @media (min-width: 768px) {
          .masthead-ham-btn { display: none; }
        }

        /* ── Hamburger lines ── */
        .ham-icon {
          display: flex; flex-direction: column; align-items: flex-end;
          width: 20px; height: 14px;
          position: relative;
        }
        .ham-line {
          display: block; height: 1px;
          background: var(--ink); border-radius: 1px;
          position: absolute;
          transition: width 240ms cubic-bezier(0.16,1,0.3,1),
                      transform 240ms cubic-bezier(0.16,1,0.3,1),
                      opacity 140ms ease;
          transform-origin: center;
        }
        .ham-line--top { width: 20px; top: 0; }
        .ham-line--mid { width: 13px; top: 50%; margin-top: -0.5px; }
        .ham-line--bot { width: 17px; bottom: 0; }
        .ham-line--top.ham-line--open { width: 20px; top: 50%; margin-top: -0.5px; transform: rotate(45deg); }
        .ham-line--mid.ham-line--open { opacity: 0; transform: scaleX(0); }
        .ham-line--bot.ham-line--open { width: 20px; bottom: auto; top: 50%; margin-top: -0.5px; transform: rotate(-45deg); }

        /* ── Desktop nav ── */
        .masthead-desktnav {
          display: none; /* hidden on mobile */
          align-items: center;
          gap: 1.5rem;
        }
        @media (min-width: 768px) {
          .masthead-desktnav { display: flex; }
        }

        .masthead-nav-link {
          font-family: var(--font-serif-body);
          font-size: 0.78rem;
          font-weight: 400;
          text-decoration: none;
          color: var(--ink);
          letter-spacing: 0em;
          line-height: 1;
          padding-bottom: 2px;
          border-bottom: 1px solid transparent;
          transition: color 200ms ease, border-color 200ms ease;
          white-space: nowrap;
        }
        .masthead-nav-link:hover { color: var(--accent); }
        .masthead-nav-link--active {
          color: var(--accent);
          border-bottom-color: var(--accent);
        }

        /* ── Cart button ── */
        .masthead-cart-btn {
          display: flex; align-items: center; gap: 5px;
          padding: 0; background: none; border: none;
          cursor: pointer;
          color: var(--ink);
          transition: color 200ms ease;
          flex-shrink: 0;
        }
        .masthead-cart-btn:hover { color: var(--accent); }
        .masthead-cart-count {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          line-height: 1;
        }

        /* ── Scroll shadow / frosted glass ── */
        .masthead--scrolled {
          background: rgba(253,251,245,0.88) !important;
          backdrop-filter: blur(14px) !important;
          -webkit-backdrop-filter: blur(14px) !important;
          border-bottom-color: transparent !important;
          box-shadow: 0 1px 24px rgba(26,26,26,0.06) !important;
        }

        /* ── On mobile: logo not absolute centered (no room with just ham+cart) ── */
        @media (max-width: 767px) {
          .masthead-logo {
            position: static !important;
            transform: none !important;
            font-size: 0.875rem !important;
          }
          .masthead-inner {
            justify-content: space-between;
          }
        }

        @media (hover: none), (pointer: coarse) {
          .masthead-ham-btn { transform: none !important; }
        }
      `}</style>
    </>
  );
}
