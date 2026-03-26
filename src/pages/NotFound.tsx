import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white pt-32 pb-20 flex items-center justify-center">
      <Helmet>
        <title>Page Not Found | GrowthSync</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <div className="text-center px-4">
        <h1 className="text-8xl font-display font-bold text-gray-200 mb-4">404</h1>
        <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-950 mb-4">Page not found</h2>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gray-950 text-white font-semibold hover:bg-gray-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to home
        </Link>
      </div>
    </div>
  );
}
