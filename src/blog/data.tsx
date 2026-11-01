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
  date: 'Nov 1, 2026',
  dateISO: '2026-11-01',
  readTime: `${Math.max(1, Math.ceil(textOf(essay.content).trim().split(/\s+/).length / 200))} min read`,
  image: '/growthsync-logo.png',
  imageAlt: 'GrowthSync wordmark with the orange brand dot.',
}));
