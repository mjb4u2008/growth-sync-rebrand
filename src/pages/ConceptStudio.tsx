import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, Maximize2, PanelRightOpen } from 'lucide-react';
import CoreHome from './CoreHome';
import { CoreSculpture } from '@/components/core/CoreSculpture';
import { CoreMotionStudy, type MotionStudyKind } from '@/components/core/CoreMotionStudy';
import '@/styles/concept-studio.css';

const forms = [
  { id: 'original', label: 'Original', note: 'The previous woven loop.' },
  { id: 'ribbon', label: 'Ribbon', note: 'A continuous form, turning inside out.' },
  { id: 'orbit', label: 'Orbit', note: 'Particles gathering into something larger.' },
  { id: 'tide', label: 'Tide', note: 'A surface that never stops becoming.' },
] as const;

const headlines = [
  { lines: ['A new foundation', 'for business.'], note: 'The earlier foundation direction.' },
  { lines: ['A new way', 'to run.'], note: 'The clearest expression of a new operating model.' },
  { lines: ['The shape of', 'what’s next.'], note: 'The most intriguing match for a changing sculpture.' },
  { lines: ['Built to', 'become more.'], note: 'Speaks to capabilities that keep expanding.' },
  { lines: ['Growth has', 'a new shape.'], note: 'A direct connection between the name and the form.' },
  { lines: ['At the Core', 'of what’s next.'], note: 'Brings the product name into the story.' },
] as const;

type FormKind = 'original' | MotionStudyKind;

/** Local design exploration. Excluded from production by App's DEV gate. */
export default function ConceptStudio() {
  const [form, setForm] = useState<FormKind>('orbit');
  const [headline, setHeadline] = useState(2);
  const [expanded, setExpanded] = useState(false);
  const hideRef = useRef<HTMLButtonElement>(null);
  const showRef = useRef<HTMLButtonElement>(null);
  const changedExpansion = useRef(false);
  const toggleExpanded = (value: boolean) => { changedExpansion.current = true; setExpanded(value); };
  useEffect(() => {
    if (changedExpansion.current) (expanded ? showRef : hideRef).current?.focus();
  }, [expanded]);
  return <div className={`concept-studio${expanded ? ' is-expanded' : ''}`}>
    <div className="concept-preview">
      <CoreHome
        headline={headlines[headline].lines}
        renderSculpture={paused => form === 'original' ? <CoreSculpture paused={paused} /> : <CoreMotionStudy key={form} kind={form} paused={paused} />}
      />
    </div>
    {!expanded && <aside className="concept-controls" aria-label="Design studies">
      <a href="/" className="concept-back"><ArrowLeft size={14} aria-hidden="true" />Current homepage</a>
      <h2>Motion & words.</h2>
      <p className="concept-intro">Try a different form.<br />See what the words become.</p>
      <fieldset>
        <legend>Sculpture</legend>
        <div className="concept-forms">
          {forms.map(item => <button key={item.id} type="button" aria-pressed={form === item.id} onClick={() => setForm(item.id)}>
            <span>{item.label}</span><small>{item.note}</small>
          </button>)}
        </div>
      </fieldset>
      <label className="concept-headline-label" htmlFor="concept-headline">Headline</label>
      <select id="concept-headline" value={headline} onChange={event => setHeadline(Number(event.target.value))}>
        {headlines.map((item, index) => <option value={index} key={index}>{item.lines.join(' ')}</option>)}
      </select>
      <p className="concept-copy-note">{headlines[headline].note}</p>
      <button type="button" ref={hideRef} className="concept-expand" onClick={() => toggleExpanded(true)}><Maximize2 size={15} aria-hidden="true" />Hide the controls</button>
      <p className="concept-footnote">Exploration only. Your current design is saved.</p>
    </aside>}
    {expanded && <button type="button" ref={showRef} className="concept-reopen" onClick={() => toggleExpanded(false)}><PanelRightOpen size={15} aria-hidden="true" />Show studies</button>}
  </div>;
}
