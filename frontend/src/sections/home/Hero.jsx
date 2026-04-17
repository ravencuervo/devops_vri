import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import './Hero.css';

/* ─── Datos estáticos fuera del componente (no se recrean) ─── */
const WORDS = ['innovación', 'excelencia', 'conocimiento', 'ciencia', 'impacto'];

const HERO_STATS = [
  { value: '150+', label: 'Investigadores' },
  { value: '17k+', label: 'Publicaciones' },
  { value: '12+',  label: 'Patentes' },
];

/* ─── Partículas de fondo generadas aleatoriamente ─── */
const PARTICLES = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: 1.5 + Math.random() * 2.5,
  delay: Math.random() * 6,
  duration: 4 + Math.random() * 5,
}));

/* ─── Líneas de grid decorativas ─── */
const GRID_LINES = Array.from({ length: 6 }, (_, i) => i);

const Hero = () => {
  const [wordIdx, setWordIdx] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const timerRef = useRef(null);

  /* Cicla las palabras con animación salida/entrada */
  const cycleWord = useCallback(() => {
    setIsExiting(true);
    setTimeout(() => {
      setWordIdx(prev => (prev + 1) % WORDS.length);
      setIsExiting(false);
    }, 300);
  }, []);

  useEffect(() => {
    timerRef.current = setInterval(cycleWord, 3200);
    return () => clearInterval(timerRef.current);
  }, [cycleWord]);

  /* Líneas del grid memoizadas */
  const gridLines = useMemo(() =>
    GRID_LINES.map(i => (
      <div
        key={i}
        className="hero-grid-line"
        style={{ left: `${(i + 1) * (100 / (GRID_LINES.length + 1))}%` }}
      />
    )),
  []);

  /* Partículas memoizadas */
  const particles = useMemo(() =>
    PARTICLES.map(p => (
      <div
        key={p.id}
        className="hero-particle"
        style={{
          left: `${p.x}%`,
          top: `${p.y}%`,
          width: `${p.size}px`,
          height: `${p.size}px`,
          animationDelay: `${p.delay}s`,
          animationDuration: `${p.duration}s`,
        }}
      />
    )),
  []);

  return (
    <section className="hero-master" aria-label="Sección principal VRI">

      {/* ── FONDO CIENTÍFICO ─────────────────────── */}
      <div className="hero-bg" aria-hidden="true">
        <div className="hero-bg-gradient" />
        <div className="hero-grid">{gridLines}</div>
        <div className="hero-particles">{particles}</div>
        {/* Círculos decorativos */}
        <div className="hero-circle hero-circle--lg" />
        <div className="hero-circle hero-circle--sm" />
        {/* Línea diagonal institucional */}
        <div className="hero-diagonal" />
      </div>

      {/* ── CONTENIDO PRINCIPAL ──────────────────── */}
      <div className="hero-inner">

        {/* COLUMNA IZQUIERDA: TEXTO */}
        <div className="hero-col hero-col--text">

          {/* Eyebrow institucional */}
          <div className="hero-eyebrow">
            <span className="hero-eyebrow__dot" />
            <span>Vicerrectorado de Investigación — UNA Puno</span>
          </div>

          {/* Título principal */}
          <h1 className="hero-heading">
            Ciencia que genera
            <span className="hero-heading__block">
              <span className={`hero-heading__word ${isExiting ? 'hero-word--exit' : 'hero-word--enter'}`}>
                {WORDS[wordIdx]}
              </span>
            </span>
            al servicio del Perú
          </h1>

          {/* Línea separadora */}
          <div className="hero-rule" />

          {/* Descripción */}
          <p className="hero-desc">
            Lideramos la generación de conocimiento científico,
            tecnológico y humanístico en el altiplano peruano,
            formando investigadores de excelencia con proyección internacional.
          </p>

          {/* Acciones */}
          <div className="hero-actions">
            <button className="hero-btn hero-btn--primary" id="hero-btn-convocatorias">
              <span>Ver Convocatorias</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
            <button className="hero-btn hero-btn--ghost" id="hero-btn-investigacion">
              Explorar Investigación
            </button>
          </div>

          {/* Stats inline */}
          <div className="hero-inline-stats">
            {HERO_STATS.map((s, i) => (
              <div key={i} className="hero-stat">
                <strong className="hero-stat__value">{s.value}</strong>
                <span className="hero-stat__label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* COLUMNA DERECHA: VISUAL */}
        <div className="hero-col hero-col--visual">

          {/* Marco principal con imagen */}
          <div className="hero-visual-frame">
            <div className="hero-visual-image" />

            {/* Tarjeta flotante superior */}
            <div className="hero-badge hero-badge--top">
              <div className="hero-badge__icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <div>
                <span className="hero-badge__title">CONCYTEC</span>
                <span className="hero-badge__sub">Afiliación activa</span>
              </div>
            </div>

            {/* Tarjeta flotante inferior */}
            <div className="hero-badge hero-badge--bottom">
              <div className="hero-badge__icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"/>
                </svg>
              </div>
              <div>
                <span className="hero-badge__title">Scopus / WoS</span>
                <span className="hero-badge__sub">Publicaciones indexadas</span>
              </div>
            </div>

            {/* Indicador de reproducción */}
            <button 
              className="hero-play" 
              id="hero-btn-play" 
              aria-label="Ver video institucional"
              onClick={() => setShowVideo(true)}
            >
              <span className="hero-play__pulse" />
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* ── VIDEO MODAL OVERLAY ──────────────────── */}
      {showVideo && (
        <div className="video-modal-overlay" onClick={() => setShowVideo(false)}>
          <div className="video-modal-container" onClick={e => e.stopPropagation()}>
            <button className="video-modal-close" onClick={() => setShowVideo(false)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
            <div className="video-responsive-wrapper">
              <iframe
                src="https://www.youtube.com/embed/eUcmIoieemc?autoplay=1&rel=0"
                title="VRI Institucional Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}

      {/* ── SCROLL INDICATOR ─────────────────────── */}
      <div className="hero-scroll" aria-hidden="true">
        <div className="hero-scroll__track">
          <div className="hero-scroll__thumb" />
        </div>
        <span>scroll</span>
      </div>

    </section>
  );
};

export default Hero;
