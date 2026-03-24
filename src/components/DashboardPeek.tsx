import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import {
  Instagram,
  MessageSquare,
  Bot,
  Zap,
  CheckCircle2,
  Sparkles,
  LayoutDashboard,
  Users,
  Settings,
  TrendingUp,
  Mail,
  Target,
  BrainCircuit,
  LineChart,
} from 'lucide-react';

const DashboardPeek = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 0.5], [100, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.95, 1]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5], [5, 0]);

  const timeline = [
    { id: 1, icon: <Instagram className="w-3.5 h-3.5 text-gray-500"/>, title: "Liked 3 IG Posts", time: "Mar 2", desc: "Engaged with Spring Collection teaser content.", type: "neutral" },
    { id: 2, icon: <MessageSquare className="w-3.5 h-3.5 text-gray-500"/>, title: "TikTok Live Comment", time: "Mar 4", desc: '"Does the beige trench run true to size?"', type: "neutral" },
    { id: 3, icon: <Bot className="w-3.5 h-3.5 text-emerald-600"/>, title: "AI Initiated IG DM", time: "Mar 5", desc: "Provided sizing info + offered early access to Spring Collection.", type: "ai" },
    { id: 4, icon: <MessageSquare className="w-3.5 h-3.5 text-gray-500"/>, title: "Replied to DM", time: "Mar 6", desc: '"Yes please! My email is sarah.j@example.com"', type: "neutral" },
    { id: 5, icon: <CheckCircle2 className="w-4 h-4 text-white"/>, title: "Purchased Trench Coat", time: "Mar 8", desc: "Order #4892 • $185.00", type: "conversion" },
  ];

  return (
    <div ref={containerRef} className="w-full max-w-6xl mx-auto px-4 mt-12 md:mt-16" style={{ perspective: '1000px' }}>
      <motion.div
        style={{ y, scale, rotateX, transformOrigin: "top center" }}
        className="bg-white rounded-t-2xl md:rounded-t-3xl border border-gray-200 shadow-[0_-20px_60px_-15px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col md:flex-row h-auto md:h-[650px]"
      >
        {/* Sidebar */}
        <div className="hidden md:flex w-16 md:w-20 border-r border-gray-100 flex-col items-center py-6 gap-8 bg-gray-50/50 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-gray-950 flex items-center justify-center mb-4">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <div className="flex flex-col gap-6 text-gray-400">
            <button aria-label="Dashboard" className="p-2 rounded-xl hover:bg-gray-100 hover:text-gray-900 transition-colors"><LayoutDashboard className="w-5 h-5" /></button>
            <button aria-label="Contacts" className="p-2 rounded-xl bg-teal-50 text-teal-600 transition-colors"><Users className="w-5 h-5" /></button>
            <button aria-label="Messages" className="p-2 rounded-xl hover:bg-gray-100 hover:text-gray-900 transition-colors"><MessageSquare className="w-5 h-5" /></button>
            <button aria-label="Analytics" className="p-2 rounded-xl hover:bg-gray-100 hover:text-gray-900 transition-colors"><TrendingUp className="w-5 h-5" /></button>
          </div>
          <div className="mt-auto">
            <button aria-label="Settings" className="p-2 rounded-xl hover:bg-gray-100 hover:text-gray-900 transition-colors"><Settings className="w-5 h-5" /></button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col bg-white relative w-full overflow-hidden">
          {/* Topbar */}
          <div className="h-20 md:h-24 border-b border-gray-100 flex items-center justify-between px-4 md:px-8 shrink-0 bg-white z-10">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-violet-600 text-white flex items-center justify-center font-bold text-lg shrink-0">
                SJ
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base md:text-xl font-bold text-gray-900 leading-tight">Sarah Jenkins</h2>
                  <span className="hidden sm:inline-flex px-2 py-0.5 rounded bg-gray-100 text-gray-600 text-[10px] font-semibold">Preview</span>
                </div>
                <div className="flex flex-wrap items-center gap-2 md:gap-3 text-[10px] md:text-xs text-gray-500 mt-1">
                  <span className="flex items-center gap-1"><Instagram className="w-3 h-3" /> @sarahj_style</span>
                  <span className="hidden sm:flex items-center gap-1"><MessageSquare className="w-3 h-3" /> @sarahj</span>
                  <span className="hidden md:flex items-center gap-1"><Mail className="w-3 h-3" /> sarah.j@example.com</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4 md:gap-6">
              <div className="text-right hidden sm:block">
                <p className="text-xs text-gray-500 mb-0.5">Total Value</p>
                <p className="text-base md:text-lg font-bold text-gray-900 leading-none">$450.00</p>
              </div>
              <div className="text-right hidden sm:block">
                <p className="text-xs text-gray-500 mb-0.5">Segment</p>
                <span className="inline-flex px-2 py-0.5 rounded-full bg-teal-100 text-teal-700 text-[10px] md:text-xs font-bold">VIP</span>
              </div>
            </div>
          </div>

          {/* 2-Column Layout */}
          <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">

            {/* Left Col: Timeline */}
            <div className="flex-1 p-6 md:p-8 border-r border-gray-100 overflow-hidden flex flex-col">
              <div className="flex items-center gap-2 mb-6 shrink-0">
                <Sparkles className="w-5 h-5 text-emerald-500" />
                <h3 className="font-bold text-lg text-gray-900">Relationship Timeline</h3>
              </div>

              <div className="flex-1 relative">
                {/* Connecting Line */}
                <div className="absolute left-[15px] top-4 bottom-4 w-[2px] bg-gray-100"></div>

                <div className="space-y-5 relative">
                  {timeline.map((node, i) => (
                    <motion.div
                      key={node.id}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, duration: 0.3 }}
                      className="relative pl-12"
                    >
                      {/* Icon Node */}
                      <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center border-[3px] border-white shadow-sm z-10
                        ${node.type === 'ai' ? 'bg-emerald-100' : node.type === 'conversion' ? 'bg-gray-900' : 'bg-gray-50'}
                      `}>
                        {node.icon}
                      </div>

                      {/* Content Card */}
                      <div className={`rounded-xl p-3.5 border transition-all hover:shadow-md
                        ${node.type === 'ai' ? 'bg-emerald-50/30 border-emerald-200' : node.type === 'conversion' ? 'bg-gray-900 border-gray-800 text-white' : 'bg-white border-gray-200 shadow-sm'}
                      `}>
                        <div className="flex justify-between items-start mb-1">
                          <h4 className={`font-bold text-sm ${node.type === 'ai' ? 'text-emerald-800' : node.type === 'conversion' ? 'text-white' : 'text-gray-900'}`}>
                            {node.title}
                          </h4>
                          <span className={`text-[10px] font-medium ${node.type === 'conversion' ? 'text-gray-400' : 'text-gray-400'}`}>{node.time}</span>
                        </div>
                        <p className={`text-xs leading-relaxed ${node.type === 'ai' ? 'text-emerald-700' : node.type === 'conversion' ? 'text-gray-300' : 'text-gray-600'}`}>
                          {node.desc}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Col: AI Reasoning */}
            <div className="w-full lg:w-[380px] p-6 md:p-8 bg-gray-50/50 overflow-hidden flex flex-col shrink-0">
              <div className="flex items-center gap-2 mb-6 shrink-0">
                <BrainCircuit className="w-5 h-5 text-gray-700" />
                <h3 className="font-bold text-lg text-gray-900">AI Reasoning</h3>
              </div>

              <div className="space-y-4 flex-1">
                {/* Card 1 */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, type: 'spring', stiffness: 150, damping: 20 }}
                  className="backdrop-blur-xl bg-white/80 border border-white/40 rounded-xl p-4 shadow-[0_8px_32px_rgba(0,0,0,0.06)]"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Target className="w-4 h-4 text-teal-500" />
                      <h4 className="font-bold text-sm text-gray-900">Channel Selection</h4>
                    </div>
                    <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2 py-1 rounded-md border border-teal-100">94% Match</span>
                  </div>
                  <p className="text-sm text-gray-700">Chose <strong className="text-gray-900">IG DM</strong> over TikTok DM for first outreach.</p>
                </motion.div>

                {/* Card 2 */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.45, type: 'spring', stiffness: 150, damping: 20 }}
                  className="backdrop-blur-xl bg-white/80 border border-white/40 rounded-xl p-4 shadow-[0_8px_32px_rgba(0,0,0,0.06)]"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-orange-500" />
                      <h4 className="font-bold text-sm text-gray-900">Offer Strategy</h4>
                    </div>
                    <span className="text-xs font-bold text-orange-700 bg-orange-50 px-2 py-1 rounded-md border border-orange-100">+45% Conv.</span>
                  </div>
                  <p className="text-sm text-gray-700">Offered <strong className="text-gray-900">Early Access</strong> instead of 15% Discount.</p>
                </motion.div>

                {/* Card 3 */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6, type: 'spring', stiffness: 150, damping: 20 }}
                  className="backdrop-blur-xl bg-white/80 border border-white/40 rounded-xl p-4 shadow-[0_8px_32px_rgba(0,0,0,0.06)]"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <LineChart className="w-4 h-4 text-emerald-500" />
                    <h4 className="font-bold text-sm text-gray-900">Predictive Scoring</h4>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className="text-gray-600">Upsell Confidence</span>
                        <span className="font-bold text-emerald-600">82%</span>
                      </div>
                      <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: '82%' }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className="text-gray-600">Sentiment Score</span>
                        <span className="font-bold text-teal-600">Highly Positive</span>
                      </div>
                      <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-teal-500 rounded-full" style={{ width: '90%' }}></div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-gray-100 flex justify-between items-center">
                      <span className="text-xs text-gray-500">Projected LTV</span>
                      <span className="text-sm font-bold text-gray-900">$1,250 <span className="text-gray-400 font-normal text-xs">(Top 5%)</span></span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardPeek;
