import { SimplePage } from "./SimplePage";

export function NotFound({ pathname }: { pathname: string }) {
  return (
    <SimplePage
      fileName="404.notfound"
      eyebrow="404 · ROUTE NOT FOUND"
      title="That signal didn't resolve."
      lede="The URL you followed doesn't match any page on this site."
    >
      <p>
        You asked for <code style={{ font: "var(--gs-mono-md)", color: "var(--gs-ink-2)" }}>{pathname}</code>{" "}
        but it isn&apos;t in our route registry. The most common causes:
      </p>
      <ul>
        <li>A typo in the URL.</li>
        <li>A link to a section that has moved or been retired.</li>
        <li>A pre-launch page that hasn&apos;t shipped yet.</li>
      </ul>
      <p>
        Head back to the <a href="/">homepage</a>, browse the{" "}
        <a href="/blog">blog</a>, or book a call below — we&apos;ll route you to the
        right place.
      </p>
    </SimplePage>
  );
}
