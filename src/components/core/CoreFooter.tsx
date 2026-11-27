import type { ReactNode } from 'react';

export function CoreFooter({ children }: { children?: ReactNode }) {
  return (
    <footer className="core-footer">
      <div className="core-footer-identity">
        <span>© {new Date().getFullYear()} GrowthSync</span>
        <span className="core-footer-founders">
          Co-founded by <a href="https://www.michaelbroughton.com/about">Michael Broughton</a> and Roderick Henley II.
        </span>
      </div>
      <div className="core-footer-right">
        <a href="/privacy">Privacy</a>
        <a href="/terms">Terms</a>
        {children}
      </div>
    </footer>
  );
}
