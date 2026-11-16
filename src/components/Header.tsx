'use client';

import Link from 'next/link';
import { useCartStore } from '@/lib/store';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import CartDrawer from '@/components/CartDrawer';

const MENU_ITEMS = [
  { index: '01', label: 'Home', href: '/' },
  { index: '02', label: 'Journal', href: '/products' },
  { index: '03', label: 'Shop', href: '/collections/books' },
  { index: '04', label: 'Books', href: '/collections/merchandise' },
  { index: '05', label: 'About', href: '/about' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const { lines } = useCartStore();
  const cartCount = lines.reduce((sum, line) => sum + line.quantity, 0);

  // Scroll-driven logo scale and header background
  const { scrollY } = useScroll({ offset: ['start', 'end 300px'] });
  const logoScale = useTransform(scrollY, [0, 300], [1, 0.6]);
  const headerBg = useTransform(
    scrollY,
    [0, 300],
    ['rgba(247,245,239,0)', 'rgba(247,245,239,0.85)']
  );

  const [scrolled, setScrolled] = useState(false);

  // Hide on scroll down, reveal on scroll up
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const lastScrollY = useRef(0);
  const [hasScrolledPastThreshold, setHasScrolledPastThreshold] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      const current = window.scrollY;
      setScrolled(current > 0);
      if (current > 400) setHasScrolledPastThreshold(true);
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrollingDown(current > lastScrollY.current && current > 400);
          lastScrollY.current = current;
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleMenu = () => {
    setMenuOpen((prev) => {
      if (!prev) document.body.style.overflow = 'hidden';
      else document.body.style.overflow = '';
      return !prev;
    });
  };

  const closeMenu = () => {
    setMenuOpen(false);
    document.body.style.overflow = '';
  };

  return (
    <>
      {/* Masthead strip (LRB) */}
      <div
        className="border-b border-hairline bg-paper py-1 md:py-2 z-30"
        style={{
          transform: isScrollingDown && hasScrolledPastThreshold
            ? 'translateY(-100%)'
            : 'translateY(0)',
          transition: 'transform 0.4s cubic-bezier(0.76, 0, 0.24, 1)',
        }}
      >
        <div className="page-container-header flex items-center justify-between text-[0.6875rem] font-ui-sans font-medium uppercase tracking-widest text-muted">
          <span>Vol. 48 · No. 22</span>
          <time dateTime="2026-11-16">16 November 2026</time>
          <a href="#subscribe" className="text-ink hover:text-blue transition-colors">
            Log in
          </a>
        </div>
      </div>

      {/* Header (Vogue) */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 border-b border-hairline pointer-events-auto transition-all duration-500 ease-out ${
          isScrollingDown && hasScrolledPastThreshold
            ? '-translate-y-full'
            : ''
        }`}
        style={{
          background: headerBg as unknown as string,
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
        }}
      >
        <div className="page-container-header">
          {/* 3-column grid: menu | logo | cart + subscribe */}
          <div
            className="grid grid-cols-3 items-center gap-4 py-3 md:py-4"
            style={{
              transform: logoScale as unknown as string,
              transformOrigin: 'center top',
              transition: 'transform 0.5s cubic-bezier(0.76, 0, 0.24, 1)',
            }}
          >
            {/* Left: menu button */}
            <div className="col-start-1">
              <button
                onClick={toggleMenu}
                className="p-2 rounded-sm hover:bg-paper-2 transition-colors"
                aria-label="Menu"
              >
                <Menu size={20} strokeWidth={2.5} />
              </button>
            </div>

            {/* Center: logo — bold, caps, normal (not italic), normal size */}
            <div className="col-start-2 text-center">
              <Link href="/" className="flex-shrink-0 block" onClick={closeMenu}>
                <h1 className="font-display font-bold text-[clamp(1.5rem,4vw,2rem)] text-ink tracking-[-0.02em] leading-none uppercase">
                  Pater Noster
                </h1>
              </Link>
            </div>

            {/* Right: cart + Subscribe */}
            <div className="col-start-3 flex justify-end items-center gap-3">
              <button
                onClick={() => setCartDrawerOpen(true)}
                className="relative p-2 rounded-sm hover:bg-paper-2 transition-colors"
                aria-label="Cart"
              >
                <ShoppingBag size={18} strokeWidth={2} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-ink text-blue-ink text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-medium">
                    {cartCount}
                  </span>
                )}
              </button>
              <a
                href="#subscribe"
                className="px-5 py-2 bg-blue text-blue-ink font-ui-sans text-[0.7rem] font-medium uppercase tracking-wider rounded-sm hover:bg-ink hover:text-blue-ink transition-colors"
              >
                Subscribe
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Full-screen editorial overlay menu (blue background) */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ clipPath: 'circle(0% at 50% 0%)' }}
            animate={{ clipPath: 'circle(150% at 50% 0%)' }}
            exit={{ clipPath: 'circle(0% at 50% 0%)' }}
            className="fixed inset-0 z-50 bg-blue"
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] as const }}
          >
            <div className="page-container-header py-6 md:py-8 border-b border-blue-ink/20 mb-20 md:mb-32 relative">
              <button
                onClick={closeMenu}
                className="absolute top-6 right-6 p-2 rounded-sm hover:bg-blue-ink/10 transition-colors"
              >
                <X size={20} strokeWidth={2.5} className="text-paper" />
              </button>
              <h2 className="font-display text-xl md:text-2xl font-normal text-blue-ink tracking-tight italic">
                Menu
              </h2>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="page-container-header flex-1 flex flex-col items-center justify-center text-center"
            >
              {MENU_ITEMS.map((item, i) => (
                <motion
                  .a
                  href={item.href}
                  onClick={closeMenu}
                  whileHover={{ x: 24 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  key={item.index}
                  className={`block mb-12 md:mb-16 group relative inline-block ${
                    item.href === window.location.pathname ? 'text-blue-ink' : 'text-paper'
                  }`}
                >
                  <span className="block text-blue-ink/50 text-xs md:text-sm uppercase tracking-widest mb-1 font-ui-sans font-medium">
                    {item.index}
                  </span>
                  <motion.span
                    className="block text-4xl md:text-5xl lg:text-6xl font-display font-normal tracking-tight italic group-hover:text-blue-ink transition-all duration-300"
                  >
                    {item.label}
                  </motion.span>
                </motion.a>
              ))}

              {/* Secondary links */}
              <div className="mt-16 md:mt-24 flex flex-col gap-4 text-center">
                <a
                  href="#subscribe"
                  className="font-text-serif text-sm text-blue-ink/70 italic hover:text-paper transition-colors"
                >
                  Subscribe
                </a>
                <a
                  href="/about"
                  className="font-text-serif text-sm text-blue-ink/70 italic hover:text-paper transition-colors"
                >
                  Contact
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart Drawer */}
      {cartDrawerOpen && (
        <CartDrawer isOpen={cartDrawerOpen} onClose={() => setCartDrawerOpen(false)} />
      )}
    </>
  );
}
