import { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:1337';

export const useInnovacion = () => {
    const [patentes, setPatentes] = useState([]);
    const [transferencia, setTransferencia] = useState([]);
    const [vinculacion, setVinculacion] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAllData = async () => {
            setLoading(true);
            try {
                // Strapi v5 - Ensure we get all fields
                const [resP, resT, resV] = await Promise.all([
                    fetch(`${API_URL}/api/patentes?status=published&pagination[limit]=100`),
                    fetch(`${API_URL}/api/transferencias-tecnologicas?status=published&populate=*&pagination[limit]=100`),
                    fetch(`${API_URL}/api/vinculaciones-empresariales?status=published&pagination[limit]=100`)
                ]);

                const jsonP = await resP.json();
                const jsonT = await resT.json();
                const jsonV = await resV.json();

                // Map results correctly for Strapi v5
                const extractData = (json) => {
                    if (!json.data) return [];
                    return json.data.map(item => {
                        // In v5, attributes might be at the root or inside 'attributes'
                        const core = item.attributes || item;
                        return { id: item.id, ...core };
                    });
                };

                const rawP = extractData(jsonP);
                const rawT = extractData(jsonT);
                const rawV = extractData(jsonV);

                setPatentes(rawP.map(d => ({
                    id: d.id,
                    title: d.titulo || 'Sin título',
                    description: d.descripcion || '',
                    inventors: d.inventores || '',
                    year: d.anio || '',
                    id_uap: d.codigo_uap || ''
                })));

                setTransferencia(rawT.map(d => {
                    let imageUrl = '';
                    const img = d.imagen?.data || d.imagen;
                    if (img) {
                        const attr = img.attributes || img;
                        if (attr.url) {
                            imageUrl = attr.url.startsWith('http') ? attr.url : `${API_URL}${attr.url}`;
                        }
                    }
                    return {
                        id: d.id,
                        title: d.titulo || 'Sin título',
                        description: d.descripcion || '',
                        impact: d.impacto || '',
                        image: imageUrl || 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800'
                    };
                }));

                setVinculacion(rawV.map(d => ({
                    id: d.id,
                    company: d.empresa || 'Sin nombre',
                    project: d.proyecto || '',
                    description: d.descripcion || '',
                    year: d.anio || '',
                    status: d.estado || 'Activo'
                })));

            } catch (err) {
                console.error('Error fetching innovacion data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchAllData();
    }, []);

    return { patentes, transferencia, vinculacion, loading };
};
