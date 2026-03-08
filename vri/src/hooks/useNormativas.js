import { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:1337';

export const useNormativas = (tipo = 'directiva') => {
    const [normativas, setNormativas] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNormativas = async () => {
            setLoading(true);
            try {
                // Strapi v5 query with filter and media populate
                const response = await fetch(
                    `${API_URL}/api/normativas?status=published&filters[tipo][$eq]=${tipo}&populate=*&pagination[limit]=100`
                );

                const json = await response.json();

                const mappedNormativas = (json.data || []).map(item => {
                    const data = item.attributes || item;

                    // Extraer URL del PDF
                    let pdfUrl = '';
                    const assetData = data.archivo_pdf?.data || data.archivo_pdf;
                    if (assetData) {
                        const attr = assetData.attributes || assetData;
                        if (attr.url) {
                            pdfUrl = attr.url.startsWith('http') ? attr.url : `${API_URL}${attr.url}`;
                        }
                    }

                    return {
                        id: item.id,
                        title: data.titulo || 'Sin título',
                        description: data.descripcion || '',
                        file: pdfUrl,
                        type: data.tipo
                    };
                });

                setNormativas(mappedNormativas);
            } catch (err) {
                console.error('Error fetching normativas:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchNormativas();
    }, [tipo]);

    return { normativas, loading };
};
