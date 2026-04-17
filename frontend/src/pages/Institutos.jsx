import React, { useState } from 'react';
import './Institutos.css';

const Institutos = () => {
  const [activeTab, setActiveTab] = useState('financiado');

  const IconBank = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 21h18" /><path d="M3 10h18" /><path d="m5 6 7-3 7 3" /><path d="M4 10v11" /><path d="M20 10v11" /><path d="M8 14v3" /><path d="M12 14v3" /><path d="M16 14v3" />
    </svg>
  );

  const IconCertificate = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" /><path d="M4 22h16" /><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" /><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" /><circle cx="12" cy="15" r="3" /><path d="m15 13-3-3-3 3" /><path d="M12 10V2.5" />
    </svg>
  );

  const institutosData = {
    financiado: [
      { 
        id: 1, 
        areaTematica: 'Ciencia de Materiales',
        instituto: 'INBIOTEC', 
        proyecto: 'Desarrollo de biopolímeros a partir de residuos andinos para empaques biodegradables.', 
        puntaje: '92.5',
        resultado: 'Ganador',
        observaciones: 'Aprobado sin observaciones'
      },
      { 
        id: 2, 
        areaTematica: 'Energías Renovables',
        instituto: 'INER', 
        proyecto: 'Implementación de sistemas híbridos solares en comunidades de alta montaña.', 
        puntaje: '88.0',
        resultado: 'Ganador',
        observaciones: 'Requiere ajuste en cronograma'
      },
      { 
        id: 3, 
        areaTematica: 'Ciencias Sociales y Humanidades',
        instituto: 'ISAL', 
        proyecto: 'Estudio longitudinal sobre el impacto de las lenguas originarias en la educación básica.', 
        puntaje: '95.0',
        resultado: 'Ganador',
        observaciones: 'Aprobado'
      }
    ],
    reconocido: [
      { 
        id: 4, 
        facultad: 'Ciencias Biológicas',
        instituto: 'Instituto de Investigaciones Biológicas de Altura (IIBA)', 
        responsable: 'Vilca Apaza, Julian Manuel'
      },
      { 
        id: 5, 
        facultad: 'Ingeniería Mecánica Eléctrica, Electrónica y Sistemas',
        instituto: 'Instituto de Ciencia de Datos e Inteligencia Artificial (ICDIA)', 
        responsable: 'Paredes Mamani, Jose Luis'
      },
      { 
        id: 6, 
        facultad: 'Ciencias Agrarias',
        instituto: 'Instituto de Investigación en Ganadería Andina (IIGA)', 
        responsable: 'Flores Condori, María Elena'
      }
    ]
  };

  return (
    <div className="institutos-page">
      <section className="institutos-hero">
        <div className="container">
          <span className="section-badge animate-fade">Investigación de Alto Impacto</span>
          <h1 className="title-large animate-fade">Institutos de Investigación</h1>
          <p className="subtitle-large animate-fade">Centros de excelencia dedicados a la investigación especializada y el desarrollo tecnológico.</p>
        </div>
      </section>

      <section className="institutos-content">
        <div className="container">
          {/* Selector de Años (Simulado) */}
          <div className="year-selector">
            <button className="year-btn active">2024</button>
            <button className="year-btn">2023</button>
            <button className="year-btn">2022</button>
          </div>

          <div className="content-grid">
            <div className="tabs-sidebar">
              <button 
                className={`tab-link ${activeTab === 'financiado' ? 'active' : ''}`}
                onClick={() => setActiveTab('financiado')}
              >
                <span className="tab-icon">
                  <IconBank />
                </span>
                <div className="tab-text">
                  <strong>Financiados</strong>
                  <span>Proyectos Ganadores</span>
                </div>
              </button>
              <button 
                className={`tab-link ${activeTab === 'reconocido' ? 'active' : ''}`}
                onClick={() => setActiveTab('reconocido')}
              >
                <span className="tab-icon">
                  <IconCertificate />
                </span>
                <div className="tab-text">
                  <strong>Reconocidos</strong>
                  <span>Registro Institucional</span>
                </div>
              </button>
            </div>

            <div className="results-container">
              <div className="results-header">
                <h3>Institutos {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}s</h3>
                <div className="res-meta">
                  <span className="count-label">Total encontrados:</span>
                  <span className="count-badge">{institutosData[activeTab].length}</span>
                </div>
              </div>

              <div className="institutos-grid-cards animate-fade" key={activeTab}>
                {institutosData[activeTab].map(item => (
                  <div key={item.id} className="instituto-card-item">
                    
                    {/* Renderizado Condicional para FINANCIADO */}
                    {activeTab === 'financiado' && (
                      <>
                        <div className="i-card-head">
                          <div className="i-card-pref">
                            <span className="i-area">{item.areaTematica}</span>
                          </div>
                          <div className="i-score-badge">PTJE: {item.puntaje}</div>
                        </div>
                        
                        <h4 className="i-card-title">{item.instituto}</h4>
                        
                        <div className="i-card-info">
                          <div className="i-info-row-stack">
                            <span className="i-label">Proyecto de Investigación:</span>
                            <span className="i-value-project">"{item.proyecto}"</span>
                          </div>
                          <div className="i-info-row">
                            <span className="i-label">Resultado:</span>
                            <span className="i-value-winner">{item.resultado}</span>
                          </div>
                        </div>
                      </>
                    )}

                    {/* Renderizado Condicional para RECONOCIDO */}
                    {activeTab === 'reconocido' && (
                      <>
                        <div className="i-card-head">
                          <div className="i-card-pref">
                            <span className="i-fac">{item.facultad}</span>
                          </div>
                        </div>
                        
                        <h4 className="i-card-title-lg">{item.instituto}</h4>
                        
                        <div className="i-card-info">
                          <div className="i-info-row-stack">
                            <span className="i-label">Responsable del Instituto:</span>
                            <span className="i-value-resp-lg">{item.responsable}</span>
                          </div>
                        </div>
                      </>
                    )}

                    <div className="i-card-footer">
                      <button className="i-btn-ficha">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg>
                        Ver Detalle Completo
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Institutos;

