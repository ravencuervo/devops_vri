import React, { useState, useMemo, useCallback, useEffect } from 'react';
import Hero from '../sections/home/Hero';
import AnimatedCounter from '../components/AnimatedCounter';
import { useScrollReveal, useStaggerReveal } from '../hooks/useScrollReveal';
import './Home.css';

/* ═══════════════════════════════════════════════════════════════
   DATOS ESTÁTICOS — fuera del componente para no re-declararse
   ═══════════════════════════════════════════════════════════════ */
const NEWS_DATA = [
  {
    tag: 'Investigación',
    title: 'Avances en el estudio de recursos hídricos en la Cuenca del Titicaca',
    desc: 'Investigadores de la UNA Puno publicaron hallazgos sobre la calidad del agua y niveles de contaminación en la cuenca baja del lago Titicaca, proponiendo nuevas estrategias de mitigación ambiental y desarrollo sostenible.',
    img: '/assets/portadadii.jpg',
    date: '12 Abr, 2024',
  },
  {
    tag: 'Innovación',
    title: 'Desarrollo de nuevas tecnologías para la agricultura de altura',
    desc: 'El proyecto financiado por el VRI desarrolló con éxito invernaderos inteligentes que monitorean temperatura y humedad mediante tecnología IoT para mejorar los cultivos en el altiplano.',
    img: '/assets/innova.png',
    date: '08 Abr, 2024',
  },
  {
    tag: 'Ciencia',
    title: 'Publicación destacada en Nature: Redes de biodiversidad andina',
    desc: 'Docentes investigadores colaboraron en un estudio global sobre el impacto del cambio climático en ecosistemas de alta montaña, publicado en la revista científica más prestigiosa del mundo.',
    img: '/assets/dii_electronica.jpg',
    date: '02 Abr, 2024',
  },
];

const CONVOCATORIAS_DATA = [
  {
    status: 'Abierta',
    type: 'Convocatoria',
    tag: 'Vigente',
    title: 'Formalización de semilleros y grupos de investigación',
    limit: '14 abr 2026',
  },
  {
    status: 'Abierta',
    type: 'Beca',
    tag: 'Vigente',
    title: 'Apoyo económico para publicación de artículos científicos Q1/Q2',
    limit: '28 abr 2026',
  },
  {
    status: 'Cerrada',
    type: 'Concurso',
    tag: 'Finalizado',
    title: 'Fondos Concursables para Equipamiento de Laboratorios',
    limit: '02 mar 2026',
  },
];

const LOGROS_DATA = [
  {
    value: 12,
    prefix: '',
    suffix: 'M+',
    label: 'Inversión en I+D',
    unit: 'Soles',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"/>
      </svg>
    ),
  },
  {
    value: 17,
    prefix: '',
    suffix: 'k+',
    label: 'Tesis Publicadas',
    unit: 'Repositorio',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"/>
      </svg>
    ),
  },
  {
    value: 150,
    prefix: '+',
    suffix: '',
    label: 'Docentes Investigadores',
    unit: 'RENACYT',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"/>
      </svg>
    ),
  },
  {
    value: 12,
    prefix: '+',
    suffix: '',
    label: 'Patentes Registradas',
    unit: 'INDECOPI',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"/>
      </svg>
    ),
  },
];

const JOURNALS = [
  { name: 'Revista de Investigaciones', abbr: 'RINAP', href: '#' },
  { name: 'Semilla de la Investigación', abbr: 'SEMI', href: '#' },
  { name: 'Altiplano Journal', abbr: 'AJ', href: '#' },
];

/* ═══════════════════════════════════════════════════════════════
   COMPONENTES INTERNOS (evitar re-renders con memo)
   ═══════════════════════════════════════════════════════════════ */

/** NewsCard — noticia destacada */
const NewsCard = React.memo(({ news }) => (
  <article className="home-news-featured">
    <div
      className="home-news-img"
      style={{ backgroundImage: `url(${news.img})` }}
      aria-label={news.title}
    >
      <span className="home-news-date">{news.date}</span>
    </div>
    <div className="home-news-body">
      <span className="home-news-tag">{news.tag}</span>
      <h3 className="home-news-title">{news.title}</h3>
      <p className="home-news-desc">{news.desc}</p>
      <a href="#" className="home-news-link">
        Leer artículo
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/>
        </svg>
      </a>
    </div>
  </article>
));

/** NewsListItem — ítem lateral de noticia */
const NewsListItem = React.memo(({ news, isActive, onClick }) => (
  <div
    className={`home-news-item ${isActive ? 'is-active' : ''}`}
    onClick={onClick}
    role="button"
    tabIndex={0}
    onKeyDown={e => e.key === 'Enter' && onClick()}
    aria-pressed={isActive}
  >
    <div
      className="home-news-item__img"
      style={{ backgroundImage: `url(${news.img})` }}
    />
    <div className="home-news-item__info">
      <span className="home-news-item__tag">{news.tag}</span>
      <h4 className="home-news-item__title">{news.title}</h4>
      <span className="home-news-item__date">{news.date}</span>
    </div>
  </div>
));

