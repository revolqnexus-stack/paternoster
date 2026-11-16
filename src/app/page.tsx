import { getProducts } from '@/lib/shopify';
import { stockImage } from '@/lib/stock-images';
import HomeClient from '@/components/HomeClient';

interface Article {
  title: string;
  author: string;
  date: string | null;
  excerpt: string;
  image: string;
  imageAlt: string;
}

const ARTICLES: Article[] = [
  {
    title: 'Is curiosity good for us?',
    author: 'Adam Phillips',
    date: null,
    excerpt:
      'The superego — and its precursor, conscience — refers to the part of us that has no curiosity about ourselves. It’s the saboteur of curiosity about ourselves. And that part of us, like a narrow-minded fascist, has only one project: to destroy our pleasures in being alive by trying to kill our curiosity (or by making us frightened of our curiosity, which amounts to the same thing).',
    image: stockImage('reading'),
    imageAlt: 'Adam Phillips',
  },
  {
    title: '#TFA',
    author: 'Deborah Friedell',
    date: '11 November 2026',
    excerpt:
      'Since the 25th Amendment was ratified in 1967, the temporary transfer of presidential powers has become almost routine — usually for a colonoscopy.',
    image: stockImage('library'),
    imageAlt: 'Library books',
  },
  {
    title: 'Beyond Consent',
    author: 'Katie Tobin',
    date: '10 November 2026',
    excerpt:
      'Russell Brand has been sentenced to ten years in prison for raping one woman and sexually assaulting three others.',
    image: stockImage('desk'),
    imageAlt: 'Writing desk',
  },
  {
    title: 'Who owns the glen?',
    author: 'Fraser MacDonald',
    date: '5 November 2026',
    excerpt:
      'In March 1973, before taking his new play, The Cheviot, the Stag and the Black, Black Oil, around the village halls of the Highlands, John McGrath accepted a last-minute invitation…',
    image: stockImage('typewriter'),
    imageAlt: 'Typewriter',
  },
];

export default async function Home() {
  let products: any[] = [];
  try {
    products = await getProducts(6);
  } catch {
    products = [];
  }

  const [featured, ...rest] = ARTICLES;

  return <HomeClient featured={featured} rest={rest} products={products} />;
}
