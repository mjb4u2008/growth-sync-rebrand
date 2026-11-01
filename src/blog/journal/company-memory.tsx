import type { JournalEssay } from './types';
import { JournalDiagram } from './JournalDiagram';

export const memoryEssay: JournalEssay = {
  slug: 'your-companys-memory-should-belong-to-your-company',
  title: 'The end of starting over',
  excerpt: 'Every new tool asks the business to explain itself again. We think the next generation should inherit what the company has already learned.',
  category: 'Perspectives',
  tags: ['Business context', 'Data ownership', 'AI infrastructure'],
  sources: [],
  cover: {
    src: '/journal/the-end-of-starting-over.jpg',
    alt: 'An orange thread holds a continuous path through a sequence of translucent glass planes.',
    caption: 'Understanding that survives a change of tools.',
  },
  content: <>
    <p>A strange ritual accompanies almost every new tool a company buys: explain the company again.</p>
    <p>Upload the documents. Describe the customers. Correct the product names. Explain that this supplier is unreliable, that this policy changed last month, that an exception made for one customer is not an offer everyone can have. The business has learned these things already. Its new software arrives without them.</p>
    <p>We think this ritual has an expiration date. A company should be able to gain a new capability without reconstructing its understanding of itself. Better models will matter. So will an older, quieter question: what gets to survive when the model changes?</p>
    <h2 id="a-promise-crosses-the-boundary">A promise crosses the boundary</h2>
    <p>Consider an imagined merchant changing its returns policy. Starting Friday, new orders get a fourteen-day return window. Earlier orders retain their original terms. There is also a campaign whose customers were promised sixty days. The campaign has ended, but those promises have not.</p>
    <p>Five weeks later, a customer asks for a return. The current policy page says fourteen days. Their order is forty days old. A model retrieves the page and gives a beautifully written, completely wrong refusal.</p>
    <p>The difficult part is not finding a document. It is preserving the relationship between a promise and the order it applies to. The system needs the purchase date, the campaign terms, the customer's eligibility, and evidence that those terms were actually offered. A more recent policy does not erase an earlier commitment.</p>
    <p>Now let the support team change tools. Let the employee who ran the campaign leave. Let the merchant adopt a better model. The customer's promise should survive all three events. That is the kind of continuity we mean when we talk about company memory.</p>
    <h2 id="the-shape-of-a-fact">The shape of a fact</h2>
    <p>We expect useful memory to look less like an ever-growing transcript and more like an account of what the business knows, why it believes it, and where it applies.</p>
    <p>Our imagined return has several different kinds of knowledge. An order record establishes a transaction. Approved campaign terms establish a promise. A policy establishes the usual rule for a defined period. An employee's note might record an exception, or merely suggest one. A model's interpretation is a further layer. Flatten those into a paragraph and important distinctions disappear.</p>
    <p>The original evidence needs to remain reachable. So do the order and customer identities, the effective dates, and the person or process that authorized an exception. A useful answer should be able to carry its reasoning back to those records. This is how another system can check the answer, and how a person can correct it.</p>
    <p>There is a hard case here. Suppose the campaign terms promise sixty days, but an internal note says the offer was withdrawn before this customer bought. Which source wins? The timestamp alone cannot decide. We would want the system to surface the conflict to the person who owns the policy, with the disputed records attached. Their resolution becomes a scoped decision. It should not silently rewrite the terms for every other customer.</p>
    <JournalDiagram kind="memory" />
    <h2 id="remembering-includes-letting-go">Remembering includes letting go</h2>
    <p>A business that remembers everything indiscriminately will accumulate a very convincing version of its own past mistakes.</p>
    <p>Inventory from yesterday is historical evidence, not today's stock. A draft pricing idea is not an approved price. A customer's frustrated message is not permission to change company policy. An agent's guess about why an order failed must not return next week wearing the authority of a recorded fact.</p>
    <p>These things need different lifetimes. Some expire. Some are superseded while remaining necessary to explain old decisions. Some should never enter durable memory. Corrections also need a path through the system: when a source changes, answers and procedures that depend on it may need rechecking. Updating a file while leaving its old conclusions active is a particularly subtle form of forgetting.</p>
    <p>This is why we care about the structure beneath a memory feature. More storage and longer context windows are useful. They do not decide which understanding should persist.</p>
    <h2 id="continuity-with-boundaries">Continuity with boundaries</h2>
    <p>There is another condition: knowledge has an audience. Connecting a company must not turn it into one room where every person and every agent can hear everything.</p>
    <p>The person resolving our return needs the relevant order and promise. They do not need the merchant's payroll. If their access changes, a previously prepared summary cannot become a side door back to the underlying records. Permissions need to apply to retrieved evidence and retained derivatives, as well as the source application.</p>
    <p>Even a correct answer is not authority to act. The system may establish that the return is eligible while still needing an authorized person to approve the refund. Keeping those decisions distinct is what makes broader delegation possible. The business can share understanding without handing every capability the same powers.</p>
    <h2 id="what-the-next-capability-inherits">What the next capability inherits</h2>
    <p>A quarter later, the imagined merchant wants to understand why returns increased. A new analytical capability needs to distinguish customers with the extended campaign promise from those covered by the shorter policy. Otherwise it might mistake a change in terms for a change in product quality.</p>
    <p>The orders, policy versions, and resolved exceptions already exist. The next system should inherit the permitted relationships between them. It can compare the right groups without asking someone to reconstruct the campaign. Its answer can show which interpretation follows from the records and which needs further investigation.</p>
    <p>That new capability has its own job and authority; analyzing returns does not authorize changing the policy. But its understanding can begin where the earlier work left off. This is a different future from an organization surrounded by clever tools that remain strangers to one another.</p>
    <p>We are building Core around this possibility: a maintained foundation whose understanding can deepen as the business uses it. The test is practical. Does the next capability require less repeated explanation? Can it use a past decision correctly in an unfamiliar situation? Can the owner inspect, amend, and carry that understanding elsewhere?</p>
    <p>Portability matters here. A download of raw files is a poor substitute for retaining the relationships that made those files useful. We want businesses to keep their accumulated understanding because it belongs to them. Continued trust should come from the quality of the work.</p>
    <p>A model will eventually be replaced by a better model. An interface will give way to something easier. The promise made to that customer will still need to be honored. A company should be able to move forward without beginning again.</p>
  </>,
};
