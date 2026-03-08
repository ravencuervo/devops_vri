import { useState, useEffect } from 'react';

export const useAvisos = () => {
    const [aviso, setAviso] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAviso = async () => {
            try {
                // Fetch the active aviso
                const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:1337';
                const response = await fetch(`${API_URL}/api/avisos?filters[activo][$eq]=true&populate=imagen&sort=publishedAt:desc&pagination[limit]=1`);

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();

                if (data.data && data.data.length > 0) {
                    const attributes = data.data[0].attributes || data.data[0];
                    let imageUrl = null;
                    const imgObj = attributes.imagen;
                    if (imgObj) {
                        const path = imgObj.url || (imgObj.data && imgObj.data.attributes ? imgObj.data.attributes.url : null);
                        if (path) imageUrl = `${API_URL}${path}`;
                    }

                    setAviso({
                        id: data.data[0].id,
                        titulo: attributes.titulo,
                        descripcion: attributes.descripcion,
                        imagen: imageUrl,
                        enlace: attributes.enlace,
                        textoBoton: attributes.textoBoton || 'Ver más'
                    });
                }
            } catch (error) {
                console.error('Error fetching avisos:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAviso();
    }, []);

    return { aviso, loading };
};
