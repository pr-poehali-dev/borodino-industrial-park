import { useEffect, useState } from "react";
import Icon from "@/components/ui/icon";
import HeroSection from "@/components/sections/HeroSection";
import ProblemSolution from "@/components/sections/ProblemSolution";
import AdvantagesSection from "@/components/sections/AdvantagesSection";
import ProjectSection from "@/components/sections/ProjectSection";
import InvestmentContacts from "@/components/sections/InvestmentContacts";
import { useReveal } from "@/hooks/useReveal";
import { usePresentationScroll } from "@/hooks/usePresentationScroll";
import { t, Lang } from "@/lib/i18n";

const SLIDE_IDS = [
  "overview",
  "problem",
  "solution",
  "advantages",
  "project",
  "investment",
  "contacts",
];

const SLIDE_LABELS_RU = ["Обзор", "Проблема", "Решение", "Преимущества", "Проект", "Инвестиции", "Контакты"];
const SLIDE_LABELS_EN = ["Overview", "Problem", "Solution", "Advantages", "Project", "Investment", "Contacts"];

export default function Index() {
  useReveal();
  const [lang, setLang] = useState<Lang>("ru");
  const [menuOpen, setMenuOpen] = useState(false);
  const { current, goTo, direction } = usePresentationScroll(SLIDE_IDS.length);

  const T = t[lang];
  const slideLabels = lang === "ru" ? SLIDE_LABELS_RU : SLIDE_LABELS_EN;

  const scrollTo = (id: string) => {
    const idx = SLIDE_IDS.indexOf(id);
    if (idx !== -1) goTo(idx);
    setMenuOpen(false);
  };

  // Sync body overflow
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div className="app-root pres-root">

      {/* ── NAV ─────────────────────────────────── */}
      <nav className="navbar">
        <div className="navbar-inner">
          <div className="navbar-logo">
            <span style={{ fontFamily: "Georgia, serif", fontSize: 22, fontWeight: 700, letterSpacing: "0.08em", color: "var(--gold, #C9A84C)" }}>БОРОДИНО</span>
          </div>
          <div className="navbar-links">
            {SLIDE_IDS.map((id, idx) => (
              <button key={id}
                className={`nav-link ${current === idx ? "active" : ""}`}
                onClick={() => goTo(idx)}>{slideLabels[idx]}</button>
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
            {SLIDE_IDS.map((id, idx) => (
              <button key={id} className="mobile-link" onClick={() => scrollTo(id)}>{slideLabels[idx]}</button>
            ))}
            <div style={{ display: "flex", gap: 8, padding: "8px 0" }}>
              <button onClick={() => { setLang("ru"); setMenuOpen(false); }} style={{ flex: 1, padding: "8px", fontWeight: 600, border: "1px solid rgba(0,0,0,0.15)", borderRadius: 6, cursor: "pointer", background: lang === "ru" ? "var(--gold, #C9A84C)" : "transparent", color: lang === "ru" ? "#fff" : "inherit" }}>РУ</button>
              <button onClick={() => { setLang("en"); setMenuOpen(false); }} style={{ flex: 1, padding: "8px", fontWeight: 600, border: "1px solid rgba(0,0,0,0.15)", borderRadius: 6, cursor: "pointer", background: lang === "en" ? "var(--gold, #C9A84C)" : "transparent", color: lang === "en" ? "#fff" : "inherit" }}>EN</button>
            </div>
          </div>
        )}
      </nav>

      {/* ── SLIDES VIEWPORT ─────────────────────── */}
      <div className="pres-viewport">
        <div
          className="pres-track"
          style={{ transform: `translateY(${-current * 100}vh)` }}
        >
          {/* Slide 0 — Hero (overview) */}
          <div className={`pres-slide ${current === 0 ? "pres-slide--active" : ""}`} data-dir={direction}>
            <HeroSection scrollTo={scrollTo} lang={lang} />
          </div>

          {/* Slide 1 — Problem */}
          <div className={`pres-slide pres-slide--scrollable ${current === 1 ? "pres-slide--active" : ""}`} data-dir={direction}>
            <div className="pres-slide-inner">
              <section id="problem" className="content-section">
                <ProblemSolution scrollTo={scrollTo} lang={lang} slideOnly="problem" />
              </section>
            </div>
          </div>

          {/* Slide 2 — Solution */}
          <div className={`pres-slide pres-slide--scrollable ${current === 2 ? "pres-slide--active" : ""}`} data-dir={direction}>
            <div className="pres-slide-inner">
              <section id="solution" className="content-section blue-section">
                <ProblemSolution scrollTo={scrollTo} lang={lang} slideOnly="solution" />
              </section>
            </div>
          </div>

          {/* Slide 3 — Advantages */}
          <div className={`pres-slide pres-slide--scrollable ${current === 3 ? "pres-slide--active" : ""}`} data-dir={direction}>
            <div className="pres-slide-inner">
              <AdvantagesSection lang={lang} />
            </div>
          </div>

          {/* Slide 4 — Project */}
          <div className={`pres-slide pres-slide--scrollable ${current === 4 ? "pres-slide--active" : ""}`} data-dir={direction}>
            <div className="pres-slide-inner">
              <ProjectSection lang={lang} />
            </div>
          </div>

          {/* Slide 5 — Investment */}
          <div className={`pres-slide pres-slide--scrollable ${current === 5 ? "pres-slide--active" : ""}`} data-dir={direction}>
            <div className="pres-slide-inner">
              <InvestmentContacts lang={lang} slideOnly="investment" />
            </div>
          </div>

          {/* Slide 6 — Contacts */}
          <div className={`pres-slide pres-slide--scrollable ${current === 6 ? "pres-slide--active" : ""}`} data-dir={direction}>
            <div className="pres-slide-inner">
              <InvestmentContacts lang={lang} slideOnly="contacts" />
            </div>
          </div>
        </div>
      </div>

      {/* ── SLIDE DOTS ──────────────────────────── */}
      <div className="pres-dots">
        {SLIDE_IDS.map((_, idx) => (
          <button
            key={idx}
            className={`pres-dot ${current === idx ? "pres-dot--active" : ""}`}
            onClick={() => goTo(idx)}
            title={slideLabels[idx]}
          />
        ))}
      </div>

      {/* ── ARROW NAVIGATION ────────────────────── */}
      <div className="pres-arrows">
        <button className="pres-arrow pres-arrow--up" onClick={() => goTo(current - 1)} disabled={current === 0}>
          <Icon name="ChevronUp" size={20} />
        </button>
        <div className="pres-slide-counter">{current + 1} / {SLIDE_IDS.length}</div>
        <button className="pres-arrow pres-arrow--down" onClick={() => goTo(current + 1)} disabled={current === SLIDE_IDS.length - 1}>
          <Icon name="ChevronDown" size={20} />
        </button>
      </div>

    </div>
  );
}
