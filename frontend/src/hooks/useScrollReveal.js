import { useEffect, useRef, useState } from 'react';

/**
 * Hook reutilizable para animaciones al hacer scroll.
 * Usa IntersectionObserver para detectar cuando el elemento entra al viewport.
 * @param {Object} options - Opciones del IntersectionObserver
 * @returns {[ref, boolean]} - Ref para adjuntar al elemento y booleano isVisible
 */
export const useScrollReveal = (options = {}) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Solo animar una vez
        }
      },
      {
        threshold: options.threshold ?? 0.15,
        rootMargin: options.rootMargin ?? '0px 0px -60px 0px',
      }
    );

    const current = ref.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [options.threshold, options.rootMargin]);

  return [ref, isVisible];
};

/**
 * Hook para múltiples elementos (stagger animation)
 * @param {number} count - Número de elementos
 * @param {Object} options - Opciones del IntersectionObserver
 * @returns {[ref, boolean]} - Ref del contenedor y booleano isVisible
 */
export const useStaggerReveal = (options = {}) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: options.threshold ?? 0.1,
        rootMargin: options.rootMargin ?? '0px 0px -40px 0px',
      }
    );

    const current = ref.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [options.threshold, options.rootMargin]);

  return [ref, isVisible];
};
