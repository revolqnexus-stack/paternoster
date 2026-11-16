import { getProducts } from '@/lib/shopify';
import Link from 'next/link';
import Image from 'next/image';

export default async function Home() {
  const products = await getProducts(8);

  return (
    <div className="min-h-screen bg-ivory">
      {/* Announcement Bar */}
      <div className="bg-burgundy text-ivory text-center py-2 px-4 text-sm">
        Free UK shipping on orders over £50
      </div>

      {/* Editorial Hero */}
      <section className="border-b border-border-subtle">
        <div className="max-w-container mx-auto px-6 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="font-heading text-5xl md:text-7xl font-normal mb-6 text-soft-black leading-tight">
                Pater Noster
              </h1>
              <p className="font-heading text-xl md:text-2xl text-charcoal mb-4 font-light italic">
                The London Review of Books Store
              </p>
              <p className="text-base md:text-lg text-charcoal/80 leading-relaxed mb-8 max-w-prose">
                Curated books, exclusive merchandise, and literary subscriptions from Europe's leading magazine of culture and ideas.
              </p>
              <Link
                href="/products"
                className="inline-block border-2 border-soft-black text-soft-black px-8 py-3 hover:bg-soft-black hover:text-ivory transition-all duration-200 font-medium text-sm uppercase tracking-wider"
              >
                Browse Collection
              </Link>
            </div>
            <div className="bg-cream border border-border-subtle aspect-[4/5] flex items-center justify-center">
              <span className="font-heading text-3xl text-charcoal/30">Editorial Image</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Grid */}
      <section className="py-12 md:py-20 px-6">
        <div className="max-w-container mx-auto">
          <div className="flex items-baseline justify-between mb-8">
            <h2 className="font-heading text-3xl md:text-5xl font-normal text-soft-black">
              Featured Selection
            </h2>
            <Link 
              href="/products" 
              className="text-xs uppercase tracking-wider text-charcoal hover:text-burgundy transition-colors border-b border-transparent hover:border-burgundy pb-1"
            >
              View All
            </Link>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {products.map((product: any) => {
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
                  <article>
                    {/* Image */}
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
                          <div className="text-center p-6">
                            <div className="font-heading text-4xl text-charcoal/20 mb-2">📚</div>
                            <span className="text-xs uppercase tracking-wider text-charcoal/40">
                              {product.tags[0] || 'Book'}
                            </span>
                          </div>
                        </div>
                      )}
                      
                      {/* Badges */}
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
                    
                    {/* Details */}
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

          <div className="text-center mt-12">
            <Link
              href="/products"
              className="inline-block border-2 border-soft-black text-soft-black px-10 py-3 hover:bg-soft-black hover:text-ivory transition-all duration-200 font-medium text-sm uppercase tracking-wider"
            >
              View Full Collection
            </Link>
          </div>
        </div>
      </section>

      {/* Collection Highlight */}
      <section className="border-t border-border-subtle py-12 md:py-20 px-6 bg-warm-white">
        <div className="max-w-container mx-auto">
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
            <div className="bg-cream border border-border-subtle aspect-square"></div>
            <div>
              <h2 className="font-heading text-3xl md:text-4xl font-normal mb-4 text-soft-black">
                The LRB Collection
              </h2>
              <p className="text-base text-charcoal/80 leading-relaxed mb-6">
                Exclusive books, essays, and critical writing from Europe's foremost literary magazine. 
                Each title carefully selected by our editorial team.
              </p>
              <Link
                href="/collections/books"
                className="inline-block border-2 border-soft-black text-soft-black px-8 py-3 hover:bg-soft-black hover:text-ivory transition-all duration-200 font-medium text-sm uppercase tracking-wider"
              >
                Explore Books
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="border-t border-border-subtle py-12 md:py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading text-3xl md:text-4xl font-normal mb-8 text-soft-black text-center">
            About Pater Noster
          </h2>
          <div className="space-y-6 text-base md:text-lg text-charcoal/90 leading-relaxed">
            <p>
              Pater Noster is the official store of <em>The London Review of Books</em>, 
              Europe's leading magazine of culture and ideas. Published twice a month, 
              the LRB provides a space for some of the world's best writers to explore 
              a wide variety of subjects in exhilarating detail.
            </p>
            <p>
              We offer authentic LRB merchandise to readers and fans around the world — 
              from exclusive books and audiobooks to limited-edition tote bags and subscriptions.
            </p>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="border-t border-border-subtle py-12 md:py-16 px-6 bg-warm-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-heading text-2xl md:text-3xl font-normal mb-4 text-soft-black">
            Stay Informed
          </h2>
          <p className="text-charcoal/80 mb-6">
            Receive updates on new arrivals, exclusive offers, and literary news.
          </p>
          <form className="flex max-w-md mx-auto border-2 border-soft-black">
            <input
              type="email"
              placeholder="Email address"
              className="flex-1 px-4 py-3 bg-ivory text-sm focus:outline-none"
              required
            />
            <button
              type="submit"
              className="px-6 py-3 bg-soft-black text-ivory hover:bg-burgundy transition-colors text-sm uppercase tracking-wider font-medium"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
