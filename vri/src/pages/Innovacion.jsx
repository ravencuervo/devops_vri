import React, { useState, useEffect } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useInnovacion } from '../hooks/useInnovacion';

const Innovacion = () => {
    useScrollReveal();
    const [activeTab, setActiveTab] = useState('patentes');
    const { patentes, transferencia, vinculacion, loading } = useInnovacion();

    useEffect(() => {
        const handleHash = () => {
            const hashParams = new URLSearchParams(window.location.hash.split('?')[1] || '');
            const section = hashParams.get('section');
            if (section === 'patentes') {
                setActiveTab('patentes');
            } else if (section === 'transferencia') {
                setActiveTab('transferencia');
            } else if (section === 'vinculacion') {
                setActiveTab('vinculacion');
            }
        };
        handleHash();
        window.scrollTo(0, 0);

        window.addEventListener('hashchange', handleHash);
        return () => window.removeEventListener('hashchange', handleHash);
    }, []);

    const tabs = [
        { id: 'patentes', label: 'Propiedad Intelectual', icon: 'fa-certificate' },
        { id: 'transferencia', label: 'Transferencia Tecnológica', icon: 'fa-exchange-alt' },
        { id: 'vinculacion', label: 'Vinculación Empresarial', icon: 'fa-handshake' }
    ];

    return (
        <div className="pb-24 bg-[#FAF9F6] min-h-screen text-slate-900">
            {/* HERO SECTION */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-[#030D4F]">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1920"
                        alt="Innovación Background"
                        className="w-full h-full object-cover opacity-30"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#030D4F]/95 to-[#030D4F]/40"></div>
                </div>

                <div className="container mx-auto px-4 relative z-20 text-center">
                    <div className="inline-block mb-4 animate-fade-in">
                        <span className="py-2 px-6 rounded-full bg-white/10 border border-white/20 text-white font-black tracking-widest uppercase text-[10px] backdrop-blur-md">
                            Ecosistema de Innovación
                        </span>
                    </div>
                    <h1 className="text-5xl md:text-8xl font-black text-white mb-6 animate-modern-reveal tracking-tighter">
                        Innovación y <span className="text-[#AEDD2B]">Transferencia</span>
                    </h1>
                    <p className="text-blue-100 text-lg md:text-xl max-w-3xl mx-auto font-light animate-slide-up leading-relaxed">
                        Transformamos la investigación académica en soluciones reales para el desarrollo económico y social.
                    </p>
                </div>
            </section>

            {/* TAB NAVIGATION */}
            <div className="sticky top-16 md:top-20 z-40 bg-white border-b border-gray-200 shadow-sm">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="flex items-center justify-between py-4 overflow-x-auto no-scrollbar gap-8 md:gap-0">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-3 text-[11px] font-black uppercase tracking-widest transition-all relative pb-2 whitespace-nowrap ${activeTab === tab.id ? 'text-[#030D4F] border-b-2 border-[#AEDD2B]' : 'text-slate-400 hover:text-slate-900'}`}
                            >
                                <i className={`fas ${tab.icon} ${activeTab === tab.id ? 'text-[#AEDD2B]' : ''}`}></i>
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 max-w-7xl py-16 md:py-24">
                {loading ? (
                    <div className="text-center py-20 text-slate-400 italic font-medium">
                        Cargando ecosistema de innovación...
                    </div>
                ) : (
                    <>
                        {/* 1. PATENTES */}
                        {activeTab === 'patentes' && (
                            <div className="animate-fade-in">
                                {patentes.length > 0 ? (
                                    <div className="grid lg:grid-cols-2 gap-8">
                                        {patentes.map((patent) => (
                                            <div key={patent.id} className="bg-white rounded-[2.5rem] p-10 border border-gray-200 shadow-sm hover:shadow-2xl transition-all duration-500 group relative overflow-hidden flex flex-col h-full">
                                                <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-[5rem] -mr-8 -mt-8 group-hover:bg-[#AEDD2B]/10 transition-colors"></div>
                                                <div className="relative z-10 flex flex-col h-full">
                                                    <div className="flex justify-between items-start mb-8">
                                                        <div className="bg-[#030D4F] text-[#AEDD2B] px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm">
                                                            Patente Registrada
                                                        </div>
                                                        <span className="text-slate-300 font-mono text-xs">{patent.id_uap}</span>
                                                    </div>
                                                    <h3 className="text-2xl font-black text-slate-900 mb-6 leading-tight group-hover:text-[#030D4F] transition-colors">
                                                        {patent.title}
                                                    </h3>
                                                    <p className="text-slate-600 text-sm leading-relaxed mb-8 flex-grow">
                                                        {patent.description}
                                                    </p>
                                                    <div className="pt-8 border-t border-slate-100 flex flex-wrap gap-6 items-center">
                                                        <div>
                                                            <span className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Inventores</span>
                                                            <span className="text-xs font-bold text-slate-800">{patent.inventors}</span>
                                                        </div>
                                                        <div>
                                                            <span className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Año de Registro</span>
                                                            <span className="text-xs font-bold text-slate-800">{patent.year}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-20 bg-white rounded-[3rem] border-2 border-dashed border-slate-200 text-slate-400 italic">
                                        No hay patentes registradas actualmente.
                                    </div>
                                )}
                            </div>
                        )}

                        {/* 2. TRANSFERENCIA */}
                        {activeTab === 'transferencia' && (
                            <div className="animate-fade-in">
                                {transferencia.length > 0 ? (
                                    <div className="space-y-24">
                                        {transferencia.map((project, idx) => (
                                            <div key={project.id} className={`flex flex-col lg:flex-row gap-16 items-center ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
                                                <div className="lg:w-1/2 relative">
                                                    <div className="rounded-[3rem] overflow-hidden shadow-2xl aspect-video lg:aspect-square border border-slate-100">
                                                        <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                                                    </div>
                                                    <div className="absolute -bottom-6 -right-6 md:right-10 bg-[#AEDD2B] p-8 md:p-12 rounded-[2.5rem] shadow-2xl text-[#030D4F] max-w-[250px] md:max-w-xs">
                                                        <span className="block text-[10px] font-black uppercase tracking-widest mb-4 opacity-70">Impacto Real</span>
                                                        <p className="text-sm md:text-base font-black leading-relaxed">{project.impact}</p>
                                                    </div>
                                                </div>
                                                <div className="lg:w-1/2">
                                                    <span className="text-[#149C68] text-xs font-black uppercase tracking-[0.3em] mb-4 block">Proyecto de Transferencia</span>
                                                    <h2 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight mb-8">
                                                        {project.title}
                                                    </h2>
                                                    <p className="text-lg text-slate-600 leading-relaxed mb-10 text-justify">
                                                        {project.description}
                                                    </p>
                                                    <button className="px-8 py-4 bg-[#030D4F] text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-[#051675] transition-all shadow-xl shadow-blue-900/20 active:scale-95">
                                                        Ver Expediente del Proyecto
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-20 bg-white rounded-[3rem] border-2 border-dashed border-slate-200 text-slate-400 italic">
                                        No hay proyectos de transferencia registrados.
                                    </div>
                                )}
                            </div>
                        )}

                        {/* 3. VINCULACIÓN */}
                        {activeTab === 'vinculacion' && (
                            <div className="animate-fade-in">
                                {vinculacion.length > 0 ? (
                                    <div className="bg-white rounded-[3rem] overflow-hidden border border-slate-200 shadow-xl">
                                        <div className="overflow-x-auto">
                                            <table className="w-full text-left">
                                                <thead>
                                                    <tr className="bg-slate-50 border-b border-slate-100">
                                                        <th className="px-10 py-6 text-[10px] font-black text-[#030D4F] uppercase tracking-widest">Empresa / Aliado</th>
                                                        <th className="px-10 py-6 text-[10px] font-black text-[#030D4F] uppercase tracking-widest">Proyecto Colaborativo</th>
                                                        <th className="px-10 py-6 text-[10px] font-black text-[#030D4F] uppercase tracking-widest">Año</th>
                                                        <th className="px-10 py-6 text-[10px] font-black text-[#030D4F] uppercase tracking-widest text-center">Estado</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-slate-100">
                                                    {vinculacion.map((item) => (
                                                        <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group">
                                                            <td className="px-10 py-8">
                                                                <div className="flex items-center gap-4">
                                                                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-900 font-bold group-hover:bg-[#AEDD2B] group-hover:text-[#030D4F] transition-all">
                                                                        {item.company ? item.company.charAt(0) : '?'}
                                                                    </div>
                                                                    <span className="text-sm font-black text-slate-900">{item.company}</span>
                                                                </div>
                                                            </td>
                                                            <td className="px-10 py-8">
                                                                <span className="block text-sm font-bold text-slate-800 mb-1">{item.project}</span>
                                                                <span className="text-xs text-slate-500 line-clamp-2">{item.description}</span>
                                                            </td>
                                                            <td className="px-10 py-8 text-sm font-bold text-slate-400">{item.year}</td>
                                                            <td className="px-10 py-8 text-center">
                                                                <span className="inline-block px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest bg-emerald-50 text-emerald-600 border border-emerald-100">
                                                                    {item.status}
                                                                </span>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center py-20 bg-white rounded-[3rem] border-2 border-dashed border-slate-200 text-slate-400 italic">
                                        No hay convenios de vinculación registrados.
                                    </div>
                                )}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Innovacion;
