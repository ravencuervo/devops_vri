import { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:1337';

export const useLogros = () => {
    const [logros, setLogros] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLogros = async () => {
            try {
                const response = await fetch(`${API_URL}/api/logros-destacados?populate=*&sort=createdAt:desc`);
                const json = await response.json();

                if (json.data && Array.isArray(json.data)) {
                    const mappedLogros = json.data.map(item => {
                        const attrs = item.attributes || item;

                        // Imagen
                        let imageUrl = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=1920';
                        if (attrs.imagen) {
                            const imgObj = attrs.imagen.data ? attrs.imagen.data.attributes : attrs.imagen;
                            if (imgObj && imgObj.url) {
                                imageUrl = `${API_URL}${imgObj.url}`;
                            }
                        }

                        return {
                            id: item.id,
                            title: attrs.titulo || 'Sin título',
                            description: attrs.descripcion || '',
                            image: imageUrl,
                            featured: attrs.es_destacado ?? true
                        };
                    });

                    setLogros(mappedLogros);
                }
            } catch (err) {
                console.error('Error fetching logros:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchLogros();
    }, []);

    return { logros, loading };
};
