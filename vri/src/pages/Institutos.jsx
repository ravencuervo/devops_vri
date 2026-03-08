import React, { useState, useEffect } from 'react';
import { useInstitutos } from '../hooks/useInstitutos';

const SectionTitle = ({ title, subtitle }) => (
    <div className="mb-12">
        {subtitle && <span className="text-[#149C68] font-bold uppercase tracking-widest text-sm mb-2 block animate-fade-in">{subtitle}</span>}
        <h2 className="text-3xl md:text-4xl font-bold text-[#383939] leading-tight">
            {title}
        </h2>
        <div className="w-20 h-1.5 bg-[#AEE637] mt-4 rounded-full"></div>
    </div>
);

const InstitutoCard = ({ type, data }) => {
    if (type === 'financiado') {
        return (
            <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 hover:shadow-2xl transition-all group relative overflow-hidden flex flex-col h-full">
                <div className="absolute top-0 right-0 w-32 h-32 rounded-bl-full -mr-10 -mt-10 group-hover:scale-110 transition-transform duration-500 bg-[#149C68]/5"></div>

                <div className="mb-4">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">ÁREA TEMÁTICA</p>
                    <span className="bg-gray-100 text-[#149C68] text-xs font-bold px-3 py-1 rounded-full uppercase inline-block mb-4">
                        {data.area}
                    </span>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">INSTITUTO</p>
                    <div className="text-xl font-black text-[#383939] uppercase tracking-wider mb-4">
                        {data.instituto}
                    </div>
                </div>

                <div className="mb-6">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">PROYECTO DE INVESTIGACIÓN</p>
                    <h4 className="text-lg font-bold text-[#383939] leading-snug">
                        {data.proyecto}
                    </h4>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-green-50 p-4 rounded-2xl border border-green-100">
                        <p className="text-[10px] font-bold text-gray-500 uppercase italic">PUNTAJE</p>
                        <p className="text-2xl font-black text-[#149C68]">{data.puntaje}</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100">
                        <p className="text-[10px] font-bold text-gray-500 uppercase italic">RESULTADO</p>
                        <p className="text-xs font-black text-[#1565C0] uppercase leading-tight">{data.resultado}</p>
                    </div>
                </div>

                <div className="mt-auto pt-6 border-t border-gray-100">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">OBSERVACIONES</p>
                    <ul className="space-y-2">
                        {data.observaciones && data.observaciones.map((obs, idx) => (
                            <li key={idx} className="text-xs text-gray-600 flex items-start gap-2">
                                <i className="fas fa-check-circle text-[#AEE637] mt-0.5 text-xs"></i>
                                <span>{obs}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 hover:shadow-2xl transition-all group relative overflow-hidden flex flex-col h-full">
            <div className="absolute top-0 right-0 w-32 h-32 rounded-bl-full -mr-10 -mt-10 group-hover:scale-110 transition-transform duration-500 bg-[#38C958]/5"></div>

            <div className="mb-4">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">FACULTAD</p>
                <span className="bg-gray-100 text-gray-600 text-[10px] font-bold px-3 py-1 rounded-full uppercase inline-block mb-4">
                    {data.facultad}
                </span>
            </div>

            <div className="mb-6 flex-grow">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">INSTITUTO</p>
                <h4 className="text-xl font-bold text-[#383939] leading-snug">
                    {data.nombre}
                </h4>
            </div>

            <div className="mt-auto pt-6 border-t border-gray-100">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">RESPONSABLE</p>
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#38C958] flex items-center justify-center text-white font-bold text-lg shadow-inner">
                        {data.responsable ? data.responsable.charAt(0) : '?'}
                    </div>
                    <p className="text-sm font-bold text-[#383939]">{data.responsable}</p>
                </div>
            </div>
        </div>
    );
};

const Institutos = () => {
    const [activeYear, setActiveYear] = useState('2025');
    const { financiados, reconocidos, availableYears, loading } = useInstitutos(activeYear);

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
                        src="src/assets/portada_instituto.jpg"
                        alt="Fondo Hero Institutos"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#149C68]/90 to-[#149C68]/40"></div>
                </div>

                <div className="container mx-auto px-4 relative z-10 text-center">
                    <span className="inline-block px-4 py-1 bg-[#AEE637] text-[#383939] rounded-full text-xs font-bold mb-6 uppercase tracking-wider animate-bounce">
                        Excelencia en Investigación
                    </span>
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 animate-modern-reveal">
                        Institutos de <span className="text-[#AEE637]">Investigación</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-white/90 font-medium italic animate-fade-in">
                        "Impulsan la investigación y el conocimiento universitario"
                    </p>
                </div>
            </section>

            {/* Quiénes Somos Section */}
            <section className="relative py-28 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="/src/assets/bg_institutos_about.jpg"
                        alt="Fondo Quiénes Somos"
                        className="w-full h-full object-cover opacity-20"
                    />
                    <div className="absolute inset-0 bg-white/80"></div>
                </div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <SectionTitle
                            title="¿Qué son los Institutos de Investigación?"
                            subtitle="Quiénes Somos"
                        />
                        <p className="text-xl text-gray-700 leading-relaxed font-medium">
                            Los Institutos de Investigación de la UNA-Puno son centros destinados a promover y desarrollar la investigación científica, tecnológica y humanística, integrando a docentes y estudiantes de pre y posgrado.
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
                            AÑO {year}
                        </button>
                    ))}
                </div>
            </section>

            {/* Contenido Dinámico */}
            <div className="space-y-0">
                {loading ? (
                    <div className="text-center py-20 text-gray-500 italic">
                        Cargando información de institutos...
                    </div>
                ) : (
                    <>
                        {/* Financiados */}
                        <section className="relative py-24 overflow-hidden">
                            <div className="absolute inset-0 z-0">
                                <img
                                    src="/src/assets/bg_institutos_financiados.jpg"
                                    alt="Fondo Financiados"
                                    className="w-full h-full object-cover opacity-10"
                                />
                                <div className="absolute inset-0 bg-[#FFFEDB]/30"></div>
                            </div>
                            <div className="container mx-auto px-4 relative z-10">
                                <SectionTitle
                                    title={`Institutos con Financiamiento ${activeYear}`}
                                    subtitle="Proyectos Ganadores"
                                />
                                {financiados.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                        {financiados.map((item) => (
                                            <InstitutoCard key={item.id} type="financiado" data={item} />
                                        ))}
                                    </div>
                                ) : (
                                    <div className="bg-white/50 border-2 border-dashed border-gray-200 rounded-3xl p-12 text-center">
                                        <p className="text-gray-400 italic font-medium">No hay proyectos financiados registrados para el año {activeYear}.</p>
                                    </div>
                                )}
                            </div>
                        </section>

                        {/* Reconocidos */}
                        <section className="relative py-24 overflow-hidden">
                            <div className="absolute inset-0 z-0">
                                <img
                                    src="/src/assets/bg_institutos_reconocidos.jpg"
                                    alt="Fondo Reconocidos"
                                    className="w-full h-full object-cover opacity-10"
                                />
                                <div className="absolute inset-0 bg-white/50"></div>
                            </div>
                            <div className="container mx-auto px-4 relative z-10">
                                <SectionTitle
                                    title={`Institutos Reconocidos UNA PUNO ${activeYear}`}
                                    subtitle="Prestigio Institucional"
                                />
                                {reconocidos.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                        {reconocidos.map((item) => (
                                            <InstitutoCard key={item.id} type="reconocido" data={item} />
                                        ))}
                                    </div>
                                ) : (
                                    <div className="bg-white/50 border-2 border-dashed border-gray-200 rounded-3xl p-12 text-center">
                                        <p className="text-gray-400 italic font-medium">No hay institutos reconocidos registrados para el año {activeYear}.</p>
                                    </div>
                                )}
                            </div>
                        </section>
                    </>
                )}
            </div>
        </div>
    );
};

export default Institutos;
