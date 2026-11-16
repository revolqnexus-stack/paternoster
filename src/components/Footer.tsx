'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-hairline bg-paper py-12 md:py-24 z-10 relative overflow-hidden">
      <div className="page-container">
        {/* Top row: 4 columns in text serif, small */}
        <div className="grid grid-cols-12 gap-8 mb-20 md:mb-32">
          {/* Shop */}
          <div className="col-span-3 md:col-span-2">
            <h3 className="font-text-serif font-medium text-xs md:text-sm text-ink mb-6 uppercase tracking-widest">
              Shop
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/products" className="footer-link">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/collections/books" className="footer-link">
                  Books
                </Link>
              </li>
              <li>
                <Link href="/collections/merchandise" className="footer-link">
                  Merchandise
                </Link>
              </li>
            </ul>
          </div>

          {/* Journal */}
          <div className="col-span-3 md:col-span-2">
            <h3 className="font-text-serif font-medium text-xs md:text-sm text-ink mb-6 uppercase tracking-widest">
              Journal
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="footer-link">
                  Essays
                </Link>
              </li>
              <li>
                <Link href="/about" className="footer-link">
                  Reviews
                </Link>
              </li>
            </ul>
          </div>

          {/* About */}
          <div className="col-span-3 md:col-span-2">
            <h3 className="font-text-serif font-medium text-xs md:text-sm text-ink mb-6 uppercase tracking-widest">
              About
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="footer-link">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/contact" className="footer-link">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-span-3 md:col-span-6">
            <h3 className="font-text-serif font-medium text-xs md:text-sm text-ink mb-4 uppercase tracking-widest">
              Newsletter
            </h3>
            <form className="flex flex-col lg:flex-row gap-3" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Email address"
                className="flex-1 px-4 py-3 bg-paper border-b border-hairline border-b-blue/40 text-ink font-ui-sans text-sm md:text-base focus:outline-none focus:border-blue transition-colors placeholder-muted border-t-0 border-l-0 border-r-0"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-blue text-blue-ink font-ui-sans text-xs font-medium uppercase tracking-wider rounded-sm hover:bg-ink hover:text-blue-ink transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <hr className="hairline mb-16 md:mb-24" />

        {/* Giant wordmark spanning full width — Didone, bleeds off bottom */}
        <div className="flex justify-end mb-20 md:mb-32">
          <Link href="/" className="block">
            <span className="font-display font-bold text-[clamp(3rem,8vw,6rem)] leading-[0.8] tracking-[-0.04em] text-ink italic block">
              Pater Noster
            </span>
          </Link>
        </div>

        {/* Bottom bar */}
        <hr className="hairline mb-8 md:mb-12" />

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-[0.6875rem] font-ui-sans text-muted uppercase tracking-wider">
          <p>© {new Date().getFullYear()} Pater Noster</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="footer-link hover:text-blue transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="footer-link hover:text-blue transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
