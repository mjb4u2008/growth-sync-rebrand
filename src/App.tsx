import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import ScrollToTop from './utils/ScrollToTop';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import GetStarted from './pages/GetStarted';
import PricingPage from './pages/PricingPage';
import Careers from './pages/Careers';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import NotFound from './pages/NotFound';
import InvestorDeck from './pages/InvestorDeck';
import BrandKit from './pages/BrandKit';

function AppShell() {
  const location = useLocation();
  const isInvestorDeck = location.pathname === '/investor-deck';
  const isDesignCanvas = location.pathname === '/';
  const isGetStarted = location.pathname === '/get-started';
  const shouldHideChrome = isInvestorDeck || isDesignCanvas || isGetStarted;

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-teal-100 selection:text-teal-900">
      {!shouldHideChrome && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/get-started" element={<GetStarted />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogPost />} />
        <Route path="/brand" element={<BrandKit />} />
        <Route path="/press" element={<BrandKit />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms-of-service" element={<Terms />} />
        <Route path="/investor-deck" element={<InvestorDeck />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!shouldHideChrome && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <AppShell />
      </Router>
    </HelmetProvider>
  );
}
