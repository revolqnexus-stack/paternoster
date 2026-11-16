import { getProducts } from '@/lib/shopify';
import ProductsClient from '@/components/ProductsClient';

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

  return <ProductsClient products={products} />;
}
