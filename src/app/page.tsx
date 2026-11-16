import { getProducts } from '@/lib/shopify';
import Link from 'next/link';
import ImageWithFallback from '@/components/ImageWithFallback';
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
    <div className="page-wrap">
      {/* Featured article — large, text-first */}
      <section className="featured-article">
        <p className="featured-kicker">Featured</p>
        <h1 className="featured-title">
          {featured.title}
        </h1>
        <p className="featured-byline">
          By {featured.author}
        </p>
        <p className="featured-excerpt">
          {featured.excerpt}
        </p>
      </section>

      <hr className="section-divider" />

      {/* Contents list — LRB style */}
      <section className="article-list section">
        <h2 className="section-title">In this issue</h2>
        {rest.map((article, idx) => (
          <div
            key={article.title}
            className="article-row"
          >
            <div className="article-number">
              0{idx + 1}
            </div>
            <div className="article-content">
              <p className="article-author">
                {article.author}
              </p>
              <a
                href="/"
                className="article-title"
              >
                {article.title}
              </a>
              {article.date && (
                <p className="article-date">
                  {article.date}
                </p>
              )}
            </div>
          </div>
        ))}
      </section>

      <hr className="section-divider" />

      {/* Shop section — simple */}
      {products.length > 0 && (
        <section className="section-md border-t border-hairline pt-6">
          <h2 className="section-title">From the shop</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}
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
              className="w-full h-full object-cover"
              loading="lazy"
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
        <p className="article-card-category">
          Editorial
        </p>
        <a
          href={`/products/${product.handle}`}
          className="article-card-title"
        >
          {product.title}
        </a>
        <p className="article-card-price">
          £{price.toFixed(2)}
        </p>
      </article>
    </Link>
  );
}
