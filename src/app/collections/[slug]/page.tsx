import { getProducts } from '@/lib/shopify';
import CollectionsClient from '@/components/CollectionsClient';

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

  return <CollectionsClient collectionTitle={collectionTitle} filteredProducts={filteredProducts} />;
}
