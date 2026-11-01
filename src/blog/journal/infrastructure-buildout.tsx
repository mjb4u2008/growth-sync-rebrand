import type { JournalEssay } from './types';

export const infrastructureEssay: JournalEssay = {
  slug: 'capacity-is-not-a-business-capability',
  title: 'The next buildout',
  excerpt: 'The AI infrastructure buildout is real. Turning that capacity into useful work still depends on business context, permissions, and maintenance.',
  category: 'Case studies',
  tags: ['AI infrastructure', 'Business context', 'Core'],
  content: <>
    <p>
      The largest technology companies are spending heavily on the infrastructure behind AI. For a smaller business, those numbers can create an understandable sense of urgency: something important is being built, and waiting may feel like falling behind. But a data center investment and a useful business system answer different questions. One concerns the capacity to run software. The other concerns whether that software can do a particular job correctly, inside a particular company.
    </p>
    <p>
      The distinction matters more as the infrastructure gets better. Access to capable models gives more businesses the opportunity to build useful systems. It does not supply their operating knowledge, settle their permissions, or prove that an automated workflow earns its cost.
    </p>

    <h2 id="read-the-spending-carefully">Read the spending carefully</h2>
    <p>
      The disclosures available by November 1, 2026 show the scale of the buildout. For the quarter ended September 30, <a href="https://www.microsoft.com/en-us/investor/events/fy-2027/earnings-fy-2027-q1">Microsoft reported</a> $45.2 billion in capital expenditures, including $7.4 billion of finance leases recognized at commencement. Cash paid for property and equipment was a different measure: $39.4 billion. This was Microsoft's first quarter of fiscal 2027, despite falling in calendar 2026.
    </p>
    <p>
      <a href="https://www.sec.gov/Archives/edgar/data/1018724/000101872426000040/amzn-20260930.htm">Amazon reported</a> $75.9 billion of cash capital expenditures for the same three-month period. Its filing describes technology infrastructure, primarily supporting AWS growth, alongside additional fulfillment capacity. <a href="https://www.sec.gov/Archives/edgar/data/1652044/000165204426000084/goog-20260930.htm">Alphabet reported</a> $51.4 billion of capital expenditures for that quarter, primarily for technical infrastructure. Neither description makes the entire amount an AI-only spending figure.
    </p>
    <p>
      <a href="https://investor.atmeta.com/investor-news/press-release-details/2026/Meta-Reports-Third-Quarter-2026-Results/default.aspx">Meta reported</a> $34.91 billion for the quarter under a measure that includes principal payments on finance leases. Its cash-flow tables separately show $33.942 billion of property and equipment purchases and $964 million of finance-lease principal payments. Those payments are different from Microsoft's recognition of a lease's principal value when it begins.
    </p>
    <p>
      These are reported quarterly amounts, not annual forecasts. Adding them together under an “AI spending” headline would conceal both their accounting differences and their broader uses. The sound conclusion is narrower: major providers are committing substantial resources to infrastructure. That is evidence of a buildout, not evidence that a particular retailer's next automation will pay for itself.
    </p>

    <h2 id="the-product-direction-is-revealing">The product direction is revealing</h2>
    <p>
      Product documentation offers a more practical signal. <a href="https://devblogs.microsoft.com/microsoft365dev/work-iq-retrieve-october-2026/">Microsoft's October 2026 description of Work IQ's retrieval tool</a> explains how agents can search work information, return supporting citations, and respect the requesting user's access. It separates retrieving evidence from asking another agent to act. The distinction is useful: finding a customer record and changing that record are separate responsibilities.
    </p>
    <p>
      <a href="https://docs.cloud.google.com/gemini/enterprise/docs/connectors/introduction-to-connectors-and-data-stores">Google's Gemini Enterprise documentation</a> distinguishes retrieving information directly from a source from copying it into an index. It also describes separate synchronization of business records and identity information. <a href="https://aws.amazon.com/blogs/business-intelligence/reimagine-business-intelligence-amazon-quicksight-evolves-to-amazon-quick-suite/">AWS's Quick Suite announcement</a> similarly puts a shared knowledge base, research, and workflow automation alongside its analytics capabilities.
    </p>
    <p>
      These are descriptions of products and mechanisms, not independent proof of customer returns. Their common direction is nevertheless instructive. Useful agents need access to company information and a controlled way to act on it. Model capability sits inside that system; it does not replace the system.
    </p>

    <h2 id="a-connection-is-not-shared-understanding">A connection is not shared understanding</h2>
    <p>
      Consider a shop asking which products to promote next week. An agent might need stock availability, expected deliveries, contribution margin, previous campaign performance, and the owner's constraints. Reading five applications is only the beginning. It must understand whether “available” excludes reserved stock, whether margin includes shipping, and which promotion already has approval.
    </p>
    <p>
      That understanding needs an explicit home. Otherwise every new assistant recreates it through another conversation, with another opportunity to miss an exception. A maintained product definition or decision rule can serve many workflows. A correction left inside one chat may never reach the next workflow that needs it.
    </p>
    <p>
      Open connection standards help. <a href="https://modelcontextprotocol.io/docs/2026-07-28/getting-started/intro">Model Context Protocol</a>, for example, specifies a way for AI applications to connect to external tools and information. But connection compatibility does not make business meaning portable. A business also needs usable exports, stable identifiers, documented definitions, and a way to move its operating instructions. Buying access should not require surrendering the ability to change providers later.
    </p>

    <h2 id="maintenance-is-part-of-the-product">Maintenance is part of the product</h2>
    <p>
      Permissions require equal attention. Someone permitted to read sales totals may not be permitted to view individual customer details. Someone allowed to prepare a campaign may still need approval to publish it. Those boundaries should survive the move from a familiar application into a conversational interface.
    </p>
    <p>
      Then the business changes. A supplier misses a delivery. A product is discontinued. An employee leaves. A connector expires. A promotion rule is revised. A useful operating system needs someone responsible for keeping those changes reflected in the information and actions available to its agents.
    </p>
    <p>
      This is why maintenance belongs in the buying decision. Ask who notices a failed connection, who updates the rules, how a mistake is traced to its source, and how work continues when the agent cannot finish. A polished demonstration cannot answer those questions on its own.
    </p>

    <h2 id="measure-the-job-not-the-model">Measure the job, not the model</h2>
    <p>
      A sensible starting point is one repeated decision with a clear owner. Establish how the work happens today, what a correct result requires, and where a human should intervene. Then compare the new workflow against that baseline, including review time, exceptions, operating costs, and the consequences of errors.
    </p>
    <p>
      For the shop, an initial result might be a stock-aware promotion recommendation with its evidence attached. Publishing can remain a separate approval. The question is whether this produces a better, faster decision with acceptable effort. The size of a cloud provider's capital budget cannot answer it.
    </p>

    <h2 id="the-foundation-below-the-interface">The foundation below the interface</h2>
    <p>
      GrowthSync is building a maintained AI operating foundation through Core, with commerce as our first market. That focus follows from the gap between available intelligence and useful work. A business needs its context, connections, responsibilities, and operating rules to persist as models and interfaces change.
    </p>
    <p>
      The infrastructure buildout expands what may become possible. The work closer to the business determines what becomes dependable. For a smaller company, progress should be visible in a decision made well, a task completed correctly, and an operating foundation that remains understandable to the people responsible for it.
    </p>
  </>,
  sources: [
    { label: 'Microsoft FY2027 Q1 earnings call, October 28, 2026', href: 'https://www.microsoft.com/en-us/investor/events/fy-2027/earnings-fy-2027-q1' },
    { label: 'Amazon Form 10-Q, quarter ended September 30, 2026', href: 'https://www.sec.gov/Archives/edgar/data/1018724/000101872426000040/amzn-20260930.htm' },
    { label: 'Alphabet Form 10-Q, quarter ended September 30, 2026', href: 'https://www.sec.gov/Archives/edgar/data/1652044/000165204426000084/goog-20260930.htm' },
    { label: 'Meta Q3 2026 results, October 21, 2026', href: 'https://investor.atmeta.com/investor-news/press-release-details/2026/Meta-Reports-Third-Quarter-2026-Results/default.aspx' },
    { label: 'Microsoft: Work IQ retrieval, October 20, 2026', href: 'https://devblogs.microsoft.com/microsoft365dev/work-iq-retrieve-october-2026/' },
    { label: 'Google: Gemini Enterprise connectors and data stores', href: 'https://docs.cloud.google.com/gemini/enterprise/docs/connectors/introduction-to-connectors-and-data-stores' },
    { label: 'AWS: Introducing Amazon Quick Suite, October 9, 2025', href: 'https://aws.amazon.com/blogs/business-intelligence/reimagine-business-intelligence-amazon-quicksight-evolves-to-amazon-quick-suite/' },
    { label: 'Model Context Protocol introduction, July 28, 2026 specification', href: 'https://modelcontextprotocol.io/docs/2026-07-28/getting-started/intro' },
  ],
};
