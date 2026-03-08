import React, { useState, useEffect, useRef, useCallback } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:1337';

// Secciones estáticas del portal (siempre disponibles)
const SITE_SECTIONS = [
    { title: 'Inicio / Home', keywords: 'inicio home principal portada', link: '#', type: 'Sección', icon: 'fa-home' },
    { title: 'Nosotros / Autoridades', keywords: 'nosotros mision vision objetivos autoridades equipo', link: '#nosotros', type: 'Sección', icon: 'fa-users' },
    { title: 'Revistas Científicas', keywords: 'revistas publicaciones papers articulos journals', link: '#revistas', type: 'Sección', icon: 'fa-book-open' },
    { title: 'Actividades y Eventos', keywords: 'actividades eventos agenda posters cronograma', link: '#actividades', type: 'Sección', icon: 'fa-calendar-alt' },
    { title: 'Noticias y Actualidad', keywords: 'noticias novedades diario periodico actualidad', link: '#noticias', type: 'Sección', icon: 'fa-newspaper' },
    { title: 'Convocatorias y Fondos', keywords: 'convocatorias fondos concursos financiamiento becas', link: '#convocatorias', type: 'Sección', icon: 'fa-bullhorn' },
    { title: 'Normativa y Reglamentos', keywords: 'normativa reglamentos leyes directivas resoluciones', link: '#normativa', type: 'Sección', icon: 'fa-gavel' },
    { title: 'Innovación y Transferencia', keywords: 'innovacion transferencia patentes propiedad intelectual', link: '#innovacion', type: 'Sección', icon: 'fa-lightbulb' },
    { title: 'Investigadores RENACYT', keywords: 'investigadores docentes renacyt concytec cientificos', link: '#renacyt', type: 'Sección', icon: 'fa-user-tie' },
    { title: 'Instituto de Investigación (IDI)', keywords: 'instituto investigacion idi', link: '#idi', type: 'Sección', icon: 'fa-flask' },
    { title: 'Grupos de Investigación', keywords: 'grupos investigacion equipos lineas', link: '#grupos', type: 'Sección', icon: 'fa-users-cog' },
    { title: 'Semilleros de Investigación', keywords: 'semilleros estudiantes jovenes', link: '#semilleros', type: 'Sección', icon: 'fa-seedling' },
    { title: 'Institutos Facultativos', keywords: 'institutos facultades centros', link: '#institutos', type: 'Sección', icon: 'fa-university' },
    { title: 'Repositorio Institucional', keywords: 'repositorio tesis trabajos academicos', link: 'https://repositorio.unap.edu.pe/home', type: 'Plataforma', icon: 'fa-archive' },
    { title: 'Mesa de Partes Virtual', keywords: 'mesa partes tramite expediente', link: 'https://tramites.unap.edu.pe/', type: 'Servicio', icon: 'fa-envelope-open-text' },
    { title: 'PGI - Gestión de Investigación', keywords: 'pgi sistema gestion plataforma proyectos', link: 'https://pgi.vriunap.pe/home', type: 'Plataforma', icon: 'fa-laptop-code' },
    { title: 'Plataforma FEDU', keywords: 'fedu fondo editorial publicaciones libros', link: 'https://vriunap.pe/fedu/', type: 'Plataforma', icon: 'fa-book' },
    { title: 'Turnitin', keywords: 'turnitin antiplagio similitud', link: 'https://unap.turnitin.com/home/sign-in', type: 'Servicio', icon: 'fa-check-double' },
];

const normalizeText = (text) => {
    if (!text) return '';
    return text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
};

const QUICK_LINKS = [
    { label: 'Convocatorias', link: '#convocatorias', icon: 'fa-bullhorn', desc: 'Fondos 2026' },
    { label: 'RENACYT', link: '#renacyt', icon: 'fa-user-graduate', desc: 'Investigadores' },
    { label: 'Normativa', link: '#normativa', icon: 'fa-gavel', desc: 'Reglamentos' },
    { label: 'Repositorio', link: 'https://repositorio.unap.edu.pe/home', icon: 'fa-archive', desc: 'Tesis y más' },
    { label: 'PGI', link: 'https://pgi.vriunap.pe/home', icon: 'fa-laptop-code', desc: 'Gestión' },
    { label: 'Mesa de Partes', link: 'https://tramites.unap.edu.pe/', icon: 'fa-envelope-open-text', desc: 'Trámites' },
];

