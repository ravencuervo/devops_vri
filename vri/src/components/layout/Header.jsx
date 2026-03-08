import React, { useState, useEffect } from 'react';

const MobileMenuItem = ({ item, depth = 0, isIdi, onNavClick }) => {
    const [isOpen, setIsOpen] = useState(false);
    const hasSubItems = (item.dropdownItems && item.dropdownItems.length > 0) || (item.subItems && item.subItems.length > 0);
    const subItems = item.dropdownItems || item.subItems;

    const handleLabelClick = (e) => {
        if (item.href && item.href !== '#') {
            if (onNavClick) onNavClick();
        } else if (hasSubItems) {
            e.preventDefault();
            setIsOpen(!isOpen);
        }
    };

    const handleArrowClick = (e) => {
        e.stopPropagation();
        setIsOpen(!isOpen);
    };

    return (
        <div className="w-full border-b border-gray-50 last:border-0 font-sans">
            <div
                className={`flex items-center justify-between px-6 py-4 cursor-pointer hover:bg-gray-50 transition-colors ${depth > 0 ? 'pl-10' : ''}`}
                onClick={handleLabelClick}
            >
                <a
                    href={item.href || '#'}
                    className={`text-gray-700 font-bold ${isIdi ? 'hover:text-[#149C68]' : 'hover:text-unap-blue'} ${depth > 0 ? 'text-sm' : 'text-base'}`}
                    onClick={(e) => {
                        if (!item.href || item.href === '#') {
                            e.preventDefault();
                        }
                    }}
                >
                    {item.label}
                </a>
                {hasSubItems && (
                    <button
                        onClick={handleArrowClick}
                        className={`w-10 h-10 -mr-2 flex items-center justify-center rounded-full hover:bg-gray-100 transition-all ${isOpen ? 'rotate-180 bg-gray-50' : ''}`}
                    >
                        <i className="fas fa-chevron-down text-xs opacity-40"></i>
                    </button>
                )}
            </div>
            {hasSubItems && isOpen && (
                <div className="bg-gray-50/50 border-t border-gray-100/50">
                    {subItems.map((sub, idx) => (
                        <MobileMenuItem key={idx} item={sub} depth={depth + 1} isIdi={isIdi} onNavClick={onNavClick} />
                    ))}
                </div>
            )}
        </div>
    );
};

const DropdownMenu = ({ items, isSub = false, isIdi }) => (
    <div className={`absolute ${isSub ? 'top-0 left-full border-l-2' : 'top-full left-0 border-t-2'} w-64 bg-white shadow-2xl rounded-lg py-2 border-unap-gold z-50`}>
        {items.map((item, index) => (
            <div key={index} className="relative px-1 [&:hover>div]:visible [&:hover>div]:opacity-100 [&:hover>div]:translate-x-0">
                <a
                    href={item.href || '#'}
                    onClick={(e) => {
                        if (!item.href || item.href === '#') {
                            e.preventDefault();
                        }
                    }}
                    className={`flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 ${isIdi ? 'hover:text-[#149C68]' : 'hover:text-unap-blue'} rounded-md transition-colors`}
                >
                    <span className="truncate mr-2">{item.label}</span>
                    {item.subItems && <i className="fas fa-chevron-right text-[10px] opacity-40"></i>}
                </a>
                {item.subItems && (
                    <div className="absolute top-0 left-full border-l-2 invisible opacity-0 translate-x-3 transition-all duration-200 z-50">
                        <DropdownMenu items={item.subItems} isSub={true} isIdi={isIdi} />
                    </div>
                )}
            </div>
        ))}
    </div>
);

const NavLink = ({ href, children, hasDropdown, dropdownItems = [], isIdi }) => (
    <div className="relative h-full flex items-center [&:hover>div]:visible [&:hover>div]:opacity-100 [&:hover>div]:translate-y-0">
        <a
            href={href || '#'}
            onClick={(e) => {
                if (!href || href === '#') {
                    e.preventDefault();
                }
            }}
            className={`flex items-center text-sm font-medium ${isIdi ? 'hover:text-[#AEE637]' : 'hover:text-unap-blue'} transition-colors px-3 py-2 cursor-pointer`}
        >
            {children}
            {hasDropdown && <i className="fas fa-chevron-down ml-1 text-xs opacity-70"></i>}
        </a>
        {hasDropdown && dropdownItems.length > 0 && (
            <div className="absolute top-full left-0 invisible opacity-0 translate-y-2 transition-all duration-200 z-50">
                <DropdownMenu items={dropdownItems} isIdi={isIdi} />
            </div>
        )}
    </div>
);

