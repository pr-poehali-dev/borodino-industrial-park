import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/icon";
import { t, Lang } from "@/lib/i18n";

const HERO_IMAGE =
  "https://cdn.poehali.dev/projects/49f7a74d-a29e-4df6-a9ab-7c61c90787d1/bucket/ef9bd226-9fab-425b-a231-f03b59b2c000.png";

function useCounter(target: number, duration = 2200, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const p = Math.min((ts - startTime) / duration, 1);
      setCount(Math.floor((1 - Math.pow(1 - p, 4)) * target));
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

function useParallax() {
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const onScroll = () => setOffset(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return offset;
}

const STAT_VALUES = [7, 1, 35, 60];

function StatCard({ value, suffix, label, delay = 0, start }: {
  value: number; suffix: string; label: string; delay?: number; start: boolean;
}) {
  const count = useCounter(value, 2200, start);
  return (
    <div
      className="stat-card"
      style={{
        opacity: start ? 1 : 0,
        transform: start ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.8s ease ${delay}ms, transform 0.8s ease ${delay}ms`,
      }}
    >
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
  const [mounted, setMounted] = useState(false);
  const parallax = useParallax();
  const T = t[lang];

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <section id="overview" className="hero-section">
        <div
          className="hero-bg"
          style={{
            backgroundImage: `url(${HERO_IMAGE})`,
            transform: `translateY(${parallax * 0.25}px)`,
            transition: "transform 0.05s linear",
          }}
        />
        <div className="hero-overlay" />
        <div className="hero-glow" />

        <div className="hero-orbs">
          <div className="hero-orb hero-orb-1" />
          <div className="hero-orb hero-orb-2" />
          <div className="hero-orb hero-orb-3" />
        </div>

        <div className="hero-content">
          <div
            className="hero-eyebrow"
            style={{
              opacity: mounted ? 0.85 : 0,
              transform: mounted ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.9s cubic-bezier(0.25,0.46,0.45,0.94) 0.1s, transform 0.9s cubic-bezier(0.25,0.46,0.45,0.94) 0.1s",
            }}
          >
            {T.hero.eyebrow}
          </div>

          <h1
            className="hero-headline"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(36px)",
              transition: "opacity 1s cubic-bezier(0.25,0.46,0.45,0.94) 0.25s, transform 1s cubic-bezier(0.25,0.46,0.45,0.94) 0.25s",
            }}
          >
            {T.hero.headline1}<br />
            {T.hero.headline2}<br />
            <span className="hero-headline-accent">
              {T.hero.headlineAccent.split("\n").map((line, i, arr) => (
                <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
              ))}
            </span>
          </h1>

          <p
            className="hero-tagline"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(28px)",
              transition: "opacity 1s cubic-bezier(0.25,0.46,0.45,0.94) 0.45s, transform 1s cubic-bezier(0.25,0.46,0.45,0.94) 0.45s",
            }}
          >
            {T.hero.tagline}
          </p>

          <div
            className="hero-actions"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.9s cubic-bezier(0.25,0.46,0.45,0.94) 0.62s, transform 0.9s cubic-bezier(0.25,0.46,0.45,0.94) 0.62s",
            }}
          >
            <button className="btn-primary" onClick={() => scrollTo("investment")}>
              {T.hero.btnInvest}
              <Icon name="ArrowRight" size={16} />
            </button>
            <button className="btn-outline" onClick={() => scrollTo("problem")}>
              {T.hero.btnMore}
            </button>
          </div>
        </div>

        <div
          className="scroll-indicator"
          onClick={() => scrollTo("problem")}
          style={{
            opacity: mounted ? 1 : 0,
            transition: "opacity 1s ease 1.1s",
          }}
        >
          <Icon name="ChevronDown" size={24} />
        </div>
      </section>

      <section className="stats-section" ref={statsRef}>
        <div className="stats-grid">
          {T.stats.map((s, i) => (
            <StatCard key={i} value={STAT_VALUES[i]} suffix={s.suffix} label={s.label} delay={i * 130} start={statsInView} />
          ))}
        </div>
      </section>
    </>
  );
}
