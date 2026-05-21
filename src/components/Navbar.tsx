import { useEffect, useState } from 'react';
import { ArrowRight, Menu } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { GrowthSyncLogo } from './atoms';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navItems = [
    { to: '/#how', label: 'How it works' },
    { to: '/#proof', label: 'Proof' },
    { to: '/pricing', label: 'Pricing' },
    { to: '/blog', label: 'Blog' },
  ];

  const isActive = (path: string) => {
    if (path.includes('#')) {
      return false;
    }

    if (path === '/pricing') {
      return location.pathname === '/pricing';
    }

    if (path === '/blog') {
      return location.pathname === '/blog' || location.pathname.startsWith('/blog/');
    }

    if (path === '/brand') {
      return location.pathname === '/brand' || location.pathname === '/press';
    }

    return location.pathname === path;
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
      <nav
        role="navigation"
        aria-label="Main navigation"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'border-b border-gray-200 bg-white/90 py-3 backdrop-blur-md' : 'bg-white/80 py-5 backdrop-blur-md'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <GrowthSyncLogo height={32} />
          </Link>

          <div className="hidden items-center gap-7 text-sm font-semibold text-gray-600 transition-colors md:flex">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`py-3 transition-colors hover:text-gray-950 ${isActive(item.to) ? 'text-gray-950' : ''}`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Button asChild className="hidden md:inline-flex">
              <Link to="/get-started" className="inline-flex items-center gap-2">
                Get Started for Free
                <ArrowRight />
              </Link>
            </Button>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden" aria-label="Open navigation">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
          </div>
        </div>
      </nav>

      <SheetContent className="w-[88vw]">
        <SheetHeader>
          <SheetTitle>
            <GrowthSyncLogo height={32} />
          </SheetTitle>
          <SheetDescription>Conversational AI for social commerce.</SheetDescription>
        </SheetHeader>
        <div className="mt-8 grid gap-2">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setMenuOpen(false)}
              className={`rounded-md px-3 py-3 font-semibold transition-colors hover:bg-gray-100 ${isActive(item.to) ? 'text-gray-950' : 'text-gray-700'}`}
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-4 grid gap-3 border-t border-gray-200 pt-4">
            <Button asChild>
              <Link to="/get-started" onClick={() => setMenuOpen(false)}>
                Get Started for Free
                <ArrowRight />
              </Link>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Navbar;
