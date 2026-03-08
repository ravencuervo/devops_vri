export const DII_SERVICES = [
    {
        id: 1,
        title: "PGI",
        subtitle: "Plataforma de Gestión de la Investigación",
        desc: "Sistema centralizado para el seguimiento y gestión de proyectos de investigación científica.",
        color: "#149C68",
        logo: "src/assets/pgi.png",
        links: {
            portal: "https://pgi.vriunap.pe/home",
            about: "Unidad especializada para promover la mejora continua, innovación y gestión estratégica en la universidad.",
            official: "Plataforma digital oficial con información actualizada, documentos y recursos.",
            contact: "info.pgi@unap.edu.pe"
        }
    },
    {
        id: 2,
        title: "Sub Unidad de Publicaciones",
        subtitle: "Editorial Universitaria",
        desc: "Gestión y difusión de la producción científica y académica de la universidad.",
        color: "#38C958",
        logo: "src/assets/Logo_UNAP.png",
        links: {
            portal: "https://revistas.unap.edu.pe/portal/",
            about: "Gestiona, edita y difunde la producción científica universitaria con estándares internacionales.",
            official: "Canal principal de información sobre servicios y publicaciones científicas.",
            contact: "publicaciones.cientificas@unap.edu.pe"
        }
    },
    {
        id: 3,
        title: "Repositorio",
        subtitle: "Acceso Abierto",
        desc: "Almacenamiento y preservación digital de la producción intelectual de la comunidad UNA PUNO.",
        color: "#AEE637",
        logo: "src/assets/repo_logo.jpg",
        links: {
            portal: "https://repositorio.unap.edu.pe/home",
            about: "Repositorio basado en garantizar acceso abierto a la investigación universitaria.",
            official: "Acceso al repositorio digital nacional e institucional.",
            contact: "repositorio@unap.edu.pe"
        }
    }
];

export const DII_STATS = [
    { id: 1, label: 'Investigadores', value: '450+', icon: 'fa-user-graduate' },
    { id: 2, label: 'Proyectos Activos', value: '120+', icon: 'fa-microscope' },
    { id: 3, label: 'Publicaciones 2024', value: '320+', icon: 'fa-book' },
    { id: 4, label: 'Patentes', value: '15+', icon: 'fa-lightbulb' }
];

export const DII_METHODOLOGY = [
    {
        id: 1,
        title: "Grupos",
        desc: "Constituyen unidades académicas orientadas a la generación de conocimiento en líneas de investigación específicas.",
        icon: "fa-users",
        color: "#149C68",
        link: "#grupos",
        linkText: "Ver Grupos 2025"
    },
    {
        id: 2,
        title: "Semilleros",
        desc: "Constituyen una estrategia académica que promueve la investigación temprana vinculada al desarrollo social, ambiental y cultural del altiplano.",
        icon: "fa-seedling",
        color: "#22B573",
        link: "#semilleros",
        linkText: "Unirse a Semillero"
    },
    {
        id: 3,
        title: "Institutos",
        desc: "Son órganos institucionales que desarrollan investigación aplicada y básica en áreas estratégicas para el desarrollo regional y nacional.",
        icon: "fa-university",
        color: "#38C958",
        color2: "#8DC63F", // Usaré este para un efecto visual si es necesario, pero mantengamos la lógica de gradación en la propiedad color
        color: "#35D07F",
        link: "#institutos",
        linkText: "Ver Institutos"
    },
    {
        id: 4,
        title: "RENACYT",
        desc: "El RENACYT permite identificar a investigadores activos y fortalecer la investigación, innovación y desarrollo científico del país.",
        icon: "fa-user-graduate",
        color: "#AEE637",
        link: "#renacyt",
        linkText: "Ver Padrón"
    }
];
