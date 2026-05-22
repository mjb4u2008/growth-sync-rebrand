/**
 * <SignalCalculator> - retro spreadsheet/calculator window.
 *
 * Uncontrolled component. Default value is data.defaultStep (5th tick = 350K).
 * The result number is computed live from `data.formula` - never hardcoded.
 *
 * CSS for the spreadsheet chrome lives in src/styles/calculator.css and is
 * imported globally from src/styles/global.css.
 */

import { useState, type CSSProperties } from "react";
import { GS_DATA } from "@/lib/data";
import type { SignalCalculatorProps } from "@/lib/types";

const formatN = (n: number) => n.toLocaleString();
const formatRate = (n: number) => `${(n * 100).toFixed(1)}%`;

function getSignalRate(followers: number, minFollowers: number, maxFollowers: number, maxRate: number, minRate: number) {
  if (maxFollowers <= minFollowers) return maxRate;
  const minLog = Math.log10(minFollowers);
  const maxLog = Math.log10(maxFollowers);
  const followerLog = Math.log10(Math.max(minFollowers, Math.min(maxFollowers, followers)));
  const progress = (followerLog - minLog) / (maxLog - minLog);
  return maxRate - (maxRate - minRate) * progress;
}

export function SignalCalculator({
  data = GS_DATA.calculator,
  initialStep,
}: SignalCalculatorProps) {
  const TICKS = data.ticks;
  const startStep = initialStep ?? data.defaultStep;
  const [step, setStep] = useState<number>(startStep);

  const followers = TICKS[step].v;
  const signalRate = getSignalRate(
    followers,
    TICKS[0].v,
    TICKS[TICKS.length - 1].v,
    data.formula.maxRate,
    data.formula.minRate
  );
  const monthly = Math.round(followers * signalRate);
  const pct = (step / (TICKS.length - 1)) * 100;
  const formattedMonthly = formatN(monthly);
  const resultFontSize = formattedMonthly.length >= 9 ? "50px" : formattedMonthly.length >= 7 ? "58px" : "64px";

  return (
    <div className="gscalc-app">
      <div className="gscalc-title">
        <span className="ic" />
        <span className="t">{data.title}</span>
        <span className="win-btns">
          <span className="gscalc-win-btn">_</span>
          <span className="gscalc-win-btn">▢</span>
          <span className="gscalc-win-btn x">×</span>
        </span>
      </div>

      <div className="gscalc-menu">
        <span>File</span><span>Edit</span><span className="calc-pill">Calc</span>
        <span>View</span><span>Help</span>
        <span className="right">
          <span className="gscalc-auto">
            <span className="dot" />AUTO-CALC : ON
          </span>
        </span>
      </div>

      <div className="gscalc-row">
        <div className="gscalc-cell">A2</div>
        <div className="gscalc-step">
          <span className="gscalc-hatch" />
          <span>STEP 1 · INPUT YOUR AUDIENCE</span>
          <span className="gscalc-hatch" />
          <span className="instr">Instruction: <em>{data.instruction}</em></span>
        </div>
      </div>

      <div className="gscalc-row">
        <div className="gscalc-cell num">3</div>
        <div>
          <div className="gscalc-q">
            <div>
              <div className="lb">FOLLOWERS</div>
              <div className="qq">How many followers do you have?</div>
            </div>
            <div className="qval">
              <span className="v">{formatN(followers)}</span>
              <span className="u">followers</span>
            </div>
          </div>

          <div className="gscalc-slider">
            <div
              className="gscalc-chev"
              onClick={() => setStep((s) => Math.max(0, s - 1))}
            >
              ‹
            </div>
            <div className="gscalc-track">
              <div className="gscalc-fill" style={{ width: `${pct}%` }} />
              <div className="gscalc-thumb" style={{ left: `${pct}%` }} />
              <input
                type="range"
                min={0}
                max={TICKS.length - 1}
                step={1}
                value={step}
                onChange={(e) => setStep(Number(e.target.value))}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  opacity: 0,
                  cursor: "pointer",
                }}
              />
            </div>
            <div
              className="gscalc-chev"
              onClick={() => setStep((s) => Math.min(TICKS.length - 1, s + 1))}
            >
              ›
            </div>
          </div>
          <div className="gscalc-ticks">
            <div className="gscalc-tick-rail">
              {TICKS.map((t, i) => (
                <span
                  key={t.lbl}
                  className={`gscalc-tick${i === step ? " on" : ""}`}
                  style={{ "--tick-pct": `${(i / (TICKS.length - 1)) * 100}%` } as CSSProperties}
                >
                  {t.lbl}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="gscalc-calc">
        <div className="gscalc-fic">ƒ</div>
        <span className="lab">CALCULATING <span className="dots">●●●</span></span>
        <span className="gscalc-formula">
          = B3 <em>×</em> {formatRate(signalRate)} <em>=</em>{" "}
          <span className="sig">signals</span>
        </span>
        <span className="right">
          <span className="gscalc-prog" />
          <span
            style={{
              color: "var(--gs-ink-3)",
              font: "700 11px var(--gs-font-mono)",
              letterSpacing: "0.06em",
            }}
          >
            100%
          </span>
          <span className="gscalc-done">
            <span className="dot" />DONE
          </span>
        </span>
      </div>

      <div className="gscalc-row">
        <div className="gscalc-cell">B9</div>
        <div className="gscalc-step">
          <span className="gscalc-hatch" />
          <span>STEP 2 · YOUR MONTHLY SIGNALS</span>
          <span className="gscalc-hatch" />
          <span className="computed">
            COMPUTED: <em>=B3 × {formatRate(signalRate)}</em>
          </span>
        </div>
      </div>

      <div className="gscalc-result">
        <div className="gscalc-cell num">9</div>
        <div className="body">
          <div className="lb">{data.resultBody.lb}</div>
          <div className="ti">{data.resultBody.ti}</div>
          <div className="sub">{data.resultBody.sub}</div>
        </div>
        <div className="gscalc-panel">
          <span className="v" style={{ "--result-font-size": resultFontSize } as CSSProperties}>
            {formattedMonthly}
          </span>
          <span className="u">
            <span className="one">/month</span>
            <span className="two">signals</span>
          </span>
        </div>
      </div>

      <div className="gscalc-bottom">
        <span className="gscalc-tab on">Calculator</span>
        <span className="gscalc-tab">Assumptions</span>
        <span className="gscalc-tab">+</span>
        <span className="auto-right">⌧ AUTOSAVED · {data.autosavedAt}</span>
      </div>

      <div className="gscalc-status">
        <span className="ready"><span className="dot" />Ready</span>
        <span className="sum">Σ = {formattedMonthly} SIGNALS / MO · {formatRate(signalRate)} RATE</span>
        <span className="right"><span>AUTO-CALC</span><span>NUM</span></span>
      </div>
    </div>
  );
}
