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
      {/* ── ИНВЕСТИЦИИ ───────────────────────── */}
      {showInvestment && (
        <section id="investment" className="content-section gold-section">
          <div className="section-inner">
            <div className="section-label light reveal">{Inv.sectionLabel}</div>
            <h2 className="section-title light reveal reveal-delay-1">
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
          </div>
        </section>
      )}

      {/* ── КОНТАКТЫ ─────────────────────────── */}
      {showContacts && (
        <>
          <section id="contacts" className="content-section dark-section">
            <div className="section-inner">
              <div className="section-label light">{Con.sectionLabel}</div>
              <h2 className="section-title light">{Con.title}</h2>
              <div className="contact-layout">
                <div className="contact-info">
                  {Con.items.map((c, i) => (
                    <div className="contact-row" key={i}>
                      <div className="contact-icon"><Icon name={c.icon as IconName} size={18} /></div>
                      <div>
                        <div className="contact-label">{c.label}</div>
                        <div className="contact-val">{c.val}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <footer className="footer">
            <div className="footer-inner">
              <div className="footer-logo">
                <span className="logo-mark small">ИП</span>
                <span>{Foot.name}</span>
              </div>
              <div className="footer-note">{Foot.note}</div>
            </div>
          </footer>
        </>
      )}
    </>
  );
}
