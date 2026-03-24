import { motion } from 'motion/react';
import { MessageCircle, ShoppingCart, Bot } from 'lucide-react';

const InteractiveDemo = () => {
  return (
    <section id="interactive-demo" className="py-20 md:py-32 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-12">

        <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Left: Text Content */}
          <div className="text-center lg:text-left">
            <p className="text-xs md:text-sm font-bold text-teal-600 tracking-widest uppercase mb-3 md:mb-4">DM Automation</p>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-gray-950 leading-tight mb-4 md:mb-6">
              Turn missed comments into VIP sales
            </h2>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-6 md:mb-8">
              Never lose a lead from a busy live stream again. GrowthSync automatically follows up with personalized offers based on exactly what they asked for.
            </p>
            <ul className="space-y-4 text-left inline-block lg:block">
              {['Instant DM follow-ups', 'Context-aware product bundling', 'One-time use checkout links'].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-700 font-medium">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-teal-500 to-violet-500 mt-2 shrink-0"></div>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Animated Chat UI */}
          <div className="relative">
            {/* Background decorative blobs */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-br from-violet-100 to-pink-100 rounded-full blur-3xl opacity-50"></div>

            <div className="relative bg-white border border-gray-200 shadow-2xl rounded-3xl md:rounded-[2rem] overflow-hidden max-w-md mx-auto flex flex-col h-[450px] md:h-[500px]">
              {/* Chat Header */}
              <div className="bg-white border-b border-gray-100 p-4 flex items-center gap-3 shrink-0 z-10">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500 p-[2px]">
                  <div className="bg-white rounded-full p-[2px] w-full h-full">
                    <img src="https://picsum.photos/seed/customer1/100/100" className="w-full h-full rounded-full" alt="Customer" referrerPolicy="no-referrer" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                  </div>
                </div>
                <div>
                  <p className="font-bold text-sm text-gray-900">jessica.wears</p>
                  <p className="text-xs text-gray-500">Active now</p>
                </div>
                <div className="ml-auto flex gap-3 text-gray-400">
                  <MessageCircle className="w-5 h-5" />
                </div>
              </div>

              {/* Chat Body */}
              <div className="flex-1 p-5 space-y-4 bg-gray-50/50 overflow-y-auto flex flex-col justify-end">

                {/* User Message */}
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  className="flex gap-2"
                >
                  <img src="https://picsum.photos/seed/customer1/100/100" className="w-8 h-8 rounded-full mt-auto shrink-0" alt="Customer" referrerPolicy="no-referrer" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                  <div className="bg-gray-200 text-gray-900 px-4 py-2.5 rounded-2xl rounded-bl-sm text-sm max-w-[85%]">
                    Y'all didn't respond to me during the live 😢 I really wanted that pink hat!
                  </div>
                </motion.div>

                {/* AI Message 1 */}
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: 1.5 }}
                  className="flex gap-2 flex-row-reverse"
                >
                  <div className="w-8 h-8 shrink-0"></div>
                  <div className="bg-violet-600 text-white px-4 py-2.5 rounded-2xl rounded-br-sm text-sm max-w-[85%]">
                    Oh no, I'm so sorry Jessica! We were swamped. I saw you were eyeing the pink hat! 🧢
                  </div>
                </motion.div>

                {/* AI Message 2 */}
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: 3 }}
                  className="flex gap-2 flex-row-reverse"
                >
                  <div className="w-8 h-8 shrink-0"></div>
                  <div className="bg-violet-600 text-white px-4 py-2.5 rounded-2xl rounded-br-sm text-sm max-w-[85%]">
                    Here's a secret bundle: The pink hat + matching pants at the live flash sale price. Just for you! 🤫
                  </div>
                </motion.div>

                {/* AI Product Card */}
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: 4.5 }}
                  className="flex gap-2 flex-row-reverse"
                >
                  <div className="w-8 h-8 rounded-full bg-violet-600 flex items-center justify-center mt-auto shrink-0">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-white border border-gray-200 p-3 rounded-2xl rounded-br-sm max-w-[85%] shadow-sm w-full">
                    <div className="flex gap-3 items-center mb-3">
                      <div className="w-12 h-12 bg-pink-50 rounded-lg flex items-center justify-center shrink-0">
                        <ShoppingCart className="w-6 h-6 text-pink-500" />
                      </div>
                      <div>
                        <p className="font-bold text-sm text-gray-900">VIP Pink Bundle</p>
                        <p className="text-xs text-gray-500 line-through inline-block mr-1">$120</p>
                        <p className="text-xs text-emerald-600 font-bold inline-block">$85 (Flash Sale)</p>
                      </div>
                    </div>
                    <button className="w-full py-2 bg-gray-950 text-white text-sm font-bold rounded-xl hover:bg-gray-800 transition-colors">
                      Claim One-Time Link
                    </button>
                  </div>
                </motion.div>

              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default InteractiveDemo;
