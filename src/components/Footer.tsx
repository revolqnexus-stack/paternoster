import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-border bg-paper py-12 px-6">
      <div className="page-container">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <h3 className="font-serif text-2xl font-normal mb-4 text-ink italic">
              Pater Noster
            </h3>
            <p className="font-serif-alt text-sm text-gray-light leading-relaxed">
              Pater Noster is an independent journal of writing and ideas. Reading,
              writing, and the life of the mind.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="footer-heading">Shop</h4>
            <ul className="space-y-2">
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
          <div>
            <h4 className="footer-heading">About</h4>
            <ul className="space-y-2">
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
          <div>
            <h4 className="footer-heading">Newsletter</h4>
            <p className="font-serif-alt text-sm text-gray-light mb-4">
              New writing, new books, new thinking. Delivered to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Email address"
                className="flex-1 px-4 py-3 bg-paper border border-border rounded text-ink focus:outline-none focus:border-navy"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-navy text-paper text-xs font-serif font-normal uppercase tracking-wider rounded hover:bg-navy-light transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <hr className="section-divider" />

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs text-gray-light">
          <p>© {new Date().getFullYear()} Pater Noster</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="footer-link">
              Privacy Policy
            </Link>
            <Link href="/terms" className="footer-link">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
