import { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:1337';

export const useNoticias = (limit = 10) => {
    const [noticias, setNoticias] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await fetch(`${API_URL}/api/noticias?populate[0]=imagen_principal&populate[1]=galeria&populate[2]=pdf&populate[3]=pdf.archivo&sort=createdAt:desc&pagination[limit]=${limit}`);
                const json = await response.json();

                if (json.data && Array.isArray(json.data)) {
                    const mappedNews = json.data.map(item => {
                        const data = item.attributes || item;

                        const titulo = data.titulo || data.Titulo || 'Sin título';
                        const categoria = data.categoria || data.Categoria || 'NOTICIA';
                        const fechaValue = data.fecha || data.Fecha || data.publishedAt || data.createdAt || '';
                        const resumenValue = data.resumen || data.Resumen || '';

                        // PROCESAMIENTO DE CONTENIDO (Blocks de Strapi v5 a String)
                        let rawContent = '';
                        if (typeof data.contenido === 'string') {
                            rawContent = data.contenido;
                        } else if (Array.isArray(data.contenido)) {
                            // Si es un array de bloques (Strapi v5), extraemos el texto
                            rawContent = data.contenido.map(block => {
                                if (block.children && Array.isArray(block.children)) {
                                    return block.children.map(child => child.text).join(' ');
                                }
                                return '';
                            }).join('\n\n');
                        }

                        // Imagen Principal
                        let imageUrl = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=800';
                        const imgObj = data.imagen_principal;
                        if (imgObj) {
                            const path = imgObj.url || (imgObj.data && imgObj.data.attributes ? imgObj.data.attributes.url : null);
                            if (path) imageUrl = `${API_URL}${path}`;
                        }

                        // Galería
                        let galeria = [];
                        if (data.galeria) {
                            const items = Array.isArray(data.galeria) ? data.galeria : data.galeria.data;
                            if (Array.isArray(items)) {
                                galeria = items.map(img => {
                                    const path = img.url || img.attributes?.url;
                                    return path ? `${API_URL}${path}` : null;
                                }).filter(Boolean);
                            }
                        }

                        return {
                            id: item.id,
                            title: titulo,
                            category: categoria,
                            date: fechaValue ? new Date(fechaValue).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' }) : '',
                            rawDate: fechaValue,
                            excerpt: resumenValue,
                            content: rawContent, // Ahora garantizamos que sea un string
                            image: imageUrl,
                            images: galeria.length > 0 ? galeria : [imageUrl],
                            videoUrl: data.video_url || '',
                            badgeColor: categoria.toLowerCase().includes('institucional') ? 'bg-unap-green' : 'bg-unap-blue',
                            url: `#noticias/${item.id}`,
                            pdfs: (data.pdf && Array.isArray(data.pdf)) ? data.pdf.map(doc => {
                                if (!doc.archivo) return null;
                                const fileUrl = doc.archivo.url || (doc.archivo.data?.attributes?.url);
                                return fileUrl ? {
                                    title: doc.nombre || 'Documento PDF',
                                    url: `${API_URL}${fileUrl}`
                                } : null;
                            }).filter(Boolean) : []
                        };
                    });

                    const sorted = mappedNews.sort((a, b) => new Date(b.rawDate) - new Date(a.rawDate));
                    setNoticias(sorted);
                }
            } catch (err) {
                console.error('Error fetching news:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, [limit]);

    return { noticias, loading };
};
