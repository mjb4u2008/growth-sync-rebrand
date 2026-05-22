/**
 * <FooterDock> - cream status bar + dark footer.
 *
 *   <CONNECTED · LISTEN › UNDERSTAND › ENGAGE › CONVERT · NETWORK CONNECTED>
 *   <dark>  GrowthSyncLogo + 3 columns + colophon  </dark>
 */

import type { CSSProperties } from "react";
import { Fragment } from "react";
import { GrowthSyncLogo } from "@/components/atoms";
import { GS_DATA } from "@/lib/data";
import type { FooterColumnData, FooterDockProps } from "@/lib/types";

const arr: CSSProperties = { color: "var(--gs-tangerine-deep)" };

const statusbar: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 12,
  flexWrap: "wrap",
  padding: "12px 28px",
  background: "var(--gs-paper)",
  borderTop: "1px solid var(--gs-bone-edge)",
  borderBottom: "1px solid var(--gs-bone-edge)",
  font: "700 10px/1 var(--gs-font-mono)",
  letterSpacing: "0.10em",
  textTransform: "uppercase",
  color: "var(--gs-ink-3)",
};

const colHeading: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  font: "700 11px/1 var(--gs-font-mono)",
  letterSpacing: "0.10em",
  textTransform: "uppercase",
  color: "var(--gs-tangerine-deep)",
  paddingBottom: 10,
  borderBottom: "1px solid rgba(229,221,196,0.18)",
  marginBottom: 12,
};

function Column({ heading, items }: FooterColumnData) {
  return (
    <div>
      <div style={colHeading}>
        <span>{heading}</span>
        <span>›</span>
      </div>
      <ul style={{ padding: 0, margin: 0, display: "grid", gap: 8 }}>
        {items.map((item) => (
          <li
            key={item.href}
            style={{ font: "500 13px/1.2 var(--gs-font-sans)", listStyle: "none" }}
          >
            <a
              href={item.href}
              style={{ color: "#E5DDC4", textDecoration: "none" }}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function FooterDock({ data = GS_DATA.footer }: FooterDockProps) {
  return (
    <>
      <div style={statusbar} className="gs-footer-status">
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
          <span style={{ width: 7, height: 7, borderRadius: 999, background: "var(--gs-success)" }} />
          <span style={{ color: "var(--gs-ink)" }}>{data.statusbar.os}</span>
          <span>{data.statusbar.version}</span>
        </div>
        <div className="gs-footer-flow" style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
          {data.statusbar.flow.map((w, i, all) => (
            <Fragment key={w}>
              <span style={i === all.length - 1 ? arr : undefined}>{w}</span>
              {i < all.length - 1 && <span style={arr}>›</span>}
            </Fragment>
          ))}
        </div>
        <div className="gs-footer-right">{data.statusbar.right}</div>
      </div>

      <footer style={{ background: "#1F1B16", color: "#E5DDC4" }}>
        <div className="gs-page" style={{ padding: "44px 28px 28px" }}>
          <div className="gs-footer-grid" style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1fr", gap: 40 }}>
            <div>
              <GrowthSyncLogo height={42} color="#FBF7EE" />
              <div
                style={{
                  marginTop: 12,
                  font: "italic 400 14px/1.3 var(--gs-font-editorial)",
                  color: "var(--gs-tangerine-hi)",
                }}
              >
                {data.tagline}
              </div>
            </div>
            {data.columns.map((c) => (
              <Column key={c.heading} heading={c.heading} items={c.items} />
            ))}
          </div>
          <div
            className="gs-footer-colophon"
            style={{
              marginTop: 28,
              paddingTop: 16,
              borderTop: "1px solid rgba(229,221,196,0.18)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 16,
              flexWrap: "wrap",
              font: "700 10px/1.5 var(--gs-font-mono)",
              letterSpacing: "0.10em",
              textTransform: "uppercase",
              color: "#968F7E",
            }}
          >
            <span>{data.colophon}</span>
            <span style={{ whiteSpace: "nowrap" }}>
              {data.statusbar.flow.map((w, i, all) => (
                <Fragment key={w}>
                  <span style={i === all.length - 1 ? arr : undefined}>{w}</span>
                  {i < all.length - 1 && <span> · </span>}
                </Fragment>
              ))}
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
