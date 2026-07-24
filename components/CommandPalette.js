'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const router = useRouter();

  const commands = [
    { name: 'cd /home', action: () => router.push('/') },
    { name: 'cd /projects', action: () => router.push('/projects') },
    { name: 'cd /skills', action: () => router.push('/skills') },
    { name: 'cd /experience', action: () => router.push('/experience') },
    { name: 'cd /blog', action: () => router.push('/blog') },
    { name: 'cd /contact', action: () => router.push('/contact') },
    { name: 'download resume', action: () => alert('Resume download initiated (placeholder)') },
  ];

  const filteredCommands = commands.filter(cmd => cmd.name.toLowerCase().includes(input.toLowerCase()));

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => {
          if (!prev) {
            setInput('');
            setSelectedIndex(0);
          }
          return !prev;
        });
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    
    const handleOpenEvent = () => {
      setInput('');
      setSelectedIndex(0);
      setIsOpen(true);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('open-cmd-palette', handleOpenEvent);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('open-cmd-palette', handleOpenEvent);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const handleCommandKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < filteredCommands.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        filteredCommands[selectedIndex].action();
        setIsOpen(false);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      backdropFilter: 'blur(4px)',
      zIndex: 9999,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
      paddingTop: '15vh'
    }} onClick={() => setIsOpen(false)}>
      <div 
        className="term-card mono"
        style={{ 
          width: '100%', 
          maxWidth: '600px', 
          backgroundColor: 'var(--bg-panel)',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 24px 48px rgba(0,0,0,0.8)'
        }} 
        onClick={e => e.stopPropagation()}
      >
        <div style={{ padding: '16px', borderBottom: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center' }}>
          <span style={{ color: 'var(--accent)', marginRight: '12px', fontWeight: 'bold' }}>&gt;</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => { setInput(e.target.value); setSelectedIndex(0); }}
            onKeyDown={handleCommandKeyDown}
            placeholder="Search commands..."
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-primary)',
              fontFamily: 'inherit',
              fontSize: '16px',
              outline: 'none',
              width: '100%'
            }}
          />
        </div>
        <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
          {filteredCommands.length > 0 ? (
            filteredCommands.map((cmd, idx) => (
              <div
                key={cmd.name}
                onClick={() => { cmd.action(); setIsOpen(false); }}
                style={{
                  padding: '12px 16px',
                  cursor: 'pointer',
                  backgroundColor: idx === selectedIndex ? 'var(--border-subtle)' : 'transparent',
                  color: idx === selectedIndex ? 'var(--text-primary)' : 'var(--text-secondary)',
                  display: 'flex',
                  alignItems: 'center'
                }}
                onMouseEnter={() => setSelectedIndex(idx)}
              >
                {idx === selectedIndex && <span style={{ color: 'var(--accent)', marginRight: '8px' }}>*</span>}
                <span style={{ marginLeft: idx === selectedIndex ? 0 : '16px' }}>{cmd.name}</span>
              </div>
            ))
          ) : (
            <div style={{ padding: '16px', color: 'var(--text-secondary)' }}>
              No commands found.
            </div>
          )}
        </div>
        <div style={{ padding: '8px 16px', borderTop: '1px solid var(--border-subtle)', fontSize: '11px', color: 'var(--text-secondary)', display: 'flex', justifyContent: 'space-between' }}>
          <span>Press &uarr; &darr; to navigate</span>
          <span>Press Enter to select</span>
          <span>Press Esc to close</span>
        </div>
      </div>
    </div>
  );
}
