import React from 'react';
import { useRenacyt } from '../hooks/useRenacyt';

const SectionTitle = ({ title, subtitle }) => (
    <div className="mb-12">
        {subtitle && <span className="text-[#149C68] font-bold uppercase tracking-widest text-sm mb-2 block animate-fade-in">{subtitle}</span>}
        <h2 className="text-3xl md:text-4xl font-bold text-[#383939] leading-tight">
            {title}
        </h2>
        <div className="w-20 h-1.5 bg-[#AEE637] mt-4 rounded-full"></div>
    </div>
);

const FacultyHeader = ({ data }) => (
    <div className="flex items-center gap-3 mb-4">
        {/* Eliminado el contenedor de imagen por solicitud del usuario */}
        <div className="min-w-0">
            <span className="bg-[#149C68]/10 text-[#149C68] text-[9px] font-bold px-2 py-0.5 rounded-full uppercase truncate block mb-1">
                {data.facultad}
            </span>
            <h4 className="text-sm font-black text-[#383939] uppercase leading-tight">
                {data.escuela}
            </h4>
        </div>
    </div>
);

const DocenteInvestigadorCard = ({ data }) => {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-xl transition-all group relative overflow-hidden flex flex-col h-full border-b-2 hover:border-b-[#38C958]">
            <FacultyHeader data={data} />

            <div className="space-y-1.5 mt-2">
                {data.docentes.map((docente, idx) => (
                    <div key={idx} className="flex items-center justify-between py-2 px-3 rounded-lg bg-gray-50/50 hover:bg-white border border-transparent hover:border-[#AEE637]/30 transition-all text-xs">
                        <span className="font-bold text-[#4a4a4a] pr-2">{docente.nombre}</span>
                        <span className="text-[10px] font-black text-[#149C68] whitespace-nowrap shrink-0 opacity-80 uppercase italic">
                            {docente.nivel}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

const DocenteRenacytCard = ({ data }) => {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-xl transition-all group relative overflow-hidden flex flex-col h-full border-b-2 hover:border-b-[#149C68]">
            <FacultyHeader data={data} />

            <div className="space-y-1.5 mt-2">
                {data.docentes.map((docente, idx) => (
                    <div key={idx} className="flex flex-col py-2.5 px-3 rounded-lg bg-gray-50/50 hover:bg-white border border-transparent hover:border-[#149C68]/30 transition-all">
                        <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-bold text-[#383939]">{docente.nombre}</span>
                            <span className="text-[9px] font-black text-[#149C68] uppercase shrink-0 px-2 py-0.5 bg-white rounded-md border border-gray-100">
                                {docente.nivel}
                            </span>
                        </div>
                        <div className="flex items-center gap-1.5 opacity-60">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                            <span className="text-[10px] font-bold uppercase tracking-tighter">{docente.estado || 'Activo'}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const Renacyt = () => {
    const { docentesInvestigadores, docentesRenacyt, loading } = useRenacyt();

    return (
        <div className="bg-[#fcfcfc] min-h-screen">
            {/* Hero Section */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden pt-20">
                <div className="absolute inset-0 z-0">
                    <img
                        src="src/assets/portada_renacyt.jpg"
                        alt="Fondo RENACYT"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#149C68]/95 to-[#149C68]/60"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>

                <div className="container mx-auto px-4 relative z-10 text-center">
                    <span className="inline-block px-4 py-1 bg-[#AEE637] text-[#383939] rounded-full text-xs font-bold mb-6 uppercase tracking-wider animate-bounce">
                        Excelencia Investigativa
                    </span>
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 animate-modern-reveal">
                        Padrón de <span className="text-[#AEE637]">Investigadores</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-white/90 font-medium italic animate-fade-in">
                        "Investigación que transforma el futuro"
                    </p>
                </div>
            </section>

            {/* Quiénes Somos */}
            <section className="relative py-20 bg-white border-b border-gray-50">
                <div className="container mx-auto px-4 text-center">
                    <div className="max-w-4xl mx-auto">
                        <SectionTitle
                            title="¿Qué es el RENACYT?"
                            subtitle="UNA PUNO"
                        />
                        <p className="text-lg text-gray-600 leading-relaxed font-medium">
                            El Registro Nacional Científico, Tecnológico y de Innovación Tecnológica (RENACYT) es el padrón que permite identificar a las personas naturales que realizan actividades científicas en el Perú. La UNA Puno cuenta con investigadores categorizados por CONCYTEC.
                        </p>
                    </div>
                </div>
            </section>

            {loading ? (
                <div className="text-center py-20 text-gray-400 italic">
                    Sincronizando padrón de investigadores...
                </div>
            ) : (
                <>
                    {/* Docentes Investigadores */}
                    <section className="py-20">
                        <div className="container mx-auto px-4">
                            <SectionTitle
                                title="DOCENTES INVESTIGADORES"
                                subtitle="Clasificación Universitaria"
                            />
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {docentesInvestigadores.map((item) => (
                                    <DocenteInvestigadorCard key={item.id} data={item} />
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Docentes Renacyt */}
                    <section className="py-20 bg-gray-50/50">
                        <div className="container mx-auto px-4">
                            <SectionTitle
                                title="DOCENTES RENACYT"
                                subtitle="Registro Nacional (CONCYTEC)"
                            />
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {docentesRenacyt.map((item) => (
                                    <DocenteRenacytCard key={item.id} data={item} />
                                ))}
                            </div>
                        </div>
                    </section>
                </>
            )}
        </div>
    );
};

export default Renacyt;
