import React, { useState } from 'react';
import footerBg from '../../assets/portada_footer.jpg';

const Footer = () => {
    const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
    const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);

    return (
        <footer className="relative bg-[#020817] text-slate-300 pt-24 pb-12 overflow-hidden border-t border-white/5">
            {/* Background Image & Overlay */}
            <div className="absolute inset-0 z-0">
                {/* Imagen más visible (sin opacidad reducida excesiva) */}
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 hover:scale-105"
                    style={{
                        backgroundImage: `url(${footerBg})`,
                    }}
                ></div>

                {/* Overlay oscuro en punto medio para equilibrio entre imagen y texto */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#020817]/90 via-[#020817]/80 to-[#020817]/90"></div>

                {/* Destellos de luz sutiles */}
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[128px]"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#AEDD2B]/5 rounded-full blur-[128px]"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-20">

                    {/* COLUMNA 1: Brand & Social */}
                    <div className="flex flex-col items-center text-center lg:items-start lg:text-left space-y-6">
                        <a href="#" onClick={() => window.scrollTo(0, 0)} className="block transition-transform hover:scale-105 active:scale-95 duration-500">
                            {/* Logo manteniendo tamaño original */}
                            <img
                                src="src/assets/vrionly.png"
                                alt="VRI UNAP"
                                className="h-24 md:h-40 w-auto object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                            />
                        </a>
                        <p className="text-sm leading-relaxed text-slate-300 font-light drop-shadow-md">
                            Liderando la investigación científica en el altiplano peruano para el mundo. <span className="text-white font-medium">Innovación, ética y compromiso social.</span>
                        </p>

                        {/* Redes Sociales Premium */}
                        <div className="flex gap-3">
                            {[
                                { icon: 'facebook-f', href: 'https://www.facebook.com/vriunpuno', color: 'hover:bg-[#1877F2]' },
                                { icon: 'twitter', href: 'https://twitter.com/unapuno', color: 'hover:bg-black' },
                                { icon: 'linkedin-in', href: 'https://www.linkedin.com/school/universidad-nacional-del-altiplano/', color: 'hover:bg-[#0A66C2]' },
                                { icon: 'youtube', href: 'https://www.youtube.com/@UNA_Puno', color: 'hover:bg-[#FF0000]' }
                            ].map((social, index) => (
                                <a
                                    key={index}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`w-10 h-10 rounded-xl bg-white/10 border border-white/20 backdrop-blur-sm flex items-center justify-center text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${social.color}`}
                                >
                                    <i className={`fab fa-${social.icon}`}></i>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* COLUMNA 2: Enlaces Rápidos */}
                    <div className="lg:pl-8">
                        <h4 className="text-white font-bold mb-8 text-lg flex flex-col gap-2 drop-shadow-md">
                            Enlaces Rápidos
                            <span className="w-12 h-1 bg-gradient-to-r from-[#AEDD2B] to-transparent rounded-full"></span>
                        </h4>
                        <ul className="space-y-4">
                            {[
                                { label: 'Plataforma PGI', href: 'https://pgi.vriunap.pe/home' },
                                { label: 'Repositorio Institucional', href: 'https://repositorio.unap.edu.pe/home' },
                                { label: 'Reglamentos VRI', href: '#normativa' },
                                { label: 'Docentes Renacyt', href: '#renacyt' },
                                { label: 'Mesa de Partes Virtual', href: 'https://tramites.unap.edu.pe/' }
                            ].map((link, idx) => (
                                <li key={idx}>
                                    <a href={link.href} className="group flex items-center text-sm text-slate-300 hover:text-white transition-colors duration-300 hover:translate-x-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#AEDD2B]/80 mr-3 group-hover:bg-[#AEDD2B] group-hover:scale-125 transition-all"></span>
                                        <span className="drop-shadow-sm">{link.label}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* COLUMNA 3: Contacto */}
                    <div>
                        <h4 className="text-white font-bold mb-8 text-lg flex flex-col gap-2 drop-shadow-md">
                            Contacto
                            <span className="w-12 h-1 bg-gradient-to-r from-unap-gold to-transparent rounded-full"></span>
                        </h4>
                        <ul className="space-y-6 text-sm text-slate-300">
                            <li className="flex items-start gap-4 group">
                                <div className="w-10 h-10 rounded-full bg-[#AEDD2B]/20 flex items-center justify-center shrink-0 group-hover:bg-[#AEDD2B]/30 transition-colors border border-[#AEDD2B]/30">
                                    <i className="fas fa-map-marker-alt text-[#AEDD2B]"></i>
                                </div>
                                <span className="mt-2 drop-shadow-sm">Av. Floral N° 1153, Ciudad Universitaria.<br />Puno - Perú, 21001</span>
                            </li>
                            <li className="flex items-center gap-4 group">
                                <div className="w-10 h-10 rounded-full bg-unap-gold/20 flex items-center justify-center shrink-0 group-hover:bg-unap-gold/30 transition-colors border border-unap-gold/30">
                                    <i className="fas fa-phone-alt text-unap-gold"></i>
                                </div>
                                <span className="drop-shadow-sm">(051) 365054 - Anexo 123</span>
                            </li>
                            <li className="flex items-center gap-4 group">
                                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0 group-hover:bg-blue-500/30 transition-colors border border-blue-500/30">
                                    <i className="fas fa-envelope text-blue-400"></i>
                                </div>
                                <span className="break-all drop-shadow-sm">vicerrectorado.investigacion@unap.edu.pe</span>
                            </li>
                        </ul>
                    </div>

                    {/* COLUMNA 4: Google Map */}
                    <div>
                        <h4 className="text-white font-bold mb-8 text-lg flex flex-col gap-2 drop-shadow-md">
                            Ubicación
                            <span className="w-12 h-1 bg-gradient-to-r from-purple-500 to-transparent rounded-full"></span>
                        </h4>
                        <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/20 h-64 w-full relative group">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d309.5748635014625!2d-70.01685358809463!3d-15.824855255807098!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x915d69b86255bb29%3A0xe619a47a79d60362!2sVicerrectorado%20de%20Investigacion%20UNA%20Puno!5e1!3m2!1ses-419!2spe!4v1769138546450!5m2!1ses-419!2spe"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Ubicación VRI UNAP"
                                className="transition-all duration-700 opacity-90 group-hover:opacity-100"
                            ></iframe>
                            {/* Overlay decorativo */}
                            <div className="absolute inset-0 border-4 border-white/10 pointer-events-none rounded-2xl"></div>
                        </div>
                    </div>

                </div>

                {/* Footer Bottom */}
                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-400">
                    <p className="font-medium drop-shadow-md">© 2026 Universidad Nacional del Altiplano. <span className="hidden md:inline">|</span> Todos los derechos reservados.</p>

                    <div className="flex gap-8 mt-6 md:mt-0">
                        <button onClick={() => setIsPrivacyModalOpen(true)} className="hover:text-[#AEDD2B] transition-colors relative group drop-shadow-md">
                            Políticas de Privacidad
                            <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#AEDD2B] transition-all group-hover:w-full"></span>
                        </button>
                        <button onClick={() => setIsTermsModalOpen(true)} className="hover:text-unap-gold transition-colors relative group drop-shadow-md">
                            Términos de Uso
                            <span className="absolute -bottom-1 left-0 w-0 h-px bg-unap-gold transition-all group-hover:w-full"></span>
                        </button>
                    </div>
                </div>
            </div>

            {/* MODAL: Políticas de Privacidad */}
            {isPrivacyModalOpen && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-[#030D4F]/80 backdrop-blur-md animate-fade-in" onClick={() => setIsPrivacyModalOpen(false)}></div>
                    <div className="relative bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-[2.5rem] shadow-2xl animate-slide-up flex flex-col md:flex-row border border-white/20">
                        <button onClick={() => setIsPrivacyModalOpen(false)} className="absolute top-6 right-6 z-50 w-10 h-10 rounded-full bg-white/20 hover:bg-red-50 hover:text-red-500 text-[#030D4F] backdrop-blur-md transition-all flex items-center justify-center border border-gray-100">
                            <i className="fas fa-times"></i>
                        </button>
                        {/* Left Panel */}
                        <div className="md:w-2/5 relative bg-[#030D4F] p-10 flex flex-col justify-between text-white overflow-hidden rounded-t-[2.5rem] md:rounded-l-[2.5rem] md:rounded-tr-none">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-sky-400/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                            <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#AEDD2B]/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"></div>
                            <div className="relative z-10">
                                <span className="bg-[#AEDD2B] text-[#030D4F] text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest mb-6 inline-flex items-center gap-2">
                                    <i className="fas fa-shield-alt"></i> Privacidad
                                </span>
                                <h3 className="text-2xl font-bold mt-4 leading-tight">Políticas de Privacidad</h3>
                                <p className="text-white/60 text-sm mt-4 leading-relaxed">Regida bajo la Ley N° 29733 de Protección de Datos Personales del Perú.</p>
                            </div>
                            <div className="relative z-10 pt-8 mt-auto border-t border-white/10">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-2xl bg-[#AEDD2B] text-[#030D4F] flex items-center justify-center"><i className="fas fa-university"></i></div>
                                    <div>
                                        <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Emitido por</p>
                                        <p className="text-xs font-bold">VRI — UNA Puno</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Right Panel */}
                        <div className="md:w-3/5 p-10 bg-white flex flex-col rounded-b-[2.5rem] md:rounded-r-[2.5rem] md:rounded-bl-none">
                            <div className="flex items-center gap-2 text-[10px] font-black tracking-[0.3em] text-[#030D4F]/40 uppercase mb-6">
                                <i className="fas fa-info-circle text-[#AEDD2B]"></i> Información Legal
                            </div>
                            <div className="space-y-5 text-sm leading-relaxed text-gray-600 overflow-y-auto pr-1 custom-scrollbar flex-1">
                                <p><strong className="text-[#030D4F]">1. Información General</strong><br />De conformidad con la Ley N° 29733, la UNA Puno a través del VRI garantiza la seguridad y confidencialidad de la información proporcionada por investigadores, docentes y estudiantes a través de este portal y sus Sistemas de Gestión de Contenidos (CMS).</p>
                                <p><strong className="text-[#030D4F]">2. Recopilación y Uso de Datos</strong><br />Los datos de plataformas institucionales (PGI, Repositorio y Portal VRI) serán empleados exclusivamente para fines académicos, administrativos, emisión de resoluciones, y procesos de evaluación de fondos concursables.</p>
                                <p><strong className="text-[#030D4F]">3. Consentimiento y Seguridad</strong><br />Al utilizar este portal, el usuario autoriza al VRI el tratamiento de su información según la legislación peruana. Se implementan estrictas medidas de seguridad digital para prevenir accesos no autorizados o pérdida de datos.</p>
                                <p><strong className="text-[#030D4F]">4. Derechos ARCO</strong><br />Los usuarios mantienen derechos de Acceso, Rectificación, Cancelación y Oposición (ARCO) sobre sus datos personales, ejercibles mediante solicitud formal en la Mesa de Partes Virtual.</p>
                            </div>
                            <button onClick={() => setIsPrivacyModalOpen(false)} className="mt-8 w-full py-4 rounded-2xl font-bold border-2 border-gray-200 text-gray-500 hover:border-red-200 hover:text-red-500 transition-all">
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* MODAL: Términos de Uso */}
            {isTermsModalOpen && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-[#030D4F]/80 backdrop-blur-md animate-fade-in" onClick={() => setIsTermsModalOpen(false)}></div>
                    <div className="relative bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-[2.5rem] shadow-2xl animate-slide-up flex flex-col md:flex-row border border-white/20">
                        <button onClick={() => setIsTermsModalOpen(false)} className="absolute top-6 right-6 z-50 w-10 h-10 rounded-full bg-white/20 hover:bg-red-50 hover:text-red-500 text-[#030D4F] backdrop-blur-md transition-all flex items-center justify-center border border-gray-100">
                            <i className="fas fa-times"></i>
                        </button>
                        {/* Left Panel */}
                        <div className="md:w-2/5 relative bg-[#030D4F] p-10 flex flex-col justify-between text-white overflow-hidden rounded-t-[2.5rem] md:rounded-l-[2.5rem] md:rounded-tr-none">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-sky-400/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                            <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#AEDD2B]/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"></div>
                            <div className="relative z-10">
                                <span className="bg-[#AEDD2B] text-[#030D4F] text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest mb-6 inline-flex items-center gap-2">
                                    <i className="fas fa-gavel"></i> Legal
                                </span>
                                <h3 className="text-2xl font-bold mt-4 leading-tight">Términos y Condiciones de Uso</h3>
                                <p className="text-white/60 text-sm mt-4 leading-relaxed">Enmarcados en la Ley Universitaria N° 30220 y el Código de Ética de la investigación de la UNA Puno.</p>
                            </div>
                            <div className="relative z-10 pt-8 mt-auto border-t border-white/10">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-2xl bg-[#AEDD2B] text-[#030D4F] flex items-center justify-center"><i className="fas fa-university"></i></div>
                                    <div>
                                        <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Emitido por</p>
                                        <p className="text-xs font-bold">VRI — UNA Puno</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Right Panel */}
                        <div className="md:w-3/5 p-10 bg-white flex flex-col rounded-b-[2.5rem] md:rounded-r-[2.5rem] md:rounded-bl-none">
                            <div className="flex items-center gap-2 text-[10px] font-black tracking-[0.3em] text-[#030D4F]/40 uppercase mb-6">
                                <i className="fas fa-info-circle text-[#AEDD2B]"></i> Información Legal
                            </div>
                            <div className="space-y-5 text-sm leading-relaxed text-gray-600 overflow-y-auto pr-1 custom-scrollbar flex-1">
                                <p><strong className="text-[#030D4F]">1. Aceptación de los Términos</strong><br />El acceso al Portal Web del VRI de la Universidad Nacional del Altiplano implica la aceptación íntegra de estos términos legales y las directivas universitarias vigentes.</p>
                                <p><strong className="text-[#030D4F]">2. Propiedad Intelectual</strong><br />Los contenidos, artículos, logos y recursos publicados son propiedad exclusiva de la UNA PUNO o de autores bajo licencias de acceso abierto. Se prohíbe su explotación comercial sin autorización previa o sin cumplir las pautas de referenciación APA/Vancouver.</p>
                                <p><strong className="text-[#030D4F]">3. Obligaciones del Usuario</strong><br />Al postular a fondos concursables, el docente/estudiante se compromete a emitir información veraz y a regirse por el Código de Ética institucional, evitando fraude o plagio bajo la Ley Universitaria N° 30220.</p>
                                <p><strong className="text-[#030D4F]">4. Exclusión de Responsabilidad</strong><br />El VRI garantiza la exactitud de convocatorias y cronogramas. Sin embargo, ante fallas sistémicas imprevisibles, los plazos legales finales considerados son los emitidos en resoluciones y actas oficiales de la universidad.</p>
                            </div>
                            <button onClick={() => setIsTermsModalOpen(false)} className="mt-8 w-full py-4 rounded-2xl font-bold border-2 border-gray-200 text-gray-500 hover:border-red-200 hover:text-red-500 transition-all">
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </footer>
    );
};

export default Footer;
