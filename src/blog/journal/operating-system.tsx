import type { JournalEssay } from './types';

export const operatingSystemEssay: JournalEssay = {
  slug: 'the-model-is-not-the-operating-system',
  title: 'Beyond the model',
  excerpt:
    'Becoming AI-native takes a maintained foundation of company context, permissions, tools, execution, and evaluation. That is the work ahead.',
  category: 'Perspectives',
  tags: ['AI infrastructure', 'Core', 'Company context'],
  content: (
    <>
      <p>
        A company becomes AI-native when useful work can move through it with AI
        as a dependable participant. That requires a foundation: an understanding
        of the business, access to the right systems, clear authority to act, and
        a way to judge the result. A capable model supplies part of the
        intelligence. The company still needs somewhere for that intelligence to
        operate.
      </p>
      <p>
        This distinction matters most after the first successful experiment.
        Producing a good answer once is encouraging. Making the same work
        reliable across people, changing conditions, and repeated use is a
        different responsibility. Someone has to own the conditions that make
        success repeatable.
      </p>

      <h2 id="what-stripe-built-around-the-model">What Stripe built around the model</h2>
      <p>
        Stripe offers a concrete engineering reference in its account of{' '}
        <a
          href="https://stripe.dev/blog/meet-stripes-knowledge-ai-platform"
          target="_blank"
          rel="noreferrer"
        >
          Kai, its internal Knowledge AI Platform
        </a>
        . Stripe describes three layers: APIs that support different interfaces,
        an Agent Studio where domain teams manage agents and skills, and shared
        execution infrastructure. Its execution environment includes a
        per-session sandbox, a virtual filesystem, orchestration, and access
        controls. Domain owners can inspect usage and quality signals alongside
        the assets they maintain.
      </p>
      <p>
        One detail is especially instructive. Stripe says a person may have
        legitimate access to two customer contexts while still being prohibited
        from combining them in one analysis. The permission boundary therefore
        depends on the task, as well as the person. Stripe also describes further
        work on state management, collaboration, and a quality improvement loop.
      </p>
      <p>
        Our reading is that the surrounding system deserves sustained
        engineering attention. Stripe's implementation serves Stripe's needs;
        it is a useful reference for thinking about the problem, not a blueprint
        that every business should reproduce.
      </p>

      <h2 id="company-context-needs-an-owner">Company context needs an owner</h2>
      <p>
        Company context includes both information and interpretation. A product
        catalog contains facts. Knowing which products can be promoted together,
        which claims need review, and which stock levels should change a plan
        requires decisions about how the business operates. An agent needs a way
        to find those decisions and understand which ones still apply.
      </p>
      <p>
        Uploading a folder creates a starting point. Maintaining usable context
        means identifying the authoritative source, preserving the reason behind
        a decision, and resolving disagreement when two documents say different
        things. It also means giving someone responsibility for retiring guidance
        that has become stale. More information can make an answer worse when
        the system cannot distinguish current policy from old discussion.
      </p>
      <p>
        The practical question is ownership. Who updates the agent's understanding
        when pricing changes? Who can approve a new interpretation of the brand?
        Who notices when the answer has quietly drifted away from the business?
      </p>

      <h2 id="authority-has-to-travel-with-the-task">Authority has to travel with the task</h2>
      <p>
        Access to a tool and authority to use it are separate decisions. Reading
        campaign performance, preparing a recommendation, and changing a live
        budget carry different consequences. A useful operating foundation makes
        those boundaries legible before work begins. It can specify the accounts
        involved, the permitted actions, the limits, and the point where a person
        must make a decision.
      </p>
      <p>
        This gives a business room to expand responsibility deliberately. A team
        can begin with analysis, inspect the evidence, and authorize a narrower
        action once it trusts the process. Permission becomes something the
        system can enforce and explain, rather than a warning buried in a prompt.
      </p>

      <h2 id="execution-needs-a-finish-line">Execution needs a finish line</h2>
      <p>
        Connecting tools is necessary, but a connection does not define completed
        work. A task needs an intended outcome, a record of the actions taken,
        and an observable finish line. Otherwise, a fluent explanation can hide
        an incomplete operation.
      </p>
      <p>
        For a proposed catalog change, the finish line might include validation
        against source data, approval from the responsible person, and a check
        that the intended update appears in the destination system. If one step
        fails, the system should preserve enough information to resume safely or
        hand the work back. These are design requirements, even when the task
        looks simple on screen.
      </p>
      <p>
        Evaluation belongs inside that process. The business needs to know
        whether the result was accurate, whether the action respected its
        authority, and whether the outcome was useful. A completed tool call
        answers only one part of those questions.
      </p>

      <h2 id="staying-ai-native-is-maintenance">Staying AI-native is maintenance</h2>
      <p>
        Becoming AI-native is an ongoing operating commitment. The business
        changes around the system: people join, products launch, priorities
        shift, and policies evolve. The tools and models change too. Each change
        can alter assumptions that previously made a workflow dependable.
      </p>
      <p>
        A maintained foundation gives that change a process. Important workflows
        have examples of acceptable results. Failures can be traced to the
        information, instructions, tool behavior, or judgment that produced
        them. Proposed improvements can be checked before they become the new
        default. Someone remains accountable for deciding what better means.
      </p>
      <p>
        This work is easy to overlook because much of its value appears as
        continuity: fewer repeated explanations, fewer ambiguous handoffs, and
        confidence that an approved process still means what the business
        intended. Continuity is part of the product.
      </p>

      <h2 id="why-we-are-starting-with-commerce">Why we are starting with commerce</h2>
      <p>
        GrowthSync's thesis is that smaller businesses should be able to access
        this foundation without assembling and maintaining an internal AI
        platform team. Core is our direction for making company context,
        permissions, tools, execution, and evaluation work together as a
        maintained system.
      </p>
      <p>
        We are starting with commerce because it provides concrete work to design
        around. Products, inventory, campaigns, customer communication, and
        performance are connected. A decision in one area can change what makes
        sense in another. That creates a useful test: can the system carry the
        relevant business understanding through the whole task, while keeping
        responsibility clear?
      </p>
      <p>
        This is the ambition we are building toward. Its credibility will come
        from the work a business can repeatedly trust it to complete. The model
        will keep improving. Our job is to build and maintain the conditions
        that let a business put that improvement to use.
      </p>
    </>
  ),
  sources: [
    {
      label: "Stripe Engineering — Meet Stripe's Knowledge AI Platform",
      href: 'https://stripe.dev/blog/meet-stripes-knowledge-ai-platform',
    },
  ],
};
