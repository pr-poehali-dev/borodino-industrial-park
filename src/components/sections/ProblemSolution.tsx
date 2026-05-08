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
      {showProblem && (
        <div className="section-inner">
          <div style={{ maxWidth: 700 }}>
            <div className="section-label reveal">{P.sectionLabel}</div>
            <h2 className="section-title reveal reveal-delay-1">
              {P.title1}<br />
              <span style={{
                background: "linear-gradient(135deg, rgba(255,100,80,0.9) 0%, rgba(255,59,48,1) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                {P.title2}
              </span>
            </h2>
            <p className="problem-lead reveal reveal-delay-2">{P.lead}</p>
          </div>

          <div className="problem-list-v2 reveal reveal-delay-2">
            {P.items.map((text, i) => (
              <div className="problem-row" key={i}>
                <span className="problem-row-num">0{i + 1}</span>
                <span className="problem-row-text">{text}</span>
                <Icon name="TrendingDown" size={16} className="problem-row-icon" />
              </div>
            ))}
          </div>

          <div className="problem-danger--highlight reveal reveal-delay-3">
            <span className="problem-danger-icon">⚠️</span>
            <div>
              <strong>{P.dangerPrefix}</strong>{" "}
              {P.dangerText}
            </div>
          </div>

          {/* Амбиции рынка */}
          <div className="ambitions-block reveal reveal-delay-3">
            <div className="ambitions-label">{P.ambitionsLabel}</div>
            <div className="ambitions-grid">
              {P.ambitions.map((a, i) => (
                <div className="ambition-card" key={i}>
                  <div className="ambition-num">{a.num}</div>
                  <span className="ambition-emoji">{a.emoji}</span>
                  <div className="ambition-title">{a.title}</div>
                  <div className="ambition-desc">{a.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {showSolution && (
        <div className="section-inner">
          <div style={{ maxWidth: 700 }}>
            <div className="section-label reveal">{S.sectionLabel}</div>
            <h2 className="section-title reveal reveal-delay-1">
              {S.title1}<br />
              <span style={{
                background: "linear-gradient(135deg, var(--c-gold3) 0%, var(--c-gold) 50%, var(--c-gold2) 100%)",
                backgroundSize: "200% 200%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                {S.title2}
              </span>
            </h2>
          </div>

          <div className="solution-contrast reveal reveal-delay-2">
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
              <div
                className={`solution-card reveal${b.highlight ? " solution-card--highlight" : ""}`}
                key={i}
                style={{ transitionDelay: `${0.06 * i}s` }}
              >
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
