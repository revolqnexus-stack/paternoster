import { getProducts } from '@/lib/shopify';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';

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
      <div className="page-container py-12 md:py-24">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-16">
          <div>
            <h1 className="font-serif text-4xl md:text-5xl font-normal mb-2 text-ink leading-tight">
              {collectionTitle}
            </h1>
            <p className="font-serif text-lg font-normal text-gray-light italic">
              Curated from Pater Noster
            </p>
          </div>
          <p className="font-serif text-sm font-normal text-gray-light uppercase tracking-wider">
            {filteredProducts.length} items
          </p>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-24 measure mx-auto">
            <p className="font-serif text-lg text-gray-light mb-6">
              No items in this collection.
            </p>
            <Link
              href="/products"
              className="font-serif text-base font-normal text-navy italic underline underline-offset-2"
            >
              Browse All ›
            </Link>
          </div>
        ) : (
          <div className="article-grid">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
