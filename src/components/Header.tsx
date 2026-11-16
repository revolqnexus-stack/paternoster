'use client';

import Link from 'next/link';
import { useCartStore } from '@/lib/store';
import { ShoppingBag, Search, Menu, X, User } from 'lucide-react';
import { useState } from 'react';
import CartDrawer from '@/components/CartDrawer';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const { lines, openCart } = useCartStore();
  const cartCount = lines.reduce((sum, line) => sum + line.quantity, 0);

  return (
    <header className="sticky top-0 z-50 bg-ivory border-b border-border-subtle backdrop-blur-sm bg-opacity-95">
      <div className="max-w-container mx-auto px-6">
        {/* Top Bar */}
        <div className="flex items-center justify-between py-6">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <h1 className="font-heading text-3xl font-normal text-soft-black tracking-tight">
              Pater Noster
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 text-sm uppercase tracking-wider">
            <Link href="/products" className="text-charcoal hover:text-burgundy transition-colors">
              Shop
            </Link>
            <Link href="/collections/books" className="text-charcoal hover:text-burgundy transition-colors">
              Books
            </Link>
            <Link href="/collections/merchandise" className="text-charcoal hover:text-burgundy transition-colors">
              Merchandise
            </Link>
            <Link href="/about" className="text-charcoal hover:text-burgundy transition-colors">
              About
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button
              className="hidden md:block text-charcoal hover:text-burgundy transition-colors"
              aria-label="Search"
            >
              <Search size={20} />
            </button>

            <Link
              href="/account"
              className="hidden md:block text-charcoal hover:text-burgundy transition-colors"
              aria-label="Account"
            >
              <User size={20} />
            </Link>

            <button
              onClick={() => setCartDrawerOpen(true)}
              className="relative text-charcoal hover:text-burgundy transition-colors"
              aria-label="Open cart"
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-burgundy text-ivory text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-charcoal"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <nav className="md:hidden pb-6 border-t border-border-subtle pt-6 space-y-4">
            <Link
              href="/products"
              className="block text-charcoal hover:text-burgundy transition-colors uppercase tracking-wider text-sm"
              onClick={() => setMenuOpen(false)}
            >
              Shop
            </Link>
            <Link
              href="/collections/books"
              className="block text-charcoal hover:text-burgundy transition-colors uppercase tracking-wider text-sm"
              onClick={() => setMenuOpen(false)}
            >
              Books
            </Link>
            <Link
              href="/collections/merchandise"
              className="block text-charcoal hover:text-burgundy transition-colors uppercase tracking-wider text-sm"
              onClick={() => setMenuOpen(false)}
            >
              Merchandise
            </Link>
            <Link
              href="/about"
              className="block text-charcoal hover:text-burgundy transition-colors uppercase tracking-wider text-sm"
              onClick={() => setMenuOpen(false)}
            >
              About
            </Link>
            <div className="pt-4 border-t border-border-subtle flex gap-6">
              <button className="text-charcoal hover:text-burgundy transition-colors text-sm uppercase tracking-wider">
                Search
              </button>
              <Link
                href="/account"
                className="text-charcoal hover:text-burgundy transition-colors text-sm uppercase tracking-wider"
              >
                Account
              </Link>
            </div>
          </nav>
        )}
      </div>

      {cartDrawerOpen && (
        <CartDrawer isOpen={cartDrawerOpen} onClose={() => setCartDrawerOpen(false)} />
      )}
    </header>
  );
}
