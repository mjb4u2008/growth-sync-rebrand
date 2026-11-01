import type { JournalEssay } from './types';

export const tannerEssay: JournalEssay = {
  slug: 'why-tanner-joined-growthsync',
  title: 'Start with the work',
  excerpt: 'Tanner built an inventory app. It worked. The inventory did not get better. That lesson gets more important as software gets easier to make.',
  category: 'Inside GrowthSync',
  tags: ['Team', 'Product engineering', 'Operations'],
  editorialNote: 'Adapted by GrowthSync from Tanner’s May 16, 2026 joining essay. The experiences are his; the perspective on our current direction is written by the GrowthSync team.',
  sources: [],
  cover: {
    src: '/journal/tanner.jpg',
    alt: 'Tanner, GrowthSync’s founding engineer, outside in a baseball cap.',
    caption: 'Tanner, Founding Engineer',
    portrait: true,
  },
  content: <>
    <p>Tanner built the inventory app. It worked. The inventory did not get better.</p>
    <p>That is the part of his story we keep coming back to. As software gets easier to make, understanding what deserves to be made becomes more important. A team can produce a technically successful answer to the wrong question much faster than it used to.</p>
    <p>When Tanner wrote about joining GrowthSync as a founding engineer, he began with that inventory app. We think it says more about the company we want to build than a list of technologies could.</p>

    <h2 id="the-app-was-the-easy-part">The app was the easy part</h2>
    <p>Tanner was working on the supply-chain team at Local Kitchens. The business managed kitchen operations, ordering, and supply. Understanding waste and actual supply costs depended on a more basic question: what was in the kitchen?</p>
    <p>The answer was scattered across spreadsheets, pen and paper, and the local practices of individual kitchens. Taking inventory was hard to repeat consistently. There was no convenient application someone could carry around to record it.</p>
    <p>He scoped a month-long sprint to build one. The result was a mobile-responsive web app. The colleague working with him could enter the inventory. There were a few interface details to improve, but the product did what it was supposed to do.</p>
    <p>Then they looked at the operation. The counts were no more accurate. The process was no faster. Each kitchen had organized its stock differently, and the stock-keeping units were not ordered consistently across locations. Finding and identifying the items remained a problem, however quickly somebody could type them into a screen.</p>
    <p>The app had made it easier to record an ambiguous process. The process itself still needed work.</p>

    <h2 id="a-different-place-to-begin">A different place to begin</h2>
    <p>Tanner’s conclusion was that operational engineering needs to begin before the product solution. Spend time with the people doing the job. Find out how the business actually runs. Leave open the possibility that another screen is not what it needs.</p>
    <p>This sounds obvious until you are the person holding the tool. An engineer sees something they can build. A team sees an opportunity to ship. The people using the result may still be carrying the same uncertainty they started with.</p>
    <p>The useful questions are closer to the floor. Are two locations talking about the same item? Does the person counting stock know where it belongs? Is the process clear enough to teach to the next employee? Which part of the work is difficult because the tool is missing, and which part is difficult because nobody has settled how it should happen?</p>
    <p>Tanner described learning to approach those conversations as a student. The people doing the work are the teachers. Engineering judgment starts with being willing to learn something that changes what you intended to build.</p>

    <h2 id="what-he-found-here">What he found here</h2>
    <p>After Local Kitchens, Tanner spent years building in other domains. The work was challenging, and he learned a great deal. He also found himself missing something he could not immediately name.</p>
    <p>Conversations with Mike and Rod brought it into focus. They talked about brands trying to handle sales, marketing, supply, and customer support with lean teams. When inventory came up, he found himself interested in each additional layer of complexity.</p>
    <p>His original account is specific about what caught his imagination: warehouses, the way a sales team manages its work, and the chance to learn how different businesses operate. He was thinking about the people and the physical work before the infrastructure that might support them.</p>
    <blockquote><p>“I was not thinking about Kubernetes. I was thinking about how a sales team manages its pipeline.”</p><cite>Tanner, from his original joining essay</cite></blockquote>
    <p>There was also the team. He described an expectation of taking personal responsibility when something breaks and sharing the credit when it succeeds. The important detail is that he connected that expectation to what he had experienced in the room. It was a reason to join, rather than a set of words placed on a careers page.</p>
    <p>The work and the people lined up. He wanted to learn from operators and build alongside a team that would stay responsible for what happened after shipping.</p>

    <h2 id="faster-software-raises-the-standard">Faster software raises the standard</h2>
    <p>Our industry is getting extraordinarily good at producing software. That makes Tanner’s lesson more urgent.</p>
    <p>An AI system can take a mistaken understanding of an operation and carry it farther than an ordinary application. It can write an explanation, generate a tool, and begin coordinating several steps around the same bad assumption. More capability increases the importance of knowing what the work means.</p>
    <p>For GrowthSync, building AI infrastructure therefore includes the unglamorous questions. Which record is authoritative? What does the owner mean by an available product? When does a promise become a commitment? What would count as finishing the job?</p>
    <p>These questions shape the system. A purchase request and a confirmed purchase need different states. A suggestion and an approved policy need different authority. A correction needs to reach the next job that depends on it. A reliable product makes those distinctions hold when nobody is watching the demo.</p>

    <h2 id="stay-close-as-the-ambition-grows">Stay close as the ambition grows</h2>
    <p>We are building toward a much broader set of operating capabilities through Core. Commerce is where we begin because its consequences are unusually legible. The stock exists or it does not. The order arrived or it did not. The person asking for help still has work to do, or the work is finished.</p>
    <p>That proximity to the outcome is valuable. It prevents the abstraction from becoming the achievement. A beautiful architecture can support the wrong process just as neatly as a simple application can.</p>
    <p>The inventory story leaves us with a demanding standard: keep looking after the software works. Ask whether the people can do something they could not do before. Find the burden that moved elsewhere. Change your mind when the operation tells you to.</p>
    <p>We want to build something with a very large reach. Staying close to small, specific truths is how we intend to get there.</p>
  </>,
};
