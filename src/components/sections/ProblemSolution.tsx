import Icon from "@/components/ui/icon";
import { t, Lang } from "@/lib/i18n";
type IconName = string;

interface ProblemSolutionProps {
  scrollTo: (id: string) => void;
  lang: Lang;
  slideOnly?: "problem" | "solution";
}

export default function ProblemSolution({ scrollTo, lang, slideOnly }: ProblemSolutionProps) {
  const T = t[lang];
  const P = T.problem;
  const S = T.solution;

  const showProblem = !slideOnly || slideOnly === "problem";
  const showSolution = !slideOnly || slideOnly === "solution";

  return (
    <>
      {/* ── ПРОБЛЕМА ─────────────────────────── */}
      {showProblem && (
        <div className="section-inner">
          <div className="section-label reveal">{P.sectionLabel}</div>
          <h2 className="section-title reveal reveal-delay-1">
            {P.title1}<br />
            <span style={{ color: "var(--c-blue-light)" }}>{P.title2}</span>
          </h2>

          <p className="problem-lead">{P.lead}</p>
          <div className="problem-list-v2">
            {P.items.map((text, i) => (
              <div className="problem-row" key={i}>
                <span className="problem-row-num">0{i + 1}</span>
                <span className="problem-row-text">{text}</span>
                <Icon name="TrendingDown" size={18} className="problem-row-icon" />
              </div>
            ))}
          </div>
          <div className="problem-danger-headline">
            <span className="problem-danger-prefix">{P.dangerPrefix}</span>
            <br />
            {P.dangerText}
          </div>

          <div className="ambitions-block">
            <div className="ambitions-label">{P.ambitionsLabel}</div>
            <div className="ambitions-grid">
              {P.ambitions.map((a, i) => (
                <div className="ambition-card" key={i}>
                  <div className="ambition-num">{a.num}</div>
                  <div className="ambition-emoji">{a.emoji}</div>
                  <div className="ambition-title">{a.title}</div>
                  <div className="ambition-desc">{a.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── РЕШЕНИЕ ──────────────────────────── */}
      {showSolution && (
        <div className="section-inner">
          <div className="section-label reveal">{S.sectionLabel}</div>
          <h2 className="section-title reveal reveal-delay-1">
            {S.title1}<br /><span style={{ color: "var(--c-blue-light)" }}>{S.title2}</span>
          </h2>

          <div className="solution-contrast">
            <div className="solution-side negative">
              <div className="solution-side-label">{S.negativeLabel}</div>
              <div className="solution-side-text">
                {S.negativeText.split("\n").map((line, i) => <span key={i}>{line}{i < 2 && <br />}</span>)}
              </div>
            </div>
            <div className="solution-arrow">
              <Icon name="ArrowRight" size={28} />
            </div>
            <div className="solution-side positive">
              <div className="solution-side-label">{S.positiveLabel}</div>
              <div className="solution-side-text">
                {S.positiveText.split("\n").map((line, i) => <span key={i}>{line}{i < 2 && <br />}</span>)}
              </div>
            </div>
          </div>

          <div className="solution-benefits">
            {S.benefits.map((b, i) => (
              <div className={`solution-card${b.highlight ? " solution-card--highlight" : ""}`} key={i}>
                {b.highlight && <div className="solution-card-badge">{b.badge}</div>}
                <div className="solution-card-icon">
                  <Icon name={b.icon as IconName} size={24} />
                </div>
                <div className="solution-card-title">{b.title}</div>
                {b.desc && <div className="solution-card-desc">{b.desc}</div>}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
