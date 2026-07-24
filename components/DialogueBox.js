'use client';

import { useState, useEffect, useRef } from 'react';
import { playTextBlip } from '@/lib/audio';

export default function DialogueBox({ text, onComplete, speed = 40, portrait = null, avatarText = null }) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const containerRef = useRef(null);
  
  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    let i = 0;
    let currentIsTyping = true;
    setDisplayedText('');
    setIsTyping(true);
    
    // Quick skip if someone clicks
    const handleSkip = () => {
      if (currentIsTyping) {
        setDisplayedText(text);
        setIsTyping(false);
        currentIsTyping = false;
        if (onCompleteRef.current) onCompleteRef.current();
      }
    };
    
    document.addEventListener('keydown', handleSkip);
    
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(text.substring(0, i + 1));
        
        // Play sound every few characters to avoid audio overwhelming
        if (i % 2 === 0 && text[i] !== ' ' && text[i] !== '\n') {
          playTextBlip();
        }
        
        i++;
      } else {
        setIsTyping(false);
        currentIsTyping = false;
        clearInterval(interval);
        if (onCompleteRef.current) onCompleteRef.current();
      }
    }, speed);
    
    return () => {
      clearInterval(interval);
      document.removeEventListener('keydown', handleSkip);
    };
  }, [text, speed]);
  
  return (
    <div className="dialogue-box" onClick={() => {
      if (isTyping) {
        setDisplayedText(text);
        setIsTyping(false);
        if (onComplete) onComplete();
      }
    }}>
      {portrait && (
        <div style={{ width: '100px', height: '100px', border: '2px solid white', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}>
          {portrait}
        </div>
      )}
      {avatarText && !portrait && (
         <div style={{ width: '100px', height: '100px', border: '2px solid white', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{fontSize: '40px'}}>{avatarText}</span>
        </div>
      )}
      <div className="dialogue-text">
        <span style={{ whiteSpace: 'pre-wrap' }}>
          {displayedText}
          {isTyping && <span className="cursor-blink" style={{ width: '12px', height: '24px', background: 'white' }}></span>}
        </span>
      </div>
    </div>
  );
}
