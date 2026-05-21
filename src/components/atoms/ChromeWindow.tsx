/**
 * <ChromeWindow> — the metallic Y2K window shell.
 * Every product panel in the system wraps with this. Pass `tabs` for tabbed
 * windows. Window styles live in src/styles/global.css (.gs-window).
 */

import type { ChromeWindowProps } from "@/lib/types";

export function ChromeWindow({
  title,
  tabs,
  children,
  style,
  contentStyle,
}: ChromeWindowProps) {
  return (
    <div className="gs-window" style={style}>
      <div className="gs-window-title">
        <div className="lights">
          <span className="light light-r" />
          <span className="light light-y" />
          <span className="light light-g" />
        </div>
        <div className="name">{title}</div>
        <div />
      </div>
      {tabs && tabs.length > 0 && (
        <div className="gs-window-tabs">
          {tabs.map((t) => (
            <div key={t.label} className={`gs-window-tab${t.active ? " active" : ""}`}>
              {t.label}
            </div>
          ))}
        </div>
      )}
      <div style={contentStyle}>{children}</div>
    </div>
  );
}
