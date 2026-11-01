import { useEffect, useRef, useState, type FormEvent } from 'react';
import { ArrowUpRight, Check, X } from 'lucide-react';
import { getStoredAttribution } from '@/utils/attribution';
import { trackLeadConversion } from '@/utils/marketingTags';

export function CoreInquiry({ open, onClose }: { open: boolean; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [state, setState] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [error, setError] = useState('');
  const submitting = useRef(false);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
    document.body.classList.toggle('core-dialog-open', open);
    return () => { document.body.classList.remove('core-dialog-open'); };
  }, [open]);
  useEffect(() => () => { abortRef.current?.abort(); }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;
    const form = event.currentTarget;
    for (const key of ['name', 'email', 'company', 'website']) {
      const field = form.elements.namedItem(key) as HTMLInputElement;
      field.setCustomValidity(field.value.trim() ? '' : 'Please complete this field.');
    }
    if (!form.reportValidity()) return;
    const values = new FormData(form);
    const website = String(values.get('website') || '').trim();
    const payload = {
      name: String(values.get('name') || '').trim(),
      company: String(values.get('company') || '').trim(),
      email: String(values.get('email') || '').trim(),
      website,
      notes: String(values.get('notes') || '').trim(),
      source: 'brand-inquiry',
      attribution: getStoredAttribution(),
    };
    submitting.current = true;
    setState('sending');
    setError('');
    const controller = new AbortController();
    abortRef.current = controller;
    const timeout = window.setTimeout(() => controller.abort(), 20000);
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      const result = await response.json();
      if (!response.ok || result.ok !== true || result.captured !== true) throw new Error('unconfirmed');
      setState('sent');
      try { trackLeadConversion(); } catch { /* Capture is complete even if measurement fails. */ }
    } catch {
      setState('idle');
      setError("We couldn't confirm your request. Your details are still here. Please try again.");
    } finally {
      window.clearTimeout(timeout);
      submitting.current = false;
      abortRef.current = null;
    }
  }

  return (
    <dialog
      ref={dialogRef}
      className="core-dialog"
      aria-labelledby="core-inquiry-title"
      aria-describedby="core-inquiry-description"
      onCancel={onClose}
      onClose={onClose}
      onClick={event => { if (event.target === event.currentTarget) onClose(); }}
    >
      <div className="core-inquiry">
        <button type="button" className="core-close" aria-label="Close inquiry" onClick={onClose}><X size={21} /></button>
        <span className="core-inquiry-mark" aria-hidden="true">↗</span>
        {state === 'sent' ? (
          <div className="core-confirmation" role="status">
            <span className="core-success-icon"><Check size={27} /></span>
            <h2 id="core-inquiry-title">A good place to start.</h2>
            <p id="core-inquiry-description">Your request is with our team. We’ll be in touch at the email you shared.</p>
            <button className="core-submit" type="button" onClick={onClose}>Back to GrowthSync <ArrowUpRight size={18} /></button>
          </div>
        ) : (
          <>
            <h2 id="core-inquiry-title">Let’s build<br />what comes next.</h2>
            <p id="core-inquiry-description">Tell us about your business and what you have in mind.</p>
            <form onSubmit={submit} onInput={event => {
              const field = event.target;
              if (field instanceof HTMLInputElement) field.setCustomValidity('');
            }} aria-busy={state === 'sending'}>
              <fieldset disabled={state === 'sending'} className="core-form-fields"><div className="core-form-pair">
                <label>Your name<input autoComplete="name" name="name" required maxLength={160} placeholder="Alex Morgan" /></label>
                <label>Work email<input autoComplete="email" type="email" name="email" required maxLength={240} placeholder="alex@company.com" /></label>
              </div>
              <div className="core-form-pair">
                <label>Company or brand<input autoComplete="organization" name="company" required maxLength={180} placeholder="Company name" /></label>
                <label>Website<input autoComplete="url" type="url" name="website" pattern="https?://.+" title="Use a website beginning with https:// or http://" required maxLength={280} placeholder="https://company.com" /></label>
              </div>
              <label>What would you like to make possible? <span className="core-optional">Optional</span><textarea name="notes" rows={3} maxLength={2400} placeholder="A workflow, a problem, a bigger idea…" /></label>
              </fieldset>
              {error && <p className="core-error" role="alert">{error}</p>}
              <button type="submit" className="core-submit" disabled={state === 'sending'}>{state === 'sending' ? 'Sending…' : 'Start a conversation'}<ArrowUpRight size={18} /></button>
              <p className="core-form-privacy">We’ll use these details to respond to your inquiry. <a href="/privacy">Privacy</a></p>
            </form>
          </>
        )}
      </div>
    </dialog>
  );
}
