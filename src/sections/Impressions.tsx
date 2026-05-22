/**
 * <Impressions> - "Find & engage with every social impression" section.
 *
 * Three framed cards. Each card is a single chromed window:
 *   chrome titlebar + product visual + explainer copy, all inside the
 *   same outer frame.
 *
 *   Card 1 - Instagram post/comment capture (bucket-hat reel, @ribbed_studio)
 *   Card 2 - Instagram DM (header / message bubbles / brand draft / input)
 *   Card 3 - GrowthSync CRM (teal Aria Quan record + voice match + NBA)
 */

import type { ReactNode } from "react";
import { MonoLabel, ReadMore } from "@/components/atoms";
import { SectionHeader } from "@/components/marketing";

const BUCKET_HAT = "/assets/social-signal-bucket-hat.png";

/* ---------- Outer chrome card --------------------------------------- */

function FrameCard({ title, children, caption }: {
  title: string;
  children: ReactNode;
  caption: ReactNode;
}) {
  return (
    <div className="gs-frame-card">
      <div className="gs-frame-titlebar">
        <span className="lights">
          <span style={{ background: "var(--gs-tl-red)" }} />
          <span style={{ background: "var(--gs-tl-yel)" }} />
          <span style={{ background: "var(--gs-tl-grn)" }} />
        </span>
        <span className="name">{title}</span>
        <span />
      </div>
      <div className="gs-frame-visual">{children}</div>
      <div className="gs-frame-caption">{caption}</div>
    </div>
  );
}

/* ---------- Card 1: Instagram post + comments ---------------------- */

