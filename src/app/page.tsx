import { getProducts } from '@/lib/shopify';
import Hero from '@/components/Hero';
import ArticleCard from '@/components/ArticleCard';
import Marquee from '@/components/Marquee';
import ImageWithFallback from '@/components/ImageWithFallback';
import ScrollReveal from '@/components/ScrollReveal';
import { stockImage } from '@/lib/stock-images';

export const metadata = {
  title: 'Pater Noster',
  description: 'Pater Noster — reading, writing, and the life of the mind.',
};

interface Article {
  title: string;
  author: string;
  date: string | null;
  excerpt: string;
  image: string;
  imageAlt: string;
}

const ARTICLES: Article[] = [
  {
    title: 'Is curiosity good for us?',
    author: 'Adam Phillips',
    date: null,
    excerpt:
      'The superego — and its precursor, conscience — refers to the part of us that has no curiosity about ourselves. It’s the saboteur of curiosity about ourselves. And that part of us, like a narrow-minded fascist, has only one project: to destroy our pleasures in being alive by trying to kill our curiosity (or by making us frightened of our curiosity, which amounts to the same thing).',
    image: stockImage('reading'),
    imageAlt: 'Adam Phillips',
  },
  {
    title: '#TFA',
    author: 'Deborah Friedell',
    date: '11 November 2026',
    excerpt:
      'Since the 25th Amendment was ratified in 1967, the temporary transfer of presidential powers has become almost routine — usually for a colonoscopy.',
    image: stockImage('library'),
    imageAlt: 'Library books',
  },
  {
    title: 'Beyond Consent',
    author: 'Katie Tobin',
    date: '10 November 2026',
    excerpt:
      'Russell Brand has been sentenced to ten years in prison for raping one woman and sexually assaulting three others.',
    image: stockImage('desk'),
    imageAlt: 'Writing desk',
  },
  {
    title: 'Who owns the glen?',
    author: 'Fraser MacDonald',
    date: '5 November 2026',
    excerpt:
      'In March 1973, before taking his new play, The Cheviot, the Stag and the Black, Black Oil, around the village halls of the Highlands, John McGrath accepted a last-minute invitation…',
    image: stockImage('typewriter'),
    imageAlt: 'Typewriter',
  },
];

