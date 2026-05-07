import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/icon";

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

interface HeroSectionProps {
  scrollTo: (id: string) => void;
}

export default function HeroSection({ scrollTo }: HeroSectionProps) {
  const { ref: statsRef, inView: statsInView } = useInView(0.3);

  return (
    <>
      {/* ── HERO ──────────────────────────────────── */}
      <section id="overview" className="hero-section">
        <div className="hero-bg" style={{ backgroundImage: `url(${HERO_IMAGE})` }} />
        <div className="hero-overlay" />
        <div className="hero-glow" />

        <div className="hero-content">
          <div className="hero-eyebrow">Индустриальный парк «Бородино» · г. Вязьма</div>
          <h1 className="hero-headline">
            Пока другие ждут свободные окна<br />
            на контрактных площадках —<br />
            <span className="hero-headline-accent">вы закрываете спрос<br />и забираете рынок.</span>
          </h1>
          <p className="hero-tagline">
            Производственный кластер безалкогольных напитков в алюминиевой банке с единым центром отгрузки для федеральных и региональных сетей · трасса М1
          </p>
          <div className="hero-actions">
            <button className="btn-primary" onClick={() => scrollTo("investment")}>
              Условия инвестирования
              <Icon name="ArrowRight" size={16} />
            </button>
            <button className="btn-outline" onClick={() => scrollTo("problem")}>
              Подробнее
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
          <StatCard value={7}   suffix=" Га"      label="Площадь площадки"        delay={0}   start={statsInView} />
          <StatCard value={3}   suffix=" млрд ₽"  label="Объём инвестиций"         delay={150} start={statsInView} />
          <StatCard value={250} suffix="+"         label="Рабочих мест"             delay={300} start={statsInView} />
          <StatCard value={60}  suffix=" тыс/ч"   label="Банок — мощность линии"   delay={450} start={statsInView} />
        </div>
      </section>
    </>
  );
}