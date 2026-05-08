import Icon from "@/components/ui/icon";
import { t, Lang } from "@/lib/i18n";
type IconName = string;

interface InvestmentContactsProps {
  lang: Lang;
  slideOnly?: "investment" | "contacts";
}

export default function InvestmentContacts({ lang, slideOnly }: InvestmentContactsProps) {
  const T = t[lang];
  const Inv = T.investment;
  const Con = T.contacts;
  const Foot = T.footer;

  const showInvestment = !slideOnly || slideOnly === "investment";
  const showContacts = !slideOnly || slideOnly === "contacts";

  return (
    <>
      {showInvestment && (
        <section id="investment" className="content-section">
          <div className="section-inner">
            <div style={{ maxWidth: 640, marginBottom: "3.5rem" }}>
              <div className="section-label reveal">{Inv.sectionLabel}</div>
              <h2 className="section-title reveal reveal-delay-1">
                {Inv.title.split("\n").map((line, i, arr) => (
                  <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
                ))}
              </h2>
            </div>

            {/* Big investment card */}
            <div className="investment-big-card reveal reveal-delay-1">
              <div className="investment-label">{Inv.cardLabel}</div>
              <div className="investment-big-num">{Inv.bigNum}</div>
              <div className="investment-details">
                {Inv.details.map((r, i) => (
                  <div key={i} style={{ marginRight: "3rem" }}>
                    <div className="investment-detail-label">{r.label}</div>
                    <div className="investment-detail-val">{r.val}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Metrics */}
            <div className="investment-metrics reveal reveal-delay-2">
              {Inv.metrics.map((m, i) => (
                <div className="investment-metric" key={i}>
                  <div className="investment-metric-icon">
                    <Icon name={m.icon as IconName} size={22} />
                  </div>
                  <div className="investment-metric-val">{m.val}</div>
                  <div className="investment-metric-label">{m.label}</div>
                </div>
              ))}
            </div>

            {/* Infra */}
            <div style={{ marginTop: "2rem" }}>
              <div style={{
                fontSize: 11, fontWeight: 700, letterSpacing: "0.16em",
                textTransform: "uppercase", color: "var(--c-gold)",
                opacity: 0.8, marginBottom: "1.25rem"
              }}>{Inv.infraLabel}</div>
              <div className="infra-grid reveal reveal-delay-2">
                {Inv.infraItems.map((item, i) => (
                  <div className="infra-card" key={i}>
                    <div className="infra-icon">
                      <Icon name={item.icon as IconName} size={22} />
                    </div>
                    <div className="infra-value">{item.val}</div>
                    <div className="infra-title">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {showContacts && (
        <section id="contacts" className="content-section" style={{ background: "var(--c-bg2)" }}>
          <div className="section-inner">
            <div style={{ maxWidth: 640, marginBottom: "3.5rem" }}>
              <div className="section-label reveal">{Con.sectionLabel}</div>
              <h2 className="section-title reveal reveal-delay-1">{Con.title}</h2>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>

              {/* Левая колонка — контакты */}
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>

                <a href="tel:89107600321" style={{
                  display: "flex", alignItems: "center", gap: "1rem",
                  padding: "1.5rem", borderRadius: 24,
                  background: "linear-gradient(135deg, rgba(201,168,76,0.12) 0%, var(--c-bg3) 100%)",
                  border: "1px solid rgba(201,168,76,0.22)", textDecoration: "none",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  cursor: "pointer",
                }} className="reveal">
                  <div style={{
                    width: 52, height: 52, borderRadius: 16,
                    background: "rgba(201,168,76,0.12)", border: "1px solid rgba(201,168,76,0.2)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "var(--c-gold)", flexShrink: 0
                  }}>
                    <Icon name="Phone" size={22} />
                  </div>
                  <div>
                    <div style={{ fontSize: 11, color: "var(--c-text3)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>
                      {lang === "ru" ? "Позвонить" : "Call us"}
                    </div>
                    <div style={{ fontSize: 18, fontWeight: 700, color: "var(--c-text)", letterSpacing: "-0.01em" }}>
                      8 910 760 03 21
                    </div>
                  </div>
                </a>

                {[
                  {
                    icon: "MapPin",
                    label: lang === "ru" ? "Адрес" : "Address",
                    val: lang === "ru" ? "Смоленская обл., г. Вязьма,\nтрасса М1, д. Бородино" : "Smolensk Oblast, Vyazma,\nM1 highway, Borodino"
                  },
                  {
                    icon: "Calendar",
                    label: lang === "ru" ? "Срок реализации" : "Timeline",
                    val: lang === "ru" ? "1–2 года · I этап — 2026" : "1–2 years · Phase I — 2026"
                  },
                  {
                    icon: "Building2",
                    label: lang === "ru" ? "Объект" : "Object",
                    val: lang === "ru" ? "Индустриальный парк «Бородино»" : "Borodino Industrial Park"
                  },
                ].map((c, i) => (
                  <div key={i} style={{
                    display: "flex", alignItems: "flex-start", gap: "1rem",
                    padding: "1.25rem 1.5rem", borderRadius: 20,
                    background: "var(--c-bg3)",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }} className="reveal">
                    <div style={{
                      width: 44, height: 44, borderRadius: 14,
                      background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.12)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "var(--c-gold)", flexShrink: 0
                    }}>
                      <Icon name={c.icon as IconName} size={20} />
                    </div>
                    <div>
                      <div style={{ fontSize: 11, color: "var(--c-text3)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>
                        {c.label}
                      </div>
                      <div style={{ fontSize: 15, fontWeight: 600, color: "var(--c-text)", whiteSpace: "pre-line", lineHeight: 1.5 }}>
                        {c.val}
                      </div>
                    </div>
                  </div>
                ))}

                <div style={{
                  padding: "2rem", borderRadius: 24,
                  background: "var(--c-bg3)", border: "1px solid rgba(255,255,255,0.07)",
                  textAlign: "center"
                }} className="reveal reveal-delay-2">
                  <div style={{ color: "var(--c-text2)", fontSize: 14, lineHeight: 1.7, marginBottom: "1.5rem" }}>
                    {lang === "ru"
                      ? "Готовы обсудить условия участия и ответить на ваши вопросы"
                      : "Ready to discuss participation terms and answer your questions"}
                  </div>
                  <a href="tel:89107600321" className="btn-primary" style={{ textDecoration: "none", display: "inline-flex" }}>
                    <Icon name="Phone" size={16} />
                    {lang === "ru" ? "Позвонить сейчас" : "Call now"}
                  </a>
                </div>
              </div>

              {/* Правая колонка — карта */}
              <div className="map-embed reveal reveal-delay-1" style={{ minHeight: 480 }}>
                <iframe
                  title="Бородино на карте"
                  src="https://yandex.ru/map-widget/v1/?ll=34.3&ll=55.2316,34.3093&z=12&pt=34.3093,55.2316,pm2rdl"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  style={{ border: 0, borderRadius: 20, minHeight: 480, display: "block" }}
                  allowFullScreen
                />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div style={{
            borderTop: "1px solid rgba(255,255,255,0.06)",
            marginTop: "6rem",
            padding: "2rem",
          }}>
            <div className="section-inner">
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
                <span style={{
                  fontFamily: "Georgia, serif", fontWeight: 700,
                  letterSpacing: "0.1em", color: "var(--c-gold)", fontSize: 16
                }}>БОРОДИНО</span>
                <span style={{ color: "var(--c-text3)", fontSize: 13 }}>{Foot.note}</span>
                <span style={{ color: "var(--c-text3)", fontSize: 13 }}>© 2026</span>
              </div>
            </div>
          </div>

          {/* Contacts media query */}
          <style>{`
            @media (max-width: 768px) {
              #contacts .section-inner > div[style*="grid-template-columns: 1fr 1fr"] {
                grid-template-columns: 1fr !important;
              }
            }
          `}</style>
        </section>
      )}
    </>
  );
}
