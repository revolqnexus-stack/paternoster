export const STOCK_IMAGES = {
  // Literary / reading themes
  reading: 'https://images.unsplash.com/photo-1544717314-2558971129e2?w=1200&q=80',
  library: 'https://images.unsplash.com/photo-1507842217267-6f429b96f2bf?w=1200&q=80',
  bookshelf: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=80',
  typewriter: 'https://images.unsplash.com/photo-1588159837664-d9b97d030423?w=1200&q=80',
  coffee: 'https://images.unsplash.com/photo-1556742049-0cfed4f7a06d?w=1200&q=80',
  desk: 'https://images.unsplash.com/photo-1516684132767-157778992710?w=1200&q=80',
  pen: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=800&q=80',
  notebook: 'https://images.unsplash.com/photo-1559520427-09b8d59f54bc?w=800&q=80',
  // Fallback
  fallback: 'https://images.unsplash.com/photo-1507842217267-6f429b96f2bf?w=800&q=80',
};

export function stockImage(key: keyof typeof STOCK_IMAGES = 'fallback') {
  return STOCK_IMAGES[key];
}
