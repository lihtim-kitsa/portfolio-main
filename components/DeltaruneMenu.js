'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { playHoverSound, playSelectSound } from '@/lib/audio';

export default function DeltaruneMenu() {
  const router = useRouter();
  const pathname = usePathname();
  const menuRef = useRef(null);
  const buttonRefs = useRef([]);
  
  const menuItems = [
    { name: 'ABOUT', path: '/' },
    { name: 'PROJECTS', path: '/projects' },
    { name: 'SKILLS', path: '/skills' },
    { name: 'CONTACT', path: '/contact' },
    { name: 'BLOG', path: '/blog' }
  ];
  
  // Find initial index based on pathname
  const initialIndex = menuItems.findIndex(item => item.path === pathname);
  const [hoveredIndex, setHoveredIndex] = useState(initialIndex !== -1 ? initialIndex : 0);
  const [isFlashing, setIsFlashing] = useState(false);
  const [soulStyle, setSoulStyle] = useState({ opacity: 0, transform: 'translate(0px, 0px)' });

  useEffect(() => {
    // Update soul position
    const btn = buttonRefs.current[hoveredIndex];
    if (btn && menuRef.current) {
      const menuRect = menuRef.current.getBoundingClientRect();
      const btnRect = btn.getBoundingClientRect();
      
      const x = btnRect.left - menuRect.left + 16;
      const y = btnRect.top - menuRect.top + (btnRect.height / 2) - 12;

      setSoulStyle({
        opacity: 1,
        transform: `translate(${x}px, ${y}px)`,
        transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
      });
    }
  }, [hoveredIndex]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isFlashing) return; // Prevent movement during transition flash

      if (e.key === 'ArrowRight') {
        e.preventDefault();
        setHoveredIndex((prev) => {
          const next = (prev + 1) % menuItems.length;
          playHoverSound();
          return next;
        });
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setHoveredIndex((prev) => {
          const next = (prev - 1 + menuItems.length) % menuItems.length;
          playHoverSound();
          return next;
        });
      } else if (e.key === 'Enter') {
        e.preventDefault();
        handleClick(menuItems[hoveredIndex].path, hoveredIndex);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [hoveredIndex, isFlashing, menuItems]);

  const handleHover = (index) => {
    if (hoveredIndex !== index) {
      setHoveredIndex(index);
      playHoverSound();
    }
  };

  const handleClick = (path, index) => {
    setHoveredIndex(index);
    playSelectSound();
    
    // Slight flashing/shake effect before routing
    setIsFlashing(true);
    setTimeout(() => {
      setIsFlashing(false);
      router.push(path);
    }, 200);
  };

  return (
    <div className="battle-menu-container" ref={menuRef} style={{ position: 'relative' }}>
      {/* The Physical Heart Cursor */}
      <span 
        className="soul" 
        style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          pointerEvents: 'none', 
          zIndex: 10,
          ...soulStyle 
        }}
      >
        ♥
      </span>

      {menuItems.map((item, index) => {
        const isHovered = hoveredIndex === index;
        const isMercy = item.name === 'CONTACT';
        
        return (
          <button 
            key={item.name}
            ref={el => buttonRefs.current[index] = el}
            className={`battle-button ${isHovered ? 'active' : ''} ${isFlashing && isHovered ? 'flash' : ''} ${isMercy ? 'mercy-button' : ''}`}
            onMouseEnter={() => handleHover(index)}
            onClick={() => handleClick(item.path, index)}
          >
            {/* Invisible placeholder heart to keep spacing correct */}
            <span className="soul" style={{ opacity: 0 }}>♥</span>
            {item.name}
          </button>
        );
      })}
    </div>
  );
}

