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
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-4">Company</h4>
            <ul className="space-y-3 text-gray-500 text-sm font-medium">
              <li className="py-1"><Link to="/blog" className="hover:text-gray-900 transition-colors">Blog</Link></li>
              <li className="py-1"><Link to="/careers" className="hover:text-gray-900 transition-colors">Careers</Link></li>
              <li className="py-1"><a href="mailto:hello@growthsync.com" className="hover:text-gray-900 transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-medium text-gray-400">
          <p>© {new Date().getFullYear()} GrowthSync Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-gray-900 transition-colors">Privacy Policy</Link>
            <Link to="/terms-of-service" className="hover:text-gray-900 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
