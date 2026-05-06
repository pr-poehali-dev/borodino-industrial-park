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
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function StatCard({
  value,
  suffix,
  label,
  delay = 0,
  start,
}: {
  value: number;
  suffix: string;
  label: string;
  delay?: number;
  start: boolean;
}) {
  const count = useCounter(value, 2000, start);
  return (
    <div className="stat-card" style={{ animationDelay: `${delay}ms` }}>
      <div className="stat-value">
        {count}
        <span className="stat-suffix">{suffix}</span>
      </div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

const navItems = [
  { id: "overview", label: "Обзор" },
  { id: "geography", label: "География" },
  { id: "infrastructure", label: "Инфраструктура" },
  { id: "production", label: "Производство" },
  { id: "investment", label: "Инвестиции" },
  { id: "advantages", label: "Преимущества" },
  { id: "contacts", label: "Контакты" },
];

const caseStudies = [
  { title: "Технопарк «Нева»", location: "Санкт-Петербург", result: "+2 400 рабочих мест", roi: "IRR 24%", year: "2019–2022" },
  { title: "Индустриальный парк «Волга»", location: "Нижний Новгород", result: "38 резидентов", roi: "IRR 21%", year: "2018–2021" },
  { title: "ОЭЗ «Уральский»", location: "Екатеринбург", result: "₽12 млрд выручки", roi: "IRR 19%", year: "2020–2023" },
];

const advantages = [
  { icon: "Zap", title: "Готовая инфраструктура", desc: "Электричество, газ, вода — всё подведено до границ участков" },
  { icon: "Shield", title: "Налоговые льготы", desc: "Резиденты получают освобождение от налога на имущество на 10 лет" },
  { icon: "TrendingUp", title: "Высокий спрос", desc: "Очередь из 40+ потенциальных резидентов уже сформирована" },
  { icon: "Globe", title: "Транспортная доступность", desc: "М-12, ж/д ветка, 35 км от федеральной трассы" },
  { icon: "Users", title: "Кадровый потенциал", desc: "250 000 человек трудоспособного населения в радиусе 50 км" },
  { icon: "Award", title: "Господдержка", desc: "Проект включён в региональную инвестпрограмму 2025–2030" },
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
        if (el && el.offsetTop <= scrollY) {
          setActiveSection(navItems[i].id);
          break;
        }
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
            <span className="logo-text">ИндустриПарк</span>
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
          <div className="hero-badge">Инвестиционная презентация · 2025</div>
          <h1 className="hero-title">
            Индустриальный
            <br />
            <span className="hero-accent">Парк Будущего</span>
          </h1>
          <p className="hero-subtitle">
            Стратегический объект для размещения высокотехнологичных производств,
            <br />
            логистики и технологических компаний
          </p>
          <div className="hero-actions">
            <button className="btn-primary" onClick={() => scrollTo("investment")}>
              Условия инвестирования
              <Icon name="ArrowRight" size={18} />
            </button>
            <button className="btn-outline" onClick={() => scrollTo("geography")}>
              Узнать подробнее
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
          <StatCard value={250} suffix=" га" label="Общая площадь парка" delay={0} start={statsInView} />
          <StatCard value={40} suffix="+" label="Потенциальных резидентов" delay={150} start={statsInView} />
          <StatCard value={15} suffix=" млрд" label="Объём инвестиций, ₽" delay={300} start={statsInView} />
          <StatCard value={3500} suffix="+" label="Планируемых рабочих мест" delay={450} start={statsInView} />
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
                <div className="map-label">Центральный федеральный округ</div>
                <div className="map-sublabel">~200 км от Москвы</div>
              </div>
            </div>
            <div className="geo-info">
              {[
                { icon: "Navigation", title: "Расположение", text: "Центральный федеральный округ, 200 км от Москвы. Развитая транспортная сеть M-12 и региональные дороги." },
                { icon: "Train", title: "Транспорт", text: "Прямая ж/д ветка до промзоны, выход на федеральную трассу М-12, 40 минут до аэропорта." },
                { icon: "Building2", title: "Окружение", text: "Административный центр субъекта, развитая городская инфраструктура, жильё, медицина, образование." },
                { icon: "Leaf", title: "Экология", text: "Санитарно-защитная зона соблюдена. Расположение вне водоохранных зон. Безопасно для окружающей среды." },
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
          <h2 className="section-title light">Строительство и инженерия</h2>
          <div className="infra-grid">
            {[
              { icon: "Zap", title: "Электроснабжение", value: "50 МВт", desc: "Выделенная мощность от двух независимых источников" },
              { icon: "Flame", title: "Газоснабжение", value: "3 м³/ч", desc: "Подведён магистральный газопровод высокого давления" },
              { icon: "Droplets", title: "Водоснабжение", value: "5 000 м³/сут", desc: "Промышленный водозабор, очистные сооружения" },
              { icon: "Wifi", title: "Телекоммуникации", value: "10 Гбит/с", desc: "Волоконно-оптика двух операторов, резервирование" },
              { icon: "Truck", title: "Дороги", value: "12 км", desc: "Внутренние дороги с твёрдым покрытием, освещение" },
              { icon: "ShieldCheck", title: "Безопасность", value: "24/7", desc: "Периметральная охрана, видеонаблюдение, КПП" },
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
            <div className="timeline-title">Этапы строительства</div>
            <div className="timeline-track">
              {[
                { phase: "I этап", period: "2024–2025", desc: "Инженерные сети, первые 80 га", status: "active" },
                { phase: "II этап", period: "2025–2026", desc: "Промышленная зона, склады", status: "upcoming" },
                { phase: "III этап", period: "2026–2027", desc: "Деловой квартал, R&D-центр", status: "upcoming" },
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
          <h2 className="section-title">Производства и возможности</h2>
          <div className="prod-grid">
            {[
              { emoji: "🏭", title: "Лёгкая промышленность", desc: "Готовые корпуса от 500 м², монтаж оборудования под ключ" },
              { emoji: "📦", title: "Логистика и склады", desc: "Склады класса А с температурным режимом, 30 000 м² в наличии" },
              { emoji: "🔬", title: "R&D и технологии", desc: "Лаборатории, опытные производства, коворкинг для стартапов" },
              { emoji: "🌱", title: "Агропереработка", desc: "Пищевые производства, сертифицированные цеха, холодовая цепь" },
              { emoji: "⚡", title: "Электроника", desc: "Производство ПЭ и ПП в чистых помещениях класса ISO 7–8" },
              { emoji: "🚗", title: "Автокомпоненты", desc: "Поставщики 1-го уровня, штамповка, пластик, сборка" },
            ].map((item, i) => (
              <div className="prod-card" key={i}>
                <div className="prod-emoji">{item.emoji}</div>
                <div className="prod-title">{item.title}</div>
                <div className="prod-desc">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INVESTMENT */}
      <section id="investment" className="content-section gold-section">
        <div className="section-inner">
          <div className="section-label light">Инвестиции</div>
          <h2 className="section-title light">Финансирование и доходность</h2>
          <div className="invest-layout">
            <div className="invest-main">
              <div className="invest-card featured">
                <div className="invest-card-label">Объём проекта</div>
                <div className="invest-big-num">₽15 млрд</div>
                <div className="invest-details">
                  {[
                    { label: "Собственные средства", val: "30%" },
                    { label: "Банковское финансирование", val: "45%" },
                    { label: "Привлечённые инвесторы", val: "25%" },
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
                { label: "Целевой IRR", val: "22%", icon: "TrendingUp" },
                { label: "Срок окупаемости", val: "6 лет", icon: "Clock" },
                { label: "NPV проекта", val: "₽4,2 млрд", icon: "DollarSign" },
                { label: "Горизонт инвестирования", val: "10 лет", icon: "Calendar" },
              ].map((m, i) => (
                <div className="metric-card" key={i}>
                  <Icon name={m.icon as IconName} size={20} className="metric-icon" />
                  <div className="metric-val">{m.val}</div>
                  <div className="metric-label">{m.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="cases-title">Аналогичные реализованные проекты</div>
          <div className="cases-grid">
            {caseStudies.map((c, i) => (
              <div className="case-card" key={i}>
                <div className="case-header">
                  <div className="case-title">{c.title}</div>
                  <div className="case-year">{c.year}</div>
                </div>
                <div className="case-location">
                  <Icon name="MapPin" size={14} />
                  {c.location}
                </div>
                <div className="case-metrics">
                  <div className="case-metric">
                    <Icon name="Users" size={14} />
                    {c.result}
                  </div>
                  <div className="case-metric highlight">
                    <Icon name="TrendingUp" size={14} />
                    {c.roi}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ADVANTAGES */}
      <section id="advantages" className="content-section">
        <div className="section-inner">
          <div className="section-label">Преимущества</div>
          <h2 className="section-title">Почему этот проект</h2>
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
                { icon: "Building2", label: "Компания", val: "ООО «ИндустриПарк Девелопмент»" },
                { icon: "User", label: "Контактное лицо", val: "Иванов Александр Сергеевич" },
                { icon: "Phone", label: "Телефон", val: "+7 (495) 000-00-00" },
                { icon: "Mail", label: "Email", val: "invest@industripark.ru" },
                { icon: "MapPin", label: "Адрес офиса", val: "Москва, Пресненская наб., 8, стр. 1" },
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
              <div className="form-title">Запросить материалы</div>
              <input className="form-input" placeholder="Ваше имя" />
              <input className="form-input" placeholder="Email или телефон" />
              <textarea className="form-textarea" placeholder="Комментарий (необязательно)" rows={3} />
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
            <span>ИндустриПарк · 2025</span>
          </div>
          <div className="footer-note">Инвестиционная презентация носит информационный характер</div>
        </div>
      </footer>
    </div>
  );
}