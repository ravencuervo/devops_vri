import { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:1337';

export const useConvocatorias = () => {
    const [convocatorias, setConvocatorias] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchConvocatorias = async () => {
            try {
                const response = await fetch(`${API_URL}/api/convocatorias?populate=*&sort=fecha_publicacion:desc`);
                const json = await response.json();

                if (json.data && Array.isArray(json.data)) {
                    const mappedConvocatorias = json.data.map(item => {
                        // Strapi v5 maneja los datos directamente o bajo attributes dependiendo del middleware
                        const attrs = item.attributes || item;

                        // Validar URL de postulación (asegurarse que tenga protocolo)
                        let rawUrl = attrs.enlace_postulacion || '';
                        if (rawUrl && !rawUrl.startsWith('http')) {
                            rawUrl = `https://${rawUrl}`;
                        }

                        // PROCESAMIENTO DE DESCRIPCION (Blocks de Strapi v5 a String)
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

                        // Archivo de Bases
                        let basesUrl = '#';
                        if (attrs.bases) {
                            const fileObj = attrs.bases.data ? attrs.bases.data.attributes : attrs.bases;
                            if (fileObj && fileObj.url) {
                                basesUrl = `${API_URL}${fileObj.url}`;
                            }
                        }

                        return {
                            id: item.id,
                            title: attrs.titulo || 'Sin título',
                            description: rawDescription,
                            closeDate: attrs.fecha_cierre ? new Date(attrs.fecha_cierre).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' }) : 'No definida',
                            publishDate: attrs.fecha_publicacion ? new Date(attrs.fecha_publicacion).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' }) : '',
                            type: attrs.tipo || 'General',
                            category: attrs.categoria || 'Todos',
                            state: attrs.estado || 'Activa',
                            budget: attrs.presupuesto || 'No especificado',
                            url: rawUrl || '#',
                            basesUrl: basesUrl
                        };
                    });

                    console.log('Convocatorias mapeadas con links:', mappedConvocatorias.map(c => ({ t: c.title, u: c.url })));
                    setConvocatorias(mappedConvocatorias);
                }
            } catch (err) {
                console.error('Error fetching convocatorias:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchConvocatorias();
    }, []);

    return { convocatorias, loading };
};
