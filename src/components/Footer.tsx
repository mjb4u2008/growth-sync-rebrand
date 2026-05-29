import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GrowthSyncLogo } from './atoms';

const footerLinks = {
  Product: [
    { label: 'How it works', to: '/#how' },
    { label: 'Proof', to: '/#proof' },
    { label: 'Get Started for Free', to: '/get-started' },
  ],
  Company: [
    { label: 'Blog', to: '/blog' },
    { label: 'Brand kit', to: '/brand' },
    { label: 'Careers', to: '/careers' },
    { label: 'Contact', href: 'mailto:hello@growthsync.com' },
  ],
  Legal: [
    { label: 'Privacy Policy', to: '/privacy' },
    { label: 'Terms of Service', to: '/terms-of-service' },
    { label: 'Status', href: 'https://growthsync-status.instatus.com/' },
  ],
};

const Footer = () => {
  return (
    <footer className="border-t border-black/10 bg-[#fbfaf6] text-[#080b0f]">
      <div className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:items-start">
          <div>
            <Link to="/" className="inline-flex items-center gap-3">
              <GrowthSyncLogo height={36} />
            </Link>

            <h2 className="mt-8 max-w-2xl font-display text-5xl font-black leading-[0.88] tracking-tight md:text-7xl">
              Turn social intent into action.
            </h2>

            <Link
              to="/get-started"
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-[#080b0f] px-6 py-4 text-sm font-black text-white shadow-[0_14px_40px_rgba(8,11,15,0.16)] transition hover:-translate-y-0.5 hover:bg-black"
            >
              Get Started for Free
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {Object.entries(footerLinks).map(([group, links]) => (
              <div key={group}>
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-black/36">{group}</h3>
                <ul className="mt-4 grid gap-3 text-sm font-black text-black/54">
                  {links.map((link) => (
                    <li key={link.label}>
                      {'href' in link ? (
                        <a href={link.href} className="transition hover:text-[#080b0f]">
                          {link.label}
                        </a>
                      ) : (
                        <Link to={link.to} className="transition hover:text-[#080b0f]">
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-black/10 pt-6 text-sm font-bold text-black/36 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} GrowthSync Inc. All rights reserved.</p>
          <a
            href="https://www.linkedin.com/company/growthsynchq"
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-[#080b0f]"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
