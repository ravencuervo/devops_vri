import React, { useState, useEffect, useRef, useCallback } from 'react';

/**
 * AnimatedCounter mejorado con useCallback para evitar recrear startAnimation
 */
const AnimatedCounter = ({ target, prefix = '', suffix = '', duration = 2200 }) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);
  const hasAnimated = useRef(false);
  const rafRef = useRef(null);

  const startAnimation = useCallback(() => {
    let startTimestamp = null;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // Ease-out Quart
      const easeOut = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOut * target));

      if (progress < 1) {
        rafRef.current = window.requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    rafRef.current = window.requestAnimationFrame(step);
  }, [target, duration]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          startAnimation();
        }
      },
      { threshold: 0.4 }
    );

    const current = elementRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
    };
  }, [startAnimation]);

  return (
    <span ref={elementRef} className="logro-number">
      {prefix}{count}{suffix}
    </span>
  );
};

export default AnimatedCounter;
