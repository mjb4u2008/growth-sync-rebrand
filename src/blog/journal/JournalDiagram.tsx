import type { ReactNode } from 'react';

export type JournalDiagramKind = 'range' | 'memory' | 'continuity' | 'reuse' | 'shared-context';

type JournalDiagramProps = {
  kind: JournalDiagramKind;
  caption?: ReactNode;
};

const captions: Record<JournalDiagramKind, string> = {
  range: 'The ambition: more operating range, built on the same understanding of the business.',
  memory: 'Useful memory preserves the source, the scope of a decision, and the evidence of what happened.',
  continuity: 'An illustrative job lifecycle. Sessions can end while a responsibility remains open.',
  reuse: 'Illustrative expansion: shared foundations carry forward; each new responsibility still has to earn trust.',
  'shared-context': 'One changed fact can alter several decisions. Each action still needs current evidence and authority.',
};

function Branches() {
  return <svg className="journal-diagram-branches" viewBox="0 0 600 48" preserveAspectRatio="none" aria-hidden="true">
    <path d="M300 0V23H100V48M300 23V48M300 23H500V48" />
  </svg>;
}

function RangeDiagram() {
  return <div className="journal-diagram-range">
    <div className="journal-diagram-foundation">
      <span className="journal-diagram-label">One business</span>
      <strong>A shared operating foundation</strong>
      <span className="journal-diagram-detail">Current context, clear authority, dependable tools</span>
    </div>
    <Branches />
    <ul className="journal-diagram-branch-list">
      <li><strong>Service</strong><span>Keep the promise</span></li>
      <li><strong>Marketing</strong><span>Know what to offer</span></li>
      <li><strong>Inventory</strong><span>Plan what comes next</span></li>
    </ul>
  </div>;
}

function MemoryDiagram() {
  return <div className="journal-diagram-memory">
    <p className="journal-diagram-heading">Keep the reason with the result.</p>
    <dl className="journal-diagram-memory-records">
      <div>
        <dt><span className="journal-diagram-dot" aria-hidden="true" />Source</dt>
        <dd>Policy in force at purchase<span>Dated and attributed</span></dd>
      </div>
      <div>
        <dt><span className="journal-diagram-dot journal-diagram-dot-accent" aria-hidden="true" />Decision</dt>
        <dd>Exception approved for this order<span>Limited in scope and duration</span></dd>
      </div>
      <div>
        <dt><span className="journal-diagram-dot" aria-hidden="true" />Result</dt>
        <dd>Action confirmed in the source system<span>Verified and traceable</span></dd>
      </div>
    </dl>
    <p className="journal-diagram-principle">Retain the decision. Recheck what is still true.</p>
  </div>;
}

function ContinuityDiagram() {
  return <div className="journal-diagram-continuity">
    <p className="journal-diagram-heading">A job can outlive the session.</p>
    <ol className="journal-diagram-timeline">
      <li><span className="journal-diagram-timeline-marker" aria-hidden="true" /><strong>Request</strong><span>The work has an owner</span></li>
      <li><span className="journal-diagram-timeline-marker" aria-hidden="true" /><strong>Plan</strong><span>Scope and authority are agreed</span></li>
      <li className="journal-diagram-wait"><span className="journal-diagram-timeline-marker" aria-hidden="true" /><strong>Wait</strong><span>The supplier has not replied</span></li>
      <li><span className="journal-diagram-timeline-marker" aria-hidden="true" /><strong>Confirm</strong><span>The outcome is verified</span></li>
    </ol>
    <div className="journal-diagram-continuity-rule"><span>Session ends</span><span>Responsibility continues</span></div>
    <p className="journal-diagram-principle">An open obligation stays open until there is evidence to close it.</p>
  </div>;
}

function ReuseDiagram() {
  return <div className="journal-diagram-reuse">
    <div className="journal-diagram-job">
      <span className="journal-diagram-label">First capability</span>
      <strong>Answer product questions</strong>
      <span className="journal-diagram-detail">Learn what customers need to know</span>
    </div>
    <div className="journal-diagram-reuse-foundation">
      <span className="journal-diagram-label">Carried forward</span>
      <ul><li>Product identity</li><li>Approved facts</li><li>Access boundaries</li><li>Tested tools</li></ul>
    </div>
    <div className="journal-diagram-job">
      <span className="journal-diagram-label">Next capability</span>
      <strong>Improve the catalog</strong>
      <span className="journal-diagram-detail">Turn recurring questions into better information</span>
    </div>
    <p className="journal-diagram-principle">A new responsibility should not mean starting the company’s setup again.</p>
  </div>;
}

function SharedContextDiagram() {
  return <div className="journal-diagram-shared">
    <div className="journal-diagram-event"><span className="journal-diagram-dot journal-diagram-dot-accent" aria-hidden="true" /><strong>A shipment is delayed</strong><span>One fact changes</span></div>
    <Branches />
    <ul className="journal-diagram-branch-list">
      <li><strong>Campaign</strong><span>Review promotion of affected stock</span></li>
      <li><strong>Customer promise</strong><span>Review the delivery estimate</span></li>
      <li><strong>Purchasing</strong><span>Review substitute supply</span></li>
    </ul>
    <p className="journal-diagram-principle">Before acting: recheck the evidence, the approval, and the time.</p>
  </div>;
}

const diagrams: Record<JournalDiagramKind, () => ReactNode> = {
  range: RangeDiagram,
  memory: MemoryDiagram,
  continuity: ContinuityDiagram,
  reuse: ReuseDiagram,
  'shared-context': SharedContextDiagram,
};

/** Conceptual editorial figures, not screenshots or claims about live product coverage. */
export function JournalDiagram({ kind, caption }: JournalDiagramProps) {
  const Diagram = diagrams[kind];
  return <figure className={`journal-diagram journal-diagram-${kind}-figure`}>
    <div className="journal-diagram-canvas"><Diagram /></div>
    <figcaption>{caption ?? captions[kind]}</figcaption>
  </figure>;
}
