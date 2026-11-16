import Link from 'next/link';

export const metadata = {
  title: 'About — Pater Noster',
  description: 'About Pater Noster, the official store of The London Review of Books.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-ivory">
      {/* Announcement Bar */}
      <div className="bg-burgundy text-ivory text-center py-2 px-4 text-sm">
        Free UK shipping on orders over £50
      </div>

      <div className="max-w-prose mx-auto px-6 py-20 md:py-32">
        {/* Hero */}
        <div className="text-center mb-20">
          <h1 className="font-heading text-5xl md:text-7xl font-normal mb-4 text-soft-black leading-tight">
            About Pater Noster
          </h1>
          <p className="font-heading text-xl text-charcoal font-light italic">
            The official store of The London Review of Books
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="font-heading text-3xl md:text-4xl font-normal mb-6 text-soft-black">
              The LRB Store
            </h2>
            <p className="text-base md:text-lg text-charcoal/90 leading-relaxed mb-6">
              Pater Noster is the official store of{' '}
              <em className="italic">The London Review of Books</em>, Europe's
              leading magazine of culture and ideas. Published twice a month,
              the LRB provides a space for some of the world's best writers to
              explore a wide variety of subjects in exhilarating detail.
            </p>
            <p className="text-base md:text-lg text-charcoal/90 leading-relaxed mb-6">
              We offer authentic LRB merchandise to readers and fans around
              the world — from exclusive books and audiobooks to
              limited-edition tote bags and subscriptions.
            </p>

            <div className="mt-12 p-8 bg-cream border border-border-subtle rounded-lg">
              <h3 className="font-heading text-lg font-normal mb-3 text-soft-black">
                Visit the Magazine
              </h3>
              <p className="text-sm text-charcoal/80 mb-4">
                Discover the latest issue, subscribe, and explore the archive
                at{' '}
                <Link
                  href="https://lrb.co.uk"
                  className="text-burgundy hover:underline transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  lrb.co.uk
                </Link>
                .
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <div className="aspect-[4/5] bg-cream border border-border-subtle rounded-lg overflow-hidden">
              <div className="w-full h-full flex items-center justify-center text-charcoal/20 text-6xl">
                📖
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <section className="border-t border-border-subtle py-16 md:py-20 px-6 bg-warm-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-heading text-2xl md:text-3xl font-normal mb-4 text-soft-black">
            Stay Informed
          </h2>
          <p className="text-charcoal/80 mb-6">
            Receive updates on new arrivals, exclusive offers, and literary news.
          </p>
          <form className="flex max-w-md mx-auto border-2 border-soft-black">
            <input
              type="email"
              placeholder="Email address"
              className="flex-1 px-4 py-3 bg-ivory text-sm focus:outline-none"
              required
            />
            <button
              type="submit"
              className="px-6 py-3 bg-soft-black text-ivory hover:bg-burgundy transition-colors text-sm uppercase tracking-wider font-medium"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
