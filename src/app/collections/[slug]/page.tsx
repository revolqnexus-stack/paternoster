import { getProducts } from '@/lib/shopify';
import Link from 'next/link';
import ImageWithFallback from '@/components/ImageWithFallback';
import { stockImage } from '@/lib/stock-images';

export const metadata = {
  title: 'Collection — Pater Noster',
  description: 'Curated selection from Pater Noster.',
};

export const dynamic = 'force-dynamic';

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let products: any[] = [];
  try {
    products = await getProducts(40);
  } catch {
    products = [];
  }

  const filteredProducts = slug === 'all'
    ? products
    : products.filter((p: any) =>
        p.tags.some((t: string) => t.toLowerCase().includes(slug.toLowerCase()))
      );

  const collectionTitle =
    slug === 'books' ? 'Books' : slug === 'merchandise' ? 'Merchandise' : slug;

  return (
    <div className="page-wrap relative z-10">
      <div className="page-container py-12 md:py-32">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-20">
          <div>
            <p className="section-kicker">Collection</p>
            <h1 className="font-display font-bold text-[clamp(3rem,8vw,5rem)] leading-[1.1] tracking-[-0.02em] text-ink mb-2 italic">
              {collectionTitle}
            </h1>
            <p className="font-ui-sans text-xs font-medium text-muted uppercase tracking-widest">
              Curated from Pater Noster
            </p>
          </div>
          <p className="font-ui-sans text-xs font-medium text-muted uppercase tracking-widest">
            {filteredProducts.length} items
          </p>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-32 measure mx-auto">
            <p className="font-text-serif text-lg text-muted italic mb-6">
              No items in this collection.
            </p>
            <Link
              href="/products"
              className="font-ui-sans text-base font-medium text-blue underline underline-offset-2 hover:text-ink transition-colors"
            >
              Browse All →
            </Link>
          </div>
        ) : (
          <div className="grid gap-12 md:grid-cols-3 lg:grid-cols-4">
            {filteredProducts.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
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
          <p className="label-caps mb-2 uppercase tracking-widest text-blue">
            Editorial
          </p>
          <h4 className="article-card-title mb-2 group-hover:text-blue transition-colors duration-300">
            {product.title}
          </h4>
          <p className="font-ui-sans text-sm font-medium text-ink mt-auto">
            £{price.toFixed(2)}
          </p>
        </div>
      </article>
    </Link>
  );
}
