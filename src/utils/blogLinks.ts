export type BlogPostEntry = {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  tags?: string[];
};

export type MarketContextLink = {
  label: string;
  href: string;
  description: string;
};

type ResourceRule = MarketContextLink & {
  matches: (post: BlogPostEntry) => boolean;
};

const normalize = (value: string) => value.toLowerCase();

const includesAny = (value: string, needles: string[]) => needles.some((needle) => value.includes(needle));

const postText = (post: BlogPostEntry) => {
  const haystack = [post.title, post.excerpt, post.category, ...(post.tags ?? [])].join(' ');
  return normalize(haystack);
};

const resourceRules: ResourceRule[] = [
  {
    label: 'TikTok Shop Academy',
    href: 'https://seller-us.tiktok.com/university',
    description: 'Official TikTok Shop training and platform guidance for sellers.',
    matches: (post) => includesAny(postText(post), ['tiktok', 'live commerce']),
  },
  {
    label: 'Shopify Social Commerce Guide',
    href: 'https://help.shopify.com/en/manual/online-sales-channels/social-commerce',
    description: 'Shopify’s overview of social commerce sales channels and platform integrations.',
    matches: (post) => includesAny(postText(post), ['social commerce', 'social selling', 'instagram', 'tiktok', 'dm', 'revenue']),
  },
  {
    label: 'Shopify Instagram Shopping',
    href: 'https://help.shopify.com/en/manual/online-sales-channels/social-commerce/facebook-instagram-by-meta/instagram',
    description: 'How Instagram Shopping works when brands route buyers to their own storefront.',
    matches: (post) => includesAny(postText(post), ['instagram', 'meta', 'link in bio']),
  },
  {
    label: 'Meta Creator Marketplace',
    href: 'https://about.fb.com/news/2024/02/creator-marketplace-for-brands-and-creators-to-collaborate-on-instagram/amp/',
    description: 'Meta’s official overview of how brands and creators collaborate on Instagram.',
    matches: (post) => includesAny(postText(post), ['creator', 'instagram', 'affiliate', 'brand strategy']),
  },
  {
    label: 'Shopify Collabs',
    href: 'https://www.shopify.com/news/connecting-creators-with-shopify-s-millions-of-merchants-introducing-shopify-collabs',
    description: 'Shopify’s take on creator-led commerce and affiliate relationships.',
    matches: (post) => includesAny(postText(post), ['creator', 'affiliate', 'creator economy']),
  },
  {
    label: 'Amazon Seller University',
    href: 'https://sell.amazon.com/learn/',
    description: 'Amazon’s official seller education hub for brands operating on marketplace channels.',
    matches: (post) => includesAny(postText(post), ['amazon', 'marketplace']),
  },
];

