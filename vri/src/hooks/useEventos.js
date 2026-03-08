import { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:1337';

export const useEventos = () => {
    const [eventos, setEventos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEventos = async () => {
            try {
                const response = await fetch(`${API_URL}/api/eventos?populate=*&sort=fecha:desc`);
                const json = await response.json();

                if (json.data && Array.isArray(json.data)) {
                    const mappedEventos = json.data.map(item => {
                        const attrs = item.attributes || item;

                        // Procesar descripción (Blocks a String)
                        let rawDescription = '';
                        if (typeof attrs.descripcion === 'string') {
                            rawDescription = attrs.descripcion;
                        } else if (Array.isArray(attrs.descripcion)) {
                            rawDescription = attrs.descripcion.map(block => {
                                if (block.children && Array.isArray(block.children)) {
                                    return block.children.map(child => child.text).join(' ');
                                }
                                return '';
                            }).join('\n\n');
                        }

                        // Banner/Imagen
                        let bannerUrl = 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=1200';
                        if (attrs.banner) {
                            const imgObj = attrs.banner.data ? attrs.banner.data.attributes : attrs.banner;
                            if (imgObj && imgObj.url) {
                                bannerUrl = `${API_URL}${imgObj.url}`;
                            }
                        }

                        // Formatear Fecha
                        const dateObj = attrs.fecha ? new Date(attrs.fecha) : new Date();
                        const day = dateObj.getDate().toString().padStart(2, '0');
                        const month = dateObj.toLocaleString('es-ES', { month: 'short' }).toUpperCase().replace('.', '');
                        const fullDate = dateObj.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' });
                        const time = dateObj.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });

                        // Links externos
                        let regUrl = attrs.link_registro || '#';
                        if (regUrl !== '#' && !regUrl.startsWith('http')) regUrl = `https://${regUrl}`;

                        let intUrl = attrs.link_interes || '#';
                        if (intUrl !== '#' && !intUrl.startsWith('http')) intUrl = `https://${intUrl}`;

                        return {
                            id: item.id,
                            actividad: attrs.titulo || 'Sin título',
                            desc: rawDescription,
                            fecha: fullDate,
                            day,
                            month,
                            hora: time,
                            lugar: attrs.lugar || 'Por confirmar',
                            ponente: attrs.ponente || 'VRI UNAP',
                            banner: bannerUrl,
                            linkRegistro: regUrl,
                            linkInteres: intUrl,
                            tipo: attrs.tipo || 'Evento',
                            tags: attrs.etiquetas ? attrs.etiquetas.split(',').map(tag => tag.trim()) : [],
                            state: attrs.estado || 'Próximo'
                        };
                    });

                    setEventos(mappedEventos);
                }
            } catch (err) {
                console.error('Error fetching eventos:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchEventos();
    }, []);

    return { eventos, loading };
};
