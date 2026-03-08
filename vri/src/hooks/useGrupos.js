import { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:1337';

export const useGrupos = (year = '2025') => {
    const [financiados, setFinanciados] = useState([]);
    const [reconocidos, setReconocidos] = useState([]);
    const [availableYears, setAvailableYears] = useState(['2025', '2024']);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchYears = async () => {
            try {
                // Obtenemos años de ambas colecciones para tener la lista completa
                const [resF, resR] = await Promise.all([
                    fetch(`${API_URL}/api/grupos-financiados?fields[0]=anio&pagination[limit]=100`),
                    fetch(`${API_URL}/api/grupos-reconocidos?fields[0]=anio&pagination[limit]=100`)
                ]);

                const [jsonF, jsonR] = await Promise.all([resF.json(), resR.json()]);

                const yearsF = (jsonF.data || []).map(item => (item.attributes?.anio || item.anio));
                const yearsR = (jsonR.data || []).map(item => (item.attributes?.anio || item.anio));

                const allYears = [...new Set([...yearsF, ...yearsR])].filter(Boolean);

                if (allYears.length > 0) {
                    setAvailableYears(allYears.sort((a, b) => b - a));
                }
            } catch (err) {
                console.error('Error fetching years:', err);
            }
        };
        fetchYears();
    }, []);

    useEffect(() => {
        const fetchAllData = async () => {
            setLoading(true);
            try {
                const [resF, resR] = await Promise.all([
                    fetch(`${API_URL}/api/grupos-financiados?filters[anio][$eq]=${year}&pagination[limit]=100`),
                    fetch(`${API_URL}/api/grupos-reconocidos?filters[anio][$eq]=${year}&pagination[limit]=100`)
                ]);

                const [jsonF, jsonR] = await Promise.all([resF.json(), resR.json()]);

                // Mapeo de Financiados
                const mappedF = (jsonF.data || []).map(item => {
                    const data = item.attributes || item;
                    return {
                        id: item.id,
                        nombre: data.nombre,
                        escuela: data.escuela || '',
                        responsable: data.responsable || '',
                        monto: data.monto || '0.00'
                    };
                });

                // Mapeo de Reconocidos
                const mappedR = (jsonR.data || []).map(item => {
                    const data = item.attributes || item;
                    let integrantesArray = [];
                    if (data.integrantes) {
                        integrantesArray = data.integrantes.split('\n').map(s => s.trim()).filter(s => s !== '');
                    }
                    return {
                        id: item.id,
                        nombre: data.nombre,
                        facultad: data.facultad || '',
                        escuela: data.escuela || '',
                        responsable: data.responsable || '',
                        linea: data.linea || '',
                        integrantes: integrantesArray
                    };
                });

                setFinanciados(mappedF);
                setReconocidos(mappedR);
            } catch (err) {
                console.error('Error fetching groups data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchAllData();
    }, [year]);

    return { financiados, reconocidos, availableYears, loading };
};
