/**
 * <BookACall> - production intake for the primary CTA.
 *
 * The form always posts to `/api/leads`; success is only shown after the
 * server confirms at least one capture destination.
 */

import { useEffect, useMemo, useState, type FormEvent } from "react";
import { Helmet } from "react-helmet-async";

import { navigateTo } from "@/blog/router";
import { ChromeWindow, TangerineButton } from "@/components/atoms";
import { buildCalendlyEmbedUrl, getCalendlyUrlFromClientEnv } from "@/utils/calendly";

type FormState = {
  name: string;
  company: string;
  email: string;
  social: string;
  notes: string;
};

type SubmitState = "idle" | "submitting";

const INITIAL_FORM: FormState = {
  name: "",
  company: "",
  email: "",
  social: "",
  notes: "",
};

const REQUIRED: Array<keyof FormState> = ["name", "company", "email", "social"];

function validate(form: FormState): Partial<Record<keyof FormState, string>> {
  const errors: Partial<Record<keyof FormState, string>> = {};
  for (const key of REQUIRED) {
    if (!form[key].trim()) errors[key] = "Required";
  }
  if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
    errors.email = "Use a real email";
  }
  return errors;
}

export function BookACall() {
  useEffect(() => {
    const prev = document.title;
    document.title = "Book a call | GrowthSync";
    return () => { document.title = prev; };
  }, []);

  return (
    <main className="gs-pagewrap gs-pagewrap--wide" id="book-a-call">
      <Helmet>
        <title>Book a Call | GrowthSync</title>
        <meta
          name="description"
          content="Book a GrowthSync intro call to see how Instagram and TikTok impressions become customer memory and revenue action."
        />
        <link rel="canonical" href="https://growthsync.com/book-a-call" />
      </Helmet>

      <div className="gs-bac-intake">
        <Pitch />
        <Scheduler />
      </div>
    </main>
  );
}

export function BookACallSuccess() {
  const calendlyUrl = useMemo(() => getCalendlyUrlFromClientEnv(), []);
  const calendlyEmbedUrl = useMemo(() => buildCalendlyEmbedUrl(calendlyUrl), [calendlyUrl]);

  useEffect(() => {
    const prev = document.title;
    document.title = "Request received | GrowthSync";
    return () => { document.title = prev; };
  }, []);

  return (
    <main className="gs-pagewrap" id="book-a-call-success">
      <Helmet>
        <title>Request Received | GrowthSync</title>
        <meta name="description" content="GrowthSync received your book-a-call request." />
        <link rel="canonical" href="https://growthsync.com/book-a-call/success" />
      </Helmet>

      <div className="gs-page-eyebrow">
        <span className="dot" />
        <span>REQUEST RECEIVED</span>
      </div>

      <ChromeWindow title="request.received · growthsync">
        <div className="gs-form-success gs-form-success--page" role="status" aria-live="polite">
          <div className="head">Book a time below to get started.</div>
          <div className="sub">
            Choose any slot that works for you. We will use your intake to make the first conversation concrete.
            {calendlyUrl && (
              <>
                {" "}
                If the calendar does not load,{" "}
                <a className="gs-inline-schedule-link" href={calendlyUrl} target="_blank" rel="noreferrer">
                  schedule a call here
                </a>
                .
              </>
            )}
          </div>
          {!calendlyUrl && <span className="hint">Calendly is not configured in this environment.</span>}
          {calendlyEmbedUrl && (
            <iframe
              title="Calendly scheduler"
              src={calendlyEmbedUrl}
              className="gs-calendly-frame"
            />
          )}
        </div>
      </ChromeWindow>
    </main>
  );
}

function Pitch() {
  return (
    <section className="gs-bac-pitch" aria-labelledby="bac-headline">
      <h1 id="bac-headline" className="gs-page-title">
        Start turning impressions into actions.
      </h1>
    </section>
  );
}

function Scheduler() {
  return (
    <section aria-labelledby="bac-scheduler">
      <h2 id="bac-scheduler" style={srOnly}>
        Request a call
      </h2>
      <ol className="gs-bac-steps" aria-label="Book a call steps">
        <li>
          <span>1.</span>
          Step 1: Intake
        </li>
        <li>
          <span>2.</span>
          Step 2: Schedule a call
        </li>
      </ol>
      <ChromeWindow
        title="intake.form · intro_call.sheet"
        contentStyle={{ background: "var(--gs-paper)" }}
      >
        <IntakeForm />
      </ChromeWindow>
    </section>
  );
}

const srOnly: React.CSSProperties = {
  position: "absolute",
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: "hidden",
  clip: "rect(0,0,0,0)",
  whiteSpace: "nowrap",
  border: 0,
};

function IntakeForm() {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  const update = (key: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    setServerError(null);
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const next = validate(form);
    setErrors(next);
    setServerError(null);

    if (Object.keys(next).length > 0) return;

    setSubmitState("submitting");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          company: form.company,
          email: form.email,
          socialHandles: form.social,
          notes: form.notes,
          source: "book-a-call",
        }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data?.ok) {
        throw new Error(data?.error || "Lead capture failed. Please try again.");
      }

      sessionStorage.setItem("growthsync:lastLeadEmail", form.email);
      navigateTo("/book-a-call/success");
    } catch (error) {
      setServerError(error instanceof Error ? error.message : "Lead capture failed. Please try again.");
    } finally {
      setSubmitState("idle");
    }
  };

  return (
    <form className="gs-form-grid" onSubmit={onSubmit} noValidate>
      <Field label="Name" name="name" value={form.name} onChange={update("name")} error={errors.name} required autoComplete="name" />
      <Field label="Company" name="company" value={form.company} onChange={update("company")} error={errors.company} required autoComplete="organization" />
      <Field label="Email" name="email" type="email" value={form.email} onChange={update("email")} error={errors.email} required autoComplete="email" />
      <Field label="Instagram / TikTok" name="social" value={form.social} onChange={update("social")} error={errors.social} required placeholder="@brand, @founder, @creator" />
      <TextArea label="Notes" name="notes" value={form.notes} onChange={update("notes")} error={errors.notes} placeholder="Biggest social workflow, launch timing, or what you'd want to see." />
      {serverError && (
        <div className="gs-form-server-error" role="alert">
          {serverError}
        </div>
      )}
      <div className="gs-form-actions">
        <TangerineButton size="md" type="submit">
          {submitState === "submitting" ? "Sending..." : "Request a call →"}
        </TangerineButton>
      </div>
    </form>
  );
}

type FieldProps = {
  label: string;
  name: keyof FormState;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
};

function Field({ label, name, value, onChange, error, required, type = "text", placeholder, autoComplete }: FieldProps) {
  return (
    <div className={`gs-form-row${error ? " is-error" : ""}`}>
      <label htmlFor={`bac-${name}`}>
        {label}
        {required && <span className="req" aria-hidden>*</span>}
      </label>
      <input
        id={`bac-${name}`}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={!!error}
        aria-describedby={error ? `bac-${name}-err` : undefined}
        required={required}
      />
      {error && <span id={`bac-${name}-err`} className="gs-form-error">{error}</span>}
    </div>
  );
}

type TextAreaProps = Omit<FieldProps, "type" | "onChange"> & {
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

function TextArea({ label, name, value, onChange, error, placeholder }: TextAreaProps) {
  return (
    <div className={`gs-form-row${error ? " is-error" : ""}`}>
      <label htmlFor={`bac-${name}`}>{label}</label>
      <textarea
        id={`bac-${name}`}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        aria-invalid={!!error}
      />
      {error && <span className="gs-form-error">{error}</span>}
    </div>
  );
}
