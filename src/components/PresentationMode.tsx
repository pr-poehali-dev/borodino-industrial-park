import { useEffect, useRef, useCallback, useState } from "react";
import Icon from "@/components/ui/icon";
import HeroSection from "@/components/sections/HeroSection";
import ProblemSolution from "@/components/sections/ProblemSolution";
import AdvantagesSection from "@/components/sections/AdvantagesSection";
import ProjectSection from "@/components/sections/ProjectSection";
import InvestmentContacts from "@/components/sections/InvestmentContacts";
import CinematicSection from "@/components/sections/CinematicSection";
import { Lang } from "@/lib/i18n";

interface PresentationModeProps {
  lang: Lang;
  onExit: () => void;
}

const SLIDE_LABELS = [
  "Обзор",
  "Проблема",
  "Решение",
  "Преимущества",
  "Проект",
  "Производство",
  "Инвестиции",
  "Контакты",
];

const TOTAL = SLIDE_LABELS.length;
const LOCK_MS = 750;

export default function PresentationMode({ lang, onExit }: PresentationModeProps) {
  const [current, setCurrent] = useState(0);
  const lockRef = useRef(false);
  const touchStartY = useRef(0);
  const touchStartX = useRef(0);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Разблокировать reveal-элементы текущего слайда
  const revealSlide = useCallback((idx: number) => {
    const slide = slideRefs.current[idx];
    if (!slide) return;
    slide.querySelectorAll<HTMLElement>(".reveal").forEach((el) => {
      el.classList.add("visible");
    });
  }, []);

  const goTo = useCallback((idx: number) => {
    if (lockRef.current) return;
    if (idx < 0 || idx >= TOTAL) return;
    lockRef.current = true;
    setCurrent(idx);
    setTimeout(() => {
      lockRef.current = false;
      revealSlide(idx);
    }, LOCK_MS);
  }, [revealSlide]);

  const next = useCallback(() => goTo(current + 1), [goTo, current]);
  const prev = useCallback(() => goTo(current - 1), [goTo, current]);

  // Reveal первого слайда при монтировании
  useEffect(() => {
    setTimeout(() => revealSlide(0), 400);
  }, [revealSlide]);

  // Клавиатура + колесо — только если слайд не скроллится
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === " " || e.key === "PageDown") {
        e.preventDefault(); next();
      }
      if (e.key === "ArrowLeft" || e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault(); prev();
      }
      if (e.key === "Escape") onExit();
    };

    const onWheel = (e: WheelEvent) => {
      const slide = slideRefs.current[current];
      if (!slide) return;
      const atTop = slide.scrollTop <= 0;
      const atBottom = slide.scrollTop + slide.clientHeight >= slide.scrollHeight - 4;
      if (e.deltaY > 40 && atBottom) { e.preventDefault(); next(); }
      else if (e.deltaY < -40 && atTop) { e.preventDefault(); prev(); }
    };

    window.addEventListener("keydown", onKey);
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("wheel", onWheel);
    };
  }, [next, prev, current, onExit]);

  // Свайп по горизонтали (и вертикали если слайд не скроллится)
  useEffect(() => {
    const onTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
      touchStartX.current = e.touches[0].clientX;
    };
    const onTouchEnd = (e: TouchEvent) => {
      const dx = touchStartX.current - e.changedTouches[0].clientX;
      const dy = touchStartY.current - e.changedTouches[0].clientY;
      const slide = slideRefs.current[current];

      // Горизонтальный свайп главный
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
        if (dx > 0) next(); else prev();
        return;
      }
      // Вертикальный — только если слайд на краю
      if (Math.abs(dy) > 60 && slide) {
        const atTop = slide.scrollTop <= 0;
        const atBottom = slide.scrollTop + slide.clientHeight >= slide.scrollHeight - 4;
        if (dy > 0 && atBottom) next();
        else if (dy < 0 && atTop) prev();
      }
    };
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [next, prev, current]);

  const noop = () => {};

  return (
    <div className="pres-root">
      {/* Navbar */}
      <nav className="navbar" style={{ zIndex: 200 }}>
        <div className="navbar-inner">
          <div className="navbar-logo">
            <span style={{ fontFamily: "Georgia, serif", fontSize: 20, fontWeight: 700, letterSpacing: "0.08em", color: "var(--c-gold)" }}>
              БОРОДИНО
            </span>
          </div>
          {/* Название текущего слайда */}
          <div style={{
            flex: 1, textAlign: "center",
            fontSize: 12, fontWeight: 600, letterSpacing: "0.14em",
            textTransform: "uppercase", color: "rgba(245,245,247,0.4)"
          }}>
            {SLIDE_LABELS[current]}
          </div>
          {/* Счётчик + кнопка выхода */}
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span style={{ fontSize: 12, color: "rgba(245,245,247,0.35)", fontWeight: 600, letterSpacing: "0.04em" }}>
              {current + 1} / {TOTAL}
            </span>
            <button
              onClick={onExit}
              style={{
                background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 8, color: "var(--c-text2)", cursor: "pointer",
                padding: "5px 12px", fontSize: 12, fontWeight: 600,
                display: "flex", alignItems: "center", gap: 6, transition: "all 0.2s"
              }}
            >
              <Icon name="X" size={14} />
              {lang === "ru" ? "Выйти" : "Exit"}
            </button>
          </div>
        </div>
      </nav>

      {/* Слайды */}
      <div
        className="pres-track"
        style={{ transform: `translateY(calc(-${current} * 100vh))` }}
      >
        {/* Слайд 0 — Hero */}
        <div className="pres-slide" ref={el => { slideRefs.current[0] = el; }}>
          <div className="pres-slide-inner pres-slide--scrollable">
            <HeroSection scrollTo={noop} lang={lang} />
          </div>
        </div>

        {/* Слайд 1 — Проблема */}
        <div className="pres-slide pres-slide--scrollable" ref={el => { slideRefs.current[1] = el; }}>
          <div className="pres-slide-inner">
            <section className="content-section">
              <ProblemSolution scrollTo={noop} lang={lang} slideOnly="problem" />
            </section>
          </div>
        </div>

        {/* Слайд 2 — Решение */}
        <div className="pres-slide pres-slide--scrollable" ref={el => { slideRefs.current[2] = el; }}>
          <div className="pres-slide-inner">
            <section className="content-section">
              <ProblemSolution scrollTo={noop} lang={lang} slideOnly="solution" />
            </section>
          </div>
        </div>

        {/* Слайд 3 — Преимущества */}
        <div className="pres-slide pres-slide--scrollable" ref={el => { slideRefs.current[3] = el; }}>
          <div className="pres-slide-inner">
            <AdvantagesSection lang={lang} />
          </div>
        </div>

        {/* Слайд 4 — Проект */}
        <div className="pres-slide pres-slide--scrollable" ref={el => { slideRefs.current[4] = el; }}>
          <div className="pres-slide-inner">
            <ProjectSection lang={lang} />
          </div>
        </div>

        {/* Слайд 5 — Cinematic (производство) */}
        <div className="pres-slide" ref={el => { slideRefs.current[5] = el; }}>
          <CinematicSection />
        </div>

        {/* Слайд 6 — Инвестиции */}
        <div className="pres-slide pres-slide--scrollable" ref={el => { slideRefs.current[6] = el; }}>
          <div className="pres-slide-inner">
            <InvestmentContacts lang={lang} slideOnly="investment" />
          </div>
        </div>

        {/* Слайд 7 — Контакты */}
        <div className="pres-slide pres-slide--scrollable" ref={el => { slideRefs.current[7] = el; }}>
          <div className="pres-slide-inner">
            <InvestmentContacts lang={lang} slideOnly="contacts" />
          </div>
        </div>
      </div>

      {/* ── Кнопки снизу ── */}
      <div className="pres-bottom-nav">
        <button
          className="pres-bottom-btn"
          onClick={prev}
          disabled={current === 0}
        >
          <Icon name="ChevronLeft" size={20} />
          <span>{lang === "ru" ? "Назад" : "Prev"}</span>
        </button>

        {/* Прогресс-бар */}
        <div className="pres-progress-wrap">
          <div
            className="pres-progress-bar"
            style={{ width: `${((current + 1) / TOTAL) * 100}%` }}
          />
          <div className="pres-slide-dots">
            {SLIDE_LABELS.map((_, i) => (
              <button
                key={i}
                className={`pres-bottom-dot${i === current ? " pres-bottom-dot--active" : ""}`}
                onClick={() => goTo(i)}
                title={SLIDE_LABELS[i]}
              />
            ))}
          </div>
        </div>

        <button
          className="pres-bottom-btn"
          onClick={next}
          disabled={current === TOTAL - 1}
        >
          <span>{lang === "ru" ? "Далее" : "Next"}</span>
          <Icon name="ChevronRight" size={20} />
        </button>
      </div>
    </div>
  );
}
