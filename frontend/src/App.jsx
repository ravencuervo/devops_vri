import React, { useState, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Institute from './pages/Institute';
import Semilleros from './pages/Semilleros';
import Grupos from './pages/Grupos';
import Institutos from './pages/Institutos';
import Investigadores from './pages/Investigadores';
import Produccion from './pages/Produccion';
import Innovacion from './pages/Innovacion';
import Convocatorias from './pages/Convocatorias';
import './App.css';

function App() {
  const [navbarHeight, setNavbarHeight] = useState(0);

  // Recibe la altura real del Navbar para compensar el fixed positioning
  const handleNavbarHeight = useCallback((h) => {
    setNavbarHeight(h);
  }, []);

  return (
    <Router>
      <div className="app-container">
        <Navbar onHeightChange={handleNavbarHeight} />

        {/* main recibe padding-top dinámico igual a la altura real del navbar */}
        <main style={{ paddingTop: navbarHeight, '--nav-height': `${navbarHeight}px` }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/nosotros" element={<About />} />
            <Route path="/instituto" element={<Institute />} />
            <Route path="/instituto/investigamos/semilleros" element={<Semilleros />} />
            <Route path="/instituto/investigamos/grupos" element={<Grupos />} />
            <Route path="/instituto/investigamos/institutos" element={<Institutos />} />
            <Route path="/instituto/investigamos/investigadores" element={<Investigadores />} />
            <Route path="/produccion" element={<Produccion />} />
            <Route path="/innovacion" element={<Innovacion />} />
            <Route path="/convocatorias" element={<Convocatorias />} />
            {/* Rutas temporales para que no tiren error 404 en el router */}
            <Route path="*" element={<Home />} />
          </Routes>
        </main>

        <footer className="footer-main">
          <div className="container footer-grid-columns">
            <div className="footer-col brand-col">
              <img src="/vrionly.png" alt="Logo VRI" className="footer-logo" />
              <p className="brand-desc">Liderando la investigación científica en el altiplano peruano para el mundo. Innovación, ética y compromiso social.</p>
            </div>
            <div className="footer-col links-col">
              <h4>Enlaces Rápidos</h4>
              <ul>
                <li><a href="#">Plataforma PGI</a></li>
                <li><a href="#">Repositorio Institucional</a></li>
                <li><a href="#">Reglamentos VRI</a></li>
                <li><a href="#">Docentes Renacyt</a></li>
                <li><a href="#">Mesa de Partes Virtual</a></li>
              </ul>
            </div>
            <div className="footer-col contact-col">
              <h4>Contacto</h4>
              <p>Av. Floral N° 1153, Ciudad Universitaria.<br />Puno - Perú, 21001</p>
              <p>(051) 365054 - Anexo 123</p>
              <p>vicerrectorado.investigacion@unap.edu.pe</p>
            </div>
            <div className="footer-col location-col">
              <h4>Ubicación</h4>
              <div className="footer-map-container">
                <iframe
                  src="https://maps.google.com/maps?q=Vicerrectorado+de+Investigaci%C3%B3n+UNA+Puno&t=k&z=17&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="170"
                  style={{ border: 0, borderRadius: '12px' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ubicación Satelital VRI UNA Puno"
                ></iframe>
              </div>
            </div>
          </div>
          <div className="footer-bottom-bar">
            <div className="container bottom-bar-flex">
              <p>© 2026 Universidad Nacional del Altiplano. | Todos los derechos reservados.</p>
              <div className="legal-links">
                <a href="#">Políticas de Privacidad</a>
                <span className="separator">|</span>
                <a href="#">Términos de Uso</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
