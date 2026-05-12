import { useEffect, useRef, useCallback, useState } from "react";
import Icon from "@/components/ui/icon";
import { t, Lang } from "@/lib/i18n";

type IconName = string;

interface PresentationModeProps {
  lang: Lang;
  onExit: () => void;
}

const SLIDE_LABELS_RU = ["Обзор", "Проблема", "Амбиции", "Решение", "Преимущества", "Проект", "Инвестиции", "Контакты"];
const SLIDE_LABELS_EN = ["Overview", "Problem", "Ambitions", "Solution", "Advantages", "Project", "Investment", "Contacts"];
const TOTAL = SLIDE_LABELS_RU.length;
const LOCK_MS = 700;

const HERO_IMAGE = "https://cdn.poehali.dev/projects/49f7a74d-a29e-4df6-a9ab-7c61c90787d1/bucket/ef9bd226-9fab-425b-a231-f03b59b2c000.png";
const IMG_TOP    = "https://cdn.poehali.dev/projects/49f7a74d-a29e-4df6-a9ab-7c61c90787d1/bucket/30d64c4e-4fb7-414d-b9e0-18633d87b8bb.png";
const IMG_SIDE   = "https://cdn.poehali.dev/projects/49f7a74d-a29e-4df6-a9ab-7c61c90787d1/bucket/82506be1-dbc3-4b4c-9ebe-1789497c82fb.png";

/* ── Обёртка одного слайда ── */
function Slide({ children, bg }: { children: React.ReactNode; bg?: string }) {
  return (
    <div style={{
      width: "100vw", height: "100vh", flexShrink: 0,
      position: "relative", overflow: "hidden",
      background: bg || "var(--c-bg)",
      display: "flex", flexDirection: "column",
    }}>
      {children}
    </div>
  );
}

/* ── Верхняя метка секции ── */
function SlideLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      fontSize: 10, fontWeight: 700, letterSpacing: "0.2em",
      textTransform: "uppercase", color: "var(--c-gold)", opacity: 0.8,
      marginBottom: "0.5rem",
    }}>{children}</div>
  );
}

/* ── Заголовок слайда ── */
function SlideTitle({ children, size = "2.4rem" }: { children: React.ReactNode; size?: string }) {
  return (
    <h2 style={{
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      fontWeight: 800, fontSize: `clamp(1.4rem, ${size}, ${size})`,
      lineHeight: 1.08, letterSpacing: "-0.04em",
      color: "var(--c-text)", margin: "0 0 1rem",
    }}>{children}</h2>
  );
}

/* ── Золотой акцент в заголовке ── */
function GoldText({ children }: { children: React.ReactNode }) {
  return (
    <span style={{
      background: "linear-gradient(135deg, var(--c-gold3) 0%, var(--c-gold) 50%, var(--c-gold2) 100%)",
      WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
    }}>{children}</span>
  );
}

/* ── Мини-карточка ── */
function MiniCard({
  children, gold = false, red = false, green = false, style = {}
}: {
  children: React.ReactNode; gold?: boolean; red?: boolean; green?: boolean; style?: React.CSSProperties;
}) {
  const accent = gold ? "rgba(201,168,76,0.15)" : red ? "rgba(255,59,48,0.08)" : green ? "rgba(48,209,88,0.07)" : "rgba(255,255,255,0.04)";
  const border = gold ? "rgba(201,168,76,0.22)" : red ? "rgba(255,59,48,0.2)" : green ? "rgba(48,209,88,0.2)" : "rgba(255,255,255,0.07)";
  return (
    <div style={{
      background: accent, border: `1px solid ${border}`,
      borderRadius: 18, padding: "1rem 1.1rem",
      position: "relative", overflow: "hidden", ...style,
    }}>{children}</div>
  );
}

/* ── Иконка-плашка ── */
function IconBox({ name, gold = false }: { name: string; gold?: boolean }) {
  return (
    <div style={{
      width: 36, height: 36, borderRadius: 10, flexShrink: 0,
      background: gold ? "rgba(201,168,76,0.12)" : "rgba(255,255,255,0.06)",
      border: `1px solid ${gold ? "rgba(201,168,76,0.2)" : "rgba(255,255,255,0.08)"}`,
      display: "flex", alignItems: "center", justifyContent: "center",
      color: gold ? "var(--c-gold)" : "var(--c-text2)",
    }}>
      <Icon name={name as IconName} size={18} />
    </div>
  );
}

