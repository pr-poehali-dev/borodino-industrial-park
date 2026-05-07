import Icon from "@/components/ui/icon";
type IconName = string;

interface ProblemSolutionProps {
  scrollTo: (id: string) => void;
}

export default function ProblemSolution({ scrollTo }: ProblemSolutionProps) {
  return (
    <>
      {/* ── 2. ПРОБЛЕМА ─────────────────────────── */}
      <section id="problem" className="content-section">
        <div className="section-inner">
          <div className="section-label reveal">Проблема рынка</div>
          <h2 className="section-title reveal reveal-delay-1">
            Бренды теряют миллионы —<br />
            <span style={{ color: "var(--c-blue-light)" }}>не из-за спроса, а из-за отсутствия свободных мощностей.</span>
          </h2>

          <p className="problem-lead">
            С апреля по сентябрь рынок перегревается: energy drinks, cold drinks, функциональные напитки показывают пиковый рост, а старые производственные линии перестают справляться.
          </p>
          <div className="problem-list-v2">
            {[
              "Производство уходит в overtime",
              "Срываются поставки в сети",
              "Сети вводят штрафы за недопоставку",
              "Бренд теряет полку в пиковый сезон",
              "SKU исчезают в самый прибыльный период",
            ].map((text, i) => (
              <div className="problem-row" key={i}>
                <span className="problem-row-num">0{i + 1}</span>
                <span className="problem-row-text">{text}</span>
                <Icon name="TrendingDown" size={18} className="problem-row-icon" />
              </div>
            ))}
          </div>
          <div className="problem-danger-headline">
            <span className="problem-danger-prefix">И самое опасное:</span>
            <br />
            в этот момент ваш клиент покупает продукт конкурента.
          </div>

          {/* Амбиции рынка */}
          <div className="ambitions-block">
            <div className="ambitions-label">Амбиции рынка</div>
            <div className="ambitions-grid">
              {[
                { num: "01", emoji: "🏆", title: "Стать новым локальным лидером", desc: "После ослабления международных брендов открылось окно возможностей." },
                { num: "02", emoji: "🎵", title: "Построить культовый бренд", desc: "Не просто продавать напиток — создать lifestyle. Музыка, gaming, спорт, digital community." },
                { num: "03", emoji: "🛒", title: "Масштабирование через сети", desc: "Зайти в X5, Магнит, ВкусВилл, АЗС и маркетплейсы — значит стать настоящим брендом." },
                { num: "04", emoji: "⚡", title: "Захват тренда functional drinks", desc: "No sugar, витамины, адаптогены, wellness. Быть не газировкой, а функциональным продуктом." },
                { num: "05", emoji: "🌍", title: "Создать экспортный бренд", desc: "Амбиция выйти на рынки СНГ, Ближнего Востока и Азии." },
              ].map((a, i) => (
                <div className="ambition-card" key={i}>
                  <div className="ambition-num">{a.num}</div>
                  <div className="ambition-emoji">{a.emoji}</div>
                  <div className="ambition-title">{a.title}</div>
                  <div className="ambition-desc">{a.desc}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ── 3. РЕШЕНИЕ ──────────────────────────── */}
      <section id="solution" className="content-section blue-section">
        <div className="section-inner">
          <div className="section-label reveal">Решение</div>
          <h2 className="section-title reveal reveal-delay-1">Собственная инфраструктура —<br /><span style={{ color: "var(--c-blue-light)" }}>стратегический актив.</span></h2>

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
              { icon: "Zap", title: "Высокоскоростная линия 60 000 банок/час — закрывает пиковый спрос без overtime и штрафов", desc: "" },
              { icon: "Tag", title: "Собственное производство фиксирует цену банки и сырья — маржа под вашим контролем", desc: "" },
              { icon: "Truck", title: "Производство + хранение + поставки в одной системе — никаких разрозненных складов", desc: "" },
              { icon: "DollarSign", title: "Свободные мощности — контрактный розлив и ответственное хранение для других брендов", desc: "" },
              { icon: "Shuffle", title: "Быстрый переналад позволяет запускать новые вкусы без зависимости от подрядчиков", desc: "" },
              { icon: "ShieldCheck", title: "Прямые контракты с производителями банки КенПак и Арнест", desc: "" },
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