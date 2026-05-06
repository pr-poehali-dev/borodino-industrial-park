import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/icon";
type IconName = string;

const HERO_IMAGE =
  "https://cdn.poehali.dev/projects/49f7a74d-a29e-4df6-a9ab-7c61c90787d1/files/13838bc5-843a-433a-8d32-b610bbfa498f.jpg";

function useCounter(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
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
  { id: "geography", label: "География" },
  { id: "infrastructure", label: "Инфраструктура" },
  { id: "production", label: "Производство" },
  { id: "market-pains", label: "Боли рынка" },
  { id: "investment", label: "Инвестиции" },
  { id: "advantages", label: "Преимущества" },
  { id: "contacts", label: "Контакты" },
];

const marketPains = [
  {
    icon: "Gauge",
    title: "Нехватка мощностей в сезон",
    peak: "Апрель – Сентябрь",
    problem: "Старые линии не справляются с пиковым спросом: срываются поставки, штрафы сетей, потеря полки, дефицит SKU.",
    solution: "Высокоскоростные линии с быстрым переналадом — масштабирование без остановок.",
  },
  {
    icon: "Package",
    title: "Высокая стоимость хранения банки",
    peak: "Логистика",
    problem: "Пустая банка занимает огромный объём, требует больших складов и чувствительна к повреждениям.",
    solution: "Автоматический склад (AS/RS), оптимальный внутренний flow, минимизация перемещений.",
  },
  {
    icon: "AlertTriangle",
    title: "Потери на браке и простоях",
    peak: "Каждая минута = деньги",
    problem: "Деформация банки, утечки, проблемы seam quality, остановки filler/capper — прямые потери и недопоставки.",
    solution: "Современное оборудование с predictive maintenance и онлайн-контролем качества.",
  },
  {
    icon: "Shuffle",
    title: "Сложность запуска новых SKU",
    peak: "Гибкость производства",
    problem: "Старые заводы плохо подходят под частые переналадки, маленькие партии и коллаборации.",
    solution: "Flexible manufacturing: быстрый changeover, модульные линии, digital recipe management.",
  },
  {
    icon: "Zap",
    title: "Энергозатраты",
    peak: "Маржа под давлением",
    problem: "Охлаждение, компрессоры, пастеризация, CIP, HVAC — тарифы растут, маржа падает.",
    solution: "Снижение kWh/литр, рекуперация тепла, энергоэффективный cold chain.",
  },
  {
    icon: "Shield",
    title: "Зависимость от импортного оборудования",
    peak: "После санкций",
    problem: "Отсутствие запчастей, долгий сервис, простой линии, невозможность модернизации.",
    solution: "Локальный сервис, доступность компонентов, modular upgrade.",
  },
  {
    icon: "Users",
    title: "Нехватка персонала",
    peak: "Кадровый дефицит",
    problem: "Технологов, инженеров, automation staff и maintenance teams катастрофически не хватает.",
    solution: "Максимальная автоматизация: MES/SCADA, remote diagnostics, predictive maintenance.",
  },
  {
    icon: "Droplets",
    title: "Проблемы с качеством воды",
    peak: "Вода = продукт",
    problem: "Нестабильное качество, дорогая водоподготовка, риски контаминации.",
    solution: "Многоступенчатая фильтрация, онлайн-контроль качества, резервирование.",
  },
  {
    icon: "BarChart2",
    title: "Низкий OEE старых производств",
    peak: "Устаревшая база",
    problem: "Низкая скорость линий, частые простои, ручные операции — завод морально устарел.",
    solution: "«Умный завод»: realtime analytics, OEE dashboards, digital twin, автоконтроль потерь.",
  },
];

