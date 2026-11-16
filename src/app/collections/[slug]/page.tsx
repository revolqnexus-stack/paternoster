import { getProducts } from '@/lib/shopify';
import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'Collection — Pater Noster',
  description: 'Curated selection from The London Review of Books.',
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

  // Filter by tag/collection slug for now (Shopify collection query can be added later)
  const filteredProducts = slug === 'all'
    ? products
    : products.filter((p: any) =>
        p.tags.some((t: string) => t.toLowerCase().includes(slug.toLowerCase()))
      );

  const collectionTitle =
    slug === 'books' ? 'Books' : slug === 'merchandise' ? 'Merchandise' : slug;

  return (
    <div className="min-h-screen bg-ivory">
      {/* Announcement Bar */}
      <div className="bg-burgundy text-ivory text-center py-2 px-4 text-sm">
        Free UK shipping on orders over £50
      </div>

      {/* Header */}
      <section className="border-b border-border-subtle py-16 md:py-24 px-6">
        <div className="max-w-container mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="font-heading text-5xl md:text-7xl font-normal mb-2 text-soft-black leading-tight">
                {collectionTitle}
              </h1>
              <p className="font-heading text-xl text-charcoal font-light italic">
                Curated from The London Review of Books
              </p>
            </div>
            <p className="text-sm text-charcoal/60 uppercase tracking-wider font-medium">
              {filteredProducts.length} items
            </p>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-12 md:py-20 px-6">
        <div className="max-w-container mx-auto">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-charcoal/60">No items in this collection.</p>
              <Link
                href="/products"
                className="mt-4 inline-block border-2 border-soft-black text-soft-black px-8 py-3 hover:bg-soft-black hover:text-ivory transition-all font-medium text-sm uppercase tracking-wider"
              >
                Browse All
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {filteredProducts.map((product: any) => {
                const image = product.images?.edges?.[0]?.node;
                const price = parseFloat(product.priceRange.minVariantPrice.amount);
                const compareAtPrice = product.compareAtPriceRange?.minVariantPrice?.amount;
                const comparePrice = compareAtPrice && parseFloat(compareAtPrice) > 0 ? parseFloat(compareAtPrice) : null;
                const onSale = comparePrice && comparePrice > price;

                return (
                  <Link
                    key={product.id}
                    href={`/products/${product.handle}`}
                    className="group block"
                  >
                    <article className="group">
                      <div className="relative aspect-[3/4] bg-cream border border-border-subtle mb-4 overflow-hidden group-hover:border-charcoal transition-all duration-300">
                        {image?.url ? (
                          <Image
                            src={image.url}
                            alt={image.altText || product.title}
                            fill
                            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <div className="font-heading text-4xl text-charcoal/20 mb-2">📚</div>
                            <span className="text-xs uppercase tracking-wider text-charcoal/40">
                              {product.tags[0] || 'Book'}
                            </span>
                          </div>
                        )}
                        {(onSale || !product.availableForSale) && (
                          <div className="absolute top-3 right-3 flex flex-col gap-2">
                            {onSale && (
                              <span className="bg-burgundy text-ivory text-xs px-2 py-1 uppercase tracking-wide font-medium">
                                Sale
                              </span>
                            )}
                            {!product.availableForSale && (
                              <span className="bg-charcoal text-ivory text-xs px-2 py-1 uppercase tracking-wide font-medium">
                                Sold Out
                              </span>
                            )}
                          </div>
                                                    )}
                      </div>
                      <div>
                        <h3 className="font-heading text-base md:text-lg leading-tight mb-2 text-soft-black group-hover:text-burgundy transition-colors line-clamp-2">
                          {product.title}
                        </h3>
                        <div className="flex items-baseline gap-2">
                          <span className="text-sm md:text-base font-medium text-charcoal">
                            £{price.toFixed(2)}
                          </span>
                          {onSale && comparePrice && (
                            <span className="text-xs md:text-sm text-sage line-through">
                              £{comparePrice.toFixed(2)}
                            </span>
                          )}
                        </div>
                      </div>
                    </article>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
