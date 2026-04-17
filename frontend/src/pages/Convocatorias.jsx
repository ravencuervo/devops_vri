import React, { useState } from 'react';
import './Convocatorias.css';

const Icons = {
  Search: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>,
  Calendar: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  Check: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>,
  Download: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>,
  Info: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>,
  Money: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
};

export default function Convocatorias() {
  const [activeTab, setActiveTab] = useState('Todas'); // Status filter (Sidebar)
  const [filterType, setFilterType] = useState('Todas'); // Category filter (Pills)
  const [search, setSearch] = useState('');
  const [selectedConv, setSelectedConv] = useState(null);

  const convocatorias = [
    {
      id: 1,
      title: 'Proyectos de Investigación Básica y Aplicada 2026',
      type: 'Investigación',
      status: 'Abierta',
      funding: 'S/ 50,000',
      closureDate: '30 de Mayo, 2026',
      description: 'Financiamiento concursable dirigido a docentes investigadores para proyectos orientados a la solución de problemas regionales y nacionales. Prioridad en ciencias aplicadas e innovación tecnológica.',
      flyer: '/assets/portadas-hero/portada_investigacion.jpg',
      files: ['Bases Integradas', 'Anexos Formato Word', 'Cronograma']
    },
    {
      id: 2,
      title: 'Equipamiento y Modernización de Laboratorios CEI',
      type: 'Equipamiento',
      status: 'Abierta',
      funding: 'S/ 120,000',
      closureDate: '15 de Junio, 2026',
      description: 'Fondos destinados a la adquisición de equipos de alta tecnología para potenciar la investigación en los Centros Experimentales. Requisito indispensable: pertenecer a un grupo de investigación.',
      flyer: '/assets/innovacion/illpa.jpg',
      files: ['Bases Específicas', 'Ficha Técnica']
    },
    {
      id: 3,
      title: 'Apoyo a Tesis de Pregrado y Posgrado',
      type: 'Tesis',
      status: 'Cerrada',
      funding: 'S/ 5,000',
      closureDate: '10 de Marzo, 2026',
      description: 'Subvenciones económicas para la ejecución de proyectos de tesis destinados a estudiantes de últimos semestres y egresados. Cubre insumos y recolección de datos.',
      flyer: '/assets/idi/idi1.jpg',
      files: ['Resultados Finales', 'Resolución Rectoral']
    },
    {
      id: 4,
      title: 'Fondo para Estancias de Investigación',
      type: 'Movilidad',
      status: 'Abierta',
      funding: 'Variable',
      closureDate: 'Convocatoria Abierta',
      description: 'Financiamiento total o parcial para investigadores y docentes que requieran participar en congresos indexados internacionales o pasantías post-doctorales.',
      flyer: '/assets/carousel/c3.jpg',
      files: ['Directiva de Movilidad', 'Formatos de Solicitud']
    }
  ];

  const types = ['Todas', 'Investigación', 'Equipamiento', 'Tesis', 'Movilidad'];

  const filtered = convocatorias.filter(conv => {
    const matchesStatus = activeTab === 'Todas' || conv.status === activeTab;
    const matchesType = filterType === 'Todas' || conv.type === filterType;
    const matchesSearch = conv.title.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesType && matchesSearch;
  });

  return (
    <div className="page-convocatorias">
      
      {/* HERO SECTION */}
      <section className="convocatorias-hero">
        <div className="container">
          <span className="section-badge animate-fade">Financiamiento Institucional</span>
          <h1 className="hero-title animate-fade delay-1">Convocatorias y Fondos</h1>
          <p className="hero-subtitle animate-fade delay-2">
            Impulsamos el desarrollo científico a través de subvenciones competitivas para la comunidad académica de la UNA Puno.
          </p>
        </div>
      </section>

      {/* CONTENT WITH SIDEBAR */}
      <section className="convocatorias-main-content container section-padding">
        <div className="content-grid">
          
          {/* SIDEBAR TABS - STATUS */}
          <aside className="tabs-sidebar">
            <button 
              className={`tab-link ${activeTab === 'Todas' ? 'active' : ''}`}
              onClick={() => setActiveTab('Todas')}
            >
              <span className="tab-icon">{Icons.Search}</span>
              <div className="tab-text">
                <strong>Todas</strong>
                <span>Historial Completo</span>
              </div>
            </button>
            <button 
              className={`tab-link ${activeTab === 'Abierta' ? 'active' : ''}`}
              onClick={() => setActiveTab('Abierta')}
            >
              <span className="tab-icon" style={{color: '#059669'}}>{Icons.Check}</span>
              <div className="tab-text">
                <strong>Abiertas</strong>
                <span>Postulaciones Activas</span>
              </div>
            </button>
            <button 
              className={`tab-link ${activeTab === 'Cerrada' ? 'active' : ''}`}
              onClick={() => setActiveTab('Cerrada')}
            >
              <span className="tab-icon" style={{color: '#ef4444'}}>{Icons.Calendar}</span>
              <div className="tab-text">
                <strong>Cerradas</strong>
                <span>Resultados y Archivos</span>
              </div>
            </button>
          </aside>

          {/* MAIN RESULTS AREA */}
          <div className="results-container">
            
            <div className="filters-header-bar">
              <div className="search-box">
                {Icons.Search}
                <input 
                  type="text" 
                  placeholder="Buscar convocatoria..." 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="category-pills">
                {types.map(type => (
                  <button 
                    key={type} 
                    className={`pill-btn ${filterType === type ? 'active' : ''}`}
                    onClick={() => setFilterType(type)}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div className="results-info-row">
              <h3>{activeTab} Convocatorias</h3>
              <span className="count-badge">{filtered.length} encontradas</span>
            </div>

            <div className="conv-visual-grid animate-fade">
              {filtered.length > 0 ? (
                filtered.map(conv => (
                  <div 
                    key={conv.id} 
                    className={`conv-flyer-card ${conv.status === 'Cerrada' ? 'is-closed' : ''}`}
                    onClick={() => setSelectedConv(conv)}
                  >
                    <div className="card-image-bg" style={{ backgroundImage: `url(${conv.flyer})` }} />
                    <div className="conv-flyer-overlay">
                      <div className="flyer-top-tags">
                        <span className="f-tag-type">{conv.type}</span>
                        <span className={`f-tag-status ${conv.status === 'Abierta' ? 'status-open' : 'status-closed'}`}>
                          {conv.status === 'Abierta' ? '🟢 Abierta' : '🔴 Cerrada'}
                        </span>
                      </div>

                      <div className="flyer-bottom-content">
                        <h3 className="f-title">{conv.title}</h3>
                        <div className="f-meta-simple">
                          <span>{conv.closureDate}</span>
                          <span className="dot">•</span>
                          <span>{conv.funding}</span>
                        </div>
                        <div className="btn-fake-action">Ver Detalles</div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-results-state">
                  {Icons.Info}
                  <p>No se encontraron convocatorias para estos criterios.</p>
                </div>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* MODAL DETALLES */}
      {selectedConv && (
        <div className="conv-modal-overlay" onClick={() => setSelectedConv(null)}>
          <div className="conv-modal-container" onClick={e => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setSelectedConv(null)}>×</button>
            <div className="modal-split">
              <div className="modal-info-side">
                <span className="modal-type-tag">{selectedConv.type}</span>
                <h2 className="modal-title">{selectedConv.title}</h2>
                
                <div className="modal-key-data">
                  <div className="key-item">
                    <span className="k-label">Cierre de Postulación</span>
                    <span className="k-value">{selectedConv.closureDate}</span>
                  </div>
                  <div className="key-item">
                    <span className="k-label">Financiamiento</span>
                    <span className="k-value">{selectedConv.funding}</span>
                  </div>
                </div>

                <div className="modal-desc">
                  {selectedConv.description}
                </div>

                <div className="modal-docs">
                  <h4>Documentos de la Convocatoria</h4>
                  <div className="docs-list">
                    {selectedConv.files.map((file, idx) => (
                      <a key={idx} href="#" className="doc-link-item">
                        <span className="d-icon">{Icons.Download}</span>
                        <span className="d-name">{file}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="modal-img-side" style={{ backgroundImage: `url(${selectedConv.flyer})` }}>
                <div className="img-overlay"></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
