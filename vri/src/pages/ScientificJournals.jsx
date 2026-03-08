import React, { useEffect, useState, useRef } from 'react';
import { useLogros } from '../hooks/useLogros';

// Reusable Stat Counter Component (Similar to InstitutionalStats)
const StatCounter = ({ value, duration = 2000 }) => {
    const [count, setCount] = useState(0);
    const countRef = useRef(null);
    const [hasStarted, setHasStarted] = useState(false);

    const numericPart = value.replace(/[^0-9]/g, '');
    const suffix = value.replace(/[0-9]/g, '');
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

    return (
        <span ref={countRef}>
            {count.toLocaleString()}{suffix}
        </span>
    );
};

const ScientificJournals = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [currentSlide, setCurrentSlide] = useState(0);
    const { logros, loading: loadingLogros } = useLogros();

    useEffect(() => {
        if (logros.length > 0) {
            const timer = setInterval(() => {
                setCurrentSlide((prev) => (prev + 1) % logros.length);
            }, 6000);
            return () => clearInterval(timer);
        }
    }, [logros.length]);

    const stats = [
        { label: 'Tesis Sustentadas', val: '14000', icon: 'fa-graduation-cap' },
        { label: 'Estudiantes', val: '18000', icon: 'fa-users' },
        { label: 'Sustentaciones', val: '1538', icon: 'fa-scroll' },
        { label: 'Proyectos Pregrado', val: '463', icon: 'fa-project-diagram' },
        { label: 'Proyectos Aprobados', val: '7200', icon: 'fa-check-double' },
        { label: 'Docentes Investigadores', val: '10000', icon: 'fa-user-tie' },
    ];

    return (
        <div className="bg-white min-h-screen font-sans">
            {/* HERO SECTION - Con Imagen y Superposición Azul */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-[#030D4F]">
                {/* Background Image & Overlay */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="src/assets/portada_revistas.jpg"
                        alt="Revistas Científicas Background"
                        className="w-full h-full object-cover opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#030D4F]/95 to-[#030D4F]/40"></div>
                </div>

                {/* Decorative Celeste Glows */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-400/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 z-10"></div>
                <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-sky-300/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 z-10"></div>

                <div className="container mx-auto px-4 relative z-20">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full mb-8 animate-fade-in border border-white/10">
                            <i className="fas fa-book-open text-[#AEDD2B]"></i>
                            <span className="text-white text-xs font-bold uppercase tracking-widest">Vicerrectorado de Investigación</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight animate-modern-reveal">
                            Revistas <span className="text-[#AEDD2B]">Científicas</span>
                        </h1>

                        <p className="text-lg md:text-xl text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed animate-slide-up">
                            Promoviendo la excelencia en la investigación y difusión del conocimiento científico institucional.
                        </p>
                    </div>
                </div>
            </section>

            {/* ABOUT SECTION - Tres Columnas */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {[
                            {
                                icon: "fa-history",
                                title: "Nuestra Historia",
                                text: "El Vicerrectorado de Investigación ha sido pilar fundamental en la formación académica, promoviendo el desarrollo institucional con excelencia y compromiso."
                            },
                            {
                                icon: "fa-bullseye",
                                title: "Nuestra Misión",
                                text: "Impulsar la generación del conocimiento científico y tecnológico, fortaleciendo las capacidades investigativas de nuestra comunidad universitaria."
                            },
                            {
                                icon: "fa-handshake",
                                title: "Nuestro Compromiso",
                                text: "Trabajar con transparencia para contribuir al desarrollo sostenible y bienestar de la comunidad, impulsando la innovación constante."
                            }
                        ].map((item, idx) => (
                            <div key={idx} className="text-center group">
                                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[#030D4F] to-[#061266] flex items-center justify-center text-white text-3xl group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                    <i className={`fas ${item.icon}`}></i>
                                </div>
                                <h3 className="text-2xl font-bold text-[#030D4F] mb-4">{item.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{item.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* STATS SECTION - Moderno y Limpio */}
            <section className="py-20 bg-gradient-to-br from-[#030D4F] to-[#071f9c] relative overflow-hidden">
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(rgba(14, 165, 233, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(14, 165, 233, 0.1) 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Impacto en Cifras</h2>
                        <div className="w-20 h-1.5 bg-[#AEDD2B] mx-auto rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
                        {stats.map((stat, idx) => (
                            <div key={idx} className="text-center group">
                                <div className="mb-4 text-sky-400 text-4xl group-hover:scale-125 transition-transform duration-300 drop-shadow-[0_0_10px_rgba(56,189,248,0.3)]">
                                    <i className={`fas ${stat.icon}`}></i>
                                </div>
                                <div className="text-4xl md:text-5xl font-black text-white mb-2">
                                    <StatCounter value={stat.val} />
                                </div>
                                <div className="text-white/60 text-xs uppercase tracking-wider font-semibold">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CAROUSEL SECTION - Destacado (DINÁMICO DESDE STRAPI) */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-5xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold text-[#030D4F] mb-4">Logros Destacados</h2>
                            <p className="text-gray-600 max-w-2xl mx-auto">
                                Hitos que marcan nuestra trayectoria de excelencia en investigación y desarrollo académico gestionados desde el VRI.
                            </p>
                        </div>

                        {loadingLogros ? (
                            <div className="h-[400px] bg-gray-100 animate-pulse rounded-3xl flex items-center justify-center">
                                <p className="text-gray-400 font-bold tracking-widest uppercase">Cargando logros científicos...</p>
                            </div>
                        ) : logros.length > 0 ? (
                            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                                <div className="aspect-[16/9] relative">
                                    {logros.map((logro, idx) => (
                                        <div
                                            key={logro.id}
                                            className={`absolute inset-0 transition-opacity duration-1000 ${idx === currentSlide ? 'opacity-100' : 'opacity-0'}`}
                                        >
                                            <img src={logro.image} alt={logro.title} className="w-full h-full object-cover" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                                            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                                                <span className="inline-block bg-[#AEDD2B] text-[#030D4F] px-4 py-2 rounded-lg text-sm font-black uppercase mb-4">
                                                    Logro Científico
                                                </span>
                                                <h3 className="text-2xl md:text-4xl font-bold text-white mb-2">
                                                    {logro.title}
                                                </h3>
                                                <p className="text-white/80 max-w-2xl">
                                                    {logro.description}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Carousel Controls */}
                                <div className="absolute bottom-8 right-8 flex gap-2">
                                    {logros.map((_, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setCurrentSlide(idx)}
                                            className={`h-2 rounded-full transition-all duration-300 ${idx === currentSlide ? 'w-12 bg-[#AEDD2B]' : 'w-2 bg-white/50 hover:bg-white/80'}`}
                                        ></button>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="h-[200px] border-2 border-dashed border-gray-200 rounded-3xl flex items-center justify-center italic text-gray-400">
                                No se han registrado logros aún.
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* PORTAL PREVIEW SECTION - Iframe Estilizado */}
            <section className="py-24 bg-white relative overflow-hidden">
                <div className="container mx-auto px-2 md:px-8 max-w-full">
                    <div className="max-w-[1600px] w-full mx-auto">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                            <div className="reveal">
                                <span className="inline-block px-4 py-2 bg-blue-50 text-unap-blue rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-4">
                                    Catálogo Oficial
                                </span>
                                <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">
                                    Explora el Portal de <br />
                                    <span className="text-unap-blue">Revistas Científicas</span>
                                </h2>
                            </div>
                            <div className="reveal flex flex-col sm:flex-row gap-4" style={{ transitionDelay: '0.1s' }}>
                                <a
                                    href="https://revistas.unap.edu.pe/portal/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center gap-3 bg-[#030D4F] text-white px-8 py-4 rounded-2xl font-bold hover:bg-[#051675] shadow-xl shadow-blue-900/10 transition-all group"
                                >
                                    Portal de Revistas
                                    <i className="fas fa-external-link-alt group-hover:rotate-12 transition-transform"></i>
                                </a>
                                <a
                                    href="https://revistas.unap.edu.pe/epg/index.php/investigaciones/index"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center gap-3 bg-[#AEDD2B] text-[#030D4F] px-8 py-4 rounded-2xl font-bold hover:bg-[#9cc727] shadow-xl shadow-[#AEDD2B]/20 transition-all group"
                                >
                                    Revistas EPG
                                    <i className="fas fa-external-link-alt group-hover:rotate-12 transition-transform"></i>
                                </a>
                            </div>
                        </div>

                        {/* Browser-like Containers Grid for Iframes */}
                        <div className="grid md:grid-cols-2 gap-8">

                            {/* Primer Portal */}
                            <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border border-gray-100 bg-white group/browser reveal" style={{ transitionDelay: '0.2s' }}>
                                {/* Browser Header Bar */}
                                <div className="bg-gray-50 border-b border-gray-100 px-6 py-4 flex items-center justify-between">
                                    <div className="flex gap-2">
                                        <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                        <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                                        <div className="w-3 h-3 rounded-full bg-green-400"></div>
                                    </div>
                                    <div className="flex-1 mx-8">
                                        <div className="bg-white border border-gray-200 rounded-lg px-4 py-1.5 flex items-center gap-3 text-[10px] md:text-xs text-gray-400 overflow-hidden">
                                            <i className="fas fa-lock text-green-500"></i>
                                            <span className="truncate">https://revistas.unap.edu.pe/portal/</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-4 text-gray-300">
                                        <i className="fas fa-share-alt hidden md:block"></i>
                                        <i className="fas fa-plus"></i>
                                    </div>
                                </div>

                                {/* Iframe Content */}
                                <div className="relative h-[600px] md:h-[850px] bg-gray-50">
                                    <iframe
                                        src="https://revistas.unap.edu.pe/portal/"
                                        className="w-full h-full border-0 transform origin-top-left md:scale-100"
                                        title="Portal de Revistas UNAP"
                                        loading="lazy"
                                    ></iframe>

                                    {/* Overlay Gradient to prevent accidental scrolling while navigating the main page */}
                                    <div className="absolute inset-0 pointer-events-none border-[8px] md:border-[12px] border-white/5"></div>
                                </div>
                            </div>

                            {/* Segundo Portal (EPG) */}
                            <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border border-gray-100 bg-white group/browser reveal" style={{ transitionDelay: '0.4s' }}>
                                {/* Browser Header Bar */}
                                <div className="bg-gray-50 border-b border-gray-100 px-6 py-4 flex items-center justify-between">
                                    <div className="flex gap-2">
                                        <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                        <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                                        <div className="w-3 h-3 rounded-full bg-green-400"></div>
                                    </div>
                                    <div className="flex-1 mx-8">
                                        <div className="bg-white border border-gray-200 rounded-lg px-4 py-1.5 flex items-center gap-3 text-[10px] md:text-xs text-gray-400 overflow-hidden">
                                            <i className="fas fa-lock text-green-500"></i>
                                            <span className="truncate">https://revistas.unap.edu.pe/epg/...</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-4 text-gray-300">
                                        <a href="https://revistas.unap.edu.pe/epg/index.php/investigaciones/index" target="_blank" rel="noopener noreferrer" className="hover:text-unap-blue transition-colors">
                                            <i className="fas fa-external-link-alt"></i>
                                        </a>
                                    </div>
                                </div>

                                {/* Iframe Content */}
                                <div className="relative h-[600px] md:h-[850px] bg-gray-50">
                                    <iframe
                                        src="https://revistas.unap.edu.pe/epg/index.php/investigaciones/index"
                                        className="w-full h-full border-0"
                                        title="Portal de Revistas EPG UNAP"
                                        loading="lazy"
                                    ></iframe>

                                    {/* Overlay Gradient */}
                                    <div className="absolute inset-0 pointer-events-none border-[8px] md:border-[12px] border-white/5"></div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>

            {/* PLATFORMS SECTION - Grid Moderno */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-[#030D4F] mb-4">Plataformas de Investigación</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Herramientas digitales para la gestión y difusión de la investigación científica
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                        {[
                            {
                                title: "PGI",
                                subtitle: "Gestión de Investigación",
                                desc: "Sistema integral para la gestión de tesis desde el registro hasta la sustentación",
                                color: "#030D4F",
                                icon: "fa-graduation-cap",
                                link: "https://pgi.vriunap.pe/home"
                            },
                            {
                                title: "CURSOS",
                                subtitle: "Recursos Académicos",
                                desc: "Materiales de referencia y guías metodológicas organizadas por líneas de investigación",
                                color: "#051675",
                                icon: "fa-book-reader",
                                link: "https://vriunap.pe/cursos/"
                            },
                            {
                                title: "REPOSITORIO",
                                subtitle: "Producción Científica",
                                desc: "Archivo digital de tesis aprobadas y producción académica institucional",
                                color: "#071f9c",
                                icon: "fa-database",
                                link: "https://repositorio.unap.edu.pe/home"
                            },
                            {
                                title: "FEDU",
                                subtitle: "Financiamiento",
                                desc: "Fondo Especial de Desarrollo Universitario para proyectos de investigación",
                                color: "#010a3d",
                                icon: "fa-hand-holding-usd",
                                link: "https://vriunap.pe/fedu/"
                            }
                        ].map((platform, idx) => (
                            <div key={idx} className="group relative bg-white rounded-2xl border-2 border-gray-100 hover:border-sky-400 transition-all duration-300 overflow-hidden hover:shadow-xl">
                                <div className="h-2 w-full" style={{ backgroundColor: platform.color }}></div>

                                <div className="p-6">
                                    <div className="w-14 h-14 rounded-xl mb-4 flex items-center justify-center text-white text-2xl group-hover:scale-110 transition-transform duration-300" style={{ backgroundColor: platform.color }}>
                                        <i className={`fas ${platform.icon}`}></i>
                                    </div>

                                    <h3 className="text-2xl font-black mb-1" style={{ color: platform.color }}>{platform.title}</h3>
                                    <p className="text-sm font-semibold text-gray-600 mb-3">{platform.subtitle}</p>
                                    <p className="text-sm text-gray-500 leading-relaxed mb-4">{platform.desc}</p>

                                    <a href={platform.link} target="_blank" rel="noopener noreferrer" className="text-sm font-bold flex items-center gap-2 group-hover:gap-3 transition-all" style={{ color: platform.color }}>
                                        Acceder <i className="fas fa-arrow-right"></i>
                                    </a>
                                </div>

                                <div className="absolute top-0 right-0 w-32 h-32 opacity-5 -mr-8 -mt-8" style={{ backgroundColor: platform.color, borderRadius: '50%' }}></div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

        </div >
    );
};

export default ScientificJournals;
