import { getProducts } from '@/lib/shopify';
import Link from 'next/link';
import ImageWithFallback from '@/components/ImageWithFallback';
import { stockImage } from '@/lib/stock-images';

export const metadata = {
  title: 'Shop — Pater Noster',
  description: 'Browse the Pater Noster shop — books, editions, and objects.',
};

export default async function ProductsPage() {
  let products: any[] = [];
  try {
    products = await getProducts(40);
  } catch {
    products = [];
  }

  return (
    <div className="page-wrap">
      <div className="page-container">
        <h1 className="section-title mb-6">The Shop</h1>
        <p className="label mb-4">
          {products.length} items
        </p>

        {products.length === 0 ? (
          <p className="font-serif-body text-muted">
            No products found.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product: any) => (
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
