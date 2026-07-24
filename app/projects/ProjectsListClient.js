'use client';

import { useEffect, useState } from 'react';
import { playSelectSound, playOminousTone } from '@/lib/audio';

export default function ProjectsListClient({ projects }) {
  const [showEncounter, setShowEncounter] = useState(true);

  useEffect(() => {
    // Play a sound when entering the encounter
    playSelectSound();
    
    // The flash animation is handled by CSS, we just remove the DOM element after it finishes
    const timer = setTimeout(() => {
      setShowEncounter(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  const handleActionClick = () => {
    playOminousTone();
  };

  return (
    <>
      {showEncounter && <div className="encounter-flash"></div>}
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '32px' }}>
        {projects.map((project) => {
          // Generate a pseudo-random HP based on title length just for fun
          const maxHp = 100 + (project.title.length * 10);
          
          return (
            <div key={project.id} className="dialogue-box" style={{ padding: '24px', display: 'flex', flexDirection: 'column', fontSize: '20px', minHeight: 'auto', gap: '16px' }}>
              
              {/* Enemy Name & Category */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 className="text-yellow" style={{ fontSize: '24px', fontWeight: 'bold' }}>
                  * {project.title}
                </h3>
                <span style={{ fontSize: '14px', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
                  {project.category}
                </span>
              </div>
              
              {/* Enemy HP */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '16px', color: '#888' }}>HP</span>
                <div style={{ flex: 1, height: '16px', background: '#ff0000', border: '2px solid white' }}>
                  <div className="fill-bar-anim" style={{ height: '100%', background: '#ffff00', '--target-width': '100%' }}></div>
                </div>
                <span style={{ fontSize: '16px' }}>{maxHp}/{maxHp}</span>
              </div>

              {/* Enemy Stats (Tech) */}
              <div style={{ fontSize: '16px', color: 'var(--text-secondary)' }}>
                <span style={{ color: '#fff' }}>ATK:</span> {project.tech?.join(', ') || 'Unknown'}
              </div>
              
              {/* Description */}
              <p style={{ color: 'var(--text-secondary)', fontSize: '20px', flex: 1, marginTop: '8px' }}>
                {project.description || "No description provided."}
              </p>

              {/* Battle Actions */}
              <div style={{ display: 'flex', gap: '16px', fontSize: '20px', marginTop: '16px', borderTop: '2px dashed #444', paddingTop: '16px' }}>
                {project.link && project.link !== '#' && (
                  <a href={project.link.startsWith('http') ? project.link : `https://${project.link}`} target="_blank" rel="noreferrer" onClick={handleActionClick} className="battle-action text-yellow" style={{ textDecoration: 'none' }}>
                    ♥ [USE]
                  </a>
                )}
                {project.github && project.github !== '#' && (
                  <a href={project.github} target="_blank" rel="noreferrer" onClick={handleActionClick} className="battle-action text-blue" style={{ textDecoration: 'none' }}>
                    ♥ [CHECK]
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <style jsx>{`
        .battle-action {
          transition: all 0.2s;
        }
        .battle-action:hover {
          background: white;
          color: black !important;
          padding: 0 4px;
        }
      `}</style>
    </>
  );
}
