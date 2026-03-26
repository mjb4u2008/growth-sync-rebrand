import { Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 bg-white pt-16 pb-8 md:pt-20 md:pb-10">
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10 mb-12 md:mb-16">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4 md:mb-6">
              <div className="w-8 h-8 rounded-lg bg-gray-950 flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="font-display font-bold text-xl tracking-tight text-gray-950">GrowthSync</span>
            </div>
            <p className="text-gray-500 max-w-sm text-sm md:text-base">
              Conversational AI that turns social engagement into revenue for modern brands.
            </p>
            <a href="https://www.linkedin.com/company/growthsynchq" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-4 text-gray-400 hover:text-gray-900 transition-colors text-sm font-medium">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              LinkedIn
            </a>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-4">Company</h4>
            <ul className="space-y-3 text-gray-500 text-sm font-medium">
              <li className="py-2 md:py-1"><Link to="/blog" className="hover:text-gray-900 transition-colors">Blog</Link></li>
              <li className="py-2 md:py-1"><Link to="/careers" className="hover:text-gray-900 transition-colors">Careers</Link></li>
              <li className="py-2 md:py-1"><a href="mailto:hello@growthsync.com" className="hover:text-gray-900 transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-medium text-gray-400">
          <p>© {new Date().getFullYear()} GrowthSync Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="py-2 hover:text-gray-900 transition-colors">Privacy Policy</Link>
            <Link to="/terms-of-service" className="py-2 hover:text-gray-900 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
