'use client';

export default function Marquee() {
  const items = [
    'Pater Noster',
    'Reading',
    'Writing',
    'The life of the mind',
    'Books',
    'Editions',
    'Objects',
    'Criticism',
    'Essays',
    'Reviews',
    'Pater Noster',
    'Reading',
    'Writing',
    'The life of the mind',
  ];

  return (
    <div className="marquee z-10 relative">
      <div className="marquee-track">
        <div className="marquee-content">
          {items.map((item, i) => (
            <span key={i} className="mr-8">
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
