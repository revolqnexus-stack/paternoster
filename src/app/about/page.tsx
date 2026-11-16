import Link from 'next/link';

export const metadata = {
  title: 'About — Pater Noster',
  description: 'About Pater Noster — reading, writing, and the life of the mind.',
};

export default function AboutPage() {
  return (
    <div className="page-wrap">
      <div className="page-container py-12 md:py-32">
        <div className="text-center mb-24 measure mx-auto">
          <h1 className="font-serif text-4xl md:text-5xl font-normal mb-4 text-ink leading-tight italic">
            About Pater Noster
          </h1>
          <p className="font-serif text-lg font-normal text-gray-light italic">
            Reading, writing, and the life of the mind
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="measure">
            <h2 className="font-serif text-2xl md:text-3xl font-normal mb-6 text-ink">
              Pater Noster
            </h2>
            <p className="font-serif-alt text-lg text-ink leading-relaxed mb-6">
              Pater Noster is an independent journal of writing and ideas. We
              publish essays, reviews, and criticism — and the books and objects
              that accompany them.
            </p>
            <p className="font-serif-alt text-lg text-ink leading-relaxed mb-6">
              We believe in slow reading, in difficult books, in writing that
              takes its time. In the life of the mind.
            </p>

            <div className="mt-12 p-8 bg-border rounded-lg">
              <h3 className="font-serif text-lg font-normal mb-3 text-ink">
                Visit the Magazine
              </h3>
              <p className="font-serif text-sm text-gray-light mb-4">
                Discover the latest issue, subscribe, and explore the archive
                at{' '}
                <Link
                  href="https://www.lrb.co.uk/"
                  className="text-navy hover:text-navy-light transition-colors underline underline-offset-2"
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
            <div className="aspect-[4/5] bg-border rounded-lg overflow-hidden">
              <div className="w-full h-full flex items-center justify-center text-gray-light text-6xl italic">
                📖
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
