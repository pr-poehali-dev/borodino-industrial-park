import Icon from "@/components/ui/icon";
type IconName = string;

export default function AdvantagesSection() {
  return (
    <section id="advantages" className="content-section dark-section">
      <div className="section-inner">
        <div className="section-label light reveal">Преимущества</div>
        <h2 className="section-title light reveal reveal-delay-1">Конкурентные<br />преимущества инвестиции в Бородино.</h2>
        <div className="adv-grid">
          {[
            { icon: "Zap", title: "Прозрачное и стабильное ценообразование за счёт полного контроля над производством", desc: "" },
            { icon: "BarChart2", title: "Гибкое управление выпуском без зависимости от контрактных площадок", desc: "" },
            { icon: "TrendingDown", title: "Снижение затрат за счёт вертикальной интеграции и собственной логистики", desc: "" },
            { icon: "Truck", title: "Поставки в федеральные сети из одной точки — быстро и без хаоса", desc: "" },
            { icon: "DollarSign", title: "Дополнительный доход от свободных мощностей и ответственного хранения", desc: "" },
            { icon: "MapPin", title: "Стратегическое расположение", desc: "Трасса М1, г. Вязьма — узловая точка между Москвой и западными регионами" },
          ].map((a, i) => (
            <div className="adv-card" key={i}>
              <div className="adv-number">0{i + 1}</div>
              <div className="adv-icon-wrap"><Icon name={a.icon as IconName} size={26} /></div>
              <div className="adv-title">{a.title}</div>
              <div className="adv-desc">{a.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}