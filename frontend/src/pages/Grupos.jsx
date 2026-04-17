import React, { useState } from 'react';
import './Grupos.css';

const Grupos = () => {
  const [activeTab, setActiveTab] = useState('financiado');

  const IconUsers = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );

  const IconClipboard = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /><rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
    </svg>
  );

  const gruposData = {
    financiado: [
      { 
        id: 1, 
        name: 'Grupo de Investigación en Biotecnología Altiplánica (GIBA)', 
        facultad: 'Ciencias Biológicas', 
        escuela: 'Biología', 
        presupuesto: 'S/ 15,200.00',
        linea: 'Biotecnología y Recursos Genéticos',
        responsable: 'Vilca Apaza, Julian Manuel',
        integrantes: ['Mamani Condori, Luz Marina', 'Flores Quispe, Roberto', 'Ticona Pari, Elena']
      },
      { 
        id: 2, 
        name: 'Desarrollo de Software e Inteligencia Artificial (DSIA)', 
        facultad: 'Ingeniería Mecánica Eléctrica, Electrónica y Sistemas', 
        escuela: 'Ingeniería de Sistemas', 
        presupuesto: 'S/ 12,500.00',
        linea: 'Inteligencia Artificial y Ciencia de Datos',
        responsable: 'Paredes Mamani, Jose Luis',
        integrantes: ['Zeballos Copa, Omar', 'Cano Ugarte, Andrea', 'Valencia Jorge, Monica']
      },
      { 
        id: 3, 
        name: 'Estudios de Conflictos Sociales y Gobernanza', 
        facultad: 'Ciencias Sociales', 
        escuela: 'Sociología', 
        presupuesto: 'S/ 8,900.00',
        linea: 'Gobernabilidad y Ciudadanía',
        responsable: 'Mendoza Soto, Carmen Rosa',
        integrantes: ['Andia Flores, Greis', 'Bernedo Castelo, Luis Miguel']
      }
    ],
    reconocido: [
      { 
        id: 4, 
        name: 'Historia y Arqueología del Altiplano', 
        facultad: 'Ciencias Sociales', 
        escuela: 'Antropología',
        linea: 'Cultura e Identidad Regional',
        responsable: 'Arias Calderon, Francisco',
        integrantes: ['Salas Roberto, Estefany', 'Nuñez Paredes, Claudia']
      },
      { 
        id: 5, 
        name: 'Economía Circular y Sostenibilidad', 
        facultad: 'Ciencias Contables y Administrativas', 
        escuela: 'Administración',
        linea: 'Economía y Emprendimiento',
        responsable: 'Flores Apaza, Veronica',
        integrantes: ['Yucra Soto, Raul', 'Pinto Ismael, Gabriela']
      }
    ]
  };

  return (
    <div className="grupos-page">
      <section className="grupos-hero">
        <div className="container">
          <span className="section-badge animate-fade">Redes de Conocimiento</span>
          <h1 className="title-large animate-fade">Grupos de Investigación</h1>
          <p className="subtitle-large animate-fade">Comunidades académicas dedicadas a la generación de ciencia y tecnología en la UNA Puno.</p>
        </div>
      </section>

      <section className="grupos-content">
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
                  <IconUsers />
                </span>
                <div className="tab-text">
                  <strong>Financiados</strong>
                  <span>Fondos Concursables VRI</span>
                </div>
              </button>
              <button 
                className={`tab-link ${activeTab === 'reconocido' ? 'active' : ''}`}
                onClick={() => setActiveTab('reconocido')}
              >
                <span className="tab-icon">
                  <IconClipboard />
                </span>
                <div className="tab-text">
                  <strong>Reconocidos</strong>
                  <span>Directorio Institucional</span>
                </div>
              </button>
            </div>

            <div className="results-container">
              <div className="results-header">
                <h3>Grupos {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}s</h3>
                <div className="res-meta">
                  <span className="count-label">Total encontrados:</span>
                  <span className="count-badge">{gruposData[activeTab].length}</span>
                </div>
              </div>

              <div className="grupos-grid-cards animate-fade" key={activeTab}>
                {gruposData[activeTab].map(item => (
                  <div key={item.id} className="grupo-card-item">
                    <div className="g-card-head">
                      <div className="g-card-pref">
                        <span className="g-fac">{item.facultad}</span>
                        <span className="g-esc">{item.escuela}</span>
                      </div>
                      {activeTab === 'financiado' && (
                        <div className="g-budget-badge">{item.presupuesto}</div>
                      )}
                    </div>
                    
                    <h4 className="g-card-title">{item.name}</h4>
                    
                    <div className="g-card-info">
                      <div className="g-info-row">
                        <span className="g-label">Línea:</span>
                        <span className="g-value-linea">{item.linea}</span>
                      </div>
                      <div className="g-info-row">
                        <span className="g-label">Responsable:</span>
                        <span className="g-value-resp">{item.responsable}</span>
                      </div>
                      <div className="g-info-row-stack">
                        <span className="g-label">Integrantes del Grupo:</span>
                        <ul className="g-value-list">
                          {item.integrantes.map((nombre, i) => (
                            <li key={i}>{nombre}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="g-card-footer">
                      <button className="g-btn-ficha">
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

export default Grupos;

