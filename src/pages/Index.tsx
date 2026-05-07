import { useEffect, useState } from "react";
import Icon from "@/components/ui/icon";
import HeroSection from "@/components/sections/HeroSection";
import ProblemSolution from "@/components/sections/ProblemSolution";
import AdvantagesSection from "@/components/sections/AdvantagesSection";
import ProjectSection from "@/components/sections/ProjectSection";
import InvestmentContacts from "@/components/sections/InvestmentContacts";
import { useReveal } from "@/hooks/useReveal";
import { t, Lang } from "@/lib/i18n";

export default function Index() {
  useReveal();
  const [lang, setLang] = useState<Lang>("ru");
  const [activeSection, setActiveSection] = useState("overview");
  const [menuOpen, setMenuOpen] = useState(false);

  const T = t[lang];
  const navItems = [
    { id: "overview", label: T.nav.overview },
    { id: "problem", label: T.nav.problem },
    { id: "solution", label: T.nav.solution },
    { id: "advantages", label: T.nav.advantages },
    { id: "project", label: T.nav.project },
    { id: "investment", label: T.nav.investment },
    { id: "contacts", label: T.nav.contacts },
  ];

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
  }, [navItems]);

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
            {navItems.map((item) => (
              <button key={item.id}
                className={`nav-link ${activeSection === item.id ? "active" : ""}`}
                onClick={() => scrollTo(item.id)}>{item.label}</button>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ display: "flex", background: "rgba(0,0,0,0.06)", borderRadius: 8, overflow: "hidden", border: "1px solid rgba(0,0,0,0.1)" }}>
              <button
                onClick={() => setLang("ru")}
                style={{ padding: "5px 12px", fontSize: 13, fontWeight: 600, border: "none", cursor: "pointer", background: lang === "ru" ? "var(--gold, #C9A84C)" : "transparent", color: lang === "ru" ? "#fff" : "inherit", transition: "all 0.2s" }}
              >РУ</button>
              <button
                onClick={() => setLang("en")}
                style={{ padding: "5px 12px", fontSize: 13, fontWeight: 600, border: "none", cursor: "pointer", background: lang === "en" ? "var(--gold, #C9A84C)" : "transparent", color: lang === "en" ? "#fff" : "inherit", transition: "all 0.2s" }}
              >EN</button>
            </div>
            <a className="navbar-cta" href="tel:89107600321" style={{ textDecoration: "none" }}>8 910 760 03 21</a>
          </div>
          <button className="burger" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>
        {menuOpen && (
          <div className="mobile-menu">
            {navItems.map((item) => (
              <button key={item.id} className="mobile-link" onClick={() => scrollTo(item.id)}>{item.label}</button>
            ))}
            <div style={{ display: "flex", gap: 8, padding: "8px 0" }}>
              <button onClick={() => { setLang("ru"); setMenuOpen(false); }} style={{ flex: 1, padding: "8px", fontWeight: 600, border: "1px solid rgba(0,0,0,0.15)", borderRadius: 6, cursor: "pointer", background: lang === "ru" ? "var(--gold, #C9A84C)" : "transparent", color: lang === "ru" ? "#fff" : "inherit" }}>РУ</button>
              <button onClick={() => { setLang("en"); setMenuOpen(false); }} style={{ flex: 1, padding: "8px", fontWeight: 600, border: "1px solid rgba(0,0,0,0.15)", borderRadius: 6, cursor: "pointer", background: lang === "en" ? "var(--gold, #C9A84C)" : "transparent", color: lang === "en" ? "#fff" : "inherit" }}>EN</button>
            </div>
          </div>
        )}
      </nav>

      <HeroSection scrollTo={scrollTo} lang={lang} />
      <ProblemSolution scrollTo={scrollTo} lang={lang} />
      <AdvantagesSection lang={lang} />
      <ProjectSection lang={lang} />
      <InvestmentContacts lang={lang} />

    </div>
  );
}
