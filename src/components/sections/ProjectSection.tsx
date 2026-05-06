import Icon from "@/components/ui/icon";
type IconName = string;

export default function ProjectSection() {
  return (
    <section id="project" className="content-section">
      <div className="section-inner">
        <div className="section-label reveal">Проект</div>
        <h2 className="section-title reveal reveal-delay-1">Индустриальный парк<br />«Бородино».</h2>

        {/* Эскиз проекта */}
        <div className="project-sketch">
          <div className="project-sketch-label">
            <Icon name="FileText" size={14} />
            Эскиз генерального плана · Масштаб 1:2000
          </div>
          <img
            src="https://cdn.poehali.dev/projects/49f7a74d-a29e-4df6-a9ab-7c61c90787d1/bucket/b7c42da6-a5e5-4719-9db2-2383a1006362.png"
            alt="Эскиз генерального плана индустриального парка Бородино"
            className="project-sketch-img"
          />
          <div className="project-sketch-caption">
            Индустриальный парк «Бородино» · г. Вязьма, трасса М1 · площадь 7 Га
          </div>
        </div>

        {/* Визуализация зданий */}
        <div className="building-gallery">
          <div className="building-gallery-label">
            <Icon name="Building2" size={14} />
            3D-визуализация объектов
          </div>
          <div className="building-gallery-grid">
            <div className="building-gallery-item">
              <img
                src="https://cdn.poehali.dev/projects/49f7a74d-a29e-4df6-a9ab-7c61c90787d1/bucket/30d64c4e-4fb7-414d-b9e0-18633d87b8bb.png"
                alt="Вид сверху на корпуса индустриального парка"
                className="building-gallery-img"
              />
              <div className="building-gallery-caption">Вид сверху · производственные корпуса</div>
            </div>
            <div className="building-gallery-item">
              <img
                src="https://cdn.poehali.dev/projects/49f7a74d-a29e-4df6-a9ab-7c61c90787d1/bucket/82506be1-dbc3-4b4c-9ebe-1789497c82fb.png"
                alt="Фасад производственного комплекса с административным блоком"
                className="building-gallery-img"
              />
              <div className="building-gallery-caption">Главный фасад · производственный комплекс и КПП</div>
            </div>
          </div>
        </div>

        {/* География */}
        <div className="project-geo">
          <div className="project-geo-map">
            <div className="map-pulse" />
            <Icon name="MapPin" size={36} className="map-icon" />
            <div className="map-label">г. Вязьма, д. Бородино</div>
            <div className="map-sublabel">Смоленская область · трасса М1</div>
          </div>
          <div className="project-geo-info">
            {[
              { icon: "Navigation", title: "Расположение", text: "Трасса М1, напротив Мелькомбината. 200 км от Москвы — прямой выход на федеральную трассу." },
              { icon: "Truck", title: "Транспорт", text: "Федеральная трасса М1, удобная логистика в Москву, ЦФО и западные регионы." },
              { icon: "Building2", title: "Окружение", text: "Городская инфраструктура г. Вязьмы: жильё, медицина, образование, трудовые ресурсы." },
              { icon: "Calendar", title: "Сроки", text: "Реализация 2026–2031. I этап — 2026 г.: проектирование и подготовка территории." },
            ].map((item, i) => (
              <div className="geo-item" key={i}>
                <div className="geo-icon-wrap"><Icon name={item.icon as IconName} size={18} /></div>
                <div>
                  <div className="geo-item-title">{item.title}</div>
                  <div className="geo-item-text">{item.text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Главное производство */}
        <div className="flagship-card" style={{ marginTop: "3rem" }}>
          <div className="flagship-badge">Основное производство</div>
          <div className="flagship-content">
            <div className="flagship-emoji">🥤</div>
            <div>
              <div className="flagship-title">Безалкогольные напитки в алюминиевой банке</div>
              <div className="flagship-desc">
                Производственная линия мощностью <strong>60 000 банок в час</strong>. Полный цикл: розлив, укупорка, этикетировка, упаковка.
              </div>
              <div className="flagship-tags">
                <span className="tag">60 000 банок/час</span>
                <span className="tag">Алюминиевая Ева-банка</span>
                <span className="tag">Контрактное производство</span>
                <span className="tag">Ответственное хранение</span>
              </div>
            </div>
          </div>
        </div>

        {/* Реализация под ключ */}
        <div className="turnkey-block">
          <div className="turnkey-label">Наше преимущество</div>
          <h3 className="turnkey-title">Реализуем проект полностью своими силами</h3>
          <p className="turnkey-text">
            У нас есть собственная строительная группа — мы не зависим от подрядчиков и контролируем каждый этап. От покупки земли до запуска производства — всё в одних руках.
          </p>
          <div className="turnkey-steps">
            {[
              { icon: "MapPin", step: "01", title: "Покупка земли", desc: "Выбор и оформление участка" },
              { icon: "HardHat", step: "02", title: "Строительство", desc: "Собственная строительная группа" },
              { icon: "Settings", step: "03", title: "Монтаж оборудования", desc: "Технологическая линия под ключ" },
              { icon: "Play", step: "04", title: "Запуск производства", desc: "Выход на проектную мощность" },
              { icon: "Users", step: "05", title: "Подбор персонала", desc: "Комплектация команды" },
              { icon: "BarChart2", step: "06", title: "Управление", desc: "Операционное управление парком" },
            ].map((s, i) => (
              <div className="turnkey-step" key={i}>
                <div className="turnkey-step-num">{s.step}</div>
                <div className="turnkey-step-icon">
                  <Icon name={s.icon as IconName} size={20} />
                </div>
                <div className="turnkey-step-title">{s.title}</div>
                <div className="turnkey-step-desc">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Действующие контракты */}
        <div className="contracts-block">
          <div className="contracts-label">Подтверждённые партнёрства</div>
          <h3 className="contracts-title">Действующие контракты уже сегодня</h3>
          <div className="contracts-grid">
            <div className="contracts-col">
              <div className="contracts-col-title">
                <Icon name="FileCheck" size={18} />
                Владельцы брендов напитков
              </div>
              <div className="contracts-col-text">
                Заключены контракты с владельцами брендов безалкогольных напитков на размещение производства и контрактный розлив. Очередь резидентов формируется до открытия парка.
              </div>
              <div className="contracts-badge">Контракты подписаны</div>
            </div>
            <div className="contracts-divider" />
            <div className="contracts-col">
              <div className="contracts-col-title">
                <Icon name="Package" size={18} />
                Поставщики алюминиевой банки
              </div>
              <div className="contracts-partners">
                {[
                  { name: "Арнест", desc: "Ведущий российский производитель алюминиевой упаковки" },
                  { name: "Кэнпак", desc: "Международный производитель алюминиевых банок, присутствие в России" },
                ].map((p, i) => (
                  <div className="contracts-partner" key={i}>
                    <div className="contracts-partner-name">{p.name}</div>
                    <div className="contracts-partner-desc">{p.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Инфраструктура */}
        <div className="infra-grid" style={{ marginTop: "3rem" }}>
          {[
            { icon: "Factory", title: "Производство и склады", value: "21 000 м²" },
            { icon: "Building2", title: "Офисное здание", value: "60 мест" },
            { icon: "UtensilsCrossed", title: "Комбинат питания", value: "на территории" },
            { icon: "Dumbbell", title: "Спортивный комплекс", value: "на территории" },
            { icon: "Trees", title: "Благоустройство", value: "7 Га" },
            { icon: "ShieldCheck", title: "Инженерные сети", value: "готовая инфра" },
          ].map((item, i) => (
            <div className="infra-card" key={i}>
              <div className="infra-icon"><Icon name={item.icon as IconName} size={22} /></div>
              <div className="infra-value">{item.value}</div>
              <div className="infra-title">{item.title}</div>
            </div>
          ))}
        </div>

        {/* Какого инвестора ищем */}
        <div className="passions-block" style={{ borderTop: "1px solid rgba(0,229,255,0.12)", marginTop: "3rem", paddingTop: "3rem" }}>
          <div className="passions-label">Какого инвестора мы хотим</div>
          <div className="passions-subtitle">Главные страсти резидентов</div>
          <div className="passions-grid">
            {[
              { num: "01", emoji: "🏆", title: "Стать новым локальным лидером", desc: "После ослабления международных брендов открылось окно возможностей." },
              { num: "02", emoji: "🎵", title: "Построить культовый бренд", desc: "Не просто продавать напиток — создать lifestyle. Музыка, gaming, спорт, digital community." },
              { num: "03", emoji: "🛒", title: "Масштабирование через сети", desc: "Зайти в X5, Магнит, ВкусВилл, АЗС и маркетплейсы — значит стать настоящим брендом." },
              { num: "04", emoji: "⚡", title: "Захват тренда functional drinks", desc: "No sugar, витамины, адаптогены, wellness. Быть не газировкой, а функциональным продуктом." },
              { num: "05", emoji: "🌍", title: "Создать экспортный бренд", desc: "Амбиция выйти на рынки СНГ, Ближнего Востока и Азии." },
            ].map((p, i) => (
              <div className="passion-card" key={i}>
                <div className="passion-num">{p.num}</div>
                <div className="passion-emoji">{p.emoji}</div>
                <div className="passion-title">{p.title}</div>
                <div className="passion-desc">{p.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}