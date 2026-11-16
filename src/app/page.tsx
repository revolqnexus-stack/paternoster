import { getProducts } from '@/lib/shopify';
import Link from 'next/link';
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
      {/* Hero — full-bleed, giant overlapping headline */}
      <Hero
        kicker="FEATURED"
        title={featured.title}
        byline={featured.author}
        excerpt={featured.excerpt}
        image={featured.image}
        imageAlt={featured.imageAlt}
      />

      <hr className="hairline mb-12 md:mb-20" />

      {/* Secondary articles — asymmetric grid: large span 7 + small span 5, alternating */}
      <ScrollReveal type="fade">
        <section className="grid-12">
          {rest.map((article, idx) => {
            const isLarge = idx % 3 === 0;
            const isLeft = idx % 2 === 0;

            return (
              <div
                key={article.title}
                className={`${
                  isLeft ? '' : 'md:self-start'
                }`}
              >
                <ArticleCard
                  title={article.title}
                  author={article.author}
                  date={article.date}
                  excerpt={article.excerpt}
                  image={article.image}
                  imageAlt={article.imageAlt}
                  span={isLarge ? 7 : 5}
                  index={idx}
                />
              </div>
            );
          })}
        </section>
      </ScrollReveal>

      <hr className="hairline mb-12 md:mb-20" />

      {/* Marquee ticker */}
      <Marquee />

      <hr className="hairline mb-12 md:mb-20" />

      {/* Shop section */}
      {products.length > 0 && (
        <section className="section-lg border-t border-border pt-12 md:pt-20">
          <ScrollReveal type="fade">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-12 md:mb-16">
              <div>
                <p className="section-kicker">From the shop</p>
                <h2 className="font-display text-3xl md:text-4xl font-normal mb-2 text-ink leading-tight italic">
                  Books, editions, objects
                </h2>
                <p className="font-grotesk text-sm md:text-base text-gray-light italic">
                  Curated from Pater Noster
                </p>
              </div>
              <a
                href="/products"
                className="font-grotesk text-sm font-medium text-navy italic underline underline-offset-2 hover:text-navy-light transition-colors"
              >
                View all →
              </a>
            </div>
          </ScrollReveal>
          <div className="grid gap-8 md:grid-cols-3 lg:grid-cols-4">
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
  const images = product.images?.edges?.map((e: any) => e.node) || [];
  const price = parseFloat(product.priceRange.minVariantPrice.amount);

  return (
    <Link key={product.id} href={`/products/${product.handle}`} className="block">
      <article className="article-card group relative">
        <div className="article-card-image">
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
        <div className="p-4 pt-3 flex flex-col h-full">
          <p className="label-caps mb-2 uppercase tracking-widest">
            Editorial
          </p>
          <h4 className="article-card-title mb-2 group-hover:text-navy-light transition-colors duration-300">
            {product.title}
          </h4>
          <p className="font-grotesk text-sm font-medium text-navy mt-auto">
            £{price.toFixed(2)}
          </p>
        </div>
      </article>
    </Link>
  );
}
