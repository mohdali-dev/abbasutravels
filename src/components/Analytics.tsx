import React, { useEffect } from 'react';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function Analytics() {
  useEffect(() => {
    const metaEnv = (import.meta as unknown as { env: Record<string, string> }).env;
    const gaId = metaEnv?.VITE_GA_MEASUREMENT_ID;
    if (!gaId) return;

    // Load gtag script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag(...args: unknown[]) {
      window.dataLayer.push(args);
    }
    window.gtag = gtag;

    gtag('js', new Date());
    gtag('config', gaId, {
      page_path: window.location.pathname + window.location.hash,
    });

    // Track hash changes (SPA sections)
    const handleHashChange = () => {
      if (window.gtag) {
        window.gtag('config', gaId, {
          page_path: window.location.pathname + window.location.hash,
        });
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return null;
}
