import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-border-subtle bg-warm-white">
      <div className="max-w-container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="font-heading text-2xl font-normal mb-4 text-soft-black">
              Pater Noster
            </h3>
            <p className="text-sm text-charcoal/80 leading-relaxed">
              The official store of <em>The London Review of Books</em>. 
              Authentic merchandise for readers worldwide.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-sm uppercase tracking-wider mb-4 text-charcoal font-medium">Shop</h4>
            <ul className="space-y-2 text-sm text-charcoal/80">
              <li><Link href="/products" className="hover:text-burgundy transition-colors">All Products</Link></li>
              <li><Link href="/collections/books" className="hover:text-burgundy transition-colors">Books</Link></li>
              <li><Link href="/collections/merchandise" className="hover:text-burgundy transition-colors">Merchandise</Link></li>
              <li><Link href="/collections/subscriptions" className="hover:text-burgundy transition-colors">Subscriptions</Link></li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="text-sm uppercase tracking-wider mb-4 text-charcoal font-medium">About</h4>
            <ul className="space-y-2 text-sm text-charcoal/80">
              <li><Link href="/about" className="hover:text-burgundy transition-colors">Our Story</Link></li>
              <li><Link href="/contact" className="hover:text-burgundy transition-colors">Contact</Link></li>
              <li><Link href="/shipping" className="hover:text-burgundy transition-colors">Shipping</Link></li>
              <li><Link href="/returns" className="hover:text-burgundy transition-colors">Returns</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-sm uppercase tracking-wider mb-4 text-charcoal font-medium">Newsletter</h4>
            <p className="text-sm text-charcoal/80 mb-4">
              Receive updates on new arrivals and exclusive offers.
            </p>
            <form className="flex border border-border-subtle">
              <input
                type="email"
                placeholder="Email address"
                className="flex-1 px-4 py-2 bg-ivory text-sm focus:outline-none"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-soft-black text-ivory hover:bg-burgundy transition-colors text-sm uppercase tracking-wider"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border-subtle flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-charcoal/60">
          <p>&copy; 2026 Pater Noster — The London Review of Books Store. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-burgundy transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-burgundy transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
