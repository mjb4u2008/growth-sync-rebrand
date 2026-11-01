import type { ReactNode } from 'react';
import type { BlogSource } from '../types';

export type JournalTopic = 'Perspectives' | 'Case studies' | 'Inside GrowthSync';
export type JournalFilter = 'All' | JournalTopic;

export type JournalEssay = {
  slug: string;
  title: string;
  excerpt: string;
  category: JournalTopic;
  tags: string[];
  content: ReactNode;
  sources: BlogSource[];
  editorialNote?: string;
};
