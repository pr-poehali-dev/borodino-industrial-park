import Icon from "@/components/ui/icon";
import { t, Lang } from "@/lib/i18n";
type IconName = string;

interface AdvantagesSectionProps {
  lang: Lang;
}

export default function AdvantagesSection({ lang }: AdvantagesSectionProps) {
  const T = t[lang].advantages;

  return (
    <section id="advantages" className="content-section">
      <div className="section-inner">
        <div className="section-label reveal">{T.sectionLabel}</div>
        <h2 className="section-title reveal reveal-delay-1">
          {T.title.split("\n").map((line, i, arr) => (
            <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
          ))}
        </h2>
        <div className="adv-grid">
          {T.items.map((a, i) => (
            <div className="adv-card" key={i}>
              <div className="adv-number">0{i + 1}</div>
              <div className="adv-icon-wrap"><Icon name={a.icon as IconName} size={26} /></div>
              <div className="adv-title">{a.title}</div>
              <div className="adv-desc">{a.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
