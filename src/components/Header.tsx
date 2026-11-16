'use client';

import Link from 'next/link';
import { useCartStore } from '@/lib/store';
import { ShoppingBag } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Header() {
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { lines } = useCartStore();
  const cartCount = lines.reduce((sum, line) => sum + line.quantity, 0);

  return (
    <>
      {/* Masthead — revolq structure, light Vogue colors */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="masthead"
      >
        <div className="masthead-inner">
          {/* Left: menu trigger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-ink hover:text-accent transition-colors p-0 bg-none border-none font-serif-body text-sm"
            aria-label="Menu"
            data-cursor="view"
          >
            <span className="block w-6 h-0.5 bg-ink mb-1.5"></span>
            <span className="block w-6 h-0.5 bg-ink"></span>
          </button>

          {/* Center: logo */}
          <motion.a
            whileHover={{ scale: 1.02 }}
            href="/"
            className="masthead-logo flex-shrink-0"
          >
            Pater Noster
          </motion.a>

          {/* Right: nav + cart */}
          <div className="masthead-right flex items-center gap-4">
            <nav className="hidden md:flex gap-6">
              <motion.a
                whileHover={{ x: 3 }}
                href="/"
                className="text-ink hover:text-accent transition-colors font-serif-body text-sm"
                data-cursor="view"
              >
                Home
              </motion.a>
              <motion.a
                whileHover={{ x: 3 }}
                href="/products"
                className="text-ink hover:text-accent transition-colors font-serif-body text-sm"
                data-cursor="view"
              >
                Shop
              </motion.a>
              <motion.a
                whileHover={{ x: 3 }}
                href="/about"
                className="text-ink hover:text-accent transition-colors font-serif-body text-sm"
                data-cursor="view"
              >
                About
              </motion.a>
            </nav>

            <button
              onClick={() => setCartDrawerOpen(true)}
              className="text-ink hover:text-accent transition-colors p-0 bg-none border-none font-serif-body text-sm md:hidden"
              aria-label="Cart"
              data-cursor="view"
            >
              <ShoppingBag size={16} strokeWidth={1.5} />
            </button>

            <button
              onClick={() => setCartDrawerOpen(true)}
              className="hidden md:flex items-center gap-1.5 text-ink hover:text-accent transition-colors p-0 bg-none border-none font-serif-body text-sm"
              aria-label="Cart"
              data-cursor="view"
            >
              <ShoppingBag size={16} strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="text-xs font-mono">
                  ({cartCount})
                </span>
              )}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Full-screen overlay menu — revolq style */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 bg-paper"
          onClick={() => setMenuOpen(false)}
        >
          <div className="absolute inset-0 flex items-center justify-center p-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-center"
            >
              <motion.a
                whileHover={{ x: 5 }}
                href="/"
                className="block font-serif font-semibold text-ink mb-8"
                style={{ fontSize: 'clamp(3rem, 10vw, 5rem)', lineHeight: 1.1, letterSpacing: '-0.03em' }}
                data-cursor="view"
              >
                Home
              </motion.a>
              <motion.a
                whileHover={{ x: 5 }}
                href="/products"
                className="block font-serif font-semibold text-ink mb-8"
                style={{ fontSize: 'clamp(3rem, 10vw, 5rem)', lineHeight: 1.1, letterSpacing: '-0.03em' }}
                data-cursor="view"
              >
                Shop
              </motion.a>
              <motion.a
                whileHover={{ x: 5 }}
                href="/about"
                className="block font-serif font-semibold text-ink mb-8"
                style={{ fontSize: 'clamp(3rem, 10vw, 5rem)', lineHeight: 1.1, letterSpacing: '-0.03em' }}
                data-cursor="view"
              >
                About
              </motion.a>
              <motion.a
                whileHover={{ x: 5 }}
                href="/journal"
                className="block font-serif font-semibold text-ink mb-8"
                style={{ fontSize: 'clamp(3rem, 10vw, 5rem)', lineHeight: 1.1, letterSpacing: '-0.03em' }}
                data-cursor="view"
              >
                Journal
              </motion.a>
              <motion.a
                whileHover={{ x: 5 }}
                href="/contact"
                className="block font-serif font-semibold text-ink mb-8"
                style={{ fontSize: 'clamp(3rem, 10vw, 5rem)', lineHeight: 1.1, letterSpacing: '-0.03em' }}
                data-cursor="view"
              >
                Contact
              </motion.a>
              <div className="mt-12">
                <button
                  onClick={() => setCartDrawerOpen(true)}
                  className="text-ink hover:text-accent transition-colors inline-block"
                  data-cursor="view"
                >
                  Shopping Bag →
                </button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}

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
            <button
              onClick={() => setCartDrawerOpen(false)}
              className="absolute top-4 right-4 p-2 rounded hover:bg-paper/50 transition-colors"
              aria-label="Close"
              data-cursor="view"
            >
              <span className="block w-5 h-0.5 bg-ink mb-1"></span>
              <span className="block w-5 h-0.5 bg-ink"></span>
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
    </>
  );
}
