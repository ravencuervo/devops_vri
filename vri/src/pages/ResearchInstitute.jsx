import React, { useState, useRef } from 'react';
import { toPng } from 'html-to-image';
import { DII_SERVICES, DII_STATS, DII_METHODOLOGY } from '../data/diiData';
import { useNoticias } from '../hooks/useNoticias';
import { useEventos } from '../hooks/useEventos';
import { useLogros } from '../hooks/useLogros';

const ServiceCard = ({ item }) => {
    const [activeTab, setActiveTab] = useState(null);

    const toggleTab = (tab) => {
        setActiveTab(activeTab === tab ? null : tab);
    };

    return (
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden group hover:-translate-y-2 transition-all duration-500 border border-gray-100 flex flex-col h-full transform-gpu">
            <div className="p-8 flex-grow">
                <div className="w-16 h-16 rounded-2xl mb-6 flex items-center justify-center bg-white shadow-md transition-transform group-hover:scale-110 p-2 overflow-hidden border border-gray-50">
                    <img src={item.logo} alt={item.title} className="w-full h-full object-contain" />
                </div>
                <h3 className="text-2xl font-bold text-[#383939] mb-2">{item.title}</h3>
                <p className="text-sm font-bold text-[#149C68] mb-4 uppercase tracking-tighter">{item.subtitle}</p>

                <p className="text-gray-600 text-sm leading-relaxed mb-8">
                    {item.desc}
                </p>

                <div className="space-y-3">
                    {/* Sección Quiénes Somos */}
                    <div className="space-y-2">
                        <button
                            onClick={() => toggleTab('about')}
                            className={`w-full py-3 px-5 rounded-xl text-xs font-bold border flex items-center justify-between transition-all duration-300 ${activeTab === 'about' ? 'bg-[#149C68] text-white border-[#149C68]' : 'border-gray-100 hover:border-[#149C68]/30 hover:bg-gray-50 text-gray-700'}`}
                        >
                            <span>¿Quiénes somos?</span>
                            <i className={`fas ${activeTab === 'about' ? 'fa-chevron-up' : 'fa-chevron-right'} text-[10px] opacity-70`}></i>
                        </button>
                        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${activeTab === 'about' ? 'max-h-40 opacity-100 mb-4' : 'max-h-0 opacity-0'}`}>
                            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-gray-600 text-sm leading-relaxed">
                                {item.links.about}
                            </div>
                        </div>
                    </div>

                    {/* Sección Página Oficial */}
                    <div className="space-y-2">
                        <button
                            onClick={() => toggleTab('official')}
                            className={`w-full py-3 px-5 rounded-xl text-xs font-bold border flex items-center justify-between transition-all duration-300 ${activeTab === 'official' ? 'bg-[#149C68] text-white border-[#149C68]' : 'border-gray-100 hover:border-[#149C68]/30 hover:bg-gray-50 text-gray-700'}`}
                        >
                            <span>Página Oficial</span>
                            <i className={`fas ${activeTab === 'official' ? 'fa-chevron-up' : 'fa-globe'} text-[10px] opacity-70`}></i>
                        </button>
                        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${activeTab === 'official' ? 'max-h-40 opacity-100 mb-4' : 'max-h-0 opacity-0'}`}>
                            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-gray-600 text-sm leading-relaxed">
                                {item.links.official}
                            </div>
                        </div>
                    </div>

                    {/* Sección Contáctanos */}
                    <div className="space-y-2">
                        <button
                            onClick={() => toggleTab('contact')}
                            className={`w-full py-3 px-5 rounded-xl text-xs font-bold border flex items-center justify-between transition-all duration-300 ${activeTab === 'contact' ? 'bg-[#149C68] text-white border-[#149C68]' : 'border-gray-100 hover:border-[#149C68]/30 hover:bg-gray-50 text-gray-700'}`}
                        >
                            <span>Contáctanos</span>
                            <i className={`fas ${activeTab === 'contact' ? 'fa-chevron-up' : 'fa-envelope'} text-[10px] opacity-70`}></i>
                        </button>
                        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${activeTab === 'contact' ? 'max-h-40 opacity-100 mb-4' : 'max-h-0 opacity-0'}`}>
                            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-gray-600 font-medium text-sm flex items-center">
                                <i className="fas fa-envelope mr-3 text-[#149C68]"></i>
                                {item.links.contact}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-8 pt-0 mt-6">
                <a
                    href={item.links.portal}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-full py-4 bg-[#383939] text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-[#149C68] transition-all shadow-xl hover:shadow-[#149C68]/30 group/btn"
                >
                    Ir al portal
                    <i className="fas fa-external-link-alt ml-2 text-[10px] transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1"></i>
                </a>
            </div>
        </div>
    );
};

const ResearchInstitute = () => {
    const { noticias, loading: loadingNoticias } = useNoticias(3);
    const { eventos, loading: loadingEventos } = useEventos();
    const { logros: hitos, loading: loadingLogros } = useLogros();
    const boletinRef = useRef(null);

    const handleDownloadBoletin = async () => {
        if (boletinRef.current === null) return;

        try {
            const dataUrl = await toPng(boletinRef.current, {
                cacheBust: true,
                backgroundColor: '#149C68', // Mantener el fondo institucional
                style: {
                    borderRadius: '0'
                }
            });
            const link = document.createElement('a');
            link.download = `boletin-vri-${new Date().toLocaleDateString()}.png`;
            link.href = dataUrl;
            link.click();
        } catch (err) {
            console.error('Error al descargar el boletín:', err);
        }
    };

    const isLoading = loadingNoticias || loadingEventos || loadingLogros;

    return (
        <div className="bg-[#FFFEDB]/30 min-h-screen">
            {/* Hero Section */}
            <section className="relative h-[85vh] lg:h-[90vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="src/assets/portadadii.jpg"
                        alt="Investigación"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#149C68]/90 to-[#149C68]/40"></div>
                </div>

                <div className="container mx-auto px-4 relative z-10 text-white">
                    <div className="max-w-4xl animate-modern-reveal">
                        <span className="inline-block px-4 py-1 bg-[#AEE637] text-[#383939] rounded-full text-xs font-bold mb-6 uppercase tracking-wider">
                            Innovación y Excelencia
                        </span>
                        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                            Instituto de Investigación <br />
                            <span className="text-[#FFFEDB]">UNA Puno</span>
                        </h1>
                        <p className="text-xl text-[#FFFEDB]/90 mb-8 max-w-2xl font-medium">
                            Impulsamos el conocimiento científico y tecnológico desde el altiplano para el mundo.
                            Liderando la investigación en biodiversidad, cambio climático y desarrollo social.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <button
                                onClick={() => document.getElementById('como-investigamos')?.scrollIntoView({ behavior: 'smooth' })}
                                className="px-8 py-4 bg-[#38C958] hover:bg-[#AEE637] text-white hover:text-[#383939] rounded-xl font-bold transition-all shadow-lg hover:shadow-[#AEE637]/20 transform hover:-translate-y-1"
                            >
                                Explorar Proyectos
                            </button>
                            <button
                                onClick={() => document.getElementById('servicios-estrategicos')?.scrollIntoView({ behavior: 'smooth' })}
                                className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white rounded-xl font-bold transition-all transform hover:-translate-y-1"
                            >
                                Publicaciones
                            </button>
                        </div>
                    </div>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white/20 to-transparent"></div>
            </section>

            {/* Quick Stats */}
            <section className="py-12 -mt-16 lg:-mt-20 relative z-20">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {DII_STATS.map((stat) => (
                            <div key={stat.id} className="bg-white p-6 rounded-2xl shadow-xl border-b-4 border-[#149C68] transform hover:-translate-y-1 transition-all">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-lg bg-[#AEE637]/20 flex items-center justify-center text-[#149C68]">
                                        <i className={`fas ${stat.icon} text-2xl`}></i>
                                    </div>
                                    <div>
                                        <p className="text-3xl font-bold text-[#383939]">{stat.value}</p>
                                        <p className="text-xs text-gray-500 font-bold uppercase tracking-tighter">{stat.label}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Quiénes Somos Section */}
            <section className="py-24 bg-white overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <span className="text-[#149C68] font-bold uppercase tracking-widest text-sm mb-4 block">Trayectoria</span>
                            <h2 className="text-4xl md:text-5xl font-bold text-[#383939] mb-8 leading-tight">
                                Transformando el futuro a través de la <span className="text-[#149C68]">Ciencia</span>
                            </h2>
                            <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
                                <p>
                                    El Instituto de Investigación UNA Puno es el pilar científico de nuestra casa de estudios, dedicado a la generación de conocimiento con impacto regional y global.
                                </p>
                                <p>
                                    Nuestra labor se centra en articular el talento humano con recursos tecnológicos avanzados para resolver problemáticas sociales, ambientales y productivas.
                                </p>
                            </div>
                        </div>
                        <div className="relative group">
                            <div className="absolute inset-0 bg-[#AEE637] rounded-3xl rotate-3 scale-[1.02] opacity-20 transition-transform group-hover:rotate-0"></div>
                            <img
                                src="src/assets/dii_electronica.jpg"
                                className="relative z-10 rounded-3xl shadow-2xl object-cover aspect-video transition-transform duration-500 group-hover:scale-[1.02]"
                                alt="Equipo de investigación"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Strategic Services */}
            <section id="servicios-estrategicos" className="py-24 bg-[#FFFEDB]/40">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-[#383939] mb-4 tracking-tight">Servicios Estratégicos</h2>
                        <div className="w-20 h-1.5 bg-[#AEE637] mx-auto rounded-full"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
                        {DII_SERVICES.map((item) => (
                            <ServiceCard key={item.id} item={item} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Cómo Investigamos */}
            <section id="como-investigamos" className="py-24 bg-white relative">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-[#383939] mb-4">¿Cómo investigamos?</h2>
                        <div className="w-20 h-1.5 bg-[#AEE637] mx-auto rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {DII_METHODOLOGY.map((method) => (
                            <div key={method.id} className="group bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all border border-gray-100 relative overflow-hidden flex flex-col h-full">
                                <div className="absolute top-0 right-0 w-32 h-32 rounded-bl-full -mr-10 -mt-10 group-hover:scale-110 transition-transform duration-500" style={{ backgroundColor: `${method.color}10` }}></div>
                                <div className="w-16 h-16 rounded-2xl text-white flex items-center justify-center mb-6 shadow-lg shadow-black/5" style={{ backgroundColor: method.color }}>
                                    <i className={`fas ${method.icon} text-2xl`}></i>
                                </div>
                                <h3 className="text-2xl font-bold text-[#383939] mb-4">{method.title}</h3>
                                <p className="text-gray-600 mb-6 leading-relaxed">
                                    {method.desc}
                                </p>
                                <a href={method.link} className="inline-flex items-center font-bold hover:gap-3 transition-all mt-auto pt-4" style={{ color: method.color }}>
                                    {method.linkText} <i className="fas fa-arrow-right ml-2 text-sm"></i>
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Noticias, Eventos e Hitos */}
            <section ref={boletinRef} className="py-24 bg-[#149C68] text-white overflow-hidden relative">
                <div className="container mx-auto px-4 relative z-10">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                        <div>
                            <h2 className="text-4xl font-bold mb-4 uppercase tracking-tight">Noticias, Eventos e Hitos</h2>
                            <p className="text-[#FFFEDB]/80 max-w-xl text-lg">
                                Últimas actualizaciones, hitos institucionales y próximos eventos de nuestra comunidad científica.
                            </p>
                        </div>
                        <button
                            onClick={handleDownloadBoletin}
                            className="px-8 py-3 bg-[#AEE637] text-[#383939] rounded-xl font-bold hover:bg-white transition-colors flex items-center gap-2"
                        >
                            <i className="fas fa-download"></i>
                            Descargar Boletín
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {noticias.length > 0 ? (
                            noticias.slice(0, 3).map((item) => (
                                <div key={item.id} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl overflow-hidden group">
                                    <div className="h-56 relative overflow-hidden">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                        <div className={`absolute top-4 left-4 ${item.badgeColor} text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase`}>
                                            {item.category}
                                        </div>
                                    </div>
                                    <div className="p-8">
                                        <div className="flex items-center gap-3 text-[#AEE637] text-xs font-bold mb-3 uppercase">
                                            <i className="far fa-calendar-alt"></i>
                                            <span>{item.date}</span>
                                        </div>
                                        <h4 className="text-xl font-bold mb-3 line-clamp-2">
                                            {item.title}
                                        </h4>
                                        <p className="text-white/70 text-sm mb-6 line-clamp-3 leading-relaxed">
                                            {item.excerpt}
                                        </p>
                                        <div className="flex items-center justify-between pt-6 border-t border-white/10">
                                            <a
                                                href={`#noticias?id=${item.id}`}
                                                className="text-xs font-bold text-[#AEE637] uppercase tracking-wider hover:underline"
                                            >
                                                Leer más
                                            </a>
                                            <button
                                                onClick={() => window.location.hash = `#noticias?id=${item.id}`}
                                                className="text-white hover:text-[#AEE637] transition-colors"
                                            >
                                                <i className="fas fa-plus-circle text-2xl"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full py-12 text-center text-[#FFFEDB]/60 italic font-medium">
                                {loadingNoticias ? "Sincronizando boletín científico..." : "No hay noticias recientes en el instituto."}
                            </div>
                        )}
                    </div>

                    {/* Hitos y Próximos Eventos */}
                    <div className="mt-20 pt-20 border-t border-white/10">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                            <div>
                                <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-[#AEE637] flex items-center justify-center text-[#383939]">
                                        <i className="fas fa-trophy"></i>
                                    </div>
                                    Hitos Institucionales
                                </h3>
                                <div className="space-y-6">
                                    {hitos.length > 0 ? (
                                        hitos.slice(0, 2).map((hito, idx) => (
                                            <div key={idx} className="flex gap-6 items-start bg-white/5 p-6 rounded-2xl border border-white/10 group/hito hover:bg-white/10 transition-all duration-300">
                                                <div className="w-12 h-12 rounded-xl bg-[#AEE637]/20 flex items-center justify-center text-[#AEE637] flex-shrink-0 group-hover/hito:scale-110 transition-transform">
                                                    <i className="fas fa-award text-2xl"></i>
                                                </div>
                                                <div>
                                                    <h4 className="font-bold mb-1 text-[#FFFEDB]">{hito.title}</h4>
                                                    <p className="text-sm text-white/60 leading-relaxed">{hito.description}</p>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="py-8 text-white/30 italic text-sm">
                                            {loadingLogros ? "Cargando hitos..." : "No hay hitos registrados."}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-[#AEE637] flex items-center justify-center text-[#383939]">
                                        <i className="fas fa-calendar"></i>
                                    </div>
                                    Próximos Eventos
                                </h3>
                                <div className="space-y-4">
                                    {eventos.length > 0 ? (
                                        eventos.slice(0, 3).map((event) => (
                                            <div
                                                key={event.id}
                                                onClick={() => window.location.hash = `#actividades?id=${event.id}`}
                                                className="flex items-center gap-4 bg-white p-4 rounded-2xl text-[#383939] group hover:bg-[#AEE637] transition-all cursor-pointer shadow-lg hover:shadow-[#AEE637]/20 border border-white/10"
                                            >
                                                <div className="w-16 h-16 rounded-xl bg-gray-100 flex flex-col items-center justify-center group-hover:bg-white transition-colors flex-shrink-0">
                                                    <span className="text-[10px] font-black text-gray-400 group-hover:text-[#149C68] uppercase tracking-tighter">{event.month}</span>
                                                    <span className="text-xl font-black text-[#149C68]">{event.day}</span>
                                                </div>
                                                <div className="flex-grow">
                                                    <h4 className="font-bold leading-tight line-clamp-1 group-hover:text-white transition-colors">{event.actividad}</h4>
                                                    <div className="flex items-center gap-3 text-[10px] text-gray-500 font-bold mt-1 uppercase tracking-wider group-hover:text-white/80 transition-colors">
                                                        <span><i className="far fa-clock mr-1"></i> {event.hora}</span>
                                                        <span className="line-clamp-1"><i className="fas fa-map-marker-alt mr-1"></i> {event.lugar}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="py-8 text-white/30 italic text-sm">
                                            {loadingEventos ? "Cargando eventos..." : "No hay eventos próximos."}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ResearchInstitute;
