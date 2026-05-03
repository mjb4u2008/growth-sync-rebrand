type ProofCardTone = 'blue' | 'lime' | 'dark' | 'white' | 'cream';

type ProofCard = {
  brand: string;
  category: string;
  stat: string;
  statLabel: string;
  detail: string;
  tone: ProofCardTone;
};

type MosaicColumn = {
  layout: 'topLong' | 'bottomLong';
  top: ProofCard;
  bottom: ProofCard;
};

const proofCards: ProofCard[] = [
  {
    brand: 'Dripglosss',
    category: 'Revenue activation',
    stat: '+757%',
    statLabel: 'revenue lift',
    detail: 'Dormant social demand moved from DMs and restock questions into checkout.',
    tone: 'blue',
  },
  {
    brand: 'The Genuine Club',
    category: 'Operations',
    stat: '3.4x',
    statLabel: 'faster follow-up',
    detail: 'Wholesale, vendors, and team communication organized into one command flow.',
    tone: 'white',
  },
  {
    brand: 'Von Dutch',
    category: 'Creator network',
    stat: '143',
    statLabel: 'VIP signals surfaced',
    detail: 'High-value DMs, creators, and celebrity contacts highlighted for activations.',
    tone: 'lime',
  },
  {
    brand: 'Jordyn Lucas',
    category: 'Product launch',
    stat: '100M+',
    statLabel: 'audience reach',
    detail: 'A launch campaign built around comments, DMs, replies, and warm intent.',
    tone: 'dark',
  },
  {
    brand: 'NDA',
    category: 'Launch campaign',
    stat: '20k+',
    statLabel: 'orders generated',
    detail: 'A new game launch turned attention into thousands of tracked orders.',
    tone: 'white',
  },
  {
    brand: 'Homme Femme',
    category: 'Audience activation',
    stat: '4.6x',
    statLabel: 'reply velocity',
    detail: 'Product demand and creator opportunities routed into clearer next steps.',
    tone: 'blue',
  },
  {
    brand: 'Pavoi',
    category: 'Social commerce',
    stat: '6.8x',
    statLabel: 'intent capture',
    detail: 'Shopping intent collected from comments and DMs before the customer cooled off.',
    tone: 'lime',
  },
  {
    brand: 'India Love',
    category: 'Creator activation',
    stat: '9.2x',
    statLabel: 'qualified replies',
    detail: 'Audience conversations segmented into launch, waitlist, and purchase moments.',
    tone: 'white',
  },
  {
    brand: 'Allbirds',
    category: 'Brand workflow',
    stat: '42%',
    statLabel: 'less manual triage',
    detail: 'Audience requests organized by product, urgency, and next best action.',
    tone: 'dark',
  },
  {
    brand: 'Ed Hardy',
    category: 'Drop campaign',
    stat: '2.9x',
    statLabel: 'drop engagement',
    detail: 'Social heat converted into product interest, creator threads, and campaign follow-up.',
    tone: 'blue',
  },
  {
    brand: 'Canvas Beauty',
    category: 'Data capture',
    stat: '38k+',
    statLabel: 'audience signals',
    detail: 'Permissioned data captured naturally while people asked questions in social channels.',
    tone: 'white',
  },
  {
    brand: 'The Hoop Gang',
    category: 'Community',
    stat: '71%',
    statLabel: 'higher response rate',
    detail: 'Fan questions, merch interest, and event demand kept warm without adding team drag.',
    tone: 'lime',
  },
];

const toneClasses: Record<ProofCardTone, string> = {
  blue: 'bg-[#0b84ff] text-white border-[#0b84ff]',
  lime: 'bg-[#e7ff78] text-[#080b0f] border-black/10',
  dark: 'bg-[#080b0f] text-white border-[#080b0f]',
  white: 'bg-white text-[#080b0f] border-black/10',
  cream: 'bg-[#fbfaf6] text-[#080b0f] border-black/10',
};

const statToneClasses: Record<ProofCardTone, string> = {
  blue: 'text-white',
  lime: 'text-[#080b0f]',
  dark: 'text-[#e7ff78]',
  white: 'text-[#0b84ff]',
  cream: 'text-[#0b84ff]',
};

const mosaicColumns: MosaicColumn[] = [
  { layout: 'topLong', top: proofCards[0], bottom: proofCards[1] },
  { layout: 'bottomLong', top: proofCards[2], bottom: proofCards[3] },
  { layout: 'topLong', top: proofCards[4], bottom: proofCards[5] },
  { layout: 'bottomLong', top: proofCards[6], bottom: proofCards[7] },
  { layout: 'topLong', top: proofCards[8], bottom: proofCards[9] },
  { layout: 'bottomLong', top: proofCards[10], bottom: proofCards[11] },
];

function ProofTile({ card, variant }: { card: ProofCard; variant: 'long' | 'short' }) {
  const isLong = variant === 'long';

  return (
    <article
      className={`flex w-[300px] shrink-0 flex-col rounded-lg border shadow-[0_22px_60px_rgba(8,11,15,0.08)] ${
        isLong ? 'h-[350px]' : 'h-[190px]'
      } ${isLong ? 'p-8' : 'p-7'} ${toneClasses[card.tone]}`}
    >
      <h3 className={`${isLong ? 'text-3xl' : 'text-2xl'} font-display font-black leading-[0.95] tracking-tight`}>
        {card.brand}
      </h3>

      <div className="mt-auto">
        <div className={`${isLong ? 'text-7xl' : 'text-6xl'} font-display font-black leading-[0.82] tracking-tight ${statToneClasses[card.tone]}`}>
          {card.stat}
        </div>
        <p className={`${isLong ? 'mt-4' : 'mt-3'} max-w-[13rem] text-lg font-black leading-6 opacity-68`}>
          {card.statLabel}
        </p>
      </div>
    </article>
  );
}

function MosaicWall() {
  return (
    <div className="case-study-mask overflow-hidden">
      <div className="case-study-marquee flex h-[560px] w-max items-start">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex h-[560px] shrink-0 items-start gap-5 pr-5">
            {mosaicColumns.map((column, columnIndex) => (
              <div key={`${column.layout}-${copy}-${columnIndex}`} className="flex h-[560px] shrink-0 flex-col gap-5">
                <div className="contents">
                  <ProofTile
                    card={column.top}
                    variant={column.layout === 'topLong' ? 'long' : 'short'}
                  />
                </div>
                <div className="contents">
                  <ProofTile
                    card={column.bottom}
                    variant={column.layout === 'bottomLong' ? 'long' : 'short'}
                  />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CaseStudies() {
  return (
    <section id="case-studies" className="bg-[#fbfaf6] py-18 md:py-24">
      <div className="mx-auto max-w-7xl px-5 text-center md:px-8">
        <h2 className="mx-auto max-w-5xl font-display text-5xl font-black leading-[0.9] tracking-tight text-[#080b0f] md:text-7xl">
          Creators and brands grow on GrowthSync.
        </h2>
      </div>

      <div className="mt-14 overflow-hidden">
        <MosaicWall />
      </div>
    </section>
  );
}
