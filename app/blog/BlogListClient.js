'use client';

import { useState, useEffect } from 'react';
import { playSelectSound } from '@/lib/audio';

export default function BlogListClient({ posts }) {
  const [showEncounter, setShowEncounter] = useState(true);

  useEffect(() => {
    playSelectSound();
    const timer = setTimeout(() => {
      setShowEncounter(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showEncounter && <div className="encounter-flash"></div>}
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '32px' }}>
        {posts.map((post) => (
          <div 
            key={post.slug} 
            className="dialogue-box battle-action" 
            style={{ 
              padding: '24px', 
              cursor: 'pointer', 
              display: 'flex', 
              flexDirection: 'column', 
              minHeight: 'auto' 
            }} 
            onClick={() => {
              playSelectSound();
              window.location.href = `/blog/${post.slug}`;
            }}
          >
            <h3 className="text-yellow" style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>
              * {post.title}
            </h3>
            <div style={{ color: '#888', marginBottom: '16px', fontSize: '16px' }}>
              {post.date} | {post.readingTime}
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '20px', flex: 1 }}>
              {post.excerpt}
            </p>
            <div style={{ marginTop: '16px', fontSize: '20px', borderTop: '2px dashed #444', paddingTop: '16px' }}>
              <span className="text-blue">♥ [READ]</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