const TYPE_COLORS = {
    'Sección': 'bg-[#030D4F] text-white',
    'Plataforma': 'bg-purple-100 text-purple-700',
    'Servicio': 'bg-green-100 text-green-700',
    'Noticia': 'bg-blue-100 text-blue-700',
    'Convocatoria': 'bg-amber-100 text-amber-700',
    'Normativa': 'bg-red-100 text-red-700',
    'Aviso': 'bg-red-600 text-white',
};

const SearchModal = ({ isOpen, onClose }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedIdx, setSelectedIdx] = useState(-1);
    const inputRef = useRef(null);
    const debounceRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 50);
        } else {
            setQuery('');
            setResults([]);
            setSelectedIdx(-1);
        }
    }, [isOpen]);

    // Close on ESC
    useEffect(() => {
        const onKey = (e) => {
            if (!isOpen) return;
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowDown') setSelectedIdx(i => Math.min(i + 1, results.length - 1));
            if (e.key === 'ArrowUp') setSelectedIdx(i => Math.max(i - 1, -1));
            if (e.key === 'Enter' && selectedIdx >= 0 && results[selectedIdx]) {
                handleResultClick(results[selectedIdx].link);
            }
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [isOpen, results, selectedIdx]);

    const searchStrapi = async (term) => {
        const enc = encodeURIComponent(term);
        const results = [];
        try {
            // Noticias
            const notRes = await fetch(`${API_URL}/api/noticias?filters[titulo][$containsi]=${enc}&populate=imagen_principal&pagination[limit]=5&sort=createdAt:desc`);
            if (notRes.ok) {
                const notData = await notRes.json();
                (notData.data || []).forEach(item => {
                    const attr = item.attributes || item;
                    results.push({
                        type: 'Noticia',
                        title: attr.titulo || attr.title || 'Sin título',
                        excerpt: attr.resumen || '',
                        link: `#noticias?id=${item.id}`,
                        icon: 'fa-newspaper',
                        score: 7,
                    });
                });
            }
        } catch { /* silently skip */ }

        try {
            // Convocatorias
            const convRes = await fetch(`${API_URL}/api/convocatorias?filters[titulo][$containsi]=${enc}&pagination[limit]=5&sort=fecha_publicacion:desc`);
            if (convRes.ok) {
                const convData = await convRes.json();
                (convData.data || []).forEach(item => {
                    const attr = item.attributes || item;
                    results.push({
                        type: 'Convocatoria',
                        title: attr.titulo || 'Convocatoria',
                        excerpt: attr.descripcion ? String(attr.descripcion).slice(0, 100) : '',
                        link: '#convocatorias',
                        icon: 'fa-bullhorn',
                        score: 8,
                    });
                });
            }
        } catch { /* silently skip */ }

        try {
            // Normativas
            const normRes = await fetch(`${API_URL}/api/normativas?filters[titulo][$containsi]=${enc}&pagination[limit]=5`);
            if (normRes.ok) {
                const normData = await normRes.json();
                (normData.data || []).forEach(item => {
                    const attr = item.attributes || item;
                    results.push({
                        type: 'Normativa',
                        title: attr.titulo || 'Documento',
                        excerpt: attr.descripcion || '',
                        link: '#normativa',
                        icon: 'fa-file-pdf',
                        score: 6,
                    });
                });
            }
        } catch { /* silently skip */ }

        try {
            // Avisos activos
            const aviRes = await fetch(`${API_URL}/api/avisos?filters[titulo][$containsi]=${enc}&filters[activo][$eq]=true&pagination[limit]=3`);
            if (aviRes.ok) {
                const aviData = await aviRes.json();
                (aviData.data || []).forEach(item => {
                    const attr = item.attributes || item;
                    results.push({
                        type: 'Aviso',
                        title: attr.titulo || 'Aviso',
                        excerpt: attr.descripcion ? String(attr.descripcion).slice(0, 100) : '',
                        link: '#',
                        icon: 'fa-bell',
                        score: 9,
                    });
                });
            }
        } catch { /* silently skip */ }

        return results;
    };

    const handleSearch = useCallback((e) => {
        const value = e.target.value;
        setQuery(value);
        setSelectedIdx(-1);

        if (value.length < 2) {
            setResults([]);
            return;
        }

        // Immediate static search
        const searchTerm = normalizeText(value);
        const searchWords = searchTerm.split(/\s+/).filter(w => w.length > 0);
        const checkMatch = (text) => {
            if (!text) return false;
            const norm = normalizeText(String(text));
            return searchWords.every(w => norm.includes(w));
        };

        const staticResults = [];
        SITE_SECTIONS.forEach(section => {
            if (checkMatch(section.title) || checkMatch(section.keywords)) {
                staticResults.push({ ...section, score: 10, excerpt: '' });
            }
        });
        setResults(staticResults.sort((a, b) => b.score - a.score));

        // Debounced Strapi search
        if (debounceRef.current) clearTimeout(debounceRef.current);
        setLoading(true);
        debounceRef.current = setTimeout(async () => {
            try {
                const dynamicResults = await searchStrapi(value);
                setResults(prev => {
                    // Merge static + dynamic, deduplicate by title+type
                    const all = [...prev, ...dynamicResults];
                    const seen = new Set();
                    return all
                        .filter(item => {
                            const k = `${item.type}-${normalizeText(item.title)}`;
                            return seen.has(k) ? false : seen.add(k);
                        })
                        .sort((a, b) => b.score - a.score)
                        .slice(0, 20);
                });
            } finally {
                setLoading(false);
            }
        }, 350);
    }, []);

    const handleResultClick = (link) => {
        if (!link || link === '#') { onClose(); return; }
        if (link.startsWith('http')) {
            window.open(link, '_blank', 'noopener,noreferrer');
        } else {
            window.location.hash = link;
        }
        onClose();
    };

    if (!isOpen) return null;

    // Group results by type
    const grouped = results.reduce((acc, r) => {
        if (!acc[r.type]) acc[r.type] = [];
        acc[r.type].push(r);
        return acc;
    }, {});
    const groupOrder = ['Aviso', 'Sección', 'Noticia', 'Convocatoria', 'Normativa', 'Plataforma', 'Servicio'];
    const sortedGroups = Object.entries(grouped).sort(([a], [b]) => {
        return (groupOrder.indexOf(a) === -1 ? 99 : groupOrder.indexOf(a)) -
            (groupOrder.indexOf(b) === -1 ? 99 : groupOrder.indexOf(b));
    });

    let globalIdx = 0;

    return (
        <div className="fixed inset-0 z-[200] flex items-start justify-center pt-[5vh] px-4 bg-[#030D4F]/85 backdrop-blur-md">
            {/* Backdrop click */}
            <div className="absolute inset-0" onClick={onClose}></div>

            <div className="relative bg-white w-full max-w-2xl rounded-[2rem] shadow-2xl overflow-hidden animate-slide-up flex flex-col max-h-[88vh]">

                {/* ── HEADER ── */}
                <div className="px-6 pt-6 pb-4 border-b border-gray-100 flex-shrink-0">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-2xl bg-[#AEDD2B] text-[#030D4F] flex items-center justify-center shadow-md -rotate-6">
                            <i className="fas fa-search"></i>
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg font-black text-[#030D4F] leading-none tracking-tighter">Buscador VRI</h3>
                            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Portal + CMS en tiempo real</p>
                        </div>
                        <button onClick={onClose} className="w-9 h-9 rounded-full bg-gray-50 hover:bg-red-50 hover:text-red-500 text-gray-400 flex items-center justify-center transition-all text-sm">
                            <i className="fas fa-times"></i>
                        </button>
                    </div>

                    <div className="relative">
                        <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 text-sm"></i>
                        {loading && (
                            <i className="fas fa-spinner animate-spin absolute right-4 top-1/2 -translate-y-1/2 text-[#AEDD2B] text-sm"></i>
                        )}
                        <input
                            ref={inputRef}
                            type="text"
                            value={query}
                            onChange={handleSearch}
                            placeholder="Busca noticias, convocatorias, reglamentos, investigadores..."
                            className="w-full pl-10 pr-10 py-3.5 bg-gray-50 border-2 border-transparent focus:border-[#AEDD2B] focus:bg-white rounded-2xl outline-none transition-all text-sm font-medium text-[#030D4F] placeholder-gray-400"
                        />
                    </div>
                </div>

                {/* ── RESULTS ── */}
                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    {results.length > 0 ? (
                        <div className="px-4 py-4 space-y-4">
                            {sortedGroups.map(([type, items]) => (
                                <div key={type}>
                                    <div className="flex items-center gap-2 px-2 mb-2">
                                        <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${TYPE_COLORS[type] || 'bg-gray-100 text-gray-500'}`}>
                                            {type}
                                        </span>
                                        <span className="text-[9px] text-gray-300 font-bold">{items.length} resultado{items.length > 1 ? 's' : ''}</span>
                                    </div>
                                    <div className="space-y-1">
                                        {items.map((result) => {
                                            const isSelected = globalIdx === selectedIdx;
                                            const currentGlobalIdx = globalIdx;
                                            globalIdx++;
                                            return (
                                                <div
                                                    key={`${type}-${result.title}`}
                                                    onClick={() => handleResultClick(result.link)}
                                                    className={`flex items-center gap-3 px-3 py-3 rounded-xl cursor-pointer transition-all group border ${isSelected ? 'bg-blue-50 border-blue-200' : 'border-transparent hover:bg-gray-50 hover:border-gray-100'}`}
                                                >
                                                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-sm transition-all ${isSelected ? 'bg-[#030D4F] text-[#AEDD2B]' : 'bg-gray-100 text-gray-500 group-hover:bg-[#030D4F] group-hover:text-[#AEDD2B]'}`}>
                                                        <i className={`fas ${result.icon}`}></i>
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm font-bold text-[#030D4F] truncate leading-snug">{result.title}</p>
                                                        {result.excerpt && (
                                                            <p className="text-[10px] text-gray-400 truncate mt-0.5 font-medium">{result.excerpt}</p>
                                                        )}
                                                    </div>
                                                    <i className="fas fa-chevron-right text-[10px] text-gray-200 group-hover:text-[#AEDD2B] flex-shrink-0 transition-colors"></i>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : query.length >= 2 && !loading ? (
                        <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
                            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                                <i className="fas fa-search text-2xl text-gray-200"></i>
                            </div>
                            <h4 className="text-base font-black text-[#030D4F] mb-1">Sin resultados</h4>
                            <p className="text-sm text-gray-400 max-w-xs">
                                No encontramos nada para <span className="font-bold text-[#030D4F]">"{query}"</span>. Prueba con términos más cortos o generales.
                            </p>
                        </div>
                    ) : (
                        <div className="px-6 py-5">
                            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-4">Accesos Rápidos</p>
                            <div className="grid grid-cols-3 gap-3">
                                {QUICK_LINKS.map(tag => (
                                    <div
                                        key={tag.label}
                                        onClick={() => handleResultClick(tag.link)}
                                        className="flex flex-col items-center p-4 bg-gray-50 rounded-2xl cursor-pointer hover:bg-[#030D4F] group transition-all border border-transparent hover:border-[#030D4F] hover:shadow-lg"
                                    >
                                        <i className={`fas ${tag.icon} text-xl text-gray-300 group-hover:text-[#AEDD2B] mb-2 transition-colors`}></i>
                                        <span className="text-[11px] font-bold text-[#030D4F] group-hover:text-white mb-0.5 transition-colors">{tag.label}</span>
                                        <span className="text-[9px] text-gray-400 group-hover:text-white/60 uppercase tracking-tight transition-colors">{tag.desc}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* ── FOOTER ── */}
                <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 flex justify-between items-center flex-shrink-0">
                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Búsqueda en Portal + Strapi CMS</p>
                    <div className="flex gap-3 text-[9px] text-gray-400 font-bold">
                        <span><kbd className="bg-white px-1.5 py-0.5 rounded border border-gray-200 font-sans">↑↓</kbd> navegar</span>
                        <span><kbd className="bg-white px-1.5 py-0.5 rounded border border-gray-200 font-sans">Enter</kbd> abrir</span>
                        <span><kbd className="bg-white px-1.5 py-0.5 rounded border border-gray-200 font-sans">Esc</kbd> cerrar</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchModal;
