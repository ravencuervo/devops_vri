import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ onHeightChange }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navRef = useRef(null);
  const location = useLocation();

  // Detección de secciones para Branding Dinámico
  const isIdiSection        = location.pathname.startsWith('/instituto');
  const isProduccionSection = location.pathname.startsWith('/produccion');
  const isInnovacionSection = location.pathname.startsWith('/innovacion');

  // Lógica de Título y Logo según la sección
  let brandTitle = "VICERRECTORADO DE INVESTIGACIÓN";
  let brandLogo = "/vrionly.png";

  if (isIdiSection) {
    brandTitle = "INSTITUTO DE INVESTIGACIÓN";
    brandLogo = "/assets/direcciones/idi.png";
  } else if (isProduccionSection) {
    brandTitle = "DIRECCIÓN DE PRODUCCIÓN DE BIENES Y SERVICIOS";
    brandLogo = "/assets/direcciones/bienes.png";
  } else if (isInnovacionSection) {
    brandTitle = "DIRECCIÓN DE INNOVACIÓN Y TRANSFERENCIA TECNOLÓGICA";
    brandLogo = "/assets/direcciones/innova.png";
  }

  // Notifica al padre la altura del navbar
  useEffect(() => {
    if (!navRef.current || !onHeightChange) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        onHeightChange(entry.target.offsetHeight);
      }
    });

    resizeObserver.observe(navRef.current);
    
    return () => {
      resizeObserver.disconnect();
    };
  }, [onHeightChange]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const Icons = {
    Convocatorias: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>,
    Noticias: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"></rect><line x1="7" y1="8" x2="17" y2="8"></line><line x1="7" y1="12" x2="17" y2="12"></line><line x1="7" y1="16" x2="13" y2="16"></line></svg>,
    Reglamentos: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg>,
    Servicios: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21 16-4 4-4-4"></path><path d="M17 20V4"></path><path d="m3 8 4-4 4 4"></path><path d="M7 4v16"></path></svg>
  };

  return (
    <>
      <aside className="quick-access-sidebar">
        <NavLink to="/convocatorias" className="sidebar-item">
          <span className="item-text">CONVOCATORIAS</span>
          <span className="item-icon">{Icons.Convocatorias}</span>
        </NavLink>
        <NavLink to="/noticias" className="sidebar-item">
          <span className="item-text">NOTICIAS</span>
          <span className="item-icon">{Icons.Noticias}</span>
        </NavLink>
        <NavLink to="/reglamentos" className="sidebar-item">
          <span className="item-text">REGLAMENTOS</span>
          <span className="item-icon">{Icons.Reglamentos}</span>
        </NavLink>
        <NavLink to="/servicios" className="sidebar-item">
          <span className="item-text">SERVICIOS</span>
          <span className="item-icon">{Icons.Servicios}</span>
        </NavLink>
      </aside>

      <nav ref={navRef} className={`header-complex ${scrolled ? 'is-shrunk' : ''} ${isIdiSection ? 'is-idi-theme' : ''}`}>
        <div className="branding-row-bg">
          <div className="branding-flex">
            <div className="vri-brand-box">
              <img 
                src={brandLogo} 
                alt={brandTitle} 
                className="vri-logo-main" 
              />
              <div className="vri-brand-divider" aria-hidden="true" />
              <div className="vri-names">
                <h1 className="vri-title-main">
                  {brandTitle}
                </h1>
                <h2 className="vri-subtitle-main">UNIVERSIDAD NACIONAL DEL ALTIPLANO</h2>
              </div>
            </div>
          </div>
        </div>

        <div className="navigation-row-bar">
          <button 
            className={`mobile-menu-toggle ${mobileMenuOpen ? 'is-active' : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menú principal"
          >
            <span className="hamburger-line" />
            <span className="hamburger-line" />
            <span className="hamburger-line" />
          </button>

          <div className={`navigation-flex ${mobileMenuOpen ? 'is-open' : ''}`}>
            <NavLink to="/"            className={({ isActive }) => `nav-link-unit ${isActive ? 'current' : ''}`} onClick={() => setMobileMenuOpen(false)} end>VRI</NavLink>
            <NavLink to="/nosotros"    className={({ isActive }) => `nav-link-unit ${isActive ? 'current' : ''}`} onClick={() => setMobileMenuOpen(false)}>NOSOTROS</NavLink>
            <div className="nav-dropdown-wrapper">
              <NavLink to="/instituto" className={({ isActive }) => `nav-link-unit ${isActive ? 'current' : ''}`} onClick={() => setMobileMenuOpen(false)}>
                INSTITUTO DE INVESTIGACION
                <svg className="dropdown-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6"/></svg>
              </NavLink>
              <ul className="nav-dropdown-menu">
                <li className="has-nested">
                  <div className="nested-trigger">
                    COMO INVESTIGAMOS
                    <svg className="nested-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6"/></svg>
                  </div>
                  <ul className="nav-nested-menu">
                    <li><NavLink to="/instituto/investigamos/semilleros" onClick={() => setMobileMenuOpen(false)}>SEMILLEROS</NavLink></li>
                    <li><NavLink to="/instituto/investigamos/grupos" onClick={() => setMobileMenuOpen(false)}>GRUPOS</NavLink></li>
                    <li><NavLink to="/instituto/investigamos/institutos" onClick={() => setMobileMenuOpen(false)}>INSTITUTOS</NavLink></li>
                    <li><NavLink to="/instituto/investigamos/investigadores" onClick={() => setMobileMenuOpen(false)}>INVESTIGADORES</NavLink></li>
                  </ul>
                </li>
                <li><a href="https://pgi.vriunap.pe/home" target="_blank" rel="noopener noreferrer" onClick={() => setMobileMenuOpen(false)}>SUB UNIDAD DE PLATAFORMA DE INVESTIGACION Y DESARROLLO</a></li>
                <li><a href="https://repositorio.unap.edu.pe/home" target="_blank" rel="noopener noreferrer" onClick={() => setMobileMenuOpen(false)}>SUB UNIDAD DE REPOSITORIO INSTITUCIONAL</a></li>
                <li className="has-nested">
                  <div className="nested-trigger">
                    SUB UNIDAD DE PUBLICACIONES CIENTIFICAS
                    <svg className="nested-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6"/></svg>
                  </div>
                  <ul className="nav-nested-menu">
                    <li><a href="https://huajsapata.unap.edu.pe/index.php/ria/issue/view/50" target="_blank" rel="noopener noreferrer" onClick={() => setMobileMenuOpen(false)}>Revista de Investigaciones Altoandinas</a></li>
                    <li><a href="https://revistas.unap.edu.pe/portal/" target="_blank" rel="noopener noreferrer" onClick={() => setMobileMenuOpen(false)}>Portal de Revistas UNA Puno</a></li>
                  </ul>
                </li>
                <li><NavLink to="/instituto/fondo-editorial" onClick={() => setMobileMenuOpen(false)}>SUB UNIDAD DE FONDO EDITORIAL</NavLink></li>
              </ul>
            </div>
            <a href="https://www.incunalab.com/" target="_blank" rel="noopener noreferrer" className="nav-link-unit" onClick={() => setMobileMenuOpen(false)}>DIRECCION DE INCUBADORAS DE EMPRESAS</a>
            <NavLink to="/produccion"  className={({ isActive }) => `nav-link-unit ${isActive ? 'current' : ''}`} onClick={() => setMobileMenuOpen(false)}>DIRECCION DE PRODUCCION DE BIENES Y SERVICIOS</NavLink>
            <NavLink to="/innovacion"  className={({ isActive }) => `nav-link-unit ${isActive ? 'current' : ''}`} onClick={() => setMobileMenuOpen(false)}>DIRECCION DE INNOVACION Y TRANSFERENCIA TECNOLOGICA</NavLink>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

