import Icon from "@/components/ui/icon";
type IconName = string;

export default function InvestmentContacts() {
  return (
    <>
      {/* ── 5. ИНВЕСТИЦИИ ───────────────────────── */}
      <section id="investment" className="content-section gold-section">
        <div className="section-inner">
          <div className="section-label light">Инвестиции</div>
          <h2 className="section-title light">Финансирование проекта</h2>
          <div className="invest-layout">
            <div className="invest-main">
              <div className="invest-card featured">
                <div className="invest-card-label">Общий объём инвестиций</div>
                <div className="invest-big-num">₽3 млрд</div>
                <div className="invest-details">
                  {[
                    { label: "Период реализации", val: "2026–2031" },
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
                { label: "Срок реализации", val: "5 лет", icon: "Clock" },
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

      {/* ── 6. ПРЕИМУЩЕСТВА ─────────────────────── */}
      <section id="advantages" className="content-section dark-section">
        <div className="section-inner">
          <div className="section-label light">Преимущества</div>
          <h2 className="section-title light">Конкурентные преимущества проекта</h2>
          <div className="adv-grid">
            {[
              { icon: "Zap", title: "Собственное производство", desc: "Прозрачное и стабильное ценообразование за счёт полного контроля над производством" },
              { icon: "BarChart2", title: "Управление объёмами", desc: "Гибкое управление выпуском без зависимости от контрактных площадок" },
              { icon: "TrendingDown", title: "Оптимизация себестоимости", desc: "Снижение затрат за счёт вертикальной интеграции и собственной логистики" },
              { icon: "Truck", title: "Единый центр отгрузки", desc: "Поставки в федеральные сети из одной точки — быстро и без хаоса" },
              { icon: "DollarSign", title: "Контрактное производство", desc: "Дополнительный доход от свободных мощностей и ответственного хранения" },
              { icon: "MapPin", title: "Стратегическое расположение", desc: "Трасса М1, г. Вязьма — узловая точка между Москвой и западными регионами" },
            ].map((a, i) => (
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
                { icon: "Phone", label: "Телефон", val: "+7 (___) ___-__-__" },
                { icon: "Mail", label: "Email", val: "info@borodino-park.ru" },
                { icon: "Calendar", label: "Период реализации", val: "2026 – 2031 г." },
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
            <div className="contact-form">
              <div className="form-title">Запросить презентацию</div>
              <input className="form-input" placeholder="Ваше имя" />
              <input className="form-input" placeholder="Компания" />
              <input className="form-input" placeholder="Email или телефон" />
              <textarea className="form-textarea" placeholder="Вопрос или комментарий" rows={3} />
              <button className="btn-primary full">
                Отправить запрос <Icon name="Send" size={16} />
              </button>
              <div className="form-note">Свяжемся в течение одного рабочего дня</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────── */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-logo">
            <span className="logo-mark small">ИП</span>
            <span>Индустриальный парк «Бородино» · 2026–2031</span>
          </div>
          <div className="footer-note">Инвестиционная презентация носит информационный характер</div>
        </div>
      </footer>
    </>
  );
}
