'use client';

import Link from 'next/link';
import { useCartStore } from '@/lib/store';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import CartDrawer from '@/components/CartDrawer';

const MENU_ITEMS = [
  { index: '01', label: 'Home', href: '/' },
  { index: '02', label: 'Shop', href: '/products' },
  { index: '03', label: 'Books', href: '/collections/books' },
  { index: '04', label: 'About', href: '/about' },
  { index: '05', label: 'Subscribe', href: '#subscribe' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const { lines } = useCartStore();
  const cartCount = lines.reduce((sum, line) => sum + line.quantity, 0);

  // Scroll-driven logo scale and header background
  const { scrollY } = useScroll({ offset: ['start', 'end 300px'] });
  const logoScale = useTransform(scrollY, [0, 300], [1, 0.55]);
  const headerBg = useTransform(
    scrollY,
    [0, 300],
    ['rgba(250,250,247,0)', 'rgba(250,250,247,0.85)']
  );

  // Hide on scroll down, reveal on scroll up
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const lastScrollY = useRef(0);
  const [hasScrolledPastThreshold, setHasScrolledPastThreshold] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      const current = window.scrollY;
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
      <header
        className={`fixed top-0 left-0 right-0 z-40 border-b border-border pointer-events-auto transition-all duration-500 ease-out ${
          isScrollingDown && hasScrolledPastThreshold
            ? '-translate-y-full'
            : ''
        }`}
        style={{
          background: headerBg as unknown as string,
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
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
                className="p-2 rounded hover:bg-paper/50 transition-colors"
                aria-label="Menu"
              >
                <Menu size={20} strokeWidth={2.5} />
              </button>
            </div>

            {/* Center: logo */}
            <div className="col-start-2 text-center">
              <Link href="/" className="flex-shrink-0 block" onClick={closeMenu}>
                <h1 className="font-display text-[clamp(1.5rem,4vw,2.5rem)] font-normal text-ink tracking-tight italic leading-none">
                  Pater Noster
                </h1>
              </Link>
            </div>

            {/* Right: cart + Subscribe */}
            <div className="col-start-3 flex justify-end items-center gap-3">
              <button
                onClick={() => setCartDrawerOpen(true)}
                className="relative p-2 rounded hover:bg-paper/50 transition-colors"
                aria-label="Cart"
              >
                <ShoppingBag size={18} strokeWidth={2} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-ink text-paper text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-medium">
                    {cartCount}
                  </span>
                )}
              </button>
              <a
                href="#subscribe"
                className="px-4 py-2 bg-ink text-paper font-grotesk text-[0.8rem] font-medium uppercase tracking-wider rounded hover:bg-navy-light transition-colors"
              >
                Subscribe
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Full-screen editorial overlay menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ clipPath: 'circle(0% at 50% 0%)' }}
            animate={{ clipPath: 'circle(150% at 50% 0%)' }}
            exit={{ clipPath: 'circle(0% at 50% 0%)' }}
            className="fixed inset-0 z-50 bg-paper"
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] as const }}
          >
            <div className="page-container-header py-6 md:py-8 border-b border-border mb-20 md:mb-32">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-xl md:text-2xl font-normal text-ink tracking-tight italic">
                  Menu
                </h2>
                <button
                  onClick={closeMenu}
                  className="p-2 rounded hover:bg-paper/50 transition-colors"
                >
                  <X size={20} strokeWidth={2.5} />
                </button>
              </div>
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
                  whileHover={{ y: -2 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  key={item.index}
                  className={`block mb-12 md:mb-16 group relative inline-block ${
                    item.href === window.location.pathname ? 'text-navy' : 'text-ink'
                  }`}
                >
                  <span className="block text-gray-light text-xs md:text-sm uppercase tracking-widest mb-1 font-serif font-normal">
                    {item.index}
                  </span>
                  <motion.span
                    className="block text-4xl md:text-5xl lg:text-6xl font-serif font-normal tracking-tight italic group-hover:text-navy transition-all duration-300"
                  >
                    {item.label}
                  </motion.span>
                </motion.a>
              ))}
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
