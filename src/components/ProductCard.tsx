import Link from 'next/link';
import Image from 'next/image';
import { stockImage } from '@/lib/stock-images';

interface ProductCardProps {
  product: any;
}

export default function ProductCard({ product }: ProductCardProps) {
  const image = product.images?.edges?.[0]?.node;
  const price = parseFloat(product.priceRange.minVariantPrice.amount);

  return (
    <Link key={product.id} href={`/products/${product.handle}`} className="block">
      <article>
        <div className="relative aspect-square bg-border rounded overflow-hidden mb-4">
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
        <h4 className="font-serif text-base font-normal mb-1 text-ink leading-tight line-clamp-2">
          {product.title}
        </h4>
        <p className="font-serif text-sm font-normal text-gray">
          £{price.toFixed(2)}
        </p>
      </article>
    </Link>
  );
}
