import type { JournalEssay } from './types';
import { JournalDiagram } from './JournalDiagram';

export const walmartEssay: JournalEssay = {
  slug: 'walmart-company-context-operating-capability',
  title: 'One business, many clocks',
  excerpt: 'Inventory changes in seconds. Plans change in meetings. A business gets more capable when useful information can travel between those clocks.',
  category: 'Case studies',
  tags: ['Commerce', 'Enterprise AI', 'Company context'],
  content: <>
    <p>Every retail business runs on more than one clock. A customer makes a decision in seconds. Stock changes throughout the day. A marketing plan may be approved a week ahead. A supplier commitment can remain in force for months.</p>
    <p>The difficult work happens where those clocks meet. A late delivery should change a promise to a customer. A surge in demand should change a purchasing decision. Today, people often carry the news between them. We think the next generation of business software will make those connections a normal property of the company.</p>
    <p>Walmart’s AI investments offer an unusually concrete glimpse of that direction. Look past the size of the company and a common thread appears: the same business knowledge becoming useful in more places.</p>

    <h2 id="a-catalog-is-a-common-language">A catalog is a common language</h2>
    <p>In August 2024, Walmart said it had used multiple large language models to create or improve more than <strong>850 million pieces of catalog data</strong>. Management estimated that completing that task in the same time without generative AI would have required nearly 100 times the existing headcount. That estimate concerns a particular data task, not a hundredfold productivity gain across Walmart. <a href="https://corporate.walmart.com/content/dam/corporate/documents/newsroom/2024/08/15/walmart-releases-q2-fy25-earnings/corrected-walmart-inc-wmt-us-q2-2025-earnings-call-15-august-2024.pdf">The earnings call</a> connects the work to product discovery and physical operations.</p>
    <p>A catalog looks like a collection of descriptions until you follow what depends on it. Customers need to find the right item. Associates need to identify it. Other systems need to sort, route and explain it. A better description can be useful across those tasks because the underlying object is the same.</p>
    <p>This suggests a less obvious place for AI value to emerge. Improve a shared representation of the business and several workflows can benefit. Improve one conversation without updating that representation and the learning may end with the conversation.</p>

    <h2 id="meaning-before-recommendations">Meaning before recommendations</h2>
    <p>Walmart’s March 2025 introduction of its merchant assistant, Wally, described a semantic layer built around proprietary business data. The assistant supported analysis, calculations, investigation of product performance and operational questions. The company identified future tactical actions under configurable guardrails as a direction it wanted to reach. <a href="https://corporate.walmart.com/news/2025/03/18/walmart-develops-genai-powered-assistant-for-walmart-merchants">The announcement</a> separates those ambitions from the assistant it was introducing.</p>
    <p>Semantic layer sounds abstract. Its purpose is concrete: make sure that asking about a product, a period or a margin refers to the right thing. Does a sales total include returns? Does available inventory include units reserved for a wholesale customer? A recommendation built on the wrong definition can be beautifully reasoned and commercially wrong.</p>
    <p>These are engineering questions with commercial consequences. The system needs stable identities, agreed definitions and a way to revisit a conclusion when its inputs change. The business should not have to explain what “available” means from scratch every time an employee opens a new conversation.</p>

    <h2 id="when-one-fact-changes-the-plan">When one fact changes the plan</h2>
    <p>Consider an imagined outdoor brand preparing a weekend promotion. On Thursday, its supplier confirms that a shipment will arrive late. Nothing about the advertisement has changed. The inventory spreadsheet may still show incoming units. Customer service has already told several people to watch for the launch.</p>
    <p>The next useful action depends on connecting that new fact to the commitments it affects. The business might shift the promotion to a different product, reserve the remaining units for existing promises and prepare an honest update for waiting customers. An owner should see the tradeoff before approving changes.</p>
    <JournalDiagram kind="shared-context" />
    <p>In the future we want to build toward, the supplier update becomes shared operating context. It travels with its source and timestamp. Proposed actions reference it. The affected teams can see why the plan changed. When the shipment arrives, the current status changes again without erasing the history of the decision.</p>
    <p>This is a more interesting outcome than three assistants independently producing three clever suggestions. The company can respond coherently to something that happened outside it.</p>

    <h2 id="the-foundation-is-shared-the-work-is-specific">The foundation is shared. The work is specific.</h2>
    <p>Walmart’s August 2025 engineering account describes Element, its internal platform, adding agent memory, context retrieval, tool connections and orchestration. It also describes WIBEY as an entry point for work across systems and existing developer interfaces. These are Walmart’s architectural claims; they do not establish that every workflow is reliable or autonomous. <a href="https://tech.walmart.com/content/walmart-global-tech/en_us/blog/post/wibey-announcement.html">The useful design choice</a> is making common responsibilities reusable.</p>
    <p>The scale of the wider investment is substantial. Walmart reported <strong>$26.642 billion in capital expenditures for fiscal 2026</strong>, ended January 31, 2026. A combined U.S. category covering supply chain, customer-facing initiatives, technology and other investments accounted for $16.468 billion. These are actual capital expenditures, not an AI budget. <a href="https://stock.walmart.com/2026-annual-report">The annual report</a> provides the categories.</p>
    <p>Closer to daily work, Walmart reported that team leads and store managers estimated a reduction in shift-planning time from 90 minutes to 30 for an AI tool initially used in overnight stocking. Other shifts were being piloted. <a href="https://corporate.walmart.com/news/2025/06/24/walmart-unveils-new-ai-powered-tools-to-empower-1-5-million-associates">That June 2025 result</a> is narrower than a companywide transformation and more useful to an operator trying to understand one.</p>
    <p>The pattern matters: shared infrastructure underneath, a particular job above it, and a result people doing that job can assess.</p>

    <h2 id="coherence-without-centralizing-everything">Coherence without centralizing everything</h2>
    <p>Shared context can also become a trap. Businesses contain disagreements, negotiations and restricted information. Putting every record in one place does not produce one correct answer. It can simply make an old mistake easier to repeat.</p>
    <p>A useful foundation has to preserve the disagreement: purchasing expects one delivery date, the supplier has committed to another, and neither is the warehouse receipt. It must respect who can see a record and who can act on it. It needs a person to resolve questions that the evidence cannot settle.</p>
    <p>That is why we are interested in maintaining the business’s understanding, not merely collecting its files. A shared foundation can support different kinds of judgment without forcing every team into an identical workflow.</p>
    <p>For an independent brand, the prize could be the ability to offer a wider range, serve more complicated customers or respond to disruptions without adding another layer of coordination. Those possibilities have to be earned in actual operations. But they give the work a purpose larger than reducing the time spent in a dashboard.</p>
    <p>The future company will still have many clocks. We want it to get much better at knowing when one of them changes the others.</p>
  </>,
  sources: [
    { label: 'Walmart, 2026 Annual Report, fiscal year ended January 31, 2026', href: 'https://stock.walmart.com/2026-annual-report' },
    { label: 'Walmart, Q2 FY2025 earnings call transcript, August 15, 2024', href: 'https://corporate.walmart.com/content/dam/corporate/documents/newsroom/2024/08/15/walmart-releases-q2-fy25-earnings/corrected-walmart-inc-wmt-us-q2-2025-earnings-call-15-august-2024.pdf' },
    { label: 'Walmart, GenAI assistant for merchants, March 18, 2025', href: 'https://corporate.walmart.com/news/2025/03/18/walmart-develops-genai-powered-assistant-for-walmart-merchants' },
    { label: 'Walmart Global Tech, From models to agents, August 29, 2025', href: 'https://tech.walmart.com/content/walmart-global-tech/en_us/blog/post/wibey-announcement.html' },
    { label: 'Walmart, AI tools for associates, June 24, 2025', href: 'https://corporate.walmart.com/news/2025/06/24/walmart-unveils-new-ai-powered-tools-to-empower-1-5-million-associates' },
  ],
};
