import type { BillingPeriod, PlanId } from '../data/pricing';

type HandoffParams = {
  plan: PlanId;
  billingPeriod?: BillingPeriod;
  creditCode?: string;
};

const fallbackSignupPath = '/get-started';

export function getAppSignupUrl({ plan, billingPeriod = 'monthly', creditCode }: HandoffParams) {
  const base = import.meta.env.VITE_GROWTHSYNC_APP_SIGNUP_URL || fallbackSignupPath;
  const url = new URL(base, window.location.origin);

  url.searchParams.set('source', 'marketing_site');
  url.searchParams.set('plan', plan);
  url.searchParams.set('billing_period', billingPeriod);

  if (creditCode?.trim()) {
    url.searchParams.set('credit_code', creditCode.trim());
  }

  return url.toString();
}

export function getLoginUrl() {
  return import.meta.env.VITE_GROWTHSYNC_LOGIN_URL || '/get-started';
}
