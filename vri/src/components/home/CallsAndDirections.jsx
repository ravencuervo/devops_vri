import React, { useState } from 'react';
import Button from '../ui/Button';
import { MOCK_DATA } from '../../data/mockData';
import { useConvocatorias } from '../../hooks/useConvocatorias';
import SupportModal from '../ui/SupportModal';

const CallsAndDirections = () => {
    const { convocatorias, loading } = useConvocatorias();
    const [activeTab, setActiveTab] = useState('activas');
    const [isSupportOpen, setIsSupportOpen] = useState(false);

    // Filtrado dinámico desde Strapi (insensible a mayúsculas)
    const activeCalls = convocatorias.filter(c => (c.state || '').toLowerCase() === 'activa');
    const closedCalls = convocatorias.filter(c => (c.state || '').toLowerCase() === 'cerrado');

    return (
        <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
            {/* Background */}
            <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-blue-50 rounded-full blur-[150px] -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#AEDD2B]/10 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid lg:grid-cols-3 gap-12">

                    {/* Calls Section */}
                    <div className="lg:col-span-2 reveal">
                        {/* Header */}
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                            <div>
                                <span className="inline-block px-4 py-2 bg-green-50 text-green-600 rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-4">
                                    Oportunidades
                                </span>
                                <h2 className="text-4xl md:text-5xl font-black text-gray-900">
                                    Convocatorias <span className="text-unap-blue">Activas</span>
                                </h2>
                            </div>

                            {/* Tab Switcher */}
                            <div className="flex bg-gray-100 rounded-full p-1">
                                <button
                                    onClick={() => setActiveTab('activas')}
                                    className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${activeTab === 'activas'
                                        ? 'bg-white text-unap-blue shadow-sm'
                                        : 'text-gray-500 hover:text-gray-700'
                                        }`}
                                >
                                    Abiertas ({activeCalls.length})
                                </button>
                                <button
                                    onClick={() => setActiveTab('cerradas')}
                                    className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${activeTab === 'cerradas'
                                        ? 'bg-white text-gray-700 shadow-sm'
                                        : 'text-gray-500 hover:text-gray-700'
                                        }`}
                                >
                                    Cerradas ({closedCalls.length})
                                </button>
                            </div>
                        </div>

                        {/* Calls List */}
                        <div className="space-y-4">
                            {loading ? (
                                // Skeleton Loading State
                                [...Array(2)].map((_, i) => (
                                    <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 animate-pulse">
                                        <div className="flex gap-6">
                                            <div className="w-16 h-16 bg-gray-100 rounded-2xl"></div>
                                            <div className="flex-1 space-y-3">
                                                <div className="h-4 bg-gray-100 rounded w-1/4"></div>
                                                <div className="h-6 bg-gray-100 rounded w-3/4"></div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                (activeTab === 'activas' ? activeCalls : closedCalls).length > 0 ? (
                                    (activeTab === 'activas' ? activeCalls : closedCalls).map((call, idx) => (
                                        <div
                                            key={call.id}
                                            className={`group bg-white rounded-2xl p-6 border transition-all duration-300 hover:shadow-xl ${(call.state || '').toLowerCase() === 'activa'
                                                ? 'border-green-100 hover:border-green-300'
                                                : 'border-gray-100 hover:border-gray-300 opacity-80'
                                                }`}
                                            style={{ animationDelay: `${idx * 100}ms` }}
                                        >
                                            <div className="flex flex-col md:flex-row md:items-center gap-6">
                                                {/* Status Badge */}
                                                <div className={`flex-shrink-0 w-16 h-16 rounded-2xl flex flex-col items-center justify-center ${(call.state || '').toLowerCase() === 'activa'
                                                    ? 'bg-gradient-to-br from-[#030D4F] to-[#051675] text-white'
                                                    : 'bg-gray-100 text-gray-400'
                                                    }`}>
                                                    <i className={`fas text-xl ${(call.state || '').toLowerCase() === 'activa' ? 'fa-rocket' : 'fa-lock'}`}></i>
                                                    <span className="text-[10px] font-bold uppercase mt-1">{(call.state || '').toLowerCase() === 'activa' ? 'Abierta' : 'Cerrado'}</span>
                                                </div>

                                                {/* Content */}
                                                <div className="flex-1">
                                                    <div className="flex flex-wrap gap-2 mb-2">
                                                        <span className="px-3 py-1 bg-blue-50 text-[#030D4F] rounded-full text-xs font-bold uppercase tracking-tighter">
                                                            {call.type}
                                                        </span>
                                                        {(call.state || '').toLowerCase() === 'activa' && (
                                                            <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-xs font-bold animate-pulse">
                                                                <i className="fas fa-check-circle mr-1"></i> Vigente
                                                            </span>
                                                        )}
                                                    </div>
                                                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#030D4F] transition-colors mb-2">
                                                        {call.title}
                                                    </h3>
                                                    <div className="flex items-center gap-4 text-sm text-gray-500">
                                                        <span className="flex items-center gap-1">
                                                            <i className="far fa-calendar-alt text-[#AEDD2B]"></i>
                                                            Límite: <span className="font-semibold text-gray-700">{call.closeDate}</span>
                                                        </span>
                                                        {call.budget && (
                                                            <span className="flex items-center gap-1">
                                                                <i className="fas fa-coins text-[#AEDD2B]"></i>
                                                                <span className="font-semibold text-gray-700">{call.budget}</span>
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Actions */}
                                                <div className="flex flex-wrap gap-3">
                                                    {(call.state || '').toLowerCase() === 'activa' ? (
                                                        <a
                                                            href={`#convocatorias?id=${call.id}`}
                                                            className="px-5 py-2.5 bg-[#030D4F] text-white rounded-xl font-bold hover:bg-[#051675] transition-all flex items-center gap-2"
                                                        >
                                                            <i className="fas fa-info-circle"></i>
                                                            Ver Postulación
                                                        </a>
                                                    ) : (
                                                        <span className="px-5 py-2.5 bg-gray-100 text-gray-400 rounded-xl font-bold cursor-not-allowed">
                                                            Cerrado
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="p-12 text-center bg-gray-50 rounded-2xl border-2 border-dashed border-gray-100">
                                        <p className="text-gray-400 font-bold uppercase text-xs tracking-widest">No hay convocatorias disponibles</p>
                                    </div>
                                )
                            )}
                        </div>

                        {/* View All Link */}
                        <div className="mt-8 text-center md:text-left">
                            <a href="#convocatorias" className="inline-flex items-center gap-2 text-unap-blue font-bold hover:gap-3 transition-all">
                                Ver histórico de convocatorias
                                <i className="fas fa-arrow-right"></i>
                            </a>
                        </div>
                    </div>

                    {/* Sidebar: Directions */}
                    <div className="lg:col-span-1 reveal" style={{ transitionDelay: '0.2s' }}>
                        <div className="sticky top-24">
                            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                                <h3 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-unap-blue flex items-center justify-center text-white">
                                        <i className="fas fa-building"></i>
                                    </div>
                                    Direcciones
                                </h3>

                                <div className="space-y-4">
                                    {MOCK_DATA.directions.map((dir, idx) => (
                                        <a
                                            key={dir.id}
                                            href={dir.url || "#"}
                                            className="group flex items-center p-4 bg-gray-50 hover:bg-gradient-to-r hover:from-blue-50 hover:to-transparent rounded-xl transition-all border border-transparent hover:border-blue-100"
                                        >
                                            <div className="w-12 h-12 rounded-xl bg-white text-unap-blue flex items-center justify-center shadow-sm group-hover:bg-unap-blue group-hover:text-white transition-all mr-4">
                                                <i className={`fas ${dir.icon}`}></i>
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-bold text-gray-900 group-hover:text-unap-blue transition-colors text-sm">{dir.title}</h4>
                                                <p className="text-xs text-gray-500">{dir.desc}</p>
                                            </div>
                                            <i className="fas fa-chevron-right text-gray-300 group-hover:text-unap-blue group-hover:translate-x-1 transition-all"></i>
                                        </a>
                                    ))}
                                </div>

                                {/* Help Box */}
                                <div className="mt-8 p-6 bg-gradient-to-br from-[#030D4F] to-[#061266] rounded-2xl text-white relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-24 h-24 bg-sky-500/20 rounded-full blur-[50px]"></div>
                                    <div className="relative z-10">
                                        <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-[#AEDD2B] mb-4">
                                            <i className="fas fa-headset text-xl"></i>
                                        </div>
                                        <h4 className="font-bold text-lg mb-2">¿Necesitas ayuda?</h4>
                                        <p className="text-sm text-white/70 mb-4">Contacta con nuestra mesa de ayuda para investigadores.</p>
                                        <button
                                            onClick={() => setIsSupportOpen(true)}
                                            className="inline-flex items-center gap-2 text-[#AEDD2B] font-bold text-sm hover:gap-3 transition-all"
                                        >
                                            Ir a Soporte
                                            <i className="fas fa-arrow-right"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <SupportModal isOpen={isSupportOpen} onClose={() => setIsSupportOpen(false)} />
        </section>
    );
};

export default CallsAndDirections;