export default async function Home() {
  let products: any[] = [];
  try {
    products = await getProducts(6);
  } catch {
    products = [];
  }

  const [featured, ...rest] = ARTICLES;

  return (
    <div className="page-wrap relative z-10">
      {/* Hero */}
      <Hero
        kicker="FEATURED"
        title={featured.title}
        byline={featured.author}
        excerpt={featured.excerpt}
        image={featured.image}
        imageAlt={featured.imageAlt}
      />

      <hr className="hairline mb-12 md:mb-20" />

      {/* IN THIS ISSUE (LRB contents list) */}
      <ScrollReveal type="fade">
        <section className="section-md border-t border-hairline pt-12 md:pt-20">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10 md:mb-16">
            <div>
              <p className="section-kicker">In this issue</p>
              <h2 className="font-display font-bold text-[clamp(2.5rem,6vw,6rem)] leading-[1.1] tracking-[-0.02em] text-ink italic mb-2">
                Contents
              </h2>
            </div>
            <a
              href="/products"
              className="font-ui-sans text-xs font-medium text-blue uppercase tracking-wider underline underline-offset-2 hover:text-ink transition-colors"
            >
              View all →
            </a>
          </div>

          <div className="space-y-0">
            {rest.map((article, idx) => (
              <div
                key={article.title}
                className={`grid grid-cols-12 gap-6 border-b border-hairline pb-8 md:pb-12 ${
                  idx === 0 ? 'pt-0' : ''
                }`}
              >
                <div className="col-span-2 md:col-span-1 text-right hidden md:block">
                  <span className="font-ui-sans text-xs font-medium text-blue uppercase tracking-widest">
                    0{idx + 1}
                  </span>
                </div>
                <div className="col-span-10 md:col-span-8">
                  <p className="font-ui-sans text-[0.7rem] font-medium text-muted uppercase tracking-[0.18em] mb-1">
                    By {article.author}
                  </p>
                  <h3 className="font-text-serif font-medium text-[clamp(1.25rem,1.6vw,1.75rem)] leading-[1.25] text-ink mb-1 group-hover:text-blue transition-colors">
                    {article.title}
                  </h3>
                  {article.date && (
                    <p className="font-ui-sans text-xs text-muted">
                      {article.date}
                    </p>
                  )}
                </div>
                {/* Only first row gets excerpt */}
                {idx === 0 && (
                  <div className="col-span-12 md:col-span-10 md:col-start-3 mt-4 md:mt-0 md:row-span-1">
                    <p className="font-text-serif text-sm text-muted leading-relaxed max-w-[55ch]">
                      {article.excerpt}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      <hr className="hairline mb-12 md:mb-20" />

      {/* LATEST ESSAYS (Vogue asymmetric grid, LRB text) */}
      <section className="section-lg border-t border-hairline pt-12 md:pt-20">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12 md:mb-16">
          <div>
            <p className="section-kicker">Latest essays</p>
            <h2 className="font-display font-bold text-[clamp(2.5rem,6vw,6rem)] leading-[1.1] tracking-[-0.02em] text-ink italic">
              Writing
            </h2>
          </div>
        </div>

        <div className="grid-12">
          {rest.map((article, idx) => {
            const isLarge = idx % 3 === 0;
            return (
              <div
                key={article.title}
                className=""
                style={{ gridColumn: `span ${isLarge ? 7 : 5}` }}
              >
                <ArticleCard
                  title={article.title}
                  author={article.author}
                  date={article.date}
                  excerpt={article.excerpt}
                  image={article.image}
                  imageAlt={article.imageAlt}
                  index={idx}
                />
              </div>
            );
          })}
        </div>
      </section>

      <hr className="hairline mb-12 md:mb-20" />

      {/* PULL QUOTE */}
      <section className="bg-paper-2 py-16 md:py-24 text-center">
        <div className="page-container">
          <p className="font-display font-bold text-[clamp(3rem,8vw,5rem)] leading-[0.95] tracking-[-0.03em] text-ink italic mb-6">
            "Reading is a conversation with the mind."
          </p>
          <p className="font-ui-sans text-[0.6875rem] font-medium text-muted uppercase tracking-[0.2em]">
            — Pater Noster
          </p>
        </div>
      </section>

      <hr className="hairline mb-12 md:mb-20" />

      {/* MARQUEE */}
      <Marquee />

      <hr className="hairline mb-12 md:mb-20" />

      {/* THE SHOP SHELF (Fitzcarraldo - blue band) */}
      {products.length > 0 && (
        <section className="bg-blue text-blue-ink py-16 md:py-24">
          <div className="page-container">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12 md:mb-16">
              <div>
                <p className="label-caps mb-2 uppercase tracking-widest text-blue-ink/70">
                  The shop
                </p>
                <h2 className="font-display font-bold text-[clamp(2.5rem,6vw,4rem)] leading-[1.1] tracking-[-0.02em] text-blue-ink italic">
                  The Pater Noster Editions
                </h2>
              </div>
            </div>

            <div className="grid gap-8 md:grid-cols-5 justify-center">
              {products.map((product: any) => (
                <BookCard key={product.id} product={product} />
              ))}
            </div>

            <div className="flex flex-col md:flex-row justify-center gap-4 mt-12 md:mt-16">
              <a
                href="/products"
                className="px-6 py-3 border border-blue-ink text-blue-ink font-ui-sans text-xs font-medium uppercase tracking-wider hover:bg-blue-ink hover:text-paper transition-colors"
              >
                Shop all books
              </a>
              <a
                href="#subscribe"
                className="px-6 py-3 border border-blue-ink text-blue-ink font-ui-sans text-xs font-medium uppercase tracking-wider hover:bg-blue-ink hover:text-paper transition-colors"
              >
                Subscribe to the series
              </a>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

interface BookCardProps {
  product: any;
}

function BookCard({ product }: BookCardProps) {
  const images = product.images?.edges?.map((e: any) => e.node) || [];
  const price = parseFloat(product.priceRange.minVariantPrice.amount);

  return (
    <article className="flex flex-col items-center group">
      <div className="relative aspect-[2/3] bg-paper-2 overflow-hidden mb-4 group-hover:translate-y-[-8px] transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]">
        {images[0]?.url ? (
          <img
            src={images[0].url}
            alt={images[0].altText || product.title}
            className="w-full h-full object-cover"
            loading="lazy"
            data-cursor="view"
          />
        ) : (
          <ImageWithFallback
            src={stockImage('bookshelf')}
            alt={product.title}
            className="w-full h-full object-cover"
            fallbackKey="bookshelf"
          />
        )}
      </div>
      <h4 className="font-text-serif font-medium text-[clamp(1rem,1.6vw,1.125rem)] leading-[1.3] text-ink mb-1 text-center">
        {product.title}
      </h4>
      <p className="font-ui-sans text-[0.6875rem] font-medium text-muted uppercase tracking-[0.18em] mb-2 text-center">
        By {product.tags?.[0] || 'Editorial'}
      </p>
      <p className="font-ui-sans text-sm font-medium text-ink text-center">
        £{price.toFixed(2)}
      </p>
    </article>
  );
}
