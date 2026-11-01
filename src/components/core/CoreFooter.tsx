import type { ReactNode } from 'react';

export function CoreFooter({ children }: { children?: ReactNode }) {
  return (
    <footer className="core-footer">
      <span>© {new Date().getFullYear()} GrowthSync</span>
      <div className="core-footer-right">
        <a href="/privacy">Privacy</a>
        <a href="/terms">Terms</a>
        {children}
      </div>
    </footer>
  );
}
