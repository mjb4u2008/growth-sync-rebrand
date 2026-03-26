import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import ScrollToTop from './utils/ScrollToTop';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StatsBar from './components/StatsBar';
import InteractiveDemo from './components/InteractiveDemo';
import FeatureTwo from './components/FeatureTwo';
import FeatureThree from './components/FeatureThree';
import ROICalculator from './components/ROICalculator';
import SegmentOfOne from './components/SegmentOfOne';
import Integrations from './components/Integrations';
import Pricing from './components/Pricing';
import Footer from './components/Footer';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import BookDemo from './pages/BookDemo';
import Careers from './pages/Careers';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-teal-100 selection:text-teal-900">
          <Navbar />
          <Routes>
            <Route path="/" element={
              <main>
                <Helmet>
                  <title>GrowthSync | Conversational AI for Social Commerce</title>
                  <meta name="description" content="Turn social noise into attributed revenue. GrowthSync is the all-in-one conversational AI platform for modern brands." />
                  <link rel="canonical" href="https://growthsync.com" />
                  <meta property="og:type" content="website" />
                  <meta property="og:url" content="https://growthsync.com" />
                  <meta property="og:title" content="GrowthSync | Conversational AI for Social Commerce" />
                  <meta property="og:description" content="Turn social noise into attributed revenue. GrowthSync is the all-in-one conversational AI platform for modern brands." />
                  <meta property="og:image" content="https://growthsync.com/growthsync-logo.png" />
                  <meta name="twitter:card" content="summary_large_image" />
                  <meta name="twitter:title" content="GrowthSync | Conversational AI for Social Commerce" />
                  <meta name="twitter:description" content="Turn social noise into attributed revenue. GrowthSync is the all-in-one conversational AI platform for modern brands." />
                  <meta name="twitter:image" content="https://growthsync.com/growthsync-logo.png" />
                </Helmet>
                <Hero />
                <FeatureThree />
                <FeatureTwo />
                <InteractiveDemo />
                <div className="section-divider" />
                <ROICalculator />
                <SegmentOfOne />
                <Integrations />
                <div className="section-divider" />
                <Pricing />
              </main>
            } />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/demo" element={<BookDemo />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms-of-service" element={<Terms />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </HelmetProvider>
  );
}
