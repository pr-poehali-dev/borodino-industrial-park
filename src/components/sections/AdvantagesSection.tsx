import { useRef, useEffect, useState } from "react";
import { t, Lang } from "@/lib/i18n";

const ADV_IMAGES = [
  "https://cdn.poehali.dev/projects/49f7a74d-a29e-4df6-a9ab-7c61c90787d1/files/0b77e9e1-d913-4ab1-9014-befcb7d48d58.jpg",
  "https://cdn.poehali.dev/projects/49f7a74d-a29e-4df6-a9ab-7c61c90787d1/files/ae814583-5ed4-40c9-ae98-d49ff7fb4dd5.jpg",
  "https://cdn.poehali.dev/projects/49f7a74d-a29e-4df6-a9ab-7c61c90787d1/files/f5a2de5f-4bb5-4ed9-83d5-ebe54d4019e5.jpg",
  "https://cdn.poehali.dev/projects/49f7a74d-a29e-4df6-a9ab-7c61c90787d1/files/a9f65b0e-5068-4060-9278-3bbbaf96bdb2.jpg",
  "https://cdn.poehali.dev/projects/49f7a74d-a29e-4df6-a9ab-7c61c90787d1/files/0b77e9e1-d913-4ab1-9014-befcb7d48d58.jpg",
  "https://cdn.poehali.dev/projects/49f7a74d-a29e-4df6-a9ab-7c61c90787d1/files/ae814583-5ed4-40c9-ae98-d49ff7fb4dd5.jpg",
];

function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

interface CardProps {
  index: number;
  title: string;
  desc?: string;
  image: string;
  delay: number;
  large?: boolean;
}

function AdvCard({ index, title, desc, image, delay, large }: CardProps) {
  const { ref, visible } = useReveal(0.08);
  return (
    <div
      ref={ref}
      className={`adv2-card${large ? " adv2-card--large" : ""}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(52px) scale(0.96)",
        transition: `opacity 0.95s cubic-bezier(0.25,0.46,0.45,0.94) ${delay}s, transform 0.95s cubic-bezier(0.25,0.46,0.45,0.94) ${delay}s`,
      }}
    >
      <div className="adv2-card-img" style={{ backgroundImage: `url(${image})` }} />
      <div className="adv2-card-overlay" />
      <div className="adv2-card-content">
        <div className="adv2-num">0{index + 1}</div>
        <div className="adv2-title">{title}</div>
        {desc && <div className="adv2-desc">{desc}</div>}
      </div>
    </div>
  );
}

interface AdvantagesSectionProps {
  lang: Lang;
}

export default function AdvantagesSection({ lang }: AdvantagesSectionProps) {
  const T = t[lang].advantages;
  const { ref: headerRef, visible: headerVisible } = useReveal(0.2);

  return (
    <section id="advantages" className="adv2-section">
      <div className="section-inner">
        <div
          ref={headerRef}
          className="adv2-header"
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "translateY(0)" : "translateY(36px)",
            transition: "opacity 0.9s cubic-bezier(0.25,0.46,0.45,0.94), transform 0.9s cubic-bezier(0.25,0.46,0.45,0.94)",
          }}
        >
          <div className="section-label">{T.sectionLabel}</div>
          <h2 className="adv2-section-title">
            {T.title.split("\n").map((line, i, arr) => (
              <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
            ))}
          </h2>
        </div>

        <div className="adv2-grid">
          {T.items.map((item, i) => (
            <AdvCard
              key={i}
              index={i}
              title={item.title}
              desc={"desc" in item ? (item.desc as string) : undefined}
              image={ADV_IMAGES[i % ADV_IMAGES.length]}
              delay={0.05 + i * 0.1}
              large={i === 0 || i === 3}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
