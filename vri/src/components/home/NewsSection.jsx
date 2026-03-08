import React, { useState } from 'react';
import { useNoticias } from '../../hooks/useNoticias';

const NewsSection = () => {
    const [activeNews, setActiveNews] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);

    // Traemos las noticias de Strapi (máximo 3)
    const { noticias, loading } = useNoticias(3);

    const handleNewsHover = (idx) => {
        if (idx === activeNews) return;
        setIsTransitioning(true);
        setTimeout(() => {
            setActiveNews(idx);
            setTimeout(() => setIsTransitioning(false), 50);
        }, 200);
    };

    const newsItems = noticias.length > 0 ? noticias.slice(0, 3) : [];
    const featuredNews = newsItems[activeNews] || newsItems[0];

    return (
        <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
            {/* Fondo decorativo */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-blue-50 rounded-full blur-[150px] -translate-x-1/2"></div>
                <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#AEDD2B]/10 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Cabecera */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
                    <div>
                        <span className="inline-block px-4 py-2 bg-unap-blue/10 text-unap-blue rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-4">
                            Últimas Noticias
                        </span>
                        <h2 className="text-4xl md:text-5xl font-black text-gray-900">
                            Actualidad <span className="text-unap-blue">Científica</span>
                        </h2>
                    </div>
                    <a href="#noticias" className="group flex items-center gap-3 px-6 py-3 bg-unap-blue text-white rounded-full font-bold hover:bg-blue-700 transition-colors">
                        Ver Todas
                        <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
                    </a>
                </div>

                {/* Grid de Noticias */}
                {noticias.length > 0 ? (
                    <div className="grid lg:grid-cols-12 gap-8 min-h-[500px]">
                        {/* SECCIÓN IZQUIERDA: NOTICIA DESTACADA */}
                        <div className="lg:col-span-7">
                            <article className="group relative h-full min-h-[500px] rounded-3xl overflow-hidden shadow-2xl bg-gray-900">
                                {featuredNews ? (
                                    <a href={`#noticias?id=${featuredNews.id}`} className="block h-full">
                                        <div className={`absolute inset-0 transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
                                            <img
                                                src={featuredNews.image}
                                                alt={featuredNews.title}
                                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                        </div>
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>

                                        {/* Badge de Categoría */}
                                        <div className="absolute top-6 left-6">
                                            <span className={`inline-block ${featuredNews.badgeColor} text-white text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wider shadow-lg transition-all duration-300`}>
                                                {featuredNews.category}
                                            </span>
                                        </div>

                                        {/* Contenido de la Noticia */}
                                        <div className={`absolute bottom-0 left-0 right-0 p-8 md:p-10 transition-all duration-300 ${isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
                                            <div className="flex items-center gap-4 text-white/70 text-sm mb-4">
                                                <span className="flex items-center gap-2">
                                                    <i className="far fa-calendar"></i>
                                                    {featuredNews.date}
                                                </span>
                                                <span className="w-1 h-1 bg-white/40 rounded-full"></span>
                                                <span>Lectura recomendada</span>
                                            </div>
                                            <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-white mb-4 leading-tight group-hover:text-[#AEDD2B] transition-colors">
                                                {featuredNews.title}
                                            </h3>
                                            <p className="text-white/80 text-base leading-relaxed line-clamp-2 max-w-2xl">
                                                {featuredNews.excerpt}
                                            </p>

                                            <div className="mt-6 inline-flex items-center gap-2 text-[#AEDD2B] font-bold text-sm uppercase tracking-wider group-hover:gap-3 transition-all">
                                                Leer Artículo Completo
                                                <i className="fas fa-arrow-right"></i>
                                            </div>
                                        </div>
                                    </a>
                                ) : null}
                            </article>
                        </div>

                        {/* SECCIÓN DERECHA: LISTA DE NOTICIAS */}
                        <div className="lg:col-span-5">
                            <div className="flex flex-col gap-4">
                                {newsItems.map((item, idx) => (
                                    <a
                                        href={`#noticias?id=${item.id}`}
                                        key={item.id}
                                        onMouseEnter={() => handleNewsHover(idx)}
                                        className={`flex gap-5 p-4 rounded-2xl cursor-pointer transition-all duration-300 ease-out ${activeNews === idx
                                            ? 'bg-white shadow-xl border-l-4 border-unap-blue scale-[1.02]'
                                            : 'bg-white shadow-sm hover:shadow-md border-l-4 border-transparent'
                                            }`}
                                    >
                                        <div className="flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden bg-gray-100">
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                className={`w-full h-full object-cover transition-transform duration-500 ${activeNews === idx ? 'scale-110' : 'scale-100'}`}
                                            />
                                        </div>

                                        <div className="flex-1 flex flex-col justify-center">
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className={`w-2 h-2 rounded-full ${item.badgeColor}`}></span>
                                                <span className="text-xs font-bold text-gray-400 uppercase">{item.category}</span>
                                            </div>
                                            <h4 className={`font-bold leading-snug line-clamp-2 text-sm transition-colors duration-300 ${activeNews === idx ? 'text-unap-blue' : 'text-gray-800'}`}>
                                                {item.title}
                                            </h4>
                                            <span className="text-xs text-gray-400 mt-2 flex items-center gap-1">
                                                <i className="far fa-clock"></i>
                                                {item.date}
                                            </span>
                                        </div>

                                        <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center self-center transition-all duration-300 ${activeNews === idx
                                            ? 'bg-unap-blue text-white scale-110'
                                            : 'bg-gray-100 text-gray-400'
                                            }`}>
                                            <i className="fas fa-arrow-right text-sm"></i>
                                        </div>
                                    </a>
                                ))}
                            </div>
                            <a href="#noticias" className="block text-center py-6 text-unap-blue font-bold hover:underline transition-colors mt-2">
                                Ver todas las noticias →
                            </a>
                        </div>
                    </div>
                ) : (
                    <div className="py-24 text-center">
                        <div className="animate-pulse text-gray-400 font-medium italic">
                            Sincronizando últimas noticias...
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default NewsSection;
