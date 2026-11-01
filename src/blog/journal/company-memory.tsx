import type { JournalEssay } from './types';

export const memoryEssay: JournalEssay = {
  slug: 'your-companys-memory-should-belong-to-your-company',
  title: 'Your company’s memory should belong to your company',
  excerpt: 'Connecting documents is not enough. Useful business memory needs sources, freshness, permissions, and a clear distinction between facts and guesses.',
  category: 'Perspectives',
  tags: ['Business context', 'Data ownership', 'AI infrastructure'],
  sources: [],
  content: <>
    <p>Ask a business a simple question—why did this customer receive an exception?—and the answer may require a trip through an order system, a support thread, a spreadsheet, and someone’s memory.</p>
    <p>Each application holds a useful fragment. The business still has to assemble the explanation. An experienced employee often acts as the connection between them: knowing which record to trust, remembering why a rule changed, and recognizing when two systems disagree.</p>
    <p>As AI begins to perform more work, that fragmented context becomes an operating constraint. Giving a model access to more text does not automatically give it an accurate account of the company. The important question is whether the business can maintain a usable understanding of itself across the tools it chooses.</p>
    <p>The asset worth keeping is meaning: which customer a record refers to, which policy applied, why an exception was approved, and what happened afterward. A company should be able to preserve those relationships when it changes the software around them. That is a more demanding form of ownership than a download button.</p>
    <h2 id="memory-is-more-than-retrieval">Memory is more than retrieval</h2>
    <p>Retrieval can locate a relevant policy document. It does not, by itself, establish that the policy is current, applies to this customer, or authorizes the proposed action.</p>
    <p>Imagine a merchant that changes its return window. There may be an old help-center article, a current internal policy, a campaign promise made to a particular customer, and a special arrangement recorded in a support conversation. These are not four interchangeable answers. They describe different types of evidence.</p>
    <p>A useful memory system must preserve those distinctions. A transaction record says what happened. A policy says what is normally allowed. An exception says what was approved in a specific case. A model’s inference says what might explain the evidence. Combining them into a fluent paragraph can make the answer easier to read while making its authority harder to inspect.</p>
    <p>For consequential work, an operator needs to be able to ask: where did this claim come from, when was it true, and what would change the decision?</p>
    <h2 id="a-record-has-a-lifetime">A record has a lifetime</h2>
    <p>Freshness is not a single setting. Inventory can change quickly. A contractual term may remain stable for years. A customer’s preference may be useful until they change it. A temporary shipping exception should not become permanent company policy merely because it appeared in a conversation.</p>
    <p>That means memory needs rules for updating, superseding, and removing information. It also needs to identify the system that remains authoritative for a particular field. Storing yesterday’s order status in a convenient memory layer does not make it more authoritative than today’s fulfillment record.</p>
    <p>The operational challenge is often disagreement rather than absence. A customer may use different email addresses. A product name may have changed. Two records can describe the same business event with different timestamps. Quietly choosing one is not always the right answer. Sometimes the appropriate output is a clear conflict for a person to resolve.</p>
    <p>Good memory helps a business understand uncertainty. It should not conceal uncertainty behind a more confident interface.</p>
    <h2 id="access-is-part-of-the-meaning">Access is part of the meaning</h2>
    <p>A company-wide knowledge system cannot mean company-wide access to every record. The person answering a product question may not need payroll data. An agent preparing a sales brief may be allowed to read account history but not change a contract.</p>
    <p>Those boundaries should travel with the information and the task. Otherwise, connecting more systems increases the risk that a useful answer contains information the recipient should never have received.</p>
    <p>Permissions also matter after retrieval. Knowing a refund is justified is different from having authority to issue it. Knowing which supplier usually receives an order is different from being authorized to commit a larger budget. Context and action belong in the same operating design, with separate checks where the consequences require them.</p>
    <h2 id="ownership-that-is-useful">Ownership that is useful</h2>
    <p>When we say the company’s memory should belong to the company, we mean practical control. The business should be able to inspect what is being used, correct an error, change a rule, and move to another provider without losing the understanding it has developed.</p>
    <p>This does not require every database to live on premises. Nor does it mean that exporting raw files makes a system portable. A pile of documents without identities, timestamps, relationships, or access rules can be technically downloadable and operationally difficult to use.</p>
    <p>The harder portability question is whether another permitted system can reconstruct the important relationships: which product a record refers to, which version of a policy applied, which person approved an exception, and which later event resolved it. Useful ownership is about preserving that meaning, alongside the underlying data.</p>
    <p>It also means deciding what should not become memory. A speculative answer should not silently turn into a business fact. A one-off preference should not become a universal rule. Retention should serve an identified purpose rather than grow simply because storage is available.</p>
    <h2 id="judge-memory-through-work">Judge memory through work</h2>
    <p>A memory system can produce excellent search results and still fail an operating task. The more revealing test is to follow a real job from question to outcome.</p>
    <p>Could the system identify the correct order? Did it use the right policy version? Did it notice the approved exception? Did it ask for help when the records conflicted? Could someone later reconstruct the basis for the action? These are more useful questions than whether the response sounded knowledgeable.</p>
    <p>For GrowthSync, this is a central part of the infrastructure thesis. Additional capabilities should build on a maintained understanding of the business, rather than repeatedly asking the owner to explain the same organization from scratch.</p>
    <p>The value is not an agent that remembers everything. It is a business that can use the right context, under the right authority, and continue to improve that understanding without becoming dependent on a single interface.</p>
  </>,
};
