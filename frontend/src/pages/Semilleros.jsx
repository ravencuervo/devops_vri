import React, { useState } from 'react';
import './Semilleros.css';

const Semilleros = () => {
  const [activeTab, setActiveTab] = useState('financiado');

  const IconSeedling = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-5-4-5-4-3 2.4-5 4S3 13 3 15a7 7 0 0 0 7 7z" /><path d="M12 18V2M5 10l7 2 7-2" />
    </svg>
  );

  const IconAward = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>
    </svg>
  );

  const semillerosData = {
    financiado: [
      { 
        id: 1, 
        name: 'Innovación en Cultivos Andinos y Cambio Climático', 
        facultad: 'Ciencias Agrarias', 
        escuela: 'Ingeniería Agroeconómica', 
        presupuesto: 'S/ 5,000.00',
        linea: 'Seguridad Alimentaria y Nutricional',
        lider: 'Vargas Machuca, Alejandro',
        coordinador: 'Luna Mendivil, Beatriz',
        integrantes: ['Vilca, Ramiro', 'Mamani, Sofía', 'Condori, Carlos', 'Apaza, Elena']
      },
      { 
        id: 2, 
        name: 'Energías Renovables en el Altiplano Puneño', 
        facultad: 'Ingeniería Mecánica Eléctrica', 
        escuela: 'Ing. Mecánica Eléctrica', 
        presupuesto: 'S/ 4,500.00',
        linea: 'Ecoeficiencia y Energías Limpias',
        lider: 'Mendoza Soto, Roberto',
        coordinador: 'Pari, Carmen Rosa',
        integrantes: ['Huamán, Pedro', 'Flores, Julia', 'Ticona, Marcos']
      },
      { 
        id: 3, 
        name: 'Estudio de Lenguas Originarias y Educación Intercultural', 
        facultad: 'Ciencias Sociales', 
        escuela: 'Educación Secundaria', 
        presupuesto: 'S/ 3,800.00',
        linea: 'Desarrollo Humano e Inclusión',
        lider: 'Quispe Mamani, Jose Antonio',
        coordinador: 'Zapana, Delia Roxana',
        integrantes: ['Peralta, Kevin', 'Callo, Diana', 'Zeballos, Omar', 'Copa, Maritza']
      },
      { 
        id: 5, 
        name: 'Gestión Sostenible del Recurso Hídrico en el Titicaca', 
        facultad: 'Ingeniería Agrícola', 
        escuela: 'Ingeniería Agrícola', 
        presupuesto: 'S/ 5,200.00',
        linea: 'Gestión Ambiental y Biodiversidad',
        lider: 'Arpasi, Julian Alberto',
        coordinador: 'Velásquez, Milton Jorge',
        integrantes: ['López, Fernando', 'Ruelas, Mirian', 'Cruz, Santiago']
      },
      { 
        id: 6, 
        name: 'Salud Pública y Nutrición en Zonas Rurales', 
        facultad: 'Ciencias de la Salud', 
        escuela: 'Nutrición Humana', 
        presupuesto: 'S/ 4,800.00',
        linea: 'Salud y Bienestar Social',
        lider: 'Andia Flores, Greis',
        coordinador: 'Castillo, Monica Sofia',
        integrantes: ['Yucra, Raul', 'Soto, Gabriela', 'Pinto, Ismael']
      },
      { 
        id: 7, 
        name: 'Marketing Digital para Pymes de la Región Puno', 
        facultad: 'Ciencias Contables y Administrativas', 
        escuela: 'Administración', 
        presupuesto: 'S/ 4,000.00',
        linea: 'Economía y Emprendimiento',
        lider: 'Flores Apaza, Veronica',
        coordinador: 'Bernedo, Luis Miguel',
        integrantes: ['Cano, Andrea', 'Valencia, Jorge', 'Ugarte, Monica']
      }
    ],
    reconocido: [
      { 
        id: 4, 
        name: 'Ciberseguridad y Ética en la Era Digital', 
        facultad: 'Ingeniería de Sistemas', 
        escuela: 'Ing. de Sistemas',
        linea: 'Tecnologías de la Información',
        lider: 'Mamani Gomez, Jose Antonio',
        coordinador: 'Fernandez Choque, Walter',
        integrantes: ['Choque, Luz', 'Pineda, Ricardo', 'Mendoza, Vanessa', 'Gomez, Daniel']
      },
      { 
        id: 8, 
        name: 'Arquitectura Colonial en el Altiplano', 
        facultad: 'Ingeniería Civil y Arquitectura', 
        escuela: 'Arquitectura',
        linea: 'Cultura e Identidad Regional',
        lider: 'Arias Calderon, Francisco',
        coordinador: 'Paredes, Claudia Marina',
        integrantes: ['Salas, Roberto', 'Nuñez, Estefany']
      }
    ]
  };

  return (
    <div className="semilleros-page">
      <section className="semilleros-hero">
        <div className="container">
          <span className="section-badge animate-fade">Investigación Estudiantil</span>
          <h1 className="title-large animate-fade">Semilleros de Investigación</h1>
          <p className="subtitle-large animate-fade">Formando la próxima generación de científicos y académicos de la UNA Puno.</p>
        </div>
      </section>

      <section className="semilleros-content">
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
                  <IconSeedling />
                </span>
                <div className="tab-text">
                  <strong>Financiados</strong>
                  <span>Con presupuesto VRI</span>
                </div>
              </button>
              <button 
                className={`tab-link ${activeTab === 'reconocido' ? 'active' : ''}`}
                onClick={() => setActiveTab('reconocido')}
              >
                <span className="tab-icon">
                  <IconAward />
                </span>
                <div className="tab-text">
                  <strong>Reconocidos</strong>
                  <span>Resolución de Directorio</span>
                </div>
              </button>
            </div>

            <div className="results-container">
              <div className="results-header">
                <h3>Semilleros {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}s</h3>
                <div className="res-meta">
                  <span className="count-label">Total encontrados:</span>
                  <span className="count-badge">{semillerosData[activeTab].length}</span>
                </div>
              </div>

              <div className="semilleros-grid-cards animate-fade" key={activeTab}>
                {semillerosData[activeTab].map(item => (
                  <div key={item.id} className="semillero-card-item">
                    <div className="s-card-head">
                      <div className="s-card-pref">
                        <span className="s-fac">{item.facultad}</span>
                        <span className="s-esc">{item.escuela}</span>
                      </div>
                      {activeTab === 'financiado' && (
                        <div className="s-budget-badge">{item.presupuesto}</div>
                      )}
                    </div>
                    
                    <h4 className="s-card-title">{item.name}</h4>
                    
                    <div className="s-card-info">
                      <div className="s-info-row">
                        <span className="s-label">Línea de Inv:</span>
                        <span className="s-value-linea">{item.linea}</span>
                      </div>
                      <div className="s-info-row">
                        <span className="s-label">Líder:</span>
                        <span className="s-value-lider">{item.lider}</span>
                      </div>
                      <div className="s-info-row">
                        <span className="s-label">Coordinador:</span>
                        <span className="s-value-coord">{item.coordinador}</span>
                      </div>
                      <div className="s-info-row-stack">
                        <span className="s-label">Integrantes del Semillero:</span>
                        <ul className="s-value-list">
                          {item.integrantes.map((nombre, i) => (
                            <li key={i}>{nombre}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="s-card-footer">
                      <button className="s-btn-ficha">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg>
                        Ver Ficha Completa
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

export default Semilleros;
