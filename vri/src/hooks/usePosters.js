import { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:1337';

export const usePosters = () => {
    const [posters, setPosters] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosters = async () => {
            try {
                const response = await fetch(`${API_URL}/api/posters?populate=*&sort=createdAt:desc`);
                const json = await response.json();

                if (json.data && Array.isArray(json.data)) {
                    const mappedPosters = json.data.map(item => {
                        const attrs = item.attributes || item;

                        // Imagen
                        let imageUrl = 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=800';
                        if (attrs.imagen) {
                            const imgObj = attrs.imagen.data ? attrs.imagen.data.attributes : attrs.imagen;
                            if (imgObj && imgObj.url) {
                                imageUrl = `${API_URL}${imgObj.url}`;
                            }
                        }

                        return {
                            id: item.id,
                            title: attrs.titulo || 'Sin título',
                            author: attrs.autor || 'Investigador VRI',
                            facultad: attrs.facultad || 'UNAP',
                            evento: attrs.evento || 'Evento Institucional',
                            puesto: attrs.puesto || 'Poster Destacado',
                            date: attrs.anio || '2024',
                            image: imageUrl,
                            category: attrs.categoria || 'General'
                        };
                    });

                    setPosters(mappedPosters);
                }
            } catch (err) {
                console.error('Error fetching posters:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchPosters();
    }, []);

    return { posters, loading };
};
