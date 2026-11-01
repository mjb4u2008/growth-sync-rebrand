/** The curated GrowthSync journal. Retired article text is not shipped to readers. */
import { isValidElement, type ReactNode } from 'react';
import type { BlogPost } from './types';
import { foundationEssay } from './journal/foundation';
import { jpmorganEssay } from './journal/jpmorgan';
import { walmartEssay } from './journal/walmart';
import { infrastructureEssay } from './journal/infrastructure-buildout';
import { operatingSystemEssay } from './journal/operating-system';
import { memoryEssay } from './journal/company-memory';
import { capabilityEssay } from './journal/capability';
import { tannerEssay } from './journal/tanner';

const essays = [foundationEssay, jpmorganEssay, walmartEssay, infrastructureEssay,
  operatingSystemEssay, memoryEssay, capabilityEssay, tannerEssay];

// Editorial timeline requested for the refreshed journal. These dates are not
// evidence that this newly revised text existed then; every essay shows its revision date.
const essayDates: Record<string, string> = {
  'a-new-foundation-for-business': '2025-10-23',
  'your-companys-memory-should-belong-to-your-company': '2025-12-11',
  'from-buying-software-to-building-capability': '2026-02-12',
  // Signed offer confirmed February 28; hiring confirmed March 2. Exact first day unknown.
  'why-tanner-joined-growthsync': '2026-03-02',
  'what-jpmorgans-technology-budget-is-building': '2026-06-18',
  'the-model-is-not-the-operating-system': '2026-08-13',
  'walmart-company-context-operating-capability': '2026-09-17',
  'capacity-is-not-a-business-capability': '2026-10-30',
};

const dateFormat = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
const updatedDateISO = '2026-11-01';

function textOf(node: ReactNode): string {
  if (node == null || typeof node === 'boolean') return '';
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(textOf).join(' ');
  return isValidElement<{ children?: ReactNode }>(node) ? textOf(node.props.children) : '';
}

export const BLOG_POSTS: BlogPost[] = essays.map((essay, index) => ({
  ...essay,
  id: 1001 + index,
  tab: essay.category === 'Case studies' ? 'Market Studies' : 'Tech Corner',
  signalType: essay.category,
  author: { name: 'GrowthSync', role: 'The GrowthSync team', initials: 'GS' },
  date: dateFormat.format(new Date(essayDates[essay.slug])),
  dateISO: essayDates[essay.slug],
  updatedDateISO,
  updatedDate: dateFormat.format(new Date(updatedDateISO)),
  readTime: `${Math.max(1, Math.ceil(textOf(essay.content).trim().split(/\s+/).length / 200))} min read`,
  image: '/growthsync-logo.png',
  imageAlt: 'GrowthSync wordmark with the orange brand dot.',
}));
