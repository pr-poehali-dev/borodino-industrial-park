import Icon from "@/components/ui/icon";
import { t, Lang } from "@/lib/i18n";
type IconName = string;

interface ProjectSectionProps {
  lang: Lang;
}

export default function ProjectSection({ lang }: ProjectSectionProps) {
  const T = t[lang].project;

  return (
    <section id="project" className="content-section">
      <div className="section-inner">
        <div className="section-label reveal">{T.sectionLabel}</div>
        <h2 className="section-title reveal reveal-delay-1">
          {T.title.split("\n").map((line, i, arr) => (
            <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
          ))}
        </h2>

        <div className="project-sketch">
          <div className="project-sketch-label">
            <Icon name="FileText" size={14} />
            {T.sketchLabel}
          </div>
          <img
            src="https://cdn.poehali.dev/projects/49f7a74d-a29e-4df6-a9ab-7c61c90787d1/bucket/b7c42da6-a5e5-4719-9db2-2383a1006362.png"
            alt={T.sketchCaption}
            className="project-sketch-img"
          />
          <div className="project-sketch-caption">{T.sketchCaption}</div>
        </div>

        <div className="building-gallery">
          <div className="building-gallery-label">
            <Icon name="Building2" size={14} />
            {T.buildingLabel}
          </div>
          <div className="building-gallery-grid">
            <div className="building-gallery-item">
              <img
                src="https://cdn.poehali.dev/projects/49f7a74d-a29e-4df6-a9ab-7c61c90787d1/bucket/30d64c4e-4fb7-414d-b9e0-18633d87b8bb.png"
                alt={T.building1Caption}
                className="building-gallery-img"
              />
              <div className="building-gallery-caption">{T.building1Caption}</div>
            </div>
            <div className="building-gallery-item">
              <img
                src="https://cdn.poehali.dev/projects/49f7a74d-a29e-4df6-a9ab-7c61c90787d1/bucket/82506be1-dbc3-4b4c-9ebe-1789497c82fb.png"
                alt={T.building2Caption}
                className="building-gallery-img"
              />
              <div className="building-gallery-caption">{T.building2Caption}</div>
            </div>
          </div>
        </div>

        <div className="project-geo">
          <div className="project-geo-map">
            <div className="map-pulse" />
            <Icon name="MapPin" size={36} className="map-icon" />
            <div className="map-label">{T.mapLabel}</div>
            <div className="map-sublabel">{T.mapSublabel}</div>
          </div>
          <div className="project-geo-info">
            {T.geoItems.map((item, i) => (
              <div className="geo-item" key={i}>
                <div className="geo-icon-wrap"><Icon name={item.icon as IconName} size={18} /></div>
                <div>
                  <div className="geo-item-title">{item.title}</div>
                  <div className="geo-item-text">{item.text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flagship-card" style={{ marginTop: "3rem" }}>
          <div className="flagship-badge">{T.flagshipBadge}</div>
          <div className="flagship-content">
            <div className="flagship-emoji">🥤</div>
            <div>
              <div className="flagship-title">{T.flagshipTitle}</div>
              <div className="flagship-desc" dangerouslySetInnerHTML={{ __html: T.flagshipDesc }} />
              <div className="flagship-tags">
                {T.flagshipTags.map((tag, i) => <span className="tag" key={i}>{tag}</span>)}
              </div>
            </div>
          </div>
        </div>

        <div className="turnkey-block">
          <div className="turnkey-label">{T.turnkeyLabel}</div>
          <h3 className="turnkey-title">{T.turnkeyTitle}</h3>
          <p className="turnkey-text">{T.turnkeyText}</p>
          <div className="turnkey-steps">
            {T.turnkeySteps.map((s, i) => (
              <div className="turnkey-step" key={i}>
                <div className="turnkey-step-num">{s.step}</div>
                <div className="turnkey-step-icon">
                  <Icon name={s.icon as IconName} size={20} />
                </div>
                <div className="turnkey-step-title">{s.title}</div>
                <div className="turnkey-step-desc">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="contracts-block">
          <div className="contracts-label">{T.contractsLabel}</div>
          <h3 className="contracts-title">{T.contractsTitle}</h3>
          <div className="contracts-grid">
            <div className="contracts-col">
              <div className="contracts-col-title">
                <Icon name="FileCheck" size={18} />
                {T.contractsCol1Title}
              </div>
              <div className="contracts-col-text">{T.contractsCol1Text}</div>
              <div className="contracts-badge">{T.contractsBadge}</div>
            </div>
            <div className="contracts-divider" />
            <div className="contracts-col">
              <div className="contracts-col-title">
                <Icon name="Package" size={18} />
                {T.contractsCol2Title}
              </div>
              <div className="contracts-partners">
                {T.contractsPartners.map((p, i) => (
                  <div className="contracts-partner" key={i}>
                    <div className="contracts-partner-name">{p.name}</div>
                    <div className="contracts-partner-desc">{p.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}