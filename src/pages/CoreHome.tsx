import { useEffect, useState, type ReactNode } from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowUpRight, Pause, Play } from 'lucide-react';
import { CoreMotionStudy } from '@/components/core/CoreMotionStudy';
import { CoreFooter } from '@/components/core/CoreFooter';
import { CoreHeader } from '@/components/core/CoreHeader';
import { CoreInquiry } from '@/components/core/CoreInquiry';
import '@/styles/core-home.css';

type CoreHomeProps = {
  headline?: readonly [string, string];
  renderSculpture?: (paused: boolean) => ReactNode;
};

export default function CoreHome({ headline = ['The shape of', 'what’s next.'], renderSculpture }: CoreHomeProps = {}) {
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [paused, setPaused] = useState(false);
  const title = `GrowthSync — ${headline.join(' ').replace(/\.$/, '')}`;
  useEffect(() => {
    document.title = title;
    document.body.classList.add('core-home-active');
    return () => { document.body.classList.remove('core-home-active'); };
  }, [title]);

  return (
    <div className="core-home">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content="Meet Core, GrowthSync’s AI foundation for your business." />
        <meta property="og:title" content={title} />
        <meta property="og:description" content="Meet Core, GrowthSync’s AI foundation for your business." />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content="Meet Core, GrowthSync’s AI foundation for your business." />
      </Helmet>
      <CoreHeader home />
      <main className="core-main">
        <div className="core-art">{renderSculpture ? renderSculpture(paused || inquiryOpen) : <CoreMotionStudy kind="orbit" paused={paused || inquiryOpen} />}</div>
        <div className="core-message">
          <h1>{headline[0]}<br />{headline[1]}</h1>
          <p>Meet Core. An AI foundation that grows with your business.</p>
          <button type="button" className="core-cta" onClick={() => setInquiryOpen(true)} aria-haspopup="dialog">Book a call <ArrowUpRight size={19} aria-hidden="true" /></button>
        </div>
      </main>
      <CoreFooter>
        <button type="button" className="core-motion" onClick={() => setPaused(value => !value)} aria-label={paused ? 'Play sculpture animation' : 'Pause sculpture animation'} aria-pressed={paused}>{paused ? <Play size={12} /> : <Pause size={12} />}</button>
      </CoreFooter>
      <CoreInquiry open={inquiryOpen} onClose={() => setInquiryOpen(false)} />
    </div>
  );
}
