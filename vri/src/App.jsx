import React, { useState, useEffect } from 'react';
import { useScrollReveal } from './hooks/useScrollReveal';

// Layout Components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Home Components
import Hero from './components/home/Hero';
import AboutSection from './components/home/AboutSection';
import QuickAccess from './components/home/QuickAccess';
import NewsSection from './components/home/NewsSection';
import CallsAndDirections from './components/home/CallsAndDirections';
import InstitutionalStats from './components/home/InstitutionalStats';
import EventsSection from './components/home/EventsSection';

// Pages
import ResearchInstitute from './pages/ResearchInstitute';
import Institutos from './pages/Institutos';
import ResearchGroups from './pages/ResearchGroups';
import Semilleros from './pages/Semilleros';
import Renacyt from './pages/Renacyt';
import AboutPage from './pages/AboutPage';
import ScientificJournals from './pages/ScientificJournals';
import Actividades from './pages/Actividades';
import NoticiasEventos from './pages/NoticiasEventos';
import Convocatorias from './pages/Convocatorias';
import Noticias from './pages/Noticias';
import NormativaGestion from './pages/NormativaGestion';
import Innovacion from './pages/Innovacion';

// UI Components
import SearchModal from './components/ui/SearchModal';
import Preloader from './components/ui/Preloader';
import AvisoModal from './components/ui/AvisoModal';

function App() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [preloaderComplete, setPreloaderComplete] = useState(false);
  useScrollReveal(currentPage);

  useEffect(() => {
    const handleHashChange = () => {
      let fullHash = window.location.hash.replace('#/', '#'); // Normalizar #/ a #
      const hashMain = fullHash.split('?')[0]; // Extraer solo la ruta, sin parámetros

      if (hashMain === '#idi') {
        setCurrentPage('idi');
      } else if (hashMain === '#institutos') {
        setCurrentPage('institutos-lista');
      } else if (hashMain === '#grupos') {
        setCurrentPage('groups');
      } else if (hashMain === '#semilleros') {
        setCurrentPage('semilleros');
      } else if (hashMain === '#renacyt') {
        setCurrentPage('renacyt');
      } else if (hashMain === '#nosotros') {
        setCurrentPage('about');
      } else if (hashMain === '#revistas') {
        setCurrentPage('revistas');
      } else if (hashMain === '#actividades') {
        setCurrentPage('actividades');
      } else if (hashMain === '#noticias-eventos') {
        setCurrentPage('noticias-eventos');
      } else if (hashMain === '#convocatorias') {
        setCurrentPage('convocatorias');
      } else if (hashMain === '#noticias') {
        setCurrentPage('noticias');
      } else if (hashMain === '#normativa') {
        setCurrentPage('normativa');
      } else if (hashMain === '#innovacion') {
        setCurrentPage('innovacion');
      } else {
        // Cualquier otro hash o hash vacío vuelve al home
        setCurrentPage('home');
      }

      // Manejar scroll a secciones específicas mediante query params. Ej: #actividades?section=posters
      const urlParams = new URLSearchParams(fullHash.split('?')[1] || '');
      const targetSection = urlParams.get('section');

      if (targetSection) {
        setTimeout(() => {
          const element = document.getElementById(targetSection);
          if (element) {
            // Un pequeño offset para el header fixed
            const y = element.getBoundingClientRect().top + window.scrollY - 100;
            window.scrollTo({ top: y, behavior: 'smooth' });
          }
        }, 300); // Dar algo de tiempo para que React renderice la nueva vista
      } else {
        // Asegurar que el scroll vuelva arriba si no hay sección específica
        window.scrollTo(0, 0);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Check initial hash

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Preloader onComplete={() => setPreloaderComplete(true)} />
      <Header
        onSearchClick={() => setSearchOpen(true)}
        theme={(currentPage === 'idi' || currentPage === 'groups' || currentPage === 'semilleros' || currentPage === 'institutos-lista' || currentPage === 'renacyt') ? 'idi' : 'default'}
      />
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      <AvisoModal currentPage={currentPage} />

      <main className="flex-grow">
        {currentPage === 'home' && (
          <>
            <Hero autoPlayVideo={preloaderComplete} />
            <AboutSection />
            <QuickAccess />
            <NewsSection />
            <CallsAndDirections />
            <InstitutionalStats />
            <EventsSection />
          </>
        )}
        {currentPage === 'idi' && <ResearchInstitute />}
        {currentPage === 'institutos-lista' && <Institutos />}
        {currentPage === 'groups' && <ResearchGroups />}
        {currentPage === 'semilleros' && <Semilleros />}
        {currentPage === 'renacyt' && <Renacyt />}
        {currentPage === 'about' && <AboutPage />}
        {currentPage === 'revistas' && <ScientificJournals />}
        {currentPage === 'actividades' && <Actividades />}
        {currentPage === 'noticias-eventos' && <NoticiasEventos />}
        {currentPage === 'convocatorias' && <Convocatorias />}
        {currentPage === 'noticias' && <Noticias />}
        {currentPage === 'normativa' && <NormativaGestion />}
        {currentPage === 'innovacion' && <Innovacion />}
      </main>

      <Footer />
    </div>
  );
}

export default App;