const advantages = [
  { icon: "Zap", title: "Собственное производство", desc: "Прозрачное и стабильное ценообразование за счёт полного контроля над производственным процессом" },
  { icon: "BarChart2", title: "Управление объёмами", desc: "Гибкое управление объёмами выпуска безалкогольных напитков в алюминиевой банке под нужды бизнеса" },
  { icon: "TrendingDown", title: "Оптимизация себестоимости", desc: "Снижение затрат на производство и логистику за счёт вертикальной интеграции" },
  { icon: "Truck", title: "Единый центр отгрузки", desc: "Централизованная отгрузка напитков в сети — ускорение сроков и снижение транспортных расходов" },
  { icon: "DollarSign", title: "Контрактное производство", desc: "Дополнительный доход от производства по заказу сторонних брендов и ответственного хранения" },
  { icon: "MapPin", title: "Стратегическое расположение", desc: "Трасса М1, г. Вязьма — узловая точка между Москвой и западными регионами России" },
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
      {/* NAV */}
      <nav className="navbar">
        <div className="navbar-inner">
          <div className="navbar-logo">
            <span className="logo-mark">ИП</span>
            <span className="logo-text">Бородино</span>
          </div>
          <div className="navbar-links">
            {navItems.map((item) => (
              <button
                key={item.id}
                className={`nav-link ${activeSection === item.id ? "active" : ""}`}
                onClick={() => scrollTo(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>
          <button className="navbar-cta" onClick={() => scrollTo("contacts")}>
            Связаться
          </button>
          <button className="burger" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>
        {menuOpen && (
          <div className="mobile-menu">
            {navItems.map((item) => (
              <button key={item.id} className="mobile-link" onClick={() => scrollTo(item.id)}>
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="overview" className="hero-section">
        <div className="hero-bg" style={{ backgroundImage: `url(${HERO_IMAGE})` }} />
        <div className="hero-overlay" />
        <div className="hero-grid-lines" />
        <div className="hero-content">
          <div className="hero-badge">Инвестиционная презентация · 2026–2031</div>
          <h1 className="hero-title">
            Индустриальный парк
            <br />
            <span className="hero-accent">«Бородино»</span>
          </h1>
          <p className="hero-subtitle">
            Строительство индустриальной площадки на 7 Га с готовой инфраструктурой<br />
            для размещения производств и складских мощностей · г. Вязьма, трасса М1
          </p>
          <div className="hero-actions">
            <button className="btn-primary" onClick={() => scrollTo("investment")}>
              Условия инвестирования
              <Icon name="ArrowRight" size={18} />
            </button>
            <button className="btn-outline" onClick={() => scrollTo("geography")}>
              О проекте
            </button>
          </div>
        </div>
        <div className="scroll-indicator" onClick={() => scrollTo("geography")}>
          <Icon name="ChevronDown" size={24} />
        </div>
      </section>

      {/* STATS */}
      <section className="stats-section" ref={statsRef}>
        <div className="stats-grid">
          <StatCard value={7} suffix=" Га" label="Площадь индустриальной площадки" delay={0} start={statsInView} />
          <StatCard value={3} suffix=" млрд ₽" label="Объём инвестиций" delay={150} start={statsInView} />
          <StatCard value={250} suffix="+" label="Создаваемых рабочих мест" delay={300} start={statsInView} />
          <StatCard value={60} suffix=" тыс." label="Банок в час (мощность линии)" delay={450} start={statsInView} />
        </div>
      </section>

      {/* GEOGRAPHY */}
      <section id="geography" className="content-section">
        <div className="section-inner">
          <div className="section-label">География</div>
          <h2 className="section-title">Место реализации проекта</h2>
          <div className="geo-grid">
            <div className="geo-map-placeholder">
              <div className="map-inner">
                <div className="map-pulse" />
                <Icon name="MapPin" size={40} className="map-icon" />
                <div className="map-label">Деревня Бородино, г. Вязьма</div>
                <div className="map-sublabel">Смоленская область · трасса М1</div>
              </div>
            </div>
            <div className="geo-info">
              {[
                {
                  icon: "Navigation",
                  title: "Расположение",
                  text: "Трасса М1 (Беларусь), напротив Мелькомбината, г. Вязьма — д. Бородино. Стратегическая точка на пути Москва — запад России.",
                },
                {
                  icon: "Truck",
                  title: "Транспортная доступность",
                  text: "Прямой выезд на федеральную трассу М1. Удобная логистика в Москву, регионы ЦФО и западные субъекты РФ.",
                },
                {
                  icon: "Building2",
                  title: "Окружение",
                  text: "Рядом — действующий Мелькомбинат. Городская инфраструктура г. Вязьмы: жильё, медицина, образование, трудовые ресурсы.",
                },
                {
                  icon: "Leaf",
                  title: "Экология и безопасность",
                  text: "Производство безалкогольных напитков — экологически чистый вид деятельности. Соответствие всем санитарным нормам.",
                },
              ].map((item, i) => (
                <div className="geo-item" key={i}>
                  <div className="geo-icon-wrap">
                    <Icon name={item.icon as IconName} size={20} />
                  </div>
                  <div>
                    <div className="geo-item-title">{item.title}</div>
                    <div className="geo-item-text">{item.text}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* INFRASTRUCTURE */}
      <section id="infrastructure" className="content-section dark-section">
        <div className="section-inner">
          <div className="section-label light">Инфраструктура</div>
          <h2 className="section-title light">Планируемое строительство</h2>
          <div className="infra-grid">
            {[
              { icon: "Factory", title: "Производственные площади", value: "21 000 м²", desc: "Производственные и складские корпуса с современными инженерными системами" },
              { icon: "Building2", title: "Офисное здание", value: "60 мест", desc: "Административный блок для управленческого и инженерного персонала" },
              { icon: "UtensilsCrossed", title: "Комбинат питания", value: "на территории", desc: "Собственная столовая для сотрудников предприятия" },
              { icon: "Dumbbell", title: "Спортивный комплекс", value: "на территории", desc: "Спортивная инфраструктура для работников парка" },
              { icon: "Trees", title: "Благоустройство", value: "7 Га", desc: "Комплексное благоустройство всей территории парка" },
              { icon: "ShieldCheck", title: "Инженерные сети", value: "готовая инфра", desc: "Электричество, газ, вода, канализация — подведены до границ участков" },
            ].map((item, i) => (
              <div className="infra-card" key={i}>
                <div className="infra-icon">
                  <Icon name={item.icon as IconName} size={24} />
                </div>
                <div className="infra-value">{item.value}</div>
                <div className="infra-title">{item.title}</div>
                <div className="infra-desc">{item.desc}</div>
              </div>
            ))}
          </div>
          <div className="timeline">
            <div className="timeline-title">Этапы реализации проекта</div>
            <div className="timeline-track">
              {[
                { phase: "I этап", period: "2026", desc: "Проектирование, получение разрешений, подготовка территории", status: "active" },
                { phase: "II этап", period: "2027–2028", desc: "Строительство инженерных сетей и производственных корпусов", status: "upcoming" },
                { phase: "III этап", period: "2029–2031", desc: "Монтаж оборудования, запуск производств, выход на мощность", status: "upcoming" },
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
        </div>
      </section>

      {/* PRODUCTION */}
      <section id="production" className="content-section">
        <div className="section-inner">
          <div className="section-label">Производство</div>
          <h2 className="section-title">Организуемые производства</h2>

          {/* Flagship */}
          <div className="flagship-card">
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

          {/* Страсти */}
          <div className="passions-block">
            <div className="passions-label">Главные страсти резидентов</div>
            <div className="passions-subtitle">Какого инвестора мы хотим?</div>
            <div className="passions-grid">
              {[
                {
                  num: "01",
                  emoji: "🏆",
                  title: "Стать новым локальным лидером",
                  desc: "После ослабления международных брендов открылось окно возможностей.",
                },
                {
                  num: "02",
                  emoji: "🎵",
                  title: "Построить культовый молодёжный бренд",
                  desc: "Не просто продавать напиток — создать lifestyle. Музыка, gaming, street culture, спорт, digital community.",
                },
                {
                  num: "03",
                  emoji: "🛒",
                  title: "Быстрое масштабирование через сети",
                  desc: "Зайти в X5, Магнит, Красное & Белое, ВкусВилл, федеральные АЗС и маркетплейсы — значит стать настоящим брендом.",
                },
                {
                  num: "04",
                  emoji: "⚡",
                  title: "Захват тренда functional drinks",
                  desc: "No sugar, витамины, адаптогены, caffeine+focus, wellness. Компании хотят быть не газировкой, а функциональным продуктом.",
                },
                {
                  num: "05",
                  emoji: "🌍",
                  title: "Создать экспортный бренд",
                  desc: "Амбиция выйти на рынки СНГ, Ближнего Востока и Азии. Собственное производство — ключевое условие для экспортной экспансии.",
                },
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

      {/* MARKET PAINS */}
      <section id="market-pains" className="content-section dark-section">
        <div className="section-inner">
          <div className="section-label light">Боли рынка</div>
          <h2 className="section-title light">Что мешает beverage-компаниям расти</h2>
          <p className="pains-intro">
            Мы создаём не просто завод — мы закрываем системные боли производителей напитков.<br />
            Каждое решение в проекте «Бородино» спроектировано под реальные задачи бизнеса.
          </p>

          <div className="pains-grid">
            {marketPains.map((pain, i) => (
              <div className="pain-card" key={i}>
                <div className="pain-header">
                  <div className="pain-icon">
                    <Icon name={pain.icon as IconName} size={22} />
                  </div>
                  <div className="pain-peak">{pain.peak}</div>
                </div>
                <div className="pain-title">{pain.title}</div>
                <div className="pain-problem">
                  <div className="pain-problem-label">Проблема</div>
                  <div className="pain-problem-text">{pain.problem}</div>
                </div>
                <div className="pain-solution">
                  <div className="pain-solution-label">
                    <Icon name="CheckCircle" size={13} />
                    Наше решение
                  </div>
                  <div className="pain-solution-text">{pain.solution}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Что реально продаёт */}
          <div className="sells-block">
            <div className="sells-title">Что реально продаёт современный завод</div>
            <div className="sells-grid">
              {[
                { icon: "TrendingDown", label: "Снижение cost per liter" },
                { icon: "Truck", label: "Стабильность поставок" },
                { icon: "Maximize2", label: "Масштабируемость" },
                { icon: "Shuffle", label: "Скорость вывода SKU" },
                { icon: "Shield", label: "Устойчивость к санкциям" },
                { icon: "Cpu", label: "Автоматизация" },
                { icon: "BarChart2", label: "Защита маржи" },
                { icon: "Clock", label: "Uptime и OEE" },
              ].map((s, i) => (
                <div className="sells-item" key={i}>
                  <Icon name={s.icon as IconName} size={20} />
                  <span>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* INVESTMENT */}
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

          {/* Инвестор */}
          <div className="investor-block">
            <div className="investor-label">Предполагаемый инвестор</div>
            <div className="investor-name">Бренд Билдинг Групп</div>
            <div className="investor-goals">
              <div className="investor-goals-title">Ключевые цели инвестора</div>
              <div className="investor-goals-grid">
                {[
                  { icon: "ShieldCheck", text: "Прозрачное и стабильное ценообразование за счёт собственного производства" },
                  { icon: "Sliders", text: "Управление объёмами выпуска напитков в алюминиевой банке" },
                  { icon: "TrendingDown", text: "Оптимизация себестоимости продукции" },
                  { icon: "Truck", text: "Единый центр отгрузки напитков в торговые сети" },
                  { icon: "DollarSign", text: "Доход от контрактного производства и ответственного хранения" },
                ].map((g, i) => (
                  <div className="investor-goal" key={i}>
                    <div className="investor-goal-icon">
                      <Icon name={g.icon as IconName} size={16} />
                    </div>
                    <div className="investor-goal-text">{g.text}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ADVANTAGES */}
      <section id="advantages" className="content-section">
        <div className="section-inner">
          <div className="section-label">Преимущества</div>
          <h2 className="section-title">Конкурентные преимущества</h2>
          <div className="adv-grid">
            {advantages.map((a, i) => (
              <div className="adv-card" key={i}>
                <div className="adv-number">0{i + 1}</div>
                <div className="adv-icon-wrap">
                  <Icon name={a.icon as IconName} size={28} />
                </div>
                <div className="adv-title">{a.title}</div>
                <div className="adv-desc">{a.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTS */}
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
                  <div className="contact-icon">
                    <Icon name={c.icon as IconName} size={18} />
                  </div>
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
                Отправить запрос
                <Icon name="Send" size={16} />
              </button>
              <div className="form-note">Мы свяжемся с вами в течение одного рабочего дня</div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
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