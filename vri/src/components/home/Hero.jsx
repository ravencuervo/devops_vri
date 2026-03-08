import React, { useState, useEffect, useMemo } from 'react';

const Hero = ({ autoPlayVideo = false }) => {
    // Inicialmente false para mostrar el botón de play siempre
    const [showVideo, setShowVideo] = useState(false);
    const [currentWord, setCurrentWord] = useState(0);
    const [isTyping, setIsTyping] = useState(true);
    const [shootingStars, setShootingStars] = useState([]);

    const dynamicPhrases = [
        { word: 'Innovación', color: 'text-[#AEDD2B]' },
        { word: 'Excelencia', color: 'text-unap-gold' },
        { word: 'Conocimiento', color: 'text-sky-400' },
        { word: 'Impacto', color: 'text-emerald-400' },
        { word: 'Progreso', color: 'text-orange-400' }
    ];

    // Eliminado el useEffect de autoPlayVideo para que no se reproduzca solo

    useEffect(() => {
        const interval = setInterval(() => {
            setIsTyping(false);
            setTimeout(() => {
                setCurrentWord((prev) => (prev + 1) % dynamicPhrases.length);
                setIsTyping(true);
            }, 500);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    // Shooting stars effect
    useEffect(() => {
        const shootingInterval = setInterval(() => {
            const id = Date.now();
            const startX = Math.random() * 50 + 10;
            const startY = Math.random() * 20 + 5;

            setShootingStars(prev => [...prev, { id, x: startX, y: startY }]);

            setTimeout(() => {
                setShootingStars(prev => prev.filter(star => star.id !== id));
            }, 2000);
        }, 4000);
        return () => clearInterval(shootingInterval);
    }, []);

    const quickLinks = [
        { name: 'Instituto de Investigación', link: '#idi', icon: 'src/assets/dii.png', color: 'from-emerald-400 to-green-600', bgColor: 'bg-emerald-500/20' },
        { name: 'Innovación y Transferencia', link: '#innovacion', icon: 'src/assets/innova.png', color: 'from-blue-400 to-indigo-600', bgColor: 'bg-blue-500/20' },
        { name: 'INCUNALAB', link: 'https://www.incunalab.com/', icon: 'src/assets/incunalab.png', color: 'from-purple-400 to-pink-600', bgColor: 'bg-purple-500/20' },
        { name: 'Bienes y Servicios', link: 'https://www.facebook.com/dpbsunap/?locale=hi_IN', icon: 'src/assets/bienes.png', color: 'from-orange-400 to-red-500', bgColor: 'bg-orange-500/20' },
        { name: 'PGI', link: 'https://pgi.vriunap.pe/home', icon: 'src/assets/pgi.png', color: 'from-cyan-400 to-blue-600', bgColor: 'bg-cyan-500/20' },
    ];

    // Estrellas y estructura galáctica
    const galaxyStars = useMemo(() => {
        const backgroundStars = Array.from({ length: 50 }).map((_, i) => ({
            id: `bg-${i}`,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 1 + 0.5,
            color: '#FFFFFF',
            opacity: Math.random() * 0.5 + 0.1,
            animationDuration: Math.random() * 5 + 3,
        }));

        const nebulaStars = Array.from({ length: 150 }).map((_, i) => {
            const x = Math.random() * 100;
            const yCenter = (x * 0.5) + 20;
            let dispersion = (Math.random() - 0.5) * 50;
            dispersion = dispersion * Math.random();
            const y = yCenter + dispersion;

            let color;
            const rand = Math.random();
            if (rand > 0.8) color = '#FFFFFF';
            else if (rand > 0.6) color = '#FDBA74';
            else if (rand > 0.4) color = '#FEF3C7';
            else color = '#E0F2FE';

            return {
                id: `nebula-${i}`,
                x,
                y: Math.min(Math.max(y, 0), 100),
                size: Math.random() * 1.8 + 0.5,
                color,
                opacity: Math.random() * 0.8 + 0.1,
                animationDuration: Math.random() * 3 + 1,
            };
        });

        return [...backgroundStars, ...nebulaStars];
    }, []);

    // Objetos Celestes
    const celestialObjects = useMemo(() => [
        { type: 'planet', x: 92, y: 15, size: 28, mainColor: '#FCD34D', shadowColor: '#B45309', glow: 'rgba(252, 211, 77, 0.4)' },
        { type: 'planet', x: 5, y: 70, size: 20, mainColor: '#F97316', shadowColor: '#9A3412', glow: 'rgba(249, 115, 22, 0.3)' },
        { type: 'planet-rings', x: 80, y: 85, size: 22, mainColor: '#A78BFA', shadowColor: '#5B21B6', glow: 'rgba(167, 139, 250, 0.3)' },
        { type: 'moon', x: 88, y: 40, size: 16, mainColor: '#E5E7EB', shadowColor: '#6B7280', glow: 'rgba(229, 231, 235, 0.5)' },
        { type: 'satellite', x: 25, y: 12 },
        { type: 'satellite', x: 50, y: 5 },
        { type: 'satellite', x: 35, y: 90 },
        { type: 'asteroid', x: 40, y: 25, size: 6 },
        { type: 'asteroid', x: 65, y: 50, size: 5 },
        { type: 'asteroid', x: 15, y: 80, size: 7 },
    ], []);

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-b from-[#020817] via-[#030D4F] to-[#061266]"></div>

                <div
                    className="absolute top-1/2 left-1/2 w-[140%] h-[60%] -translate-x-1/2 -translate-y-1/2 opacity-20 pointer-events-none"
                    style={{
                        background: 'radial-gradient(ellipse at center, rgba(253, 186, 116, 0.4) 0%, rgba(249, 115, 22, 0.1) 40%, transparent 70%)',
                        transform: 'translate(-50%, -50%) rotate(25deg)',
                        filter: 'blur(80px)',
                    }}
                ></div>

                {galaxyStars.map((star) => (
                    <div
                        key={star.id}
                        className="absolute rounded-full pointer-events-none"
                        style={{
                            left: `${star.x}%`,
                            top: `${star.y}%`,
                            width: `${star.size}px`,
                            height: `${star.size}px`,
                            backgroundColor: star.color,
                            opacity: star.opacity,
                            animation: `twinkle ${star.animationDuration}s ease-in-out infinite`
                        }}
                    ></div>
                ))}

                {celestialObjects.map((obj, idx) => (
                    <div key={idx} className="absolute z-10" style={{ left: `${obj.x}%`, top: `${obj.y}%`, transform: 'translate(-50%, -50%)' }}>
                        {obj.type === 'planet' && (
                            <div className="relative group">
                                <div
                                    className="rounded-full transition-transform duration-1000 group-hover:scale-110"
                                    style={{
                                        width: obj.size,
                                        height: obj.size,
                                        background: `radial-gradient(circle at 30% 30%, ${obj.mainColor}, ${obj.shadowColor})`,
                                        boxShadow: `inset -${obj.size / 4}px -${obj.size / 4}px ${obj.size / 2}px rgba(0,0,0,0.5), 0 0 20px ${obj.glow}`
                                    }}
                                ></div>
                            </div>
                        )}
                        {obj.type === 'planet-rings' && (
                            <div className="relative group hover:scale-110 transition-transform duration-1000">
                                <div
                                    className="rounded-full relative z-10"
                                    style={{
                                        width: obj.size,
                                        height: obj.size,
                                        background: `radial-gradient(circle at 30% 30%, ${obj.mainColor}, ${obj.shadowColor})`,
                                    }}
                                ></div>
                                <div
                                    className="absolute top-1/2 left-1/2 border-4 border-white/20 rounded-full z-0"
                                    style={{
                                        width: obj.size * 2.5,
                                        height: obj.size * 0.8,
                                        transform: 'translate(-50%, -50%) rotate(-20deg)',
                                        borderTopColor: 'rgba(255,255,255,0.4)',
                                        borderBottomColor: 'rgba(255,255,255,0.1)'
                                    }}
                                ></div>
                            </div>
                        )}
                        {obj.type === 'moon' && (
                            <div className="relative w-full h-full">
                                <div
                                    className="rounded-full"
                                    style={{
                                        width: obj.size,
                                        height: obj.size,
                                        background: `radial-gradient(circle at 35% 35%, #F3F4F6, #4B5563)`,
                                        boxShadow: `inset -2px -2px 5px rgba(0,0,0,0.5), 0 0 15px ${obj.glow}`
                                    }}
                                >
                                    <div className="absolute w-[20%] h-[20%] bg-gray-500/20 rounded-full top-[25%] left-[55%]"></div>
                                    <div className="absolute w-[15%] h-[15%] bg-gray-500/20 rounded-full top-[55%] left-[30%]"></div>
                                </div>
                            </div>
                        )}
                        {obj.type === 'satellite' && (
                            <div className="relative animate-float" style={{ animationDuration: '8s' }}>
                                <div className="w-[10px] h-[6px] bg-gray-300 rounded-[1px] shadow-lg relative z-10"></div>
                                <div className="absolute top-1/2 -left-3 w-3 h-[4px] bg-sky-500/80 -translate-y-1/2 shadow-[0_0_5px_rgba(14,165,233,0.5)]"></div>
                                <div className="absolute top-1/2 -right-3 w-3 h-[4px] bg-sky-500/80 -translate-y-1/2 shadow-[0_0_5px_rgba(14,165,233,0.5)]"></div>
                                <div className="absolute -top-[2px] left-1/2 -translate-x-1/2 w-[2px] h-[2px] bg-red-500 rounded-full animate-pulse"></div>
                            </div>
                        )}
                        {obj.type === 'asteroid' && (
                            <div
                                className="relative animate-slow-spin"
                                style={{
                                    width: obj.size,
                                    height: obj.size * 0.8,
                                    background: '#4B5563',
                                    borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
                                    boxShadow: 'inset -1px -1px 2px rgba(0,0,0,0.8)'
                                }}
                            ></div>
                        )}
                    </div>
                ))}

                {shootingStars.map((star) => (
                    <div
                        key={star.id}
                        className="absolute pointer-events-none"
                        style={{
                            left: `${star.x}%`,
                            top: `${star.y}%`,
                            animation: 'shooting-star 2.5s ease-out forwards'
                        }}
                    >
                        <div className="relative">
                            <div className="w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_8px_white]"></div>
                            <div className="absolute top-1/2 right-full w-32 h-[1px] bg-gradient-to-l from-white via-white/10 to-transparent -translate-y-1/2"></div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="relative z-10 container mx-auto px-4 pt-24 pb-12">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    <div className="text-center lg:text-left">
                        <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-md px-5 py-2.5 rounded-full mb-8 border border-white/10 animate-fade-in">
                            <div className="w-2 h-2 bg-[#AEDD2B] rounded-full animate-pulse"></div>
                            <span className="text-white/80 text-xs font-bold uppercase tracking-[0.2em]">Universidad Nacional del Altiplano</span>
                        </div>

                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] mb-6">
                            <span className="block animate-slide-up">Investigación para</span>
                            <span className="block animate-slide-up" style={{ animationDelay: '0.2s' }}>
                                tu{' '}
                                <span className={`inline-block transition-all duration-500 ${dynamicPhrases[currentWord].color} ${isTyping ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
                                    {dynamicPhrases[currentWord].word}
                                </span>
                            </span>
                        </h1>

                        <p className="text-lg md:text-xl text-white/70 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed animate-slide-up" style={{ animationDelay: '0.4s' }}>
                            El Vicerrectorado de Investigación lidera la generación de conocimiento científico e innovación tecnológica con impacto regional y global.
                        </p>

                        <div className="flex flex-wrap gap-4 justify-center lg:justify-start animate-slide-up" style={{ animationDelay: '0.6s' }}>
                            <a href="#idi" className="group relative px-8 py-4 bg-[#AEDD2B] text-[#030D4F] rounded-2xl font-bold overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(174,221,43,0.4)] hover:scale-105">
                                <span className="relative z-10 flex items-center gap-2">
                                    Explorar Investigación
                                    <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
                                </span>
                            </a>
                            <a href="#convocatorias" className="px-8 py-4 bg-white/5 backdrop-blur-md text-white rounded-2xl font-bold border border-white/20 hover:bg-white/10 hover:border-white/40 transition-all duration-300">
                                Ver Convocatorias
                            </a>
                        </div>

                        <div className="grid grid-cols-3 gap-6 mt-12 pt-10 border-t border-white/10 animate-slide-up" style={{ animationDelay: '0.8s' }}>
                            {[
                                { value: '215+', label: 'Investigadores' },
                                { value: '156', label: 'Proyectos' },
                                { value: '324', label: 'Publicaciones' }
                            ].map((stat, idx) => (
                                <div key={idx} className="text-center lg:text-left">
                                    <div className="text-2xl md:text-3xl font-black text-white mb-1">{stat.value}</div>
                                    <div className="text-[10px] md:text-xs text-white/50 uppercase tracking-wider font-medium">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-10 animate-modern-reveal" style={{ animationDelay: '0.5s' }}>
                        {!showVideo ? (
                            <div
                                onClick={() => setShowVideo(true)}
                                className="relative aspect-video rounded-3xl overflow-hidden cursor-pointer group border-2 border-white/10 hover:border-[#AEDD2B]/50 transition-all duration-500 shadow-2xl"
                            >
                                <img
                                    src="https://img.youtube.com/vi/eUcmIoieemc/maxresdefault.jpg"
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    alt="Video Thumbnail"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#030D4F] via-[#030D4F]/40 to-transparent"></div>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-[#AEDD2B]/30 rounded-full animate-ping"></div>
                                        <div className="relative w-20 h-20 bg-[#AEDD2B] rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                                            <i className="fas fa-play text-[#030D4F] text-2xl ml-1"></i>
                                        </div>
                                    </div>
                                    <span className="mt-4 text-white font-bold text-sm uppercase tracking-widest">Reproducir Video Institucional</span>
                                </div>
                            </div>
                        ) : (
                            <div className="relative aspect-video rounded-3xl overflow-hidden border-2 border-[#AEDD2B]/30 shadow-2xl">
                                <iframe
                                    className="absolute inset-0 w-full h-full"
                                    src="https://www.youtube.com/embed/eUcmIoieemc?autoplay=1&mute=1"
                                    title="Video Institucional VRI"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                                <button
                                    onClick={(e) => { e.stopPropagation(); setShowVideo(false); }}
                                    className="absolute top-4 right-4 z-20 w-10 h-10 bg-black/60 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                                >
                                    <i className="fas fa-times"></i>
                                </button>
                            </div>
                        )}

                        <div className="grid grid-cols-5 gap-3">
                            {quickLinks.map((item, index) => (
                                <a key={index} href={item.link} className="group flex flex-col items-center text-center">
                                    <div className={`relative w-full aspect-square rounded-2xl ${item.bgColor} backdrop-blur-md border border-white/10 group-hover:border-white/30 transition-all duration-500 flex items-center justify-center overflow-hidden group-hover:scale-105 group-hover:shadow-lg`}>
                                        <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>
                                        <img src={item.icon} alt={item.name} className="w-3/5 h-3/5 object-contain filter brightness-0 invert opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" />
                                    </div>
                                    <span className="mt-3 text-[11px] text-white/60 group-hover:text-white font-semibold leading-tight transition-colors duration-300 line-clamp-2">
                                        {item.name}
                                    </span>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce opacity-30">
                <span className="text-white text-[10px] uppercase tracking-widest font-bold">Scroll</span>
                <div className="w-5 h-8 border-2 border-white rounded-full flex items-start justify-center p-1">
                    <div className="w-1 h-2 bg-white rounded-full"></div>
                </div>
            </div>


        </section>
    );
};

export default Hero;
