import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { 
  MessageCircle, 
  Instagram, 
  ShoppingCart, 
  Zap, 
  TrendingUp, 
  Bot, 
  ArrowRight,
  Sparkles,
  DollarSign,
  LayoutDashboard,
  Users,
  MessageSquare,
  Settings,
  Search,
  Filter,
  CheckCircle2,
  Heart,
  Eye,
  Mail,
  Target,
  BarChart3,
  Fingerprint,
  Video,
  ShoppingBag,
  MousePointerClick,
  Repeat,
  Activity,
  Network,
  PlayCircle,
  Camera,
  X,
  Store,
  Facebook,
  Twitch,
  Twitter,
  Youtube,
  Send,
  Globe,
  Monitor,
  Layers,
  ChevronRight,
  BrainCircuit,
  LineChart
} from 'lucide-react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import SphereImageGrid, { ImageData } from './components/ui/img-sphere';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import BookDemo from './pages/BookDemo';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// --- Components ---

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/80 backdrop-blur-md border-b border-gray-200 py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gray-950 flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="font-display font-bold text-xl tracking-tight text-gray-950">GrowthSync</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          <Link to="/" className="hover:text-gray-950 transition-colors">Platform</Link>
          <a href="/#pricing" className="hover:text-gray-950 transition-colors">Pricing</a>
          <Link to="/blog" className="hover:text-gray-950 transition-colors">Blog</Link>
          <Link to="/demo" className="hover:text-gray-950 transition-colors">Book a demo</Link>
        </div>

        <div className="flex items-center gap-4">
          <button className="hidden sm:block text-sm font-medium text-gray-600 hover:text-gray-950 transition-colors">
            Sign in
          </button>
          <Link to="/demo" className="px-4 py-2 md:px-5 md:py-2.5 rounded-full bg-gray-950 text-white font-semibold text-sm hover:bg-gray-800 transition-colors">
            Try free
          </Link>
        </div>
      </div>
    </nav>
  );
};

