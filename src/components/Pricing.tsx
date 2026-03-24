import { motion } from 'motion/react';
import { Zap, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Pricing = () => {
  return (
    <section id="pricing" className="py-20 md:py-32 bg-white relative">
      <div className="max-w-5xl mx-auto px-4 md:px-12 text-center">
        <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-[5.5rem] font-display font-bold mb-6 md:mb-8 text-gray-950 tracking-tight whitespace-nowrap">
          GrowthSync is free.
        </h2>
        <p className="text-3xl md:text-5xl font-display font-bold mb-8 md:mb-10">
          <span className="text-gradient-teal">We only make money when you do.</span>
        </p>
        <p className="text-lg md:text-xl text-gray-500 mb-10 md:mb-14 max-w-2xl mx-auto">
          We earn 15% of the revenue we generate for you. If we don't perform, you don't pay.
        </p>

        <div className="text-center">
          <motion.div
            animate={{
              rotate: [0, -2, 2, -2, 2, 0],
            }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              repeatDelay: 4,
              ease: "easeInOut"
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-50 text-teal-700 text-xs md:text-sm font-bold mb-6 border border-teal-100 uppercase tracking-wider"
          >
            <Zap className="w-3.5 h-3.5" />
            Zero platform fee. We earn when you earn.
          </motion.div>
        </div>

        <div className="text-center">
          <Link to="/demo" className="inline-flex items-center justify-center px-10 py-4 md:py-5 rounded-full bg-gray-950 text-white font-bold text-base md:text-lg hover:bg-gray-800 transition-colors gap-2">
            Start generating revenue <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
