import { getProducts } from '@/lib/shopify';
import Link from 'next/link';

export const metadata = {
  title: 'Pater Noster',
  description: 'Pater Noster — reading, writing, and the life of the mind.',
};

export default async function Home() {
  let products: any[] = [];
  try {
    products = await getProducts(6);
  } catch {
    products = [];
  }

  return (
    <div className="min-h-screen bg-paper">
      {/* Announcement bar */}
      <div className="bg-navy text-paper text-center py-2 px-4 text-[11px] font-serif uppercase tracking-wider">
        Pater Noster — new writing, new books, new thinking
      </div>

      <div className="max-w-measure mx-auto px-6 py-12 md:py-20">
        {/* Featured essay */}
        <section className="mb-24">
          <h2 className="font-serif text-4xl md:text-5xl font-normal mb-6 text-ink leading-tight italic">
            Is curiosity good for us?
          </h2>
          <p className="font-serif text-lg md:text-xl font-normal text-gray-light mb-4 italic">
            Adam Phillips
          </p>
          <p className="font-serif-alt text-lg md:text-xl text-ink leading-relaxed">
            The superego — and its precursor, conscience — refers to the part of us
            that has no curiosity about ourselves. It’s the saboteur of curiosity
            about ourselves. And that part of us, like a narrow-minded fascist, has
            only one project: to destroy our pleasures in being alive by trying to
            kill our curiosity (or by making us frightened of our curiosity, which
            amounts to the same thing).
          </p>
          <hr className="section-divider" />
        </section>

        {/* Second article */}
        <section className="mb-24">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h3 className="font-serif text-2xl md:text-3xl font-normal mb-3 text-ink leading-tight">
                #TFA
              </h3>
              <p className="font-serif text-base font-normal text-gray-light mb-3 italic">
                Deborah Friedell · 11 November 2026
              </p>
              <p className="font-serif-alt text-lg text-ink leading-relaxed mb-4">
                Since the 25th Amendment was ratified in 1967, the temporary transfer
                of presidential powers has become almost routine — usually for a
                colonoscopy.
              </p>
              <Link
                href="/"
                className="inline-block font-serif text-base font-normal text-navy italic"
              >
                Read more ›
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="aspect-[4/5] bg-border rounded-lg overflow-hidden">
                <div className="w-full h-full flex items-center justify-center text-gray-light text-sm italic">
                  Image
                </div>
              </div>
            </div>
          </div>
          <hr className="section-divider mt-8" />
        </section>

        {/* Third article */}
        <section className="mb-24">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="order-2 md:order-1">
              <h3 className="font-serif text-2xl md:text-3xl font-normal mb-3 text-ink leading-tight">
                Beyond Consent
              </h3>
              <p className="font-serif text-base font-normal text-gray-light mb-3 italic">
                Katie Tobin · 10 November 2026
              </p>
              <p className="font-serif-alt text-lg text-ink leading-relaxed mb-4">
                Russell Brand has been sentenced to ten years in prison for raping
                one woman and sexually assaulting three others.
              </p>
              <Link
                href="/"
                className="inline-block font-serif text-base font-normal text-navy italic"
              >
                Read more ›
              </Link>
            </div>
            <div className="order-1 md:order-2 hidden md:block">
              <div className="aspect-[4/5] bg-border rounded-lg overflow-hidden">
                <div className="w-full h-full flex items-center justify-center text-gray-light text-sm italic">
                  Image
                </div>
              </div>
            </div>
          </div>
          <hr className="section-divider mt-8" />
        </section>

        {/* Fourth article */}
        <section className="mb-24">
          <h3 className="font-serif text-2xl md:text-3xl font-normal mb-3 text-ink leading-tight">
            Who owns the glen?
          </h3>
          <p className="font-serif text-base font-normal text-gray-light mb-4 italic">
            Fraser MacDonald · 5 November 2026
          </p>
          <p className="font-serif-alt text-lg text-ink leading-relaxed mb-6">
            In March 1973, before taking his new play, The Cheviot, the Stag and the
            Black, Black Oil, around the village halls of the Highlands, John McGrath
            accepted a last-minute invitation…
          </p>
          <Link
            href="/"
            className="inline-block font-serif text-base font-normal text-navy italic"
          >
            Read more ›
          </Link>
        </section>
      </div>

      {/* Shop section — subtle */}
      {products.length > 0 && (
        <section className="py-20 border-t border-border">
          <div className="max-w-measure mx-auto px-6">
            <div className="flex justify-between items-end mb-8">
              <div>
                <h2 className="font-serif text-2xl font-normal mb-2 text-ink">
                  From the shop
                </h2>
                <p className="font-serif text-base font-normal text-gray-light italic">
                  Books, editions, and objects
                </p>
              </div>
              <Link
                href="/products"
                className="font-serif text-base font-normal text-navy italic underline underline-offset-2"
              >
                View all ›
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {products.map((product: any) => {
                const image = product.images?.edges?.[0]?.node;
                const price = parseFloat(product.priceRange.minVariantPrice.amount);

                return (
                  <Link
                    key={product.id}
                    href={`/products/${product.handle}`}
                    className="block"
                  >
                    <div className="mb-4">
                      <div className="aspect-square bg-border rounded overflow-hidden mb-3">
                        {image?.url ? (
                          <img
                            src={image.url}
                            alt={image.altText || product.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-light text-[10px] uppercase tracking-wider">
                            📦
                          </div>
                        )}
                      </div>
                      <h4 className="font-serif text-base font-normal mb-1 text-ink leading-tight">
                        {product.title}
                      </h4>
                      <p className="font-serif text-sm font-normal text-gray">
                        £{price.toFixed(2)}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Subscribe section */}
      <section id="subscribe" className="py-20 border-t border-border">
        <div className="max-w-measure mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl font-normal mb-4 text-ink">
            Subscribe to Pater Noster
          </h2>
          <p className="font-serif text-lg font-normal text-gray-light mb-8">
            New writing, new books, new thinking. Delivered to your inbox.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <input
              type="email"
              placeholder="Email address"
              className="flex-1 max-w-md px-4 py-3 bg-paper border border-border rounded text-ink focus:outline-none focus:border-navy"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-navy text-paper text-xs font-serif uppercase tracking-wider rounded hover:bg-navy-light transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      <hr className="section-divider" />

      {/* Footer */}
      <footer className="py-12 px-6">
        <div className="max-w-measure mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <p className="font-serif text-sm font-normal text-gray-light">
              © {new Date().getFullYear()} Pater Noster
            </p>
            <div className="flex gap-6">
              <Link
                href="/about"
                className="font-serif text-sm font-normal text-gray-light hover:text-navy transition-colors"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="font-serif text-sm font-normal text-gray-light hover:text-navy transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>
          <p className="font-serif text-xs font-normal text-gray-light">
            Pater Noster is an independent journal of writing and ideas.
          </p>
        </div>
      </footer>
    </div>
  );
}
