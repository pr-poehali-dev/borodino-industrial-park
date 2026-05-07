import Icon from "@/components/ui/icon";
type IconName = string;

export default function InvestmentContacts() {
  return (
    <>
      {/* ── 5. ИНВЕСТИЦИИ ───────────────────────── */}
      <section id="investment" className="content-section gold-section">
        <div className="section-inner">
          <div className="section-label light reveal">Инвестиции</div>
          <h2 className="section-title light reveal reveal-delay-1">Финансирование<br />проекта.</h2>
          <div className="invest-layout">
            <div className="invest-main">
              <div className="invest-card featured">
                <div className="invest-card-label">Общий объём инвестиций</div>
                <div className="invest-big-num">₽1,5 млрд</div>
                <div className="invest-details">
                  {[
                    { label: "Период реализации", val: "1–2 года" },
                    { label: "Площадь застройки", val: "21 000 м²" },
                    { label: "Площадь территории", val: "7 Га" },
                  ].map((r, i) => (
                    <div className="invest-row" key={i}>
                      <span>{r.label}</span>
                      <span className="invest-val">{r.val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="invest-metrics">
              {[
                { label: "Рабочих мест", val: "250+", icon: "Users" },
                { label: "Мощность линии", val: "60 тыс/ч", icon: "Zap" },
                { label: "Срок реализации", val: "1–2 года", icon: "Clock" },
                { label: "Площадь парка", val: "7 Га", icon: "Map" },
              ].map((m, i) => (
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

      {/* ── 7. КОНТАКТЫ ─────────────────────────── */}
      <section id="contacts" className="content-section dark-section">
        <div className="section-inner">
          <div className="section-label light">Контакты</div>
          <h2 className="section-title light">Начнём диалог</h2>
          <div className="contact-layout">
            <div className="contact-info">
              {[
                { icon: "Building2", label: "Объект", val: "Индустриальный парк «Бородино»" },
                { icon: "MapPin", label: "Адрес", val: "Смоленская обл., г. Вязьма, д. Бородино, трасса М1" },
                { icon: "Phone", label: "Телефон", val: "8 910 760 03 21" },
                { icon: "Calendar", label: "Период реализации", val: "1–2 года" },
              ].map((c, i) => (
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

      {/* ── FOOTER ──────────────────────────────── */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-logo">
            <span className="logo-mark small">ИП</span>
            <span>Индустриальный парк «Бородино» · 2026–2027</span>
          </div>
          <div className="footer-note">Инвестиционная презентация носит информационный характер</div>
        </div>
      </footer>
    </>
  );
}