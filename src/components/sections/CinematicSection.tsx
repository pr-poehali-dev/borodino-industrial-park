export default function CinematicSection() {
  return (
    <>
      {/* ── CINEMATIC 1: вид сверху ─────────────────── */}
      <section className="cinematic-section">
        <div className="cinematic-img-wrap">
          <img
            src="https://cdn.poehali.dev/projects/49f7a74d-a29e-4df6-a9ab-7c61c90787d1/bucket/30d64c4e-4fb7-414d-b9e0-18633d87b8bb.png"
            alt="Производственный комплекс — вид сверху"
            className="cinematic-img"
          />
          <div className="cinematic-overlay" />
        </div>
        <div className="cinematic-caption">
          <div className="cinematic-label reveal">Визуализация</div>
          <h2 className="cinematic-title reveal reveal-delay-1">
            21 000 м²<br />производственных мощностей.
          </h2>
          <p className="cinematic-desc reveal reveal-delay-2">
            Два производственных корпуса. Один центр отгрузки. Полный цикл.
          </p>
        </div>
      </section>

      {/* ── CINEMATIC 2: фасад ──────────────────────── */}
      <section className="cinematic-section cinematic-section--alt">
        <div className="cinematic-img-wrap">
          <img
            src="https://cdn.poehali.dev/projects/49f7a74d-a29e-4df6-a9ab-7c61c90787d1/bucket/82506be1-dbc3-4b4c-9ebe-1789497c82fb.png"
            alt="Главный фасад — производственный комплекс и КПП"
            className="cinematic-img"
          />
          <div className="cinematic-overlay" />
        </div>
        <div className="cinematic-caption">
          <div className="cinematic-label reveal">Архитектура</div>
          <h2 className="cinematic-title reveal reveal-delay-1">
            Трасса М1.<br />200 км от Москвы.
          </h2>
          <p className="cinematic-desc reveal reveal-delay-2">
            Стратегическое расположение для логистики в Москву, ЦФО и западные регионы.
          </p>
        </div>
      </section>
    </>
  );
}
