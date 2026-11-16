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
    <div className="marquee z-10 relative group">
      {/* Edge masking gradients */}
      <div className="absolute inset-0 w-full pointer-events-none bg-gradient-to-r from-paper via-transparent to-paper z-20" />
      <div className="marquee-track">
        <div className="marquee-content">
          {items.map((item, i) => (
            <span key={i} className="mr-12 lg:mr-16">
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
