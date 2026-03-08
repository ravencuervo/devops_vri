import React, { useState, useEffect, useRef } from 'react';

const StatCounter = ({ value, duration = 2500 }) => {
    const [count, setCount] = useState(0);
    const countRef = useRef(null);
    const [hasStarted, setHasStarted] = useState(false);

    const numericPart = value.replace(/[^0-9]/g, '');
    const targetValue = parseInt(numericPart, 10);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasStarted) {
                    setHasStarted(true);
                }
            },
            { threshold: 0.1 }
        );

        if (countRef.current) observer.observe(countRef.current);
        return () => observer.disconnect();
    }, [hasStarted]);

    useEffect(() => {
        if (!hasStarted) return;
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const easedProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            setCount(Math.floor(easedProgress * targetValue));
            if (progress < 1) window.requestAnimationFrame(step);
        };
        window.requestAnimationFrame(step);
    }, [hasStarted, targetValue, duration]);

    return <span ref={countRef}>{count.toLocaleString()}</span>;
};

const InstitutionalStats = () => {
    const stats = [
        {
            label: 'Inversión 2025',
            val: '12',
            prefix: 'S/ ',
            suffix: 'M',
            icon: 'fa-chart-line',
            description: 'en investigación'
        },
        {
            label: 'Tesis Publicadas',
            val: '1450',
            prefix: '',
            suffix: '+',
            icon: 'fa-graduation-cap',
            description: 'en repositorio'
        },
        {
            label: 'Artículos Indexados',
            val: '320',
            prefix: '',
            suffix: '',
            icon: 'fa-scroll',
            description: 'Scopus & WoS'
        },
        {
            label: 'Patentes Registradas',
            val: '12',
            prefix: '',
            suffix: '',
            icon: 'fa-award',
            description: 'en INDECOPI'
        },
    ];

    return (
        <section className="py-24 relative overflow-hidden">
            {/* Dynamic Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#030D4F] via-[#061266] to-[#0a1a80]"></div>

            {/* Animated Grid */}
            <div className="absolute inset-0 opacity-[0.05]"
                style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                    backgroundSize: '60px 60px'
                }}>
            </div>

            {/* Glowing Orbs */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-sky-500/10 rounded-full blur-[180px] -mr-48 -mt-48"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#AEDD2B]/10 rounded-full blur-[150px] -ml-32 -mb-32"></div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-20 reveal">
                    <span className="inline-block px-4 py-2 bg-white/10 text-white/80 rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-6 backdrop-blur-sm border border-white/10">
                        Impacto Institucional
                    </span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4">
                        Excelencia en <span className="text-[#AEDD2B]">Cifras</span>
                    </h2>
                    <p className="text-lg text-white/60 max-w-2xl mx-auto">
                        Resultados que demuestran nuestro compromiso con el desarrollo científico y tecnológico de la región.
                    </p>
                </div>

                {/* Stats Grid - Solo iconos blancos, sin cuadros */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 max-w-5xl mx-auto">
                    {stats.map((stat, idx) => (
                        <div
                            key={idx}
                            className="text-center reveal group"
                            style={{ transitionDelay: `${idx * 100}ms` }}
                        >
                            {/* Icon - Solo blanco, sin cuadro */}
                            <div className="text-5xl md:text-6xl text-white/80 mb-6 group-hover:text-[#AEDD2B] group-hover:scale-110 transition-all duration-300">
                                <i className={`fas ${stat.icon}`}></i>
                            </div>

                            {/* Value */}
                            <div className="text-4xl md:text-5xl font-black text-white mb-2">
                                {stat.prefix}<StatCounter value={stat.val} />{stat.suffix}
                            </div>

                            {/* Label */}
                            <div className="text-white font-bold text-base md:text-lg mb-1">{stat.label}</div>
                            <div className="text-white/40 text-sm">{stat.description}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default InstitutionalStats;