const Header = ({ onSearchClick, theme = 'default' }) => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const isIdi = theme === 'idi';

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { label: 'Inicio', href: '#/' },
        { label: 'Publicaciones', href: '#', hasDropdown: true, dropdownItems: [{ label: 'Revistas Científicas', href: '#revistas' }] },
        {
            label: 'VRI',
            href: '#',
            hasDropdown: true,
            dropdownItems: [
                {
                    label: 'Actividades',
                    href: '#actividades',
                    subItems: [
                        { label: 'Posters', href: '#actividades?section=posters' },
                        { label: 'Cronograma de Actividades', href: '#actividades?section=cronograma' }
                    ]
                },
                { label: 'Noticias y Eventos', href: '#noticias-eventos' }
            ]
        },
        { label: 'Nosotros', href: '#nosotros' },
        { label: 'Convocatorias', href: '#convocatorias' },
        {
            label: 'Direcciones',
            href: '#',
            hasDropdown: true,
            dropdownItems: [
                {
                    label: 'Comité Institucional de Ética', href: 'https://vriunap.pe/etica'
                },
                {
                    label: 'Instituto de Investigación',
                    href: '#idi',
                    subItems: [
                        {
                            label: 'Como investigamos',
                            href: '#',
                            subItems: [
                                { label: 'Grupos', href: '#grupos' },
                                { label: 'Semilleros', href: '#semilleros' },
                                { label: 'Institutos', href: '#institutos-lista' },
                                { label: 'RENACYT', href: '#renacyt' }
                            ]
                        },
                        { label: 'Sub Unidad de publicaciones', href: 'https://revistas.unap.edu.pe/portal/' },
                        { label: 'Repositorio', href: 'https://repositorio.unap.edu.pe/home' },
                        { label: 'Plataforma de Gestión de la Investigación', href: 'https://pgi.vriunap.pe/home' }
                    ]
                },
                {
                    label: 'Innovación y Transferencia', href: '#innovacion', subItems: [
                        { label: 'Patentes', href: '#innovacion?section=patentes' },
                        { label: 'Transferencia', href: '#innovacion?section=transferencia' },
                        { label: 'Vinculación Empresarial', href: '#innovacion?section=vinculacion' }]
                },
                {
                    label: 'Incubadora de Empresas', href: 'https://www.incunalab.com/'
                }
            ]
        },
        {
            label: 'Normativa y Gestión',
            href: '#normativa',
        },
        { label: 'Noticias', href: '#noticias' },
        {
            label: 'Servicios',
            href: '#',
            hasDropdown: true,
            dropdownItems: [
                { label: 'FEDU', href: 'https://vriunap.pe/fedu/' },
                { label: 'Repositorio', href: 'https://repositorio.unap.edu.pe/home' },
                { label: 'Cursos y Eventos', href: 'https://vriunap.pe/cursos/' },
                { label: 'Plataforma de Gestión de la Investigación', href: 'https://pgi.vriunap.pe/home' },
                { label: 'Turniting', href: 'https://unap.turnitin.com/home/sign-in?redirect_to=https:%2F%2Funap.turnitin.com%2F' }
            ]
        }
    ];

    const getHoverColor = () => isIdi ? 'hover:text-[#AEE637]' : 'hover:text-unap-blue';
    const getMobileAccent = () => isIdi ? 'text-[#149C68]' : 'text-unap-blue';

    return (
        <header className={`fixed w-full z-50 transition-all duration-300 ${scrolled || mobileMenuOpen ? 'glass-nav py-2 shadow-lg text-gray-800' : 'bg-transparent py-4 text-white'}`}>

            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <a href="#/" className="transition-transform hover:scale-105 active:scale-95">
                            <img
                                src={isIdi ? "src/assets/logoidi.png" : "src/assets/logovri.png"}
                                alt="Logo"
                                className="h-12 md:h-16 w-auto object-contain cursor-pointer"
                            />
                        </a>
                    </div>


                    {/* Desktop Nav */}
                    <nav className={`hidden lg:flex items-center gap-1 ${scrolled ? 'text-gray-600' : 'text-white'}`}>
                        {navLinks.map((link, idx) => (
                            <NavLink
                                key={idx}
                                href={link.href}
                                hasDropdown={link.hasDropdown}
                                dropdownItems={link.dropdownItems}
                                isIdi={isIdi}
                            >
                                {link.label}
                            </NavLink>
                        ))}
                        <div className={`w-px h-6 mx-3 ${scrolled ? 'bg-gray-300' : 'bg-white/30'}`}></div>

                        <button onClick={onSearchClick} className={`p-2 rounded-full transition-colors ${scrolled ? 'hover:bg-gray-100' : 'hover:bg-white/20'}`}>
                            <i className="fas fa-search"></i>
                        </button>
                    </nav>

                    {/* Mobile Toggle */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className={`lg:hidden p-2 text-xl ${scrolled ? getMobileAccent() : 'text-white'}`}
                    >
                        <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {mobileMenuOpen && (
                <div className="absolute top-full left-0 w-full bg-white shadow-xl lg:hidden animate-fade-in border-t border-gray-100 flex flex-col py-2 max-h-[80vh] overflow-y-auto">
                    {navLinks.map((link, idx) => (
                        <MobileMenuItem key={idx} item={link} isIdi={isIdi} onNavClick={() => setMobileMenuOpen(false)} />
                    ))}
                </div>
            )}
        </header>
    );
};

export default Header;
