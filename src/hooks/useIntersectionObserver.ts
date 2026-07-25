import { useEffect, useState, useRef } from 'react';

export function useIntersectionObserver(options: IntersectionObserverInit = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }) {
  const [hasIntersected, setHasIntersected] = useState(false);
  const elementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const currentElement = elementRef.current;
    if (!currentElement) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setHasIntersected(true);
        // Unobserve once triggered to lock the layout state and avoid extra CPU usage
        observer.unobserve(currentElement);
      }
    }, options);

    observer.observe(currentElement);

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [options]);

  return [elementRef, hasIntersected] as const;
}
