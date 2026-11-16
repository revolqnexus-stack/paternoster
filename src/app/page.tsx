import { getProducts } from '@/lib/shopify';
import Link from 'next/link';
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

  const [featured, ...secondary] = ARTICLES;

  return (
    <div className="page-wrap">
      <div className="page-container py-12 md:py-24">
        {/* Featured story */}
        <section className="featured-article mb-12 md:mb-20">
          <div className="featured-article-image">
            <img
              src={featured.image}
              alt={featured.imageAlt}
              className="w-full h-auto max-h-[500px] object-cover"
            />
          </div>
          <div className="featured-article-content">
            <span className="section-kicker">Featured</span>
            <h1 className="featured-article-title mb-4">
              {featured.title}
            </h1>
            <p className="label-caps mb-2 uppercase tracking-wider text-gray-light">
              By {featured.author}
            </p>
            <p className="featured-article-excerpt">
              {featured.excerpt}
            </p>
          </div>
        </section>

        <hr className="section-divider" />

        {/* Secondary articles */}
        <section className="secondary-grid mb-12 md:mb-20">
          {secondary.map((article, idx) => (
            <article
              key={article.title}
              className="article-card border-t border-border pt-6 lg:grid-cols-2 lg:gap-8 lg:items-center"
            >
              {idx % 2 === 0 ? (
                <>
                  <div className="order-2 md:order-1">
                    <h3 className="article-card-title mb-3">
                      {article.title}
                    </h3>
                    <p className="label-caps mb-2 uppercase tracking-wider text-gray-light">
                      By {article.author}
                    </p>
                    {article.date && (
                      <p className="text-xs font-serif text-gray-light mb-4">
                        {article.date}
                      </p>
                    )}
                    <p className="font-serif-alt text-lg text-ink leading-relaxed mb-4">
                      {article.excerpt}
                    </p>
                    <Link
                      href="/"
                      className="text-base font-normal text-navy italic underline underline-offset-2"
                    >
                      Read more ›
                    </Link>
                  </div>
                  <div className="order-1 md:order-2">
                    <div className="article-card-image">
                      <img
                        src={article.image}
                        alt={article.imageAlt}
                        className="w-full h-auto max-h-[400px] object-cover"
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="order-1 md:order-1">
                    <div className="article-card-image">
                      <img
                        src={article.image}
                        alt={article.imageAlt}
                        className="w-full h-auto max-h-[400px] object-cover"
                      />
                    </div>
                  </div>
                  <div className="order-2 md:order-2">
                    <h3 className="article-card-title mb-3">
                      {article.title}
                    </h3>
                    <p className="label-caps mb-2 uppercase tracking-wider text-gray-light">
                      By {article.author}
                    </p>
                    {article.date && (
                      <p className="text-xs font-serif text-gray-light mb-4">
                        {article.date}
                      </p>
                    )}
                    <p className="font-serif-alt text-lg text-ink leading-relaxed mb-4">
                      {article.excerpt}
                    </p>
                    <Link
                      href="/"
                      className="text-base font-normal text-navy italic underline underline-offset-2"
                    >
                      Read more ›
                    </Link>
                  </div>
                </>
              )}
            </article>
          ))}
        </section>

        <hr className="section-divider" />

        {/* Shop section */}
        {products.length > 0 && (
          <section className="section-md border-t border-border">
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
            <div className="article-grid">
              {products.map((product: any) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

interface ProductCardProps {
  product: any;
}

function ProductCard({ product }: ProductCardProps) {
  const image = product.images?.edges?.[0]?.node;
  const price = parseFloat(product.priceRange.minVariantPrice.amount);

  return (
    <Link key={product.id} href={`/products/${product.handle}`} className="block">
      <article className="article-card">
        <div className="article-card-image">
          {image?.url ? (
            <img
              src={image.url}
              alt={image.altText || product.title}
              className="w-full h-auto max-h-[400px] object-cover"
            />
          ) : (
            <img
              src={stockImage('bookshelf')}
              alt={product.title}
              className="w-full h-auto max-h-[400px] object-cover"
            />
          )}
        </div>
        <h4 className="article-card-title mb-3">
          {product.title}
        </h4>
        <p className="font-serif text-sm font-normal text-gray">
          £{price.toFixed(2)}
        </p>
      </article>
    </Link>
  );
}
