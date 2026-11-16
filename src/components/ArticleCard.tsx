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
  index?: number; // number index for corner
}

export default function ArticleCard({
  title,
  author,
  date,
  excerpt,
  image,
  imageAlt,
  href = '/',
  index,
}: ArticleCardProps) {
  return (
    <article className="article-card group relative">
      <Link
        href={href}
        className="block"
        onClick={() => {}}
      >
        {/* Number index in corner */}
        {index !== undefined && (
          <span className="absolute top-4 left-4 text-[0.6rem] font-grotesk font-medium text-gray-light uppercase tracking-widest z-10">
            0{index + 1}
          </span>
        )}
        <div className="article-card-image">
          <ImageWithFallback
            src={image}
            alt={imageAlt}
            className="w-full h-full object-cover"
            fallbackKey="bookshelf"
            data-cursor="view"
          />
        </div>
        <div className="p-4 pt-3 flex flex-col h-full">
          {/* Order: category → title → byline → date → excerpt → read more */}
          <p className="label-caps mb-2 uppercase tracking-widest">
            Editorial
          </p>
          <h3 className="article-card-title mb-2 group-hover:text-navy-light transition-colors duration-300">
            {title}
          </h3>
          <p className="article-card-byline mb-0.5">
            By {author}
          </p>
          {date && (
            <p className="article-card-date mb-1">{date}</p>
          )}
          <p className="article-card-excerpt mb-4">
            {excerpt}
          </p>
          <span className="article-card-readmore mt-auto">
            Read more →
          </span>
        </div>
      </Link>
    </article>
  );
}
