import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/icon";
import { t, Lang } from "@/lib/i18n";

const HERO_IMAGE =
  "https://cdn.poehali.dev/projects/49f7a74d-a29e-4df6-a9ab-7c61c90787d1/bucket/ef9bd226-9fab-425b-a231-f03b59b2c000.png";

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

const STAT_VALUES = [7, 1, 35, 60];

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

interface HeroSectionProps {
  scrollTo: (id: string) => void;
  lang: Lang;
}

export default function HeroSection({ scrollTo, lang }: HeroSectionProps) {
  const { ref: statsRef, inView: statsInView } = useInView(0.3);
  const T = t[lang];

  return (
    <>
      {/* ── HERO ──────────────────────────────────── */}
      <section id="overview" className="hero-section">
        <div className="hero-bg" style={{ backgroundImage: `url(${HERO_IMAGE})` }} />
        <div className="hero-overlay" />
        <div className="hero-glow" />

        <div className="hero-content">
          <div className="hero-eyebrow">{T.hero.eyebrow}</div>
          <h1 className="hero-headline">
            {T.hero.headline1}<br />
            {T.hero.headline2}<br />
            <span className="hero-headline-accent">{T.hero.headlineAccent.split("\n").map((line, i, arr) => (
              <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
            ))}</span>
          </h1>
          <p className="hero-tagline">{T.hero.tagline}</p>
          <div className="hero-actions">
            <button className="btn-primary" onClick={() => scrollTo("investment")}>
              {T.hero.btnInvest}
              <Icon name="ArrowRight" size={16} />
            </button>
            <button className="btn-outline" onClick={() => scrollTo("problem")}>
              {T.hero.btnMore}
            </button>
          </div>
        </div>

        <div className="scroll-indicator" onClick={() => scrollTo("problem")}>
          <Icon name="ChevronDown" size={24} />
        </div>

        {/* Статистика встроена в hero-слайд */}
        <div className="hero-stats-inline" ref={statsRef}>
          {T.stats.map((s, i) => (
            <StatCard key={i} value={STAT_VALUES[i]} suffix={s.suffix} label={s.label} delay={i * 150} start={statsInView} />
          ))}
        </div>
      </section>
    </>
  );
}