const postSpecificMarketContext: Record<number, MarketContextLink[]> = {
  1: [
    {
      label: 'Meta Business Scale',
      href: 'https://about.fb.com/news/2023/02/meta-chief-business-officer-stepping-down/',
      description: 'Meta notes that more than 200 million businesses use its free tools, which is the scale backdrop for Instagram and Facebook commerce.',
    },
    {
      label: 'Meta Win With Conversations',
      href: 'https://about.fb.com/wp-content/uploads/2024/05/Win-With-Conversations-Report_2024.pdf',
      description: 'Meta and Bain outline how messaging-led commerce turns conversations into conversion and retention.',
    },
  ],
  2: [
    {
      label: 'US Live Commerce Outlook',
      href: 'https://www.grandviewresearch.com/horizon/outlook/live-commerce-market/united-states',
      description: 'Market outlook for the growth of live commerce in the United States over the next several years.',
    },
    {
      label: 'China E-Commerce Market',
      href: 'https://www.trade.gov/market-intelligence/china-e-commerce-market',
      description: 'U.S. government market brief on China\'s e-commerce and livestream shopping ecosystem.',
    },
  ],
  4: [
    {
      label: 'McKinsey on Social Commerce',
      href: 'https://www.mckinsey.com/capabilities/growth-marketing-and-sales/our-insights/social-commerce-the-future-of-how-consumers-interact-with-brands',
      description: 'A concise framing of why social commerce matters and why the market is structurally growing.',
    },
    {
      label: 'Meta Win With Conversations',
      href: 'https://about.fb.com/wp-content/uploads/2024/05/Win-With-Conversations-Report_2024.pdf',
      description: 'Helpful context for the conversational-commerce wedge GrowthSync is building into.',
    },
  ],
  5: [
    {
      label: 'Project Horizon Report',
      href: 'https://www.pymnts.com/news/social-commerce/2026/tiktok-courts-brands-become-shop-sellers/',
      description: 'Reporting on TikTok\'s Project Horizon push to recruit larger brands onto TikTok Shop.',
    },
    {
      label: 'TikTok Discovery Commerce',
      href: 'https://newsroom.tiktok.com/en-US/tiktok-shop-is-where-shoppers-come-to-discover',
      description: 'TikTok\'s own framing of why discovery-led shopping is becoming central to the platform.',
    },
  ],
  6: [
    {
      label: 'TikTok Shop US GMV 2025',
      href: 'https://thelowdown.momentum.asia/new-report-tiktok-shop-u-s-gmv-grew-68-to-reach-us15-1b-in-2025/',
      description: 'Momentum Works and Tabcut on TikTok Shop\'s 2025 U.S. GMV growth and category mix.',
    },
    {
      label: 'TikTok Content to Amazon Sales',
      href: 'https://emplicit.co/case-study-tiktok-content-driving-amazon-sales/',
      description: 'Case-study example of TikTok content lifting downstream Amazon revenue.',
    },
  ],
  7: [
    {
      label: 'McKinsey on Social Commerce',
      href: 'https://www.mckinsey.com/capabilities/growth-marketing-and-sales/our-insights/social-commerce-the-future-of-how-consumers-interact-with-brands',
      description: 'McKinsey\'s overview of how social commerce is reshaping discovery and purchase behavior.',
    },
    {
      label: 'EMARKETER Social Commerce Forecast',
      href: 'https://www.emarketer.com/chart/269287/us-retail-social-commerce-sales-2021-2027-billions-change-of-total-us-ecommerce-sales',
      description: 'EMARKETER chart tracking U.S. retail social-commerce sales through 2028.',
    },
  ],
  10: [
    {
      label: 'Sprout on Social Listening',
      href: 'https://sproutsocial.com/features/social-media-listening',
      description: 'Overview of how social-listening workflows surface signals, sentiment, and purchase intent.',
    },
    {
      label: 'Sprout Customer Service Stats',
      href: 'https://sproutsocial.com/insights/social-media-customer-service-statistics/',
      description: 'Research on how quickly consumers expect brands to respond on social channels.',
    },
  ],
  18: [
    {
      label: 'TikTok Shop 2024 GMV',
      href: 'https://thelowdown.momentum.asia/press-release-tiktok-shop-in-the-u-s-achieves-explosive-growth-in-2024-surpassing-us9-billion-gmv/',
      description: 'Momentum Works and Tabcut on TikTok Shop\'s 2024 U.S. and global GMV figures.',
    },
    {
      label: 'TikTok Shop H1 2025 Update',
      href: 'https://thelowdown.momentum.asia/new-report-tiktok-shop-doubles-global-gmv-in-h1-2025-with-u-s-market-hitting-us5-8-billion/',
      description: 'Follow-on report showing how TikTok Shop kept compounding into 2025.',
    },
  ],
  20: [
    {
      label: 'TikTok Shop US GMV 2025',
      href: 'https://thelowdown.momentum.asia/new-report-tiktok-shop-u-s-gmv-grew-68-to-reach-us15-1b-in-2025/',
      description: 'Recent TikTok Shop growth data that supports the case for treating social as a revenue channel.',
    },
    {
      label: 'EMARKETER Social Commerce Forecast',
      href: 'https://www.emarketer.com/chart/269287/us-retail-social-commerce-sales-2021-2027-billions-change-of-total-us-ecommerce-sales',
      description: 'Projected U.S. social-commerce sales growth as the category becomes a budget line, not a side experiment.',
    },
  ],
  21: [
    {
      label: 'Amazon Seller Pricing',
      href: 'https://sell.amazon.com/pricing.html',
      description: 'Amazon\'s own pricing page covering referral fees, plans, and the cost stack sellers operate under.',
    },
    {
      label: 'Shopify Social Commerce Guide',
      href: 'https://help.shopify.com/en/manual/online-sales-channels/social-commerce',
      description: 'Shopify\'s overview of the social channels brands use when they diversify beyond marketplaces.',
    },
  ],
  26: [
    {
      label: 'TikTok BFCM 2025 Recap',
      href: 'https://newsroom.tiktok.com/tiktok-shop-had-our-biggest-bfcm-weekend-ever',
      description: 'TikTok\'s official recap of Black Friday Cyber Monday 2025 performance.',
    },
    {
      label: 'Shopify BFCM 2025 Data',
      href: 'https://www.shopify.com/news/bfcm-data-2025',
      description: 'Shopify\'s official 2025 BFCM data snapshot for merchant sales and shopper behavior.',
    },
  ],
  27: [
    {
      label: 'TikTok Shop US GMV 2025',
      href: 'https://thelowdown.momentum.asia/new-report-tiktok-shop-u-s-gmv-grew-68-to-reach-us15-1b-in-2025/',
      description: 'Momentum Works and Tabcut on the 2025 TikTok Shop picture in the U.S.',
    },
    {
      label: 'EMARKETER Social Commerce Forecast',
      href: 'https://www.emarketer.com/chart/269287/us-retail-social-commerce-sales-2021-2027-billions-change-of-total-us-ecommerce-sales',
      description: 'Social-commerce trajectory for the broader U.S. market as the channel matures.',
    },
  ],
  28: [
    {
      label: 'Shopify BFCM 2025 Data',
      href: 'https://www.shopify.com/news/bfcm-data-2025',
      description: 'Shopify\'s year-end BFCM results for independent brands and merchant performance.',
    },
    {
      label: 'TikTok BFCM 2025 Recap',
      href: 'https://newsroom.tiktok.com/tiktok-shop-had-our-biggest-bfcm-weekend-ever',
      description: 'TikTok\'s official summary of BFCM 2025 results and brand growth on TikTok Shop.',
    },
  ],
  29: [
    {
      label: 'EMARKETER Social Commerce Forecast',
      href: 'https://www.emarketer.com/chart/269287/us-retail-social-commerce-sales-2021-2027-billions-change-of-total-us-ecommerce-sales',
      description: 'Retail social-commerce sales forecast that supports the category\'s 2026 outlook.',
    },
    {
      label: 'TikTok Shop US GMV 2025',
      href: 'https://thelowdown.momentum.asia/new-report-tiktok-shop-u-s-gmv-grew-68-to-reach-us15-1b-in-2025/',
      description: 'Momentum Works and Tabcut on TikTok Shop\'s current pace heading into 2026.',
    },
  ],
  33: [
    {
      label: 'Meta Win With Conversations',
      href: 'https://about.fb.com/wp-content/uploads/2024/05/Win-With-Conversations-Report_2024.pdf',
      description: 'Messaging-commerce research on why fast conversational follow-up matters commercially.',
    },
    {
      label: 'Sprout Customer Service Stats',
      href: 'https://sproutsocial.com/insights/social-media-customer-service-statistics/',
      description: 'Consumer expectations around social response speed and why delay costs attention.',
    },
  ],
  38: [
    {
      label: 'Local Kitchens',
      href: 'https://localkitchens.com/',
      description: 'The restaurant operations context Tanner references in his founding engineer note.',
    },
    {
      label: 'Shopify Social Commerce Guide',
      href: 'https://help.shopify.com/en/manual/online-sales-channels/social-commerce',
      description: 'Useful background on the commerce surfaces brands now have to connect operationally.',
    },
  ],
};

