'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import DeltaruneMenu from './DeltaruneMenu';

export default function MainLayout({ children }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '32px' }}>
        <div style={{ width: '100%', maxWidth: '900px' }}>
          {children}
        </div>
      </main>
      <div style={{ 
        position: 'sticky', 
        bottom: 0, 
        background: 'var(--bg-base)', 
        zIndex: 100, 
        padding: '0 16px 16px 16px',
        borderTop: '1px solid #333'
      }}>
        <DeltaruneMenu />
      </div>
    </div>
  );
}
