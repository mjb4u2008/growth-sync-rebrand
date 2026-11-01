import { useEffect, useState, type ReactNode } from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowUpRight, Pause, Play } from 'lucide-react';
import { CoreSculpture } from '@/components/core/CoreSculpture';
import { CoreFooter } from '@/components/core/CoreFooter';
import { CoreHeader } from '@/components/core/CoreHeader';
import { CoreInquiry } from '@/components/core/CoreInquiry';
import '@/styles/core-home.css';

type CoreHomeProps = {
  headline?: readonly [string, string];
  renderSculpture?: (paused: boolean) => ReactNode;
};

export default function CoreHome({ headline, renderSculpture }: CoreHomeProps = {}) {
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [paused, setPaused] = useState(false);
  const title = `GrowthSync — ${headline ? headline.join(' ').replace(/\.$/, '') : 'A new foundation for business'}`;
  useEffect(() => {
    document.title = title;
    document.body.classList.add('core-home-active');
    return () => { document.body.classList.remove('core-home-active'); };
  }, [title]);

  return (
    <div className="core-home">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content="AI infrastructure for the way businesses will run. Meet GrowthSync." />
        <meta property="og:title" content={title} />
        <meta property="og:description" content="AI infrastructure for the way businesses will run." />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content="AI infrastructure for the way businesses will run." />
      </Helmet>
      <CoreHeader home />
      <main className="core-main">
        <div className="core-art">{renderSculpture ? renderSculpture(paused || inquiryOpen) : <CoreSculpture paused={paused || inquiryOpen} />}</div>
        <div className="core-message">
          <h1>{headline ? <>{headline[0]}<br />{headline[1]}</> : <>A new foundation<br />for business.</>}</h1>
          <p>AI infrastructure for the way businesses will run.</p>
          <button type="button" className="core-cta" onClick={() => setInquiryOpen(true)} aria-haspopup="dialog">Introduce your business <ArrowUpRight size={19} aria-hidden="true" /></button>
        </div>
      </main>
      <CoreFooter>
        <button type="button" className="core-motion" onClick={() => setPaused(value => !value)} aria-label={paused ? 'Play sculpture animation' : 'Pause sculpture animation'} aria-pressed={paused}>{paused ? <Play size={12} /> : <Pause size={12} />}</button>
      </CoreFooter>
      <CoreInquiry open={inquiryOpen} onClose={() => setInquiryOpen(false)} />
    </div>
  );
}