export function hasPostSpecificMarketContext(postId: number) {
  return postSpecificMarketContext[postId] != null;
}

function countSharedTags(currentPost: BlogPostEntry, candidate: BlogPostEntry) {
  const currentTags = new Set((currentPost.tags ?? []).map(normalize));
  return (candidate.tags ?? []).reduce((count, tag) => count + (currentTags.has(normalize(tag)) ? 1 : 0), 0);
}

function scoreRelatedPost(currentPost: BlogPostEntry, candidate: BlogPostEntry) {
  let score = 0;

  if (currentPost.category === candidate.category) {
    score += 4;
  }

  score += countSharedTags(currentPost, candidate) * 3;

  const currentText = postText(currentPost);
  const candidateText = postText(candidate);

  if (includesAny(currentText, ['instagram']) && includesAny(candidateText, ['instagram'])) {
    score += 2;
  }

  if (includesAny(currentText, ['tiktok']) && includesAny(candidateText, ['tiktok'])) {
    score += 2;
  }

  if (includesAny(currentText, ['dm', 'social listening', 'conversation']) && includesAny(candidateText, ['dm', 'social listening', 'conversation'])) {
    score += 2;
  }

  return score;
}

export function getRelatedPosts(posts: BlogPostEntry[], currentPost: BlogPostEntry, max = 3) {
  return posts
    .filter((candidate) => candidate.id !== currentPost.id)
    .map((candidate) => ({
      candidate,
      score: scoreRelatedPost(currentPost, candidate),
    }))
    .sort((left, right) => {
      if (right.score !== left.score) {
        return right.score - left.score;
      }

      return right.candidate.id - left.candidate.id;
    })
    .slice(0, max)
    .map(({ candidate }) => candidate);
}

export function getMarketContextLinks(post: BlogPostEntry, max = 2) {
  const overrides = postSpecificMarketContext[post.id];

  if (overrides) {
    return overrides.slice(0, max);
  }

  const matchedLinks = resourceRules.filter((rule) => rule.matches(post));

  if (matchedLinks.length >= max) {
    return matchedLinks.slice(0, max);
  }

  const fallbackLinks = resourceRules.filter((rule) => !matchedLinks.includes(rule));
  return [...matchedLinks, ...fallbackLinks].slice(0, max);
}
