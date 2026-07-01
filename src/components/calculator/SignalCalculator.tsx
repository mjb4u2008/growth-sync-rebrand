/**
 * <SignalCalculator> - calm "Signal Estimator" window.
 *
 * Uncontrolled component. Default value is data.defaultStep (350K).
 * The result number is computed live from `data.formula` - never hardcoded.
 *
 * Deliberately stripped of spreadsheet chrome (menu bar, cell references,
 * formula echo, status bar) so the window holds exactly one input (audience
 * slider) and one output (the monthly-signals LCD). CSS lives in
 * src/styles/calculator.css, imported globally from src/styles/global.css.
 */

import { useState, type CSSProperties } from "react";
import { GS_DATA } from "@/lib/data";
import type { SignalCalculatorProps } from "@/lib/types";

const formatN = (n: number) => n.toLocaleString();

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
  const resultFontSize = formattedMonthly.length >= 9 ? "40px" : formattedMonthly.length >= 7 ? "46px" : "52px";

  return (
    <div className="gscalc-app">
      <div className="gscalc-title">
        <span className="gscalc-lights" aria-hidden="true">
          <span className="gscalc-light r" />
          <span className="gscalc-light y" />
          <span className="gscalc-light g" />
        </span>
        <span className="t">Signal Estimator</span>
      </div>

      <div className="gscalc-stage">
        {/* Step 1 — the single input */}
        <div className="gscalc-stepline">
          <span className="n">1</span>
          <span className="t">Your audience</span>
        </div>
        <div className="gscalc-input-row">
          <span className="q">How many followers do you have?</span>
          <span className="val">
            {formatN(followers)}
            <small>followers</small>
          </span>
        </div>

        <div className="gscalc-slider">
          <span className="gscalc-fill" style={{ width: `${pct}%` }} />
          <span className="gscalc-thumb" style={{ left: `${pct}%` }} />
          <input
            type="range"
            min={0}
            max={TICKS.length - 1}
            step={1}
            value={step}
            onChange={(e) => setStep(Number(e.target.value))}
            aria-label="Follower count"
          />
        </div>
        <div className="gscalc-ticks">
          {TICKS.map((t, i) => (
            <span key={t.lbl} className={i === step ? "on" : undefined}>
              {t.lbl}
            </span>
          ))}
        </div>

        <div className="gscalc-rule" />

        {/* Step 2 — the single payoff */}
        <div className="gscalc-stepline">
          <span className="n">2</span>
          <span className="t">Your monthly signals</span>
        </div>
        <div className="gscalc-result">
          <div className="copy">
            <div className="lb">{data.resultBody.lb}</div>
            <div className="ti">{data.resultBody.ti}</div>
            <div className="sub">{data.resultBody.sub}</div>
          </div>
          <div className="gscalc-lcd">
            <span
              className="v"
              style={{ "--result-font-size": resultFontSize } as CSSProperties}
            >
              {formattedMonthly}
            </span>
            <span className="u">signals / month</span>
          </div>
        </div>
      </div>
    </div>
  );
}
