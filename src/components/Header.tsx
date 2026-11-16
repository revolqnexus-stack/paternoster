'use client';

import Link from 'next/link';
import { useCartStore } from '@/lib/store';
import { ShoppingBag } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const { lines } = useCartStore();
  const cartCount = lines.reduce((sum, line) => sum + line.quantity, 0);

  return (
    <>
      {/* Masthead — LRB style */}
      <div className="masthead">
        <div className="masthead-container page-container">
          <Link href="/" className="masthead-logo">
            Pater Noster
          </Link>
          <nav className="masthead-nav">
            <Link href="/" className="text-ink hover:text-muted transition-colors">
              Home
            </Link>
            <Link href="/products" className="text-ink hover:text-muted transition-colors">
              Shop
            </Link>
            <Link href="/about" className="text-ink hover:text-muted transition-colors">
              About
            </Link>
            <button
              onClick={() => setCartDrawerOpen(true)}
              className="text-ink hover:text-muted transition-colors p-0 bg-none border-none font-serif-body text-sm"
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
      </div>

      {/* Cart Drawer */}
      {cartDrawerOpen && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setCartDrawerOpen(false)}
          />
          <div className="absolute right-0 top-0 bottom-0 w-96 bg-paper border-l border-hairline shadow-2xl p-8">
            <button
              onClick={() => setCartDrawerOpen(false)}
              className="absolute top-4 right-4 p-2 rounded hover:bg-paper/50 transition-colors"
              aria-label="Close"
            >
              <span className="block w-5 h-0.5 bg-ink mb-1"></span>
              <span className="block w-5 h-0.5 bg-ink"></span>
            </button>
            <h2 className="font-serif font-semibold text-lg mb-6 text-ink">
              Shopping Bag
            </h2>
            <div className="font-serif-body text-sm text-muted">
              Your bag is empty.
            </div>
          </div>
        </div>
      )}
    </>
  );
}
