'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

export default function DamagePop({ value, x, y, onComplete }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    const timer = setTimeout(() => {
      onComplete();
    }, 1000); // Fades out in 1 second
    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!mounted) return null;

  return createPortal(
    <div 
      className="damage-pop text-yellow" 
      style={{
        position: 'fixed',
        left: x,
        top: y,
        pointerEvents: 'none',
        zIndex: 9999,
        fontSize: '24px',
        fontWeight: 'bold',
        textShadow: '0 0 5px rgba(255, 255, 0, 0.5), 2px 2px 0px #000'
      }}
    >
      +{value}!
    </div>,
    document.body
  );
}
