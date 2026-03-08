import React, { useState, useEffect } from 'react';
import { useSemilleros } from '../hooks/useSemilleros';

const SectionTitle = ({ title, subtitle }) => (
    <div className="mb-12">
        {subtitle && <span className="text-[#149C68] font-bold uppercase tracking-widest text-sm mb-2 block animate-fade-in">{subtitle}</span>}
        <h2 className="text-3xl md:text-4xl font-bold text-[#383939] leading-tight">
            {title}
        </h2>
        <div className="w-20 h-1.5 bg-[#AEE637] mt-4 rounded-full"></div>
    </div>
);

const SemilleroCard = ({ type, data }) => {
    return (
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 hover:shadow-2xl transition-all group relative overflow-hidden flex flex-col h-full">
            <div className={`absolute top-0 right-0 w-32 h-32 rounded-bl-full -mr-10 -mt-10 group-hover:scale-110 transition-transform duration-500 ${type === 'financiado' ? 'bg-[#149C68]/5' : 'bg-[#38C958]/5'}`}></div>

            <div className="mb-4">
                <span className="bg-gray-100 text-gray-600 text-[10px] font-bold px-3 py-1 rounded-full uppercase inline-block mb-2">
                    {data.facultad}
                </span>
                <div className="text-xs font-bold text-[#149C68] uppercase tracking-wider">
                    {data.escuela}
                </div>
            </div>

            <h4 className="text-xl font-bold text-[#383939] mb-3 leading-snug">
                {data.nombre}
            </h4>

            {type === 'financiado' && data.presupuesto > 0 && (
                <div className="mb-4 bg-green-50 p-3 rounded-xl border border-green-100 inline-block">
                    <p className="text-[10px] font-bold text-gray-500 uppercase">Presupuesto</p>
                    <p className="text-lg font-black text-[#149C68]">S/ {data.presupuesto}</p>
                </div>
            )}

            <div className="mb-6">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Línea de Investigación</p>
                <p className="text-sm font-medium text-gray-700">{data.linea}</p>
            </div>

            <div className="mt-auto pt-6 border-t border-gray-100">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Integrantes</p>
                <ul className="space-y-2">
                    {data.investigadores && data.investigadores.slice(0, 5).map((investigador, idx) => (
                        <li key={idx} className="text-xs text-gray-600 flex items-start gap-2">
                            <i className="fas fa-user-circle text-[#AEE637] mt-0.5 text-xs"></i>
                            <span>{investigador}</span>
                        </li>
                    ))}
                    {data.investigadores && data.investigadores.length > 5 && (
                        <li className="text-xs font-bold text-[#149C68] italic pl-5">
                            Y {data.investigadores.length - 5} más...
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
};

const Semilleros = () => {
    const [activeYear, setActiveYear] = useState('2025');
    const { financiados, reconocidos, availableYears, loading } = useSemilleros(activeYear);

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
                        src="src/assets/portada_semilleros.jpg"
                        alt="Fondo Semilleros"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#149C68]/90 to-[#149C68]/40"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>

                <div className="container mx-auto px-4 relative z-10 text-center">
                    <span className="inline-block px-4 py-1 bg-[#AEE637] text-[#383939] rounded-full text-xs font-bold mb-6 uppercase tracking-wider animate-bounce">
                        Futuro Científico
                    </span>
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 animate-modern-reveal">
                        Semilleros de <span className="text-[#AEE637]">Investigación</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-white/90 font-medium italic animate-fade-in">
                        "Investigación que transforma el futuro"
                    </p>
                </div>
            </section>

            {/* Quiénes Somos */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <SectionTitle
                            title="¿Qué son los Semilleros de Investigación?"
                            subtitle="Nuestra Misión"
                        />
                        <p className="text-xl text-gray-600 leading-relaxed font-medium">
                            Los Semilleros de Investigación de la Universidad Nacional del Altiplano de Puno (UNA-Puno) son grupos de trabajo formados por estudiantes y docentes, con el objetivo de fomentar la investigación científica y tecnológica en diversas áreas del conocimiento.
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
                            className={`px-12 py-4 rounded-2xl font-bold transition-all transform hover:scale-105 ${activeYear === year
                                ? 'bg-[#149C68] text-white shadow-xl shadow-[#149C68]/20'
                                : 'bg-white text-gray-500 hover:bg-white/80 border border-gray-100'
                                }`}
                        >
                            CONVOCATORIA {year}
                        </button>
                    ))}
                </div>
            </section>

            {/* Contenido Dinámico */}
            <div className="py-20 space-y-32">
                {loading ? (
                    <div className="text-center py-20 text-gray-500 italic">
                        Cargando información de semilleros...
                    </div>
                ) : (
                    <>
                        {/* Financiados */}
                        <section className="container mx-auto px-4">
                            <SectionTitle
                                title={`Semilleros con Financiamiento ${activeYear}`}
                                subtitle="Iniciativas Destacadas"
                            />
                            {financiados.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {financiados.map((item) => (
                                        <SemilleroCard key={item.id} type="financiado" data={item} />
                                    ))}
                                </div>
                            ) : (
                                <div className="bg-white/50 border-2 border-dashed border-gray-200 rounded-3xl p-12 text-center">
                                    <p className="text-gray-400 italic font-medium">No hay semilleros financiados registrados para el {activeYear}.</p>
                                </div>
                            )}
                        </section>

                        {/* Reconocidos */}
                        <section className="container mx-auto px-4">
                            <SectionTitle
                                title={`Semilleros Reconocidos ${activeYear}`}
                                subtitle="Comunidad Científica Joven"
                            />
                            {reconocidos.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {reconocidos.map((item) => (
                                        <SemilleroCard key={item.id} type="reconocido" data={item} />
                                    ))}
                                </div>
                            ) : (
                                <div className="bg-white/50 border-2 border-dashed border-gray-200 rounded-3xl p-12 text-center">
                                    <p className="text-gray-400 italic font-medium">No hay semilleros reconocidos registrados para el {activeYear}.</p>
                                </div>
                            )}
                        </section>
                    </>
                )}
            </div>
        </div>
    );
};

export default Semilleros;
