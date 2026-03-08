import React, { useState } from 'react';
import { MOCK_DATA } from '../../data/mockData';

const QuickAccess = () => {
    const [hoveredCard, setHoveredCard] = useState(null);

    const quickAccessItems = [
        {
            id: 1,
            title: 'Convocatorias Activas',
            desc: 'Fondos concursables y oportunidades de financiamiento para investigación.',
            icon: 'fa-bullhorn',
            gradient: 'from-unap-blue to-blue-700',
            bgGlow: 'bg-blue-500/20',
            url: '#convocatorias',
            badge: 'Nuevo'
        },
        {
            id: 2,
            title: 'Repositorio de Tesis',
            desc: 'Accede a toda la producción intelectual de la universidad.',
            icon: 'fa-database',
            gradient: 'from-emerald-500 to-green-600',
            bgGlow: 'bg-emerald-500/20',
            url: 'https://repositorio.unap.edu.pe/home'
        },
        {
            id: 3,
            title: 'Revistas Científicas',
            desc: 'Publicaciones indexadas de alto impacto científico.',
            icon: 'fa-newspaper',
            gradient: 'from-purple-500 to-indigo-600',
            bgGlow: 'bg-purple-500/20',
            url: '#revistas'
        },
        {
            id: 4,
            title: 'Eventos Académicos',
            desc: 'Seminarios, talleres y congresos de investigación.',
            icon: 'fa-calendar-check',
            gradient: 'from-orange-500 to-red-500',
            bgGlow: 'bg-orange-500/20',
            url: '#actividades'
        },
    ];

    return (
        <section className="py-20 bg-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-[0.02]"
                style={{
                    backgroundImage: 'radial-gradient(circle at 1px 1px, #030D4F 1px, transparent 0)',
                    backgroundSize: '40px 40px'
                }}>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Section Title */}
                <div className="text-center mb-16 reveal">
                    <span className="inline-block px-4 py-2 bg-[#AEDD2B]/10 text-[#5a7a10] rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-4">
                        Acceso Rápido
                    </span>
                    <h2 className="text-3xl md:text-4xl font-black text-gray-900">
                        Servicios <span className="text-unap-blue">Destacados</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {quickAccessItems.map((item, idx) => (
                        <a
                            key={item.id}
                            href={item.url || '#'}
                            target={item.url?.startsWith('http') ? "_blank" : "_self"}
                            rel="noopener noreferrer"
                            className="group relative reveal block"
                            style={{ transitionDelay: `${idx * 100}ms` }}
                            onMouseEnter={() => setHoveredCard(item.id)}
                            onMouseLeave={() => setHoveredCard(null)}
                        >
                            {/* Card */}
                            <div className="relative bg-white rounded-3xl p-8 border border-gray-100 transition-all duration-500 group-hover:border-transparent group-hover:shadow-2xl group-hover:-translate-y-2 h-full flex flex-col overflow-hidden">

                                {/* Glow Effect on Hover */}
                                <div className={`absolute inset-0 ${item.bgGlow} opacity-0 group-hover:opacity-100 blur-3xl transition-opacity duration-500 -z-10`}></div>

                                {/* Badge */}
                                {item.badge && (
                                    <div className="absolute top-4 right-4 px-3 py-1 bg-red-500 text-white text-[10px] font-bold uppercase rounded-full animate-pulse">
                                        {item.badge}
                                    </div>
                                )}

                                {/* Icon */}
                                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center text-white text-2xl mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                                    <i className={`fas ${item.icon}`}></i>
                                </div>

                                {/* Content */}
                                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-unap-blue transition-colors">
                                    {item.title}
                                </h3>
                                <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-grow">
                                    {item.desc}
                                </p>

                                {/* Action */}
                                <div className="flex items-center gap-2 text-unap-blue font-bold text-sm group-hover:gap-3 transition-all">
                                    <span>Acceder</span>
                                    <i className="fas fa-arrow-right text-xs group-hover:translate-x-1 transition-transform"></i>
                                </div>

                                {/* Bottom Gradient Line */}
                                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity`}></div>
                            </div>
                        </a>
                    ))}
                </div>

                {/* Additional Links Row */}
                <div className="mt-12 flex flex-wrap justify-center gap-4 reveal">
                    {[
                        { label: 'PGI - Gestión de Investigación', icon: 'fa-laptop-code', url: 'https://pgi.vriunap.pe/home' },
                        { label: 'Mesa de Partes Virtual', icon: 'fa-envelope-open-text', url: 'https://tramites.unap.edu.pe/' },
                        { label: 'Turnitin', icon: 'fa-check-double', url: 'https://unap.turnitin.com/home/sign-in' },
                    ].map((link, idx) => (
                        <a
                            key={idx}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 px-5 py-3 bg-gray-50 hover:bg-gray-100 rounded-full text-gray-700 hover:text-unap-blue font-medium text-sm transition-all hover:-translate-y-1"
                        >
                            <i className={`fas ${link.icon}`}></i>
                            {link.label}
                            <i className="fas fa-external-link-alt text-[10px] opacity-50"></i>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default QuickAccess;
