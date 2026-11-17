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
  category: string;
}

const ARTICLES: Article[] = [
  {
    title: 'On the Weight of Small Objects',
    author: 'Elena Marlowe',
    date: null,
    excerpt:
      'There is a particular kind of silence that accumulates around the things we do not say. A book left open on a table, a cup gone cold, the margin of a letter where the ink trails off — these are not absences but presences of another order.',
    image: stockImage('reading'),
    imageAlt: 'A person reading in dim light',
    category: 'Essay',
  },
  {
    title: 'Margin Notes on a Second Reading',
    author: 'Samuel Crane',
    date: '12 November 2026',
    excerpt:
      'The second time through a book is never the same book. What seemed essential on first contact reveals itself as ornament; what seemed ornamental proves load-bearing. We read differently when we already know the ending.',
    image: stockImage('library'),
    imageAlt: 'Library books',
    category: 'Criticism',
  },
  {
    title: 'The Ink Still Wet',
    author: 'Mira Thorne',
    date: '10 November 2026',
    excerpt:
      'To hold a proof copy is to hold possibility in its most fragile form. The pages are light, the binding temporary, the typography not yet settled. Everything could still change — and everything already has.',
    image: stockImage('desk'),
    imageAlt: 'Writing desk',
    category: 'Reviews',
  },
  {
    title: 'A Line Across the Valley',
    author: 'Fiona Reid',
    date: '5 November 2026',
    excerpt:
      'The path follows the contour of the land rather than imposing upon it. There is a lesson there, if one is willing to walk slowly enough to learn it — about patience, about attention, about the difference between seeing and looking.',
    image: stockImage('typewriter2'),
    imageAlt: 'A typewriter on a wooden desk',
    category: 'Essay',
  },
  {
    title: 'Where the Light Falls',
    author: 'Julian Vale',
    date: '3 November 2026',
    excerpt:
      'Morning light in a reading room has a specific quality — oblique, golden, unhurried. It falls across the page at just the angle that makes the text legible without forcing it, as if the world itself is leaning in to listen.',
    image: stockImage('window2'),
    imageAlt: 'A figure at a window in grey light',
    category: 'Essay',
  },
  {
    title: 'The Archive Breathes',
    author: 'Clara Mendez',
    date: '28 October 2026',
    excerpt:
      'An archive is not a tomb but a lung. It inhales and exhales paper, ink, the trace of hands that turned these pages decades before us. To enter one is to step into a continuous conversation that never required your permission to begin.',
    image: stockImage('paper3'),
    imageAlt: 'Old manuscripts and paper',
    category: 'Criticism',
  },
  {
    title: 'East of the Tower',
    author: 'Arthur Bellweather',
    date: '21 October 2026',
    excerpt:
      'The city reveals itself differently at six in the morning, before the traffic and the noise and the rush. The streets are quieter, the air clearer, and the buildings stand in relief against a sky that has not yet decided what color it will be.',
    image: stockImage('city2'),
    imageAlt: 'City street at dawn',
    category: 'Fiction',
  },
  {
    title: 'The Syllable That Matters',
    author: 'Rose Winter',
    date: '14 October 2026',
    excerpt:
      'Precision in writing is not about using fewer words. It is about using the right words — the ones that carry weight, that resonate, that do not need to be explained because they simply are. The sentence that lands does so because every element is necessary.',
    image: stockImage('portrait2'),
    imageAlt: 'Author at a writing desk',
    category: 'Poetry',
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
