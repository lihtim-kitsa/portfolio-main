'use client';

import { useState, useEffect } from 'react';
import { m } from 'framer-motion';

const PHRASES = [
  "Building resilient systems",
  "Designing intuitive interfaces",
  "Training machine learning models",
  "Securing web applications",
  "Exploring open-source technologies",
  "Researching new niches"
];

export default function Typewriter() {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    let timer;
    const handleType = () => {
      const i = loopNum % PHRASES.length;
      const fullText = PHRASES[i];

      setText(isDeleting
        ? fullText.substring(0, text.length - 1)
        : fullText.substring(0, text.length + 1)
      );

      // Speed up when deleting
      setTypingSpeed(isDeleting ? 30 : 40);

      if (!isDeleting && text === fullText) {
        // Pause at the end of typing
        timer = setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && text === '') {
        // Move to next word when done deleting
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        timer = setTimeout(handleType, 500);
      } else {
        timer = setTimeout(handleType, typingSpeed);
      }
    };

    timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed]);

  return (
    <span>
      {text}
      <m.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.4, repeat: Infinity, ease: "linear" }}
        style={{ fontWeight: 'bold' }}
      >
        |
      </m.span>
    </span>
  );
}
