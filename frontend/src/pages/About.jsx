import React from 'react';
import './About.css';

const About = () => {
  const authorities = [
    {
      name: 'DR. ARIEL ROGELIO VELASCO CÁRDENAS',
      role: 'VICERRECTOR DE INVESTIGACIÓN',
      image: '/assets/autoridades/ariel.png', // Placeholder or real if available
      bio: ''
    },
    {
      name: 'DR. ISRAEL LIMA MEDINA',
      role: 'DIRECTOR DEL INSTITUTO DE INVESTIGACIÓN',
      image: '/assets/autoridades/israel.png',
      bio: 'Gestión y fomento de la producción intelectual y científica a través de institutos especializados.'
    },
    {
      name: 'DR. POLAN FRANBAIT FERRO GONZALES',
      role: 'DIRECTOR DE PRODUCCIÓN DE BIENES Y SERVICIOS',
      image: '/assets/autoridades/polan.jpg',
      bio: 'Impulsando la transferencia de resultados de investigación en beneficios tangibles para la sociedad.'
    },
    {
      name: 'DRA. VERONICA GREIS ANDIA FLORES',
      role: 'DIRECTORA DE DIRECCIÓN DE INCUBADORAS DE EMPRESAS',
      image: '/assets/autoridades/veronica.jpg',
      bio: 'Fomento del emprendimiento de base tecnológica y el fortalecimiento de nuevas empresas universitarias.'
    },
    {
      name: 'DR. JOSE ANTONIO MAMANI GOMEZ',
      role: 'DIRECTOR DE INNOVACIÓN Y TRANSFERENCIA TECNOLÓGICA',
      image: '/assets/autoridad5.jpg',
      bio: 'Protección de la propiedad intelectual y vinculación efectiva con el sector productivo regional.'
    }
  ];

  const vicerrector = authorities[0];
  const otherAuthorities = authorities.slice(1);

  return (
    <div className="about-page">
      {/* Hero simple para Nosotros */}
      <section className="about-hero">
        <div className="container">
          <span className="section-badge animate-fade">Institucional</span>
          <h1 className="about-title animate-fade">Autoridades VRI</h1>
          <p className="about-subtitle animate-fade">
            Liderazgo y visión estratégica para el desarrollo científico de la UNA Puno.
          </p>
        </div>
      </section>

      {/* SECCIÓN DE AUTORIDADES: UNIFICADA */}
      <section className="authorities-master-section">
        <div className="container">
          <div className="authorities-super-grid">

            {/* COSTADO IZQUIERDO: VICERRECTOR (GRANDE) */}
            <div className="vicerrector-column animate-fade">
              <div className="vicerrector-card-premium">
                <div className="vicerrector-image-wrapper">
                  <img src={vicerrector.image} alt={vicerrector.name} className="auth-img-premium" />
                  <span className="premium-badge">Máxima Autoridad</span>
                </div>
                <div className="vicerrector-info-detailed">
                  <h2 className="vri-name-highlight">{vicerrector.name}</h2>
                  <h3 className="vri-role-highlight">{vicerrector.role}</h3>
                  <div className="vri-accent-line"></div>
                  <p className="vri-bio-text">{vicerrector.bio}</p>
                </div>
              </div>
            </div>

            {/* COSTADO DERECHO: LOS CUATRO GRANDES (DIRECTORES) */}
            <div className="directors-column">
              <div className="directors-grid-small">
                {otherAuthorities.map((auth, index) => (
                  <div key={index} className="director-mini-card animate-fade" style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className="director-mini-image">
                      <img src={auth.image} alt={auth.name} className="auth-img-mini" />
                    </div>
                    <div className="director-mini-info">
                      <span className="director-mini-role">{auth.role}</span>
                      <h4 className="director-mini-name">{auth.name}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Visión y Misión Breve */}
      <section className="about-mision-vision">
        <div className="container">
          <div className="vision-grid">
            <div className="vision-item glass animate-fade">
              <h3>Misión</h3>
              <p>Promover, gestionar y difundir la investigación científica, tecnológica y humanística de calidad, para contribuir al desarrollo sostenible de la región y el país.</p>
            </div>
            <div className="vision-item border animate-fade">
              <h3>Visión</h3>
              <p>Ser un referente nacional e internacional en investigación e innovación, reconocido por su impacto transformador en la sociedad y el conocimiento.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