/* ════════════════════════════════════════════════ */
export default function PresentationMode({ lang, onExit }: PresentationModeProps) {
  const [current, setCurrent] = useState(0);
  const lockRef = useRef(false);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const T = t[lang];
  const LABELS = lang === "ru" ? SLIDE_LABELS_RU : SLIDE_LABELS_EN;

  const goTo = useCallback((idx: number) => {
    if (lockRef.current || idx < 0 || idx >= TOTAL) return;
    lockRef.current = true;
    setCurrent(idx);
    setTimeout(() => { lockRef.current = false; }, LOCK_MS);
  }, []);

  const next = useCallback(() => goTo(current + 1), [goTo, current]);
  const prev = useCallback(() => goTo(current - 1), [goTo, current]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (["ArrowRight","ArrowDown"," ","PageDown"].includes(e.key)) { e.preventDefault(); next(); }
      if (["ArrowLeft","ArrowUp","PageUp"].includes(e.key))          { e.preventDefault(); prev(); }
      if (e.key === "Escape") onExit();
    };
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (e.deltaY > 30) next(); else if (e.deltaY < -30) prev();
    };
    const onTS = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
    };
    const onTE = (e: TouchEvent) => {
      const dx = touchStartX.current - e.changedTouches[0].clientX;
      const dy = touchStartY.current - e.changedTouches[0].clientY;
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
        if (dx > 0) next(); else prev();
      } else if (Math.abs(dy) > 60) {
        if (dy > 0) next(); else prev();
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTS, { passive: true });
    window.addEventListener("touchend", onTE, { passive: true });
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTS);
      window.removeEventListener("touchend", onTE);
    };
  }, [next, prev, onExit]);

  const P = T.problem;
  const S = T.solution;
  const A = T.advantages;
  const Pr = T.project;
  const Inv = T.investment;
  const Con = T.contacts;

  /* ─── СЛАЙДЫ ─────────────────────────────────── */
  const slides = [

    /* 0 — HERO ──────────────────────────────────── */
    <Slide key={0}>
      {/* фоновая картинка */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `url(${HERO_IMAGE})`,
        backgroundSize: "cover", backgroundPosition: "center",
        opacity: 0.14,
      }} />
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse 80% 60% at 50% 30%, rgba(201,168,76,0.1) 0%, transparent 70%)",
      }} />
      <div style={{
        position: "relative", zIndex: 2,
        flex: 1, display: "flex", flexDirection: "column",
        justifyContent: "center", alignItems: "center",
        textAlign: "center", padding: "0 3rem",
      }}>
        <div style={{
          fontSize: 11, fontWeight: 600, letterSpacing: "0.22em",
          textTransform: "uppercase", color: "var(--c-gold)",
          opacity: 0.8, marginBottom: "1.25rem",
        }}>{T.hero.eyebrow}</div>
        <h1 style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontWeight: 800, fontSize: "clamp(2rem, 4.5vw, 3.8rem)",
          lineHeight: 1.08, letterSpacing: "-0.04em",
          color: "var(--c-text)", margin: "0 0 1.25rem", maxWidth: 900,
        }}>
          {T.hero.headline1}<br />
          {T.hero.headline2}<br />
          <GoldText>{T.hero.headlineAccent.replace("\n", " ")}</GoldText>
        </h1>
        <p style={{
          fontSize: "clamp(0.85rem, 1.4vw, 1rem)", color: "var(--c-text2)",
          maxWidth: 640, lineHeight: 1.65, marginBottom: "2.5rem",
        }}>{T.hero.tagline}</p>

        {/* Статы */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
          gap: "1px", background: "rgba(255,255,255,0.07)",
          borderRadius: 20, overflow: "hidden", width: "100%", maxWidth: 700,
        }}>
          {T.stats.map((s, i) => (
            <div key={i} style={{
              background: "rgba(255,255,255,0.03)", padding: "1rem",
              textAlign: "center",
            }}>
              <div style={{
                fontWeight: 800, fontSize: "1.8rem", letterSpacing: "-0.03em",
                background: "linear-gradient(135deg, var(--c-gold3) 0%, var(--c-gold) 50%, var(--c-gold2) 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              }}>
                {[7, 1, 35, 60][i]}<span style={{ fontSize: "1rem" }}>{s.suffix}</span>
              </div>
              <div style={{ fontSize: 11, color: "var(--c-text3)", marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </Slide>,

    /* 1 — ПРОБЛЕМА ──────────────────────────────── */
    <Slide key={1}>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "4.5rem 4rem 2rem" }}>
        <SlideLabel>{P.sectionLabel}</SlideLabel>
        <SlideTitle size="2.2rem">
          {P.title1}<br />
          <span style={{ color: "var(--c-red)" }}>{P.title2}</span>
        </SlideTitle>
        <p style={{ fontSize: "0.95rem", color: "var(--c-text2)", lineHeight: 1.6, marginBottom: "1.25rem", maxWidth: 680 }}>
          {P.lead}
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.6rem", marginBottom: "1rem" }}>
          {P.items.map((item, i) => (
            <MiniCard key={i} red>
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: "var(--c-red)", opacity: 0.7, minWidth: 20 }}>0{i + 1}</span>
                <span style={{ fontSize: "0.88rem", fontWeight: 600, color: "var(--c-text)", lineHeight: 1.35 }}>{item}</span>
              </div>
            </MiniCard>
          ))}
        </div>
        <div style={{
          display: "flex", alignItems: "flex-start", gap: "0.75rem",
          padding: "0.85rem 1.1rem", borderRadius: 14,
          background: "rgba(255,59,48,0.07)", border: "1.5px solid rgba(255,59,48,0.28)",
        }}>
          <span style={{ fontSize: "1.1rem" }}>⚠️</span>
          <span style={{ fontSize: "0.9rem", color: "var(--c-text)", lineHeight: 1.5 }}>
            <strong style={{ color: "var(--c-red)" }}>{P.dangerPrefix} </strong>{P.dangerText}
          </span>
        </div>
      </div>
    </Slide>,

    /* 2 — АМБИЦИИ ───────────────────────────────── */
    <Slide key={2}>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "4.5rem 4rem 2rem" }}>
        <SlideLabel>{P.ambitionsLabel}</SlideLabel>
        <SlideTitle size="2rem">Кто выигрывает от наличия<br />собственного производства?</SlideTitle>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "0.75rem", flex: 1, maxHeight: "50vh" }}>
          {P.ambitions.map((a, i) => (
            <MiniCard key={i} gold style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: "var(--c-gold)", opacity: 0.5, letterSpacing: "0.08em" }}>{a.num}</div>
              <span style={{ fontSize: "1.5rem", lineHeight: 1 }}>{a.emoji}</span>
              <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--c-text)", lineHeight: 1.35 }}>{a.title}</div>
              <div style={{ fontSize: "0.75rem", color: "var(--c-text2)", lineHeight: 1.4 }}>{a.desc}</div>
            </MiniCard>
          ))}
        </div>
      </div>
    </Slide>,

    /* 3 — РЕШЕНИЕ ───────────────────────────────── */
    <Slide key={3}>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "4.5rem 4rem 2rem" }}>
        <SlideLabel>{S.sectionLabel}</SlideLabel>
        <SlideTitle size="2rem">
          {S.title1} <GoldText>{S.title2}</GoldText>
        </SlideTitle>
        {/* Контраст */}
        <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1.1rem" }}>
          <MiniCard red style={{ flex: 1 }}>
            <div style={{ fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--c-red)", marginBottom: "0.4rem" }}>{S.negativeLabel}</div>
            <div style={{ fontSize: "0.82rem", color: "var(--c-text2)", lineHeight: 1.55 }}>
              {S.negativeText.split("\n").map((l, i) => <div key={i}>{l}</div>)}
            </div>
          </MiniCard>
          <div style={{ display: "flex", alignItems: "center", color: "rgba(255,255,255,0.2)", flexShrink: 0 }}>
            <Icon name="ArrowRight" size={22} />
          </div>
          <MiniCard gold style={{ flex: 1 }}>
            <div style={{ fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--c-gold)", marginBottom: "0.4rem" }}>{S.positiveLabel}</div>
            <div style={{ fontSize: "0.82rem", color: "var(--c-text)", lineHeight: 1.55 }}>
              {S.positiveText.split("\n").map((l, i) => <div key={i}>{l}</div>)}
            </div>
          </MiniCard>
        </div>
        {/* 6 карточек 3x2 */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.65rem" }}>
          {S.benefits.map((b, i) => (
            <MiniCard key={i} green={b.highlight} gold={!b.highlight}>
              <div style={{ display: "flex", gap: "0.6rem", alignItems: "flex-start" }}>
                <IconBox name={b.icon} gold={!b.highlight} />
                <div style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--c-text)", lineHeight: 1.4 }}>{b.title}</div>
              </div>
            </MiniCard>
          ))}
        </div>
      </div>
    </Slide>,

    /* 4 — ПРЕИМУЩЕСТВА ──────────────────────────── */
    <Slide key={4}>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "4.5rem 4rem 2rem" }}>
        <SlideLabel>{A.sectionLabel}</SlideLabel>
        <SlideTitle size="2rem">
          {A.title.split("\n")[0]}<br /><GoldText>{A.title.split("\n")[1]}</GoldText>
        </SlideTitle>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.85rem", flex: 1, maxHeight: "52vh" }}>
          {A.items.map((a, i) => (
            <MiniCard key={i} gold style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <IconBox name={a.icon} gold />
                <span style={{ fontSize: 11, fontWeight: 700, color: "var(--c-gold)", opacity: 0.4 }}>0{i + 1}</span>
              </div>
              <div>
                <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--c-text)", lineHeight: 1.4 }}>{a.title}</div>
                {"desc" in a && a.desc && (
                  <div style={{ fontSize: "0.75rem", color: "var(--c-text2)", marginTop: "0.25rem", lineHeight: 1.4 }}>{a.desc as string}</div>
                )}
              </div>
            </MiniCard>
          ))}
        </div>
      </div>
    </Slide>,

    /* 5 — ПРОЕКТ ────────────────────────────────── */
    <Slide key={5}>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "4.5rem 4rem 2rem" }}>
        <SlideLabel>{Pr.sectionLabel}</SlideLabel>
        <SlideTitle size="2rem">
          {Pr.title.split("\n")[0]} <GoldText>{Pr.title.split("\n")[1]}</GoldText>
        </SlideTitle>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", flex: 1 }}>
          {/* Левая — 2 фото */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <div style={{ flex: 1, borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)" }}>
              <img src={IMG_TOP} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </div>
            <div style={{ flex: 1, borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)" }}>
              <img src={IMG_SIDE} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </div>
          </div>
          {/* Правая — гео + флагман */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
            {Pr.geoItems.map((g, i) => (
              <MiniCard key={i} gold style={{ display: "flex", gap: "0.65rem", alignItems: "flex-start" }}>
                <IconBox name={g.icon} gold />
                <div>
                  <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--c-text)" }}>{g.title}</div>
                  <div style={{ fontSize: "0.75rem", color: "var(--c-text2)", lineHeight: 1.4 }}>{g.text}</div>
                </div>
              </MiniCard>
            ))}
            {/* Флагман */}
            <MiniCard gold style={{ marginTop: "0.25rem" }}>
              <div style={{ fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--c-gold)", marginBottom: "0.4rem" }}>{Pr.flagshipBadge}</div>
              <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--c-text)", marginBottom: "0.3rem" }}>{Pr.flagshipTitle}</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", marginTop: "0.35rem" }}>
                {Pr.flagshipTags.map((tag, i) => (
                  <span key={i} style={{ fontSize: 10, background: "rgba(201,168,76,0.1)", color: "var(--c-gold)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: 980, padding: "2px 8px" }}>{tag}</span>
                ))}
              </div>
            </MiniCard>
          </div>
        </div>
      </div>
    </Slide>,

    /* 6 — ИНВЕСТИЦИИ ────────────────────────────── */
    <Slide key={6}>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "4.5rem 4rem 2rem" }}>
        <SlideLabel>{Inv.sectionLabel}</SlideLabel>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", alignItems: "center" }}>
          {/* Левая — big number */}
          <div>
            <div style={{ fontSize: "0.85rem", color: "var(--c-text3)", marginBottom: "0.5rem" }}>{Inv.cardLabel}</div>
            <div style={{
              fontWeight: 800, fontSize: "clamp(3rem, 8vw, 5rem)",
              letterSpacing: "-0.05em", lineHeight: 1,
              background: "linear-gradient(135deg, var(--c-gold3) 0%, var(--c-gold) 50%, var(--c-gold2) 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              marginBottom: "1.5rem",
            }}>{Inv.bigNum}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {Inv.details.map((d, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: "0.6rem" }}>
                  <span style={{ fontSize: "0.85rem", color: "var(--c-text2)" }}>{d.label}</span>
                  <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--c-text)" }}>{d.val}</span>
                </div>
              ))}
            </div>
            {/* Партнёры */}
            <div style={{ marginTop: "1.25rem" }}>
              <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: "var(--c-gold)", opacity: 0.7, marginBottom: "0.6rem" }}>
                {Pr.contractsCol2Title}
              </div>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                {Pr.contractsPartners.map((p, i) => (
                  <div key={i} style={{ flex: 1, padding: "0.65rem 0.85rem", borderRadius: 12, background: "rgba(201,168,76,0.06)", border: "1px solid rgba(201,168,76,0.12)" }}>
                    <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--c-text)" }}>{p.name}</div>
                    <div style={{ fontSize: "0.72rem", color: "var(--c-text2)", lineHeight: 1.35, marginTop: 2 }}>{p.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Правая — метрики + инфра */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.65rem" }}>
              {Inv.metrics.map((m, i) => (
                <MiniCard key={i} gold style={{ textAlign: "center" }}>
                  <Icon name={m.icon as IconName} size={20} style={{ color: "var(--c-gold)", marginBottom: 4 }} />
                  <div style={{ fontWeight: 800, fontSize: "1.3rem", color: "var(--c-text)", letterSpacing: "-0.03em" }}>{m.val}</div>
                  <div style={{ fontSize: "0.7rem", color: "var(--c-text2)", marginTop: 2 }}>{m.label}</div>
                </MiniCard>
              ))}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.65rem" }}>
              {Inv.infraItems.map((it, i) => (
                <MiniCard key={i} style={{ textAlign: "center" }}>
                  <Icon name={it.icon as IconName} size={18} style={{ color: "var(--c-gold)", marginBottom: 4 }} />
                  <div style={{ fontWeight: 700, fontSize: "0.85rem", color: "var(--c-text)" }}>{it.val}</div>
                  <div style={{ fontSize: "0.68rem", color: "var(--c-text2)", marginTop: 2, lineHeight: 1.3 }}>{it.label}</div>
                </MiniCard>
              ))}
            </div>
            {/* Контракты подписаны */}
            <div style={{
              display: "flex", alignItems: "center", gap: "0.6rem",
              padding: "0.75rem 1rem", borderRadius: 14,
              background: "rgba(48,209,88,0.07)", border: "1px solid rgba(48,209,88,0.2)",
            }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--c-green)", flexShrink: 0 }} />
              <span style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--c-text)" }}>{Pr.contractsBadge}</span>
              <span style={{ fontSize: "0.75rem", color: "var(--c-text2)", marginLeft: "auto" }}>{Pr.contractsCol1Title}</span>
            </div>
          </div>
        </div>
      </div>
    </Slide>,

    /* 7 — КОНТАКТЫ ──────────────────────────────── */
    <Slide key={7}>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "4.5rem 4rem 2rem" }}>
        <SlideLabel>{Con.sectionLabel}</SlideLabel>
        <SlideTitle size="2.2rem">{Con.title}</SlideTitle>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", flex: 1, maxHeight: "58vh" }}>
          {/* Левая — контакты */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <a href="tel:89107600321" style={{ textDecoration: "none" }}>
              <MiniCard gold style={{ display: "flex", alignItems: "center", gap: "0.85rem", cursor: "pointer" }}>
                <IconBox name="Phone" gold />
                <div>
                  <div style={{ fontSize: 10, color: "var(--c-text3)", textTransform: "uppercase", letterSpacing: "0.1em" }}>{lang === "ru" ? "Позвонить" : "Call"}</div>
                  <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--c-text)" }}>8 910 760 03 21</div>
                </div>
              </MiniCard>
            </a>
            {[
              { icon: "MapPin", label: lang === "ru" ? "Адрес" : "Address", val: "Смоленская обл., г. Вязьма, трасса М1, д. Бородино" },
              { icon: "Calendar", label: lang === "ru" ? "Срок" : "Timeline", val: "1–2 года · I этап — 2026 г." },
              { icon: "Building2", label: lang === "ru" ? "Объект" : "Object", val: lang === "ru" ? "Индустриальный парк «Бородино»" : "Borodino Industrial Park" },
            ].map((c, i) => (
              <MiniCard key={i} style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                <IconBox name={c.icon} gold />
                <div>
                  <div style={{ fontSize: 10, color: "var(--c-text3)", textTransform: "uppercase", letterSpacing: "0.08em" }}>{c.label}</div>
                  <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--c-text)" }}>{c.val}</div>
                </div>
              </MiniCard>
            ))}
            <div style={{ marginTop: "auto", paddingTop: "0.5rem" }}>
              <a href="tel:89107600321" style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: "var(--c-gold)", color: "#000",
                border: "none", borderRadius: 980, padding: "10px 24px",
                fontWeight: 700, fontSize: "0.9rem", textDecoration: "none", cursor: "pointer",
              }}>
                <Icon name="Phone" size={15} />
                {lang === "ru" ? "Позвонить сейчас" : "Call now"}
              </a>
            </div>
          </div>
          {/* Правая — карта */}
          <div style={{ borderRadius: 18, overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)" }}>
            <iframe
              title="Карта"
              src="https://yandex.ru/map-widget/v1/?ll=55.2316,34.3093&z=12&pt=34.3093,55.2316,pm2rdl"
              width="100%" height="100%"
              frameBorder="0"
              style={{ border: 0, display: "block", minHeight: "100%" }}
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </Slide>,
  ];

  /* ─── RENDER ──────────────────────────────────── */
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 1000, background: "var(--c-bg)", overflow: "hidden" }}>

      {/* Navbar */}
      <nav className="navbar" style={{ zIndex: 200 }}>
        <div className="navbar-inner">
          <span style={{ fontFamily: "Georgia,serif", fontSize: 18, fontWeight: 700, letterSpacing: "0.08em", color: "var(--c-gold)" }}>
            БОРОДИНО
          </span>
          <div style={{ flex: 1, textAlign: "center", fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(245,245,247,0.35)" }}>
            {LABELS[current]}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 11, color: "rgba(245,245,247,0.3)", fontWeight: 600 }}>
              {current + 1} / {TOTAL}
            </span>
            <button onClick={onExit} style={{
              display: "flex", alignItems: "center", gap: 5,
              background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 8, color: "var(--c-text2)", cursor: "pointer",
              padding: "5px 12px", fontSize: 12, fontWeight: 600, fontFamily: "Inter,sans-serif",
            }}>
              <Icon name="X" size={13} />
              {lang === "ru" ? "Выйти" : "Exit"}
            </button>
          </div>
        </div>
      </nav>

      {/* Трек слайдов */}
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
        display: "flex", flexDirection: "column",
        transform: `translateY(calc(-${current} * 100vh))`,
        transition: "transform 0.75s cubic-bezier(0.77,0,0.175,1)",
        willChange: "transform",
      }}>
        {slides}
      </div>

      {/* Нижняя навигация */}
      <div className="pres-bottom-nav">
        <button className="pres-bottom-btn" onClick={prev} disabled={current === 0}>
          <Icon name="ChevronLeft" size={18} />
          <span>{lang === "ru" ? "Назад" : "Prev"}</span>
        </button>

        <div className="pres-progress-wrap">
          <div className="pres-progress-bar" style={{ width: `${((current + 1) / TOTAL) * 100}%` }} />
          <div className="pres-slide-dots">
            {LABELS.map((label, i) => (
              <button
                key={i}
                className={`pres-bottom-dot${i === current ? " pres-bottom-dot--active" : ""}`}
                onClick={() => goTo(i)}
                title={label}
              />
            ))}
          </div>
        </div>

        <button className="pres-bottom-btn" onClick={next} disabled={current === TOTAL - 1}>
          <span>{lang === "ru" ? "Далее" : "Next"}</span>
          <Icon name="ChevronRight" size={18} />
        </button>
      </div>
    </div>
  );
}
