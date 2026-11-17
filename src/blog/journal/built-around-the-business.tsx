import type { JournalEssay } from './types';

export const builtAroundBusinessEssay: JournalEssay = {
  slug: 'built-around-the-business',
  title: 'Built around the business',
  excerpt: 'A company should be able to change its software when the work changes. We are building toward a system that takes the shape of the business.',
  category: 'Perspectives',
  tags: ['Company software', 'SaaS replacement', 'Core', 'Operating systems'],
  sources: [
    { label: 'Retool — Ship vibe-coded apps to production', href: 'https://retool.com/blog/retool-launches-react-ai-app-builder' },
    { label: 'ClickUp Help — Export task data', href: 'https://help.clickup.com/hc/en-us/articles/6310551109527-Export-task-data' },
    { label: 'Anthropic — Demystifying evals for AI agents, January 9, 2026', href: 'https://www.anthropic.com/research/demystifying-evals-for-ai-agents' },
  ],
  cover: {
    src: '/journal/built-around-the-business.jpg',
    alt: 'One orange thread passes through a sequence of glass and graphite structures, joining their distinct forms.',
    caption: 'Different forms. One continuous thread of work.',
  },
  content: <>
    <p>When a company changes how it works, its software should be able to change with it. We think that should become an ordinary expectation.</p>
    <p>Businesses develop their own ways of quoting work, approving decisions, serving customers, and getting paid. Then they translate those ways into the categories their software understands. A field becomes a convention. A spreadsheet fills a gap. An experienced employee knows what the status on the screen really means.</p>
    <p>We are building Core toward a different default: a company's own AI system, capable of taking over the responsibilities distributed across its SaaS stack. The ambition is an entire operating environment that can be built around the business and keep evolving with it.</p>

    <h2 id="a-project-is-already-a-system">A project is already a system</h2>
    <p>Imagine a small studio that designs and installs retail spaces. A new client commissions three locations. The studio has a sales tool, a project manager, shared files, an inbox, and billing software. Each application contains a useful part of the job.</p>
    <p>The actual project crosses all of them. A quote establishes the scope. A drawing needs approval before materials are ordered. A revised opening date changes the installation schedule. An invoice depends on which milestone the client accepted.</p>
    <p>People carry those relationships. Someone notices that the drawing in the project tool is older than the attachment the client approved. Someone remembers that the second location has different access hours. Someone checks whether a change request belongs in the original price.</p>
    <p>Now imagine software organized around that project. The approved drawing, commercial agreement, material order, installation plan, and invoice refer to the same work. A revision exposes the decisions it affects. The studio can change its approval process without inventing another convention to make its tools cooperate.</p>
    <p>That is the possibility we care about: giving a business software that understands its operating shape.</p>

    <h2 id="rebuild-the-behavior">Rebuild the behavior</h2>
    <p>A convincing interface is a small part of a replacement. The difficult question is what happens when somebody uses it.</p>
    <p>In our studio, a client can approve a drawing but cannot see the internal margin discussion. An installer needs the current plan. Moving a milestone may reschedule several dependent tasks. An approval can arrive while a colleague is making another change. The replacement has to preserve the behavior the business depends on through those situations.</p>
    <p>The discovery process therefore matters as much as the build. We want agents and engineers to study the customer's authorized environment, understand its workflows, and turn that evidence into a versioned description of the software to deliver. Screens, roles, records, integrations, and failure cases belong in the same account of the job.</p>
    <p>Familiarity has value too. A useful view can stay familiar while the machinery underneath changes. Improvements should be deliberate choices the customer can recognize, rather than missing behavior explained away as simplification.</p>

    <h2 id="the-past-has-to-arrive">The past has to arrive</h2>
    <p>The studio's active projects will not wait while its software is rebuilt. Their history has to arrive with them.</p>
    <p>A drawing without its approval history is a different object. A task without its dependencies can look complete while work remains blocked. Importing the right number of rows says little about whether the company can still understand its commitments.</p>
    <p>Even an ordinary export reveals this complexity. <a href="https://help.clickup.com/hc/en-us/articles/6310551109527-Export-task-data">ClickUp's task-export documentation</a> describes identifiers, parent and subtask relationships, comments, attachments, and dates among the data it provides. Moving these fields requires preserving the relationships and meanings that made them useful.</p>
    <p>The transition we want is inspectable. Existing records can be reconciled against the new system. Missing information is visible. People can test representative work before switching, with a way back if the result fails. Migration is part of delivering the software, because the business already exists.</p>

    <h2 id="make-the-next-change-easier">Make the next change easier</h2>
    <p>Custom software has always been possible. Its continuing burden has often made it a difficult choice. A business can commission an application and gradually find itself managing a second business around it.</p>
    <p>AI changes what can be built and who can help build it. The supporting infrastructure is changing too. <a href="https://retool.com/blog/retool-launches-react-ai-app-builder">Retool's account of its new app builder</a> describes bringing React applications into a shared environment for authentication, permissions, deployment, and ongoing operation. It is one concrete example of a wider architectural direction.</p>
    <p>For us, the important design question is what the next customer request inherits. If the studio adds a maintenance service after installation, the system already has customer identities, approved drawings, site information, and the completed project. A new capability should build on that foundation while establishing the additional permissions and behavior it needs.</p>
    <p>That calls for shared engineering underneath customer-specific software. Useful improvements to migration, testing, or execution can benefit later deployments. Each customer's records and operating decisions remain scoped to that customer. Reuse should reduce the burden of maintaining the system without erasing what makes the business different.</p>

    <h2 id="what-earns-the-switch">What earns the switch</h2>
    <p>The incumbent has something valuable: work already runs through it. Its breadth, familiar behavior, and accumulated history deserve to be taken seriously.</p>
    <p>A replacement earns the switch by handling the agreed work dependably. The person who built it cannot be its only judge. Tests should come from the business's requirements and observable behavior, including cases where an action must be denied or a dependency fails.</p>
    <p><a href="https://www.anthropic.com/research/demystifying-evals-for-ai-agents">Anthropic's writing on agent evaluation</a> makes a useful distinction between what an agent says happened and the resulting state of the environment. For our studio, an agent saying the installation was rescheduled is weaker evidence than the correct schedule, dependencies, notifications, and permissions actually being in place.</p>
    <p>The economics deserve the same honesty. A smaller subscription bill is attractive. It becomes a meaningful improvement when the business also has dependable operation, understandable control, and a manageable cost of change.</p>

    <h2 id="a-different-default">A different default</h2>
    <p>This is the direction we are pursuing at GrowthSync with Core. Selected responsibilities provide places to begin; the ambition extends across the company's software stack.</p>
    <p>Our imagined studio should eventually be able to add a service, change a process, or enter a new market with a system that can adapt alongside it. Its people bring the judgment, relationships, and ideas. The software carries more of the work of making those ideas operational.</p>
    <p>We want the next generation of businesses to have a more useful question available to them: what would we build if our software could take the shape of the company we want to become?</p>
  </>,
};
