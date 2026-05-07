import { useEffect, useState } from "react";
import Icon from "@/components/ui/icon";
import HeroSection from "@/components/sections/HeroSection";
import ProblemSolution from "@/components/sections/ProblemSolution";
import AdvantagesSection from "@/components/sections/AdvantagesSection";
import ProjectSection from "@/components/sections/ProjectSection";
import InvestmentContacts from "@/components/sections/InvestmentContacts";
import { useReveal } from "@/hooks/useReveal";

const navItems = [
  { id: "overview", label: "Обзор" },
  { id: "problem", label: "Проблема" },
  { id: "solution", label: "Решение" },
  { id: "advantages", label: "Преимущества" },
  { id: "project", label: "Проект" },
  { id: "investment", label: "Инвестиции" },
  { id: "contacts", label: "Контакты" },
];

export default function Index() {
  useReveal();
  const [activeSection, setActiveSection] = useState("overview");
  const [menuOpen, setMenuOpen] = useState(false);

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
            <span style={{ fontFamily: "Georgia, serif", fontSize: 22, fontWeight: 700, letterSpacing: "0.08em", color: "var(--gold, #C9A84C)" }}>БОРОДИНО</span>
          </div>
          <div className="navbar-links">
            {navItems.map((item) => (
              <button key={item.id}
                className={`nav-link ${activeSection === item.id ? "active" : ""}`}
                onClick={() => scrollTo(item.id)}>{item.label}</button>
            ))}
          </div>
          <a className="navbar-cta" href="tel:89107600321" style={{ textDecoration: "none" }}>8 910 760 03 21</a>
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

      <HeroSection scrollTo={scrollTo} />
      <ProblemSolution scrollTo={scrollTo} />
      <AdvantagesSection />
      <ProjectSection />
      <InvestmentContacts />

    </div>
  );
}