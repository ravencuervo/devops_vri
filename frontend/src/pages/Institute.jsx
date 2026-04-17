import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Institute.css';

const Institute = () => {
  const Icons = {
    Semilleros: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-5-4-5-4-3 2.4-5 4S3 13 3 15a7 7 0 0 0 7 7z" /><path d="M12 18V2M5 10l7 2 7-2" /></svg>,
    Grupos: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
    Institutos: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>,
    Investigadores: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 18h8" /><path d="M3 22h18" /><path d="M14 22a7 7 0 1 0 0-14h-1" /><path d="M9 14h2" /><path d="M9 12a2 2 0 1 0-4 0 2 2 0 0 0 4 0Z" /><path d="M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3" /></svg>,
    Plataforma: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /><path d="M2 12h20" /></svg>,
    Repositorio: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></svg>,
    Publicaciones: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><line x1="10" y1="9" x2="8" y2="9" /></svg>,
    Fondo: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>
  };

  const researchTypes = [
    { name: 'SEMILLEROS', icon: Icons.Semilleros, path: '/instituto/investigamos/semilleros' },
    { name: 'GRUPOS', icon: Icons.Grupos, path: '/instituto/investigamos/grupos' },
    { name: 'INSTITUTOS', icon: Icons.Institutos, path: '/instituto/investigamos/institutos' },
    { name: 'INVESTIGADORES', icon: Icons.Investigadores, path: '/instituto/investigamos/investigadores' }
  ];

  const navigate = useNavigate();

  return (
    <div className="institute-page">
      {/* Hero Sección */}
      <section className="institute-hero">
        <div className="container">
          <span className="section-badge animate-fade">Instituto de Investigación</span>
          <h1 className="inst-title animate-fade">Excelencia en la Generación del Conocimiento</h1>
        </div>
      </section>

      {/* ¿Quiénes Somos? */}
      <section className="quienes-somos-section">
        <div className="container">
          <div className="quienes-flex">
            <div className="quienes-text animate-fade">
              <h2 className="section-title">¿Quiénes Somos?</h2>
              <p>
                El Instituto de Investigación (II) es el órgano de línea del Vicerrectorado de Investigación,
                responsable de organizar, promover, gestionar y difundir la investigación científica,
                tecnológica y humanística en la Universidad Nacional del Altiplano.
              </p>
              <p>
                Contamos con un equipo comprometido con la rigurosidad científica y la ética,
                apoyando a nuestros docentes y estudiantes en la búsqueda de soluciones
                innovadoras para los desafíos de la región y el mundo.
              </p>
            </div>
            <div className="quienes-visual animate-fade">
              <div className="glass-card-inst">
                <div className="stat-inst">
                  <strong>30+</strong>
                  <span>Institutos Especializados</span>
                </div>
                <div className="stat-inst">
                  <strong>500+</strong>
                  <span>Proyectos Anuales</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ¿Cómo Investigamos? */}
      <section className="como-investigamos-section">
        <div className="container">
          <div className="section-header center">
            <h2 className="section-title">¿Cómo Investigamos?</h2>
            <p className="section-description">
              Nuestra estructura de investigación se organiza en diferentes niveles de especialización
              y colaboración académica.
            </p>
          </div>

          <div className="research-buttons-grid">
            {researchTypes.map((type, index) => (
              <button
                key={index}
                className="research-category-btn animate-fade"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => navigate(type.path)}
              >
                <span className="cat-icon">{type.icon}</span>
                <span className="cat-name">{type.name}</span>
                <span className="cat-arrow">→</span>
              </button>
            ))}
          </div>

          <div className="research-context animate-fade">
            <div className="context-card">
              <h3>Fomento a la Cultura Científica</h3>
              <p>
                Desde la formación temprana en los Semilleros hasta la consolidación de
                Investigadores Renacyt, cubrimos todo el ciclo de vida de la investigación.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Servicios (Sub Unidades) */}
      <section className="instituto-servicios">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Nuestros Servicios</span>
            <h2 className="section-title">Sub Unidades de Apoyo</h2>
          </div>

          <div className="servicios-inst-grid">
            <div className="servicio-card animate-fade">
              <div className="srv-logo-box">
                <img src="/assets/subunidades/pgi.png" alt="Plataforma IDI" className="srv-logo-img" />
              </div>
              <div className="srv-content">
                <h4>Plataforma de Investigación y Desarrollo</h4>
                <p>Herramientas tecnológicas avanzadas para la gestión y seguimiento de proyectos.</p>
                <a href="https://pgi.vriunap.pe/home" target="_blank" rel="noopener noreferrer" className="srv-btn">Acceder a Plataforma</a>
              </div>
            </div>

            <div className="servicio-card animate-fade" style={{ animationDelay: '0.1s' }}>
              <div className="srv-logo-box">
                <img src="/assets/subunidades/repositorio.jpg" alt="Repositorio Institucional" className="srv-logo-img" />
              </div>
              <div className="srv-content">
                <h4>Repositorio Institucional</h4>
                <p>Acceso abierto a la producción científica y académica de toda la universidad.</p>
                <a href="https://repositorio.unap.edu.pe/home" target="_blank" rel="noopener noreferrer" className="srv-btn">Explorar Repositorio</a>
              </div>
            </div>

            <div className="servicio-card animate-fade" style={{ animationDelay: '0.2s' }}>
              <div className="srv-logo-box">
                <img src="/assets/logos/publicaciones.png" alt="Publicaciones Científicas" className="srv-logo-img" />
              </div>
              <div className="srv-content">
                <h4>Publicaciones Científicas</h4>
                <p>Asesoría y gestión para la publicación en revistas indexadas de alto impacto.</p>
                <div className="srv-btn-group">
                  <a href="https://huajsapata.unap.edu.pe/index.php/ria/issue/view/50" target="_blank" rel="noopener noreferrer" className="srv-btn">Revista Altoandinas</a>
                  <a href="https://revistas.unap.edu.pe/portal/" target="_blank" rel="noopener noreferrer" className="srv-btn">Portal de Revistas</a>
                </div>
              </div>
            </div>

            <div className="servicio-card animate-fade" style={{ animationDelay: '0.3s' }}>
              <div className="srv-logo-box">
                <img src="/assets/logos/editorial.png" alt="Fondo Editorial" className="srv-logo-img" />
              </div>
              <div className="srv-content">
                <h4>Fondo Editorial</h4>
                <p>Edición y publicación de libros, textos y memorias de la investigación universitaria.</p>
                <button className="srv-btn">Catálogo Editorial</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Noticias del Instituto */}
      <section className="instituto-noticias">
        <div className="container">
          <div className="section-header split-header">
            <div>
              <span className="section-badge">Actualidad II</span>
              <h2 className="section-title">Últimas del Instituto</h2>
            </div>
            <button className="vri-btn-outline">Ver Todas</button>
          </div>

          <div className="inst-news-row">
            <article className="inst-news-card animate-fade">
              <div className="ins-news-img" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1532187875605-1ef6c237ddc4?auto=format&fit=crop&q=80&w=600")' }}></div>
              <div className="ins-news-body">
                <span className="ins-news-date">10 Abril, 2024</span>
                <h4>Nuevo Reglamento de Semilleros 2024</h4>
                <p>Se establecen las nuevas bases para el financiamiento de semilleros de investigación estudiantil.</p>
                <a href="#" className="read-more">Leer Más</a>
              </div>
            </article>
            <article className="inst-news-card animate-fade" style={{ animationDelay: '0.1s' }}>
              <div className="ins-news-img" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=600")' }}></div>
              <div className="ins-news-body">
                <span className="ins-news-date">05 Abril, 2024</span>
                <h4>Taller de Escritura Científica Q1</h4>
                <p>Capacitación intensiva para docentes investigadores sobre redacción de artículos para Scopus.</p>
                <a href="#" className="read-more">Leer Más</a>
              </div>
            </article>
            <article className="inst-news-card animate-fade" style={{ animationDelay: '0.2s' }}>
              <div className="ins-news-img" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1454165833767-027ffea70250?auto=format&fit=crop&q=80&w=600")' }}></div>
              <div className="ins-news-body">
                <span className="ins-news-date">01 Abril, 2024</span>
                <h4>Lanzamiento del Portal de Investigadores</h4>
                <p>Una nueva interfaz para gestionar tu perfil Renacyt y visibilidad académica.</p>
                <a href="#" className="read-more">Leer Más</a>
              </div>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Institute;
