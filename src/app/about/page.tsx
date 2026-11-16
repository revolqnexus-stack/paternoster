import Link from 'next/link';

export const metadata = {
  title: 'About — Pater Noster',
  description: 'About Pater Noster — reading, writing, and the life of the mind.',
};

export default function AboutPage() {
  return (
    <div className="page-wrap">
      <div className="page-container">
        <h1 className="section-title mb-6">About Pater Noster</h1>
        <p className="font-serif-body text-lg leading-relaxed measure mb-6 text-ink">
          Pater Noster is an independent journal of writing and ideas. We publish
          essays, reviews, and criticism — and the books and objects that
          accompany them.
        </p>
        <p className="font-serif-body text-lg leading-relaxed measure mb-6 text-ink">
          We believe in slow reading, in difficult books, in writing that takes
          its time. In the life of the mind.
        </p>

        <hr className="section-divider my-8" />

        <div className="measure">
          <h2 className="text-lg font-serif font-semibold mb-2 text-ink">
            Visit the Magazine
          </h2>
          <p className="font-serif-body text-sm text-muted mb-4">
            Discover the latest issue, subscribe, and explore the archive at{' '}
            <Link
              href="https://www.lrb.co.uk/"
              className="text-ink underline underline-offset-2 hover:text-muted transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              lrb.co.uk
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
