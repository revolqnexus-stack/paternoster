import { getProduct } from '@/lib/shopify';
import { notFound } from 'next/navigation';
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
    notFound();
  }

  if (!product) {
    notFound();
  }

  return <ProductDetails product={product} />;
}
