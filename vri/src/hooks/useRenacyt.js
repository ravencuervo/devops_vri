import { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:1337';

export const useRenacyt = () => {
    const [docentesInvestigadores, setDocentesInvestigadores] = useState([]);
    const [docentesRenacyt, setDocentesRenacyt] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAllData = async () => {
            setLoading(true);
            try {
                const [resDI, resDR] = await Promise.all([
                    fetch(`${API_URL}/api/docentes-investigadores?pagination[limit]=1000`),
                    fetch(`${API_URL}/api/docentes-renacyt?pagination[limit]=1000`)
                ]);

                const jsonDI = await resDI.json();
                const jsonDR = await resDR.json();

                // Group Investigadores by Facultad/Escuela
                const groupedDI = (jsonDI.data || []).reduce((acc, item) => {
                    const data = item.attributes || item;
                    const key = `${data.facultad}-${data.escuela}`;
                    if (!acc[key]) {
                        acc[key] = {
                            id: key,
                            facultad: data.facultad,
                            escuela: data.escuela,
                            docentes: []
                        };
                    }
                    acc[key].docentes.push({
                        nombre: data.nombre,
                        nivel: data.nivel
                    });
                    return acc;
                }, {});

                // Group Renacyt by Facultad/Escuela
                const groupedDR = (jsonDR.data || []).reduce((acc, item) => {
                    const data = item.attributes || item;
                    const key = `${data.facultad}-${data.escuela}`;
                    if (!acc[key]) {
                        acc[key] = {
                            id: key,
                            facultad: data.facultad,
                            escuela: data.escuela,
                            docentes: []
                        };
                    }
                    acc[key].docentes.push({
                        nombre: data.nombre,
                        nivel: data.nivel,
                        estado: data.estado
                    });
                    return acc;
                }, {});

                setDocentesInvestigadores(Object.values(groupedDI));
                setDocentesRenacyt(Object.values(groupedDR));
            } catch (err) {
                console.error('Error fetching renacyt data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchAllData();
    }, []);

    return { docentesInvestigadores, docentesRenacyt, loading };
};
