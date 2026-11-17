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
  // Author portrait — person reading or writing
  portrait: 'https://images.unsplash.com/photo-1521575107034-e0fa0b594529?w=800&q=80',
  // Essay — abstract editorial / architecture mood
  essay: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80',
  // Review — stack of books / open book
  review: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&q=80',
  // Audio — headphones / vinyl / recording studio
  audio: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
  // Video — film camera / cinema mood
  video: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1200&q=80',
  // City — London cityscape or street
  city: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1200&q=80',
  // Window — person at window reading
  window: 'https://images.unsplash.com/photo-1476611338391-6f395a0ebc7b?w=800&q=80',
  // Paper — white paper texture or manuscript
  paper: 'https://images.unsplash.com/photo-1517842645767-c639042777db?w=800&q=80',
  // Book cover style images — 6 distinct moody literary Unsplash photos
  cover1: 'https://images.unsplash.com/photo-1495640388908-05fa85288e61?w=800&q=80',
  cover2: 'https://images.unsplash.com/photo-1476275466078-4007374efbbe?w=800&q=80',
  cover3: 'https://images.unsplash.com/photo-1455884981818-54cb785db6fc?w=800&q=80',
  cover4: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=800&q=80',
  cover5: 'https://images.unsplash.com/photo-1491841651911-c44739b2d6b1?w=800&q=80',
  cover6: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800&q=80',
  // Fallback
  fallback: 'https://images.unsplash.com/photo-1507842217267-6f429b96f2bf?w=800&q=80',
};

export function stockImage(key: keyof typeof STOCK_IMAGES = 'fallback') {
  return STOCK_IMAGES[key];
}
