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
  { id: "overview", labelRu: "Обзор", labelEn: "Overview" },
  { id: "problem", labelRu: "Проблема", labelEn: "Problem" },
  { id: "solution", labelRu: "Решение", labelEn: "Solution" },
  { id: "advantages", labelRu: "Преимущества", labelEn: "Advantages" },
  { id: "project", labelRu: "Проект", labelEn: "Project" },
  { id: "investment", labelRu: "Инвестиции", labelEn: "Investment" },
  { id: "contacts", labelRu: "Контакты", labelEn: "Contacts" },
];

export default function Index() {
  useReveal();
  const [lang, setLang] = useState<Lang>("ru");
  const [menuOpen, setMenuOpen] = useState(false);
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

      {/* ── NAV ─────────────────────────────────── */}
      <nav className="navbar">
        <div className="navbar-inner">
          <div className="navbar-logo">
            <span style={{ fontFamily: "Georgia, serif", fontSize: 22, fontWeight: 700, letterSpacing: "0.08em", color: "var(--gold, #C9A84C)" }}>БОРОДИНО</span>
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
            <div style={{ display: "flex", background: "rgba(0,0,0,0.06)", borderRadius: 8, overflow: "hidden", border: "1px solid rgba(0,0,0,0.1)" }}>
              <button onClick={() => setLang("ru")} style={{ padding: "5px 12px", fontSize: 13, fontWeight: 600, border: "none", cursor: "pointer", background: lang === "ru" ? "var(--gold, #C9A84C)" : "transparent", color: lang === "ru" ? "#fff" : "inherit", transition: "all 0.2s" }}>РУ</button>
              <button onClick={() => setLang("en")} style={{ padding: "5px 12px", fontSize: 13, fontWeight: 600, border: "none", cursor: "pointer", background: lang === "en" ? "var(--gold, #C9A84C)" : "transparent", color: lang === "en" ? "#fff" : "inherit", transition: "all 0.2s" }}>EN</button>
            </div>
            <a className="navbar-cta" href="tel:89107600321" style={{ textDecoration: "none" }}>8 910 760 03 21</a>
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
            <div style={{ display: "flex", gap: 8, padding: "8px 0" }}>
              <button onClick={() => { setLang("ru"); setMenuOpen(false); }} style={{ flex: 1, padding: "8px", fontWeight: 600, border: "1px solid rgba(0,0,0,0.15)", borderRadius: 6, cursor: "pointer", background: lang === "ru" ? "var(--gold, #C9A84C)" : "transparent", color: lang === "ru" ? "#fff" : "inherit" }}>РУ</button>
              <button onClick={() => { setLang("en"); setMenuOpen(false); }} style={{ flex: 1, padding: "8px", fontWeight: 600, border: "1px solid rgba(0,0,0,0.15)", borderRadius: 6, cursor: "pointer", background: lang === "en" ? "var(--gold, #C9A84C)" : "transparent", color: lang === "en" ? "#fff" : "inherit" }}>EN</button>
            </div>
          </div>
        )}
      </nav>

      {/* ── CONTENT ─────────────────────────────── */}
      <HeroSection scrollTo={scrollTo} lang={lang} />

      <section id="problem" className="content-section">
        <ProblemSolution scrollTo={scrollTo} lang={lang} slideOnly="problem" />
      </section>

      <section id="solution" className="content-section">
        <ProblemSolution scrollTo={scrollTo} lang={lang} slideOnly="solution" />
      </section>

      <AdvantagesSection lang={lang} />

      <ProjectSection lang={lang} />

      <InvestmentContacts lang={lang} />

    </div>
  );
}
