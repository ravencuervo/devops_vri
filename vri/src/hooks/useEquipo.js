import { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:1337';

export const useEquipo = () => {
    const [equipo, setEquipo] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEquipo = async () => {
            try {
                const response = await fetch(`${API_URL}/api/miembro-equipos?populate=*&sort=orden:asc`);
                const json = await response.json();

                if (json.data && Array.isArray(json.data)) {
                    const mapped = json.data.map(item => {
                        const attrs = item.attributes || item;

                        // Foto
                        let fotoUrl = null;
                        if (attrs.foto && attrs.foto.data) {
                            fotoUrl = `${API_URL}${attrs.foto.data.attributes.url}`;
                        } else if (attrs.foto && attrs.foto.url) {
                            fotoUrl = `${API_URL}${attrs.foto.url}`;
                        }

                        return {
                            id: item.id,
                            title: attrs.grado || '',
                            firstName: attrs.nombres || '',
                            lastName: attrs.apellidos || '',
                            role: attrs.cargo || '',
                            isJefe: attrs.es_jefe || false,
                            office: attrs.oficina || '',
                            color: attrs.color_clase || 'bg-[#030D4F]',
                            image: fotoUrl
                        };
                    });
                    setEquipo(mapped);
                }
            } catch (err) {
                console.error('Error fetching equipo:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchEquipo();
    }, []);

    // Función útil para agrupar por oficina
    const getMembersByOffice = (officeName) => {
        const members = equipo.filter(m => m.office === officeName);
        // El jefe siempre primero (aunque ya debería venir ordenado por Strapi)
        return members.sort((a, b) => (b.isJefe ? 1 : 0) - (a.isJefe ? 1 : 0));
    };

    return {
        equipo,
        loading,
        getMembersByOffice,
        vicerrector: equipo.find(m => m.office === 'Nivel Directivo')
    };
};
