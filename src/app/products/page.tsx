import { getProducts } from '@/lib/shopify';
import Link from 'next/link';
import Image from 'next/image';
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
      <div className="page-container py-12 md:py-24">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-16">
          <div>
            <h1 className="font-serif text-4xl md:text-5xl font-normal mb-2 text-ink leading-tight">
              The Shop
            </h1>
            <p className="font-serif text-lg font-normal text-gray-light italic">
              Books, editions, and objects
            </p>
          </div>
          <p className="font-serif text-sm font-normal text-gray-light uppercase tracking-wider">
            {products.length} items
          </p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-24 measure">
            <p className="font-serif text-lg text-gray-light mb-6">
              No products found.
            </p>
            <Link
              href="/"
              className="font-serif text-base font-normal text-navy italic underline underline-offset-2"
            >
              Back to Home ›
            </Link>
          </div>
        ) : (
          <div className="article-grid">
            {products.map((product) => (
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
  const image = product.images?.edges?.[0]?.node;
  const price = parseFloat(product.priceRange.minVariantPrice.amount);

  return (
    <Link key={product.id} href={`/products/${product.handle}`} className="block">
      <article className="article-card">
        <div className="article-card-image">
          {image?.url ? (
            <Image
              src={image.url}
              alt={image.altText || product.title}
              fill
              className="object-cover"
            />
          ) : (
            <Image
              src={stockImage('bookshelf')}
              alt={product.title}
              fill
              className="object-cover"
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
