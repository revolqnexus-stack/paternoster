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
      <div className="page-wrap">
        <div className="page-container py-20 md:py-32">
          <div className="text-center measure mx-auto">
            <h1 className="font-serif text-4xl font-normal mb-4 text-ink leading-tight">
              Product Unavailable
            </h1>
            <p className="font-serif text-lg text-gray-light mb-6">
              This product could not be loaded at the moment.
            </p>
            <Link
              href="/products"
              className="font-serif text-base font-normal text-navy italic underline underline-offset-2"
            >
              Browse Collection ›
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <ProductDetails product={product} />;
}
