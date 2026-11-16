import { getProduct } from '@/lib/shopify';
import Link from 'next/link';
import ProductDetails from '@/components/ProductDetails';

export const metadata = {
  title: 'Product — Pater Noster',
};

export default async function ProductPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;

  let product;
  try {
    product = await getProduct(handle);
  } catch {
    product = null;
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-ivory py-20 px-6">
        <div className="max-w-prose mx-auto text-center">
          <h1 className="font-heading text-5xl font-normal mb-4 text-soft-black">
            Product Unavailable
          </h1>
          <p className="text-charcoal/60 mb-6">
            This product could not be loaded at the moment.
          </p>
          <Link
            href="/products"
            className="inline-block border-2 border-soft-black text-soft-black px-8 py-3 hover:bg-soft-black hover:text-ivory transition-all font-medium text-sm uppercase tracking-wider"
          >
            Browse Collection
          </Link>
        </div>
      </div>
    );
  }

  return <ProductDetails product={product} />;
}
