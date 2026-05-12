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

/* ── Обёртка слайда ── */
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

/* ── Метка секции ── */
function SlideLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      fontSize: 12, fontWeight: 700, letterSpacing: "0.2em",
      textTransform: "uppercase", color: "var(--c-gold)", opacity: 0.85,
      marginBottom: "0.6rem",
    }}>{children}</div>
  );
}

/* ── Заголовок слайда ── */
function SlideTitle({ children, size = "2.9rem" }: { children: React.ReactNode; size?: string }) {
  return (
    <h2 style={{
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      fontWeight: 800, fontSize: size,
      lineHeight: 1.08, letterSpacing: "-0.04em",
      color: "var(--c-text)", margin: "0 0 1.1rem",
    }}>{children}</h2>
  );
}

/* ── Золотой акцент ── */
function GoldText({ children }: { children: React.ReactNode }) {
  return (
    <span style={{
      background: "linear-gradient(135deg, var(--c-gold3) 0%, var(--c-gold) 50%, var(--c-gold2) 100%)",
      WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
    }}>{children}</span>
  );
}

/* ── Карточка ── */
function Card({
  children, gold = false, red = false, green = false, style = {}
}: {
  children: React.ReactNode; gold?: boolean; red?: boolean; green?: boolean; style?: React.CSSProperties;
}) {
  const bg  = gold ? "rgba(138,98,32,0.07)" : red ? "rgba(217,48,37,0.06)" : green ? "rgba(26,158,58,0.06)" : "rgba(0,0,0,0.03)";
  const bdr = gold ? "rgba(138,98,32,0.22)" : red ? "rgba(217,48,37,0.2)"  : green ? "rgba(26,158,58,0.2)"  : "rgba(0,0,0,0.09)";
  return (
    <div style={{ background: bg, border: `1px solid ${bdr}`, borderRadius: 18, padding: "1rem 1.25rem", position: "relative", overflow: "hidden", ...style }}>
      {children}
    </div>
  );
}

/* ── Иконка-блок ── */
function IconBox({ name, gold = false, size = 22 }: { name: string; gold?: boolean; size?: number }) {
  return (
    <div style={{
      width: 44, height: 44, borderRadius: 12, flexShrink: 0,
      background: gold ? "rgba(138,98,32,0.1)" : "rgba(0,0,0,0.05)",
      border: `1px solid ${gold ? "rgba(138,98,32,0.22)" : "rgba(0,0,0,0.1)"}`,
      display: "flex", alignItems: "center", justifyContent: "center",
      color: gold ? "var(--c-gold)" : "var(--c-text2)",
    }}>
      <Icon name={name as IconName} size={size} />
    </div>
  );
}

