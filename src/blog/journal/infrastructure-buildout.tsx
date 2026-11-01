import type { JournalEssay } from './types';

export const infrastructureEssay: JournalEssay = {
  slug: 'capacity-is-not-a-business-capability',
  title: 'After the buildout',
  excerpt: 'The world is building extraordinary capacity for intelligence. The next constraint is turning it into a dependable capability inside an ordinary business.',
  category: 'Case studies',
  tags: ['AI infrastructure', 'Business context', 'Core'],
  content: <>
    <p>Imagine that tomorrow’s models are dramatically better, fast enough to use throughout the day and affordable enough for an ordinary business. They can reason through difficult problems, write useful software and operate a growing range of tools. What is still missing?</p>
    <p>They still need to know which customer was promised an exception, which supplier has become unreliable and which decision the owner is willing to delegate. Abundant intelligence makes those questions more important. More work becomes possible; more of it depends on understanding the particular company in which it happens.</p>
    <p>That is our bet about the infrastructure buildout: as the supply of intelligence expands, the ability to put it to work inside a business becomes a larger opportunity.</p>

    <h2 id="the-scale-is-already-visible">The scale is already visible</h2>
    <p>The latest public disclosures show the physical scale of the investment. The figures below all concern the <strong>quarter ended September 30, 2026</strong>. They are reported amounts, not annual forecasts, and the companies use different capital expenditure measures.</p>
    <p className="journal-table-hint">Scroll to read the full comparison.</p>
    <div className="journal-table-scroll" role="region" aria-label="Quarterly capital expenditure comparison" tabIndex={0}>
      <table>
        <caption>Reported capital expenditure measures · quarter ended September 30, 2026</caption>
        <thead><tr><th scope="col">Company</th><th scope="col">Amount</th><th scope="col">What the measure includes</th></tr></thead>
        <tbody>
          <tr><th scope="row"><a href="https://www.microsoft.com/en-us/investor/events/fy-2027/earnings-fy-2027-q1">Microsoft</a></th><td>$45.2B</td><td>Capital expenditures, including $7.4B of finance leases recognized at commencement. Cash paid for property and equipment was $39.4B.</td></tr>
          <tr><th scope="row"><a href="https://www.sec.gov/Archives/edgar/data/1018724/000101872426000040/amzn-20260930.htm">Amazon</a></th><td>$75.9B</td><td>Cash capital expenditures, primarily technology infrastructure supporting AWS growth and additional fulfillment capacity.</td></tr>
          <tr><th scope="row"><a href="https://www.sec.gov/Archives/edgar/data/1652044/000165204426000084/goog-20260930.htm">Alphabet</a></th><td>$51.4B</td><td>Capital expenditures, primarily investments in technical infrastructure.</td></tr>
          <tr><th scope="row"><a href="https://investor.atmeta.com/investor-news/press-release-details/2026/Meta-Reports-Third-Quarter-2026-Results/default.aspx">Meta</a></th><td>$34.91B</td><td>Capital expenditures including principal payments on finance leases.</td></tr>
        </tbody>
      </table>
    </div>
    <p>Microsoft’s period is its first quarter of fiscal 2027. Lease recognition at commencement differs from lease principal paid during a period. These totals also support activities beyond AI, so adding them into a single “AI spending” number would misrepresent the disclosures.</p>
    <p>Even with those distinctions intact, the conclusion is striking. The world’s largest technology companies are committing extraordinary resources to the capacity on which the next generation of software will run. Their spending tells us something about their expectations. It does not tell us which businesses will use that capacity well.</p>

    <h2 id="abundance-moves-the-constraint">Abundance moves the constraint</h2>
    <p>When a capability is scarce, access commands attention. When it becomes widely available, the interesting questions move downstream. What can people make with it? Which old constraints remain? Which new ones become visible?</p>
    <p>In a business, one stubborn constraint is the distance between knowing something and doing something about it. A delayed shipment is known to a supplier. An order promise is known to sales. Cash availability is known to finance. The owner often becomes the person who assembles these facts and decides what they mean together.</p>
    <p>A more capable model can help with that reasoning. It cannot make a missing record current merely by thinking harder. It cannot infer authority from the confidence of its own recommendation. Someone still has to establish which sources matter, which actions are permitted and what counts as completion.</p>
    <p>This is why we expect better models to increase demand for business infrastructure. The more capable the reasoning, the more valuable it becomes to give that reasoning dependable access to the company.</p>

    <h2 id="a-different-kind-of-small-company">A different kind of small company</h2>
    <p>Picture a specialist equipment business with a small team. This is an imagined future, not a description of a deployed GrowthSync customer. A customer asks for a configuration the company has never sold before. Today, accepting the job means interrupting several people to investigate parts, compatibility, delivery, pricing and service obligations.</p>
    <p>In the future we are working toward, the team could ask for a feasible proposal. Software would assemble relevant records, test the configuration against known constraints and expose the assumptions requiring judgment. A person could approve the offer with an understanding of what was verified and what remained uncertain.</p>
    <p>After acceptance, the same decision could inform purchasing, fulfillment and support. The business would retain what it learned about this configuration for the next request. People would still own the customer relationship and the commercial risk. Less of their time would disappear into reconstructing the company’s own knowledge.</p>
    <p>The interesting change is the kind of work the business can take on. A small team could become more specialized and more ambitious at once: serving a narrow market with an operating capability that previously demanded a much larger organization.</p>

    <h2 id="the-cloud-will-move-up-the-stack">The cloud will move up the stack</h2>
    <p>The obvious objection is that the companies funding the buildout will supply this layer themselves. They already own models, infrastructure and widely used business applications. They have every reason to connect them.</p>
    <p>They are doing exactly that. Microsoft’s October 2026 Work IQ retrieval documentation describes finding work information with supporting citations while respecting the requesting user’s access. Google’s Gemini Enterprise connector documentation distinguishes searching a source directly from indexing its records, including the need to synchronize identity information. AWS’s Quick Suite combines knowledge, research and workflow capabilities. <a href="https://devblogs.microsoft.com/microsoft365dev/work-iq-retrieve-october-2026/">Microsoft</a>, <a href="https://docs.cloud.google.com/gemini/enterprise/docs/connectors/introduction-to-connectors-and-data-stores">Google</a> and <a href="https://aws.amazon.com/blogs/business-intelligence/reimagine-business-intelligence-amazon-quicksight-evolves-to-amazon-quick-suite/">AWS</a> are all approaching the problem from substantial positions.</p>
    <p>That raises the standard for everyone building here. A new company needs to own a meaningful operating problem, not merely put a different interface in front of a model. It must make the whole job work across the tools, exceptions and changing conditions its customers actually have.</p>
    <p>We think there is room for a product relationship built around that responsibility. Businesses do not stop changing once the first integration works. Their needs expand; the infrastructure has to keep up.</p>

    <h2 id="the-question-after-access">The question after access</h2>
    <p>There is also a risk in our thesis: connecting more work can spread a mistaken assumption further. An inaccurate stock figure can become an incorrect offer and then an expensive commitment. A company needs ways to challenge the underlying evidence, interrupt execution and recover from failure.</p>
    <p>Those requirements make this a difficult product to build. They also make it worth building. Reliable capability has value precisely because a business cannot afford to treat every working day as an experiment.</p>
    <p>Core is our first product in that direction, beginning with commerce. The ambition is a maintained foundation that gives a business more room to act as its technology improves.</p>
    <p>The question after the buildout will be what an ordinary company can now do that it could not do before. That is where we intend to spend our time.</p>
  </>,
  sources: [
    { label: 'Microsoft FY2027 Q1 earnings call, October 28, 2026', href: 'https://www.microsoft.com/en-us/investor/events/fy-2027/earnings-fy-2027-q1' },
    { label: 'Amazon Form 10-Q, quarter ended September 30, 2026', href: 'https://www.sec.gov/Archives/edgar/data/1018724/000101872426000040/amzn-20260930.htm' },
    { label: 'Alphabet Form 10-Q, quarter ended September 30, 2026', href: 'https://www.sec.gov/Archives/edgar/data/1652044/000165204426000084/goog-20260930.htm' },
    { label: 'Meta Q3 2026 results, October 21, 2026', href: 'https://investor.atmeta.com/investor-news/press-release-details/2026/Meta-Reports-Third-Quarter-2026-Results/default.aspx' },
    { label: 'Microsoft: Work IQ retrieval, October 20, 2026', href: 'https://devblogs.microsoft.com/microsoft365dev/work-iq-retrieve-october-2026/' },
    { label: 'Google: Gemini Enterprise connectors and data stores', href: 'https://docs.cloud.google.com/gemini/enterprise/docs/connectors/introduction-to-connectors-and-data-stores' },
    { label: 'AWS: Introducing Amazon Quick Suite, October 9, 2025', href: 'https://aws.amazon.com/blogs/business-intelligence/reimagine-business-intelligence-amazon-quicksight-evolves-to-amazon-quick-suite/' },
  ],
};
