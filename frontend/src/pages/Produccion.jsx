import React, { useState } from 'react';
import './Produccion.css';

const Produccion = () => {
  const [selectedCenter, setSelectedCenter] = useState(null);

  const Icons = {
    Health: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg>,
    Tourism: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2v-5" /></svg>,
    Sport: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3" /><path d="M15.5 9.5a2.5 2.5 0 0 1-2.5 2.5c1.38 0 2 .5 3 1" /></svg>,
    Industry: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 20h20" /><path d="M5 20V8l7-4v4l7-4v12" /><line x1="9" y1="12" x2="9" y2="12.01" /><line x1="9" y1="16" x2="9" y2="16.01" /><line x1="15" y1="12" x2="15" y2="12.01" /><line x1="15" y1="16" x2="15" y2="16.01" /></svg>,
    Tech: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>,
    Language: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m5 8 6 6" /><path d="m4 14 6-6 2-3" /><path d="M2 5h12" /><path d="M7 2h1" /><path d="m22 22-5-10-5 10" /><path d="M14 18h6" /></svg>,
    Academic: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></svg>,
    Farm: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2.7 10.3a2.4 2.4 0 0 0 0 3.4l.6.6a2.4 2.4 0 0 0 3.4 0l.6-.6a2.4 2.4 0 0 0 0-3.4l-.6-.6a2.4 2.4 0 0 0-3.4 0l-.6.6Z" /><path d="M12.4 7.6a2.4 2.4 0 0 0 0 3.4l.6.6a2.4 2.4 0 0 0 3.4 0l.6-.6a2.4 2.4 0 0 0 0-3.4l-.6-.6a2.4 2.4 0 0 0-3.4 0l-.6.6Z" /><path d="m2 2 1.5 1.5" /><path d="m22 22-1.5-1.5" /><path d="M22 2 10.5 13.5" /><path d="M2 22 13.5 10.5" /></svg>,
    Service: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.77 3.77Z" /></svg>
  };

  const centros = [
    {
      title: 'Servicentro',
      icon: Icons.Service,
      img: '/assets/CPBS/servicentro.png',
      desc: 'Suministro de combustible y servicios automotrices con garantía institucional.',
      map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d309.57135445933795!2d-70.01487902709385!3d-15.827146406385243!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x915d69bb2b7b65cf%3A0x2c9ec48e131ef748!2sGrifo%20Repsol%20Universitario!5e1!3m2!1ses-419!2spe!4v1776409933498!5m2!1ses-419!2spe&maptype=satellite'
    },
    {
      title: 'Agencia de Viajes y Turismo',
      icon: Icons.Tourism,
      img: '/assets/CPBS/turismo.jpg',
      desc: 'Paquetes turísticos locales y nacionales diseñados para la comunidad universitaria.',
      map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d309.5746810927412!2d-70.0167253833203!3d-15.824974363466861!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x915d69b86255bb29%3A0xe619a47a79d60362!2sVicerrectorado%20de%20Investigacion%20UNA%20Puno!5e1!3m2!1ses-419!2spe!4v1776410149572!5m2!1ses-419!2spe&maptype=satellite'
    },
    {
      title: 'Piscina, Sauna y Jacuzzi',
      icon: Icons.Sport,
      img: '/assets/CPBS/piscina.png',
      desc: 'Centro de recreación y salud con instalaciones de primer nivel.',
      map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d309.57446169717264!2d-70.01439158032291!3d-15.825117621319029!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x915d69a54b4f2b47%3A0xe4def8227f30bc42!2sPiscina%20UNA!5e1!3m2!1ses-419!2spe!4v1776410502502!5m2!1ses-419!2spe&maptype=satellite'
    },
    {
      title: 'Estadio Universitario',
      icon: Icons.Sport,
      img: '/assets/CPBS/estadio.jpg',
      desc: 'Escenario deportivo icónico para eventos académicos y recreativos.',
      map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1802.518113104047!2d-70.01650520297633!3d-15.826696116929998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x915d69df5a56891f%3A0x21b5075210668cd8!2sEstadio%20Monumental%20de%20la%20Universidad%20Nacional%20del%20Altiplano%20de%20Puno!5e1!3m2!1ses-419!2spe!4v1776410560789!5m2!1ses-419!2spe&maptype=satellite'
    },
    {
      title: 'Hospital Universitario',
      icon: Icons.Health,
      img: '/assets/CPBS/hospital.png',
      desc: 'Atención médica integral con tecnología de punta y especialistas calificados.',
      map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d675.1894801089823!2d-70.01260875825996!3d-15.824281873966799!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x915d69fa4aecf76f%3A0xc26d4a3e4b02c35b!2sServicio%20M%C3%A9dico%20Primario%20UNA%20Puno!5e1!3m2!1ses-419!2spe!4v1776410633499!5m2!1ses-419!2spe&maptype=satellite'
    },
    {
      title: 'Clínica Odontológica',
      icon: Icons.Health,
      img: '/assets/CPBS/odontologica.jpg',
      desc: 'Servicios odontológicos preventivos y especializados abiertos al público.',
      map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d520.6376853334469!2d-70.01742686358726!3d-15.82605905498881!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x915d69d074d29573%3A0x5c1795f09a96bc52!2sClinica%20Odontologica%20UNA-PUNO!5e1!3m2!1ses-419!2spe!4v1776410685204!5m2!1ses-419!2spe&maptype=satellite'
    },
    {
      title: 'Panificadora y Confitería',
      icon: Icons.Industry,
      img: '/assets/CPBS/panificadora.jpeg',
      desc: 'Producción diaria de alimentos nutritivos con estándares de higiene superior.',
      map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d309.5744885765864!2d-70.01675905507425!3d-15.825100070043037!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x915d691f9ed435cd%3A0x84116f0b030b23d7!2sPanificadora%20y%20Confiter%C3%ADa%20de%20la%20UNAP!5e1!3m2!1ses-419!2spe!4v1776410723259!5m2!1ses-419!2spe&maptype=satellite'
    },
    {
      title: 'Instituto de Informática',
      icon: Icons.Tech,
      img: '/assets/CPBS/informatica.png',
      desc: 'Certificaciones internacionales y cursos de actualización tecnológica.',
      map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d309.54322129118833!2d-70.02319012724223!3d-15.845503660360858!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x915d69925c0ebccf%3A0x9430b9ad5c54a22b!2sCentro%20de%20Computo%20e%20Inform%C3%A1tica%20UNA%20PUNO!5e1!3m2!1ses-419!2spe!4v1776410761139!5m2!1ses-419!2spe&maptype=satellite'
    },
    {
      title: 'Instituto de Idiomas',
      icon: Icons.Language,
      img: '/assets/CPBS/idiomas.jpg',
      desc: 'Enseñanza de lenguas nativas y extranjeras reconocida regionalmente.',
      map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d378.9112158341789!2d-70.0280710335163!3d-15.83818082857817!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x915d69eae9830bb5%3A0xa1657a54234725bf!2sCentro%20de%20Estudios%20de%20Lenguas%20Extranjeras%20y%20Nativas%20UNA%20-%20Puno!5e1!3m2!1ses-419!2spe!4v1776410784242!5m2!1ses-419!2spe&maptype=satellite'
    },
    {
      title: 'Centro Preuniversitario',
      icon: Icons.Academic,
      img: '/assets/CPBS/preu.png',
      desc: 'Preparación integral para el ingreso a las diferentes escuelas profesionales.',
      map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d619.087292509502!2d-70.02351721233481!3d-15.845226520323692!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x915d69eaea3b9315%3A0xb8b5a947f95796a2!2sCEPREUNA!5e1!3m2!1ses-419!2spe!4v1776410810058!5m2!1ses-419!2spe&maptype=satellite'
    },
    {
      title: 'Escuela de Prácticos Agropecuarios',
      icon: Icons.Farm,
      img: '/assets/CPBS/agro.jpeg',
      desc: 'Producción experimental y formación técnica en el sector agropecuario.',
      map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d368.14859385288287!2d-70.01697916029282!3d-15.824875269358579!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x915d69b86255bb29%3A0xe619a47a79d60362!2sVicerrectorado%20de%20Investigacion%20UNA%20Puno!5e1!3m2!1ses-419!2spe!4v1776410850651!5m2!1ses-419!2spe&maptype=satellite'
    },
    {
      title: 'Hospital Veterinario',
      icon: Icons.Health,
      img: '/assets/CPBS/vete.jpg',
      desc: 'Atención especializada para animales menores y mayores con laboratorios modernos.',
      map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d619.1581492391316!2d-70.0192876001088!3d-15.82210527363061!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x915d69007106571d%3A0x64338dfba63ea98!2sHospital%20Veterinario%20de%20la%20Facultad%20de%20Medicina%20Veterinaria%20y%20Zootecnia!5e1!3m2!1ses-419!2spe!4v1776410887346!5m2!1ses-419!2spe&maptype=satellite'
    }
  ];

  return (
    <div className="produccion-page">
      <section className="produccion-hero">
        <div className="container">
          <span className="section-badge animate-fade">Desarrollo Institucional</span>
          <h1 className="title-large animate-fade">Dirección de Producción de Bienes y Servicios</h1>
          <p className="subtitle-large animate-fade">Generamos valor y brindamos servicios de excelencia a la comunidad universitaria y regional.</p>
        </div>
      </section>

      <section className="quienes-somos container section-padding">
        <div className="split-layout">
          <div className="text-content">
            <h2 className="section-title">¿Quiénes Somos?</h2>
            <p className="p-large">
              Somos el órgano de línea de la Universidad Nacional del Altiplano encargado de gestionar
              las unidades operativas de bienes y servicios.
            </p>
            <p>
              Nuestra misión es optimizar los recursos institucionales para ofrecer productos y servicios
              de calidad, contribuyendo directamente al bienestar académico y al financiamiento de la investigación científica en nuestra universidad.
            </p>
            <div className="quienes-features">
              <div className="feature-item">
                <div className="feature-icon-sm">✓</div>
                <span>Gestión Eficiente</span>
              </div>
              <div className="feature-item">
                <div className="feature-icon-sm">✓</div>
                <span>Calidad Institucional</span>
              </div>
              <div className="feature-item">
                <div className="feature-icon-sm">✓</div>
                <span>Soporte a la Investigación</span>
              </div>
            </div>
          </div>
          <div className="image-accent">
            <div className="accent-box">
              <span className="stat-num">12+</span>
              <span className="stat-label">CPBS Activos</span>
            </div>
          </div>
        </div>
      </section>

      <section className="servicios-sec container section-padding">
        <div className="section-header center">
          <h2 className="section-title">Nuestras Líneas de Acción</h2>
          <p className="section-description">Diversificamos nuestra oferta para satisfacer las necesidades de Puno y la región Altiplánica.</p>
        </div>
        <div className="services-overview-grid">
          <div className="service-v-card">
            <div className="srv-v-icon">
              <span className="mono-icon-container">
                {Icons.Industry}
              </span>
            </div>
            <h3>Producción de Bienes</h3>
            <p>Elaboración de productos agropecuarios, panificadora y confitería bajo altos estándares de calidad institucional.</p>
          </div>
          <div className="service-v-card">
            <div className="srv-v-icon">
              <span className="mono-icon-container">
                {Icons.Service}
              </span>
            </div>
            <h3>Prestación de Servicios</h3>
            <p>Atención especializada en los centros de salud, laboratorios, turismo, recreación deportiva e informática.</p>
          </div>
          <div className="service-v-card">
            <div className="srv-v-icon">
              <span className="mono-icon-container">
                {Icons.Academic}
              </span>
            </div>
            <h3>Servicios Académicos</h3>
            <p>Capacitación técnica, idiomas y preparación preuniversitaria con los mejores docentes de la región.</p>
          </div>
        </div>
      </section>

      <section className="centros-produccion section-padding-bg">
        <div className="container">
          <div className="section-header center">
            <h2 className="section-title">Centros de Producción de Bienes y Servicios (CPBS)</h2>
            <p className="section-description">Unidades estratégicas que dinamizan la economía institucional de la UNA Puno.</p>
          </div>

          <div className="centros-visual-grid">
            {centros.map((item, index) => (
              <div
                key={index}
                className="cpbs-card animate-fade"
                style={{ backgroundImage: `url(${item.img})`, animationDelay: `${index * 0.1}s` }}
              >
                <div className="cpbs-overlay">
                  <div className="cpbs-content">
                    <div className="cpbs-icon-box">{item.icon}</div>
                    <h4 className="cpbs-title">{item.title}</h4>
                    <button
                      className="btn-cpbs-details"
                      onClick={() => setSelectedCenter(item)}
                    >
                      Ver Detalles
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MODAL DE DETALLES */}
      {selectedCenter && (
        <div className="cpbs-modal-overlay" onClick={() => setSelectedCenter(null)}>
          <div className="cpbs-modal-container" onClick={e => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setSelectedCenter(null)}>×</button>
            <div className="modal-split">
              <div className="modal-info-side">
                <span className="modal-badge">Centro de Producción</span>
                <h2 className="modal-title">{selectedCenter.title}</h2>
                <div className="modal-desc-box">
                  <p>{selectedCenter.desc}</p>
                </div>
                <div className="modal-location">
                  <h3><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg> Ubicación</h3>
                  <div className="map-embed-container">
                    <iframe
                      title="Google Maps Location"
                      src={selectedCenter.map}
                      width="100%"
                      height="250"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                </div>
              </div>
              <div className="modal-visual-side" style={{ backgroundImage: `url(${selectedCenter.img})` }}>
                <div className="visual-overlay"></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Produccion;


