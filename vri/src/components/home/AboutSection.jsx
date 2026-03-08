import React, { useState, useEffect } from 'react';

const AboutSection = () => {
    const [activeFeature, setActiveFeature] = useState(0);

    const features = [
        {
            icon: 'fa-user-graduate',
            title: 'Investigadores RENACYT',
            description: 'Docentes investigadores calificados por CONCYTEC, liderando proyectos de alto impacto científico.',
            color: 'from-blue-500 to-indigo-600',
            stat: '215+'
        },
        {
            icon: 'fa-seedling',
            title: 'Semilleros de Investigación',
            description: 'Formación temprana en investigación para estudiantes de pregrado con mentoría especializada.',
            color: 'from-emerald-500 to-green-600',
            stat: '45'
        },
        {
            icon: 'fa-flask',
            title: 'Laboratorios Especializados',
            description: 'Infraestructura de vanguardia para investigación en diversas áreas del conocimiento.',
            color: 'from-purple-500 to-pink-600',
            stat: '32'
        },
        {
            icon: 'fa-globe-americas',
            title: 'Convenios Internacionales',
            description: 'Alianzas estratégicas con universidades y centros de investigación de todo el mundo.',
            color: 'from-orange-500 to-red-600',
            stat: '52'
        }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveFeature((prev) => (prev + 1) % features.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-50 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2 opacity-50"></div>
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#AEDD2B]/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2"></div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Section Header */}
                <div className="text-center max-w-4xl mx-auto mb-20 reveal">
                    <span className="inline-block px-4 py-2 bg-blue-50 text-unap-blue rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-6">
                        Sobre Nosotros
                    </span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6 leading-tight">
                        Liderando la <span className="text-transparent bg-clip-text bg-gradient-to-r from-unap-blue to-sky-500">Investigación</span> en el Sur del Perú
                    </h2>
                    <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                        El Vicerrectorado de Investigación es el órgano rector de la generación y contribución en investigación científica, desarrollo tecnológico e innovación de la Universidad Nacional del Altiplano.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left Column: Interactive Features */}
                    <div className="reveal" style={{ transitionDelay: '0.2s' }}>
                        <div className="space-y-4">
                            {features.map((feature, idx) => (
                                <div
                                    key={idx}
                                    onClick={() => setActiveFeature(idx)}
                                    className={`group p-6 rounded-2xl cursor-pointer transition-all duration-500 ${activeFeature === idx
                                        ? 'bg-white shadow-xl border-l-4 border-unap-blue scale-[1.02]'
                                        : 'bg-transparent hover:bg-white/50 border-l-4 border-transparent hover:border-gray-200'
                                        }`}
                                >
                                    <div className="flex items-start gap-5">
                                        <div className={`flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white text-xl shadow-lg transition-transform duration-300 ${activeFeature === idx ? 'scale-110 rotate-3' : 'group-hover:scale-105'}`}>
                                            <i className={`fas ${feature.icon}`}></i>
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between mb-2">
                                                <h3 className={`text-lg font-bold transition-colors ${activeFeature === idx ? 'text-unap-blue' : 'text-gray-800'}`}>
                                                    {feature.title}
                                                </h3>
                                                <span className={`text-2xl font-black transition-all ${activeFeature === idx ? 'text-unap-blue opacity-100' : 'text-gray-300 opacity-0 group-hover:opacity-100'}`}>
                                                    {feature.stat}
                                                </span>
                                            </div>
                                            <p className={`text-sm leading-relaxed transition-all duration-300 ${activeFeature === idx ? 'text-gray-600 max-h-20 opacity-100' : 'text-gray-400 max-h-0 opacity-0 overflow-hidden'}`}>
                                                {feature.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Progress Indicators */}
                        <div className="flex gap-2 mt-8 pl-6">
                            {features.map((_, idx) => (
                                <div
                                    key={idx}
                                    className={`h-1 rounded-full transition-all duration-500 ${activeFeature === idx ? 'w-12 bg-unap-blue' : 'w-4 bg-gray-200'}`}
                                ></div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Visual Display */}
                    <div className="reveal" style={{ transitionDelay: '0.4s' }}>
                        <div className="relative">
                            {/* Main Card */}
                            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-2xl border border-gray-100 relative overflow-hidden">
                                {/* Decorative Corner */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-unap-blue/10 to-transparent rounded-bl-full"></div>

                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg border border-gray-100 p-2">
                                        <img src="src/assets/vrionly.png" alt="VRI Logo" loading="lazy" className="w-full h-full object-contain" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-black text-gray-900">Identidad Digital VRI</h3>
                                        <span className="text-unap-blue text-xs font-bold uppercase tracking-[0.15em]">Innovación Tecnológica</span>
                                    </div>
                                </div>

                                <p className="text-gray-600 leading-relaxed mb-8 text-lg">
                                    Nuestras plataformas están interconectadas para brindar facilidad de uso y acceso seguro. Integramos tecnologías de vanguardia como <span className="text-unap-blue font-bold">OpenID</span> e <span className="text-unap-blue font-bold">IDaaS</span>, siendo pioneros tecnológicos a nivel nacional.
                                </p>

                                {/* Feature Checkmarks */}
                                <div className="grid gap-4">
                                    {[
                                        { text: 'Acceso seguro y confiable para docentes y estudiantes', icon: 'fa-shield-alt' },
                                        { text: 'Ecosistema digital unificado bajo una sola identidad', icon: 'fa-fingerprint' },
                                        { text: 'Plataformas interconectadas en tiempo real', icon: 'fa-network-wired' }
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-transparent rounded-xl group hover:from-blue-100 transition-colors">
                                            <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white flex-shrink-0 group-hover:scale-110 transition-transform">
                                                <i className={`fas ${item.icon} text-sm`}></i>
                                            </div>
                                            <p className="text-gray-700 font-medium text-sm">{item.text}</p>
                                        </div>
                                    ))}
                                </div>

                                {/* CTA Button */}
                                <a href="#nosotros" className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-unap-blue text-white rounded-xl font-bold hover:bg-blue-700 transition-colors">
                                    Conocer Más
                                    <i className="fas fa-arrow-right"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
