import React, { useState, useEffect } from 'react';
import { useAvisos } from '../../hooks/useAvisos';

const AvisoModal = ({ currentPage }) => {
    const { aviso, loading } = useAvisos();
    const [isOpen, setIsOpen] = useState(false);

    // Only show on home page. Cancel the timer if user navigates before it fires.
    useEffect(() => {
        let timer;
        if (!loading && aviso && currentPage === 'home') {
            timer = setTimeout(() => setIsOpen(true), 1500);
        }
        return () => {
            if (timer) clearTimeout(timer);
        };
    }, [aviso, loading, currentPage]);

    // Close modal if user navigates away from home
    useEffect(() => {
        if (currentPage !== 'home') {
            setIsOpen(false);
        }
    }, [currentPage]);

    const handleClose = () => setIsOpen(false);

    if (!isOpen || !aviso) return null;

    return (
        <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-0 sm:p-4">
            {/* Overlay */}
            <div
                className="absolute inset-0 bg-[#030D4F]/80 backdrop-blur-md"
                onClick={handleClose}
            ></div>

            {/* Modal */}
            <div className="relative w-full sm:max-w-lg max-h-[95vh] sm:max-h-[90vh] overflow-y-auto rounded-t-[2rem] sm:rounded-[2rem] shadow-2xl bg-white flex flex-col animate-slide-up">

                {/* Close Button */}
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/50 transition-colors shadow-lg"
                >
                    <i className="fas fa-times text-sm"></i>
                </button>

                {/* HERO: Image with title overlaid */}
                {aviso.imagen ? (
                    <div className="relative w-full h-52 sm:h-64 flex-shrink-0 overflow-hidden rounded-t-[2rem] sm:rounded-t-[2rem]">
                        <img
                            src={aviso.imagen}
                            alt={aviso.titulo}
                            className="w-full h-full object-cover"
                        />
                        {/* Dark gradient overlay for text readability */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#030D4F]/90 via-[#030D4F]/40 to-transparent"></div>

                        {/* Badge + Title over image */}
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                            <span className="inline-flex items-center gap-2 bg-red-500 text-white text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest mb-3">
                                <i className="fas fa-bell animate-bounce"></i> Aviso Oficial
                            </span>
                            <h2 className="text-white text-xl sm:text-2xl font-black leading-tight drop-shadow-lg">
                                {aviso.titulo}
                            </h2>
                        </div>
                    </div>
                ) : (
                    /* No image: styled dark header */
                    <div className="relative bg-[#030D4F] px-8 pt-10 pb-8 rounded-t-[2rem] overflow-hidden">
                        <div className="absolute top-0 right-0 w-48 h-48 bg-sky-400/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#AEDD2B]/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"></div>
                        <div className="relative z-10">
                            <span className="inline-flex items-center gap-2 bg-red-500 text-white text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest mb-4">
                                <i className="fas fa-bell animate-bounce"></i> Aviso Oficial
                            </span>
                            <h2 className="text-white text-2xl sm:text-3xl font-black leading-tight">
                                {aviso.titulo}
                            </h2>
                        </div>
                    </div>
                )}

                {/* VRI Badge strip */}
                <div className="flex items-center gap-3 bg-[#030D4F]/5 px-6 py-3 border-b border-gray-100">
                    <div className="w-8 h-8 rounded-xl bg-[#AEDD2B] text-[#030D4F] flex items-center justify-center text-sm">
                        <i className="fas fa-university"></i>
                    </div>
                    <div>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Emitido por</p>
                        <p className="text-xs font-black text-[#030D4F]">Vicerrectorado de Investigación — UNA Puno</p>
                    </div>
                </div>

                {/* Description */}
                <div className="flex-1 px-6 sm:px-8 py-6 overflow-y-auto">
                    <p className="text-sm sm:text-base text-gray-700 leading-relaxed whitespace-pre-line">
                        {aviso.descripcion}
                    </p>
                </div>

                {/* Actions */}
                <div className="px-6 sm:px-8 pb-6 sm:pb-8 pt-2 space-y-3 flex-shrink-0">
                    {aviso.enlace && (
                        <a
                            href={aviso.enlace}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={handleClose}
                            className="flex items-center justify-center gap-3 w-full bg-[#030D4F] text-white py-4 rounded-2xl font-bold text-sm hover:bg-[#051675] hover:shadow-lg transition-all transform hover:-translate-y-0.5"
                        >
                            <i className="fas fa-external-link-alt"></i>
                            {aviso.textoBoton || 'Más Información'}
                        </a>
                    )}
                    <button
                        onClick={handleClose}
                        className="w-full py-3.5 rounded-2xl font-bold text-sm border-2 border-gray-200 text-gray-500 hover:border-red-200 hover:text-red-500 transition-all"
                    >
                        Entendido, cerrar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AvisoModal;
