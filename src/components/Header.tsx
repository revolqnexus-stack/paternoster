'use client';

import Link from 'next/link';
import { useCartStore } from '@/lib/store';
import { Menu, X, Search, ShoppingBag } from 'lucide-react';
import { useState } from 'react';
import CartDrawer from '@/components/CartDrawer';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const { lines } = useCartStore();
  const cartCount = lines.reduce((sum, line) => sum + line.quantity, 0);

  return (
    <>
      <header className="sticky top-0 z-50 bg-paper border-b border-border py-3 md:py-4">
        <div className="page-container">
          <div className="flex items-center justify-between py-1 md:py-2">
            {/* Left: hamburger */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="p-2 rounded hover:bg-paper/50 transition-colors"
                aria-label="Menu"
              >
                <Menu size={20} strokeWidth={2.5} />
              </button>
            </div>

            {/* Center: Logo */}
            <Link href="/" className="flex-shrink-0">
              <h1 className="font-serif text-3xl md:text-4xl font-normal text-ink tracking-tight italic">
                Pater Noster
              </h1>
            </Link>

            {/* Right: Cart + Subscribe */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setCartDrawerOpen(true)}
                className="relative p-2 rounded hover:bg-paper/50 transition-colors"
                aria-label="Cart"
              >
                <ShoppingBag size={18} strokeWidth={2} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-navy text-paper text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-medium">
                    {cartCount}
                  </span>
                )}
              </button>
              <a
                href="#subscribe"
                className="px-4 py-2 bg-navy text-paper text-[0.8rem] font-serif font-normal uppercase tracking-wider rounded hover:bg-navy-light transition-colors"
              >
                Subscribe
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Editorial hamburger menu — full screen overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-paper">
          {/* Close header */}
          <div className="page-container py-6 md:py-8 border-b border-border mb-12 md:mb-16">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-xl md:text-2xl font-normal text-ink tracking-tight italic">
                Menu
              </h2>
              <button
                onClick={() => setMenuOpen(false)}
                className="p-2 rounded hover:bg-paper/50 transition-colors"
              >
                <X size={20} strokeWidth={2.5} />
              </button>
            </div>
          </div>

          {/* Menu items — centered, editorial */}
          <nav className="page-container flex-1 flex flex-col items-center justify-center text-center">
            <Link
              href="/"
              className="block mb-8 md:mb-12 text-4xl md:text-5xl font-serif font-normal text-ink tracking-tight italic hover:text-navy transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/products"
              className="block mb-8 md:mb-12 text-4xl md:text-5xl font-serif font-normal text-ink tracking-tight italic hover:text-navy transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Shop
            </Link>
            <Link
              href="/collections/books"
              className="block mb-8 md:mb-12 text-4xl md:text-5xl font-serif font-normal text-ink tracking-tight italic hover:text-navy transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Books
            </Link>
            <Link
              href="/about"
              className="block mb-8 md:mb-12 text-4xl md:text-5xl font-serif font-normal text-ink tracking-tight italic hover:text-navy transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              About
            </Link>
            <a
              href="#subscribe"
              className="block mt-8 md:mt-12 text-xl md:text-2xl font-serif font-normal text-navy hover:text-navy-light transition-colors uppercase tracking-wider"
              onClick={() => setMenuOpen(false)}
            >
              Subscribe
            </a>
          </nav>
        </div>
      )}

      {/* Cart Drawer */}
      {cartDrawerOpen && (
        <CartDrawer isOpen={cartDrawerOpen} onClose={() => setCartDrawerOpen(false)} />
      )}
    </>
  );
}
