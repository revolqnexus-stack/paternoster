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
    <div className="page-wrap">
      <div className="page-container">
        <h1 className="section-title mb-6">{collectionTitle}</h1>
        <p className="label mb-4">
          {filteredProducts.length} items
        </p>

        {filteredProducts.length === 0 ? (
          <p className="font-serif-body text-muted">
            No items in this collection.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
      <article className="article-card">
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