const DashboardPeekClassic = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Subtle scroll animations to make it feel like it's revealing itself
  const y = useTransform(scrollYProgress, [0, 0.5], [100, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.95, 1]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5], [5, 0]);

  const mockData = [
    { id: 1, name: "Sarah Styles", handle: "@sarah_styles", source: "Instagram DM", intent: "Product Inquiry", aiAction: "Sent Checkout Link", status: "Converted", rev: "$129.00" },
    { id: 2, name: "Mike Runner", handle: "@mike_runner", source: "Story Mention", intent: "Brand Love", aiAction: "Offered 10% VIP", status: "Pending", rev: "-" },
    { id: 3, name: "Elena K.", handle: "@elena_k", source: "Live Q&A", intent: "Sizing Question", aiAction: "Answered + Linked", status: "Converted", rev: "$85.50" },
    { id: 4, name: "James W.", handle: "@james_w", source: "Comment", intent: "Restock Request", aiAction: "Added to Waitlist", status: "Nurturing", rev: "-" },
    { id: 5, name: "Chloe T.", handle: "@chloe_t", source: "Instagram DM", intent: "Shipping Issue", aiAction: "Resolved via Zendesk", status: "Retained", rev: "-" },
  ];

  return (
    <div ref={containerRef} className="w-full max-w-6xl mx-auto px-4 mt-12 md:mt-16" style={{ perspective: '1000px' }}>
      <motion.div 
        style={{ y, scale, rotateX, transformOrigin: "top center" }}
        className="bg-white rounded-t-2xl md:rounded-t-3xl border border-gray-200 shadow-[0_-20px_60px_-15px_rgba(0,0,0,0.1)] overflow-hidden h-[400px] md:h-[600px] flex"
      >
        {/* Sidebar */}
        <div className="hidden md:flex w-16 md:w-20 border-r border-gray-100 flex-col items-center py-6 gap-8 bg-gray-50/50">
          <div className="w-8 h-8 rounded-lg bg-gray-950 flex items-center justify-center mb-4">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <div className="flex flex-col gap-6 text-gray-400">
            <button className="p-2 rounded-xl hover:bg-gray-100 hover:text-gray-900 transition-colors"><LayoutDashboard className="w-5 h-5" /></button>
            <button className="p-2 rounded-xl bg-violet-50 text-violet-600 transition-colors"><Users className="w-5 h-5" /></button>
            <button className="p-2 rounded-xl hover:bg-gray-100 hover:text-gray-900 transition-colors"><MessageSquare className="w-5 h-5" /></button>
            <button className="p-2 rounded-xl hover:bg-gray-100 hover:text-gray-900 transition-colors"><TrendingUp className="w-5 h-5" /></button>
          </div>
          <div className="mt-auto">
            <button className="p-2 rounded-xl hover:bg-gray-100 hover:text-gray-900 transition-colors"><Settings className="w-5 h-5" /></button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col bg-white relative w-full overflow-hidden">
          {/* Topbar */}
          <div className="h-16 md:h-20 border-b border-gray-100 flex items-center justify-between px-4 md:px-8 shrink-0">
            <div className="flex items-center gap-2 md:gap-3">
              <h2 className="text-lg md:text-xl font-bold text-gray-900">Live Signals</h2>
              <span className="px-2 py-0.5 md:px-2.5 md:py-1 rounded-full bg-violet-100 text-violet-700 text-[10px] md:text-xs font-semibold">12 Active</span>
            </div>
            <div className="flex items-center gap-2 md:gap-4">
              <button className="p-1.5 md:p-2 text-gray-400 hover:text-gray-900 border border-gray-200 rounded-lg"><Search className="w-4 h-4" /></button>
              <button className="p-1.5 md:p-2 text-gray-400 hover:text-gray-900 border border-gray-200 rounded-lg"><Filter className="w-4 h-4" /></button>
              <button className="hidden sm:flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-gray-950 text-white rounded-lg text-sm font-medium hover:bg-gray-800">
                <Sparkles className="w-4 h-4" /> Deploy AI
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="flex-1 overflow-auto mock-scrollbar p-4 md:p-8">
            <table className="w-full text-left text-sm min-w-[600px]">
              <thead>
                <tr>
                  <th className="pb-4 font-medium text-gray-500 border-b border-gray-100">User</th>
                  <th className="pb-4 font-medium text-gray-500 border-b border-gray-100">Source</th>
                  <th className="pb-4 font-medium text-gray-500 border-b border-gray-100">Intent</th>
                  <th className="pb-4 font-medium text-gray-500 border-b border-gray-100">AI Action</th>
                  <th className="pb-4 font-medium text-gray-500 border-b border-gray-100 text-right">Revenue</th>
                </tr>
              </thead>
              <tbody>
                {mockData.map((row, i) => (
                  <tr key={row.id} className="group hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 border-b border-gray-50">
                      <div className="flex items-center gap-3">
                        <img src={`https://picsum.photos/seed/user${row.id}/100/100`} alt={row.name} className="w-8 h-8 rounded-full" referrerPolicy="no-referrer" />
                        <div>
                          <p className="font-medium text-gray-900">{row.name}</p>
                          <p className="text-xs text-gray-500">{row.handle}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 border-b border-gray-50 text-gray-600 flex items-center gap-2 mt-2">
                      {row.source.includes('Instagram') && <Instagram className="w-4 h-4 text-pink-500" />}
                      {row.source}
                    </td>
                    <td className="py-4 border-b border-gray-50 text-gray-900">{row.intent}</td>
                    <td className="py-4 border-b border-gray-50">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-violet-50 text-violet-700 text-xs font-medium border border-violet-100">
                        <Bot className="w-3 h-3" /> {row.aiAction}
                      </div>
                    </td>
                    <td className="py-4 border-b border-gray-50 text-right font-medium text-gray-900">
                      {row.status === 'Converted' ? (
                        <span className="text-emerald-600 flex items-center justify-end gap-1">
                          <CheckCircle2 className="w-4 h-4" /> {row.rev}
                        </span>
                      ) : (
                        <span className="text-gray-400">{row.status}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

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
            <button className="p-2 rounded-xl hover:bg-gray-100 hover:text-gray-900 transition-colors"><LayoutDashboard className="w-5 h-5" /></button>
            <button className="p-2 rounded-xl bg-violet-50 text-violet-600 transition-colors"><Users className="w-5 h-5" /></button>
            <button className="p-2 rounded-xl hover:bg-gray-100 hover:text-gray-900 transition-colors"><MessageSquare className="w-5 h-5" /></button>
            <button className="p-2 rounded-xl hover:bg-gray-100 hover:text-gray-900 transition-colors"><TrendingUp className="w-5 h-5" /></button>
          </div>
          <div className="mt-auto">
            <button className="p-2 rounded-xl hover:bg-gray-100 hover:text-gray-900 transition-colors"><Settings className="w-5 h-5" /></button>
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
                <span className="inline-flex px-2 py-0.5 rounded-full bg-violet-100 text-violet-700 text-[10px] md:text-xs font-bold">VIP</span>
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
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Target className="w-4 h-4 text-blue-500" />
                      <h4 className="font-bold text-sm text-gray-900">Channel Selection</h4>
                    </div>
                    <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-1 rounded-md border border-blue-100">94% Match</span>
                  </div>
                  <p className="text-sm text-gray-700">Chose <strong className="text-gray-900">IG DM</strong> over TikTok DM for first outreach.</p>
                </motion.div>

                {/* Card 2 */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm"
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
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm"
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
                        <span className="font-bold text-blue-600">Highly Positive</span>
                      </div>
                      <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: '90%' }}></div>
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

const Hero = () => {
  return (
    <section className="pt-24 md:pt-32 pb-0 bg-white text-gray-950 overflow-hidden relative">
      <div className="max-w-5xl mx-auto px-4 md:px-6 text-center relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-50 text-orange-600 text-xs md:text-sm font-medium mb-6 md:mb-8 border border-orange-100"
        >
          <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></div>
          Rated 4.9/5 by Top E-commerce Brands
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold tracking-tight mb-6 md:mb-8 leading-[1.05]"
        >
          Turn social noise into <span className="text-gradient">revenue.</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-base md:text-xl text-gray-500 mb-8 md:mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          Turn millions of social interactions into a retargeted revenue stream. Find intent in DMs, personalize outreach, launch campaigns, and close deals directly on social channels.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link to="/demo" className="w-full sm:w-auto px-8 py-4 rounded-full bg-gray-950 text-white font-semibold text-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
            Start generating revenue <ArrowRight className="w-5 h-5" />
          </Link>
          <a href="#pricing" className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-gray-900 border border-gray-200 font-semibold text-lg hover:bg-gray-50 transition-colors flex items-center justify-center">
            See pricing
          </a>
        </motion.div>
        <p className="mt-4 text-sm text-gray-400">No credit card required</p>

      </div>

      <DashboardPeek />

      {/* Trusted By */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="mt-16 md:mt-24 mb-16 md:mb-24 w-full max-w-5xl mx-auto overflow-hidden mask-edges px-4"
      >
        <div className="flex w-max animate-marquee gap-16 md:gap-24 opacity-50 grayscale">
          {[
            'Von Dutch', 'Comf', 'Homme Femme', 'Ed Hardy', 'NDA', 'Dripglosss', 
            'The Genuine Club', 'Klean By Ky', 'Markia', 'Canvas Beauty', 'The Hoop Gang', 'Barcode',
            'Von Dutch', 'Comf', 'Homme Femme', 'Ed Hardy', 'NDA', 'Dripglosss', 
            'The Genuine Club', 'Klean By Ky', 'Markia', 'Canvas Beauty', 'The Hoop Gang', 'Barcode'
          ].map((brand, i) => (
            <span key={i} className="text-xl md:text-2xl font-display font-bold text-gray-400 tracking-wider uppercase shrink-0">
              {brand}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

const InteractiveDemo = () => {
  return (
    <section className="py-20 md:py-32 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        
        <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Left: Text Content */}
          <div className="text-center lg:text-left">
            <p className="text-xs md:text-sm font-bold text-violet-600 tracking-widest uppercase mb-3 md:mb-4">The Magic</p>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-gray-950 leading-tight mb-4 md:mb-6">
              Turn missed comments into VIP sales
            </h2>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-6 md:mb-8">
              Never lose a lead from a busy live stream again. GrowthSync automatically follows up with personalized offers based on exactly what they asked for.
            </p>
            <ul className="space-y-3 md:space-y-4 text-left inline-block lg:block">
              {['Instant DM follow-ups', 'Context-aware product bundling', 'One-time use checkout links'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-700 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
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
                    <img src="https://picsum.photos/seed/customer1/100/100" className="w-full h-full rounded-full" alt="Customer" referrerPolicy="no-referrer" />
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
                  viewport={{ once: false, margin: "-50px" }}
                  className="flex gap-2"
                >
                  <img src="https://picsum.photos/seed/customer1/100/100" className="w-8 h-8 rounded-full mt-auto shrink-0" alt="Customer" referrerPolicy="no-referrer" />
                  <div className="bg-gray-200 text-gray-900 px-4 py-2.5 rounded-2xl rounded-bl-sm text-sm max-w-[85%]">
                    Y'all didn't respond to me during the live 😢 I really wanted that pink hat!
                  </div>
                </motion.div>

                {/* AI Message 1 */}
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: false, margin: "-50px" }}
                  transition={{ delay: 1.5 }}
                  className="flex gap-2 flex-row-reverse"
                >
                  <div className="w-8 h-8 rounded-full bg-violet-600 flex items-center justify-center mt-auto shrink-0">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-violet-600 text-white px-4 py-2.5 rounded-2xl rounded-br-sm text-sm max-w-[85%]">
                    Oh no, I'm so sorry Jessica! We were swamped. I saw you were eyeing the pink hat! 🧢
                  </div>
                </motion.div>

                {/* AI Message 2 */}
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: false, margin: "-50px" }}
                  transition={{ delay: 3 }}
                  className="flex gap-2 flex-row-reverse"
                >
                  <div className="w-8 h-8 rounded-full bg-violet-600 flex items-center justify-center mt-auto shrink-0 opacity-0">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-violet-600 text-white px-4 py-2.5 rounded-2xl rounded-br-sm text-sm max-w-[85%]">
                    Here's a secret bundle: The pink hat + matching pants at the live flash sale price. Just for you! 🤫
                  </div>
                </motion.div>

                {/* AI Product Card */}
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: false, margin: "-50px" }}
                  transition={{ delay: 4.5 }}
                  className="flex gap-2 flex-row-reverse"
                >
                  <div className="w-8 h-8 rounded-full bg-violet-600 flex items-center justify-center mt-auto shrink-0 opacity-0">
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

const FeatureTwo = () => {
  return (
    <section className="py-20 md:py-32 bg-white overflow-hidden border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-center">
          
          {/* Left: Animated Live UI */}
          <div className="relative order-2 lg:order-1">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-br from-emerald-100 to-cyan-100 rounded-full blur-3xl opacity-50"></div>
            
            <div className="relative bg-[#0a0a0a] border border-gray-800 shadow-2xl rounded-3xl md:rounded-[2rem] overflow-hidden max-w-sm mx-auto flex flex-col h-[450px] md:h-[550px]">
              {/* Live Video Mock */}
              <div className="absolute inset-0">
                <img src="https://picsum.photos/seed/live/400/800" className="w-full h-full object-cover opacity-60" alt="Live Stream" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
              </div>

              {/* Top Bar */}
              <div className="relative z-10 p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="bg-pink-600 text-white text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1">
                    <PlayCircle className="w-3 h-3" /> LIVE
                  </div>
                  <div className="bg-black/50 backdrop-blur-md text-white text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1">
                    <Eye className="w-3 h-3" /> 4.2K
                  </div>
                </div>
                <X className="w-5 h-5 text-white" />
              </div>

              {/* Chat Area */}
              <div className="relative z-10 flex-1 flex flex-col justify-end p-4 pb-20 space-y-3">
                <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} className="flex items-center gap-2">
                  <img src="https://picsum.photos/seed/u1/100/100" className="w-6 h-6 rounded-full" alt="User" referrerPolicy="no-referrer" />
                  <p className="text-white text-sm"><span className="font-bold">sarah_j</span> Omg need this!!</p>
                </motion.div>
                <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }} className="flex items-center gap-2">
                  <img src="https://picsum.photos/seed/u2/100/100" className="w-6 h-6 rounded-full" alt="User" referrerPolicy="no-referrer" />
                  <p className="text-white text-sm"><span className="font-bold">mike.styles</span> How much is the jacket?</p>
                </motion.div>
                
                {/* GrowthSync Bot Intervention */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }} 
                  whileInView={{ opacity: 1, scale: 1 }} 
                  transition={{ delay: 1.5 }} 
                  className="bg-white/10 backdrop-blur-md border border-white/20 p-3 rounded-xl mt-2"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center">
                      <Bot className="w-3 h-3 text-white" />
                    </div>
                    <p className="text-emerald-400 text-xs font-bold">GrowthSync Auto-Reply</p>
                  </div>
                  <p className="text-white text-sm">@mike.styles The jacket is $120! Just sent a checkout link to your DMs 🚀</p>
                </motion.div>

                {/* Floating Hearts */}
                <motion.div 
                  animate={{ y: [-20, -100], opacity: [1, 0], scale: [1, 1.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute right-4 bottom-24"
                >
                  <Heart className="w-6 h-6 text-pink-500 fill-pink-500" />
                </motion.div>
              </div>
            </div>
          </div>

          {/* Right: Text Content */}
          <div className="order-1 lg:order-2 text-center lg:text-left">
            <p className="text-xs md:text-sm font-bold text-emerald-600 tracking-widest uppercase mb-3 md:mb-4">Live Commerce</p>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-gray-950 leading-tight mb-4 md:mb-6">
              Turn live viewers into live buyers
            </h2>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-6 md:mb-8">
              Don't let the hype die when the stream ends. Capture the missed opportunity by automatically DMing viewers who comment during your live sessions.
            </p>
            <ul className="space-y-3 md:space-y-4 text-left inline-block lg:block">
              {['Auto-reply to sizing questions', 'Send direct checkout links in real-time', 'Capture leads while you stream'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-700 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
};

const FeatureThree = () => {
  return (
    <section className="py-20 md:py-32 bg-gray-50 overflow-hidden border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-center">
          
          {/* Left: Text Content */}
          <div className="text-center lg:text-left">
            <p className="text-xs md:text-sm font-bold text-pink-600 tracking-widest uppercase mb-3 md:mb-4">Retention Engine</p>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-gray-950 leading-tight mb-4 md:mb-6">
              Build loyalty with your community
            </h2>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-6 md:mb-8">
              Simply conversing with your followers turns into opportunities to know more about them, identify them, and turn them into sales down the line.
            </p>
            <ul className="space-y-3 md:space-y-4 text-left inline-block lg:block">
              {['Reward story mentions instantly', 'Build VIP lists via DMs', 'Gather zero-party data naturally'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-700 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-pink-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Animated Story UI */}
          <div className="relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-br from-pink-100 to-orange-100 rounded-full blur-3xl opacity-50"></div>
            
            <div className="relative bg-white border border-gray-200 shadow-2xl rounded-3xl md:rounded-[2rem] overflow-hidden max-w-md mx-auto flex flex-col h-[450px] md:h-[500px]">
              {/* Story Header */}
              <div className="bg-white border-b border-gray-100 p-4 flex items-center gap-3 shrink-0 z-10">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500 p-[2px]">
                  <div className="bg-white rounded-full p-[2px] w-full h-full">
                    <img src="https://picsum.photos/seed/brand/100/100" className="w-full h-full rounded-full" alt="Brand" referrerPolicy="no-referrer" />
                  </div>
                </div>
                <div>
                  <p className="font-bold text-sm text-gray-900">yourbrand</p>
                  <p className="text-xs text-gray-500">Mentioned you in their story</p>
                </div>
              </div>

              {/* Chat Body */}
              <div className="flex-1 p-5 space-y-4 bg-gray-50/50 overflow-y-auto flex flex-col justify-end">
                
                {/* Story Reply Context */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="bg-gray-200 rounded-xl p-2 flex gap-3 max-w-[85%] mb-2"
                >
                  <img src="https://picsum.photos/seed/bag/100/100" className="w-12 h-16 object-cover rounded-lg" alt="Story" referrerPolicy="no-referrer" />
                  <div className="flex flex-col justify-center">
                    <p className="text-xs text-gray-500 font-bold">jessica.wears</p>
                    <p className="text-sm text-gray-900 italic">"Obsessed with this new bag! 😍"</p>
                  </div>
                </motion.div>

                {/* AI Message 1 */}
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 1 }}
                  className="flex gap-2 flex-row-reverse"
                >
                  <div className="w-8 h-8 rounded-full bg-pink-600 flex items-center justify-center mt-auto shrink-0">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-pink-600 text-white px-4 py-2.5 rounded-2xl rounded-br-sm text-sm max-w-[85%]">
                    Yo, thanks for adding this on your story! I see you're loving that bag we just dropped. 🔥
                  </div>
                </motion.div>

                {/* AI Message 2 */}
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 2.5 }}
                  className="flex gap-2 flex-row-reverse"
                >
                  <div className="w-8 h-8 rounded-full bg-pink-600 flex items-center justify-center mt-auto shrink-0 opacity-0">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-pink-600 text-white px-4 py-2.5 rounded-2xl rounded-br-sm text-sm max-w-[85%]">
                    We're actually dropping a new one in 3 weeks. No one knows about it yet. Want me to add you to the VIP list?
                  </div>
                </motion.div>

                {/* User Message */}
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 4 }}
                  className="flex gap-2"
                >
                  <img src="https://picsum.photos/seed/customer1/100/100" className="w-8 h-8 rounded-full mt-auto shrink-0" alt="Customer" referrerPolicy="no-referrer" />
                  <div className="bg-gray-200 text-gray-900 px-4 py-2.5 rounded-2xl rounded-bl-sm text-sm max-w-[85%]">
                    Yeah, please! What's the drop?
                  </div>
                </motion.div>

                {/* AI Message 3 */}
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 5.5 }}
                  className="flex gap-2 flex-row-reverse"
                >
                  <div className="w-8 h-8 rounded-full bg-pink-600 flex items-center justify-center mt-auto shrink-0 opacity-0">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-pink-600 text-white px-4 py-2.5 rounded-2xl rounded-br-sm text-sm max-w-[85%]">
                    Got you saved. What's your email? I'll send you the secret link when it drops. 🤫
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

const ROICalculator = () => {
  const [sliderValue, setSliderValue] = useState(0);
  
  // Exponential curve for better granularity at lower numbers
  const curve = Math.pow(sliderValue / 100, 2);
  
  const audience = Math.floor(25000 + curve * (5000000 - 25000));
  const untappedRevenue = Math.floor(2500 + curve * (200000 - 2500));
  const interactions = Math.floor(audience * 0.15); // 15% interaction rate

  return (
    <section className="py-20 md:py-32 bg-white relative overflow-hidden text-gray-950 border-t border-gray-100">
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>
      <div className="max-w-4xl mx-auto px-4 md:px-12 relative z-10 text-center">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-red-50 text-red-600 text-xs md:text-sm font-bold mb-6 md:mb-8 border border-red-100 uppercase tracking-wider"
        >
          <Zap className="w-3 h-3 md:w-4 md:h-4" />
          Your signals are expiring
        </motion.div>

        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-6xl font-display font-bold mb-4 md:mb-6 tracking-tight"
        >
          How much revenue are you ignoring?
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-lg md:text-xl text-gray-600 mb-8 md:mb-12 max-w-2xl mx-auto"
        >
          Drag the slider to see your social listening score and untapped revenue potential.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
          className="bg-white border border-gray-200 shadow-2xl shadow-gray-200/50 rounded-2xl md:rounded-3xl p-6 md:p-12 relative max-w-3xl mx-auto hover:shadow-violet-500/10 transition-shadow duration-500"
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
                className="absolute top-0 left-0 h-full bg-violet-600 rounded-full pointer-events-none"
                style={{ width: `calc(${sliderValue}% + ${12 - sliderValue * 0.24}px)` }}
              ></div>
              <input 
                type="range" 
                min="0" 
                max="100" 
                step="1"
                value={sliderValue} 
                onChange={(e) => setSliderValue(parseInt(e.target.value))}
                className="absolute inset-0 w-full h-full appearance-none bg-transparent cursor-pointer z-10 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:md:w-6 [&::-webkit-slider-thumb]:md:h-6 [&::-webkit-slider-thumb]:bg-violet-600 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:hover:scale-110 [&::-webkit-slider-thumb]:transition-transform [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:md:w-6 [&::-moz-range-thumb]:md:h-6 [&::-moz-range-thumb]:bg-violet-600 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:shadow-md [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:hover:scale-110 [&::-moz-range-thumb]:transition-transform"
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
            <div className="bg-violet-600 rounded-xl md:rounded-2xl p-6 md:p-8 border border-violet-500 text-left shadow-lg shadow-violet-600/20 transition-transform hover:-translate-y-1 duration-300 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-tr from-violet-600 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <p className="text-xs md:text-sm text-violet-200 font-bold uppercase tracking-wider mb-2 md:mb-3">Untapped Revenue / Mo</p>
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

const SegmentOfOne = () => {
  // Generate mock customer data for the sphere
  const CUSTOMERS: ImageData[] = Array.from({ length: 60 }).map((_, i) => ({
    id: `cust-${i}`,
    src: `https://picsum.photos/seed/cust${i}/200/200`,
    alt: `Customer ${i}`,
    name: `Customer ${i}`,
    aov: `$${(Math.random() * 200 + 50).toFixed(2)}`,
    orders: Math.floor(Math.random() * 10) + 1,
    lastInteraction: ['Watched Story', 'Added to Cart', 'DM Inquiry', 'Liked Post'][Math.floor(Math.random() * 4)],
    channel: ['Instagram', 'Email', 'SMS', 'TikTok'][Math.floor(Math.random() * 4)]
  }));

  const SPHERE_CONFIG = {
    containerSize: 600,
    sphereRadius: 200,
    dragSensitivity: 0.8,
    momentumDecay: 0.96,
    maxRotationSpeed: 6,
    baseImageScale: 0.15,
    hoverScale: 1.3,
    perspective: 1000,
    autoRotate: true,
    autoRotateSpeed: 0.2
  };

  return (
    <section className="pb-20 pt-16 md:pb-32 md:pt-20 bg-[#030712] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-violet-900/20 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 md:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text Content */}
          <div className="max-w-xl text-center lg:text-left mx-auto lg:mx-0">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 text-violet-300 text-xs md:text-sm font-medium mb-4 md:mb-6 border border-white/10"
            >
              <Network className="w-3 h-3 md:w-4 md:h-4" />
              The Intelligence Engine
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-6xl font-display font-bold mb-4 md:mb-6 text-white leading-tight"
            >
              The Segment of <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-pink-400">One.</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-gray-400 leading-relaxed mb-6 md:mb-8"
            >
              Our proprietary engine ingests millions of interaction points to build a living, breathing neural network of every single customer. You don't talk to segments anymore. You talk to Jessica.
            </motion.p>
            
            <motion.ul 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="space-y-3 md:space-y-4 text-left inline-block lg:block"
            >
              {[
                'Predictive AOV & LTV modeling',
                'Cross-channel interaction history',
                'Real-time intent scoring'
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-300 font-medium">
                  <div className="w-1.5 h-1.5 rounded-full bg-violet-500"></div>
                  {item}
                </li>
              ))}
            </motion.ul>
          </div>

          {/* Right: Desktop Web Visualization */}
          <div className="hidden md:flex justify-center items-center relative">
            <SphereImageGrid images={CUSTOMERS} {...SPHERE_CONFIG} />
          </div>

          {/* Mobile List View */}
          <div className="md:hidden flex flex-col gap-4 relative z-20 mt-12">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
              <p className="text-gray-400">Interactive data sphere is optimized for desktop viewing. Please view on a larger screen to explore the neural profiles.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const INTEGRATION_LOGOS = [
  "https://cdn.simpleicons.org/instagram/E4405F",
  "https://cdn.simpleicons.org/tiktok/000000",
  "https://cdn.simpleicons.org/gmail/EA4335",
  "https://cdn.simpleicons.org/ebay/E53238",
  "https://cdn.simpleicons.org/twitch/9146FF",
  "https://cdn.simpleicons.org/whatsapp/25D366",
  "https://cdn.simpleicons.org/telegram/26A5E4",
  "https://cdn.simpleicons.org/discord/5865F2",
  "https://cdn.simpleicons.org/paypal/00457C",
];

const shuffle = <T,>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

// Split into two distinct halves to avoid side-by-side duplicates
const half = Math.ceil(INTEGRATION_LOGOS.length / 2);
const col1Base = shuffle(INTEGRATION_LOGOS.slice(0, half));
const col2Base = shuffle(INTEGRATION_LOGOS.slice(half));

// 4 copies to ensure the diagonal columns are long enough to loop seamlessly
const COL1_ITEMS = [...col1Base, ...col1Base, ...col1Base, ...col1Base];
const COL2_ITEMS = [...col2Base, ...col2Base, ...col2Base, ...col2Base];

const IntegrationCard: React.FC<{ url: string }> = ({ url }) => {
  return (
    <div className="w-24 h-24 md:w-32 md:h-32 rounded-[2rem] bg-white shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 flex items-center justify-center shrink-0 transition-all hover:scale-110 hover:shadow-[0_20px_40px_rgb(0,0,0,0.12)]">
      <img src={url} alt="Integration logo" className="w-12 h-12 md:w-16 md:h-16 object-contain opacity-70 hover:opacity-100 transition-opacity" referrerPolicy="no-referrer" />
    </div>
  );
};

const Integrations = () => {
  return (
    <section className="py-24 md:py-32 bg-white overflow-hidden border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Content */}
          <div className="max-w-xl relative z-20">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-sm font-bold mb-6">
              <Layers className="w-4 h-4" /> Integrations
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-gray-950 mb-6 leading-[1.1]">
              Integrates with<br />your favorite tools
            </h2>
            <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
              Seamless social listening and commerce integration across every medium where you interact with your audience.
            </p>
            <Link to="/integrations" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-gray-200 text-gray-900 font-bold hover:bg-gray-50 transition-colors">
              Explore integrations <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Right Content - Diagonal Scrolling Grid */}
          <div className="relative h-[500px] md:h-[650px] w-full flex justify-center lg:justify-end overflow-hidden rounded-3xl">
            
            {/* Stronger Gradient Masks for fading effect */}
            <div className="absolute inset-y-0 left-0 w-24 md:w-40 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
            <div className="absolute inset-y-0 right-0 w-24 md:w-40 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
            <div className="absolute inset-x-0 top-0 h-24 md:h-40 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none"></div>
            <div className="absolute inset-x-0 bottom-0 h-24 md:h-40 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none"></div>

            <style>{`
              @keyframes scroll-up {
                0% { transform: translateY(0); }
                100% { transform: translateY(-50%); }
              }
              @keyframes scroll-down {
                0% { transform: translateY(-50%); }
                100% { transform: translateY(0); }
              }
              .animate-scroll-up {
                animation: scroll-up 35s linear infinite;
              }
              .animate-scroll-down {
                animation: scroll-down 35s linear infinite;
              }
              
              /* Pause animation on hover */
              .pause-on-hover:hover .animate-scroll-up,
              .pause-on-hover:hover .animate-scroll-down {
                /* animation-play-state: paused; */
              }
            `}</style>

            {/* Rotated Container */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] flex gap-6 md:gap-10 justify-center items-center rotate-[-12deg]">
              {/* Column 1 - Up */}
              <div className="flex flex-col gap-6 md:gap-10 animate-scroll-up">
                {COL1_ITEMS.map((url, i) => (
                  <IntegrationCard key={i} url={url} />
                ))}
              </div>
              {/* Column 2 - Down */}
              <div className="flex flex-col gap-6 md:gap-10 animate-scroll-down" style={{ animationDelay: '-17s' }}>
                {COL2_ITEMS.map((url, i) => (
                  <IntegrationCard key={i} url={url} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Pricing = () => {
  return (
    <section id="pricing" className="py-20 md:py-32 bg-white relative">
      <div className="max-w-4xl mx-auto px-4 md:px-12 text-center">
        <h2 className="text-3xl md:text-6xl font-display font-bold mb-4 md:mb-6 text-gray-950">
          Free to play. <br className="hidden md:block"/>
          <span className="text-gradient">We win when you win.</span>
        </h2>
        <p className="text-lg md:text-xl text-gray-500 mb-10 md:mb-16 max-w-2xl mx-auto">
          No monthly retainers. No seat limits. No hidden fees. We only charge a percentage of the revenue we directly generate for you.
        </p>

        <div className="bg-white border border-gray-200 shadow-2xl rounded-3xl md:rounded-[2.5rem] p-6 md:p-12 relative overflow-hidden max-w-2xl mx-auto">
          <div className="flex flex-col items-center relative z-10">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-violet-50 flex items-center justify-center mb-4 md:mb-6">
              <TrendingUp className="w-8 h-8 md:w-10 md:h-10 text-violet-600" />
            </div>
            
            <div className="flex items-baseline gap-2 mb-1 md:mb-2">
              <span className="text-5xl md:text-8xl font-display font-bold text-gray-950">15%</span>
            </div>
            <p className="text-violet-600 font-bold tracking-widest uppercase text-xs md:text-sm mb-6 md:mb-8">Of Attributed Revenue</p>
            
            <div className="w-full h-px bg-gray-100 mb-6 md:mb-8"></div>
            
            <div className="grid sm:grid-cols-2 gap-3 md:gap-4 w-full text-left mb-8 md:mb-10">
              <div className="flex items-center gap-2 md:gap-3">
                <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-gray-900 shrink-0" />
                <span className="text-sm md:text-base text-gray-600 font-medium">0 Platform Fee</span>
              </div>
              <div className="flex items-center gap-2 md:gap-3">
                <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-gray-900 shrink-0" />
                <span className="text-sm md:text-base text-gray-600 font-medium">Unlimited Contacts</span>
              </div>
              <div className="flex items-center gap-2 md:gap-3">
                <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-gray-900 shrink-0" />
                <span className="text-sm md:text-base text-gray-600 font-medium">All Integrations</span>
              </div>
              <div className="flex items-center gap-2 md:gap-3">
                <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-gray-900 shrink-0" />
                <span className="text-sm md:text-base text-gray-600 font-medium">White-glove Onboarding</span>
              </div>
            </div>

            <Link to="/demo" className="w-full py-4 md:py-5 rounded-xl md:rounded-2xl bg-gray-950 text-white font-bold text-base md:text-lg hover:bg-gray-800 transition-colors flex items-center justify-center">
              Start Generating Revenue
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 bg-white pt-16 pb-8 md:pt-20 md:pb-10">
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10 mb-12 md:mb-16">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4 md:mb-6">
              <div className="w-8 h-8 rounded-lg bg-gray-950 flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="font-display font-bold text-xl tracking-tight text-gray-950">GrowthSync</span>
            </div>
            <p className="text-gray-500 max-w-sm text-sm md:text-base">
              The all-in-one conversational AI platform turning social noise into attributed revenue for modern brands.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-gray-900 mb-4">Platform</h4>
            <ul className="space-y-3 text-gray-500 text-sm font-medium">
              <li><a href="#" className="hover:text-gray-900 transition-colors">Features</a></li>
              <li><Link to="/integrations" className="hover:text-gray-900 transition-colors">Integrations</Link></li>
              <li><a href="#" className="hover:text-gray-900 transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-gray-900 transition-colors">Changelog</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-gray-900 mb-4">Company</h4>
            <ul className="space-y-3 text-gray-500 text-sm font-medium">
              <li><a href="#" className="hover:text-gray-900 transition-colors">About</a></li>
              <li><Link to="/blog" className="hover:text-gray-900 transition-colors">Blog</Link></li>
              <li><a href="#" className="hover:text-gray-900 transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-gray-900 transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-medium text-gray-400">
          <p>© {new Date().getFullYear()} GrowthSync Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gray-900 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-900 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

import { Helmet, HelmetProvider } from 'react-helmet-async';

const INTEGRATION_DETAILS = [
  { name: 'Instagram', url: "https://cdn.simpleicons.org/instagram/E4405F" },
  { name: 'TikTok', url: "https://cdn.simpleicons.org/tiktok/000000" },
  { name: 'Gmail', url: "https://cdn.simpleicons.org/gmail/EA4335" },
  { name: 'eBay', url: "https://cdn.simpleicons.org/ebay/E53238" },
  { name: 'Twitch', url: "https://cdn.simpleicons.org/twitch/9146FF" },
  { name: 'WhatsApp', url: "https://cdn.simpleicons.org/whatsapp/25D366" },
  { name: 'Telegram', url: "https://cdn.simpleicons.org/telegram/26A5E4" },
  { name: 'Discord', url: "https://cdn.simpleicons.org/discord/5865F2" },
  { name: 'PayPal', url: "https://cdn.simpleicons.org/paypal/00457C" },
];

const IntegrationsPage = () => {
  return (
    <div className="pt-32 pb-24 bg-gray-50 min-h-screen">
      <Helmet>
        <title>Integrations | GrowthSync</title>
        <meta name="description" content="Connect your entire stack with GrowthSync." />
      </Helmet>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-sm font-bold mb-6">
            <Layers className="w-4 h-4" /> Integrations
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-gray-950 mb-6">
            Connect your entire stack
          </h1>
          <p className="text-xl text-gray-600">
            Seamlessly integrate with the tools you already use. Sync data, automate workflows, and unify your social commerce strategy.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {INTEGRATION_DETAILS.map((integration, i) => (
            <div key={i} className="flex flex-col items-center justify-center p-8 md:p-10 bg-white rounded-3xl shadow-sm border border-gray-100 transition-all hover:shadow-md hover:-translate-y-1">
              <div className="w-16 h-16 md:w-20 md:h-20 mb-6 flex items-center justify-center">
                <img src={integration.url} alt={integration.name} className="w-full h-full object-contain opacity-80 hover:opacity-100 transition-opacity" referrerPolicy="no-referrer" />
              </div>
              <span className="font-bold text-gray-900">{integration.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-violet-100 selection:text-violet-900">
          <Navbar />
          <Routes>
            <Route path="/" element={
              <main>
                <Helmet>
                  <title>GrowthSync | Conversational AI for Social Commerce</title>
                  <meta name="description" content="Turn social noise into attributed revenue. GrowthSync is the all-in-one conversational AI platform for modern brands." />
                </Helmet>
                <Hero />
                <InteractiveDemo />
                <FeatureTwo />
                <FeatureThree />
                <ROICalculator />
                <SegmentOfOne />
                <Integrations />
                <Pricing />
              </main>
            } />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/demo" element={<BookDemo />} />
            <Route path="/integrations" element={<IntegrationsPage />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </HelmetProvider>
  );
}

