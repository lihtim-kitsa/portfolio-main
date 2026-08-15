'use client';

import { LazyMotion, domAnimation } from 'framer-motion';

export default function AnimationProvider({ children }) {
  return (
    <LazyMotion features={domAnimation}>
      {children}
    </LazyMotion>
  );
}
