import React, { useEffect } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useNoticias } from '../hooks/useNoticias';
import { useConvocatorias } from '../hooks/useConvocatorias';
import { useEventos } from '../hooks/useEventos';
import { usePosters } from '../hooks/usePosters';

const NoticiasEventos = () => {
    useScrollReveal();
    // Cargamos noticias y convocatorias de Strapi
    const { noticias, loading: loadingNews } = useNoticias(3);
    const { convocatorias, loading: loadingCalls } = useConvocatorias();
    const { eventos, loading: loadingEvents } = useEventos();
    const { posters, loading: loadingPosters } = usePosters();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Filtrar las últimas activas para mostrar en el resumen
    const activeCalls = convocatorias
        .filter(c => (c.state || '').toLowerCase() === 'activa')
        .slice(0, 4);

    // Filtrar eventos dinámicos
    const proximosEventos = eventos.filter(event => {
        const state = (event.state || '').toLowerCase();
        return state.includes('próximo') || state.includes('proximo') || state.includes('curso');
    });

    return (
        <div className="pb-24 bg-white min-h-screen font-sans">

            {/* HERO SECTION */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-[#030D4F] mb-12">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=1920"
                        alt="Noticias y Eventos Background"
                        className="w-full h-full object-cover opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#030D4F]/95 to-[#030D4F]/40"></div>
                </div>

                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-400/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 z-10"></div>
                <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-sky-300/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 z-10"></div>

                <div className="container mx-auto px-4 relative z-20 text-center">
                    <div className="inline-block mb-4 animate-fade-in">
                        <span className="py-1.5 px-5 rounded-full bg-white/10 border border-white/20 text-white font-black tracking-[0.3em] uppercase text-[10px] backdrop-blur-md">
                            Actualidad Científica
                        </span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-modern-reveal">
                        Noticias y <span className="text-[#AEDD2B]">Eventos</span>
                    </h1>
                    <p className="text-blue-50 text-xl max-w-2xl mx-auto font-light leading-relaxed animate-slide-up">
                        Mantente al día con las últimas noticias, convocatorias y eventos del <span className="text-[#AEDD2B] font-semibold">Vicerrectorado de Investigación</span>.
                    </p>
                </div>
            </section>

            <div className="container mx-auto px-4 max-w-7xl reveal">

                <div className="grid lg:grid-cols-3 gap-12 reveal">

                    {/* COLUMNA PRINCIPAL: ÚLTIMAS 3 NOTICIAS */}
                    <div className="lg:col-span-2 space-y-12">
                        <section>
                            <div className="flex items-center gap-4 mb-8">
                                <h2 className="text-3xl font-bold text-[#030D4F]">Últimas Noticias</h2>
                                <div className="h-1 flex-1 bg-gray-100 rounded-full">
                                    <div className="h-full w-24 bg-[#AEDD2B] rounded-full"></div>
                                </div>
                            </div>

                            <div className="space-y-8">
                                {loadingNews ? (
                                    <div className="py-12 flex flex-col items-center justify-center space-y-4">
                                        <div className="w-10 h-10 border-4 border-gray-100 border-t-[#AEDD2B] rounded-full animate-spin"></div>
                                        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Sincronizando Noticias...</p>
                                    </div>
                                ) : noticias.length > 0 ? (
                                    noticias.slice(0, 3).map((item) => (
                                        <article key={item.id} className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col md:flex-row h-full md:h-64">
                                            <div className="md:w-2/5 relative overflow-hidden h-64 md:h-auto">
                                                <img
                                                    src={item.image}
                                                    alt={item.title}
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                />
                                                <div className={`absolute top-4 left-4 ${item.badgeColor} text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider`}>
                                                    {item.category}
                                                </div>
                                            </div>
                                            <div className="md:w-3/5 p-8 flex flex-col justify-between">
                                                <div>
                                                    <div className="flex items-center text-gray-400 text-xs mb-3 font-bold">
                                                        <i className="far fa-calendar-alt mr-2"></i>
                                                        {item.date}
                                                    </div>
                                                    <h3 className="text-xl font-bold text-[#030D4F] group-hover:text-[#051675] mb-3 transition-colors">
                                                        {item.title}
                                                    </h3>
                                                    <p className="text-gray-500 text-sm line-clamp-2 md:line-clamp-3">
                                                        {item.excerpt}
                                                    </p>
                                                </div>
                                                <a href={`#noticias?id=${item.id}`} className="text-sm font-bold text-[#030D4F] hover:text-[#AEDD2B] transition-colors flex items-center gap-2 mt-4 text-[10px] uppercase tracking-widest">
                                                    Ver Noticia <i className="fas fa-chevron-right text-[10px]"></i>
                                                </a>
                                            </div>
                                        </article>
                                    ))
                                ) : (
                                    <p className="py-12 text-center text-gray-400 italic">No hay noticias disponibles en este momento.</p>
                                )}
                            </div>
                        </section>

                        {/* SECCIÓN DE CONVOCATORIAS */}
                        <section>
                            <div className="flex items-center gap-4 mb-8">
                                <h2 className="text-3xl font-bold text-[#030D4F]">Convocatorias Vigentes</h2>
                                <div className="h-1 flex-1 bg-gray-100 rounded-full">
                                    <div className="h-full w-24 bg-[#030D4F] rounded-full"></div>
                                </div>
                                <a href="#convocatorias" className="text-xs font-bold text-[#030D4F] hover:text-[#AEDD2B] transition-colors uppercase tracking-widest">
                                    Ver todas <i className="fas fa-arrow-right ml-1"></i>
                                </a>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                {loadingCalls ? (
                                    [...Array(2)].map((_, i) => (
                                        <div key={i} className="bg-gray-50 rounded-2xl p-6 border border-gray-100 animate-pulse h-48"></div>
                                    ))
                                ) : activeCalls.length > 0 ? (
                                    activeCalls.map((call) => (
                                        <div key={call.id} className="bg-gray-50 rounded-2xl p-6 border border-gray-200 hover:border-[#AEDD2B] transition-all group flex flex-col justify-between">
                                            <div>
                                                <div className="flex justify-between items-start mb-4">
                                                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${(call.state || '').toLowerCase() === 'activa' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                        {call.state}
                                                    </span>
                                                    <span className="text-[10px] text-gray-500 font-bold uppercase">
                                                        Cierre: <span className="text-[#030D4F]">{call.closeDate}</span>
                                                    </span>
                                                </div>
                                                <h4 className="font-bold text-[#030D4F] mb-4 group-hover:text-[#051675] line-clamp-2">
                                                    {call.title}
                                                </h4>
                                            </div>
                                            <div className="flex gap-3">
                                                <a href={call.basesUrl} target="_blank" rel="noopener noreferrer" className="flex-1 bg-white border border-gray-200 text-[#030D4F] py-3 rounded-xl text-[10px] font-black uppercase tracking-widest text-center hover:border-[#030D4F] transition-all">
                                                    Bases <i className="fas fa-file-pdf ml-1"></i>
                                                </a>
                                                <a href={`#convocatorias?id=${call.id}`} className="flex-1 bg-[#030D4F] text-white py-3 rounded-xl text-[10px] font-black uppercase tracking-widest text-center hover:bg-[#051675] shadow-lg shadow-blue-900/10 transition-all">
                                                    Detalles <i className="fas fa-chevron-right ml-1"></i>
                                                </a>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="col-span-2 py-12 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                                        <p className="text-gray-400 text-sm italic uppercase tracking-widest font-bold">No hay convocatorias activas para mostrar.</p>
                                    </div>
                                )}
                            </div>
                        </section>
                    </div>

                    {/* SIDEBAR: EVENTOS */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 space-y-8">

                            {/* PRÓXIMOS EVENTOS */}
                            <div className="bg-[#030D4F] rounded-[2rem] p-8 text-white shadow-2xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>

                                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                                    <i className="fas fa-calendar-alt text-[#AEDD2B]"></i>
                                    Próximos Eventos
                                </h3>

                                <div className="space-y-6">
                                    {loadingEvents ? (
                                        <div className="flex flex-col items-center py-4 space-y-2">
                                            <div className="w-6 h-6 border-2 border-white/20 border-t-[#AEDD2B] rounded-full animate-spin"></div>
                                            <p className="text-[10px] text-white/40 uppercase font-bold tracking-widest">Cargando...</p>
                                        </div>
                                    ) : proximosEventos.length > 0 ? proximosEventos.slice(0, 3).map((event) => (
                                        <a href={`#actividades?id=${event.id}`} key={event.id} className="block relative pl-6 border-l-2 border-[#AEDD2B]/30 hover:border-[#AEDD2B] transition-colors py-1 group">
                                            <div className="absolute -left-[5px] top-2 w-2 h-2 rounded-full bg-[#AEDD2B] shadow-[0_0_10px_#AEDD2B]"></div>
                                            <span className="text-[10px] font-bold uppercase text-[#AEDD2B] tracking-wider">{event.day} {event.month}</span>
                                            <h4 className="font-bold text-sm mb-1 group-hover:text-[#AEDD2B] transition-colors leading-snug line-clamp-2">
                                                {event.actividad}
                                            </h4>
                                            <div className="flex items-center gap-3 text-[10px] text-white/60">
                                                <span className="truncate"><i className="far fa-clock mr-1"></i> {event.hora}</span>
                                                <span className="truncate"><i className="fas fa-map-marker-alt mr-1 text-[#AEDD2B]"></i> {event.lugar}</span>
                                            </div>
                                        </a>
                                    )) : (
                                        <p className="text-white/60 text-sm py-4 italic text-center">No hay eventos próximos programados.</p>
                                    )}
                                </div>

                                <a href="#actividades" className="mt-8 w-full bg-[#AEDD2B] text-[#030D4F] py-3 rounded-xl font-bold text-sm inline-block text-center hover:scale-105 transition-transform shadow-lg">
                                    Ver todas las actividades
                                </a>
                            </div>

                            {/* RECURSOS DESTACADOS - POSTERS */}
                            <div className="bg-gray-50 rounded-[2rem] p-8 border border-gray-100">
                                <h3 className="text-xl font-bold text-[#030D4F] mb-6 flex items-center gap-3">
                                    <i className="fas fa-trophy text-[#030D4F]"></i>
                                    Posters Destacados
                                </h3>

                                <div className="space-y-6">
                                    {loadingPosters ? (
                                        [1, 2, 3].map(n => (
                                            <div key={n} className="bg-white rounded-xl p-2 border border-gray-100 animate-pulse h-32"></div>
                                        ))
                                    ) : posters.length > 0 ? (
                                        posters.slice(0, 3).map((poster) => (
                                            <div key={poster.id} className="group relative bg-white p-2 rounded-2xl border border-gray-100 hover:border-[#AEDD2B] transition-all duration-300">
                                                <div className="relative h-32 rounded-xl overflow-hidden mb-3">
                                                    <img src={poster.image} alt={poster.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-[#030D4F]/80 to-transparent"></div>

                                                    {/* Badge de Puesto */}
                                                    <div className="absolute top-2 right-2">
                                                        <span className="text-[8px] font-black text-[#030D4F] bg-[#AEDD2B] px-2 py-1 rounded-full uppercase italic">
                                                            {poster.puesto}
                                                        </span>
                                                    </div>

                                                    <div className="absolute bottom-2 left-3">
                                                        <span className="text-[9px] font-bold text-white/90 uppercase bg-white/10 px-2 py-0.5 rounded-full backdrop-blur-sm">
                                                            {poster.category}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="px-1">
                                                    <h4 className="text-xs font-black text-[#030D4F] line-clamp-2 leading-tight mb-2 group-hover:text-[#051675]">
                                                        {poster.title}
                                                    </h4>
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-4 h-4 rounded-full bg-gray-100 flex items-center justify-center">
                                                            <i className="fas fa-user-graduate text-[8px] text-gray-400"></i>
                                                        </div>
                                                        <p className="text-[10px] text-gray-500 font-bold truncate">{poster.author}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-center text-gray-400 text-xs italic py-8">No hay posters destacados registrados.</p>
                                    )}
                                </div>

                                <a href="#actividades" className="block text-center mt-8 text-[10px] font-black text-[#030D4F] hover:text-[#AEDD2B] transition-colors uppercase tracking-[0.2em] border-t border-gray-100 pt-6">
                                    Ver Centro de Posters <i className="fas fa-chevron-right ml-1"></i>
                                </a>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default NoticiasEventos;
