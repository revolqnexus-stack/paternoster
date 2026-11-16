import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-border bg-paper py-12 md:py-24 z-10 relative">
      <div className="page-container">
        {/* Giant wordmark spanning full width */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 mb-16 md:mb-24 border-b border-border pb-8 md:pb-16">
          <div>
            <Link href="/" className="block">
              <h1 className="font-display text-4xl md:text-6xl font-normal text-ink italic leading-none tracking-tight">
                Pater Noster
              </h1>
            </Link>
            <p className="font-grotesk text-xs font-medium text-gray-light uppercase tracking-widest mt-2 md:mt-3">
              Independent journal of writing and ideas
            </p>
          </div>
          <nav className="flex gap-4 lg:gap-8 text-center lg:text-left">
            <Link
              href="/products"
              className="footer-link"
            >
              Shop
            </Link>
            <Link
              href="/collections/books"
              className="footer-link"
            >
              Books
            </Link>
            <Link
              href="/about"
              className="footer-link"
            >
              About
            </Link>
          </nav>
        </div>

        {/* Newsletter — single underlined field */}
        <div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-12 md:mb-16">
          <div className="flex-1 relative">
            <input
              type="email"
              placeholder="Email address"
              className="w-full px-4 py-3 bg-paper border-b border-border border-b-navy/30 text-ink font-grotesk text-sm md:text-base focus:outline-none focus:border-navy transition-colors placeholder-gray-light"
            />
          </div>
          <button
            className="px-6 py-3 bg-ink text-paper font-grotesk text-xs font-medium uppercase tracking-wider rounded hover:bg-navy-light transition-colors"
          >
            Subscribe
          </button>
        </div>

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
