import React, { useState } from 'react';
import './Investigadores.css';

const Investigadores = () => {
  const [activeTab, setActiveTab] = useState('una');

  const IconGraduation = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  );

  const IconMedal = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.12" /><circle cx="12" cy="8" r="7" />
    </svg>
  );

  // Datos planos
  const flatData = {
    una: [
      { id: 1, facultad: 'Ingeniería Mecánica Eléctrica, Electrónica y Sistemas', escuela: 'Ingeniería de Sistemas', nombre: 'Arpasi Arpasi, Julian', nivel: 'NIVEL I', url: 'https://ctivitae.concytec.gob.pe/' },
      { id: 2, facultad: 'Ingeniería Mecánica Eléctrica, Electrónica y Sistemas', escuela: 'Ingeniería de Sistemas', nombre: 'Paredes Mamani, Jose Luis', nivel: 'NIVEL II', url: 'https://ctivitae.concytec.gob.pe/' },
      { id: 3, facultad: 'Ingeniería Mecánica Eléctrica, Electrónica y Sistemas', escuela: 'Ingeniería Mecánica Eléctrica', nombre: 'Mendoza Soto, Roberto', nivel: 'NIVEL I', url: 'https://ctivitae.concytec.gob.pe/' },
      { id: 4, facultad: 'Ciencias Sociales', escuela: 'Antropología', nombre: 'Arias Calderon, Francisco', nivel: 'NIVEL III', url: 'https://ctivitae.concytec.gob.pe/' },
      { id: 5, facultad: 'Ciencias Sociales', escuela: 'Sociología', nombre: 'Mendoza Soto, Carmen Rosa', nivel: 'NIVEL II', url: 'https://ctivitae.concytec.gob.pe/' },
      { id: 6, facultad: 'Ciencias Agrarias', escuela: 'Ingeniería Agroeconómica', nombre: 'Vargas Machuca, Alejandro', nivel: 'NIVEL I', url: 'https://ctivitae.concytec.gob.pe/' }
    ],
    renacyt: [
      { id: 7, facultad: 'Ciencias Biológicas', escuela: 'Biología', nombre: 'Vilca Apaza, Julian Manuel', nivel: 'RENACYT Nivel I', url: 'https://ctivitae.concytec.gob.pe/' },
      { id: 8, facultad: 'Ciencias Biológicas', escuela: 'Biología', nombre: 'Flores Quispe, Roberto', nivel: 'RENACYT Nivel III', url: 'https://ctivitae.concytec.gob.pe/' },
      { id: 9, facultad: 'Ciencias de la Salud', escuela: 'Nutrición Humana', nombre: 'Andia Flores, Greis', nivel: 'RENACYT Nivel II', url: 'https://ctivitae.concytec.gob.pe/' },
      { id: 10, facultad: 'Ciencias Agrarias', escuela: 'Ingeniería Agronómica', nombre: 'Pari, Carmen Rosa', nivel: 'RENACYT Nivel IV', url: 'https://ctivitae.concytec.gob.pe/' }
    ]
  };

  const groupData = (data) => {
    return data.reduce((acc, curr) => {
      if (!acc[curr.facultad]) {
        acc[curr.facultad] = {};
      }
      if (!acc[curr.facultad][curr.escuela]) {
        acc[curr.facultad][curr.escuela] = [];
      }
      acc[curr.facultad][curr.escuela].push(curr);
      return acc;
    }, {});
  };

  const groupedData = groupData(flatData[activeTab]);

  return (
    <div className="invest-page">
      <section className="invest-hero">
        <div className="container">
          <span className="section-badge animate-fade">Capital Humano Científico</span>
          <h1 className="title-large animate-fade">Directorio de Investigadores</h1>
          <p className="subtitle-large animate-fade">El motor del desarrollo de la ciencia y la innovación en nuestra universidad.</p>
        </div>
      </section>

      <section className="invest-content">
        <div className="container">
          <div className="content-grid">
            <div className="tabs-sidebar">
              <button 
                className={`tab-link ${activeTab === 'una' ? 'active' : ''}`}
                onClick={() => setActiveTab('una')}
              >
                <span className="tab-icon">
                  <IconGraduation />
                </span>
                <div className="tab-text">
                  <strong>Docentes UNA</strong>
                  <span>Investigadores Institucionales</span>
                </div>
              </button>
              <button 
                className={`tab-link ${activeTab === 'renacyt' ? 'active' : ''}`}
                onClick={() => setActiveTab('renacyt')}
              >
                <span className="tab-icon">
                  <IconMedal />
                </span>
                <div className="tab-text">
                  <strong>Docentes RENACYT</strong>
                  <span>Registro Nacional Concytec</span>
                </div>
              </button>
            </div>

            <div className="results-container">
              <div className="results-header">
                <h3>{activeTab === 'una' ? 'Investigadores de la UNA Puno' : 'Investigadores Calificados RENACYT'}</h3>
                <div className="res-meta">
                  <span className="count-label">Total listados:</span>
                  <span className="count-badge">{flatData[activeTab].length}</span>
                </div>
              </div>

              <div className="invest-clean-layout animate-fade" key={activeTab}>
                {Object.keys(groupedData).map((facultadStr) => (
                  <div key={facultadStr} className="clean-facultad-group">
                    <h4 className="clean-facultad-title">{facultadStr}</h4>
                    
                    {Object.keys(groupedData[facultadStr]).map((escuelaStr) => (
                      <div key={escuelaStr} className="clean-escuela-section">
                        <div className="clean-escuela-header">
                          <div className="escuela-logo-sm">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                          </div>
                          <h5>E.P. {escuelaStr}</h5>
                        </div>
                        
                        <div className="clean-profile-grid">
                          {groupedData[facultadStr][escuelaStr].map(inv => (
                            <div key={inv.id} className="profile-card">
                              <div className="profile-main">
                                <div className="profile-avatar">
                                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                                </div>
                                <div className="profile-info">
                                  <h6 className="profile-name">{inv.nombre}</h6>
                                  <span className={`profile-badge ${activeTab === 'renacyt' ? 'badge-renacyt' : 'badge-una'}`}>
                                    {inv.nivel}
                                  </span>
                                </div>
                              </div>
                              <div className="profile-actions">
                                <a href={inv.url} target="_blank" rel="noopener noreferrer" className="btn-cti-vitae">
                                  Ver Perfil CTIVitae
                                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                                </a>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
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

export default Investigadores;

