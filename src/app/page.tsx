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
    title: 'Is curiosity good for us?',
    author: 'Adam Phillips',
    date: null,
    excerpt: "The superego — and its precursor, conscience — refers to the part of us that has no curiosity about ourselves. It's the saboteur of curiosity about ourselves. And that part of us, like a narrow-minded fascist, has only one project: to destroy our pleasures in being alive by trying to kill our curiosity.",
    image: stockImage('reading'),
    imageAlt: 'A person reading in dim light',
    category: 'Essay',
  },
  {
    title: '#TFA',
    author: 'Deborah Friedell',
    date: '11 November 2026',
    excerpt:
      'Since the 25th Amendment was ratified in 1967, the temporary transfer of presidential powers has become almost routine — usually for a colonoscopy.',
    image: stockImage('library'),
    imageAlt: 'Library books',
    category: 'Criticism',
  },
  {
    title: 'Beyond Consent',
    author: 'Katie Tobin',
    date: '10 November 2026',
    excerpt:
      'Russell Brand has been sentenced to ten years in prison for raping one woman and sexually assaulting three others. The verdict has renewed debate about how the law speaks to survivors.',
    image: stockImage('desk'),
    imageAlt: 'Writing desk',
    category: 'Reviews',
  },
  {
    title: 'Who owns the glen?',
    author: 'Fraser MacDonald',
    date: '5 November 2026',
    excerpt:
      'In March 1973, before taking his new play around the village halls of the Highlands, John McGrath accepted a last-minute invitation from the Edinburgh Festival.',
    image: stockImage('typewriter'),
    imageAlt: 'A typewriter on a wooden desk',
    category: 'Essay',
  },
  {
    title: 'The Melancholy of Finished Things',
    author: 'Jacqueline Rose',
    date: '3 November 2026',
    excerpt:
      'To read Sebald is to enter a world in which mourning never quite resolves. The narrator moves through landscapes dense with absence, collecting traces — photographs, letters, the rubble of memory.',
    image: stockImage('window'),
    imageAlt: 'A figure at a window in grey light',
    category: 'Essay',
  },
  {
    title: 'What the Archive Knows',
    author: 'James Wood',
    date: '28 October 2026',
    excerpt:
      'The great difficulty with historical fiction is not imagination — it is restraint. The novelist who populates the past too confidently ends up writing a kind of costume drama of the mind.',
    image: stockImage('paper'),
    imageAlt: 'Old manuscripts and paper',
    category: 'Criticism',
  },
  {
    title: 'London After the Rain',
    author: 'Terry Castle',
    date: '21 October 2026',
    excerpt:
      'Walking east on Clerkenwell Road at six in the morning, the city still holding its breath, I wondered whether Dickens had walked this exact stretch — and what, if anything, he would have made of the new glass towers.',
    image: stockImage('city'),
    imageAlt: 'London street at dawn',
    category: 'Fiction',
  },
  {
    title: 'The Ear That Reads',
    author: 'Michael Wood',
    date: '14 October 2026',
    excerpt:
      'All serious prose aspires, at some level, to the condition of poetry — not in ornament, but in exactness. The sentence that lands perfectly does so because every syllable is in the right place.',
    image: stockImage('portrait'),
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
