import React, { useEffect, useState } from 'react';

const Preloader = ({ onComplete }) => {
    const [isVisible, setIsVisible] = useState(true);
    const [shouldRender, setShouldRender] = useState(true);

    useEffect(() => {
        // Tiempo mínimo de visualización para que el usuario aprecie el branding
        const timer = setTimeout(() => {
            setIsVisible(false);
            // Esperar a que termine la animación de salida para desmontar
            setTimeout(() => {
                setShouldRender(false);
                if (onComplete) onComplete(); // Notificar que terminó
            }, 800);
        }, 2200);

        return () => clearTimeout(timer);
    }, [onComplete]);

    if (!shouldRender) return null;

    return (
        <div className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center transition-all duration-1000 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0 scale-110 pointer-events-none'}`}
            style={{ background: 'radial-gradient(circle at center, #061266 0%, #030D4F 100%)' }}>

            {/* Luces de fondo decorativas */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-400/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-unap-red/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2 animate-pulse" style={{ animationDelay: '1s' }}></div>

            <div className="relative flex flex-col items-center">
                {/* Contenedor del Logo con Anillo de Carga */}
                <div className="relative mb-10">
                    {/* Anillo de pulso exterior */}
                    <div className="absolute inset-0 rounded-full border-2 border-[#AEDD2B]/30 animate-ping"></div>

                    {/* Anillo de giro suave */}
                    <div className="absolute -inset-6 rounded-full border-t-2 border-b-2 border-sky-400/20 animate-spin" style={{ animationDuration: '3s' }}></div>

                    {/* Logo con efecto de respiración */}
                    <div className="relative z-10 p-4 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 shadow-2xl animate-pulse">
                        <img
                            src="src/assets/logovri.png"
                            alt="VRI Logo"
                            className="h-28 md:h-36 w-auto object-contain"
                        />
                    </div>
                </div>

                {/* Texto Institucional */}
                <div className="text-center overflow-hidden">
                    <h2 className="text-white text-xl md:text-2xl font-black tracking-[0.4em] uppercase mb-3 animate-fade-in-up">
                        Vicerrectorado de Investigación
                    </h2>

                    {/* Barra de progreso elegante */}
                    <div className="w-48 h-1 bg-white/10 mx-auto rounded-full overflow-hidden">
                        <div className="h-full bg-[#AEDD2B] rounded-full animate-progress-loading"></div>
                    </div>

                    <p className="mt-4 text-sky-300/60 text-[10px] font-bold uppercase tracking-[0.2em] animate-pulse">
                        Cargando Experiencia Científica...
                    </p>
                </div>
            </div>

            {/* Crédito inferior */}
            <div className="absolute bottom-10 text-white/20 text-[10px] uppercase tracking-widest font-bold">
                UNA PUNO • {new Date().getFullYear()}
            </div>


        </div>
    );
};

export default Preloader;
