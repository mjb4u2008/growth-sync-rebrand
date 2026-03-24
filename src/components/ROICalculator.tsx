import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';

const ROICalculator = () => {
  const prefersReducedMotion = useReducedMotion();
  const [sliderValue, setSliderValue] = useState(0);

  // Exponential curve for better granularity at lower numbers
  const curve = Math.pow(sliderValue / 100, 2);

  const audience = Math.floor(25000 + curve * (5000000 - 25000));
  const untappedRevenue = Math.floor(2500 + curve * (200000 - 2500));
  const interactions = Math.floor(audience * 0.15); // 15% interaction rate

  return (
    <section className="py-20 md:py-32 bg-white relative overflow-hidden text-gray-950">
      <div className="absolute inset-0 dot-grid opacity-[0.03] pointer-events-none"></div>
      <div className="max-w-4xl mx-auto px-4 md:px-12 relative z-10 text-center">

        <motion.h2
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1, type: 'spring', stiffness: 120, damping: 20 }}
          className="text-3xl md:text-6xl font-display font-bold mb-4 md:mb-6 tracking-tight"
        >
          How much revenue are you ignoring?
        </motion.h2>
        <motion.p
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, filter: 'blur(6px)' }}
          whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-gray-600 mb-8 md:mb-12 max-w-2xl mx-auto"
        >
          Drag the slider to see how many social interactions you're leaving on the table and what they're worth.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
          className="bg-white border border-gray-200 shadow-2xl shadow-gray-200/50 rounded-2xl md:rounded-3xl p-6 md:p-12 relative max-w-3xl mx-auto hover:shadow-teal-500/10 transition-shadow duration-500"
        >
          <div className="mb-8 md:mb-12">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end mb-4 md:mb-6 gap-2">
              <span className="text-xs md:text-sm font-bold text-gray-500 uppercase tracking-wider">Audience Size</span>
              <motion.span
                key={audience}
                initial={{ opacity: 0.5, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-gray-950 text-3xl md:text-4xl font-display font-bold"
              >
                {audience >= 5000000 ? "5,000,000+" : audience.toLocaleString()}
              </motion.span>
            </div>
            <div className="relative h-3 md:h-4 flex items-center">
              <div className="absolute inset-0 bg-gray-100 rounded-full pointer-events-none"></div>
              <div
                className="absolute top-0 left-0 h-full bg-teal-600 rounded-full pointer-events-none"
                style={{ width: `calc(${sliderValue}% + ${12 - sliderValue * 0.24}px)` }}
              ></div>
              <input
                type="range"
                min="0"
                max="100"
                step="1"
                value={sliderValue}
                onChange={(e) => setSliderValue(parseInt(e.target.value))}
                aria-label="Audience size"
                aria-valuemin={25000}
                aria-valuemax={5000000}
                aria-valuenow={audience}
                className="absolute inset-0 w-full h-full appearance-none bg-transparent cursor-pointer z-10 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:md:w-6 [&::-webkit-slider-thumb]:md:h-6 [&::-webkit-slider-thumb]:bg-teal-600 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:hover:scale-110 [&::-webkit-slider-thumb]:transition-transform [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:md:w-6 [&::-moz-range-thumb]:md:h-6 [&::-moz-range-thumb]:bg-teal-600 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:shadow-md [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:hover:scale-110 [&::-moz-range-thumb]:transition-transform"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
            <div className="bg-gray-50 rounded-xl md:rounded-2xl p-6 md:p-8 border border-gray-100 text-left transition-transform hover:-translate-y-1 duration-300">
              <p className="text-xs md:text-sm text-gray-500 font-bold uppercase tracking-wider mb-2 md:mb-3">Social Interactions / Mo</p>
              <motion.p
                key={interactions}
                initial={{ opacity: 0.5, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-3xl md:text-5xl font-display font-bold text-gray-950"
              >
                {interactions.toLocaleString()}
              </motion.p>
            </div>
            <div className="bg-teal-600 rounded-xl md:rounded-2xl p-6 md:p-8 border border-teal-500 text-left shadow-lg shadow-teal-600/20 transition-transform hover:-translate-y-1 duration-300 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-tr from-teal-600 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <p className="text-xs md:text-sm text-teal-200 font-bold uppercase tracking-wider mb-2 md:mb-3">Untapped Revenue / Mo</p>
                <motion.p
                  key={untappedRevenue}
                  initial={{ opacity: 0.5, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-3xl md:text-5xl font-display font-bold text-white"
                >
                  ${untappedRevenue.toLocaleString()}
                </motion.p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ROICalculator;
