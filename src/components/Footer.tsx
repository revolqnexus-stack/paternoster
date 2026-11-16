'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-hairline bg-paper py-16 mt-12">
      <div className="page-container">
        <hr className="hairline mb-12" />

        <div className="grid grid-cols-12 gap-8 mb-12">
          <div className="col-span-4 md:col-span-2">
            <h3 className="text-xs font-mono text-muted uppercase tracking-wider mb-4">
              Pater Noster
            </h3>
            <p className="font-serif-body text-sm text-muted leading-relaxed max-w-[45ch]">
              Independent journal of writing and ideas. Essays, reviews,
              criticism — and the books and objects that accompany them.
            </p>
          </div>
          <div className="col-span-4 md:col-span-2">
            <h3 className="text-xs font-mono text-muted uppercase tracking-wider mb-4">
              Shop
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/products" className="text-muted hover:text-ink transition-colors text-sm font-serif-body">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/collections/books" className="text-muted hover:text-ink transition-colors text-sm font-serif-body">
                  Books
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-span-4 md:col-span-2">
            <h3 className="text-xs font-mono text-muted uppercase tracking-wider mb-4">
              Journal
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-muted hover:text-ink transition-colors text-sm font-serif-body">
                  Essays
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted hover:text-ink transition-colors text-sm font-serif-body">
                  Reviews
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-span-4 md:col-span-2">
            <h3 className="text-xs font-mono text-muted uppercase tracking-wider mb-4">
              Visit
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="https://www.lrb.co.uk/"
                  className="text-muted hover:text-ink transition-colors text-sm font-serif-body italic"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  The London Review of Books
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <hr className="hairline mb-12" />

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-[0.6875rem] font-mono text-muted uppercase tracking-wider">
          <p>© {new Date().getFullYear()} Pater Noster</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-muted hover:text-ink transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-muted hover:text-ink transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
