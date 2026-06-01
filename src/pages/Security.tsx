import { SimplePage } from "./SimplePage";

export function Security() {
  return (
    <SimplePage
      fileName="security.txt"
      eyebrow="LEGAL · SECURITY POLICY"
      title="Security."
      lede="If you find a security vulnerability in GrowthSync, please report it to us directly. We will investigate all legitimate reports and work to resolve issues quickly."
    >
      <h2>Scope</h2>
      <p>
        <strong>In scope:</strong> <code>app.growthsync.com</code>, our API, authentication flows, data handling.
      </p>
      <p>
        <strong>Out of scope:</strong> Third-party integrations (Instagram, TikTok, Stripe), our marketing site, denial of service, social engineering.
      </p>

      <h2>Ground Rules</h2>
      <ul style={{ listStyleType: "disc", paddingLeft: "1.5em" }}>
        <li>Do not access or modify other users&apos; data</li>
        <li>Do not run automated scanners against production</li>
        <li>Give us 90 days to fix before public disclosure</li>
        <li>Test against your own account only</li>
      </ul>

      <h2>How to Report</h2>
      <p>
        Email <a href="mailto:engineering@growthsync.com">engineering@growthsync.com</a> with a
        description of the vulnerability, steps to reproduce, and any supporting screenshots or
        proof-of-concept code.
      </p>
      <p>We will acknowledge your report within 3 business days.</p>

      <h2>Severity Levels</h2>
      <table style={{ width: "100%", borderCollapse: "collapse", margin: "0 0 16px" }}>
        <thead>
          <tr>
            <th style={{ textAlign: "left", padding: "6px 12px 6px 0", borderBottom: "1px solid var(--gs-rule)" }}>Severity</th>
            <th style={{ textAlign: "left", padding: "6px 12px 6px 0", borderBottom: "1px solid var(--gs-rule)" }}>Example</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ padding: "8px 12px 8px 0", borderBottom: "1px solid var(--gs-rule)" }}>Critical</td>
            <td style={{ padding: "8px 12px 8px 0", borderBottom: "1px solid var(--gs-rule)" }}>Auth bypass, mass data exposure</td>
          </tr>
          <tr>
            <td style={{ padding: "8px 12px 8px 0", borderBottom: "1px solid var(--gs-rule)" }}>High</td>
            <td style={{ padding: "8px 12px 8px 0", borderBottom: "1px solid var(--gs-rule)" }}>Privilege escalation, data leak</td>
          </tr>
          <tr>
            <td style={{ padding: "8px 12px 8px 0" }}>Medium / Low</td>
            <td style={{ padding: "8px 12px 8px 0" }}>Logic flaws, best practice gaps</td>
          </tr>
        </tbody>
      </table>

      <p>
        <em>Last updated: June 2026</em>
      </p>
    </SimplePage>
  );
}
