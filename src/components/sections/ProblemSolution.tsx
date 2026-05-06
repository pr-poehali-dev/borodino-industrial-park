import Icon from "@/components/ui/icon";
type IconName = string;

interface ProblemSolutionProps {
  scrollTo: (id: string) => void;
}

export default function ProblemSolution({ scrollTo }: ProblemSolutionProps) {
  return (
    <>
      {/* ── 2. ПРОБЛЕМА ─────────────────────────── */}
      <section id="problem" className="content-section dark-section">
        <div className="section-inner">
          <div className="section-label reveal">Проблема рынка</div>
          <h2 className="section-title reveal reveal-delay-1">
            Бренды теряют миллионы —<br />
            <span style={{ color: "#2997ff" }}>не из-за спроса, а из-за отсутствия свободных мощностей.</span>
          </h2>

          <div className="problem-layout">
            <div className="problem-main">
              <p className="problem-lead">
                С апреля по сентябрь рынок перегревается: energy drinks, cold drinks, функциональные напитки показывают пиковый рост, а старые производственные линии перестают справляться.
              </p>
              <div className="problem-list">
                {[
                  { icon: "Clock", text: "Производство уходит в overtime" },
                  { icon: "AlertCircle", text: "Срываются поставки в сети" },
                  { icon: "Ban", text: "Сети вводят штрафы за недопоставку" },
                  { icon: "ShoppingCart", text: "Бренд теряет полку в пиковый сезон" },
                  { icon: "PackageX", text: "SKU исчезают в самый прибыльный период" },
                ].map((item, i) => (
                  <div className="problem-item" key={i}>
                    <div className="problem-item-icon">
                      <Icon name={item.icon as IconName} size={16} />
                    </div>
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
              <div className="problem-danger problem-danger--highlight">
                <div className="problem-danger-icon">⚠️</div>
                <div>
                  <strong>И самое опасное:</strong> в этот момент ваш клиент покупает продукт конкурента.
                </div>
              </div>
            </div>

            <div className="problem-cost">
              <div className="problem-cost-title">Непредсказуемая себестоимость</div>
              <p className="problem-cost-text">
                Вторая системная боль — отсутствие контроля над экономикой бренда.
              </p>
              {[
                "Цена банки растёт",
                "Сырьё дорожает каждый месяц",
                "Логистика дорожает",
                "Подрядчики меняют условия в сезон",
              ].map((t, i) => (
                <div className="problem-cost-item" key={i}>
                  <span className="problem-cost-dot" />
                  {t}
                </div>
              ))}
              <div className="problem-cost-result">
                Когда бренд растёт — хаос в себестоимости растёт вместе с ним.
              </div>
            </div>
          </div>

          <div className="problem-conclusion">
            Рынок больше не про «сделать хороший напиток».<br />
            <strong>Рынок — про способность быстро масштабироваться.</strong>
          </div>
        </div>
      </section>

      {/* ── 3. РЕШЕНИЕ ──────────────────────────── */}
      <section id="solution" className="content-section dark-section">
        <div className="section-inner">
          <div className="section-label reveal">Решение</div>
          <h2 className="section-title reveal reveal-delay-1">Собственная инфраструктура —<br />стратегический актив.</h2>

          <div className="solution-contrast">
            <div className="solution-side negative">
              <div className="solution-side-label">Без контроля</div>
              <div className="solution-side-text">
                Вашу прибыль определяет рынок.<br />Себестоимость непредсказуема.<br />Рост ограничен чужими мощностями.
              </div>
            </div>
            <div className="solution-arrow">
              <Icon name="ArrowRight" size={28} />
            </div>
            <div className="solution-side positive">
              <div className="solution-side-label">С собственным заводом</div>
              <div className="solution-side-text">
                Вы управляете экономикой бренда.<br />Себестоимость прозрачна и предсказуема.<br />Масштаб — ваше решение.
              </div>
            </div>
          </div>

          <div className="solution-benefits">
            {[
              { icon: "Zap", title: "Масштабирование без потолка", desc: "Высокоскоростная линия 60 000 банок/час — закрывает пиковый спрос без overtime и штрафов" },
              { icon: "Tag", title: "Прозрачная себестоимость", desc: "Собственное производство фиксирует цену банки и сырья — маржа под вашим контролем" },
              { icon: "Truck", title: "Единый центр отгрузки в сети", desc: "Производство + хранение + поставки в одной системе — никаких разрозненных складов" },
              { icon: "DollarSign", title: "Дополнительная прибыль", desc: "Свободные мощности — контрактный розлив и ответственное хранение для других брендов" },
              { icon: "Shuffle", title: "Гибкость по SKU", desc: "Быстрый переналад позволяет запускать новые вкусы без зависимости от подрядчиков" },
              { icon: "ShieldCheck", title: "Защита от санкций", desc: "Локальный сервис, доступные компоненты, независимость от импортных поставщиков" },
            ].map((b, i) => (
              <div className="solution-card" key={i}>
                <div className="solution-card-icon">
                  <Icon name={b.icon as IconName} size={24} />
                </div>
                <div className="solution-card-title">{b.title}</div>
                <div className="solution-card-desc">{b.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}