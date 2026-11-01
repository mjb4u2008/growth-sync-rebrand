import type { JournalEssay } from './types';
import { JournalDiagram } from './JournalDiagram';

export const foundationEssay: JournalEssay = {
  slug: 'a-new-foundation-for-business',
  title: 'A new kind of company',
  excerpt: 'A small company should be able to gain the capabilities of a much larger one. We are building for a world where its software helps that happen.',
  category: 'Perspectives',
  tags: ['Company thesis', 'AI infrastructure', 'Core'],
  sources: [],
  cover: {
    src: '/journal/a-new-kind-of-company.jpg',
    alt: 'An expanding graphite structure connected by one continuous orange thread.',
    caption: 'More room to act. A study of connected capability.',
  },
  content: <>
    <p>A small company should not need a large-company org chart to develop large-company capabilities. That is the future we want to build.</p>
    <p>Today, a surprising amount of scale is the ability to afford coordination. Someone reconciles the inventory. Someone carries a customer promise into the warehouse. Someone remembers why the margin rule has an exception. A growing business hires people, buys software, and then hires more people to hold the pieces together.</p>
    <p>We believe that relationship can change. A company should be able to expand what it does without expanding the work of explaining itself, moving information between tools, and checking that yesterday’s decision survived until today. Software can take on more of that responsibility. The interesting consequence is a different kind of company.</p>

    <h2 id="the-work-between-the-tools">The work between the tools</h2>
    <p>Look closely at an ordinary business. Its software knows a great deal. The store knows what sold. The warehouse knows what remains. The inbox holds the promise made to a customer. The accounting system records what the order was worth. Yet the next useful decision often happens in somebody’s head.</p>
    <p>That person supplies the connections. This customer needs the shipment before an event. That supplier’s estimate is usually optimistic. This product can be discounted, unless the order needs expedited delivery. The information exists, but its meaning does not automatically travel to the place where work happens.</p>
    <p>Better interfaces have made each tool easier to operate. AI gives us a chance to change the work between them: understanding a situation, choosing a next step, carrying it out under a clear mandate, and checking the result. That is a much larger design space than adding a text box to every application.</p>

    <h2 id="imagine-a-different-tuesday">Imagine a different Tuesday</h2>
    <p>Picture a small homewares brand. This is an imagined business, but the decisions are familiar. A hotel wants to place a wholesale order. It needs a delivery date, a price, and confidence that the stock will be there. The owner would like to say yes. Saying yes safely means interrupting several other jobs.</p>
    <p>In the future we are working toward, the request starts a piece of work that belongs to the company. Its system checks available stock against existing commitments, asks the supplier about a shortfall, and calculates the order using the company’s approved terms. It comes back with a choice: fulfill part of the order now, or offer a later date for the full quantity. The evidence and the unresolved question arrive with it.</p>
    <p>The owner chooses. The system carries that decision into the quote and the follow-up. If the supplier changes the date, the work reopens. If the hotel asks again next week, the company remembers the agreement. The owner does not have to rebuild the story in another chat.</p>
    <p>Notice what has changed. The brand can offer a more capable service without first creating a wholesale operations department. A customer gets a considered answer. The person running the company spends more time deciding what kind of business to build.</p>

    <JournalDiagram kind="range" />
    <h2 id="the-foundation-should-get-better">The foundation should get better</h2>
    <p>Access to an intelligent model makes pieces of that future possible. A lasting operating foundation makes the pieces belong to the same business.</p>
    <p>It has to distinguish a suggestion from a decision, a draft from a sent quote, and a likely delivery from a confirmed one. It needs to know which person can approve a price and which event should bring an unfinished job back to life. When the model changes, those obligations should stay intact.</p>
    <p>This is what draws us to infrastructure. Each completed job can leave behind something useful: a corrected product definition, a tested procedure, a clearer exception rule, a reliable connection. A later capability should be able to use that preparation without inheriting permissions it was never given.</p>
    <p>That possibility comes with a hard condition. Accumulation has to improve the work. A growing pile of stale notes will make a company harder to understand. A useful foundation needs ways to correct, retire, and test what it retains. We want a business to become easier to operate as its experience grows.</p>

    <h2 id="small-companies-with-more-range">Small companies with more range</h2>
    <p>The usual picture of AI in business is a familiar company doing familiar work faster. We are interested in the company that becomes possible when the cost of acquiring an additional operating capability changes.</p>
    <p>A specialist manufacturer might handle more individual customer requirements. A regional retailer might coordinate stock and demand across locations with less manual reconciliation. An independent brand might test a new sales channel without making the owner its full-time operator. These are possibilities, not forecasts of effortless growth. Each requires the surrounding work to become dependable.</p>
    <p>Some advantages will remain physical or deeply human. Taste, relationships, supply, judgment, and a product people want do not arrive with an agent. That is part of the appeal. More businesses should be able to compete on those strengths without being limited so sharply by the operating machinery they can afford.</p>
    <p>Our bet is that smallness can become more of a choice about focus and less of a ceiling on capability.</p>

    <h2 id="where-we-start">Where we start</h2>
    <p>GrowthSync is building that maintained foundation through Core, our first product. We are starting in commerce, where the relationships are concrete: a campaign changes demand, demand changes stock, stock changes a customer promise, and the promise creates work someone has to finish.</p>
    <p>Commerce gives us a place to confront the difficult details. Did the action reach the right system? Was it still permitted when it ran? Did a person have to rescue the job? Did the second capability actually benefit from what the first one established? These questions decide whether the foundation exists in practice.</p>
    <p>We have to earn a larger role one useful responsibility at a time. Starting with specific work is how we intend to reach the broader ambition: businesses whose capabilities keep expanding as the intelligence available to them improves.</p>
    <p>We want to see what people build when the size of their organization stops deciding the range of things it can do.</p>
  </>,
};
