'use client';

import { useState } from 'react';
import DialogueBox from '@/components/DialogueBox';
import { playSelectSound, playHoverSound } from '@/lib/audio';

export default function SkillsClient({ categories }) {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategorySelect = (idx) => {
    playSelectSound();
    setSelectedCategory(idx);
  };

  const handleGoBack = () => {
    playSelectSound();
    setSelectedCategory(null);
  };

  return (
    <>
      <style>{`
        .categories-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        @media (max-width: 600px) {
          .categories-grid {
            grid-template-columns: 1fr;
          }
        }
        .act-button {
          padding: 16px;
          border: 2px solid white;
          background: transparent;
          color: white;
          font-family: inherit;
          font-size: 24px;
          text-align: left;
          cursor: pointer;
          transition: all 0.2s;
        }
        .act-button:hover {
          background: white;
          color: black;
        }
      `}</style>
      <div style={{ maxWidth: '800px', margin: '0 auto', paddingBottom: '32px' }}>
        
        {selectedCategory === null ? (
          <>
            <div style={{ marginBottom: '32px' }}>
              <DialogueBox 
                text="* Select an ACT." 
                speed={40} 
              />
            </div>
            
            <div className="dialogue-box" style={{ flexDirection: 'column' }}>
              <h2 className="text-green" style={{ fontSize: '24px', borderBottom: '2px solid white', paddingBottom: '8px', marginBottom: '16px' }}>
                ACT MENU
              </h2>
              <div className="categories-grid">
                {categories.map((category, idx) => (
                  <button 
                    key={idx} 
                    className="act-button"
                    onMouseEnter={playHoverSound}
                    onClick={() => handleCategorySelect(idx)}
                  >
                    <span className="text-yellow">*</span> {category.title}
                  </button>
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            <div style={{ marginBottom: '32px' }}>
              <DialogueBox 
                text={`* You checked ${categories[selectedCategory].title}.`} 
                speed={40} 
              />
            </div>
            
            <div className="dialogue-box" style={{ padding: '24px', flexDirection: 'column', fontSize: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid white', paddingBottom: '8px', marginBottom: '20px' }}>
                <h2 className="text-yellow" style={{ fontSize: '24px', fontWeight: 'bold' }}>
                  {categories[selectedCategory].title}
                </h2>
                <button 
                  className="battle-action" 
                  style={{ background: 'transparent', border: 'none', color: 'white', fontFamily: 'inherit', fontSize: '20px', cursor: 'pointer' }}
                  onMouseEnter={playHoverSound}
                  onClick={handleGoBack}
                >
                  [GO BACK]
                </button>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {categories[selectedCategory].skills.map((skill, sIdx) => (
                  <div key={sIdx} style={{
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',
                  }}>
                    <div style={{ width: '150px', color: 'var(--text-primary)' }}>
                      * {skill.name}
                    </div>
                    <div style={{ flex: 1, height: '12px', background: 'var(--bg-base)', border: '2px solid white', marginRight: '16px', overflow: 'hidden' }}>
                      <div className="fill-bar-anim" style={{
                        '--target-width': `${skill.percentage}%`,
                        height: '100%',
                        background: skill.color
                      }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
