import type { JournalEssay } from './types';
import { JournalDiagram } from './JournalDiagram';

export const operatingSystemEssay: JournalEssay = {
  slug: 'the-model-is-not-the-operating-system',
  title: 'Beyond the session',
  excerpt: 'A company’s work lasts longer than a conversation with a model. The next operating foundation has to own what happens in between.',
  category: 'Perspectives',
  tags: ['AI infrastructure', 'Core', 'Execution'],
  cover: {
    src: '/journal/beyond-the-session.jpg',
    alt: 'A continuous orange line bridges separated graphite structures.',
    caption: 'The worker can change. The commitment continues.',
  },
  content: <>
    <p>Friday, 4:58 p.m. A purchase order is submitted. The supplier's system times out.</p>
    <p>In this imagined situation, the order might have failed. It might also have succeeded just before the connection broke. Submitting it again could buy twice as much stock. Doing nothing could leave the business without the stock it needs. The person watching closes their laptop. A chat session ends. Monday is coming either way.</p>
    <p>This is where we think an important part of the AI opportunity lives. A company needs something that can remain responsible for work after the conversation is over.</p>
    <h2 id="the-job-outlives-the-worker">The job outlives the worker</h2>
    <p>We would want that purchase order to exist as a durable job with an identity of its own. It needs the intended result, current owner, approved scope, attempted action, and the evidence still missing. The next useful step is to establish what happened at the supplier. A fresh agent should be able to pick up the job without reconstructing Friday from a conversational summary.</p>
    <p>This changes the role of the model. It can reason about the situation, select a useful check, or prepare a response to a new constraint. The surrounding system must retain the commitment and its state. A worker can fail, a process can restart, and a newer model can take its place. None should make the order disappear.</p>
    <p>We think agents should become replaceable more quickly than the responsibilities entrusted to them. A business can improve its intelligence without losing track of what it owes.</p>
    <h2 id="unknown-is-a-real-state">Unknown is a real state</h2>
    <p>Our Friday order exposes a distinction that polished demos rarely linger on. “Attempted” and “confirmed” mean different things. So does “unknown.” A failed network response does not necessarily mean a failed business action.</p>
    <p>If the supplier supports an idempotency key, the system can use a stable key to avoid repeating the same effect. Where that protection is unavailable, it needs another way to reconcile: a supplier order identifier, a status query, an acknowledgment, or a person who can verify receipt. The recovery depends on the actual service. A generic retry loop can create a very specific problem.</p>
    <p>The same principle applies to customer messages and budget changes. Some effects can be reversed; others have already reached another person. A system that announces completion because it called a tool has stopped one step too early. We want a record of the effect the business can verify, with unresolved uncertainty still visible.</p>
    <p>That record is useful beyond debugging. It lets an operator distinguish work that is finished from work that is merely quiet.</p>
    <h2 id="authority-can-change-while-work-waits">Authority can change while work waits</h2>
    <p>On Monday, the supplier confirms that it never received the order. Meanwhile, the owner has lowered the purchasing limit. Friday's proposed order now exceeds it.</p>
    <p>The job should remember the original approval and check the current authority before trying again. Remembering permission forever would be a serious design mistake. The world can change while an agent waits: prices, stock, account access, customer requests, and the instructions of the person who delegated the work.</p>
    <p>This is why we want consequential actions to cross an enforced boundary. The model proposes an action. The runtime checks the permitted account, operation, limits, and material preconditions against current state. A generated script must pass through that same boundary. Creating a new tool cannot create a new purchasing allowance.</p>
    <p>A useful system will sometimes return with a smaller question: the supplier has no order, but the amount now needs approval. It can preserve all the work already done and ask for the decision that actually matters.</p>
    <JournalDiagram kind="continuity" />
    <h2 id="a-platform-beneath-the-surfaces">A platform beneath the surfaces</h2>
    <p>There are early signs of this architectural shift in large companies. In its account of <a href="https://stripe.dev/blog/meet-stripes-knowledge-ai-platform" target="_blank" rel="noreferrer">Kai, Stripe's Knowledge AI Platform</a>, Stripe describes shared APIs across interfaces, tools for domain owners to govern agents and skills, and execution infrastructure with sandboxes and access controls. Stripe also identifies a subtle permission problem: access to two customer contexts separately does not imply permission to combine them in one task.</p>
    <p>We read that as a useful direction. The interface can move while the operating rules remain coherent. Stripe's platform serves its own organization; our question is how to make a maintained foundation accessible to a much wider range of businesses.</p>
    <p>A merchant might start a job in a message, approve it in an app, and receive the result somewhere else. There should still be one job, one current state, and a clear account of who was allowed to do what.</p>
    <h2 id="learning-has-to-reach-the-next-job">Learning has to reach the next job</h2>
    <p>Once the order is resolved, the system has encountered a useful failure: a timeout left a consequential action unresolved. This time, the supplier confirmed that no order existed. Next time, the request could succeed before its response is lost. We would want the next job to handle either outcome.</p>
    <p>One possible improvement is a reconciliation step before any retry. It should be tested against a duplicate acknowledgment, an unavailable status endpoint, a changed order, and a restart in the middle. A versioned procedure can then be introduced deliberately, with evidence that it handles those cases. A lesson becomes operating capability when it can survive the next unfamiliar situation.</p>
    <p>Automatically adding “always retry” to a prompt would learn exactly the wrong lesson. Likewise, one merchant's exception should not silently become every merchant's rule. We want a system that can propose and develop better capabilities while keeping the business's authority and private knowledge where they belong.</p>
    <h2 id="the-work-between-turns">The work between turns</h2>
    <p>None of this requires a model to think continuously through the weekend. The job can wait for a supplier event, a scheduled check, or a human decision. It should wake when there is useful work to do, with the relevant evidence ready. Cheap checks and explicit wake-up conditions matter if this is going to work for ordinary businesses.</p>
    <p>Core is our work toward that operating foundation. Commerce gives us demanding places to start: transactions, customer promises, changing stock, and work that crosses company boundaries. The ambition is a business that can take on more without making its owner the memory, router, and recovery mechanism for every system it uses.</p>
    <p>For the owner, Monday's useful message is simple: the supplier confirmed no order was placed; the new purchasing limit requires your approval; here is the prepared order and what happens next. Everything beneath that message exists to make it true.</p>
  </>,
  sources: [
    {
      label: "Stripe Engineering — Meet Stripe's Knowledge AI Platform",
      href: 'https://stripe.dev/blog/meet-stripes-knowledge-ai-platform',
    },
  ],
};
