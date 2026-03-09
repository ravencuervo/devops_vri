import { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:1337';

export const useConfiguracion = () => {
    const [videoUrl, setVideoUrl] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchConfig = async () => {
            try {
                const response = await fetch(`${API_URL}/api/configuracion-inicio?populate=*`);
                const json = await response.json();

                if (json.data) {
                    const data = json.data.attributes || json.data;

                    if (data.video_archivo?.data) {
                        const path = data.video_archivo.data.attributes.url;
                        setVideoUrl(`${API_URL}${path}`);
                    }

                    else if (data.video_url) {
                        setVideoUrl(data.video_url);
                    }
                }
            } catch (err) {
                console.error("Error cargando el video:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchConfig();
    }, []);

    return { videoUrl, loading };
};
