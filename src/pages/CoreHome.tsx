import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowUpRight, Pause, Play } from 'lucide-react';
import { CoreSculpture } from '@/components/core/CoreSculpture';
import { CoreFooter } from '@/components/core/CoreFooter';
import { CoreHeader } from '@/components/core/CoreHeader';
import { CoreInquiry } from '@/components/core/CoreInquiry';
import '@/styles/core-home.css';

export default function CoreHome() {
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    document.title = 'GrowthSync — A new foundation for business';
    document.body.classList.add('core-home-active');
    return () => { document.body.classList.remove('core-home-active'); };
  }, []);

  return (
    <div className="core-home">
      <Helmet>
        <title>GrowthSync — A new foundation for business</title>
        <meta name="description" content="AI infrastructure for the way businesses will run. Meet GrowthSync." />
        <meta property="og:title" content="GrowthSync — A new foundation for business" />
        <meta property="og:description" content="AI infrastructure for the way businesses will run." />
        <meta name="twitter:title" content="GrowthSync — A new foundation for business" />
        <meta name="twitter:description" content="AI infrastructure for the way businesses will run." />
      </Helmet>
      <CoreHeader home />
      <main className="core-main">
        <div className="core-art"><CoreSculpture paused={paused || inquiryOpen} /></div>
        <div className="core-message">
          <h1>A new foundation<br />for business.</h1>
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