/** EventRow — fila de convocatoria */
const EventRow = React.memo(({ ev, index }) => (
  <div
    className={`home-event-row ${ev.status === 'Cerrada' ? 'is-closed' : ''}`}
    style={{ animationDelay: `${index * 0.1}s` }}
  >
    <div className="home-event__status">
      <span className={`home-status-badge home-status-badge--${ev.status === 'Abierta' ? 'open' : 'closed'}`}>
        <span className="home-status-badge__dot" />
        {ev.status}
      </span>
    </div>
    <div className="home-event__info">
      <div className="home-event__meta">
        <span className="home-event__type">{ev.type}</span>
        <span className="home-event__tag">{ev.tag}</span>
      </div>
      <h3 className="home-event__title">{ev.title}</h3>
    </div>
    <div className="home-event__deadline">
      <span className="home-event__deadline-label">Límite</span>
      <span className="home-event__deadline-date">{ev.limit}</span>
    </div>
    <div className="home-event__action">
      <button
        className="home-event__btn"
        disabled={ev.status === 'Cerrada'}
      >
        {ev.status === 'Cerrada' ? 'Ver Resultados' : 'Ver Bases'}
      </button>
    </div>
  </div>
));

/* ═══════════════════════════════════════════════════════════════
   PÁGINA HOME
   ═══════════════════════════════════════════════════════════════ */
