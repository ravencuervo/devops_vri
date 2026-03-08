import React, { useEffect } from 'react';

const SupportModal = ({ isOpen, onClose }) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop con Blur */}
            <div
                className="absolute inset-0 bg-[#020817]/80 backdrop-blur-md transition-opacity duration-300"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="relative bg-white w-full max-w-lg rounded-[2.5rem] overflow-hidden shadow-2xl animate-modern-reveal border border-gray-100">
                {/* Header Decorativo */}
                <div className="bg-[#030D4F] p-8 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
                    <div className="relative z-10 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-[#AEDD2B]">
                            <i className="fas fa-headset text-2xl"></i>
                        </div>
                        <div>
                            <h3 className="text-2xl font-black tracking-tight">Centro de Soporte</h3>
                            <p className="text-white/60 text-xs uppercase tracking-widest font-bold">Investigadores VRI</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all border border-white/10 z-20"
                    >
                        <i className="fas fa-times"></i>
                    </button>
                </div>

                {/* Body con Información */}
                <div className="p-8 space-y-6">
                    {/* Imagen Referencial */}
                    <div className="relative h-40 rounded-3xl overflow-hidden border border-gray-100 shadow-inner group">
                        <img
                            src="https://scontent.flim14-1.fna.fbcdn.net/v/t39.30808-6/473634371_122222314364067813_5604695230703763788_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=13d280&_nc_eui2=AeGqn1-hK19l0Q1IjBFIvp9IBJo7H17rlfgEmjsfXuuV-Mmrp5azDVWL8tRG5Njfs8eDB9Ih9nuTcTAlIgVuqKZJ&_nc_ohc=lkHaYHx6WvoQ7kNvwHzHJNz&_nc_oc=Adm1wsiYkaQ5lT6EMuply19Z8Cof6lpqG8V8AJ70h_Fb1cMSJuZd6rdSxJZ_6ry8xDQ&_nc_zt=23&_nc_ht=scontent.flim14-1.fna&_nc_gid=AujNVQqw43eMS-SEYUZFLQ&_nc_ss=8&oh=00_AfzfuocnKuYH84aoQg32uOPWNnw77W58tBO-qx7zcz6ekg&oe=69B162CF"
                            alt="Soporte VRI"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#030D4F]/60 to-transparent"></div>
                        <div className="absolute bottom-4 left-4 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-[#AEDD2B] animate-pulse"></span>
                            <span className="text-[10px] font-black text-white uppercase tracking-widest bg-black/20 backdrop-blur-md px-2 py-1 rounded-md">Atención en Línea</span>
                        </div>
                    </div>

                    <p className="text-gray-500 text-sm leading-relaxed">
                        Si tienes consultas técnicas, necesitas reportar correcciones en el portal o requieres asistencia con procesos de investigación, utiliza nuestros canales oficiales:
                    </p>

                    <div className="space-y-6">
                        {/* Correo */}
                        <div className="flex items-start gap-4 group">
                            <div className="w-12 h-12 rounded-xl bg-blue-50 text-unap-blue flex items-center justify-center group-hover:bg-unap-blue group-hover:text-white transition-all shadow-sm">
                                <i className="fas fa-envelope"></i>
                            </div>
                            <div>
                                <span className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Correo Electrónico</span>
                                <a href="mailto:vicerrectorado.investigacion@unap.edu.pe" className="text-gray-900 font-bold hover:text-unap-blue transition-colors">
                                    vinvestigacion@unap.edu.pe
                                </a>
                            </div>
                        </div>

                        {/* Teléfono */}
                        <div className="flex items-start gap-4 group">
                            <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center group-hover:bg-orange-600 group-hover:text-white transition-all shadow-sm">
                                <i className="fas fa-phone-alt"></i>
                            </div>
                            <div>
                                <span className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Teléfono / WhatsApp</span>
                                <div className="flex flex-col gap-2">
                                    <p className="text-gray-900 font-bold">
                                        +51 (051) 363543 <span className="text-gray-400 font-medium ml-2">(Anexo 123)</span>
                                    </p>
                                    <a
                                        href="https://wa.me/51951551122"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-green-600 font-bold text-xs hover:text-green-700 transition-colors mt-1"
                                    >
                                        <i className="fab fa-whatsapp text-lg"></i>
                                        Enviar Mensaje Directo
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Ubicación */}
                        <div className="flex items-start gap-4 group">
                            <div className="w-12 h-12 rounded-xl bg-green-50 text-green-600 flex items-center justify-center group-hover:bg-green-600 group-hover:text-white transition-all shadow-sm">
                                <i className="fas fa-location-dot"></i>
                            </div>
                            <div>
                                <span className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Ubicación Física</span>
                                <a
                                    href="https://maps.app.goo.gl/74MyFbgLLdhWcaHG7"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block group/loc"
                                >
                                    <p className="text-gray-900 font-bold leading-snug group-hover/loc:text-unap-blue transition-colors">
                                        Ciudad Universitaria - Edificio Administrativo, 2do Piso.
                                        <span className="block text-gray-400 font-medium mt-1 italic text-[11px]">Av. Sesquicentenario s/n - Puno, Perú.</span>
                                    </p>
                                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-unap-blue mt-2 uppercase tracking-widest opacity-0 group-hover/loc:opacity-100 transition-all">
                                        <i className="fas fa-route"></i> Cómo llegar
                                    </span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SupportModal;
