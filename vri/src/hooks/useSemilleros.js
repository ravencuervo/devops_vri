import { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:1337';

export const useSemilleros = (year = '2025') => {
    const [financiados, setFinanciados] = useState([]);
    const [reconocidos, setReconocidos] = useState([]);
    const [availableYears, setAvailableYears] = useState(['2025', '2024']);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchYears = async () => {
            try {
                const [resF, resR] = await Promise.all([
                    fetch(`${API_URL}/api/semilleros-financiados?fields[0]=anio&pagination[limit]=100`),
                    fetch(`${API_URL}/api/semilleros-reconocidos?fields[0]=anio&pagination[limit]=100`)
                ]);

                const jsonF = await resF.json();
                const jsonR = await resR.json();

                const yearsF = (jsonF.data || []).map(item => (item.attributes?.anio || item.anio));
                const yearsR = (jsonR.data || []).map(item => (item.attributes?.anio || item.anio));

                const allYears = [...new Set([...yearsF, ...yearsR])].filter(Boolean);

                if (allYears.length > 0) {
                    setAvailableYears(allYears.sort((a, b) => b - a));
                }
            } catch (err) {
                console.error('Error fetching semilleros years:', err);
            }
        };
        fetchYears();
    }, []);

    useEffect(() => {
        const fetchAllData = async () => {
            setLoading(true);
            try {
                const [resF, resR] = await Promise.all([
                    fetch(`${API_URL}/api/semilleros-financiados?filters[anio][$eq]=${year}&pagination[limit]=100`),
                    fetch(`${API_URL}/api/semilleros-reconocidos?filters[anio][$eq]=${year}&pagination[limit]=100`)
                ]);

                const jsonF = await resF.json();
                const jsonR = await resR.json();

                const mappedF = (jsonF.data || []).map(item => {
                    const data = item.attributes || item;
                    return {
                        id: item.id,
                        nombre: data.nombre,
                        facultad: data.facultad || '',
                        escuela: data.escuela || '',
                        presupuesto: data.presupuesto || '0.00',
                        linea: data.linea || '',
                        investigadores: (data.investigadores || '').split('\n').filter(s => s.trim() !== '')
                    };
                });

                const mappedR = (jsonR.data || []).map(item => {
                    const data = item.attributes || item;
                    return {
                        id: item.id,
                        nombre: data.nombre,
                        facultad: data.facultad || '',
                        escuela: data.escuela || '',
                        linea: data.linea || '',
                        investigadores: (data.investigadores || '').split('\n').filter(s => s.trim() !== '')
                    };
                });

                setFinanciados(mappedF);
                setReconocidos(mappedR);
            } catch (err) {
                console.error('Error fetching semilleros data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchAllData();
    }, [year]);

    return { financiados, reconocidos, availableYears, loading };
};
