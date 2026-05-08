import Icon from "@/components/ui/icon";
import { t, Lang } from "@/lib/i18n";
type IconName = string;

interface AdvantagesSectionProps {
  lang: Lang;
}

export default function AdvantagesSection({ lang }: AdvantagesSectionProps) {
  const T = t[lang].advantages;

  return (
    <section id="advantages" className="content-section" style={{ background: "var(--c-bg)" }}>
      <div className="section-inner">
        <div style={{ maxWidth: 640, marginBottom: "1rem" }}>
          <div className="section-label reveal">{T.sectionLabel}</div>
          <h2 className="section-title reveal reveal-delay-1">
            {T.title.split("\n").map((line, i, arr) => (
              <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
            ))}
          </h2>
        </div>

        <div className="adv-grid">
          {T.items.map((a, i) => (
            <div
              className="adv-card reveal"
              key={i}
              style={{ transitionDelay: `${0.05 * i}s` }}
            >
              {/* Shimmer top border on hover — handled via CSS ::after */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.75rem" }}>
                <div className="adv-number">0{i + 1}</div>
                <div style={{
                  width: 8, height: 8, borderRadius: "50%",
                  background: "rgba(201,168,76,0.35)",
                  boxShadow: "0 0 8px rgba(201,168,76,0.3)"
                }} />
              </div>
              <div className="adv-icon-wrap">
                <Icon name={a.icon as IconName} size={24} />
              </div>
              <div className="adv-title">{a.title}</div>
              {"desc" in a && a.desc && (
                <div className="adv-desc">{a.desc as string}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
