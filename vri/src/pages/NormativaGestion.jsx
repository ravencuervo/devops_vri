import React, { useState, useEffect } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useNormativas } from '../hooks/useNormativas';

const PDFModal = ({ file, title, onClose }) => {
    if (!file) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 animate-fade-in">
            <div className="absolute inset-0 bg-[#030D4F]/80 backdrop-blur-sm" onClick={onClose}></div>
            <div className="relative bg-white w-full max-w-6xl h-full rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white z-10">
                    <div>
                        <span className="text-[10px] font-black text-[#149C68] uppercase tracking-widest mb-1 block">Visualizador de Documentos</span>
                        <h3 className="text-xl font-black text-slate-900 tracking-tighter line-clamp-1">{title}</h3>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-900 hover:bg-red-50 hover:text-red-500 transition-all font-bold"
                    >
                        <i className="fas fa-times text-xl"></i>
                    </button>
                </div>
                <div className="flex-1 bg-slate-100 relative">
                    <iframe
                        src={`${file}#toolbar=0`}
                        className="w-full h-full border-none"
                        title={title}
                    ></iframe>
                </div>
                <div className="p-6 bg-slate-50 text-center border-t border-slate-100">
                    <a
                        href={file}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 px-8 py-4 bg-[#030D4F] text-[#AEDD2B] rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-[#051675] transition-all shadow-xl active:scale-95"
                    >
                        <i className="fas fa-download"></i> Descargar Documento Oficial
                    </a>
                </div>
            </div>
        </div>
    );
};

const NormativaGestion = () => {
    useScrollReveal();
    const [selectedPDF, setSelectedPDF] = useState(null);
    const [activeTab, setActiveTab] = useState('directiva'); // 'directiva' or 'reglamento'
    const { normativas, loading } = useNormativas(activeTab);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="pb-24 bg-[#FAF9F6] min-h-screen text-slate-900">
            {/* HERO SECTION */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-[#030D4F]">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=1920"
                        alt="Normativa Background"
                        className="w-full h-full object-cover opacity-20"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#030D4F]/95 to-[#030D4F]/40"></div>
                </div>

                <div className="container mx-auto px-4 relative z-20 text-center">
                    <div className="inline-block mb-4 animate-fade-in text-white">
                        <span className="py-2 px-6 rounded-full bg-white/10 border border-white/20 font-black tracking-widest uppercase text-[10px] backdrop-blur-md">
                            Marco Legal & Transparencia
                        </span>
                    </div>
                    <h1 className="text-5xl md:text-8xl font-black text-white mb-6 animate-modern-reveal tracking-tighter">
                        Normativa y <span className="text-[#AEDD2B]">Gestión</span>
                    </h1>
                    <p className="text-blue-100 text-lg md:text-xl max-w-3xl mx-auto font-light animate-slide-up leading-relaxed">
                        Compendio de directivas, reglamentos y lineamientos oficiales que rigen la actividad científica del Vicerrectorado de Investigación.
                    </p>
                </div>
            </section>

            {/* TABS NAVIGATION */}
            <div className="sticky top-16 md:top-20 z-40 bg-white border-b border-slate-200 shadow-sm">
                <div className="container mx-auto px-4 max-w-4xl flex items-center justify-center gap-12 font-sans py-4">
                    <button
                        onClick={() => setActiveTab('directiva')}
                        className={`text-xs font-black uppercase tracking-widest transition-all relative pb-2 ${activeTab === 'directiva' ? 'text-[#030D4F] border-b-2 border-[#AEDD2B]' : 'text-slate-400 hover:text-slate-900'}`}
                    >
                        Directivas
                    </button>
                    <button
                        onClick={() => setActiveTab('reglamento')}
                        className={`text-xs font-black uppercase tracking-widest transition-all relative pb-2 ${activeTab === 'reglamento' ? 'text-[#030D4F] border-b-2 border-[#AEDD2B]' : 'text-slate-400 hover:text-slate-900'}`}
                    >
                        Reglamentos
                    </button>
                </div>
            </div>

            <div className="container mx-auto px-4 max-w-6xl py-20">
                {loading ? (
                    <div className="text-center py-20 text-slate-400 italic font-medium">
                        Cargando documentos oficiales...
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 gap-8 animate-fade-in">
                        {normativas.length > 0 ? (
                            normativas.map((item) => (
                                <div
                                    key={item.id}
                                    className="bg-white rounded-[2.5rem] p-10 border border-slate-200 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 flex flex-col group relative overflow-hidden"
                                >
                                    <div className="absolute top-0 right-0 w-24 h-24 bg-slate-50 rounded-bl-[4rem] group-hover:bg-[#AEDD2B]/10 transition-colors"></div>

                                    <div className="relative z-10 flex flex-col h-full">
                                        <div className="flex justify-between items-start mb-8">
                                            <div className="w-14 h-14 rounded-2xl bg-slate-50 text-[#030D4F] flex items-center justify-center group-hover:bg-[#030D4F] group-hover:text-[#AEDD2B] transition-all shadow-sm">
                                                <i className="fas fa-file-pdf text-2xl"></i>
                                            </div>
                                            <span className="bg-slate-50 text-[9px] font-black text-slate-400 px-4 py-2 rounded-full uppercase tracking-widest border border-slate-100">PDF Oficial</span>
                                        </div>

                                        <h3 className="text-xl font-black text-slate-900 mb-6 tracking-tight leading-snug group-hover:text-[#030D4F] transition-colors">
                                            {item.title}
                                        </h3>

                                        <p className="text-slate-600 text-sm leading-relaxed mb-10 flex-1">
                                            {item.description}
                                        </p>

                                        <button
                                            onClick={() => setSelectedPDF(item)}
                                            className="w-full py-5 bg-slate-50 text-[#030D4F] rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-[#030D4F] hover:text-[#AEDD2B] transition-all flex items-center justify-center gap-3 shadow-sm hover:shadow-xl active:scale-95"
                                        >
                                            Ver Documento <i className="fas fa-external-link-alt text-[9px]"></i>
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-2 text-center py-24 bg-white rounded-[3rem] border-2 border-dashed border-slate-200 text-slate-400 italic">
                                No se encontraron documentos en esta categoría.
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* PDF MODAL */}
            {selectedPDF && (
                <PDFModal
                    file={selectedPDF.file}
                    title={selectedPDF.title}
                    onClose={() => setSelectedPDF(null)}
                />
            )}
        </div>
    );
};

export default NormativaGestion;
