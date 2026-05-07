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
      {/* ── ИНВЕСТИЦИИ ───────────────────────────── */}
      {showInvestment && (
        <section id="investment" className="content-section">
          <div className="section-inner">
            <div className="section-label reveal">{Inv.sectionLabel}</div>
            <h2 className="section-title reveal reveal-delay-1">
              {Inv.title.split("\n").map((line, i, arr) => (
                <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
              ))}
            </h2>
            <div className="invest-layout">
              <div className="invest-main">
                <div className="invest-card featured">
                  <div className="invest-card-label">{Inv.cardLabel}</div>
                  <div className="invest-big-num">{Inv.bigNum}</div>
                  <div className="invest-details">
                    {Inv.details.map((r, i) => (
                      <div className="invest-row" key={i}>
                        <span>{r.label}</span>
                        <span className="invest-val">{r.val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="invest-metrics">
                {Inv.metrics.map((m, i) => (
                  <div className="metric-card" key={i}>
                    <Icon name={m.icon as IconName} size={20} className="metric-icon" />
                    <div className="metric-val">{m.val}</div>
                    <div className="metric-label">{m.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Инфраструктура парка ── */}
            <div className="invest-infra-block">
              <div className="invest-infra-label">{Inv.infraLabel}</div>
              <div className="invest-infra-grid">
                {Inv.infraItems.map((item, i) => (
                  <div className="invest-infra-card" key={i}>
                    <div className="invest-infra-icon">
                      <Icon name={item.icon as IconName} size={18} />
                    </div>
                    <div className="invest-infra-val">{item.val}</div>
                    <div className="invest-infra-desc">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── КОНТАКТЫ ─────────────────────────────── */}
      {showContacts && (
        <section id="contacts" className="content-section contacts-section">
          <div className="section-inner">
            <div className="section-label reveal">{Con.sectionLabel}</div>
            <h2 className="section-title reveal reveal-delay-1">{Con.title}</h2>

            <div className="contacts-grid-new">

              {/* Карточки контактов */}
              <div className="contacts-cards">
                <a href="tel:89107600321" className="contact-card contact-card--phone">
                  <div className="contact-card-icon">
                    <Icon name="Phone" size={22} />
                  </div>
                  <div className="contact-card-body">
                    <div className="contact-card-label">{lang === "ru" ? "Позвонить" : "Call us"}</div>
                    <div className="contact-card-val">8 910 760 03 21</div>
                  </div>
                  <Icon name="ArrowUpRight" size={18} className="contact-card-arrow" />
                </a>

                <div className="contact-card">
                  <div className="contact-card-icon">
                    <Icon name="MapPin" size={22} />
                  </div>
                  <div className="contact-card-body">
                    <div className="contact-card-label">{lang === "ru" ? "Адрес" : "Address"}</div>
                    <div className="contact-card-val">
                      {lang === "ru"
                        ? "Смоленская обл., г. Вязьма,\nтрасса М1, д. Бородино"
                        : "Smolensk Oblast, Vyazma,\nM1 highway, Borodino village"}
                    </div>
                  </div>
                </div>

                <div className="contact-card">
                  <div className="contact-card-icon">
                    <Icon name="Calendar" size={22} />
                  </div>
                  <div className="contact-card-body">
                    <div className="contact-card-label">{lang === "ru" ? "Срок реализации" : "Timeline"}</div>
                    <div className="contact-card-val">{lang === "ru" ? "1–2 года" : "1–2 years"}</div>
                  </div>
                </div>

                <div className="contact-card">
                  <div className="contact-card-icon">
                    <Icon name="Building2" size={22} />
                  </div>
                  <div className="contact-card-body">
                    <div className="contact-card-label">{lang === "ru" ? "Объект" : "Object"}</div>
                    <div className="contact-card-val">
                      {lang === "ru" ? "Индустриальный парк «Бородино»" : "Borodino Industrial Park"}
                    </div>
                  </div>
                </div>

                {/* CTA-блок */}
                <div className="contact-cta-block">
                  <div className="contact-cta-text">
                    {lang === "ru"
                      ? "Готовы обсудить условия участия и ответить на ваши вопросы"
                      : "Ready to discuss participation terms and answer your questions"}
                  </div>
                  <a href="tel:89107600321" className="btn-primary contact-cta-btn">
                    <Icon name="Phone" size={16} />
                    {lang === "ru" ? "Позвонить сейчас" : "Call now"}
                  </a>
                </div>
              </div>

              {/* Яндекс карта */}
              <div className="contacts-map-wrap">
                <iframe
                  title="Бородино на карте"
                  src="https://yandex.ru/map-widget/v1/?ll=34.3&ll=55.2316,34.3093&z=12&pt=34.3093,55.2316,pm2rdl"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  style={{ border: 0, borderRadius: 20, minHeight: 320 }}
                  allowFullScreen
                />
              </div>

            </div>
          </div>

          {/* Footer внутри секции */}
          <div className="contacts-footer">
            <div className="section-inner">
              <div className="contacts-footer-inner">
                <span style={{ fontFamily: "Georgia, serif", fontWeight: 700, letterSpacing: "0.08em", color: "var(--c-blue)", fontSize: 15 }}>БОРОДИНО</span>
                <span className="contacts-footer-note">{Foot.note}</span>
                <span className="contacts-footer-copy">© 2026</span>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}