function IgPostVisual() {
  return (
    <div className="gs-ig-post">
      <div className="gs-ig-post__head">
        <span className="gs-ig-avatar">
          <span />
        </span>
        <div style={{ flex: 1 }}>
          <div className="gs-ig-post__handle">ribbed_studio</div>
          <div className="gs-ig-post__loc">Brooklyn, NY</div>
        </div>
        <span style={{ font: "700 18px/1 var(--gs-font-sans)", color: "#222" }}>⋯</span>
      </div>
      <div
        className="gs-ig-post__media"
        style={{
          backgroundImage: `url(${BUCKET_HAT})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <span className="gs-ig-post__media-tag">REEL · 2.1M</span>
      </div>
      <div className="gs-ig-post__actions">
        <span>♡</span><span>◯</span><span>↗</span>
        <span style={{ marginLeft: "auto" }}>▭</span>
      </div>
      <div className="gs-ig-post__caption">
        <strong>ribbed_studio</strong> &nbsp;the heritage cap: twelve pieces, six colors, drop Tuesday ✨
      </div>
      <div className="gs-ig-post__comments">
        {[
          { who: "maya.r",    t: "isn't it too soon for the Tuesday launch?" },
          { who: "blvkmilk",  t: "does the size run small??" },
        ].map((c, i) => (
          <div key={c.who} className="gs-ig-post__comment" style={i === 0 ? { borderTop: 0 } : undefined}>
            <strong>{c.who}</strong>
            <span className="t">{c.t}</span>
            <span className="cap">CAPTURED</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Card 2: Instagram DM ----------------------------------- */

function IgDmVisual() {
  return (
    <div className="gs-ig-dm">
      <div className="gs-ig-dm__head">
        <span className="gs-ig-dm__back">‹</span>
        <div className="gs-ig-dm__who-wrap">
          <span className="gs-ig-dm__avatar" />
          <div>
            <div className="gs-ig-dm__who">maya.r</div>
            <div className="gs-ig-dm__status">Active now</div>
          </div>
        </div>
        <span className="gs-ig-dm__head-icons">
          <span>☏</span><span>ⓘ</span>
        </span>
      </div>

      <div className="gs-ig-dm__body">
        <div className="gs-ig-dm__day">TODAY</div>
        <div className="gs-ig-dm__bubble us">
          <span className="gs-ig-dm__voice">GrowthSync · auto</span>
          Hey, saw you liked the hat we posted. I noticed you already have the pink one too.
        </div>
        <div className="gs-ig-dm__bubble them">Yeah this one is sick. Might be the hardest one you dropped.</div>
        <div className="gs-ig-dm__bubble them">Lowkey wish I got this one instead.</div>
        <div className="gs-ig-dm__bubble us">
          I got you. Here is early access with 20% off.
        </div>
        <div className="gs-ig-dm__bubble us">
          Want me to send the link?
        </div>
        <div className="gs-ig-dm__bubble them">Yo thanks. I'll grab it right now.</div>
        <div className="gs-ig-dm__typing" aria-hidden>
          <span /><span /><span />
        </div>
      </div>

      <div className="gs-ig-dm__input">
        <span className="cam">◉</span>
        <div className="field">
          <span>Message…</span>
          <span className="brand">BRAND VOICE ▾</span>
        </div>
        <span className="mic">▶</span>
        <span className="img">▢</span>
        <span className="heart">♡</span>
      </div>
    </div>
  );
}

/* ---------- Card 3: GrowthSync CRM teal record --------------------- */

function CrmRecordVisual() {
  return (
    <div className="gs-crm">
      <div className="gs-crm__band">
        <span className="gs-crm__band-eyebrow">CRM RECORD · SEGMENT OF ONE</span>
        <span className="gs-crm__band-chip">#00428</span>
      </div>

      <div className="gs-crm__head">
        <div className="gs-crm__avatar">AQ</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="gs-crm__name">Aria Quan</div>
          <div className="gs-crm__sub">@ariaq · sf · joined ’23</div>
        </div>
        <span className="gs-crm__chip-hot">HOT BUYER</span>
      </div>

      <div className="gs-crm__stats">
        <div className="gs-crm__stat">
          <span className="lbl">GMV</span>
          <span className="val">$3,420</span>
        </div>
        <div className="gs-crm__stat">
          <span className="lbl">LTV</span>
          <span className="val">$5,180</span>
        </div>
        <div className="gs-crm__stat">
          <span className="lbl">ORDERS</span>
          <span className="val">14</span>
        </div>
      </div>

      <div className="gs-crm__rows">
        <div className="gs-crm__row">
          <span className="k">INTENT</span>
          <span className="v gs-crm__intent">
            <em>92</em>
            <span className="bar"><span style={{ width: "92%" }} /></span>
          </span>
        </div>
        <div className="gs-crm__row">
          <span className="k">LAST ORDER</span>
          <span className="v">10/19 · Heritage Cap · $128</span>
        </div>
        <div className="gs-crm__row">
          <span className="k">CONVOS</span>
          <span className="v">38 across IG + TikTok</span>
        </div>
        <div className="gs-crm__row">
          <span className="k">SOURCE</span>
          <span className="v">IG comment · Heritage Cap reel</span>
        </div>
        <div className="gs-crm__row">
          <span className="k">STATUS</span>
          <span className="v gs-crm__status">
            <span className="dot" /> Active · auto-engaged 4m ago
          </span>
        </div>
      </div>
    </div>
  );
}

/* ---------- Section ------------------------------------------------ */

const CARDS = [
  {
    title: "growthsync · capture · ribbed_studio.reel",
    visual: <IgPostVisual />,
    step: "STEP 01 / CONNECT",
    title2: "Track interactions across socials",
    body:
      "Plug in IG, TikTok, YouTube, Threads, and your live channels. Comments, DMs, story replies, and creator mentions all flow into one inbox.",
    cta: "Connect your channels →",
  },
  {
    title: "growthsync · engage · @maya.r",
    visual: <IgDmVisual />,
    step: "STEP 02 / ENGAGE",
    title2: "Converse in your voice",
    body:
      "Drafted replies use your voice. They feel clear, specific, and human. Watch a draft fly in seconds.",
    cta: "Watch a draft fly →",
  },
  {
    title: "growthsync · crm · @ariaq · record #00428",
    visual: <CrmRecordVisual />,
    step: "STEP 03 / UNDERSTAND",
    title2: "Deeply enrich your CRM, 24/7",
    body:
      "Every reply syncs topic, intent, voice notes, and product cues back to one buyer profile.",
    cta: "See the intent engine →",
  },
];

export function Impressions() {
  return (
    <section className="gs-section gs-center">
      <SectionHeader
        title={"Find & engage with every social impression\nacross TikTok and Instagram"}
      />

      <div
        className="gs-impressions-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 18,
          marginTop: 36,
          textAlign: "left",
        }}
      >
        {CARDS.map((c) => (
          <FrameCard
            key={c.title}
            title={c.title}
            caption={
              <>
                <MonoLabel color="var(--gs-tangerine-deep)" style={{ display: "block", marginBottom: 6 }}>
                  {c.step}
                </MonoLabel>
                <h3>{c.title2}</h3>
                <p>{c.body}</p>
                <ReadMore>{c.cta}</ReadMore>
              </>
            }
          >
            {c.visual}
          </FrameCard>
        ))}
      </div>
    </section>
  );
}
