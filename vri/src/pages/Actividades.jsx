import React, { useEffect, useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useEventos } from '../hooks/useEventos';
import { usePosters } from '../hooks/usePosters';

const EventModal = ({ event, onClose }) => {
    if (!event) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Overlay */}
            <div
                className="absolute inset-0 bg-[#030D4F]/80 backdrop-blur-md animate-fade-in"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="relative bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[2.5rem] shadow-2xl animate-slide-up flex flex-col md:flex-row border border-white/20">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 z-50 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 text-[#030D4F] backdrop-blur-md transition-all flex items-center justify-center border border-gray-100"
                >
                    <i className="fas fa-times"></i>
                </button>

                {/* Left Side: Banner & Speaker info */}
                <div className="md:w-5/12 relative">
                    <div className="h-64 md:h-full relative overflow-hidden">
                        <img
                            src={event.banner || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800'}
                            alt={event.actividad}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#030D4F] via-[#030D4F]/40 to-transparent"></div>

                        <div className="absolute bottom-10 left-10 right-10">
                            <span className="bg-[#AEDD2B] text-[#030D4F] text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest mb-4 inline-block shadow-lg">
                                {event.tipo}
                            </span>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white text-xl">
                                    <i className="fas fa-microphone"></i>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-white/60 text-[10px] font-bold uppercase tracking-wider">Ponente(s):</span>
                                    <span className="text-white font-bold text-sm tracking-tight">{event.ponente || 'VRI UNAP'}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side: Details & Actions */}
                <div className="md:w-7/12 p-10 md:p-14 bg-white">
                    <div className="flex items-center gap-2 text-[10px] font-black tracking-[0.3em] text-[#030D4F]/40 uppercase mb-4">
                        <i className="far fa-calendar-alt text-[#AEDD2B]"></i>
                        Detalles del Evento
                    </div>

                    <h2 className="text-3xl font-bold text-[#030D4F] mb-6 leading-tight tracking-tight">
                        {event.actividad}
                    </h2>

                    <div className="grid grid-cols-2 gap-8 mb-8">
                        <div>
                            <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Fecha y Hora</span>
                            <div className="flex items-center gap-3 text-sm font-bold text-gray-700">
                                <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                                    <i className="far fa-clock"></i>
                                </div>
                                <span>{event.fecha} <span className="text-gray-400 font-normal">|</span> {event.hora}</span>
                            </div>
                        </div>
                        <div>
                            <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Lugar / Plataforma</span>
                            <div className="flex items-center gap-3 text-sm font-bold text-gray-700">
                                <div className="w-8 h-8 rounded-xl bg-green-50 text-green-600 flex items-center justify-center">
                                    <i className="fas fa-map-marker-alt text-xs"></i>
                                </div>
                                <span className="block">{event.lugar}</span>
                            </div>
                        </div>
                    </div>

                    <div className="mb-10 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                        <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Descripción</span>
                        <p className="text-gray-600 text-sm leading-relaxed font-medium whitespace-pre-line text-justify">
                            {event.desc || 'Participe en esta importante actividad organizada por el Vicerrectorado de Investigación para el fortalecimiento de la comunidad académica universitaria.'}
                        </p>
                    </div>

                    <div className="grid gap-4">
                        <h4 className="text-xs font-bold text-[#030D4F] uppercase tracking-widest mb-2 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#AEDD2B]"></span> Acciones Disponibles
                        </h4>

                        <div className="flex flex-col gap-3">
                            {/* Registration Button - Prioritized (Always Top) */}
                            {(event.linkRegistro || event.link_registro) &&
                                (event.linkRegistro !== '#' && event.link_registro !== '#') &&
                                ((event.state || '').toLowerCase() === 'próximo' || (event.state || '').toLowerCase() === 'proximo') && (
                                    <a
                                        href={event.linkRegistro || event.link_registro}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full bg-[#AEDD2B] text-[#030D4F] px-8 py-5 rounded-2xl text-xs font-black uppercase tracking-[0.2em] hover:bg-white hover:text-[#030D4F] border-2 border-[#AEDD2B] transition-all shadow-xl shadow-lime-400/10 text-center flex items-center justify-center gap-3 group"
                                    >
                                        Inscribirse Aquí
                                        <i className="fas fa-chevron-right transition-transform group-hover:translate-x-1"></i>
                                    </a>
                                )}

                            {/* Documentation Button */}
                            {event.linkInteres && event.linkInteres !== '#' && (
                                <a
                                    href={event.linkInteres}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full bg-white border-2 border-[#030D4F] text-[#030D4F] px-8 py-5 rounded-2xl text-xs font-black uppercase tracking-[0.2em] hover:bg-gray-50 transition-all text-center flex items-center justify-center gap-3"
                                >
                                    Ver Bases del Evento
                                    <i className="fas fa-file-pdf"></i>
                                </a>
                            )}
                        </div>
                    </div>

                    <div className="mt-12 pt-8 border-t border-gray-100 flex items-center justify-between">
                        <div className="flex gap-2">
                            {event.tags && event.tags.map(tag => (
                                <span key={tag} className="text-[9px] font-bold text-gray-400 px-2 py-1 bg-gray-50 rounded-lg">#{tag}</span>
                            ))}
                        </div>
                        <span className="text-[10px] font-bold text-[#AEDD2B] uppercase tracking-widest">
                            {event.state}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

const PosterModal = ({ poster, onClose }) => {
    const [zoom, setZoom] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

    if (!poster) return null;

    const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.5, 4));
    const handleZoomOut = () => {
        setZoom(prev => {
            const newZoom = Math.max(prev - 0.5, 1);
            if (newZoom === 1) setPosition({ x: 0, y: 0 });
            return newZoom;
        });
    };
    const handleReset = () => {
        setZoom(1);
        setPosition({ x: 0, y: 0 });
    };

    const handleMouseDown = (e) => {
        if (zoom > 1) {
            setIsDragging(true);
            setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
        }
    };

    const handleMouseMove = (e) => {
        if (isDragging && zoom > 1) {
            setPosition({
                x: e.clientX - dragStart.x,
                y: e.clientY - dragStart.y
            });
        }
    };

    const handleMouseUp = () => setIsDragging(false);

    const handleDownload = async () => {
        try {
            const response = await fetch(poster.image);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            // El nombre del archivo será el nombre del autor/estudiante
            const fileName = `Poster_${poster.author.replace(/\s+/g, '_')}.jpg`;
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error descargando el poster:', error);
            // Fallback simple si falla el fetch (CORS u otro)
            window.open(poster.image, '_blank');
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-[#030D4F]/95 backdrop-blur-md animate-fade-in" onClick={onClose}></div>

            <div className="relative bg-white w-full max-w-6xl rounded-[3rem] overflow-hidden shadow-2xl animate-zoom-in flex flex-col md:flex-row h-[90vh]">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 z-[110] w-12 h-12 rounded-full bg-white/20 hover:bg-white text-white hover:text-[#030D4F] backdrop-blur-md transition-all flex items-center justify-center border border-white/20 group"
                >
                    <i className="fas fa-times group-hover:rotate-90 transition-transform"></i>
                </button>

                {/* Poster Image Viewport */}
                <div
                    className={`md:w-3/5 bg-[#0a0a0a] relative flex items-center justify-center overflow-hidden h-[50vh] md:h-auto ${zoom > 1 ? 'cursor-move' : 'cursor-default'}`}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                >
                    <div
                        className="transition-transform duration-200 ease-out flex items-center justify-center w-full h-full"
                        style={{
                            transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
                        }}
                    >
                        <img
                            src={poster.image}
                            alt={poster.title}
                            className="max-w-full max-h-full object-contain shadow-2xl pointer-events-none select-none"
                            draggable="false"
                        />
                    </div>

                    {/* Zoom Controls Overlay */}
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-white/10 backdrop-blur-xl border border-white/20 p-2 rounded-2xl z-50">
                        <button
                            onClick={handleZoomOut}
                            className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white text-white hover:text-[#030D4F] transition-all flex items-center justify-center"
                            title="Alejar"
                        >
                            <i className="fas fa-minus text-xs"></i>
                        </button>
                        <div className="px-3 min-w-[60px] text-center">
                            <span className="text-[10px] font-black text-white tracking-widest">{Math.round(zoom * 100)}%</span>
                        </div>
                        <button
                            onClick={handleZoomIn}
                            className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white text-white hover:text-[#030D4F] transition-all flex items-center justify-center"
                            title="Acercar"
                        >
                            <i className="fas fa-plus text-xs"></i>
                        </button>
                        <div className="w-px h-6 bg-white/20 mx-1"></div>
                        <button
                            onClick={handleReset}
                            className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white text-white hover:text-[#030D4F] transition-all flex items-center justify-center"
                            title="Restablecer"
                        >
                            <i className="fas fa-expand text-xs"></i>
                        </button>
                    </div>

                    {/* Hint Overlay */}
                    {zoom === 1 && (
                        <div className="absolute top-8 left-1/2 -translate-x-1/2 text-white/40 text-[9px] font-bold uppercase tracking-[0.2em] pointer-events-none">
                            Usa los controles para ampliar el poster
                        </div>
                    )}
                </div>

                {/* Poster Info Side Panel */}
                <div className="md:w-2/5 p-8 md:p-12 overflow-y-auto bg-white flex flex-col border-l border-gray-100">
                    <div className="mb-10">
                        <div className="flex items-center gap-2 mb-6">
                            <span className="inline-block px-4 py-1.5 bg-[#AEDD2B] text-[#030D4F] text-[10px] font-black uppercase tracking-widest rounded-full italic shadow-sm">
                                {poster.puesto || 'Poster Destacado'}
                            </span>
                            <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">
                                ID: {poster.id}
                            </span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-black text-[#030D4F] leading-tight mb-6 tracking-tight">{poster.title}</h2>
                        <div className="w-20 h-1.5 bg-[#AEDD2B] rounded-full"></div>
                    </div>

                    <div className="space-y-8 flex-1">
                        <div className="flex gap-5 group/item">
                            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-unap-blue flex items-center justify-center text-2xl flex-shrink-0 transition-colors group-hover/item:bg-blue-600 group-hover/item:text-white">
                                <i className="fas fa-trophy"></i>
                            </div>
                            <div>
                                <span className="block text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-1.5">Evento Principal</span>
                                <span className="text-sm md:text-base font-bold text-gray-800 leading-snug">{poster.evento}</span>
                            </div>
                        </div>

                        <div className="flex gap-5 group/item">
                            <div className="w-14 h-14 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center text-2xl flex-shrink-0 transition-colors group-hover/item:bg-green-600 group-hover/item:text-white">
                                <i className="fas fa-university"></i>
                            </div>
                            <div>
                                <span className="block text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-1.5">Facultad / Unidad</span>
                                <span className="text-sm md:text-base font-bold text-gray-800 leading-snug">{poster.facultad}</span>
                            </div>
                        </div>

                        <div className="flex gap-5 group/item">
                            <div className="w-14 h-14 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center text-2xl flex-shrink-0 transition-colors group-hover/item:bg-purple-600 group-hover/item:text-white">
                                <i className="fas fa-user-graduate"></i>
                            </div>
                            <div>
                                <span className="block text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-1.5">Autor Principal</span>
                                <span className="text-sm md:text-base font-bold text-[#030D4F] font-black">{poster.author}</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 space-y-4">
                        <button
                            onClick={handleDownload}
                            className="w-full bg-[#030D4F] hover:bg-[#AEDD2B] text-white hover:text-[#030D4F] py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all shadow-xl shadow-blue-900/10 flex items-center justify-center gap-3 group/dl"
                        >
                            <i className="fas fa-download transition-transform group-hover/dl:-translate-y-1"></i>
                            Descargar Poster
                        </button>

                        <div className="pt-8 border-t border-gray-100 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-[#AEDD2B]">
                                    <i className="far fa-calendar-alt text-sm"></i>
                                </div>
                                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Edición {poster.date}</span>
                            </div>
                            <div className="px-4 py-2 bg-gray-50 rounded-xl text-[9px] font-black text-gray-400 uppercase tracking-widest border border-gray-100">
                                {poster.category}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Actividades = () => {
    const { eventos: cronograma, loading: loadingEventos } = useEventos();
    const { posters, loading: loadingPosters } = usePosters();
    const [activeTab, setActiveTab] = useState('cronograma');
    const [filterCategory, setFilterCategory] = useState('todos');
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [selectedPoster, setSelectedPoster] = useState(null);

    useScrollReveal(loadingEventos || loadingPosters);

    useEffect(() => {
        if (!loadingEventos && cronograma && cronograma.length > 0) {
            const handleHash = () => {
                const hashParams = new URLSearchParams(window.location.hash.split('?')[1] || '');
                const section = hashParams.get('section');
                if (section === 'posters' || section === 'poster') {
                    setActiveTab('poster');
                } else if (section === 'cronograma') {
                    setActiveTab('cronograma');
                }

                const targetId = hashParams.get('id');
                if (targetId) {
                    const foundEvent = cronograma.find(e => String(e.id) === targetId);
                    if (foundEvent) {
                        setSelectedEvent(foundEvent);
                        setActiveTab('cronograma');
                    }
                }
            };
            handleHash();
            window.addEventListener('hashchange', handleHash);
            return () => window.removeEventListener('hashchange', handleHash);
        }
    }, [loadingEventos, cronograma]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const postersReal = posters;

    // Categorías únicas para filtros
    const categories = ['todos', ...new Set(cronograma.map(ev => ev.tipo.toLowerCase()))];

    return (
        <div className="pb-24 bg-white min-h-screen font-sans">

            {/* Modal de Evento */}
            {selectedEvent && (
                <EventModal
                    event={selectedEvent}
                    onClose={() => setSelectedEvent(null)}
                />
            )}

            {/* Modal de Poster */}
            {selectedPoster && (
                <PosterModal
                    poster={selectedPoster}
                    onClose={() => setSelectedPoster(null)}
                />
            )}

            {/* HERO SECTION */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-[#030D4F] mb-12">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1920"
                        alt="Actividades VRI Background"
                        className="w-full h-full object-cover opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#030D4F]/95 to-[#030D4F]/40"></div>
                </div>

                {/* Decorative Celeste Glows */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-400/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 z-10"></div>
                <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-sky-300/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 z-10"></div>

                <div className="container mx-auto px-4 relative z-20 text-center">
                    <div className="inline-block mb-4 animate-fade-in">
                        <span className="py-2 px-6 rounded-full bg-white/10 border border-white/20 text-white font-black tracking-widest uppercase text-[10px] backdrop-blur-md">
                            Ecosistema de Investigación
                        </span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-modern-reveal">
                        Agenda & <span className="text-[#AEDD2B]">Divulgación</span>
                    </h1>
                    <p className="text-blue-100 text-lg md:text-xl max-w-2xl mx-auto font-light animate-slide-up">
                        Explora los próximos hitos científicos y la producción visual de nuestra comunidad académica.
                    </p>
                </div>
            </section>

            <div className="container mx-auto px-4 max-w-7xl reveal">

                {/* TABS NAVIGATION PREMIUM */}
                <div className="flex flex-col md:flex-row justify-center items-center gap-2 mb-16 p-2 bg-gray-100 rounded-[2rem] max-w-2xl mx-auto reveal">
                    <button
                        onClick={() => setActiveTab('cronograma')}
                        className={`flex-1 w-full px-8 py-4 rounded-[1.5rem] font-bold transition-all duration-500 flex items-center justify-center gap-3 ${activeTab === 'cronograma'
                            ? 'bg-white text-[#030D4F] shadow-xl'
                            : 'text-gray-500 hover:text-[#030D4F]'}`}
                    >
                        <i className={`fas fa-calendar-alt ${activeTab === 'cronograma' ? 'text-[#AEDD2B]' : ''}`}></i>
                        Agenda VRI
                    </button>
                    <button
                        onClick={() => setActiveTab('poster')}
                        className={`flex-1 w-full px-8 py-4 rounded-[1.5rem] font-bold transition-all duration-500 flex items-center justify-center gap-3 ${activeTab === 'poster'
                            ? 'bg-white text-[#030D4F] shadow-xl'
                            : 'text-gray-500 hover:text-[#030D4F]'}`}
                    >
                        <i className={`fas fa-palette ${activeTab === 'poster' ? 'text-[#AEDD2B]' : ''}`}></i>
                        Galería de Posters
                    </button>
                </div>

                {/* CRONOGRAMA SECTION REDISEÑADA (Agenda VRI) */}
                {activeTab === 'cronograma' && (
                    <div className="animate-fade-in grid lg:grid-cols-12 gap-12">

                        {/* PANEL IZQUIERDO: CALENDARIO Y FILTROS */}
                        <div className="lg:col-span-4 space-y-8">
                            <div className="bg-[#030D4F] rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-sky-400/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                                <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                                    <i className="fas fa-filter text-[#AEDD2B]"></i>
                                    Filtrar Agenda
                                </h3>
                                <div className="flex flex-wrap gap-2 text-sm">
                                    {categories.map(cat => (
                                        <button
                                            key={cat}
                                            onClick={() => setFilterCategory(cat)}
                                            className={`px-4 py-2 rounded-xl border transition-all uppercase text-[10px] font-bold tracking-widest ${filterCategory === cat
                                                ? 'bg-[#AEDD2B] border-[#AEDD2B] text-[#030D4F]'
                                                : 'border-white/20 text-white/60 hover:border-white'}`}
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                </div>
                                <div className="mt-10 p-4 bg-white/5 rounded-2xl border border-white/10">
                                    <h4 className="text-xs font-bold text-[#AEDD2B] mb-2 uppercase tracking-tighter">Recordatorio</h4>
                                    <p className="text-xs text-white/70 leading-relaxed italic">
                                        "La investigación no es lo que sé, sino lo que estoy dispuesto a descubrir."
                                    </p>
                                </div>
                            </div>

                            <div className="bg-gray-50 rounded-[2.5rem] p-8 border border-gray-100">
                                <h3 className="text-xl font-bold text-[#030D4F] mb-6 flex items-center gap-3">
                                    <i className="fas fa-info-circle text-[#030D4F]"></i>
                                    Asistencia
                                </h3>
                                <ul className="space-y-4">
                                    <li className="flex items-start gap-3">
                                        <div className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <i className="fas fa-check text-[10px]"></i>
                                        </div>
                                        <p className="text-xs text-gray-600 font-medium">Todos los eventos virtuales se graban y suben al repositorio.</p>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <i className="fas fa-id-card text-[10px]"></i>
                                        </div>
                                        <p className="text-xs text-gray-600 font-medium">Se otorgarán certificados de asistencia para congresos y talleres.</p>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* PANEL DERECHO: LISTA DE EVENTOS EXPLICADA */}
                        <div className="lg:col-span-8 space-y-6">
                            {loadingEventos ? (
                                <div className="flex flex-col items-center justify-center py-24 space-y-4">
                                    <div className="w-16 h-16 border-4 border-[#030D4F] border-t-[#AEDD2B] rounded-full animate-spin"></div>
                                    <p className="text-[#030D4F] font-bold animate-pulse uppercase tracking-widest text-xs">Cargando Agenda...</p>
                                </div>
                            ) : (
                                cronograma
                                    .filter(ev => filterCategory === 'todos' || ev.tipo.toLowerCase() === filterCategory)
                                    .map((evento) => (
                                        <div key={evento.id} className="group relative">
                                            <div className={`bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 flex flex-col md:flex-row gap-8 transition-all duration-500 hover:shadow-xl hover:-translate-y-1 ${(evento.state || '').toLowerCase() === 'finalizado' ? 'grayscale opacity-70' : ''}`}>

                                                {/* Fecha Visual */}
                                                <div className="flex-shrink-0 w-24 h-24 rounded-3xl bg-gray-50 flex flex-col items-center justify-center border border-gray-100 group-hover:bg-[#030D4F] group-hover:text-white transition-colors">
                                                    <span className="text-3xl font-black leading-none">{evento.day}</span>
                                                    <span className="text-xs font-bold uppercase tracking-[0.2em] mt-1">{evento.month}</span>
                                                </div>

                                                {/* Contenido */}
                                                <div className="flex-1">
                                                    <div className="flex flex-wrap items-center gap-3 mb-3">
                                                        <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${evento.estado === 'Completado' ? 'bg-gray-200 text-gray-500' : 'bg-blue-50 text-blue-600'
                                                            }`}>
                                                            {evento.tipo}
                                                        </span>
                                                        {evento.tags && evento.tags.map(tag => (
                                                            <span key={tag} className="text-[9px] font-bold text-gray-400 italic">#{tag}</span>
                                                        ))}
                                                    </div>

                                                    <h3 className="text-2xl font-bold text-[#030D4F] mb-3 group-hover:text-[#051675] tracking-tight">{evento.actividad}</h3>

                                                    <p className="text-sm text-gray-500 mb-6 leading-relaxed max-w-2xl line-clamp-2">
                                                        {evento.desc || 'No hay descripción disponible para este evento institucional del VRI.'}
                                                    </p>

                                                    <div className="grid sm:grid-cols-2 gap-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-[#AEDD2B]">
                                                                <i className="fas fa-map-marker-alt text-xs"></i>
                                                            </div>
                                                            <div className="flex flex-col">
                                                                <span className="text-[10px] uppercase text-gray-400 font-bold">Lugar</span>
                                                                <span className="text-[11px] font-bold text-gray-700 truncate">{evento.lugar}</span>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-[#AEDD2B]">
                                                                <i className="fas fa-microphone text-xs"></i>
                                                            </div>
                                                            <div className="flex flex-col">
                                                                <span className="text-[10px] uppercase text-gray-400 font-bold">Ponente(s) / Responsable(s):</span>
                                                                <span className="text-[11px] font-bold text-gray-700">{evento.ponente || 'VRI UNAP'}</span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Acciones */}
                                                    <div className="mt-8 flex flex-wrap gap-4">
                                                        <button
                                                            onClick={() => setSelectedEvent(evento)}
                                                            className="bg-[#030D4F] text-white px-6 py-3 rounded-xl text-xs font-bold hover:bg-[#AEDD2B] hover:text-[#030D4F] transition-all shadow-lg flex items-center gap-2"
                                                        >
                                                            <i className="fas fa-external-link-alt"></i> Participar / Ver más
                                                        </button>
                                                        <div className={`px-6 py-3 rounded-xl text-xs font-bold flex items-center gap-2 border ${(evento.state || '').toLowerCase() === 'finalizado' || evento.estado === 'Completado'
                                                            ? 'bg-gray-50 text-gray-400 border-gray-100'
                                                            : 'bg-green-50 text-green-700 border-green-100'
                                                            }`}>
                                                            <span className={`w-2 h-2 rounded-full ${(evento.state || '').toLowerCase() === 'finalizado' || evento.estado === 'Completado'
                                                                ? 'bg-gray-300'
                                                                : 'bg-green-500 animate-pulse'
                                                                }`}></span>
                                                            {evento.state || evento.estado}
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Status Ribon */}
                                                <div className={`absolute top-8 right-8 flex flex-col items-end`}>
                                                    <span className={`text-[9px] font-black uppercase tracking-tighter ${evento.estado === 'Completado' ? 'text-gray-400' : 'text-[#AEDD2B]'
                                                        }`}>
                                                        {evento.estado}
                                                    </span>
                                                    <span className="text-xs font-bold text-gray-400">{evento.hora}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                            )}
                        </div>

                    </div>
                )}

                {/* POSTERS SECTION (DINÁMICO DESDE STRAPI) */}
                {activeTab === 'poster' && (
                    <div className="animate-fade-in">
                        {loadingPosters ? (
                            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                                {[1, 2, 3, 4].map(n => (
                                    <div key={n} className="bg-gray-100 animate-pulse h-96 rounded-3xl"></div>
                                ))}
                            </div>
                        ) : posters.length > 0 ? (
                            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                                {posters.map((poster) => (
                                    <div
                                        key={poster.id}
                                        onClick={() => setSelectedPoster(poster)}
                                        className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col cursor-pointer"
                                    >
                                        <div className="relative h-72 overflow-hidden">
                                            <img src={poster.image} alt={poster.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />

                                            {/* Award Ribbon Overlay */}
                                            <div className="absolute top-4 right-4 z-10">
                                                <div className="bg-[#AEDD2B] text-[#030D4F] text-[10px] font-black px-4 py-1.5 rounded-full uppercase shadow-xl transform group-hover:rotate-3 transition-transform italic">
                                                    {poster.puesto}
                                                </div>
                                            </div>

                                            <div className="absolute inset-0 bg-gradient-to-t from-[#030D4F]/90 via-[#030D4F]/20 to-transparent"></div>

                                            <div className="absolute bottom-6 left-6 right-6">
                                                <span className="text-[#AEDD2B] text-[9px] font-black uppercase tracking-widest block mb-2 opacity-80">
                                                    {poster.evento}
                                                </span>
                                                <h3 className="font-bold text-white text-lg line-clamp-2 leading-tight drop-shadow-lg">
                                                    {poster.title}
                                                </h3>
                                            </div>
                                        </div>

                                        <div className="p-6 flex-1 flex flex-col bg-white">
                                            <div className="space-y-4">
                                                <div className="flex items-start gap-3">
                                                    <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center text-[#030D4F] flex-shrink-0">
                                                        <i className="fas fa-university text-[10px]"></i>
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest leading-none mb-1">Facultad</span>
                                                        <span className="text-[11px] text-gray-600 font-bold leading-tight">{poster.facultad}</span>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-[#030D4F] flex items-center justify-center text-[#AEDD2B] text-[10px] font-bold">
                                                        {poster.author.charAt(0)}
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest leading-none mb-1">Investigador</span>
                                                        <span className="text-[11px] text-[#030D4F] font-black">{poster.author}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="h-[300px] border-2 border-dashed border-gray-100 rounded-[3rem] flex items-center justify-center italic text-gray-400">
                                No se han cargado posters aún.
                            </div>
                        )}
                    </div>
                )}

            </div>
        </div>
    );
};

export default Actividades;
