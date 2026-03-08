import React, { useEffect, useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useConvocatorias } from '../hooks/useConvocatorias';

const ConvocatoriaModal = ({ item, onClose }) => {
    if (!item) return null;

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

                {/* Left Side: Info Accent */}
                <div className="md:w-5/12 relative bg-[#030D4F] p-10 flex flex-col justify-between text-white overflow-hidden">
                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-sky-400/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#AEDD2B]/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"></div>

                    <div className="relative z-10">
                        <span className="bg-[#AEDD2B] text-[#030D4F] text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest mb-6 inline-block">
                            {item.category}
                        </span>
                        <h3 className="text-3xl font-bold mb-8 leading-tight">{item.title}</h3>

                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-[#AEDD2B]">
                                    <i className="fas fa-calendar-check"></i>
                                </div>
                                <div>
                                    <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Publicado</p>
                                    <p className="text-sm font-bold">{item.publishDate}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-red-400">
                                    <i className="fas fa-hourglass-end"></i>
                                </div>
                                <div>
                                    <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Cierre de Postulación</p>
                                    <p className="text-sm font-bold">{item.closeDate}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="relative z-10 pt-10 mt-10 border-t border-white/10">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-[#AEDD2B] text-[#030D4F] flex items-center justify-center text-xl">
                                <i className="fas fa-coins"></i>
                            </div>
                            <div>
                                <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Presupuesto</p>
                                <p className="text-lg font-black text-[#AEDD2B]">{item.budget}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side: Description & CTA */}
                <div className="md:w-7/12 p-10 md:p-14 bg-white flex flex-col">
                    <div className="flex items-center gap-2 text-[10px] font-black tracking-[0.3em] text-[#030D4F]/40 uppercase mb-6">
                        <i className="fas fa-info-circle text-[#AEDD2B]"></i>
                        Información Detallada
                    </div>

                    <div className="flex-1 mb-10 overflow-y-auto pr-2 custom-scrollbar">
                        <div className="prose prose-sm prose-blue max-w-none text-gray-600 font-medium leading-relaxed whitespace-pre-line text-justify">
                            {item.description}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-[10px] font-black text-[#030D4F] uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-[#AEDD2B]"></span> Canales de Postulación
                        </h4>

                        <div className="grid gap-3">
                            <a
                                href={item.url}
                                onClick={() => console.log('Redirigiendo a:', item.url)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full bg-[#030D4F] text-white py-5 rounded-2xl text-xs font-black uppercase tracking-[0.2em] hover:bg-[#051675] transition-all shadow-xl shadow-blue-900/10 text-center flex items-center justify-center gap-3 group"
                            >
                                Iniciar Postulación
                                <i className="fas fa-external-link-alt text-[10px] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"></i>
                            </a>

                            <a
                                href={item.basesUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full bg-gray-50 text-[#030D4F] border border-gray-100 py-5 rounded-2xl text-xs font-black uppercase tracking-[0.2em] hover:bg-white hover:shadow-lg transition-all text-center flex items-center justify-center gap-3"
                            >
                                Descargar Bases Completas
                                <i className="fas fa-file-pdf"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Convocatorias = () => {
    const { convocatorias, loading } = useConvocatorias();
    const [selectedTab, setSelectedTab] = useState('activas');
    const [filterCategory, setFilterCategory] = useState('todos');
    const [selectedItem, setSelectedItem] = useState(null);

    useScrollReveal(loading);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        if (!loading && convocatorias && convocatorias.length > 0) {
            const handleHash = () => {
                const urlParams = new URLSearchParams(window.location.hash.split('?')[1] || '');
                const targetId = urlParams.get('id');
                if (targetId) {
                    const foundItem = convocatorias.find(c => String(c.id) === targetId);
                    if (foundItem) {
                        setSelectedItem(foundItem);
                        // Also switch tab to inactive if it's closed, optional, but good UX
                        if ((foundItem.state || '').toLowerCase() === 'cerrado') {
                            setSelectedTab('cerradas');
                        }
                    }
                }
            };

            handleHash();
            window.addEventListener('hashchange', handleHash);
            return () => window.removeEventListener('hashchange', handleHash);
        }
    }, [loading, convocatorias]);

    const proximas = convocatorias.filter(c => (c.state || '').toLowerCase() === 'activa');
    const cerradas = convocatorias.filter(c => (c.state || '').toLowerCase() === 'cerrado');
    const dataDisplay = selectedTab === 'activas' ? proximas : cerradas;

    const categories = ['todos', ...new Set(convocatorias.map(c => (c.category || '').toLowerCase()).filter(Boolean))];

    return (
        <div className="pb-24 bg-white min-h-screen font-sans">

            {/* Modal de Detalle */}
            {selectedItem && (
                <ConvocatoriaModal
                    item={selectedItem}
                    onClose={() => setSelectedItem(null)}
                />
            )}

            {/* HERO SECTION - Estandarizado con Revistas/Actividades (60vh) */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-[#030D4F] mb-12">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1920"
                        alt="Convocatorias VRI Background"
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
                            Fondos Concursables
                        </span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-modern-reveal">
                        Nuestras <span className="text-[#AEDD2B]">Convocatorias</span>
                    </h1>
                    <p className="text-blue-50 text-xl max-w-2xl mx-auto font-light leading-relaxed animate-slide-up">
                        Impulsamos el desarrollo científico a través de financiamiento para <span className="text-[#AEDD2B] font-semibold">docentes, estudiantes e investigadores</span>.
                    </p>
                </div>
            </section>

            <div className="container mx-auto px-4 max-w-7xl reveal">

                {/* FILTROS Y CONTROLES */}
                <div className="flex flex-col lg:flex-row gap-8 mb-12 items-start lg:items-center justify-between reveal">
                    {/* Tabs de Estado */}
                    <div className="flex p-1.5 bg-gray-100 rounded-2xl w-full lg:w-auto">
                        <button
                            onClick={() => setSelectedTab('activas')}
                            className={`flex-1 lg:px-8 py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all ${selectedTab === 'activas' ? 'bg-[#030D4F] text-white shadow-lg' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            <i className="fas fa-rocket mr-2"></i> Activas
                        </button>
                        <button
                            onClick={() => setSelectedTab('cerradas')}
                            className={`flex-1 lg:px-8 py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all ${selectedTab === 'cerradas' ? 'bg-[#030D4F] text-white shadow-lg' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            <i className="fas fa-archive mr-2"></i> Histórico
                        </button>
                    </div>

                    {/* Filtro de Categoría */}
                    <div className="flex flex-wrap gap-2">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setFilterCategory(cat)}
                                className={`px-5 py-2.5 rounded-xl border text-[10px] font-black uppercase tracking-widest transition-all ${filterCategory === cat
                                    ? 'bg-[#AEDD2B] border-[#AEDD2B] text-[#030D4F] shadow-md'
                                    : 'bg-white border-gray-200 text-gray-400 hover:border-[#030D4F]/30'}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* GRID DE CONVOCATORIAS */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-24 space-y-4">
                        <div className="w-16 h-16 border-4 border-[#030D4F] border-t-[#AEDD2B] rounded-full animate-spin"></div>
                        <p className="text-[#030D4F] font-bold animate-pulse uppercase tracking-widest text-xs">Cargando Convocatorias...</p>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {dataDisplay
                            .filter(c => filterCategory === 'todos' || (c.category || '').toLowerCase() === filterCategory)
                            .map((item) => (
                                <div key={item.id} className="group bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col relative overflow-hidden">
                                    {/* Decorative Background Icon */}
                                    <i className="fas fa-file-invoice absolute -bottom-4 -right-4 text-gray-50 text-8xl transition-all group-hover:text-blue-50/50"></i>

                                    <div className="flex justify-between items-start mb-6 relative z-10">
                                        <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${(item.state || '').toLowerCase() === 'activa' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                                            {item.state}
                                        </span>
                                        <div className="text-right">
                                            <span className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest">Publicado</span>
                                            <span className="text-xs font-bold text-gray-700">{item.publishDate}</span>
                                        </div>
                                    </div>

                                    <div className="mb-6 relative z-10 flex-1">
                                        <span className="text-[10px] font-bold text-[#AEDD2B] uppercase tracking-[0.2em] mb-2 block">{item.type}</span>
                                        <h3 className="text-xl font-bold text-[#030D4F] mb-4 group-hover:text-[#051675] leading-tight transition-colors">
                                            {item.title}
                                        </h3>
                                        <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3">
                                            {item.description}
                                        </p>

                                        <div className="space-y-3">
                                            <div className="flex items-center gap-3 py-3 border-y border-gray-50">
                                                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-xs">
                                                    <i className="fas fa-calendar-times"></i>
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter leading-none mb-1">Cierre de Postulación</span>
                                                    <span className="text-sm font-black text-[#030D4F]">{item.closeDate}</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-unap-gold/10 text-unap-gold flex items-center justify-center text-xs">
                                                    <i className="fas fa-coins"></i>
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter leading-none mb-1">Monto Máximo</span>
                                                    <span className="text-sm font-black text-[#030D4F]">{item.budget}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-6 relative z-10 flex gap-4">
                                        <a
                                            href={item.basesUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 bg-gray-50 text-[#030D4F] py-4 rounded-xl text-xs font-bold text-center border border-gray-100 hover:bg-white hover:shadow-lg transition-all"
                                        >
                                            Bases <i className="fas fa-file-pdf ml-1"></i>
                                        </a>
                                        {(item.state || '').toLowerCase() === 'activa' && (
                                            <button
                                                onClick={() => setSelectedItem(item)}
                                                className="flex-1 bg-[#030D4F] text-white py-4 rounded-xl text-xs font-bold text-center shadow-lg shadow-blue-900/10 hover:bg-[#051675] hover:-translate-y-1 transition-all"
                                            >
                                                Ver Detalles <i className="fas fa-chevron-right ml-1"></i>
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                    </div>
                )}

                {/* MENSAJE SI NO HAY RESULTADOS */}
                {!loading && dataDisplay.length === 0 && (
                    <div className="text-center py-20 bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-200">
                        <i className="fas fa-search text-4xl text-gray-300 mb-4"></i>
                        <h3 className="text-xl font-bold text-gray-400 uppercase tracking-widest">No se encontraron convocatorias</h3>
                        <p className="text-gray-400 text-sm mt-2">Pronto publicaremos nuevos fondos concursables.</p>
                    </div>
                )}

            </div>
        </div>
    );
};

export default Convocatorias;
