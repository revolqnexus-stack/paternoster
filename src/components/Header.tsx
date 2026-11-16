'use client';

import Link from 'next/link';
import { useCartStore } from '@/lib/store';
import { Menu, Search, ShoppingBag } from 'lucide-react';
import { useState } from 'react';
import CartDrawer from '@/components/CartDrawer';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const { lines } = useCartStore();
  const cartCount = lines.reduce((sum, line) => sum + line.quantity, 0);

  return (
    <>
      <header className="sticky top-0 z-50 bg-paper border-b border-border py-3">
        <div className="page-container">
          <div className="flex items-center justify-between py-2">
            {/* Left: hamburger + search */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="p-2 rounded hover:bg-paper/50 transition-colors"
                aria-label="Menu"
              >
                <Menu size={20} strokeWidth={2.5} />
              </button>
              <button
                className="hidden md:block p-2 rounded hover:bg-paper/50 transition-colors"
                aria-label="Search"
              >
                <Search size={16} strokeWidth={2} />
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

      {/* Mobile menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-paper flex flex-col">
          <div className="p-4 border-b border-border flex justify-between items-center">
            <h2 className="font-serif text-lg font-normal text-ink">Menu</h2>
            <button
              onClick={() => setMenuOpen(false)}
              className="p-2 rounded hover:bg-paper/50"
            >
              <span className="block w-6 h-0.5 bg-ink mb-1"></span>
              <span className="block w-6 h-0.5 bg-ink"></span>
            </button>
          </div>
          <nav className="flex-1 overflow-y-auto p-4 space-y-3">
            <Link
              href="/"
              className="block text-lg font-serif font-normal text-ink hover:text-navy transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/products"
              className="block text-lg font-serif font-normal text-ink hover:text-navy transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Shop
            </Link>
            <Link
              href="/collections/books"
              className="block text-lg font-serif font-normal text-ink hover:text-navy transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Books
            </Link>
            <Link
              href="/about"
              className="block text-lg font-serif font-normal text-ink hover:text-navy transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              About
            </Link>
            <div className="pt-3 border-t border-border">
              <a
                href="#subscribe"
                className="block text-lg font-serif font-normal text-navy hover:text-navy-light transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                Subscribe
              </a>
            </div>
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
