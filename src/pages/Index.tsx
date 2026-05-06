import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/icon";
type IconName = string;

const HERO_IMAGE =
  "https://cdn.poehali.dev/projects/49f7a74d-a29e-4df6-a9ab-7c61c90787d1/files/7272139e-2fbe-4c53-9296-05b274ffd4d6.jpg";

function useCounter(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const p = Math.min((ts - startTime) / duration, 1);
      setCount(Math.floor((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function StatCard({ value, suffix, label, delay = 0, start }: {
  value: number; suffix: string; label: string; delay?: number; start: boolean;
}) {
  const count = useCounter(value, 2000, start);
  return (
    <div className="stat-card" style={{ animationDelay: `${delay}ms` }}>
      <div className="stat-value">{count}<span className="stat-suffix">{suffix}</span></div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

const navItems = [
  { id: "overview", label: "Обзор" },
  { id: "problem", label: "Проблема" },
  { id: "solution", label: "Решение" },
  { id: "project", label: "Проект" },
  { id: "investment", label: "Инвестиции" },
  { id: "advantages", label: "Преимущества" },
  { id: "contacts", label: "Контакты" },
];

export default function Index() {
  const [activeSection, setActiveSection] = useState("overview");
  const [menuOpen, setMenuOpen] = useState(false);
  const { ref: statsRef, inView: statsInView } = useInView(0.3);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + 120;
      for (let i = navItems.length - 1; i >= 0; i--) {
        const el = document.getElementById(navItems[i].id);
        if (el && el.offsetTop <= scrollY) { setActiveSection(navItems[i].id); break; }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="app-root">

      {/* ── NAV ─────────────────────────────────── */}
      <nav className="navbar">
        <div className="navbar-inner">
          <div className="navbar-logo">
            <span className="logo-mark">ИП</span>
            <span className="logo-text">Бородино</span>
          </div>
          <div className="navbar-links">
            {navItems.map((item) => (
              <button key={item.id}
                className={`nav-link ${activeSection === item.id ? "active" : ""}`}
                onClick={() => scrollTo(item.id)}>{item.label}</button>
            ))}
          </div>
          <button className="navbar-cta" onClick={() => scrollTo("contacts")}>Связаться</button>
          <button className="burger" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>
        {menuOpen && (
          <div className="mobile-menu">
            {navItems.map((item) => (
              <button key={item.id} className="mobile-link" onClick={() => scrollTo(item.id)}>{item.label}</button>
            ))}
          </div>
        )}
      </nav>

      {/* ── 1. HERO — КРЮЧОК ────────────────────── */}
      <section id="overview" className="hero-section">
        <div className="hero-bg" style={{ backgroundImage: `url(${HERO_IMAGE})` }} />
        <div className="hero-overlay" />
        <div className="hero-grid-lines" />
        <div className="hero-content">
          <div className="hero-badge">Индустриальный парк «Бородино» · г. Вязьма</div>
          <h1 className="hero-title">
            Пока другие ждут свободные окна<br />
            на контрактных площадках —
            <span className="hero-accent">вы закрываете спрос и забираете рынок.</span>
          </h1>
          <p className="hero-subtitle">
            Строительство индустриальной площадки 7 Га с готовой инфраструктурой
            для размещения производств напитков и складских мощностей · трасса М1
          </p>
          <div className="hero-actions">
            <button className="btn-primary" onClick={() => scrollTo("investment")}>
              Условия инвестирования <Icon name="ArrowRight" size={18} />
            </button>
            <button className="btn-outline" onClick={() => scrollTo("problem")}>
              Узнать подробнее
            </button>
          </div>
        </div>
        <div className="scroll-indicator" onClick={() => scrollTo("problem")}>
          <Icon name="ChevronDown" size={24} />
        </div>
      </section>

      {/* ── STATS ───────────────────────────────── */}
      <section className="stats-section" ref={statsRef}>
        <div className="stats-grid">
          <StatCard value={7} suffix=" Га" label="Площадь площадки" delay={0} start={statsInView} />
          <StatCard value={3} suffix=" млрд ₽" label="Объём инвестиций" delay={150} start={statsInView} />
          <StatCard value={250} suffix="+" label="Рабочих мест" delay={300} start={statsInView} />
          <StatCard value={60} suffix=" тыс/ч" label="Банок — мощность линии" delay={450} start={statsInView} />
        </div>
      </section>

      {/* ── 2. ПРОБЛЕМА ─────────────────────────── */}
      <section id="problem" className="content-section dark-section">
        <div className="section-inner">
          <div className="section-label light">Проблема рынка</div>
          <h2 className="section-title light">
            Каждый сезон бренды теряют миллионы —<br />
            <span style={{ color: "var(--c-gold)" }}>не потому что нет спроса</span>
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
              <div className="problem-danger">
                <strong>И самое опасное:</strong> в этот момент ваш клиент покупает продукт конкурента.
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
      <section id="solution" className="content-section">
        <div className="section-inner">
          <div className="section-label">Решение</div>
          <h2 className="section-title">Собственная инфраструктура — стратегический актив</h2>

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
              { icon: "Truck", title: "Единый центр отгрузки", desc: "Производство + хранение + поставки в одной системе — никаких разрозненных складов" },
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

      {/* ── 4. ПРОЕКТ ───────────────────────────── */}
      <section id="project" className="content-section dark-section">
        <div className="section-inner">
          <div className="section-label light">Проект</div>
          <h2 className="section-title light">Индустриальный парк «Бородино»</h2>

          {/* География */}
          <div className="project-geo">
            <div className="project-geo-map">
              <div className="map-pulse" />
              <Icon name="MapPin" size={36} className="map-icon" />
              <div className="map-label">г. Вязьма, д. Бородино</div>
              <div className="map-sublabel">Смоленская область · трасса М1</div>
            </div>
            <div className="project-geo-info">
              {[
                { icon: "Navigation", title: "Расположение", text: "Трасса М1, напротив Мелькомбината. 200 км от Москвы — прямой выход на федеральную трассу." },
                { icon: "Truck", title: "Транспорт", text: "Федеральная трасса М1, удобная логистика в Москву, ЦФО и западные регионы." },
                { icon: "Building2", title: "Окружение", text: "Городская инфраструктура г. Вязьмы: жильё, медицина, образование, трудовые ресурсы." },
                { icon: "Calendar", title: "Сроки", text: "Реализация 2026–2031. I этап — 2026 г.: проектирование и подготовка территории." },
              ].map((item, i) => (
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

          {/* Главное производство */}
          <div className="flagship-card" style={{ marginTop: "3rem" }}>
            <div className="flagship-badge">Основное производство</div>
            <div className="flagship-content">
              <div className="flagship-emoji">🥤</div>
              <div>
                <div className="flagship-title">Безалкогольные напитки в алюминиевой банке</div>
                <div className="flagship-desc">
                  Производственная линия мощностью <strong>60 000 банок в час</strong>. Полный цикл: розлив, укупорка, этикетировка, упаковка.
                </div>
                <div className="flagship-tags">
                  <span className="tag">60 000 банок/час</span>
                  <span className="tag">Алюминиевая Ева-банка</span>
                  <span className="tag">Контрактное производство</span>
                  <span className="tag">Ответственное хранение</span>
                </div>
              </div>
            </div>
          </div>

          {/* Реализация под ключ */}
          <div className="turnkey-block">
            <div className="turnkey-label">Наше преимущество</div>
            <h3 className="turnkey-title">Реализуем проект полностью своими силами</h3>
            <p className="turnkey-text">
              У нас есть собственная строительная группа — мы не зависим от подрядчиков и контролируем каждый этап. От покупки земли до запуска производства — всё в одних руках.
            </p>
            <div className="turnkey-steps">
              {[
                { icon: "MapPin", step: "01", title: "Покупка земли", desc: "Выбор и оформление участка" },
                { icon: "HardHat", step: "02", title: "Строительство", desc: "Собственная строительная группа" },
                { icon: "Settings", step: "03", title: "Монтаж оборудования", desc: "Технологическая линия под ключ" },
                { icon: "Play", step: "04", title: "Запуск производства", desc: "Выход на проектную мощность" },
                { icon: "Users", step: "05", title: "Подбор персонала", desc: "Комплектация команды" },
                { icon: "BarChart2", step: "06", title: "Управление", desc: "Операционное управление парком" },
              ].map((s, i) => (
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

          {/* Действующие контракты */}
          <div className="contracts-block">
            <div className="contracts-label">Подтверждённые партнёрства</div>
            <h3 className="contracts-title">Действующие контракты уже сегодня</h3>
            <div className="contracts-grid">
              <div className="contracts-col">
                <div className="contracts-col-title">
                  <Icon name="FileCheck" size={18} />
                  Владельцы брендов напитков
                </div>
                <div className="contracts-col-text">
                  Заключены контракты с владельцами брендов безалкогольных напитков на размещение производства и контрактный розлив. Очередь резидентов формируется до открытия парка.
                </div>
                <div className="contracts-badge">Контракты подписаны</div>
              </div>
              <div className="contracts-divider" />
              <div className="contracts-col">
                <div className="contracts-col-title">
                  <Icon name="Package" size={18} />
                  Поставщики алюминиевой банки
                </div>
                <div className="contracts-partners">
                  {[
                    { name: "Арнест", desc: "Ведущий российский производитель алюминиевой упаковки" },
                    { name: "Кэнпак", desc: "Международный производитель алюминиевых банок, присутствие в России" },
                  ].map((p, i) => (
                    <div className="contracts-partner" key={i}>
                      <div className="contracts-partner-name">{p.name}</div>
                      <div className="contracts-partner-desc">{p.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Инфраструктура */}
          <div className="infra-grid" style={{ marginTop: "3rem" }}>
            {[
              { icon: "Factory", title: "Производство и склады", value: "21 000 м²" },
              { icon: "Building2", title: "Офисное здание", value: "60 мест" },
              { icon: "UtensilsCrossed", title: "Комбинат питания", value: "на территории" },
              { icon: "Dumbbell", title: "Спортивный комплекс", value: "на территории" },
              { icon: "Trees", title: "Благоустройство", value: "7 Га" },
              { icon: "ShieldCheck", title: "Инженерные сети", value: "готовая инфра" },
            ].map((item, i) => (
              <div className="infra-card" key={i}>
                <div className="infra-icon"><Icon name={item.icon as IconName} size={22} /></div>
                <div className="infra-value">{item.value}</div>
                <div className="infra-title">{item.title}</div>
              </div>
            ))}
          </div>

          {/* Этапы */}
          <div className="timeline" style={{ marginTop: "3rem" }}>
            <div className="timeline-title">Этапы реализации</div>
            <div className="timeline-track">
              {[
                { phase: "I этап", period: "2026", desc: "Проектирование, разрешения, подготовка территории", status: "active" },
                { phase: "II этап", period: "2027–2028", desc: "Строительство инженерных сетей и корпусов", status: "upcoming" },
                { phase: "III этап", period: "2029–2031", desc: "Монтаж оборудования, запуск, выход на мощность", status: "upcoming" },
              ].map((item, i) => (
                <div key={i} className={`timeline-item ${item.status}`}>
                  <div className="timeline-dot" />
                  <div className="timeline-phase">{item.phase}</div>
                  <div className="timeline-period">{item.period}</div>
                  <div className="timeline-desc">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Какого инвестора ищем */}
          <div className="passions-block" style={{ borderTop: "1px solid rgba(0,229,255,0.12)", marginTop: "3rem", paddingTop: "3rem" }}>
            <div className="passions-label">Какого инвестора мы хотим</div>
            <div className="passions-subtitle">Главные страсти резидентов</div>
            <div className="passions-grid">
              {[
                { num: "01", emoji: "🏆", title: "Стать новым локальным лидером", desc: "После ослабления международных брендов открылось окно возможностей." },
                { num: "02", emoji: "🎵", title: "Построить культовый бренд", desc: "Не просто продавать напиток — создать lifestyle. Музыка, gaming, спорт, digital community." },
                { num: "03", emoji: "🛒", title: "Масштабирование через сети", desc: "Зайти в X5, Магнит, ВкусВилл, АЗС и маркетплейсы — значит стать настоящим брендом." },
                { num: "04", emoji: "⚡", title: "Захват тренда functional drinks", desc: "No sugar, витамины, адаптогены, wellness. Быть не газировкой, а функциональным продуктом." },
                { num: "05", emoji: "🌍", title: "Создать экспортный бренд", desc: "Амбиция выйти на рынки СНГ, Ближнего Востока и Азии." },
              ].map((p, i) => (
                <div className="passion-card" key={i}>
                  <div className="passion-num">{p.num}</div>
                  <div className="passion-emoji">{p.emoji}</div>
                  <div className="passion-title">{p.title}</div>
                  <div className="passion-desc">{p.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

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
    </div>
  );
}