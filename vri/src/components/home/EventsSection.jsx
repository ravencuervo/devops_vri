import React, { useState, useEffect } from 'react';
import { useEventos } from '../../hooks/useEventos';

const EventsSection = () => {
    const { eventos, loading } = useEventos();

    // Priorizar eventos próximos o en curso
    let agendaEventos = eventos.filter(evt => {
        const state = (evt.state || '').toLowerCase();
        return state.includes('próximo') || state.includes('proximo') || state.includes('curso');
    }).slice(0, 4);

    // Si no hay próximos, mostrar los últimos 4 eventos en general (historial)
    if (agendaEventos.length === 0 && eventos.length > 0) {
        agendaEventos = eventos.slice(0, 4);
    }

    const [activeEvent, setActiveEvent] = useState(0);

    useEffect(() => {
        if (agendaEventos.length > 0) {
            const interval = setInterval(() => {
                setActiveEvent((prev) => (prev + 1) % agendaEventos.length);
            }, 5000);
            return () => clearInterval(interval);
        }
    }, [agendaEventos.length]);

    const typeColors = {
        'Seminario': 'from-blue-500 to-indigo-600',
        'Taller': 'from-emerald-500 to-green-600',
        'Exposición': 'from-purple-500 to-pink-600',
        'Congreso': 'from-orange-500 to-red-600',
        'default': 'from-gray-500 to-gray-700'
    };

    return (
        <section className="py-24 bg-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-[0.02]"
                style={{
                    backgroundImage: 'radial-gradient(circle at 1px 1px, #030D4F 1px, transparent 0)',
                    backgroundSize: '40px 40px'
                }}>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-50 rounded-full blur-[150px] translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#AEDD2B]/10 rounded-full blur-[120px] -translate-x-1/2 translate-y-1/2"></div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-20 reveal">
                    <span className="inline-block px-4 py-2 bg-orange-50 text-orange-600 rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-4">
                        Próximos Eventos
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
                        Agenda <span className="text-[#030D4F]">VRI 2026</span>
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Sigue de cerca las actividades científicas y académicas programadas.
                    </p>
                </div>

                <div className="grid lg:grid-cols-12 gap-12 items-start max-w-7xl mx-auto">
                    {loading ? (
                        <div className="col-span-12 py-24 flex flex-col items-center justify-center space-y-4">
                            <div className="w-12 h-12 border-4 border-[#030D4F] border-t-[#AEDD2B] rounded-full animate-spin"></div>
                            <p className="text-[#030D4F] font-bold animate-pulse text-xs uppercase tracking-widest">Sincronizando Agenda...</p>
                        </div>
                    ) : agendaEventos.length > 0 ? (
                        <>
                            {/* Timeline (Left) */}
                            <div className="lg:col-span-5 animate-fade-in-up">
                                <div className="relative">
                                    {/* Timeline Line */}
                                    <div className="absolute left-[27px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#030D4F] via-blue-500 to-[#AEDD2B]"></div>

                                    <div className="space-y-6">
                                        {agendaEventos.map((evt, idx) => (
                                            <div
                                                key={evt.id}
                                                className={`relative flex gap-6 p-4 rounded-2xl cursor-pointer transition-all duration-500 ${activeEvent === idx
                                                    ? 'bg-white shadow-xl scale-[1.02]'
                                                    : 'hover:bg-gray-50'
                                                    }`}
                                                onClick={() => setActiveEvent(idx)}
                                            >
                                                {/* Date Circle */}
                                                <div className={`relative z-10 flex-shrink-0 w-14 h-14 rounded-full flex flex-col items-center justify-center transition-all duration-300 ${activeEvent === idx
                                                    ? 'bg-[#030D4F] text-white shadow-lg scale-110'
                                                    : 'bg-white border-2 border-gray-200 text-gray-600'
                                                    }`}>
                                                    <span className="text-lg font-black leading-none">{evt.day}</span>
                                                    <span className="text-[10px] font-bold uppercase">{evt.month}</span>
                                                </div>

                                                {/* Content */}
                                                <div className="flex-1 pt-1">
                                                    <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase mb-2 ${activeEvent === idx
                                                        ? 'bg-[#030D4F] text-white'
                                                        : 'bg-gray-100 text-gray-600'
                                                        }`}>
                                                        {evt.tipo}
                                                    </span>
                                                    <h3 className={`font-bold leading-snug transition-colors ${activeEvent === idx ? 'text-[#030D4F]' : 'text-gray-800'
                                                        }`}>
                                                        {evt.actividad}
                                                    </h3>
                                                    <div className="flex flex-wrap gap-3 mt-2 text-xs text-gray-500">
                                                        <span className="flex items-center gap-1">
                                                            <i className="far fa-clock text-[#AEDD2B]"></i>
                                                            {evt.hora}
                                                        </span>
                                                        <span className="flex items-center gap-1">
                                                            <i className="fas fa-map-marker-alt text-[#AEDD2B]"></i>
                                                            {evt.lugar}
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Active Indicator */}
                                                {activeEvent === idx && (
                                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#AEDD2B] flex items-center justify-center text-[#030D4F]">
                                                        <i className="fas fa-arrow-right text-sm"></i>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Featured Event Card (Right) */}
                            <div className="lg:col-span-7 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                                <div className="relative bg-gradient-to-br from-[#030D4F] to-[#061266] rounded-3xl p-8 md:p-12 overflow-hidden shadow-2xl h-full flex flex-col justify-center">
                                    {/* Decorative Elements */}
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/10 rounded-full blur-[100px]"></div>
                                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#AEDD2B]/10 rounded-full blur-[80px]"></div>

                                    {/* Content */}
                                    <div className="relative z-10">
                                        {/* Type Badge */}
                                        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${typeColors[agendaEventos[activeEvent]?.tipo] || typeColors.default} text-white text-xs font-bold uppercase mb-6`}>
                                            <i className="fas fa-calendar-star"></i>
                                            {agendaEventos[activeEvent]?.tipo}
                                        </div>

                                        {/* Date */}
                                        <div className="flex items-center gap-6 mb-8">
                                            <div className="text-center">
                                                <div className="text-6xl font-black text-white">{agendaEventos[activeEvent]?.day}</div>
                                                <div className="text-lg font-bold text-[#AEDD2B] uppercase">{agendaEventos[activeEvent]?.month}</div>
                                            </div>
                                            <div className="w-px h-20 bg-white/20"></div>
                                            <div className="flex-1">
                                                <h3 className="text-2xl md:text-3xl font-black text-white leading-tight mb-4 text-balance">
                                                    {agendaEventos[activeEvent]?.actividad}
                                                </h3>
                                                <div className="flex flex-wrap gap-x-6 gap-y-2 text-white/70">
                                                    <span className="flex items-center gap-2">
                                                        <i className="far fa-clock text-[#AEDD2B]"></i>
                                                        {agendaEventos[activeEvent]?.hora}
                                                    </span>
                                                    <span className="flex items-center gap-2 text-balance leading-tight">
                                                        <i className="fas fa-map-marker-alt text-[#AEDD2B]"></i>
                                                        {agendaEventos[activeEvent]?.lugar}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <p className="text-white/60 text-sm leading-relaxed mb-8 line-clamp-3 max-w-xl">
                                            {agendaEventos[activeEvent]?.desc}
                                        </p>

                                        {/* CTA */}
                                        <div className="flex flex-wrap gap-4 mt-8">
                                            <a href={agendaEventos[activeEvent]?.linkRegistro || '#'} target="_blank" rel="noopener noreferrer" className="px-6 py-4 bg-[#AEDD2B] text-[#030D4F] rounded-xl font-black uppercase text-[10px] tracking-widest hover:scale-105 transition-all flex items-center gap-2 shadow-lg shadow-[#AEDD2B]/20">
                                                <i className="fas fa-calendar-plus"></i>
                                                Registrarse
                                            </a>
                                            <a href={`#actividades?id=${agendaEventos[activeEvent]?.id}`} className="px-6 py-4 bg-white/10 text-white rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-white/20 transition-all border border-white/20 flex items-center gap-2">
                                                <i className="fas fa-info-circle"></i>
                                                Más Información
                                            </a>
                                        </div>

                                        {/* Progress Dots */}
                                        <div className="flex gap-2 mt-10">
                                            {agendaEventos.map((_, idx) => (
                                                <button
                                                    key={idx}
                                                    onClick={() => setActiveEvent(idx)}
                                                    className={`h-2 rounded-full transition-all duration-300 ${activeEvent === idx ? 'w-10 bg-[#AEDD2B]' : 'w-2 bg-white/30 hover:bg-white/50'
                                                        }`}
                                                ></button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="col-span-12 py-16 text-center bg-gray-50 rounded-[2.5rem] border border-dashed border-gray-200">
                            <p className="text-gray-400 font-bold uppercase text-xs tracking-[0.2em]">No hay actividades próximas en la agenda</p>
                        </div>
                    )}
                </div>

                {/* View All Events Link */}
                <div className="text-center mt-16 reveal">
                    <a href="#actividades" className="inline-flex items-center gap-3 text-unap-blue font-bold hover:gap-4 transition-all text-lg">
                        Ver Calendario Completo
                        <i className="fas fa-arrow-right"></i>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default EventsSection;
