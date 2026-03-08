import React, { useEffect } from 'react';
import { useEquipo } from '../hooks/useEquipo';

// Componente de Tarjeta Moderna con Foto al Final
const ModernTeamCard = ({ title, firstName, lastName, role, colorClass = "bg-[#02416D]", image }) => (
    <div className="card-border-container w-[280px] flex-shrink-0 group">
        {/* Border Glow Animation */}
        <div className="card-border-glow animate-border-spin group-hover:duration-700"></div>

        {/* Main Card Content */}
        <div className={`relative w-full ${colorClass} rounded-[2rem] overflow-hidden shadow-lg transition-all duration-700 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] cursor-pointer z-10`}>
            {/* Imagen Vertical con Zoom en Hover - Original Oscuro */}
            <div className="relative h-[420px] overflow-hidden bg-[#0a1128]">
                {image ? (
                    <img
                        src={image}
                        alt={`${firstName} ${lastName}`}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 group-hover:rotate-1"
                    />
                ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-white/10">
                        <i className="fas fa-user-circle text-8xl mb-4 group-hover:scale-110 transition-transform duration-700"></i>
                        <span className="text-[10px] font-black tracking-[0.3em] uppercase">Investigador</span>
                    </div>
                )}

                {/* Overlay Gradient Premium (Original Oscuro para contraste) */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-90 group-hover:opacity-80 transition-opacity duration-500"></div>

                {/* Título (GRADO) - AHORA MÁS VISIBLE - IZQUIERDA */}
                <div className="absolute top-6 left-6 transform group-hover:-translate-y-1 transition-transform duration-500">
                    <span className="px-5 py-2 rounded-full bg-[#AEDD2B] text-[#02416D] font-black text-xs uppercase tracking-[0.2em] shadow-[0_10px_20px_rgba(174,221,43,0.3)] border border-white/20">
                        {title}
                    </span>
                </div>

                {/* Texto sobre la imagen (IZQUIERDA) */}
                <div className="absolute bottom-8 left-8 right-8 z-10 text-left transform group-hover:translate-x-2 transition-all duration-500">
                    <div className="mb-3 overflow-hidden">
                        <h3 className="text-2xl font-black text-white leading-tight tracking-tight">
                            <span className="block transform translate-y-0 group-hover:-translate-y-1 transition-transform duration-500">{firstName}</span>
                            <span className="text-[#AEDD2B] block transform translate-y-0 group-hover:translate-y-1 transition-transform duration-500 opacity-90">{lastName}</span>
                        </h3>
                    </div>

                    <div className="flex flex-col items-start gap-2">
                        <div className="w-12 h-0.5 bg-gradient-to-r from-[#AEDD2B] to-transparent group-hover:w-24 transition-all duration-700"></div>
                        <p className="text-white/70 font-bold text-[10px] uppercase tracking-[0.25em]">
                            {role}
                        </p>
                    </div>
                </div>
            </div>

            {/* Efecto de Escaneo de Brillo al pasar el cursor */}
            <div className="absolute -inset-full h-full w-1/2 z-20 block transform -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:animate-shine pointer-events-none"></div>
        </div>
    </div>
);

// Sección de Oficina Mejorada con Jerarquía (Jefe arriba)
const OfficeSection = ({ title, description, members = [], icon, accentColor = "text-[#030D4F]", bgColor = "bg-white" }) => {
    // Estandarización: Fondo Verde Lima, Icono Azul Institucional
    const iconBgClass = 'bg-[#AEDD2B]';
    const iconColorClass = 'text-[#030D4F]';

    const leader = members.length > 0 ? members[0] : null;
    const staff = members.length > 1 ? members.slice(1) : [];

    return (
        <div className="mb-20 last:mb-0">
            {/* Header de Sección Premium */}
            <div className={`${bgColor} rounded-[3rem] p-8 md:p-10 shadow-xl mb-12 relative overflow-hidden border border-gray-100/50 group/office`}>
                {/* Decoración de fondo mejorada */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-gray-50 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-[#AEDD2B]/5 transition-colors duration-500"></div>

                <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                    {/* Contenedor del Icono con Contraste Garantizado */}
                    <div className={`w-20 h-20 rounded-[1.5rem] ${iconBgClass} shadow-[0_15px_30px_rgba(3,13,79,0.15)] flex items-center justify-center ${iconColorClass} text-3xl flex-shrink-0 transform group-hover:rotate-6 group-hover:scale-105 transition-all duration-500 border border-white/10`}>
                        <i className={`fas ${icon}`}></i>
                    </div>

                    <div className="flex-1 text-center md:text-left">
                        <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2">
                            <h3 className="text-3xl font-black text-[#030D4F] tracking-tight">{title}</h3>
                            <span className="hidden md:block w-2 h-2 rounded-full bg-[#AEDD2B]"></span>
                        </div>
                        <p className="text-gray-500 text-base leading-relaxed max-w-3xl font-medium">{description}</p>
                    </div>
                </div>
            </div>

            {/* Jefe de Oficina */}
            {leader && (
                <div className="flex justify-center mb-8 text-center animate-fade-in">
                    <ModernTeamCard
                        title={leader.title}
                        firstName={leader.firstName}
                        lastName={leader.lastName}
                        role={leader.role}
                        colorClass={leader.color}
                        image={leader.image}
                    />
                </div>
            )}

            {/* Grid de Miembros */}
            {staff.length > 0 && (
                <div className="flex flex-wrap justify-center gap-4 px-4">
                    {staff.map((member, idx) => (
                        <ModernTeamCard
                            key={idx}
                            title={member.title}
                            firstName={member.firstName}
                            lastName={member.lastName}
                            role={member.role}
                            colorClass={member.color}
                            image={member.image}
                        />
                    ))}
                </div>
            )}

            {/* Mensaje de Actualización Reestilizado */}
            {members.length === 0 && (
                <div className="text-center py-12 bg-gray-50/50 rounded-[3rem] border-2 border-dashed border-gray-100 flex flex-col items-center gap-3 animate-fade-in mx-4">
                    <i className="fas fa-users-cog text-gray-200 text-3xl"></i>
                    <span className="text-gray-400 text-[10px] font-black uppercase tracking-[0.3em]">
                        Personal en proceso de actualización
                    </span>
                </div>
            )}
        </div>
    );
};

const AboutPage = () => {
    const { loading, getMembersByOffice, vicerrector } = useEquipo();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 border-4 border-[#030D4F] border-t-[#AEDD2B] rounded-full animate-spin"></div>
                    <p className="text-[#030D4F] font-black uppercase tracking-[0.2em] text-xs animate-pulse">Cargando Equipo...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="pb-24 bg-white min-h-screen font-sans">

            {/* Header Ultra Moderno con Imagen y Superposición Azul - Recto */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-[#030D4F] mb-12">
                {/* Background Image & Overlay */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="src/assets/logos.png"
                        alt="Nuestro Equipo Background"
                        className="w-full h-full object-cover opacity-100 transition-opacity duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#030D4F]/90 via-[#030D4F]/60 to-[#030D4F]/30"></div>
                </div>

                {/* Decorative Celeste Glows */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-400/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 z-10"></div>
                <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-sky-300/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 z-10"></div>

                <div className="container mx-auto px-4 relative z-20 text-center">
                    <div className="inline-block mb-4 animate-fade-in">
                        <span className="py-1.5 px-5 rounded-full bg-white/10 border border-white/20 text-white font-black tracking-[0.3em] uppercase text-[10px] backdrop-blur-md">
                            Vicerrectorado de Investigación
                        </span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-none animate-modern-reveal">
                        Nuestro <span className="text-[#AEDD2B]">Equipo</span>
                    </h1>

                    <div className="flex items-center justify-center gap-4 mb-8">
                        <div className="h-px w-16 bg-white/20"></div>
                        <i className="fas fa-users text-[#AEDD2B] text-2xl"></i>
                        <div className="h-px w-16 bg-white/20"></div>
                    </div>

                    <p className="text-blue-50 text-xl md:text-2xl max-w-3xl mx-auto font-light leading-relaxed animate-slide-up">
                        El talento humano que impulsa la <span className="text-[#AEDD2B] font-semibold">excelencia científica</span> y el <span className="text-[#AEDD2B] font-semibold">desarrollo tecnológico</span> institucional.
                    </p>
                </div>
            </section>

            <div className="container mx-auto px-4 max-w-7xl">

                {/* 01. NIVEL DIRECTIVO */}
                <section className="mb-24">
                    <div className="text-center mb-12 relative">
                        <span className="text-7xl font-black text-[#030D4F]/5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 select-none">01</span>
                        <div className="inline-block relative">
                            <h2 className="text-3xl md:text-4xl font-bold text-[#030D4F] relative z-10 mb-2">
                                Nivel Directivo
                            </h2>
                            <div className="h-1.5 w-20 bg-gradient-to-r from-[#AEDD2B] to-[#030D4F] mx-auto rounded-full"></div>
                        </div>
                    </div>

                    {/* Vicerrector - Destacado (Fino) */}
                    <div className="mb-12 flex justify-center">
                        {/* Vicerrector - Destacado (Fino) */}
                        <div className="mb-12 flex justify-center">
                            {vicerrector ? (
                                <ModernTeamCard
                                    title={vicerrector.title}
                                    firstName={vicerrector.firstName}
                                    lastName={vicerrector.lastName}
                                    role={vicerrector.role}
                                    colorClass={vicerrector.color}
                                    image={vicerrector.image}
                                />
                            ) : (
                                <div className="py-12 text-gray-400 italic">Información directiva no disponible</div>
                            )}
                        </div>
                    </div>

                    <OfficeSection
                        title="Área de TI"
                        description="Soporte Tecnológico Integral para la infraestructura digital y servicios web del Vicerrectorado de Investigación."
                        icon="fa-network-wired"
                        members={getMembersByOffice('TI')}
                        accentColor="text-[#030D4F]"
                    />
                </section>

                {/* 02. DIRECCIÓN DE INSTITUTOS */}
                <section className="mb-24">
                    <div className="text-center mb-12 relative">
                        <span className="text-7xl font-black text-[#030D4F]/5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 select-none">02</span>
                        <div className="inline-block relative">
                            <h2 className="text-3xl md:text-4xl font-bold text-[#030D4F] relative z-10 mb-2">
                                Instituto de Investigación
                            </h2>
                            <div className="h-1.5 w-24 bg-gradient-to-r from-[#030D4F] to-[#051675] mx-auto rounded-full"></div>
                        </div>
                    </div>

                    {/* Director DII Centrado */}
                    <div className="flex justify-center mb-10">
                        {getMembersByOffice('Instituto Investigación').length > 0 && (
                            <ModernTeamCard
                                title={getMembersByOffice('Instituto Investigación')[0].title}
                                firstName={getMembersByOffice('Instituto Investigación')[0].firstName}
                                lastName={getMembersByOffice('Instituto Investigación')[0].lastName}
                                role={getMembersByOffice('Instituto Investigación')[0].role}
                                colorClass={getMembersByOffice('Instituto Investigación')[0].color}
                                image={getMembersByOffice('Instituto Investigación')[0].image}
                            />
                        )}
                    </div>

                    {/* Resto del equipo DII - Juntos */}
                    <div className="flex flex-wrap justify-center gap-2">
                        {getMembersByOffice('Instituto Investigación').slice(1).map((member, i) => (
                            <ModernTeamCard
                                key={i}
                                title={member.title}
                                firstName={member.firstName}
                                lastName={member.lastName}
                                role={member.role}
                                colorClass={member.color}
                                image={member.image}
                            />
                        ))}
                    </div>
                </section>

                {/* 03. OFICINAS DE PRODUCCIÓN CIENTÍFICA */}
                <section>
                    <div className="text-center mb-16 relative">
                        <span className="text-7xl font-black text-[#030D4F]/5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 select-none">03</span>
                        <div className="inline-block relative">
                            <h2 className="text-3xl md:text-4xl font-bold text-[#030D4F] relative z-10 mb-2">
                                Producción Científica
                            </h2>
                            <div className="h-1.5 w-28 bg-gradient-to-r from-[#AEDD2B] to-[#030D4F] mx-auto rounded-full"></div>
                        </div>
                    </div>

                    <OfficeSection
                        title="Oficina de Repositorio Institucional"
                        description="Equipo encargado de gestionar la visibilidad, preservación y acceso a la producción académica y científica de la universidad."
                        icon="fa-database"
                        members={getMembersByOffice('Repositorio')}
                        accentColor="text-[#AEDD2B]"
                    />

                    <OfficeSection
                        title="Oficina de Revistas de Investigación"
                        description="Responsables de la edición, indización y publicación de las revistas científicas de la UNAP."
                        icon="fa-journal-whills"
                        members={getMembersByOffice('Revistas')}
                        accentColor="text-[#066699]"
                    />

                    <OfficeSection
                        title="Oficina de Gestión de la Investigación (PGI)"
                        description="Administración de concursos, seguimiento de proyectos y gestión financiera de la investigación."
                        icon="fa-project-diagram"
                        members={getMembersByOffice('Gestión Investigación')}
                        accentColor="text-[#0A5483]"
                    />

                    <OfficeSection
                        title="Comité Institucional de Ética"
                        description="Vigilancia de los estándares éticos y bioéticos en el desarrollo de las investigaciones."
                        icon="fa-balance-scale-left"
                        members={getMembersByOffice('Ética')}
                        accentColor="text-[#02416D]"
                    />
                </section>

            </div>
        </div>
    );
};

export default AboutPage;
