import React, { useState, useEffect } from 'react';
import { useGrupos } from '../hooks/useGrupos';

const SectionTitle = ({ title, subtitle }) => (
    <div className="mb-12">
        {subtitle && <span className="text-[#149C68] font-bold uppercase tracking-widest text-sm mb-2 block animate-fade-in">{subtitle}</span>}
        <h2 className="text-3xl md:text-4xl font-bold text-[#383939] leading-tight">
            {title}
        </h2>
        <div className="w-20 h-1.5 bg-[#AEE637] mt-4 rounded-full"></div>
    </div>
);

const GroupCard = ({ type, data }) => {
    switch (type) {
        case 'financiado':
            return (
                <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 hover:shadow-2xl transition-all group relative overflow-hidden flex flex-col h-full">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#149C68]/5 rounded-bl-full -mr-10 -mt-10 group-hover:scale-110 transition-transform duration-500"></div>
                    <div className="mb-6">
                        <span className="bg-[#AEE637]/20 text-[#149C68] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                            {data.escuela}
                        </span>
                    </div>
                    <h4 className="text-xl font-bold text-[#383939] mb-4 line-clamp-3 flex-grow">
                        {data.nombre}
                    </h4>
                    <div className="space-y-4 pt-6 border-t border-gray-100">
                        <div>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Docente Investigador</p>
                            <p className="text-sm font-bold text-[#383939]">{data.responsable}</p>
                        </div>
                        <div className="flex items-center justify-between bg-gray-50 p-4 rounded-2xl">
                            <span className="text-xs font-bold text-gray-500">FINANCIAMIENTO</span>
                            <span className="text-lg font-black text-[#149C68]">S/ {data.monto}</span>
                        </div>
                    </div>
                </div>
            );
        case 'reconocido':
            return (
                <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 hover:shadow-2xl transition-all group relative overflow-hidden flex flex-col h-full">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#38C958]/5 rounded-bl-full -mr-10 -mt-10 group-hover:scale-110 transition-transform duration-500"></div>
                    <div className="flex flex-wrap gap-2 mb-6">
                        {data.facultad && (
                            <span className="bg-gray-100 text-gray-600 text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                                {data.facultad}
                            </span>
                        )}
                        <span className="bg-[#149C68]/10 text-[#149C68] text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                            {data.escuela}
                        </span>
                    </div>
                    <h4 className="text-xl font-bold text-[#383939] mb-2">
                        {data.nombre}
                    </h4>
                    <p className="text-xs font-semibold text-[#149C68] mb-6 italic">
                        Línea: {data.linea}
                    </p>
                    <div className="space-y-6 pt-6 border-t border-gray-100 flex-grow">
                        <div>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Responsable</p>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-[#38C958] flex items-center justify-center text-white font-bold">
                                    {data.responsable ? data.responsable.charAt(0) : '?'}
                                </div>
                                <p className="text-sm font-bold text-[#383939]">{data.responsable}</p>
                            </div>
                        </div>
                        {data.integrantes && data.integrantes.length > 0 && (
                            <div>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Integrantes ({data.integrantes.length})</p>
                                <ul className="grid grid-cols-1 gap-1">
                                    {data.integrantes.slice(0, 5).map((integ, idx) => (
                                        <li key={idx} className="text-xs text-gray-600 flex items-center gap-2">
                                            <div className="w-1 h-1 rounded-full bg-[#AEE637]"></div>
                                            {integ}
                                        </li>
                                    ))}
                                    {data.integrantes.length > 5 && (
                                        <li className="text-xs font-bold text-[#149C68] italic mt-1">Y {data.integrantes.length - 5} más...</li>
                                    )}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            );
        default:
            return null;
    }
};

const ResearchGroups = () => {
    const [activeYear, setActiveYear] = useState('2025');
    const { financiados, reconocidos, availableYears, loading } = useGrupos(activeYear);

    useEffect(() => {
        if (availableYears.length > 0 && !availableYears.includes(activeYear)) {
            setActiveYear(availableYears[0]);
        }
    }, [availableYears]);

    return (
        <div className="bg-[#FFFEDB]/30 min-h-screen">
            {/* Hero Section */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden pt-20">
                <div className="absolute inset-0 z-0">
                    <img
                        src="src/assets/portada_grupos.jpg"
                        alt="Fondo Grupos"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#149C68]/90 to-[#149C68]/40"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>

                <div className="container mx-auto px-4 relative z-10 text-center">
                    <span className="inline-block px-4 py-1 bg-[#AEE637] text-[#383939] rounded-full text-xs font-bold mb-6 uppercase tracking-wider animate-bounce">
                        Excelencia Académica
                    </span>
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 animate-modern-reveal">
                        Grupos de <span className="text-[#AEE637]">Investigación</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-white/90 font-medium italic animate-fade-in">
                        "La investigación como camino al conocimiento"
                    </p>
                </div>
            </section>

            {/* Quiénes Somos */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <SectionTitle
                            title="¿Qué son los Grupos de Investigación?"
                            subtitle="Trayectoria y Propósito"
                        />
                        <p className="text-xl text-gray-600 leading-relaxed font-medium">
                            Los Grupos de Investigación (GI) son la unidad básica de organización de la investigación científica y el desarrollo tecnológico en la Universidad Nacional del Altiplano.
                        </p>
                    </div>
                </div>
            </section>

            {/* Selector de Año Dinámico */}
            <section className="py-12 bg-gray-50 border-y border-gray-100 sticky top-20 z-40">
                <div className="container mx-auto px-4 flex justify-center flex-wrap gap-4">
                    {availableYears.map((year) => (
                        <button
                            key={year}
                            onClick={() => setActiveYear(year)}
                            className={`px-8 md:px-12 py-4 rounded-2xl font-bold transition-all transform hover:scale-105 ${activeYear === year
                                ? 'bg-[#149C68] text-white shadow-xl shadow-[#149C68]/20'
                                : 'bg-white text-gray-500 hover:bg-white/80 border border-gray-100'
                                }`}
                        >
                            CONVOCATORIA {year}
                        </button>
                    ))}
                </div>
            </section>

            <div className="py-20 space-y-32">
                {loading ? (
                    <div className="text-center py-20 text-gray-500 italic">
                        Cargando información de grupos...
                    </div>
                ) : (
                    <>
                        <section className="container mx-auto px-4">
                            <SectionTitle
                                title={`Grupos con Financiamiento ${activeYear}`}
                                subtitle="Inversión en Conocimiento"
                            />
                            {financiados.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {financiados.map((item) => (
                                        <GroupCard key={item.id} type="financiado" data={item} />
                                    ))}
                                </div>
                            ) : (
                                <div className="bg-white/50 border-2 border-dashed border-gray-200 rounded-3xl p-12 text-center">
                                    <p className="text-gray-400 italic font-medium">No hay grupos financiados registrados para el {activeYear} en Strapi.</p>
                                </div>
                            )}
                        </section>

                        <section className="container mx-auto px-4">
                            <SectionTitle
                                title={`Grupos Reconocidos por UNA Puno ${activeYear}`}
                                subtitle="Prestigio Institucional"
                            />
                            {reconocidos.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {reconocidos.map((item) => (
                                        <GroupCard key={item.id} type="reconocido" data={item} />
                                    ))}
                                </div>
                            ) : (
                                <div className="bg-white/50 border-2 border-dashed border-gray-200 rounded-3xl p-12 text-center">
                                    <p className="text-gray-400 italic font-medium">No hay grupos reconocidos registrados para el {activeYear} en Strapi.</p>
                                </div>
                            )}
                        </section>
                    </>
                )}
            </div>
        </div>
    );
};

export default ResearchGroups;
