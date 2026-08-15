'use client';

import { useEffect, useState } from 'react';
import { playSelectSound, playOminousTone } from '@/lib/audio';
import { motion } from 'framer-motion';

export default function ProjectsListClient({ projects, categories = [] }) {
  const [showEncounter, setShowEncounter] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');

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

  const handleFilterClick = (category) => {
    playSelectSound();
    setSelectedCategory(category);
  };

  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);

  return (
    <>
      {showEncounter && <div className="encounter-flash"></div>}
      
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '32px' }}>
        <button 
          onClick={() => handleFilterClick('All')}
          className={`filter-btn ${selectedCategory === 'All' ? 'active' : ''}`}
        >
          All
        </button>
        {categories.map(category => (
          <button 
            key={category}
            onClick={() => handleFilterClick(category)}
            className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
          >
            {category}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        {filteredProjects.map((project) => (
          <motion.div 
            key={project.id} 
            className="chapter-container"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="chapter-number">{project.chapter || '??'}</div>
            
            <div className="dialogue-box" style={{ padding: '32px', display: 'flex', flexDirection: 'column', fontSize: '24px', gap: '24px' }}>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
                <h3 className="text-yellow text-glitch" data-text={`* ${project.title}`} style={{ fontSize: '36px', fontWeight: 'bold' }}>
                  * {project.title}
                </h3>
                
                {project.status === 'Mid-Dungeon' ? (
                  <div className="badge-mid-dungeon">⚠️ Mid-Dungeon</div>
                ) : (
                  <div className="badge-completed">Completed</div>
                )}
              </div>
              
              {/* Tech Stack */}
              <div style={{ fontSize: '20px', color: 'var(--text-secondary)' }}>
                <span style={{ color: '#fff' }}>TECH_DATA:</span> {project.tech?.join(', ') || 'Unknown'}
              </div>
              
              {/* Description */}
              <p style={{ color: 'var(--text-secondary)', fontSize: '24px', flex: 1, lineHeight: '1.4' }}>
                {project.description || "No description provided."}
              </p>

              {/* Actions */}
              <div style={{ display: 'flex', gap: '24px', fontSize: '24px', marginTop: '16px', borderTop: '2px dashed #444', paddingTop: '24px' }}>
                {project.link && project.link !== '#' && (
                  <a href={project.link.startsWith('http') ? project.link : `https://${project.link}`} target="_blank" rel="noreferrer" onClick={handleActionClick} className="battle-action text-yellow" style={{ textDecoration: 'none' }}>
                    ♥ [EXPLORE_WORLD]
                  </a>
                )}
                {project.github && project.github !== '#' && (
                  <a href={project.github} target="_blank" rel="noreferrer" onClick={handleActionClick} className="battle-action text-blue" style={{ textDecoration: 'none' }}>
                    ♥ [VIEW_SOURCE]
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <style jsx>{`
        .battle-action {
          transition: all 0.2s;
        }
        .battle-action:hover {
          background: white;
          color: black !important;
          padding: 0 8px;
        }
        .filter-btn {
          background: transparent;
          color: var(--text-secondary, #aaa);
          border: 2px solid var(--text-secondary, #aaa);
          padding: 8px 16px;
          font-family: inherit;
          font-size: 24px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .filter-btn:hover {
          color: white;
          border-color: white;
        }
        .filter-btn.active {
          background: white;
          color: black;
          border-color: white;
        }
      `}</style>
    </>
  );
}
