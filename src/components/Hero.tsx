import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import DashboardPeek from './DashboardPeek';
import HeroMascot from './HeroMascots';

const Hero = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="pt-28 md:pt-32 pb-0 bg-white text-gray-950 overflow-hidden relative grain">
      {/* Gradient mesh background */}
      <div className="absolute inset-0 gradient-mesh pointer-events-none"></div>
      <div className="max-w-5xl mx-auto px-4 md:px-6 text-center relative z-10">

        <motion.div
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, filter: 'blur(10px)' }}
          animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.6 }}
        >
          <Link to="/blog/4" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-950/5 text-gray-600 text-xs md:text-sm font-medium mb-6 md:mb-8 border border-gray-200/50 backdrop-blur-sm hover:bg-gray-950/10 transition-colors">
            <div className="w-1.5 h-1.5 rounded-full bg-teal-500"></div>
            We raised $1.6M to build the future of social commerce <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </motion.div>

        <div className="mb-6 md:mb-8">
          <motion.h1
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, filter: 'blur(8px)' }}
            animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.7, delay: 0.1, type: 'spring', stiffness: 100, damping: 20 }}
            className="relative text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold tracking-tight leading-[1.02]"
          >
            <span className="block">
              <span className="relative inline-block align-top pr-[0.05em]">
                <HeroMascot
                  variant="sitter"
                  className="left-[-0.11em] top-[-0.5em] z-20 w-[0.78em]"
                />
                <span className="relative z-10 inline-block">T</span>
              </span>
              <span>urn social noise into</span>
            </span>
            <span className="block text-gradient">revenue.</span>
          </motion.h1>
        </div>

        <motion.p
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, filter: 'blur(6px)' }}
          animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="text-base md:text-xl text-gray-500 mb-8 md:mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          Turn millions of social interactions into a retargeted revenue stream. Find intent in DMs, personalize outreach, launch campaigns, and close deals directly on social channels.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.35, type: 'spring', stiffness: 150, damping: 20 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link to="/demo" className="w-full sm:w-auto px-8 py-4 rounded-full bg-gray-950 text-white font-semibold text-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
            Start generating revenue <ArrowRight className="w-5 h-5" />
          </Link>
          <div className="relative w-full sm:w-auto text-lg">
            <HeroMascot
              variant="peer"
              className="right-[1.15em] bottom-[calc(100%-0.08em)] w-[2.15em] sm:right-[1.35em] sm:w-[2.5em]"
            />
            <button
              onClick={() => document.getElementById('interactive-demo')?.scrollIntoView({ behavior: 'smooth' })}
              className="relative z-10 w-full sm:w-auto px-8 py-4 rounded-full bg-white text-gray-900 border border-gray-200 font-semibold text-lg hover:bg-gray-50 transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              See how it works
              <ArrowRight className="w-4 h-4 rotate-90" />
            </button>
          </div>
        </motion.div>
        <p className="mt-4 text-sm text-gray-400 tracking-wide">No credit card required</p>

        {/* Brand marquee — right in the hero */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-10 md:mt-14"
        >
          <div className="overflow-hidden mask-edges max-w-3xl mx-auto">
            <div className="flex w-max animate-marquee gap-12 md:gap-20">
              {[
                'Von Dutch', 'Comf', 'Homme Femme', 'Ed Hardy', 'NDA', 'Dripglosss',
                'The Genuine Club', 'Klean By Ky', 'Markia', 'Canvas Beauty', 'The Hoop Gang', 'Barcode',
                'Von Dutch', 'Comf', 'Homme Femme', 'Ed Hardy', 'NDA', 'Dripglosss',
                'The Genuine Club', 'Klean By Ky', 'Markia', 'Canvas Beauty', 'The Hoop Gang', 'Barcode'
              ].map((brand, i) => (
                <span key={i} className="text-lg md:text-2xl font-display font-bold text-gray-300 tracking-widest uppercase shrink-0">
                  {brand}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

      </div>

      <DashboardPeek />
    </section>
  );
};

export default Hero;