/* ════════════════════════════════════════════════ */
export default function PresentationMode({ lang, onExit }: PresentationModeProps) {
  const [current, setCurrent] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  const lockRef = useRef(false);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const T = t[lang];
  const LABELS = lang === "ru" ? SLIDE_LABELS_RU : SLIDE_LABELS_EN;

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

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

  const P   = T.problem;
  const S   = T.solution;
  const A   = T.advantages;
  const Pr  = T.project;
  const Inv = T.investment;
  const Con = T.contacts;

  const sp = isMobile ? "3.5rem 1rem 4.5rem" : "4rem 5rem 3rem";
  const titleSize = isMobile ? "1.8rem" : "2.9rem";

  /* ─── СЛАЙДЫ ────────────────────────────────── */
  const slides = [

    /* 0 — HERO */
    <Slide key={0}>
      <div style={{ position:"absolute", inset:0, backgroundImage:`url(${HERO_IMAGE})`, backgroundSize:"cover", backgroundPosition:"center", opacity:0.08 }} />
      <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse 80% 60% at 50% 30%, rgba(138,98,32,0.08) 0%, transparent 70%)" }} />
      <div style={{ position:"relative", zIndex:2, flex:1, display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", textAlign:"center", padding: isMobile ? "4rem 1.25rem" : "0 4rem" }}>

        <div style={{ fontSize:isMobile?11:13, fontWeight:700, letterSpacing:"0.22em", textTransform:"uppercase", color:"var(--c-gold)", opacity:0.85, marginBottom:"1rem" }}>
          {T.hero.eyebrow}
        </div>

        <h1 style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:800, fontSize: isMobile ? "clamp(1.6rem, 8vw, 2.4rem)" : "clamp(2.75rem, 4.5vw, 3.4rem)", lineHeight:1.08, letterSpacing:"-0.04em", color:"var(--c-text)", margin:"0 0 1rem", maxWidth:960 }}>
          {T.hero.headline1}<br />
          {T.hero.headline2}<br />
          <GoldText>{T.hero.headlineAccent.replace("\n", " ")}</GoldText>
        </h1>

        <p style={{ fontSize: isMobile ? "1rem" : "1.55rem", color:"var(--c-text2)", maxWidth:680, lineHeight:1.55, marginBottom: isMobile ? "1.5rem" : "3rem" }}>
          {T.hero.tagline}
        </p>

        <div style={{ display:"grid", gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)", gap:"1px", background:"rgba(0,0,0,0.07)", borderRadius:20, overflow:"hidden", width:"100%", maxWidth:760 }}>
          {T.stats.map((s, i) => (
            <div key={i} style={{ background:"rgba(255,255,255,0.6)", padding: isMobile ? "0.85rem 0.5rem" : "1.25rem 1rem", textAlign:"center" }}>
              <div style={{ fontWeight:800, fontSize: isMobile ? "1.6rem" : "2.4rem", letterSpacing:"-0.03em", background:"linear-gradient(135deg, var(--c-gold3) 0%, var(--c-gold) 50%, var(--c-gold2) 100%)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
                {[7,1,35,60][i]}<span style={{ fontSize: isMobile ? "1rem" : "1.4rem" }}>{s.suffix}</span>
              </div>
              <div style={{ fontSize: isMobile ? "0.7rem" : "1rem", color:"var(--c-text3)", marginTop:4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </Slide>,

    /* 1 — ПРОБЛЕМА */
    <Slide key={1}>
      <div style={{ flex:1, display:"flex", flexDirection:"column", justifyContent:"center", padding:sp, overflowY: isMobile ? "auto" : "hidden" }}>
        <SlideLabel>{P.sectionLabel}</SlideLabel>
        <SlideTitle size={titleSize}>
          {P.title1}<br />
          <span style={{ color:"var(--c-red)" }}>{P.title2}</span>
        </SlideTitle>

        <p style={{ fontSize: isMobile ? "0.9rem" : "1.5rem", color:"var(--c-text2)", lineHeight:1.55, marginBottom:"1rem", maxWidth:780 }}>
          {P.lead}
        </p>

        <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap:"0.6rem", marginBottom:"0.85rem" }}>
          {P.items.map((item, i) => (
            <Card key={i} red>
              <div style={{ display:"flex", alignItems:"center", gap:"0.6rem" }}>
                <span style={{ fontSize:12, fontWeight:700, color:"var(--c-red)", opacity:0.7, minWidth:20 }}>0{i+1}</span>
                <span style={{ fontSize: isMobile ? "0.85rem" : "1.5rem", fontWeight:600, color:"var(--c-text)", lineHeight:1.35 }}>{item}</span>
              </div>
            </Card>
          ))}
        </div>

        <div style={{ display:"flex", alignItems:"flex-start", gap:"0.75rem", padding:"0.85rem 1rem", borderRadius:14, background:"rgba(217,48,37,0.06)", border:"1.5px solid rgba(217,48,37,0.25)" }}>
          <span style={{ fontSize:"1.3rem" }}>⚠️</span>
          <span style={{ fontSize: isMobile ? "0.85rem" : "1.5rem", color:"var(--c-text)", lineHeight:1.5 }}>
            <strong style={{ color:"var(--c-red)" }}>{P.dangerPrefix} </strong>{P.dangerText}
          </span>
        </div>
      </div>
    </Slide>,

    /* 2 — АМБИЦИИ */
    <Slide key={2}>
      <div style={{ flex:1, display:"flex", flexDirection:"column", justifyContent:"center", padding:sp, overflowY: isMobile ? "auto" : "hidden" }}>
        <SlideLabel>{P.ambitionsLabel}</SlideLabel>
        <SlideTitle size={titleSize}>Кто выигрывает от наличия<br />собственного производства?</SlideTitle>

        <div style={{ display:"grid", gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(5, 1fr)", gap:"0.65rem", flex:1, maxHeight: isMobile ? "none" : "52vh" }}>
          {P.ambitions.map((a, i) => (
            <Card key={i} gold style={{ display:"flex", flexDirection:"column", gap:"0.4rem" }}>
              <div style={{ fontSize:11, fontWeight:700, color:"var(--c-gold)", opacity:0.5, letterSpacing:"0.08em" }}>{a.num}</div>
              <span style={{ fontSize: isMobile ? "1.4rem" : "2rem", lineHeight:1 }}>{a.emoji}</span>
              <div style={{ fontSize: isMobile ? "0.85rem" : "1.5rem", fontWeight:700, color:"var(--c-text)", lineHeight:1.35 }}>{a.title}</div>
              {!isMobile && <div style={{ fontSize:"1.2rem", color:"var(--c-text2)", lineHeight:1.45 }}>{a.desc}</div>}
            </Card>
          ))}
        </div>
      </div>
    </Slide>,

    /* 3 — РЕШЕНИЕ */
    <Slide key={3}>
      <div style={{ flex:1, display:"flex", flexDirection:"column", justifyContent:"center", padding:sp, overflowY: isMobile ? "auto" : "hidden" }}>
        <SlideLabel>{S.sectionLabel}</SlideLabel>
        <SlideTitle size={titleSize}>
          {S.title1} <GoldText>{S.title2}</GoldText>
        </SlideTitle>

        <div style={{ display:"flex", flexDirection: isMobile ? "column" : "row", gap:"0.7rem", marginBottom:"0.85rem" }}>
          <Card red style={{ flex:1 }}>
            <div style={{ fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.1em", color:"var(--c-red)", marginBottom:"0.4rem" }}>{S.negativeLabel}</div>
            <div style={{ fontSize: isMobile ? "0.85rem" : "1.5rem", color:"var(--c-text2)", lineHeight:1.5 }}>
              {S.negativeText.split("\n").map((l, i) => <div key={i}>{l}</div>)}
            </div>
          </Card>
          {!isMobile && <div style={{ display:"flex", alignItems:"center", color:"rgba(0,0,0,0.2)", flexShrink:0, padding:"0 0.25rem" }}>
            <Icon name="ArrowRight" size={32} />
          </div>}
          <Card gold style={{ flex:1 }}>
            <div style={{ fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.1em", color:"var(--c-gold)", marginBottom:"0.4rem" }}>{S.positiveLabel}</div>
            <div style={{ fontSize: isMobile ? "0.85rem" : "1.5rem", color:"var(--c-text)", lineHeight:1.5 }}>
              {S.positiveText.split("\n").map((l, i) => <div key={i}>{l}</div>)}
            </div>
          </Card>
        </div>

        <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap:"0.6rem" }}>
          {S.benefits.map((b, i) => (
            <Card key={i} green={b.highlight} gold={!b.highlight}>
              <div style={{ display:"flex", gap:"0.65rem", alignItems:"flex-start" }}>
                <IconBox name={b.icon} gold={!b.highlight} />
                <div style={{ fontSize: isMobile ? "0.85rem" : "1.5rem", fontWeight:600, color:"var(--c-text)", lineHeight:1.4 }}>{b.title}</div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Slide>,

    /* 4 — ПРЕИМУЩЕСТВА */
    <Slide key={4}>
      <div style={{ flex:1, display:"flex", flexDirection:"column", justifyContent:"center", padding:sp, overflowY: isMobile ? "auto" : "hidden" }}>
        <SlideLabel>{A.sectionLabel}</SlideLabel>
        <SlideTitle size={titleSize}>
          {A.title.split("\n")[0]}<br /><GoldText>{A.title.split("\n")[1]}</GoldText>
        </SlideTitle>

        <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap:"0.7rem", flex:1, maxHeight: isMobile ? "none" : "54vh" }}>
          {A.items.map((a, i) => (
            <Card key={i} gold style={{ display:"flex", flexDirection:"column", gap:"0.65rem" }}>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                <IconBox name={a.icon} gold size={22} />
                <span style={{ fontSize:12, fontWeight:700, color:"var(--c-gold)", opacity:0.4 }}>0{i+1}</span>
              </div>
              <div>
                <div style={{ fontSize: isMobile ? "1rem" : "1.85rem", fontWeight:700, color:"var(--c-text)", lineHeight:1.3 }}>{a.title}</div>
                {"desc" in a && a.desc && (
                  <div style={{ fontSize: isMobile ? "0.8rem" : "1.5rem", color:"var(--c-text2)", marginTop:"0.3rem", lineHeight:1.4 }}>{a.desc as string}</div>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Slide>,

    /* 5 — ПРОЕКТ */
    <Slide key={5}>
      <div style={{ flex:1, display:"flex", flexDirection:"column", padding:sp, overflowY: isMobile ? "auto" : "hidden" }}>
        <SlideLabel>{Pr.sectionLabel}</SlideLabel>
        <SlideTitle size={titleSize}>
          {Pr.title.split("\n")[0]} <GoldText>{Pr.title.split("\n")[1]}</GoldText>
        </SlideTitle>

        <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap:"0.85rem", flex:1 }}>
          {/* Фото */}
          {!isMobile && (
            <div style={{ display:"flex", flexDirection:"column", gap:"0.75rem" }}>
              <div style={{ flex:1, borderRadius:16, overflow:"hidden", border:"1px solid rgba(255,255,255,0.08)", maxHeight:200 }}>
                <img src={IMG_TOP} alt="" style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} />
              </div>
              <div style={{ flex:1, borderRadius:16, overflow:"hidden", border:"1px solid rgba(255,255,255,0.08)", maxHeight:200 }}>
                <img src={IMG_SIDE} alt="" style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} />
              </div>
            </div>
          )}

          {/* Гео + флагман */}
          <div style={{ display:"flex", flexDirection:"column", gap:"0.6rem" }}>
            {Pr.geoItems.map((g, i) => (
              <Card key={i} gold style={{ display:"flex", gap:"0.65rem", alignItems:"flex-start" }}>
                <IconBox name={g.icon} gold size={20} />
                <div>
                  <div style={{ fontSize: isMobile ? "0.9rem" : "1.85rem", fontWeight:700, color:"var(--c-text)" }}>{g.title}</div>
                  <div style={{ fontSize: isMobile ? "0.8rem" : "1.5rem", color:"var(--c-text2)", lineHeight:1.45 }}>{g.text}</div>
                </div>
              </Card>
            ))}
            <Card gold>
              <div style={{ fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.12em", color:"var(--c-gold)", marginBottom:"0.35rem" }}>{Pr.flagshipBadge}</div>
              <div style={{ fontSize: isMobile ? "0.9rem" : "1.85rem", fontWeight:700, color:"var(--c-text)", marginBottom:"0.35rem" }}>{Pr.flagshipTitle}</div>
              <div style={{ display:"flex", flexWrap:"wrap", gap:"0.3rem" }}>
                {Pr.flagshipTags.map((tag, i) => (
                  <span key={i} style={{ fontSize:11, background:"rgba(201,168,76,0.1)", color:"var(--c-gold)", border:"1px solid rgba(201,168,76,0.22)", borderRadius:980, padding:"2px 8px" }}>{tag}</span>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Slide>,

    /* 6 — ИНВЕСТИЦИИ */
    <Slide key={6}>
      <div style={{ flex:1, display:"flex", flexDirection:"column", justifyContent:"center", padding:sp, overflowY: isMobile ? "auto" : "hidden" }}>
        <SlideLabel>{Inv.sectionLabel}</SlideLabel>

        <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? "1rem" : "3rem", alignItems:"center" }}>
          {/* Левая */}
          <div>
            <div style={{ fontSize: isMobile ? "0.8rem" : "1.5rem", color:"var(--c-text3)", marginBottom:"0.4rem" }}>{Inv.cardLabel}</div>
            <div style={{ fontWeight:800, fontSize: isMobile ? "clamp(2rem, 10vw, 3rem)" : "clamp(3.2rem, 7vw, 5.5rem)", letterSpacing:"-0.05em", lineHeight:1, background:"linear-gradient(135deg, var(--c-gold3) 0%, var(--c-gold) 50%, var(--c-gold2) 100%)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text", marginBottom: isMobile ? "0.85rem" : "1.75rem" }}>
              {Inv.bigNum}
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:"0.5rem", marginBottom: isMobile ? "0.85rem" : "1.5rem" }}>
              {Inv.details.map((d, i) => (
                <div key={i} style={{ display:"flex", justifyContent:"space-between", borderBottom:"1px solid rgba(0,0,0,0.07)", paddingBottom:"0.5rem" }}>
                  <span style={{ fontSize: isMobile ? "0.8rem" : "1.5rem", color:"var(--c-text2)" }}>{d.label}</span>
                  <span style={{ fontSize: isMobile ? "0.8rem" : "1.5rem", fontWeight:700, color:"var(--c-text)" }}>{d.val}</span>
                </div>
              ))}
            </div>
            {!isMobile && <>
              <div style={{ fontSize:13, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.14em", color:"var(--c-gold)", opacity:0.75, marginBottom:"0.65rem" }}>{Pr.contractsCol2Title}</div>
              <div style={{ display:"flex", gap:"0.6rem" }}>
                {Pr.contractsPartners.map((p, i) => (
                  <div key={i} style={{ flex:1, padding:"0.75rem 1rem", borderRadius:14, background:"rgba(138,98,32,0.07)", border:"1px solid rgba(138,98,32,0.15)" }}>
                    <div style={{ fontSize:"1.5rem", fontWeight:700, color:"var(--c-text)" }}>{p.name}</div>
                    <div style={{ fontSize:"1.2rem", color:"var(--c-text2)", lineHeight:1.4, marginTop:3 }}>{p.desc}</div>
                  </div>
                ))}
              </div>
            </>}
          </div>

          {/* Правая */}
          <div style={{ display:"flex", flexDirection:"column", gap:"0.6rem" }}>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:"0.6rem" }}>
              {Inv.metrics.map((m, i) => (
                <Card key={i} gold style={{ textAlign:"center", padding: isMobile ? "0.65rem 0.5rem" : "1.1rem" }}>
                  <div style={{ color:"var(--c-gold)", marginBottom:4 }}>
                    <Icon name={m.icon as IconName} size={isMobile ? 18 : 26} />
                  </div>
                  <div style={{ fontWeight:800, fontSize: isMobile ? "1rem" : "1.85rem", color:"var(--c-text)", letterSpacing:"-0.03em" }}>{m.val}</div>
                  <div style={{ fontSize: isMobile ? "0.65rem" : "1.2rem", color:"var(--c-text2)", marginTop:2 }}>{m.label}</div>
                </Card>
              ))}
            </div>
            {!isMobile && (
              <div style={{ display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:"0.7rem" }}>
                {Inv.infraItems.map((it, i) => (
                  <Card key={i} style={{ textAlign:"center", padding:"1rem" }}>
                    <div style={{ color:"var(--c-gold)", marginBottom:5 }}>
                      <Icon name={it.icon as IconName} size={24} />
                    </div>
                    <div style={{ fontWeight:700, fontSize:"1.5rem", color:"var(--c-text)" }}>{it.val}</div>
                    <div style={{ fontSize:"1.1rem", color:"var(--c-text2)", marginTop:3, lineHeight:1.3 }}>{it.label}</div>
                  </Card>
                ))}
              </div>
            )}
            <div style={{ display:"flex", alignItems:"center", gap:"0.6rem", padding:"0.7rem 0.9rem", borderRadius:14, background:"rgba(26,158,58,0.07)", border:"1px solid rgba(26,158,58,0.22)" }}>
              <div style={{ width:8, height:8, borderRadius:"50%", background:"var(--c-green)", flexShrink:0 }} />
              <span style={{ fontSize: isMobile ? "0.8rem" : "1.5rem", fontWeight:600, color:"var(--c-text)" }}>{Pr.contractsBadge}</span>
            </div>
          </div>
        </div>
      </div>
    </Slide>,

    /* 7 — КОНТАКТЫ */
    <Slide key={7}>
      <div style={{ flex:1, display:"flex", flexDirection:"column", justifyContent:"center", padding:sp, overflowY: isMobile ? "auto" : "hidden" }}>
        <SlideLabel>{Con.sectionLabel}</SlideLabel>
        <SlideTitle size={titleSize}>{Con.title}</SlideTitle>

        <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap:"1rem", flex:1, maxHeight: isMobile ? "none" : "60vh" }}>
          {/* Контакты */}
          <div style={{ display:"flex", flexDirection:"column", gap:"0.6rem" }}>
            <a href="tel:89107600321" style={{ textDecoration:"none" }}>
              <Card gold style={{ display:"flex", alignItems:"center", gap:"0.75rem", cursor:"pointer" }}>
                <IconBox name="Phone" gold size={20} />
                <div>
                  <div style={{ fontSize:11, color:"var(--c-text3)", textTransform:"uppercase", letterSpacing:"0.1em" }}>{lang === "ru" ? "Позвонить" : "Call"}</div>
                  <div style={{ fontSize: isMobile ? "1.1rem" : "1.85rem", fontWeight:700, color:"var(--c-text)" }}>8 910 760 03 21</div>
                </div>
              </Card>
            </a>
            {[
              { icon:"MapPin",   label: lang==="ru" ? "Адрес"  : "Address",  val: "Смоленская обл., г. Вязьма, трасса М1, д. Бородино" },
              { icon:"Calendar", label: lang==="ru" ? "Срок"   : "Timeline", val: "1–2 года · I этап — 2026 г." },
              { icon:"Building2",label: lang==="ru" ? "Объект" : "Object",   val: lang==="ru" ? "Индустриальный парк «Бородино»" : "Borodino Industrial Park" },
            ].map((c, i) => (
              <Card key={i} style={{ display:"flex", gap:"0.65rem", alignItems:"center" }}>
                <IconBox name={c.icon} gold size={18} />
                <div>
                  <div style={{ fontSize:11, color:"var(--c-text3)", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:1 }}>{c.label}</div>
                  <div style={{ fontSize: isMobile ? "0.8rem" : "1.5rem", fontWeight:600, color:"var(--c-text)" }}>{c.val}</div>
                </div>
              </Card>
            ))}
            <div>
              <a href="tel:89107600321" style={{ display:"inline-flex", alignItems:"center", gap:8, background:"var(--c-gold)", color:"#000", borderRadius:980, padding: isMobile ? "10px 22px" : "14px 32px", fontWeight:700, fontSize: isMobile ? "1rem" : "1.5rem", textDecoration:"none", cursor:"pointer" }}>
                <Icon name="Phone" size={16} />
                {lang === "ru" ? "Позвонить сейчас" : "Call now"}
              </a>
            </div>
          </div>

          {/* Карта */}
          {!isMobile && (
            <div style={{ borderRadius:18, overflow:"hidden", border:"1px solid rgba(255,255,255,0.08)" }}>
              <iframe
                title="Карта"
                src="https://yandex.ru/map-widget/v1/?ll=55.2316,34.3093&z=12&pt=34.3093,55.2316,pm2rdl"
                width="100%" height="100%"
                frameBorder="0"
                style={{ border:0, display:"block", minHeight:"100%" }}
                allowFullScreen
              />
            </div>
          )}
        </div>
      </div>
    </Slide>,
  ];

  /* ─── RENDER ─────────────────────────────────── */
  return (
    <div style={{ position:"fixed", inset:0, zIndex:1000, background:"var(--c-bg)", overflow:"hidden" }}>

      {/* Navbar */}
      <nav className="navbar" style={{ zIndex:200 }}>
        <div className="navbar-inner">
          <span style={{ fontFamily:"Georgia,serif", fontSize:18, fontWeight:700, letterSpacing:"0.08em", color:"var(--c-gold)" }}>БОРОДИНО</span>
          <div style={{ flex:1, textAlign:"center", fontSize:12, fontWeight:600, letterSpacing:"0.18em", textTransform:"uppercase", color:"rgba(29,29,31,0.35)" }}>
            {LABELS[current]}
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:12 }}>
            <span style={{ fontSize:12, color:"rgba(29,29,31,0.3)", fontWeight:600 }}>{current+1} / {TOTAL}</span>
            <button onClick={onExit} style={{ display:"flex", alignItems:"center", gap:5, background:"rgba(0,0,0,0.05)", border:"1px solid rgba(0,0,0,0.1)", borderRadius:8, color:"var(--c-text2)", cursor:"pointer", padding:"5px 12px", fontSize:12, fontWeight:600, fontFamily:"Inter,sans-serif" }}>
              <Icon name="X" size={13} />
              {lang === "ru" ? "Выйти" : "Exit"}
            </button>
          </div>
        </div>
      </nav>

      {/* Трек */}
      <div style={{ position:"fixed", top:0, left:0, right:0, bottom:0, display:"flex", flexDirection:"column", transform:`translateY(calc(-${current} * 100vh))`, transition:"transform 0.75s cubic-bezier(0.77,0,0.175,1)", willChange:"transform" }}>
        {slides}
      </div>

      {/* Нижняя навигация */}
      <div className="pres-bottom-nav">
        <button className="pres-bottom-btn" onClick={prev} disabled={current === 0}>
          <Icon name="ChevronLeft" size={18} />
          <span>{lang === "ru" ? "Назад" : "Prev"}</span>
        </button>
        <div className="pres-progress-wrap">
          <div className="pres-progress-bar" style={{ width:`${((current+1)/TOTAL)*100}%` }} />
          <div className="pres-slide-dots">
            {LABELS.map((label, i) => (
              <button key={i} className={`pres-bottom-dot${i===current?" pres-bottom-dot--active":""}`} onClick={() => goTo(i)} title={label} />
            ))}
          </div>
        </div>
        <button className="pres-bottom-btn" onClick={next} disabled={current === TOTAL-1}>
          <span>{lang === "ru" ? "Далее" : "Next"}</span>
          <Icon name="ChevronRight" size={18} />
        </button>
      </div>
    </div>
  );
}