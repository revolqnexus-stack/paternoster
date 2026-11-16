import { getProducts } from '@/lib/shopify';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';

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
    <div className="min-h-screen bg-paper">
      <div className="max-w-measure mx-auto px-6 py-12 md:py-20">
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
          <div className="text-center py-24">
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
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
