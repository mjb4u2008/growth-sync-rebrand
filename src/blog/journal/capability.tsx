import type { JournalEssay } from './types';

export const capabilityEssay: JournalEssay = {
  slug: 'from-buying-software-to-building-capability',
  title: 'From tools to work',
  excerpt: 'Cheaper code changes the build-versus-buy decision. The useful unit of comparison is a reliable business outcome, including the work of keeping it reliable.',
  category: 'Perspectives',
  tags: ['Operating economics', 'Core', 'Workflows'],
  sources: [
    { label: 'Field Ventures — The Build vs Buy Head Fake, August 3, 2026', href: 'https://fieldventures.substack.com/p/the-build-vs-buy-head-fake' },
    { label: 'Field Ventures — The Rise of Service-as-a-Software, July 15, 2025', href: 'https://fieldventures.substack.com/p/the-rise-of-service-as-a-software' },
  ],
  content: <>
    <p>A working application has become an incomplete answer to an important business question. The question is no longer only whether a team can create the software. It is whether the company should take responsibility for the capability that software is supposed to provide.</p>
    <p>AI makes that question more interesting. It can reduce the effort of writing code and help execute work that previously required someone to operate the interface. But a lower construction cost does not settle the cost of ownership, or tell a company what it should own.</p>
    <p>Our view at GrowthSync is that the useful unit of comparison is a business capability: a defined job that can be performed dependably, under clear limits, with someone responsible when it fails.</p>
    <h2 id="the-cost-after-the-demo">The cost after the demo</h2>
    <p><a href="https://fieldventures.substack.com/p/the-build-vs-buy-head-fake">Field Ventures’ build-versus-buy essay</a> makes an important distinction between constructing software and accepting the continuing work of running it. That includes maintenance, security, support, and changing requirements. We agree with the distinction even as we see room for a different kind of infrastructure provider.</p>
    <p>Consider an illustrative replenishment workflow. A demo can compare a stock count to a threshold and draft a purchase order. A production capability needs to understand pending deliveries, supplier lead times, substitutions, minimum order quantities, budget authority, and exceptions. It must also handle missing data and an order that did not actually reach the supplier.</p>
    <p>These responsibilities exist whether the interface is a dashboard, a chat window, or no interface at all. A generated workflow has not removed them. It has moved them somewhere that the buyer needs to understand.</p>
    <p>This is why comparing the subscription price of an application with the token cost of a demonstration is misleading. They may cover very different amounts of the job.</p>
    <h2 id="measure-the-completed-job">Measure the completed job</h2>
    <p>A more useful cost model includes implementation, infrastructure, ongoing supervision, maintenance, and the consequences of mistakes. It also includes the work that remains with the customer.</p>
    <p>The denominator matters just as much. A thousand generated answers are not necessarily a thousand resolved customer requests. A workflow that handles the easy cases but creates a difficult queue of exceptions may move labor rather than remove it.</p>
    <p>For a particular operation, the business should define what successful completion means before comparing approaches. A resolved request might require a correct answer, an authorized action, a confirmed system update, and no avoidable follow-up. Different work deserves different standards.</p>
    <p>Then examine the distribution, not just the average. Which cases still need review? How expensive are they? How often does the system stop safely? What happens during a peak period or an integration outage? The point is to identify the real operating burden, not to demand impossible perfection.</p>
    <h2 id="replace-responsibility-carefully">Replace responsibility carefully</h2>
    <p>A business does not have to replace its entire software stack to benefit from this shift. It can begin with a narrow operation while retaining the applications that provide dependable records or valuable networks.</p>
    <p>An agent might coordinate work across those applications before any subscription disappears. If it eventually takes over a function completely enough that an application is no longer needed, retiring the application becomes a justified decision. The cancellation is evidence of a successful transition, not the starting definition of success.</p>
    <p>That transition should be reversible. People need access to records, a way to inspect decisions, and a fallback when the new system cannot continue. Increasing autonomy should follow demonstrated performance and agreed limits. It should not arrive merely because a model can call another tool.</p>
    <p>In our view, the most credible providers will be explicit about where their responsibility ends. An outcome promise without an exception policy leaves the customer carrying uncertainty that the price may not reveal.</p>
    <h2 id="where-infrastructure-earns-its-place">Where infrastructure earns its place</h2>
    <p><a href="https://fieldventures.substack.com/p/the-rise-of-service-as-a-software">Field’s service-as-software thesis</a> describes a shift toward software performing work rather than only providing tools. Our interest is in the foundation that allows more of those capabilities to be introduced and maintained within a business.</p>
    <p>The reusable parts are not only prompts. They include access to the company’s current context, approved tools, authority boundaries, execution history, and ways to evaluate results. Reusing those parts should make a second capability easier to operate than building a second isolated system from the beginning.</p>
    <p>That is also a test of the provider’s business. If every deployment requires a separate implementation that never benefits from previous work, the company should be honest about the service it is delivering. If useful infrastructure accumulates, the provider should be able to show where reuse improves delivery without erasing the customer’s particular requirements.</p>
    <h2 id="our-bet-with-core">Our bet with Core</h2>
    <p>GrowthSync is building toward this maintained foundation through Core, starting with commerce. The ambition is to give a smaller business a practical way to add AI operating capabilities without taking on every underlying engineering responsibility itself.</p>
    <p>That does not make lower cost, faster delivery, or better results automatic. Those claims must be established for the work being performed. We need to earn them through successful operations and sustainable delivery, including the less visible work of supervision and maintenance.</p>
    <p>The larger shift we are watching is a change in what businesses expect to buy. A place to manage a process can remain valuable. Increasingly, the question will be whether a provider can help take responsibility for the process itself—and make that responsibility clear enough to trust.</p>
  </>,
};
