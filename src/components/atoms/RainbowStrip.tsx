/**
 * <RainbowStrip> - five-bar mini color strip used above each
 * module label in the "How It Works" rows. Tangerine, butter, mint,
 * sky, lilac - referencing the rest of the system palette.
 */

const BARS = [
  "var(--gs-tangerine)",
  "var(--gs-butter)",
  "var(--gs-mint)",
  "var(--gs-sky)",
  "var(--gs-lilac)",
];

export function RainbowStrip() {
  return (
    <span className="gs-rainbow-strip" aria-hidden>
      {BARS.map((c) => (
        <span key={c} style={{ background: c }} />
      ))}
    </span>
  );
}
