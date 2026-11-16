'use client';

import Link from 'next/link';
import { useCartStore } from '@/lib/store';
import { ShoppingBag } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Header() {
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const { lines } = useCartStore();
  const cartCount = lines.reduce((sum, line) => sum + line.quantity, 0);

  return (
    <>
      {/* Masthead — Vogue editorial style */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="masthead"
      >
        <div className="masthead-inner">
          <motion.a
            whileHover={{ x: -5 }}
            href="/"
            className="masthead-logo"
          >
            Pater Noster
          </motion.a>
          <nav className="masthead-nav">
            <motion.a
              whileHover={{ x: 5 }}
              href="/"
              className="text-ink hover:text-accent transition-colors"
            >
              Home
            </motion.a>
            <motion.a
              whileHover={{ x: 5 }}
              href="/products"
              className="text-ink hover:text-accent transition-colors"
            >
              Shop
            </motion.a>
            <motion.a
              whileHover={{ x: 5 }}
              href="/about"
              className="text-ink hover:text-accent transition-colors"
            >
              About
            </motion.a>
            <button
              onClick={() => setCartDrawerOpen(true)}
              className="text-ink hover:text-accent transition-colors p-0 bg-none border-none font-serif-body text-sm"
              aria-label="Cart"
            >
              <ShoppingBag size={16} strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="ml-1 text-xs font-mono">
                  ({cartCount})
                </span>
              )}
            </button>
          </nav>
        </div>
      </motion.div>

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
