'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-border bg-paper py-12 md:py-24 z-10 relative overflow-hidden">
      <div className="page-container">
        {/* Top row: Shop, About, Newsletter — 12-col grid */}
        <div className="grid grid-cols-12 gap-8 mb-20 md:mb-32">
          {/* Shop */}
          <div className="col-span-4 md:col-span-3">
            <h3 className="font-display text-sm md:text-base font-normal text-ink italic mb-6 uppercase tracking-widest">
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

          {/* About */}
          <div className="col-span-4 md:col-span-3">
            <h3 className="font-display text-sm md:text-base font-normal text-ink italic mb-6 uppercase tracking-widest">
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
          <div className="col-span-4 md:col-span-6">
            <h3 className="font-display text-sm md:text-base font-normal text-ink italic mb-6 uppercase tracking-widest">
              Newsletter
            </h3>
            <p className="font-grotesk text-sm md:text-base text-gray-light mb-6">
              New writing, new books, new thinking. Delivered to your inbox.
            </p>
            <form className="flex flex-col lg:flex-row gap-3" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Email address"
                className="flex-1 px-4 py-3 bg-paper border-b border-border border-b-navy/30 text-ink font-grotesk text-sm md:text-base focus:outline-none focus:border-navy transition-colors placeholder-gray-light border-t-0 border-l-0 border-r-0"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-ink text-paper font-grotesk text-xs font-medium uppercase tracking-wider rounded hover:bg-navy-light transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <hr className="hairline mb-16 md:mb-24" />

        {/* Giant wordmark spanning full width */}
        <div className="flex justify-end mb-16 md:mb-24">
          <Link href="/" className="block">
            <span className="font-display font-normal text-ink italic leading-none tracking-[-0.04em] text-[clamp(2rem,6vw,5rem)] block">
              Pater Noster
            </span>
          </Link>
        </div>

        {/* Bottom bar */}
        <hr className="hairline mb-8 md:mb-12" />

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-[0.7rem] font-grotesk text-gray-light uppercase tracking-wider">
          <p>© {new Date().getFullYear()} Pater Noster</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="footer-link hover:text-navy transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="footer-link hover:text-navy transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
