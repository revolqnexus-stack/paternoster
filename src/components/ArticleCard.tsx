'use client';

import Link from 'next/link';
import ImageWithFallback from '@/components/ImageWithFallback';

interface ArticleCardProps {
  title: string;
  author: string;
  date: string | null;
  excerpt: string;
  image: string;
  imageAlt: string;
  href?: string;
  span?: number; // grid column span for asymmetric layout
}

export default function ArticleCard({
  title,
  author,
  date,
  excerpt,
  image,
  imageAlt,
  href = '/',
  span = 4,
}: ArticleCardProps) {
  const colSpan = span > 0 ? span : 4;

  return (
    <article
      className="article-card group relative"
      style={{ gridColumn: `span ${colSpan}` }}
    >
      <Link
        href={href}
        className="block"
        onClick={() => {}}
      >
        <div className="article-card-image">
          <ImageWithFallback
            src={image}
            alt={imageAlt}
            className="w-full h-full object-cover"
            fallbackKey="bookshelf"
          />
        </div>
        <div className="p-4 pt-3">
          <p className="label-caps mb-2 uppercase tracking-widest">
            By {author}
          </p>
          {date && (
            <p className="font-grotesk text-[0.75rem] font-normal text-gray-light mb-3">
              {date}
            </p>
          )}
          <h3 className="article-card-title mb-2 group-hover:text-navy-light transition-colors duration-300">
            {title}
          </h3>
          <p className="font-serif text-sm md:text-base leading-relaxed text-ink mb-4 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
            {excerpt}
          </p>
          <span className="font-grotesk text-xs font-medium text-navy italic underline underline-offset-2 hover:text-navy-light transition-colors">
            Read more
          </span>
        </div>
      </Link>
    </article>
  );
}
