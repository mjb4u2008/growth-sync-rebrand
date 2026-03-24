import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Zap, X, Menu } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const mobileNavRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  // Focus trap + Escape handler for mobile nav
  useEffect(() => {
    if (!menuOpen) return;
    const panel = mobileNavRef.current;
    if (!panel) return;

    const focusableEls = panel.querySelectorAll<HTMLElement>('a, button');
    if (focusableEls.length > 0) focusableEls[0].focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        hamburgerRef.current?.focus();
        return;
      }
      if (e.key === 'Tab' && focusableEls.length > 0) {
        const first = focusableEls[0];
        const last = focusableEls[focusableEls.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen]);

  return (
    <>
      <nav
        role="navigation"
        aria-label="Main navigation"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-white/80 backdrop-blur-md border-b border-gray-200 py-4' : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors bg-gray-950`}>
              <Zap className={`w-5 h-5 transition-colors text-white`} />
            </div>
            <span className={`font-display font-bold text-xl tracking-tight transition-colors text-gray-950`}>GrowthSync</span>
          </Link>

          <div className={`hidden md:flex items-center gap-8 text-sm font-medium transition-colors text-gray-600`}>
            <Link to="/blog" className={`py-3 transition-colors hover:text-gray-950`}>Blog</Link>
            <Link to="/careers" className={`py-3 transition-colors hover:text-gray-950`}>Careers</Link>
          </div>

          <div className="flex items-center gap-4">
            <button
              ref={hamburgerRef}
              onClick={() => setMenuOpen(!menuOpen)}
              className={`md:hidden p-2 transition-colors text-gray-950`}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label="Toggle navigation menu"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <Link to="/demo" className={`inline-flex px-4 py-2 md:px-5 md:py-2.5 rounded-full font-semibold text-sm transition-colors bg-gray-950 text-white hover:bg-gray-800`}>
              Get started
            </Link>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-nav"
            role="navigation"
            aria-label="Mobile navigation"
            ref={mobileNavRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[64px] left-0 right-0 z-40 bg-white border-b border-gray-200 shadow-lg md:hidden"
          >
            <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-1">
              <Link to="/blog" onClick={() => setMenuOpen(false)} className="py-3 text-gray-900 font-medium hover:text-teal-600 transition-colors">Blog</Link>
              <Link to="/careers" onClick={() => setMenuOpen(false)} className="py-3 text-gray-900 font-medium hover:text-teal-600 transition-colors">Careers</Link>
              <div className="border-t border-gray-100 mt-2 pt-3">
                <Link to="/demo" onClick={() => setMenuOpen(false)} className="py-3 px-6 rounded-full bg-gray-950 text-white font-semibold text-center block">
                  Get started
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
