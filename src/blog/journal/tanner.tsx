import type { JournalEssay } from './types';

export const tannerEssay: JournalEssay = {
  slug: 'why-tanner-joined-growthsync',
  title: 'Why Tanner joined: start with the work',
  excerpt: 'An inventory application taught Tanner that working software can solve the wrong problem. That lesson belongs at the center of how we build AI infrastructure.',
  category: 'Inside GrowthSync',
  tags: ['Team', 'Product engineering', 'Operations'],
  editorialNote: 'Adapted by GrowthSync from Tanner’s May 16, 2026 joining essay. His original experiences are preserved; the company perspective has been updated for our AI infrastructure direction.',
  sources: [],
  content: <>
    <p>Tanner once built an inventory application that worked. People could walk through a kitchen and enter what was on hand. The interface needed a few adjustments, but the basic product did what it was designed to do.</p>
    <p>Then the team looked at the operation. Inventory was not more accurate. The process was not faster. A functioning application had left the underlying problem largely intact.</p>
    <p>That experience, described in Tanner’s original essay about joining GrowthSync as a founding engineer, is a useful place to begin explaining the company we want to build. It is a story about the gap between producing software and improving how a business works.</p>
    <h2 id="the-problem-below-the-interface">The problem below the interface</h2>
    <p>Tanner was working on the supply-chain team at Local Kitchens. The business managed an operating stack that included supply chain, kitchen operations, and ordering. Understanding actual supply costs and waste depended on understanding inventory.</p>
    <p>The existing inventory process involved spreadsheets, pen and paper, and local practices. Tanner scoped a month-long sprint for a mobile-responsive application that staff could carry while taking inventory. On its own terms, the application was successful: a colleague could record inventory in it.</p>
    <p>The missing piece was how the kitchens were organized. Different locations used different systems. Stock-keeping units were not ordered consistently. Staff still had to work out where items were and how the local organization corresponded to the inventory list.</p>
    <p>Making data entry more convenient had not resolved that ambiguity. The software had improved an interface to a process that first needed to be understood and made workable.</p>
    <h2 id="an-operators-view-of-engineering">An operator’s view of engineering</h2>
    <p>In the original essay, Tanner described the need to think as an operator before deciding on a product solution. That means spending time with the people who perform the work, learning how the business functions, and resisting the temptation to treat every difficulty as a request for more code.</p>
    <p>There are practical questions underneath that approach. Does a clear process exist? Are people using it? Is the necessary information available at the moment a decision has to be made? Are different locations describing the same thing differently? Are employees being asked to compensate for a broken system?</p>
    <p>The answers can point toward software. They can also point toward organization, training, a clearer rule, or a decision someone has avoided making. Good product engineering should leave those possibilities open long enough to discover which one matters.</p>
    <p>This was the kind of work Tanner said he wanted to return to: tangible operational problems that required learning across functions, rather than treating the codebase as the entire business.</p>
    <h2 id="what-brought-him-here">What brought him here</h2>
    <p>After Local Kitchens, Tanner spent years building in different domains. He described that work as challenging and interesting, with plenty to learn. Yet he found himself missing something he could not immediately name. Talking with Mike and Rod helped make it clear: he wanted to return to the kind of engineering that begins by understanding how people run an operation.</p>
    <p>In his early conversations with Mike and Rod, Tanner heard about brands balancing sales, marketing, supply management, and customer support with lean teams. Inventory and the complexity of ordinary operations caught his attention.</p>
    <p>He described imagining warehouses and sales processes rather than immediately thinking about infrastructure tools. The attraction was the chance to understand different businesses from the inside and build with the people doing the work.</p>
    <p>Variety was part of that attraction. Learning from operators across different businesses offered a continuing education, with the people doing the work as the teachers. In his account, joining GrowthSync brought together two things he had been considering separately: the problems he wanted to solve and the people he wanted to solve them with.</p>
    <p>He also wrote about the team’s standards of ownership. The account was specific: taking responsibility when something broke, sharing credit when the team succeeded, and expecting that behavior across roles. He connected that to what he had experienced in the room, rather than presenting it as a list of abstract values.</p>
    <p>The common thread was ownership of the whole problem: understanding the operation, building for the people inside it, and staying responsible for what happened after the software shipped.</p>
    <h2 id="why-this-matters-for-ai">Why this matters even more for AI</h2>
    <p>From GrowthSync’s perspective, the inventory lesson becomes more important as producing software gets easier. A team can create more interfaces and more automations while still misunderstanding the work those systems are supposed to support.</p>
    <p>An agent can execute a mistaken definition of a process repeatedly. The question is therefore larger than whether it can perform a sequence of steps: are those the right steps, what happens when reality differs, and how can a person correct the result?</p>
    <p>That is the connection to our AI infrastructure thesis. Core is intended to provide a maintained foundation for business context, permissions, and execution. The foundation has to reflect actual operations. Otherwise, adding more capabilities simply gives the original misunderstanding more places to spread.</p>
    <h2 id="the-standard-for-the-next-capability">The standard for the next capability</h2>
    <p>Starting with commerce keeps these questions close to observable work. A product can be out of stock. An order can be delayed. A customer can receive the wrong answer. These are outcomes that an operator can examine, not just features a builder can demonstrate.</p>
    <p>The standard we take from Tanner’s story is to stay curious about the business after the software works. Did the operation improve? Which burden remains with the people? What did the system misunderstand? What should we change before asking it to do more?</p>
    <p>There is no shortcut around that learning. AI can help us build and investigate faster, but the obligation to understand the work remains. It is a good reason to join a company—and a useful constraint on the company we become.</p>
  </>,
};
