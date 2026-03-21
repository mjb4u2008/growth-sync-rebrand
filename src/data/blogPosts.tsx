import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export const blogPosts = [
  {
    id: 1,
    title: "How to Turn Instagram DMs into a Predictable Revenue Channel",
    excerpt: "Stop leaving money on the table. Learn how modern brands are using conversational AI to capture intent and drive sales directly from Instagram DMs.",
    category: "Social Commerce",
    author: {
      name: "Sarah Jenkins",
      role: "VP of Growth at GrowthSync",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop",
      bio: "Sarah is the VP of Growth at GrowthSync. She previously led acquisition at two unicorn DTC brands and writes weekly about the intersection of AI, social media, and revenue generation."
    },
    date: "Oct 12, 2023",
    dateISO: "2023-10-12T08:00:00Z",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=2000&auto=format&fit=crop",
    tags: ['Instagram', 'Automation', 'E-commerce', 'Growth'],
    content: (
      <>
        <p className="text-xl leading-relaxed mb-8 text-gray-600 font-medium">
          Stop leaving money on the table. For years, brands have relied on the "link in bio" to drive traffic from Instagram to their storefronts. But in 2026, forcing users to leave the app is the fastest way to kill a conversion.
        </p>

        <p className="text-lg leading-relaxed mb-8">
          Modern consumers expect frictionless experiences. When they see a product they like on their feed or in a Story, they don't want to hunt for a link, wait for a browser to load, and navigate a mobile site. They want to buy it right then and there. This is where conversational commerce via Instagram Direct Messages (DMs) changes the game.
        </p>

        <h2 className="text-3xl font-display font-bold text-gray-950 mt-16 mb-6">
          The Problem with the "Link in Bio"
        </h2>
        
        <p className="text-lg leading-relaxed mb-6">
          Think about the traditional user journey from an Instagram post to a purchase:
        </p>

        <ul className="space-y-4 mb-8">
          {[
            "User sees a post and reads the caption.",
            "User clicks to the brand's profile.",
            "User clicks the link in the bio.",
            "User navigates a Linktree or landing page to find the specific product.",
            "User adds to cart and checks out."
          ].map((step, i) => (
            <li key={i} className="flex items-start gap-3 text-lg">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center text-sm font-bold mt-0.5">{i + 1}</span>
              <span>{step}</span>
            </li>
          ))}
        </ul>

        <p className="text-lg leading-relaxed mb-8">
          Every single one of those steps represents a drop-off point. Industry averages show that you lose up to <strong>40% of your intent-driven traffic</strong> at each click. By the time they reach the checkout page, only a fraction of the original audience remains.
        </p>

        <blockquote className="border-l-4 border-teal-600 bg-teal-50 p-6 md:p-8 rounded-r-2xl my-12">
          <p className="text-xl md:text-2xl font-display font-medium text-teal-950 leading-snug mb-4">
            "When we moved our primary CTA from 'Link in Bio' to 'DM us the word VIP', our conversion rate from social traffic quadrupled overnight."
          </p>
          <footer className="text-teal-700 font-bold text-sm uppercase tracking-wider">
            — Marcus Chen, Head of Growth at Lumina
          </footer>
        </blockquote>

        <h2 className="text-3xl font-display font-bold text-gray-950 mt-16 mb-6">
          Enter Conversational Commerce
        </h2>

        <p className="text-lg leading-relaxed mb-8">
          Instead of routing users away from the platform, what if you could capture their intent the moment it peaks? By using AI-driven DM automation, you can instantly reply to comments, story replies, and direct messages with personalized product recommendations and direct checkout links.
        </p>

        <h3 className="text-2xl font-bold text-gray-900 mt-10 mb-6">
          3 Steps to Automate DM Revenue
        </h3>

        <div className="space-y-8 mb-12">
          <div>
            <h4 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" /> 1. Set Up Keyword Triggers
            </h4>
            <p className="text-lg leading-relaxed text-gray-600 pl-7">
              Tell your audience to comment a specific word (e.g., "SUMMER") on your latest Reel. Your AI agent instantly detects this keyword and sends a personalized DM to the user.
            </p>
          </div>
          <div>
            <h4 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" /> 2. Qualify and Recommend
            </h4>
            <p className="text-lg leading-relaxed text-gray-600 pl-7">
              The AI doesn't just send a blind link. It can ask a quick qualifying question ("Are you looking for men's or women's styles?") and serve the exact right product card directly in the chat.
            </p>
          </div>
          <div>
            <h4 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" /> 3. In-Thread Checkout
            </h4>
            <p className="text-lg leading-relaxed text-gray-600 pl-7">
              Using native integrations, the user can complete their purchase using Apple Pay or Shop Pay without ever leaving the Instagram app. Friction is reduced to zero.
            </p>
          </div>
        </div>

        <h2 className="text-3xl font-display font-bold text-gray-950 mt-16 mb-6">
          The Bottom Line
        </h2>

        <p className="text-lg leading-relaxed mb-8">
          Your Instagram DMs are no longer just a customer support channel for handling complaints and tracking orders. They are a high-intent sales funnel waiting to be unlocked. By implementing intelligent automation, you can turn passive scrollers into active buyers while they are most engaged with your brand.
        </p>
      </>
    )
  },
  {
    id: 2,
    title: "The Death of the Landing Page: Why Social Checkout is the Future",
    excerpt: "Friction kills conversions. Discover why the fastest-growing e-commerce brands are moving the entire checkout experience into social media platforms.",
    category: "E-commerce Trends",
    author: {
      name: "Marcus Chen",
      role: "Head of Product at GrowthSync",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop",
      bio: "Marcus is the Head of Product at GrowthSync. He has over a decade of experience building scalable e-commerce solutions and optimizing checkout flows for enterprise brands."
    },
    date: "Oct 05, 2023",
    dateISO: "2023-10-05T08:00:00Z",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2000&auto=format&fit=crop",
    tags: ['E-commerce', 'Trends', 'Checkout', 'Social Media'],
    content: (
      <>
        <p className="text-xl leading-relaxed mb-8 text-gray-600 font-medium">
          For the last decade, the e-commerce playbook has been simple: run ads on social media, drive traffic to a highly optimized landing page, and convert. But that playbook is breaking down.
        </p>

        <p className="text-lg leading-relaxed mb-8">
          Customer acquisition costs (CAC) are skyrocketing, and attention spans are shorter than ever. If a page takes more than 3 seconds to load, you've lost the sale. The solution isn't a faster landing page—it's eliminating the landing page entirely.
        </p>

        <h2 className="text-3xl font-display font-bold text-gray-950 mt-16 mb-6">
          Why Landing Pages Are Losing Effectiveness
        </h2>
        
        <p className="text-lg leading-relaxed mb-6">
          When a user clicks an ad on TikTok or Instagram, they are in a "discovery" mindset, not a "shopping" mindset. Forcing them out of their native environment creates a jarring experience. They have to wait for a browser to open, accept cookies, navigate a new UI, and manually enter their credit card information.
        </p>

        <p className="text-lg leading-relaxed mb-8">
          By integrating checkout directly into the social platform—whether through Instagram Shops, TikTok Shop, or conversational AI in DMs—you meet the customer exactly where they are.
        </p>

        <h2 className="text-3xl font-display font-bold text-gray-950 mt-16 mb-6">
          The Rise of "Zero-Click" Commerce
        </h2>

        <p className="text-lg leading-relaxed mb-8">
          The future of e-commerce is "zero-click" or "one-click" commerce. This means leveraging stored payment methods (like Apple Pay, Google Pay, or Shop Pay) directly within the social app's native browser or chat interface.
        </p>

        <blockquote className="border-l-4 border-teal-600 bg-teal-50 p-6 md:p-8 rounded-r-2xl my-12">
          <p className="text-xl md:text-2xl font-display font-medium text-teal-950 leading-snug mb-4">
            "By allowing customers to check out directly inside their Instagram DMs, we saw a 60% reduction in cart abandonment compared to our traditional mobile website."
          </p>
          <footer className="text-teal-700 font-bold text-sm uppercase tracking-wider">
            — Elena Rodriguez, E-commerce Director
          </footer>
        </blockquote>

        <p className="text-lg leading-relaxed mb-8">
          Brands that adapt to this new reality will see their conversion rates soar, while those clinging to the old "click link in bio" model will continue to see diminishing returns on their ad spend.
        </p>
      </>
    )
  },
  {
    id: 3,
    title: "Automating Customer Support vs. Automating Sales: A Guide",
    excerpt: "Most brands use AI to deflect support tickets. Here's how to flip the script and use AI to proactively generate new sales opportunities.",
    category: "AI Strategy",
    author: {
      name: "Elena Rodriguez",
      role: "Director of Strategy at GrowthSync",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&auto=format&fit=crop",
      bio: "Elena is the Director of Strategy at GrowthSync. She helps brands navigate the complexities of AI integration and develop proactive sales strategies that drive measurable growth."
    },
    date: "Sep 28, 2023",
    dateISO: "2023-09-28T08:00:00Z",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop",
    tags: ['AI', 'Sales', 'Customer Support', 'Strategy'],
    content: (
      <>
        <p className="text-xl leading-relaxed mb-8 text-gray-600 font-medium">
          When most brands think of "AI chatbots," they picture a frustrated customer trying to get a refund while a bot repeatedly asks them to rephrase their question. This is the old way of thinking about AI.
        </p>

        <p className="text-lg leading-relaxed mb-8">
          While automating customer support is valuable for reducing overhead, it's fundamentally a defensive strategy. It saves money, but it doesn't make money. The real opportunity lies in using AI offensively: to automate sales and revenue generation.
        </p>

        <h2 className="text-3xl font-display font-bold text-gray-950 mt-16 mb-6">
          Defensive AI vs. Offensive AI
        </h2>
        
        <p className="text-lg leading-relaxed mb-6">
          <strong>Defensive AI (Support):</strong> Focuses on deflecting tickets, answering FAQs ("Where is my order?"), and processing returns. The goal is cost reduction.
        </p>

        <p className="text-lg leading-relaxed mb-8">
          <strong>Offensive AI (Sales):</strong> Focuses on capturing intent, recommending products, offering personalized discounts, and closing deals in real-time. The goal is revenue growth.
        </p>

        <h2 className="text-3xl font-display font-bold text-gray-950 mt-16 mb-6">
          How to Transition to Offensive AI
        </h2>

        <p className="text-lg leading-relaxed mb-8">
          To make the shift, you need to change how your AI interacts with customers. Instead of waiting for a customer to have a problem, your AI should proactively engage them when they show buying intent.
        </p>

        <ul className="space-y-4 mb-8">
          <li className="flex items-start gap-3 text-lg">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center text-sm font-bold mt-0.5">1</span>
            <span><strong>Monitor Engagement:</strong> Track when users comment on posts, reply to Stories, or mention your brand.</span>
          </li>
          <li className="flex items-start gap-3 text-lg">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center text-sm font-bold mt-0.5">2</span>
            <span><strong>Proactive Outreach:</strong> Have the AI initiate a DM conversation offering a VIP discount or early access to a new drop.</span>
          </li>
          <li className="flex items-start gap-3 text-lg">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center text-sm font-bold mt-0.5">3</span>
            <span><strong>Personalized Recommendations:</strong> Use the customer's past purchase history or browsing behavior to suggest the perfect product.</span>
          </li>
        </ul>

        <p className="text-lg leading-relaxed mb-8">
          By treating your AI as a proactive sales associate rather than a reactive support rep, you can unlock an entirely new revenue channel for your brand.
        </p>
      </>
    )
  }
];