const Home = () => {
  const [selectedNews, setSelectedNews] = useState(0);
  const [filterStatus, setFilterStatus] = useState('Abierta');

  /* ── Hooks de animación por sección ─── */
  const [infoRef, infoVisible] = useScrollReveal();
  const [newsRef, newsVisible] = useScrollReveal();
  const [logrosRef, logrosVisible] = useStaggerReveal();
  const [convRef, convVisible] = useScrollReveal();
  const [revistasRef, revistasVisible] = useScrollReveal();

  /* ── Handlers memoizados ─── */
  const handleSelectNews = useCallback((i) => setSelectedNews(i), []);
  const handleFilterOpen = useCallback(() => setFilterStatus('Abierta'), []);
  const handleFilterClosed = useCallback(() => setFilterStatus('Cerrada'), []);

  /* ── Datos derivados memoizados ─── */
  const filteredConvocatorias = useMemo(
    () => CONVOCATORIAS_DATA.filter(ev => ev.status === filterStatus),
    [filterStatus]
  );

  const currentNews = useMemo(() => NEWS_DATA[selectedNews], [selectedNews]);

  return (
    <>
      {/* ════════════════════════════════
          1. HERO
          ════════════════════════════════ */}
      <Hero />

      {/* ════════════════════════════════
          2. INFORMACIÓN INSTITUCIONAL
          ════════════════════════════════ */}
      <section
        id="informacion"
        className={`home-section home-info ${infoVisible ? 'is-visible' : ''}`}
        ref={infoRef}
      >
        <div className="container">
          <div className="home-info__grid">
            {/* Columna texto */}
            <div className="home-info__text reveal-left">
              <span className="home-badge">Trayectoria Académica</span>
              <h2 className="home-section-title">
                Impulsamos la<br />
                <em>Frontera del Conocimiento</em>
              </h2>
              <p>
                El Vicerrectorado de Investigación es el pilar estratégico de la UNA Puno,
                dedicado a fomentar un ecosistema de innovación que trascienda fronteras.
                Nuestra labor se centra en la gestión de recursos, el apoyo a investigadores
                y la difusión de hallazgos que resuelvan problemas críticos de nuestra sociedad.
              </p>
              <div className="home-info__pillars">
                {[
                  { label: 'Visionaria', sub: 'Liderazgo Regional' },
                  { label: 'Sostenible', sub: 'Impacto Social' },
                  { label: 'Ética',      sub: 'Integridad Científica' },
                ].map((p, i) => (
                  <div key={i} className="home-info__pillar">
                    <strong>{p.label}</strong>
                    <span>{p.sub}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Columna visual */}
            <div className="home-info__visual reveal-right">
              <div className="home-info__frame">
                <img src="/assets/portada_instituto.jpg" alt="Investigación UNA Puno" />
                <div className="home-info__frame-tag">UNA PUNO — 2024</div>
                {/* Decoración: líneas de esquina */}
                <div className="home-info__corner home-info__corner--tl" />
                <div className="home-info__corner home-info__corner--br" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          3. NOTICIAS Y VRI JOURNAL
          ════════════════════════════════ */}
      <section
        id="noticias"
        className={`home-section home-news-section ${newsVisible ? 'is-visible' : ''}`}
        ref={newsRef}
        aria-label="Últimas publicaciones"
      >
        <div className="container">
          <header className="home-section-header reveal-up">
            <span className="home-badge">Journal &amp; Actualidad</span>
            <h2 className="home-section-title">Últimas Publicaciones</h2>
          </header>

          <div className="home-news-layout">
            {/* Noticia principal */}
            <div className="home-news-main reveal-left" key={`feat-${selectedNews}`}>
              <NewsCard news={currentNews} />
            </div>

            {/* Lista lateral */}
            <div className="home-news-sidebar reveal-right">
              {NEWS_DATA.map((news, i) => (
                <NewsListItem
                  key={i}
                  news={news}
                  isActive={selectedNews === i}
                  onClick={() => handleSelectNews(i)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          4. LOGROS / MÉTRICAS
          ════════════════════════════════ */}
      <section
        id="logros"
        className={`home-section home-logros ${logrosVisible ? 'is-visible' : ''}`}
        ref={logrosRef}
        aria-label="Logros institucionales"
      >
        {/* Fondo con patrón de puntos */}
        <div className="home-logros__bg" aria-hidden="true">
          <div className="home-logros__dot-grid" />
        </div>

        <div className="container">
          <header className="home-section-header home-section-header--center reveal-up">
            <span className="home-badge home-badge--light">Impacto Medible</span>
            <h2 className="home-section-title home-section-title--light">
              Resultados que hablan por sí mismos
            </h2>
          </header>

          <div className="home-logros__grid">
            {LOGROS_DATA.map((item, i) => (
              <div
                key={i}
                className="home-logro-card"
                style={{ animationDelay: `${i * 0.12}s` }}
              >
                <div className="home-logro-card__icon">
                  {item.icon}
                </div>
                <AnimatedCounter
                  target={item.value}
                  prefix={item.prefix}
                  suffix={item.suffix}
                />
                <span className="home-logro-card__label">{item.label}</span>
                <span className="home-logro-card__unit">{item.unit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          5. CONVOCATORIAS Y EVENTOS
          ════════════════════════════════ */}
      <section
        id="convocatorias"
        className={`home-section home-conv ${convVisible ? 'is-visible' : ''}`}
        ref={convRef}
        aria-label="Convocatorias y eventos"
      >
        <div className="container">
          <header className="home-section-header reveal-up">
            <span className="home-badge">Oportunidades</span>
            <h2 className="home-section-title">Convocatorias y Eventos</h2>
            <p className="home-section-desc">
              Participa en nuestros fondos concursables y asiste a nuestros eventos científicos.
            </p>
          </header>

          {/* Tabs de filtro */}
          <div className="home-filter-tabs reveal-up" role="tablist">
            <button
              role="tab"
              aria-selected={filterStatus === 'Abierta'}
              className={`home-filter-tab ${filterStatus === 'Abierta' ? 'is-active' : ''}`}
              onClick={handleFilterOpen}
            >
              <span className="home-filter-tab__dot home-filter-tab__dot--open" />
              Abiertas
            </button>
            <button
              role="tab"
              aria-selected={filterStatus === 'Cerrada'}
              className={`home-filter-tab ${filterStatus === 'Cerrada' ? 'is-active' : ''}`}
              onClick={handleFilterClosed}
            >
              <span className="home-filter-tab__dot home-filter-tab__dot--closed" />
              Cerradas
            </button>
          </div>

          {/* Lista de eventos */}
          <div className="home-events-list" role="tabpanel">
            {filteredConvocatorias.length === 0 ? (
              <div className="home-events-empty">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"/>
                </svg>
                <p>No hay convocatorias en este estado.</p>
              </div>
            ) : (
              filteredConvocatorias.map((ev, i) => (
                <EventRow key={`${ev.title}-${i}`} ev={ev} index={i} />
              ))
            )}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          6. REVISTAS CIENTÍFICAS
          ════════════════════════════════ */}
      <section
        id="revistas"
        className={`home-section home-revistas ${revistasVisible ? 'is-visible' : ''}`}
        ref={revistasRef}
        aria-label="Revistas científicas"
      >
        <div className="container">
          <div className="home-revistas__inner">
            {/* Datos */}
            <div className="home-revistas__content reveal-left">
              <span className="home-badge home-badge--light">Publicaciones Propias</span>
              <h2 className="home-section-title home-section-title--light">
                Explora nuestras<br />Revistas Científicas
              </h2>
              <p>
                Buscamos la excelencia a través de la difusión de conocimiento
                indexado en las bases más prestigiosas del mundo.
              </p>

              <div className="home-journal-list">
                {JOURNALS.map((j, i) => (
                  <a key={i} href={j.href} className="home-journal-item">
                    <div className="home-journal-item__abbr">{j.abbr}</div>
                    <div className="home-journal-item__name">{j.name}</div>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="home-journal-item__arrow">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/>
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Decoración visual */}
            <div className="home-revistas__deco reveal-right" aria-hidden="true">
              <div className="home-revistas__circle home-revistas__circle--1" />
              <div className="home-revistas__circle home-revistas__circle--2" />
              <div className="home-revistas__badge-group">
                {['Scopus', 'WoS', 'Latindex', 'DOAJ'].map((db, i) => (
                  <span key={i} className="home-revistas__db-badge">{db}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
