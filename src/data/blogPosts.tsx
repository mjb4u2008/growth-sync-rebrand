import React from 'react';

const author = {
  name: "Michael Broughton",
  role: "Founder of GrowthSync",
  avatar: "/michael-broughton.png",
  bio: "Michael is the founder of GrowthSync. He's spent years working with brands in social commerce and started GrowthSync to solve the biggest problem he kept seeing: millions of high-intent social interactions going completely unanswered."
};

export const blogPosts = [
  {
    id: 1,
    title: "The $50 Billion DM Problem Nobody is Talking About",
    excerpt: "Every day, millions of people tell brands exactly what they want to buy. The messages sit unread in DMs. Here's why that's the biggest missed opportunity in e-commerce.",
    category: "Social Commerce",
    author,
    date: "Mar 10, 2026",
    dateISO: "2026-03-10T08:00:00Z",
    readTime: "6 min read",
    image: "/blog/dm-problem.png",
    tags: ['Social Commerce', 'DMs', 'Revenue', 'Instagram'],
    content: (
      <>
        <p className="text-xl leading-relaxed mb-8 text-gray-600 font-medium">
          There are over 200 million business accounts on Instagram. The average brand with a decent following receives hundreds of DMs per day. Comments on posts and live streams add thousands more. Most of these messages contain explicit buying intent. And the vast majority of them go completely unanswered.
        </p>

        <p className="text-lg leading-relaxed mb-8">
          I've worked with brands doing seven and eight figures on social. The pattern is always the same. They pour money into content creation, influencer partnerships, and paid media to drive engagement. It works. People engage. They comment "how much?" on a live stream. They reply to a story with "I need this." They DM asking about sizing. And then nothing happens. The brand's social team is too overwhelmed to respond, or they get to it 12 hours later when the customer has already moved on.
        </p>

        <p className="text-lg leading-relaxed mb-8">
          This is the $50 billion DM problem. Not a theoretical number. Social commerce is projected to hit $80 billion in the US by 2027. A massive chunk of that revenue starts as a conversation. A DM. A comment. A story reply. And right now, brands are capturing a fraction of it because they physically cannot respond to every message in real time.
        </p>

        <h2 className="text-3xl font-display font-bold text-gray-950 mt-16 mb-6">
          The math doesn't work manually
        </h2>

        <p className="text-lg leading-relaxed mb-8">
          Let's say your brand gets 500 DMs a day. A good social media manager can handle maybe 50 to 80 quality conversations per day, the kind where you're actually recommending products, sending links, and closing sales. That means you're leaving 80% to 90% of your inbound intent on the table. Every single day.
        </p>

        <p className="text-lg leading-relaxed mb-8">
          Hiring more people doesn't scale. If you're doing live streams, the volume spikes are even worse. During a 60-minute live, you might get 200 comments asking about products. Your team has maybe 5 minutes after the live ends before those people have scrolled to something else. There is no human team fast enough to capture that intent at the speed it expires.
        </p>

        <h2 className="text-3xl font-display font-bold text-gray-950 mt-16 mb-6">
          Intent has a shelf life
        </h2>

        <p className="text-lg leading-relaxed mb-8">
          This is the part most brands don't internalize. When someone comments "I need this" on your post, that intent is at its peak in that moment. Every minute that passes, the probability of conversion drops. Research from Harvard Business Review shows that responding to a lead within 5 minutes is 21x more effective than responding within 30 minutes. In social commerce, the window is even shorter. You're competing with an infinite scroll of content designed to steal attention.
        </p>

        <p className="text-lg leading-relaxed mb-8">
          The brands that figure out how to respond to every single interaction instantly, personally, and with a path to purchase, those are the brands that will dominate social commerce. The ones that keep treating DMs as an afterthought will keep wondering why their engagement rate is high but their revenue from social is flat.
        </p>

        <h2 className="text-3xl font-display font-bold text-gray-950 mt-16 mb-6">
          The link in bio is dead
        </h2>

        <p className="text-lg leading-relaxed mb-8">
          The traditional playbook is broken. Someone sees your product on their feed. You tell them to click the link in your bio. They have to navigate to your profile, find the link, get redirected to a Linktree, find the specific product, add to cart, and check out on a mobile browser. Every step is a drop-off point. Industry data shows you lose 30% to 50% of users at each click. By the time someone reaches checkout, you've lost the vast majority of the people who were initially interested.
        </p>

        <p className="text-lg leading-relaxed mb-8">
          Compare that to this: someone comments "want" on your post. They immediately get a DM with the product details and a one-tap checkout link. The entire transaction happens inside the app they're already using. No context switching. No friction. That's what conversational commerce looks like, and it's where everything is heading.
        </p>

        <h2 className="text-3xl font-display font-bold text-gray-950 mt-16 mb-6">
          This is why we built GrowthSync
        </h2>

        <p className="text-lg leading-relaxed mb-8">
          We built GrowthSync to solve this exact problem. Every DM, every comment, every story reply, every live stream interaction gets an instant, personalized response with a direct path to purchase. Not a generic auto-reply. A real conversation that understands what the customer wants and gets them there with zero friction.
        </p>

        <p className="text-lg leading-relaxed mb-8">
          The opportunity is massive. The brands that move first will have an enormous advantage. If you're leaving money in your DMs, it's time to stop.
        </p>
      </>
    )
  },
  {
    id: 2,
    title: "Why Live Commerce Will Be a $35 Billion Channel in the US by 2028",
    excerpt: "China's live commerce market does $500 billion a year. The US is at $50 billion and accelerating fast. Here's what brands need to know to get ahead of it.",
    category: "Live Commerce",
    author,
    date: "Mar 3, 2026",
    dateISO: "2026-03-03T08:00:00Z",
    readTime: "7 min read",
    image: "/blog/live-commerce.png",
    tags: ['Live Commerce', 'TikTok Shop', 'Social Commerce', 'Trends'],
    content: (
      <>
        <p className="text-xl leading-relaxed mb-8 text-gray-600 font-medium">
          In China, live commerce is a $500 billion industry. Entire brands are built and scaled through live streaming. A single creator can sell $100 million worth of product in a single stream. When people in the US hear these numbers, they assume it's a cultural anomaly that won't translate. They're wrong.
        </p>

        <p className="text-lg leading-relaxed mb-8">
          TikTok Shop did over $33 billion in global GMV in 2024, and the US was its fastest-growing market. Instagram is investing heavily in shopping features inside DMs and Reels. YouTube is rolling out live shopping integrations. The infrastructure for live commerce in the US is being built right now, and the brands that figure out how to use it will have a generational advantage.
        </p>

        <h2 className="text-3xl font-display font-bold text-gray-950 mt-16 mb-6">
          What live commerce actually looks like
        </h2>

        <p className="text-lg leading-relaxed mb-8">
          Forget QVC. Modern live commerce doesn't look like a home shopping network. It looks like a brand founder going live on Instagram, showing their new collection, and having real conversations with their audience in real time. It looks like a creator on TikTok trying on outfits and dropping links in the comments. It looks authentic, fast, and interactive in a way that traditional e-commerce can never replicate.
        </p>

        <p className="text-lg leading-relaxed mb-8">
          The reason it works is simple: live commerce combines entertainment, social proof, and urgency into a single experience. When you see 4,000 people watching a stream and comments flooding in saying "just ordered," your brain processes that differently than looking at a product page with stock photos and a star rating. It feels real because it is real. And that drives conversion rates that blow traditional e-commerce out of the water.
        </p>

        <h2 className="text-3xl font-display font-bold text-gray-950 mt-16 mb-6">
          The problem no one has solved yet
        </h2>

        <p className="text-lg leading-relaxed mb-8">
          Here's the gap. During a live stream, a brand might get hundreds of comments asking about products, pricing, sizing, and availability. The energy is incredible. But when the stream ends, that energy evaporates. The brand's team starts manually combing through comments, trying to DM people who showed interest. By then, hours have passed. Most of those potential buyers have moved on.
        </p>

        <p className="text-lg leading-relaxed mb-8">
          The conversion window on a live stream is measured in minutes, not hours. If someone comments "I need that jacket" during your live, they need a DM with a checkout link within 60 seconds. Not after the stream ends. Not the next morning. Now. The brands that can capture and convert live stream intent in real time will absolutely dominate this channel.
        </p>

        <h2 className="text-3xl font-display font-bold text-gray-950 mt-16 mb-6">
          The US is earlier than you think
        </h2>

        <p className="text-lg leading-relaxed mb-8">
          Most US brands haven't even started experimenting with live commerce. The ones that have are mostly doing it manually, with one person reading comments and another person looking up products. It's chaotic and slow. But the ones who get it right early will build audiences, refine their playbooks, and establish brand equity in a channel that's about to see exponential growth.
        </p>

        <p className="text-lg leading-relaxed mb-8">
          The parallel to early social media marketing is obvious. In 2012, most brands thought social media was a toy. The ones who took it seriously built empires. Live commerce is at that same inflection point. The opportunity is there for brands willing to take it seriously now, before it becomes table stakes.
        </p>

        <h2 className="text-3xl font-display font-bold text-gray-950 mt-16 mb-6">
          What we're betting on
        </h2>

        <p className="text-lg leading-relaxed mb-8">
          At GrowthSync, we're building for this future. Our platform captures every interaction during a live stream, identifies buying intent, and follows up with personalized DMs automatically. When your live ends, every interested viewer has already received a message with the exact product they asked about and a one-tap checkout link. No manual combing through comments. No missed opportunities.
        </p>

        <p className="text-lg leading-relaxed mb-8">
          Live commerce is coming to the US whether brands are ready or not. The only question is which brands will be set up to capture the revenue when it does.
        </p>
      </>
    )
  },
  {
    id: 3,
    title: "Your Social Media Manager is Your Best Salesperson",
    excerpt: "Brands spend millions on paid media to generate intent, then hand it off to a social team with no sales tools. It's time to rethink the org chart.",
    category: "Strategy",
    author,
    date: "Feb 24, 2026",
    dateISO: "2026-02-24T08:00:00Z",
    readTime: "5 min read",
    image: "/blog/social-salesperson.png",
    tags: ['Strategy', 'Social Media', 'Revenue', 'Organization'],
    content: (
      <>
        <p className="text-xl leading-relaxed mb-8 text-gray-600 font-medium">
          Here's something I see at almost every brand I talk to. The marketing team spends a fortune on content, influencers, and paid media to drive engagement on social. It works. People comment, DM, reply to stories, and interact with the brand. Then all of that engagement gets funneled to a social media manager who has no sales tools, no checkout links, no product catalog access, and no way to actually close a deal. They reply with "check the link in our bio!" and move on. It's insane.
        </p>

        <h2 className="text-3xl font-display font-bold text-gray-950 mt-16 mb-6">
          The org chart is broken
        </h2>

        <p className="text-lg leading-relaxed mb-8">
          At most brands, social media sits under marketing. The social team's KPIs are engagement rate, follower growth, and content performance. Revenue attribution is fuzzy at best. Meanwhile, the sales team has CRMs, pipeline tools, and conversion tracking for every other channel. Email has Klaviyo. Paid has attribution models. But the channel where customers are literally telling you what they want to buy? It's managed by someone whose primary tool is a content calendar.
        </p>

        <p className="text-lg leading-relaxed mb-8">
          This isn't a criticism of social media managers. They're incredible at what they do. The problem is that brands have never given them the infrastructure to actually sell. It's like putting your best closer in a room with no phone and no product catalog and asking them to hit quota.
        </p>

        <h2 className="text-3xl font-display font-bold text-gray-950 mt-16 mb-6">
          Social is a sales channel now
        </h2>

        <p className="text-lg leading-relaxed mb-8">
          The shift that's happening right now is that social is moving from a brand awareness channel to a direct revenue channel. TikTok Shop is proof. Instagram DM commerce is proof. Live shopping is proof. The platforms themselves are building native checkout, product tagging, and shopping features because they see the same thing we do: people want to buy where they discover.
        </p>

        <p className="text-lg leading-relaxed mb-8">
          But the brands' internal structures haven't caught up. Social teams still don't own a revenue number. They don't have access to the product catalog in a way that lets them create checkout links on the fly. They can't see a customer's purchase history when responding to a DM. They're operating in the dark while sitting on top of the highest-intent channel the brand has.
        </p>

        <h2 className="text-3xl font-display font-bold text-gray-950 mt-16 mb-6">
          What needs to change
        </h2>

        <p className="text-lg leading-relaxed mb-8">
          Three things need to happen for brands to unlock the revenue sitting in their social channels:
        </p>

        <p className="text-lg leading-relaxed mb-4">
          <strong>First, social needs a revenue target.</strong> If your social team doesn't own a number, they're optimizing for the wrong things. Engagement is great, but engagement that converts is what matters. Give social a revenue KPI and watch how quickly the strategy shifts.
        </p>

        <p className="text-lg leading-relaxed mb-4">
          <strong>Second, social needs sales infrastructure.</strong> Product catalogs, checkout link generation, customer history, and conversion tracking should all be accessible from the same place your team manages DMs and comments. If responding to a DM requires switching between four different tools, you've already lost.
        </p>

        <p className="text-lg leading-relaxed mb-8">
          <strong>Third, social needs automation.</strong> No human team can respond to every DM, comment, and story reply in real time. You need AI that handles the volume while maintaining the personal, on-brand tone that makes social commerce work. Not a generic chatbot. A smart agent that knows your products, your customers, and your voice.
        </p>

        <h2 className="text-3xl font-display font-bold text-gray-950 mt-16 mb-6">
          The brands that get this right win
        </h2>

        <p className="text-lg leading-relaxed mb-8">
          The brands that restructure around social as a revenue channel will outperform the ones that keep treating it as a top-of-funnel awareness play. The data is already there. The intent is already there. The customers are already there, telling you exactly what they want. All that's missing is the infrastructure to convert it.
        </p>

        <p className="text-lg leading-relaxed mb-8">
          That's exactly what we're building at GrowthSync. We give your social channels the same sales infrastructure that email and paid have had for years. Instant responses, personalized recommendations, one-tap checkout, and full revenue attribution. Your social media manager becomes your best salesperson because they finally have the tools to actually sell.
        </p>
      </>
    )
  },
  {
    id: 4,
    title: "Introducing GrowthSync",
    excerpt: "Today we announce GrowthSync and our $1.6M raise to build the conversational AI platform that turns social interactions into revenue.",
    category: "Company",
    author,
    date: "Mar 24, 2026",
    dateISO: "2026-03-24T08:00:00Z",
    readTime: "4 min read",
    image: "/growthsync-logo-dark.png",
    tags: ['Company', 'Announcement', 'Fundraise'],
    content: (
      <>
        <p className="text-xl leading-relaxed mb-8 text-gray-600 font-medium">
          Today we announce GrowthSync. We raised $1.6 million to build the conversational AI platform that turns social interactions into revenue.
        </p>

        <h2 className="text-3xl font-display font-bold text-gray-950 mt-16 mb-6">
          The beginning
        </h2>

        <p className="text-lg leading-relaxed mb-8">
          Every day, millions of people comment on posts, reply to stories, and send DMs to brands they love. Every one of those interactions is a signal. A hand raised. Intent expressed in plain language. And almost all of it goes unanswered.
        </p>

        <p className="text-lg leading-relaxed mb-8">
          We started GrowthSync because we watched it happen over and over. A customer comments "how much?" on a live stream. A follower replies to a story with "I need this." A DM comes in asking about sizing. By the time someone on the brand's team gets around to responding, the moment has passed. The customer has scrolled on. The sale is gone.
        </p>

        <p className="text-lg leading-relaxed mb-8">
          The brands that win in social commerce are the ones that respond instantly, personally, and at scale. That's what GrowthSync does.
        </p>

        <h2 className="text-3xl font-display font-bold text-gray-950 mt-16 mb-6">
          What we're building
        </h2>

        <p className="text-lg leading-relaxed mb-8">
          GrowthSync is a conversational AI platform purpose-built for social commerce. We sit on top of Instagram, TikTok, and the platforms where your customers already spend their time. When someone interacts with your brand, GrowthSync picks up the conversation in real time.
        </p>

        <p className="text-lg leading-relaxed mb-8">
          It responds to comments with personalized DMs. It follows up with viewers who engaged during live streams. It turns story mentions into VIP lists. It bundles products, generates one-time checkout links, and closes deals directly inside the chat. No landing pages. No link in bio. No friction.
        </p>

        <p className="text-lg leading-relaxed mb-8">
          We built GrowthSync to feel like the best salesperson on your team, one who knows every customer by name, never sleeps, and works every channel simultaneously.
        </p>

        <h2 className="text-3xl font-display font-bold text-gray-950 mt-16 mb-6">
          The raise
        </h2>

        <p className="text-lg leading-relaxed mb-8">
          We raised $1.6 million from investors who understand where commerce is headed. Social platforms are becoming the storefront. DMs are becoming the checkout. The brands that figure this out first will own the next decade of e-commerce.
        </p>

        <p className="text-lg leading-relaxed mb-8">
          This capital lets us go deep on the product, onboard our first partners, and prove what we already know: that the revenue sitting inside your social interactions is massive, and almost no one is capturing it.
        </p>

        <h2 className="text-3xl font-display font-bold text-gray-950 mt-16 mb-6">
          What's next
        </h2>

        <p className="text-lg leading-relaxed mb-8">
          We're going to market with our first partners now. The brands we're working with are already seeing what happens when you stop treating social as a top-of-funnel awareness play and start treating it as a direct revenue channel. The results speak for themselves.
        </p>

        <p className="text-lg leading-relaxed mb-8">
          If you're a brand doing real volume on social and you're tired of watching engagement metrics go up while revenue stays flat, we should talk. We're onboarding partners who want to be first movers.
        </p>

        <p className="text-lg leading-relaxed mb-8">
          And if you want to help build this, we're hiring across engineering, design, and go-to-market. Check out our open roles at <a href="/careers" className="text-teal-600 hover:text-teal-700 font-medium">/careers</a>.
        </p>

        <p className="text-lg leading-relaxed mb-8">
          There's a lot to build. We're just getting started.
        </p>

        <p className="text-lg leading-relaxed font-medium text-gray-950">
          Michael Broughton<br />
          <span className="text-gray-500 font-normal">Founder, GrowthSync</span>
        </p>
      </>
    )
  }
];
