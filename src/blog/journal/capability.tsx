import type { JournalEssay } from './types';
import { JournalDiagram } from './JournalDiagram';

export const capabilityEssay: JournalEssay = {
  slug: 'from-buying-software-to-building-capability',
  title: 'The second job',
  excerpt: 'The first automation proves a task is possible. The second tells you whether you are building a more capable business or another isolated tool.',
  category: 'Perspectives',
  tags: ['Operating economics', 'Core', 'Workflows'],
  sources: [
    { label: 'Field Ventures — The Build vs Buy Head Fake, August 3, 2026', href: 'https://fieldventures.substack.com/p/the-build-vs-buy-head-fake' },
    { label: 'Field Ventures — The Rise of Service-as-a-Software, July 15, 2025', href: 'https://fieldventures.substack.com/p/the-rise-of-service-as-a-software' },
  ],
  content: <>
    <p>We think the second job will tell you more about an AI company than its first demonstration.</p>
    <p>The first job can be made impressive with enough attention. Connect the tools, collect the documents, tune the instructions, and keep an engineer nearby. Something useful happens. Then the customer asks for a related job. Does the system understand enough of the business to begin, or does everyone start another implementation?</p>
    <p>That difference is central to what we are building. A business should gain more than an isolated automation every time it teaches software how to work.</p>

    <h2 id="the-first-job-leaves-something-behind">The first job leaves something behind</h2>
    <p>Imagine a brand that begins by delegating product questions. The system needs the catalog, current stock, the meanings of product attributes, and rules about what can be promised. It learns that two names refer to the same material. The owner corrects a claim. A customer question exposes a gap in the care instructions.</p>
    <p>Eventually, the brand wants help improving its catalog. Much of the relevant preparation already exists. The repeated questions identify what is unclear. The product identities are established. The correction has an owner and a source. There is a way to prepare a change and ask the right person to review it.</p>
    <p>A useful foundation should make that next job easier to introduce. The new responsibility still needs its own limits: permission to answer a question does not include permission to edit the store. But the company should not need to explain its materials, customers, and policies from the beginning.</p>
    <p>Now extend the thought. Better catalog information helps a later merchandising job. A stock constraint informs what marketing promotes. The value of a completed task includes the preparation it leaves for another task, if that preparation remains accurate and usable.</p>

    <JournalDiagram kind="reuse" />
    <h2 id="what-cheaper-code-changes">What cheaper code changes</h2>
    <p>The debate about AI and software often starts with a purchase: if a business can generate an application, why pay for one? <a href="https://fieldventures.substack.com/p/the-build-vs-buy-head-fake">Field Ventures’ build-versus-buy essay</a> asks the more durable question of who takes responsibility after the first build. Maintenance, support, and changing requirements still belong to someone.</p>
    <p>We agree with that concern. We also think cheaper software creation changes the shape of what is worth maintaining. A tool specific to one company or one narrow job may become practical even when it could never have supported a standalone software vendor.</p>
    <p>Suppose a merchant needs to reconcile two suppliers’ size conventions before listing their products. It may need a modest piece of software, used intermittently, with careful checks. The sensible future could be a maintained foundation that creates or composes that capability when needed, then keeps track of its assumptions and tests.</p>
    <p>The owner should not have to become the custodian of every script the business generates. Nor should every small need require another permanent application. The interesting product sits between those outcomes: a company that can acquire useful capabilities and keep them working.</p>

    <h2 id="responsibility-has-an-economic-shape">Responsibility has an economic shape</h2>
    <p>This changes what we ought to count. An answer is cheap to count. A completed responsibility is harder. A supplier inquiry can require an initial message, two days of waiting, a clarification, a revised quote, and a decision about whether to proceed.</p>
    <p><a href="https://fieldventures.substack.com/p/the-rise-of-service-as-a-software">Field’s service-as-software thesis</a> points toward software performing more of the work a customer wants done. To us, the compelling version includes the inconvenient middle: the waiting, the exception, the follow-through. Otherwise the customer receives a quick first step and retains the rest of the job.</p>
    <p>There is an economic test here. Count the cost of producing a verified result, including the customer’s review, the provider’s intervention, the infrastructure, and the failures. A product that removes an hour from one person and creates an hour of hidden work for another has changed the invoice more than the operation.</p>
    <p>The first capability might be expensive to establish. What matters for the platform thesis is whether comparable later capabilities benefit from earlier work. Reuse has to appear in the cost and quality of delivery. It cannot exist only in an architecture diagram.</p>

    <h2 id="the-first-job-should-not-be-homework">The first job should not be homework</h2>
    <p>There is another assumption we want to challenge: that the owner must arrive knowing which automation to build.</p>
    <p>The owner understands the business. That does not mean they should have to translate its problems into prompts, workflow nodes, and integration requirements. A useful system should help find an appropriate first responsibility from evidence: repeated unanswered questions, an unresolved handoff, or a recurring reconciliation.</p>
    <p>It should also recognize when the work is already covered. Creating another agent for a well-run process can increase coordination instead of reducing it. Initiative is valuable when it identifies something worth doing and makes the decision to delegate clear.</p>
    <p>Our ambition for Core includes that kind of discovery. The first job should emerge from understanding the business; later jobs should emerge from the work and the needs it reveals. Each proposed expansion still has to justify the access, attention, and cost it asks for.</p>

    <h2 id="a-business-that-acquires-capabilities">A business that acquires capabilities</h2>
    <p>Some functions will continue to deserve dedicated software. A system of record, a trusted marketplace, or a deeply specialized application can remain valuable. The goal is to make the whole company more capable, with fewer unnecessary handoffs between those systems.</p>
    <p>That is why the second job matters so much to us. It tests whether the product holds a useful understanding of the company, whether its execution machinery can be reused, and whether taking on more work makes the customer’s life simpler.</p>
    <p>If every new responsibility requires another bespoke deployment and another permanent human operator, we should call it what it is. If the foundation carries preparation forward and makes more work dependable, something more interesting is happening.</p>
    <p>The business is learning a new skill.</p>
  </>,
};
