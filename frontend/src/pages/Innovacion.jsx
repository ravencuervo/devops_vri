import React, { useState } from 'react';
import './Innovacion.css';

const Innovacion = () => {
  const [selectedCenter, setSelectedCenter] = useState(null);

  const Icons = {
    Science: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 2v7.31M14 9.31V2M8.5 2h7M14 9.31l6.32 8.63A2 2 0 0 1 18.7 21H5.3a2 2 0 0 1-1.62-3.06L10 9.31" /></svg>,
    Media: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="15" rx="2" ry="2" /><polyline points="17 2 12 7 7 2" /></svg>,
    Farm: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2.7 10.3a2.4 2.4 0 0 0 0 3.4l.6.6a2.4 2.4 0 0 0 3.4 0l.6-.6a2.4 2.4 0 0 0 0-3.4l-.6-.6a2.4 2.4 0 0 0-3.4 0l-.6.6Z" /><path d="M12.4 7.6a2.4 2.4 0 0 0 0 3.4l.6.6a2.4 2.4 0 0 0 3.4 0l.6-.6a2.4 2.4 0 0 0 0-3.4l-.6-.6a2.4 2.4 0 0 0-3.4 0l-.6.6Z" /><path d="m2 2 1.5 1.5" /><path d="m22 22-1.5-1.5" /><path d="M22 2 10.5 13.5" /><path d="M2 22 13.5 10.5" /></svg>,
    Industry: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 20h20" /><path d="M5 20V8l7-4v4l7-4v12" /><line x1="9" y1="12" x2="9" y2="12.01" /><line x1="9" y1="16" x2="9" y2="16.01" /><line x1="15" y1="12" x2="15" y2="12.01" /><line x1="15" y1="16" x2="15" y2="16.01" /></svg>,
    Patent: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>,
    Rocket: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" /><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" /><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" /><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" /></svg>
  };

  const centros = [
    { title: 'Chuquibambilla y San Juan', location: 'Melgar', icon: Icons.Farm, img: '/assets/CE/sanjuan.jpg', desc: 'Centro de investigación en mejoramiento genético de camélidos y ovinos de altura.', map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1523.249666160363!2d-70.7272409938674!3d-14.791025242841243!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91688db50366424d%3A0x463d45c3d3576e8a!2scentro%20experimental%20chuquibambilla%20-%20Universidad%20Nacional%20del%20Altiplano%20Puno!5e1!3m2!1ses-419!2spe!4v1776412779015!5m2!1ses-419!2spe&maptype=satellite' },
    { title: 'Camacani', location: 'Puno', icon: Icons.Farm, img: '/assets/CE/camacani.jpeg', desc: 'Laboratorio de campo dedicado a la agricultura y forestería andina.', map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1237.5045225141953!2d-69.85906259459395!3d-15.954108342787686!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x915d0d2c40820ec3%3A0x421ecf9afb3dd71b!2sCAMACANI!5e1!3m2!1ses-419!2spe!4v1776412905232!5m2!1ses-419!2spe&maptype=satellite' },
    { title: 'Tambopata', location: 'Sandia', icon: Icons.Farm, img: '/assets/CE/tambopata.jpeg', desc: 'Estación experimental para el estudio de cultivos tropicales y caficultura.', map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1288275.273334978!2d-71.09500075709407!3d-12.185496467226786!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x917078a6fe6c1921%3A0x6e99a4038045b62b!2sTambopata!5e1!3m2!1ses-419!2spe!4v1776413136902!5m2!1ses-419!2spe&maptype=satellite' },
    { title: 'Illpa', location: 'Puno', icon: Icons.Farm, img: '/assets/CE/illpa.jpg', desc: 'Centro especializado en pastos, forrajes y producción bovina.', map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1072.3901351289255!2d-70.08407893531916!3d-15.711924266121986!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x915d5d0076d0684f%3A0x3224f41d12c4ae72!2sCENTRO%20DE%20INVESTIGACION%20ILLPA!5e1!3m2!1ses-419!2spe!4v1776415926517!5m2!1ses-419!2spe&maptype=satellite' },
    { title: 'La Raya', location: 'Melgar', icon: Icons.Science, img: '/assets/CE/raya.jpeg', desc: 'Investigación en biotecnología y reproducción de alpacas a más de 4000 msnm.', map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d23711.136710666862!2d-70.99497432435001!3d-14.485842642102503!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9168c4db417a1f17%3A0xdb2265eb63e9d669!2sAbra%20La%20Raya!5e1!3m2!1ses-419!2spe!4v1776413452738!5m2!1ses-419!2spe&maptype=satellite' },
    { title: 'Carolina', location: 'Puno', icon: Icons.Farm, img: '/assets/CE/carolina.jpeg', desc: 'Desarrollo en horticultura y manejo sostenible de suelos.', map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4951.341092959604!2d-70.02980337381382!3d-15.900453775577766!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x915d6b00725135a7%3A0x5d82c81dc0f92076!2sCentro%20experimental%20carolina%20Unap!5e1!3m2!1ses-419!2spe!4v1776413486608!5m2!1ses-419!2spe&maptype=satellite' },
    { title: 'Radio y TV UNA', location: 'Puno', icon: Icons.Media, img: '/assets/CE/radio.jpg', desc: 'Centro de producción audiovisual e investigación en comunicaciones.', map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d437.77580516837685!2d-70.02792702840583!3d-15.8383159718067!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x915d69d7acc4929f%3A0x3cdf66b18053b6ef!2sCentro%20de%20Comunicaciones%20de%20la%20UNA%20-%20PUNO%20(CECUNA)!5e1!3m2!1ses-419!2spe!4v1776413513903!5m2!1ses-419!2spe&maptype=satellite' },
    { title: 'Chucuito', location: 'Chucuito', icon: Icons.Science, img: '/assets/CE/chucuito.png', desc: 'Centro de investigación pesquera, acuicultura y recursos hidrobiológicos.', map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d618.9284135299806!2d-69.8970041754954!3d-15.896951180518242!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x915d6d05e40667b5%3A0x57b033621c375c20!2sPiscicultura!5e1!3m2!1ses-419!2spe!4v1776413566493!5m2!1ses-419!2spe&maptype=satellite' },
    { title: 'Curtiembre', location: 'Puno', icon: Icons.Industry, img: '/assets/CE/curtiembre.jpeg', desc: 'Investigación en procesos industriales para el tratamiento de cueros y pieles.', map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2476.6047510828803!2d-70.01733702136444!3d-15.824378327332758!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x915d69babb63e6cf%3A0xf24057bf79de0852!2sUniversidad%20Nacional%20del%20Altiplano%20Puno!5e1!3m2!1ses-419!2spe!4v1776413674255!5m2!1ses-419!2spe&maptype=satellite' },
    { title: 'Concentradora Crucero', location: 'Carabaya', icon: Icons.Industry, img: '/assets/CE/crucero.jpeg', desc: 'Planta piloto para investigación metalúrgica y procesamiento de minerales.', map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d319212.5663255224!2d-70.23317662567183!3d-14.349791742196949!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91666e3a27788329%3A0xce94c644d33a268b!2sCrucero%2C%2021215!5e1!3m2!1ses-419!2spe!4v1776413808727!5m2!1ses-419!2spe&maptype=satellite' },
    { title: 'Concentradora Tiquillaca', location: 'Puno', icon: Icons.Industry, img: '/assets/CE/tiquillaca.jpeg', desc: 'Investigación en tecnología minera extractiva y concentración de metales.', map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5891.176969923597!2d-70.19046798605054!3d-15.797416173278142!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x915d44d98782ed0f%3A0xf09b4886b1264eab!2sTiquillaca%2021750!5e1!3m2!1ses-419!2spe!4v1776413867759!5m2!1ses-419!2spe&maptype=satellite' },
    { title: 'Majes', location: 'Arequipa', icon: Icons.Farm, img: '/assets/CE/majes.webp', desc: 'Estación experimental orientada a la agroindustria y riego tecnificado.', map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4953.209575762554!2d-70.01882932381535!3d-15.824375323696199!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x915d69babb63e6cf%3A0xf24057bf79de0852!2sUniversidad%20Nacional%20del%20Altiplano%20Puno!5e1!3m2!1ses-419!2spe!4v1776413968295!5m2!1ses-419!2spe&maptype=satellite' },
    { title: 'Ituata', location: 'Carabaya', icon: Icons.Industry, img: '/assets/CE/ituata.jpg', desc: 'Centro de investigación en geología, minería y medio ambiente serrano.', map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2042.349392344357!2d-70.25138085776928!3d-13.791613263280551!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9165edfd93444cbd%3A0xa0eaff386ca3bc21!2sItuata%2021255!5e1!3m2!1ses-419!2spe!4v1776413998518!5m2!1ses-419!2spe&maptype=satellite' }
  ];

  return (
    <div className="innovacion-page">
      <section className="innovacion-hero">
        <div className="container">
          <span className="section-badge animate-fade">Futuro y Tecnología</span>
          <h1 className="title-large animate-fade">Dirección de Innovación y Transferencia Tecnológica</h1>
          <p className="subtitle-large animate-fade">Impulsamos la investigación aplicada y la transferencia de conocimientos al sector productivo.</p>
        </div>
      </section>

      <section className="quienes-somos container section-padding">
        <div className="split-layout">
          <div className="text-content">
            <h2 className="section-title">¿Quiénes Somos?</h2>
            <p className="p-large">
              Lideramos el proceso de transformación de la investigación académica en soluciones
              tecnológicas tangibles para la sociedad.
            </p>
            <p>
              La Dirección de Innovación y Transferencia Tecnológica se encarga de gestionar la propiedad
              intelectual, fomentar el emprendimiento de base tecnológica y administrar los centros experimentales
              que sirven como laboratorios vivos para la ciencia aplicada.
            </p>
            <div className="quienes-features">
              <div className="feature-item">
                <div className="feature-icon-sm">✓</div>
                <span>Gestión de Propiedad Intelectual</span>
              </div>
              <div className="feature-item">
                <div className="feature-icon-sm">✓</div>
                <span>Incubación de Base Tecnológica</span>
              </div>
              <div className="feature-item">
                <div className="feature-icon-sm">✓</div>
                <span>Centros Experimentales de I+D+i</span>
              </div>
            </div>
          </div>
          <div className="image-accent">
            <div className="accent-box">
              <span className="stat-num">13</span>
              <span className="stat-label">CEI Activos</span>
            </div>
            <div className="accent-box delay-1">
              <span className="stat-num">+50</span>
              <span className="stat-label">Patentes Gestionadas</span>
            </div>
          </div>
        </div>
      </section>

      <section className="centros-experimentales section-padding-bg">
        <div className="container">
          <div className="section-header center">
            <h2 className="section-title">Centros Experimentales de Investigación (CEI)</h2>
            <p className="section-description">Nuestra red de laboratorios y granjas modelo distribuidos estratégicamente para validar hipótesis en entornos reales.</p>
          </div>

          <div className="centros-visual-grid">
            {centros.map((item, index) => (
              <div
                key={index}
                className="cpbs-card animate-fade"
                style={{ backgroundImage: `url(${item.img})`, animationDelay: `${(index % 4) * 0.1}s` }}
              >
                <div className="cpbs-overlay">
                  <div className="cpbs-content">
                    <div className="cpbs-icon-box">{item.icon}</div>
                    <span className="centro-location">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                      {item.location}
                    </span>
                    <h4 className="cpbs-title" style={{ marginBottom: "20px", marginTop: "10px" }}>{item.title}</h4>
                    <button
                      className="btn-cpbs-details"
                      onClick={() => setSelectedCenter(item)}
                    >
                      Ver Proyecto
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
                <span className="modal-badge-alt">Centro Experimental</span>
                <h2 className="modal-title">{selectedCenter.title}</h2>

                <div className="modal-info-badge">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                  Ubicado en: <b>{selectedCenter.location}</b>
                </div>

                <div className="modal-desc-box-alt">
                  <p>{selectedCenter.desc}</p>
                </div>

                <div className="modal-location">
                  <h3>Ubicación Satelital</h3>
                  <div className="map-embed-container">
                    {selectedCenter.map ? (
                      <iframe
                        src={selectedCenter.map}
                        width="100%"
                        height="250"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title={`Mapa de ${selectedCenter.title}`}
                      ></iframe>
                    ) : (
                      <div style={{ width: '100%', height: '250px', background: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b' }}>
                        Mapa no disponible ({selectedCenter.location})
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="modal-visual-side" style={{ backgroundImage: `url(${selectedCenter.img})` }}>
                <div className="visual-overlay-innova"></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Innovacion;
