export type BillingPeriod = 'monthly' | 'annual';
export type PlanId = 'payg' | 'starter' | 'growth' | 'scale' | 'custom';

export const messageRate = '$0.30';

export const subscriptionPlans = [
  {
    id: 'starter',
    name: 'Starter',
    monthlyPrice: 199,
    annualPrice: 2388,
    monthlyCredit: 500,
    messages: 'about 1,650',
    bestFor: 'First campaigns and smaller brands',
    note: 'Best entry point for proving the channel.',
    featured: false,
  },
  {
    id: 'growth',
    name: 'Growth',
    monthlyPrice: 479,
    annualPrice: 5748,
    monthlyCredit: 1200,
    messages: 'about 4,000',
    bestFor: 'Active DTC brands with steady engagement',
    note: 'Most teams should start here once ads are running.',
    featured: true,
  },
  {
    id: 'scale',
    name: 'Scale',
    monthlyPrice: 999,
    annualPrice: 11988,
    monthlyCredit: 2500,
    messages: 'about 8,300',
    bestFor: 'High-volume drops, paid ads, and multi-channel brands',
    note: 'Built for launch pressure and bigger social teams.',
    featured: false,
  },
] as const;

export const formatCurrency = (value: number) => new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
}).format(value);
