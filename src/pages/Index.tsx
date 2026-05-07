import { useEffect, useState } from "react";
import Icon from "@/components/ui/icon";
import HeroSection from "@/components/sections/HeroSection";
import ProblemSolution from "@/components/sections/ProblemSolution";
import AdvantagesSection from "@/components/sections/AdvantagesSection";
import ProjectSection from "@/components/sections/ProjectSection";
import InvestmentContacts from "@/components/sections/InvestmentContacts";
import { useReveal } from "@/hooks/useReveal";
import { t, Lang } from "@/lib/i18n";

const NAV_ITEMS = [
  { id: "overview",    labelRu: "Обзор",        labelEn: "Overview" },
  { id: "problem",     labelRu: "Проблема",     labelEn: "Problem" },
  { id: "solution",    labelRu: "Решение",      labelEn: "Solution" },
  { id: "advantages",  labelRu: "Преимущества", labelEn: "Advantages" },
  { id: "project",     labelRu: "Проект",       labelEn: "Project" },
  { id: "investment",  labelRu: "Инвестиции",   labelEn: "Investment" },
  { id: "contacts",    labelRu: "Контакты",     labelEn: "Contacts" },
];

export default function Index() {
  useReveal();
  const [lang, setLang]           = useState<Lang>("ru");
  const [menuOpen, setMenuOpen]   = useState(false);
  const [activeSection, setActiveSection] = useState("overview");

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + 120;
      for (let i = NAV_ITEMS.length - 1; i >= 0; i--) {
        const el = document.getElementById(NAV_ITEMS[i].id);
        if (el && el.offsetTop <= scrollY) {
          setActiveSection(NAV_ITEMS[i].id);
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

      {/* ── NAVBAR ── */}
      <nav className="navbar">
        <div className="navbar-inner">
          <div className="navbar-logo">
            <span className="logo-mark">ИП</span>
            <span className="logo-text">БОРОДИНО</span>
          </div>

          <div className="navbar-links">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                className={`nav-link ${activeSection === item.id ? "active" : ""}`}
                onClick={() => scrollTo(item.id)}
              >
                {lang === "ru" ? item.labelRu : item.labelEn}
              </button>
            ))}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ display: "flex", background: "rgba(255,255,255,0.1)", borderRadius: 4, overflow: "hidden" }}>
              <button
                onClick={() => setLang("ru")}
                style={{ padding: "5px 13px", fontSize: 12, fontWeight: 700, border: "none", cursor: "pointer", background: lang === "ru" ? "var(--ikea-yellow)" : "transparent", color: lang === "ru" ? "var(--ikea-blue)" : "rgba(255,255,255,0.7)", transition: "all 0.15s", fontFamily: "Noto Sans, sans-serif", letterSpacing: "0.04em" }}
              >РУ</button>
              <button
                onClick={() => setLang("en")}
                style={{ padding: "5px 13px", fontSize: 12, fontWeight: 700, border: "none", cursor: "pointer", background: lang === "en" ? "var(--ikea-yellow)" : "transparent", color: lang === "en" ? "var(--ikea-blue)" : "rgba(255,255,255,0.7)", transition: "all 0.15s", fontFamily: "Noto Sans, sans-serif", letterSpacing: "0.04em" }}
              >EN</button>
            </div>
            <a className="navbar-cta" href="tel:89107600321" style={{ textDecoration: "none" }}>
              8 910 760 03 21
            </a>
          </div>

          <button className="burger" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>

        {menuOpen && (
          <div className="mobile-menu">
            {NAV_ITEMS.map((item) => (
              <button key={item.id} className="mobile-link" onClick={() => scrollTo(item.id)}>
                {lang === "ru" ? item.labelRu : item.labelEn}
              </button>
            ))}
            <div style={{ display: "flex", gap: 0, borderTop: "1px solid rgba(255,255,255,0.1)" }}>
              <button
                onClick={() => { setLang("ru"); setMenuOpen(false); }}
                style={{ flex: 1, padding: "12px", fontWeight: 700, fontSize: 13, border: "none", borderRight: "1px solid rgba(255,255,255,0.1)", cursor: "pointer", background: lang === "ru" ? "var(--ikea-yellow)" : "transparent", color: lang === "ru" ? "var(--ikea-blue)" : "rgba(255,255,255,0.7)", fontFamily: "Noto Sans, sans-serif", letterSpacing: "0.06em", textTransform: "uppercase" }}
              >РУ</button>
              <button
                onClick={() => { setLang("en"); setMenuOpen(false); }}
                style={{ flex: 1, padding: "12px", fontWeight: 700, fontSize: 13, border: "none", cursor: "pointer", background: lang === "en" ? "var(--ikea-yellow)" : "transparent", color: lang === "en" ? "var(--ikea-blue)" : "rgba(255,255,255,0.7)", fontFamily: "Noto Sans, sans-serif", letterSpacing: "0.06em", textTransform: "uppercase" }}
              >EN</button>
            </div>
          </div>
        )}
      </nav>

      {/* ── HERO — fullscreen, тёмный фон, один мощный акцент ── */}
      <section id="overview">
        <HeroSection scrollTo={scrollTo} lang={lang} />
      </section>

      {/* ── ПРОБЛЕМА — белый фон, максимум воздуха ── */}
      <section id="problem" style={{ background: "#fff", padding: "7rem 2.5rem" }}>
        <div className="section-inner">
          <ProblemSolution scrollTo={scrollTo} lang={lang} slideOnly="problem" />
        </div>
      </section>

      {/* ── РЕШЕНИЕ — светло-серый фон, контраст с предыдущим ── */}
      <section id="solution" style={{ background: "var(--ikea-off)", padding: "7rem 2.5rem" }}>
        <div className="section-inner">
          <ProblemSolution scrollTo={scrollTo} lang={lang} slideOnly="solution" />
        </div>
      </section>

      {/* ── ПРЕИМУЩЕСТВА — белый, сетка как у Apple Feature ── */}
      <AdvantagesSection lang={lang} />

      {/* ── ПРОЕКТ — светло-серый ── */}
      <ProjectSection lang={lang} />

      {/* ── ИНВЕСТИЦИИ И КОНТАКТЫ — синий финальный экран ── */}
      <InvestmentContacts lang={lang} />

    </div>
  );
}
