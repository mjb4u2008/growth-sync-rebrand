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
import { builtAroundBusinessEssay } from './journal/built-around-the-business';

const essays = [foundationEssay, jpmorganEssay, walmartEssay, infrastructureEssay,
  operatingSystemEssay, memoryEssay, capabilityEssay, tannerEssay, builtAroundBusinessEssay];

// Editorial timeline: all nine essays fall within May–November 2026.
// Each also carries the actual latest revision date separately.
const essayDates: Record<string, string> = {
  'a-new-foundation-for-business': '2026-05-21',
  'your-companys-memory-should-belong-to-your-company': '2026-06-11',
  'from-buying-software-to-building-capability': '2026-07-16',
  // Publication date of the retrospective; not Tanner's first day.
  'why-tanner-joined-growthsync': '2026-06-25',
  'what-jpmorgans-technology-budget-is-building': '2026-08-06',
  'the-model-is-not-the-operating-system': '2026-08-27',
  'walmart-company-context-operating-capability': '2026-09-17',
  'capacity-is-not-a-business-capability': '2026-10-30',
  'built-around-the-business': '2026-11-17',
};

const dateFormat = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
const journalRefreshDateISO = '2026-11-17';

function textOf(node: ReactNode): string {
  if (node == null || typeof node === 'boolean') return '';
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(textOf).join(' ');
  return isValidElement<{ children?: ReactNode }>(node) ? textOf(node.props.children) : '';
}

export const BLOG_POSTS: BlogPost[] = essays.map((essay, index) => {
  const updatedDateISO = journalRefreshDateISO;
  return {
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
    image: essay.cover?.src || '/growthsync-logo.png',
    imageAlt: essay.cover?.alt || 'GrowthSync wordmark with the orange brand dot.',
  };
});
