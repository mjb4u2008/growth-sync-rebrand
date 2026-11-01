import { ArrowUpRight } from 'lucide-react';

export function CoreHeader({ home = false }: { home?: boolean }) {
  return (
    <header className="core-header">
      <a className="core-logo" href="/" aria-label="GrowthSync home"><span>GrowthSync</span><span className="core-logo-dot" aria-hidden="true" /></a>
      <nav aria-label="Main navigation" className="core-nav">
        {!home && <a href="/">Home</a>}
        <a className="core-journal" href="/blog">Journal <ArrowUpRight size={16} aria-hidden="true" /></a>
      </nav>
    </header>
  );
}
